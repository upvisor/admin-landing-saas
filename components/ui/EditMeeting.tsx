"use client"
import React, { useEffect, useState } from 'react';
import { Button, Input, Spinner2 } from '.';
import axios from 'axios';
import { IMeeting } from '@/interfaces';

type CalendarProps = {
  meeting: IMeeting | undefined
  scheduled: boolean
  setScheduled: any
  setPopup: any
  popup: any
  selectedCalendar: any
};

interface DateData {
  date: Date;
  hours: number[];
}

export const EditMeeting: React.FC<CalendarProps> = ({ meeting, scheduled, setScheduled, setPopup, popup, selectedCalendar }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<DateData[]>([]);
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false)

  const getDates = async () => {
    try {
      const currentDate = new Date(); // Obtener la fecha y hora actual
      const currentHour = currentDate.getHours(); // Obtener la hora actual
  
      // Obtener las fechas ya agendadas
      const meetingsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meetings`);
      const meetings = meetingsRes.data.map((meeting: any) => new Date(meeting.date));
  
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calendar/${selectedCalendar}`);
      const datesWithConvertedDates = res.data.dates.map((dateItem: any) => ({
        ...dateItem,
        date: new Date(dateItem.date)
      }));
  
      // Filtrar las fechas pasadas y las horas pasadas para los días pasados
      const filteredDates = datesWithConvertedDates.map((dateData: any) => {
        if (dateData.date < currentDate.setHours(0, 0, 0, 0)) return null; // Eliminar fechas pasadas
        if (dateData.date.getDate() === currentDate.getDate()) {
          // Si la fecha es la actual, filtrar las horas pasadas
          const startHour = currentHour < 2 ? 0 : currentHour + 2; // Si son las 2:00 o más tarde, comenzar desde 2 horas después de la hora actual
          const filteredHours = dateData.hours.filter((hour: number) => hour >= startHour);
          return {
            ...dateData,
            hours: filteredHours
          };
        }
        return dateData;
      }).filter((dateData: any) => dateData !== null); // Eliminar fechas pasadas
  
      // Filtrar horas ya agendadas para las fechas disponibles
      const filteredAvailableDates = filteredDates.map((dateData: any) => {
        const filteredHours = dateData.hours.filter((hour: number) => {
          const meetingDate = new Date(dateData.date);
          meetingDate.setHours(hour);
          // Verificar si la hora está agendada
          return !meetings.some((meetingDateItem: Date) => {
            return meetingDateItem.getTime() === meetingDate.getTime();
          });
        });
        return {
          ...dateData,
          hours: filteredHours
        };
      });
  
      setAvailableDates(filteredAvailableDates);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getDates();
  }, []);

  const handleChangeMonth = (increment: number): void => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
  };

  const handleDateTimeSelect = (selectedDate: Date): void => {
    setSelectedDateTime(selectedDate);
  };

  const handleHourSelect = (hour: number): void => {
    if (selectedDateTime) {
      const selectedDateWithTime = new Date(selectedDateTime);
      selectedDateWithTime.setHours(hour);
      setSelectedDateTime(selectedDateWithTime);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/meeting/${meeting?._id}`, { date: selectedDateTime })
      setScheduled(true)
      setLoading(false)
      setPopup({ ...popup, mouse: false })
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 h-full">
      {
        scheduled
          ? (
            <div className='flex flex-col gap-4 m-auto text-center'>
              <p className='text-xl font-medium'>Llamada reagendada correctamente</p>
              <p>Recibiras un correo con todos los detalles de la llamada.</p>
            </div>
          )
          : (
            <>
              <div className='flex flex-col gap-6'>
                <div className="flex gap-6 items-center m-auto">
                  <button onClick={() => handleChangeMonth(-1)} className="text-gray-600 hover:text-gray-800">&lt;</button>
                  <h1 className="text-lg font-semibold">{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h1>
                  <button onClick={() => handleChangeMonth(1)} className="text-gray-600 hover:text-gray-800">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  <div className="text-center font-semibold text-gray-600">Dom</div>
                  <div className="text-center font-semibold text-gray-600">Lun</div>
                  <div className="text-center font-semibold text-gray-600">Mar</div>
                  <div className="text-center font-semibold text-gray-600">Mié</div>
                  <div className="text-center font-semibold text-gray-600">Jue</div>
                  <div className="text-center font-semibold text-gray-600">Vie</div>
                  <div className="text-center font-semibold text-gray-600">Sáb</div>
                  {renderCalendar()}
                </div>
              </div>
              {selectedDateTime && (
                <div className='flex flex-col gap-2'>
                  <p className='text-lg font-semibold'>Elige la hora</p>
                  <div className="grid grid-cols-4 gap-2">
                  {availableDates
                    .find(item => item.date.toDateString() === selectedDateTime.toDateString())
                    ?.hours
                    .sort((a, b) => a - b) // Ordenar las horas
                    .map(hour => (
                      <button
                        key={hour}
                        onClick={() => handleHourSelect(hour)}
                        className={`p-2 rounded-lg text-center ${selectedDateTime.getHours() === hour ? 'bg-main text-white' : 'bg-gray-100 text-gray-600 hover:bg-main hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-main'} transition-colors duration-200`}
                      >
                        {hour}:00
                      </button>
                    ))}
                  </div>
                  <Button action={handleSubmit} loading={loading} config='w-full'>Modificar llamada</Button>
                </div>
              )}
            </>
          )
      } 
    </div>
  );

  function renderCalendar(): JSX.Element[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const startingDay = new Date(year, month, 1).getDay();

    const days: JSX.Element[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const currentDate = new Date(year, month, i);
      const dateData = availableDates.find(item => item.date.toDateString() === currentDate.toDateString());
      const isAvailable = dateData !== undefined;
      const isSelected = selectedDateTime && currentDate.toDateString() === selectedDateTime.toDateString();
      days.push(
        <button 
          key={i} 
          disabled={!isAvailable} 
          className={`w-12 h-12 m-auto flex rounded-full ${isAvailable ? (isSelected ? 'bg-main text-white' : 'bg-gray-100 hover:bg-main hover:text-white dark:bg-gray-700 dark:hover:bg-main') : ''} transition-color duration-150`} 
          onClick={() => handleDateTimeSelect(currentDate)}
        >
          <p className='m-auto'>{i}</p>
        </button>
      );
    }

    return days;
  }
};