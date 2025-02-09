"use client"
import { Button, Button2, Button2Red, Button2Secondary, ButtonRed, ButtonRedSubmit, ButtonSubmit, Calendar, Input, Select, Spinner2 } from "@/components/ui"
import { DateData } from "@/interfaces"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

export default function AvaliableCallsPage () {

  const [availableDates, setAvailableDates] = useState<DateData[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [calendars, setCalendars] = useState<any>([])
  const [selectedCalendar, setSelectedCalendar] = useState<any>(null)
  const [popupNewCalendar, setPopupNewCalendar] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [newCalendar, setNewCalendar] = useState<any>({ name: '' })
  const [popupDeleteCalendar, setPopupDeleteCalendar] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })

  const { data: session } = useSession()
  const router = useRouter()
  
  const popupRef = useRef<HTMLFormElement | null>(null);

  const getCaledars = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calendar`)
    setCalendars(res.data)
  }

  useEffect(() => {
    getCaledars()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popupNewCalendar.view === 'flex') {
        setPopupNewCalendar({ ...popupNewCalendar, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopupNewCalendar({ ...popupNewCalendar, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupNewCalendar, setSelectedCalendar]);

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/calendar`, { ...calendars.find((calendar: any) => calendar._id === selectedCalendar), dates: availableDates })
    router.push('/reuniones')
  }

  return (
    <>
      <div onClick={(e: any) => {
        e.preventDefault()
        if (!popupDeleteCalendar.mouse) {
          setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupDeleteCalendar.view} ${popupDeleteCalendar.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50 p-4`}>
        <div onMouseEnter={() => setPopupDeleteCalendar({ ...popupDeleteCalendar, mouse: true })} onMouseLeave={() => setPopupDeleteCalendar({ ...popupDeleteCalendar, mouse: false })} className={`${popupDeleteCalendar.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[500px] max-h-[600px] overflow-y-auto p-6 lg:p-8 rounded-2xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="text-lg font-medium">Eliminar calendario &quot;{calendars.find((calendar: any) => calendar._id === selectedCalendar)?.name}&quot;</p>
          <div className="flex gap-4">
            <ButtonRedSubmit action={async (e: any) => {
              e.preventDefault()
              if (!loading) {
                setLoading(true)
                setError('')
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/calendar/${selectedCalendar}`)
                setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'flex', opacity: 'opacity-0' })
                getCaledars()
                setTimeout(() => {
                  setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'hidden', opacity: 'opacity-0' })
                  setLoading(false)
                }, 200)
                setNewCalendar({ name: '' })
                setSelectedCalendar(null)
              }
            }} submitLoading={loading} textButton="Eliminar calendario" config="w-48" />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }}>Cancelar</button>
          </div>
        </div>
      </div>
      <div className={`${popupNewCalendar.view} ${popupNewCalendar.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50 p-4`}>
        <form ref={popupRef} onSubmit={async (e: any) => {
          e.preventDefault()
          if (!loading) {
            setLoading(true)
            setError('')
            if (session?.user.plan === 'Esencial' && calendars.length === 1) {
              setError('Solo puedes tener un calendario')
              setLoading(false)
              return
            }
            if (session?.user.plan === 'Avanzado' && calendars.length === 3) {
              setError('Solo puedes tener 3 calendarios')
              setLoading(false)
              return
            }
            if (newCalendar.name !== '') {
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/calendar`, newCalendar)
              setPopupNewCalendar({ ...popupNewCalendar, view: 'flex', opacity: 'opacity-0' })
              getCaledars()
              setTimeout(() => {
                setPopupNewCalendar({ ...popupNewCalendar, view: 'hidden', opacity: 'opacity-0' })
                setLoading(false)
              }, 200)
              setNewCalendar({ name: '' })
            } else {
              setError('Debes ingresar todos los datos necesarios')
              setLoading(false)
            }
          }
        }} onMouseEnter={() => setPopupNewCalendar({ ...popupNewCalendar, mouse: true })} onMouseLeave={() => setPopupNewCalendar({ ...popupNewCalendar, mouse: false })} className={`${popupNewCalendar.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[600px] max-h-[600px] overflow-y-auto p-6 lg:p-8 rounded-2xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="text-lg font-medium">Nuevo calendario</p>
          <div className="flex flex-col gap-2">
            <p>Nombre del calendario</p>
            <Input change={(e: any) => setNewCalendar({ name: e.target.value })} placeholder="Nombre del calendario" />
          </div>
          <Button type='submit' loading={loading} config="w-full">Crear calendario</Button>
        </form>
      </div>
      <main className="flex flex-col gap-6 p-6 h-full bg-bg dark:bg-neutral-900">
        <div className="flex flex-col gap-6 w-full mx-auto max-w-[1280px]">
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-4">
              <Link href='/reuniones' className='border rounded-xl p-2 h-fit my-auto bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
              <h1 className='text-2xl font-medium my-auto'>Horario reuniones</h1>
            </div>
            {
              calendars.length
                ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <p>Seleccionar calendario</p>
                      <Select change={(e: any) => setSelectedCalendar(e.target.value)} config="w-fit">
                        <option>Seleccionar calendario</option>
                        {
                          calendars.map((calendar: any, index: any) => (
                            <option key={index} value={calendar._id}>{calendar.name}</option>
                          ))
                        }
                      </Select>
                    </div>
                  </>
                )
                : <p>No hay calendarios creados</p>
            }
            <div className="flex gap-2">
              <Button2 action={(e: any) => {
                e.preventDefault()
                setPopupNewCalendar({ ...popupNewCalendar, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupNewCalendar({ ...popupNewCalendar, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }}>Crear nuevo calendario</Button2>
              {
                selectedCalendar
                  ? <Button2Red action={(e: any) => {
                    e.preventDefault()
                    setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupDeleteCalendar({ ...popupDeleteCalendar, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Eliminar calendario</Button2Red>
                  : ''
              }
            </div>
            {
              selectedCalendar
                ? <Calendar availableDates={availableDates} setAvailableDates={setAvailableDates} selectedCalendar={selectedCalendar} />
                : ''
            }
          </div>
        </div>
      </main>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 250px)' }}>
        <div className='flex m-auto w-full max-w-[1280px]'>
          <div className='flex gap-2 ml-auto w-fit'>
            <ButtonSubmit action={handleSubmit} color="main" submitLoading={submitLoading} textButton="Modificar disponibilidad" config="w-52" />
            <Link className='pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4 my-auto' href='/llamadas'>Descartar</Link>
          </div>
        </div>
      </div>
    </>
  )
}