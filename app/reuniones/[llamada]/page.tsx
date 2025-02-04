"use client"
import { PopupCancelMeeting } from "@/components/meetings"
import { Button2, Button2Red, ButtonLink, EditMeeting, Spinner } from "@/components/ui"
import { ICall, IClientData, IMeeting, IStoreData } from "@/interfaces"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

export default function Page ({ params }: { params: { llamada: string } }) {

  const [meeting, setMeeting] = useState<IMeeting>()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupCancel, setPopupCancel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [scheduled, setScheduled] = useState(false)
  const [clientData, setClientData] = useState<IClientData[]>([])
  const [storeData, setStoreData] = useState<IStoreData>()
  const [calls, setCalls] = useState<ICall[]>([])

  useEffect(() => {
    const getMeeting = async () => {
      setLoading(true)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meeting/${params.llamada}`)
      setMeeting(res.data)
      const fechaLlamada = (new Date(res.data.date)).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
      setDate(fechaLlamada)
      setLoading(false)
    }

    getMeeting()
  }, [scheduled])

  useEffect(() => {
    const getClientData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
      setClientData(res.data)
    }

    getClientData()
  }, [])

  useEffect(() => {
    const getStoreData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
      setStoreData(res.data)
    }

    getStoreData()
  }, [])

  useEffect(() => {
    const getCalls = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
      setCalls(res.data)
    }

    getCalls()
  }, [])

  return (
    <>
      <PopupCancelMeeting popupCancel={popupCancel} setPopupCancel={setPopupCancel} meeting={meeting!} />
      <div onClick={() => {
        if (!popup.mouse) {
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50`}>
        <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full max-w-[700px] p-6 rounded-xl m-auto border border-border bg-white dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            meeting?.calendar
              ? <EditMeeting meeting={meeting} scheduled={scheduled} setScheduled={setScheduled} setPopup={setPopup} popup={popup} selectedCalendar={meeting?.calendar} />
              : ''
          }
        </div>
      </div>
      <main className="bg-bg p-6 h-full flex flex-col gap-6 dark:bg-neutral-900">
        {
          loading
            ? (
              <div className="flex w-full">
                <div className="m-auto mt-16 mb-16">
                  <Spinner />
                </div>
              </div>
            )
            : (
              <>
                <div className="flex gap-4 w-full max-w-[1280px] mx-auto">
                  <Link href='/reuniones' className='border rounded-xl p-2 h-fit my-auto bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium">{meeting?.firstName} {meeting?.lastName}</h1>
                    <p className="text-lg">{calls?.find(call => call._id === meeting?.meeting)?.nameMeeting} - {meeting?.type}</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl border border-black/5 shadow-card w-full max-w-[1280px] mx-auto bg-white flex gap-16 dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="w-64 flex flex-col gap-4">
                    <p>{(new Date(meeting?.date!)).getHours()}:00 - {(new Date(meeting?.date!)).getHours()}:15</p>
                    <Button2 action={(e: any) => {
                      e.preventDefault()
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    } } config="w-full">Reprogramar</Button2>
                    <Button2Red action={async (e: any) => {
                      e.preventDefault()
                      setPopupCancel({ ...popupCancel, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupCancel({ ...popupCancel, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }} config="w-full">Cancelar</Button2Red>
                  </div>
                  <div className="flex flex-col gap-4 min-w-80">
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Nombre</p>
                      <p>{meeting?.firstName} {meeting?.lastName}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Email</p>
                      <p>{meeting?.email}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Teléfono</p>
                      <p>+56{meeting?.phone}</p>
                    </div>
                  </div>
                  <div className="min-w-80 flex flex-col gap-4">
                    {
                      meeting?.data?.length
                        ? meeting.data.map(data => (
                          <div key={data.name} className="flex flex-col gap-2">
                            <p className="font-medium">{clientData.find(dat => dat.data === data.name)?.name}</p>
                            <p>{data.value}</p>
                          </div>
                        ))
                        : ''
                    }
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Fecha</p>
                      <p>{date}</p>
                    </div>
                    {
                      meeting?.type === 'Visita'
                        ? (
                          <div className="flex flex-col gap-2">
                            <p className="font-medium">Lugar</p>
                            <p>{storeData?.address}, {storeData?.city}, {storeData?.region}</p>
                          </div>
                        )
                        : ''
                    }
                    {
                      meeting?.url
                        ? <ButtonLink href={meeting?.url}>Ingresar a la llamada</ButtonLink>
                        : ''
                    }
                  </div>
                </div>
              </>
            )
        }
      </main>
    </>
  )
}