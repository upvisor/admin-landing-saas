"use client"
import React, { useEffect, useState } from 'react'
import { DateData } from '@/interfaces'
import axios from 'axios'
import { ButtonRed } from './ButtonRed'

type CalendarProps = {
  availableDates: DateData[]
  setAvailableDates: any
  selectedCalendar: any
}

export const Calendar: React.FC<CalendarProps> = ({ availableDates, setAvailableDates, selectedCalendar }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  useEffect(() => {
    const getDates = async () => {
      if (selectedCalendar === 'Seleccionar calendario') return;
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

    getDates()
  }, [selectedCalendar])

  const handleChangeMonth = (increment: number): void => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
    setSelectedDateTime(null); // Limpiamos la selección al cambiar de mes
  };

  const handleDateTimeSelect = (selectedDate: Date): void => {
    const selectedDateString = selectedDate.toDateString();
    const isSelected = selectedDateTime && selectedDateTime.toDateString() === selectedDateString;
    if (isSelected) {
      setSelectedDateTime(null);
    } else {
      setSelectedDateTime(selectedDate);
      const dateIndex = availableDates.findIndex(item => item.date.toDateString() === selectedDateString);
      if (dateIndex === -1) {
        setAvailableDates((prevDates: any) => [...prevDates, { date: selectedDate, hours: [] }]);
      }
    }
  };

  const handleHourSelect = (hour: number): void => {
    if (selectedDateTime) {
      const selectedDateString = selectedDateTime.toDateString();
      const dateIndex = availableDates.findIndex(item => item.date.toDateString() === selectedDateString);
      const updatedDates = [...availableDates];
      if (dateIndex !== -1) {
        const selectedDateData = updatedDates[dateIndex];
        const hourIndex = selectedDateData.hours.indexOf(hour);
        if (hourIndex === -1) {
          selectedDateData.hours.push(hour);
        } else {
          selectedDateData.hours.splice(hourIndex, 1);
          if (selectedDateData.hours.length === 0) {
            updatedDates.splice(dateIndex, 1);
            setSelectedDateTime(null); // Limpiamos la selección si se eliminan todas las horas
          }
        }
        setAvailableDates(updatedDates);
      }
    }
  };

  const removeSelectedDate = (): void => {
    if (selectedDateTime) {
      const updatedDates = availableDates.filter(item => item.date.toDateString() !== selectedDateTime.toDateString());
      setAvailableDates(updatedDates);
      setSelectedDateTime(null);
    }
  };

  return (
    <div className="w-full flex gap-6">
      <div className='flex flex-col gap-6 w-1/2 h-fit'>
        <div className="flex gap-6 items-center m-auto">
          <button onClick={() => handleChangeMonth(-1)} className="text-gray-600 hover:text-gray-800">&lt;</button>
          <h1 className="text-lg font-semibold">{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h1>
          <button onClick={() => handleChangeMonth(1)} className="text-gray-600 hover:text-gray-800">&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Dom</div>
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Lun</div>
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Mar</div>
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Mié</div>
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Jue</div>
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Vie</div>
          <div className="text-center font-semibold text-gray-600 dark:text-gray-400">Sáb</div>
          {renderCalendar()}
        </div>
      </div>
      {selectedDateTime && (
        <div className='flex flex-col gap-2 w-1/2'>
          <p className='text-lg font-semibold'>Elige la hora</p>
          <p>{selectedDateTime.getDate()} / {selectedDateTime.getMonth()}</p>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 24 }, (_, index) => (
              <button
                key={index}
                onClick={() => handleHourSelect(index)}
                className={`p-2 rounded-xl text-center ${availableDates.some(item => item.date.toDateString() === selectedDateTime.toDateString() && item.hours.includes(index)) ? 'bg-main text-white shadow-md shadow-main/30' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-main hover:text-white dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-main'} transition-colors duration-200`}
              >
                {index}:00
              </button>
            ))}
          </div>
          <ButtonRed action={removeSelectedDate} config='w-full'>Quitar día</ButtonRed>
        </div>
      )}
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
      const isAvailable = availableDates?.some(item => item.date.toDateString() === currentDate.toDateString());
      const isSelected = selectedDateTime && currentDate.toDateString() === selectedDateTime.toDateString();
      days.push(
        <button 
          key={i} 
          onClick={() => handleDateTimeSelect(currentDate)}
          className={`w-12 h-12 m-auto flex border rounded-full ${isSelected ? 'bg-main scale-110 border-main shadow-md shadow-main/30 text-white dark:border-main' : isAvailable ? 'bg-main border-main shadow-md shadow-main/30 text-white hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-main hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-main'} transition-color duration-150`} 
        >
          <p className='m-auto'>{i}</p>
        </button>
      );
    }

    return days;
  }
};