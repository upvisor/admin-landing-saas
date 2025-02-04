import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Button2, ButtonSubmit2, Calendar, Input, Select, Textarea } from '../ui'
import { ICall, IClientData, IFunnel, ITag } from '@/interfaces'
import { AiOutlineClose } from 'react-icons/ai'
import { useSession } from 'next-auth/react'

interface Props {
  popupCall: { view: string, opacity: string, mouse: boolean }
  setPopupCall: any
  titleMeeting: string
  newCall: ICall
  setNewCall: any
  getCalls: any
  tags: ITag[]
  getTags: any
  error: string
  setError: any
  funnels: IFunnel[]
  newData: string
  setNewData: any
  loadingNewData: boolean
  setLoadingNewData: any
  clientData: IClientData[]
  getClientData: any
  calls?: ICall[]
}

export const PopupNewCall: React.FC<Props> = ({ popupCall, setPopupCall, titleMeeting, newCall, setNewCall, getCalls, tags, getTags, error, setError, funnels, newData, setNewData, loadingNewData, setLoadingNewData, clientData, getClientData, calls }) => {

  const [loadingNewCall, setLoadingNewCall] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [loadingTag, setLoadingTag] = useState(false)
  const [calendars, setCalendars] = useState<any>([])

  const { data: session } = useSession()

  const popupRef = useRef<HTMLFormElement | null>(null);

  const getCalendars = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calendar`)
    setCalendars(res.data)
  }

  useEffect(() => {
    getCalendars()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popupCall.view === 'flex') {
        setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopupCall({ ...popupCall, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupCall, setPopupCall]);

  return (
    <div className={`${popupCall.view} ${popupCall.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50 p-4`}>
        <form ref={popupRef} onSubmit={async (e: any) => {
          e.preventDefault()
          if (!loadingNewCall) {
            setLoadingNewCall(true)
            setError('')
            if (session?.user.plan === 'Inicial' && calls?.filter(call => call.type === 'Llamada por Zoom').length === 2) {
              setError('Solo puedes tener 2 llamadas por Zoom')
              setLoadingNewCall(false)
              return
            } else if (session?.user.plan === 'Inicial' && calls?.filter(call => call.type === 'Visita').length === 2) {
              setError('Solo puedes tener 2 visitas')
              setLoadingNewCall(false)
              return
            } else if (session?.user.plan === 'Emprendedor' && calls?.filter(call => call.type === 'Llamada por Zoom').length === 5) {
              setError('Solo puedes tener 5 llamadas por Zoom')
              setLoadingNewCall(false)
              return
            } else if (session?.user.plan === 'Emprendedor' && calls?.filter(call => call.type === 'Visita').length === 5) {
              setError('Solo puedes tener 5 visitas')
              setLoadingNewCall(false)
              return
            }
            if (titleMeeting === 'Crear llamada') {
              if (newCall.nameMeeting !== '') {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/call`, newCall)
                getCalls()
                setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupCall({ ...popupCall, view: 'hidden', opacity: 'opacity-0' })
                  setLoadingNewCall(false)
                }, 200)
              } else {
                setError('Debes llenar todos los datos')
                setLoadingNewCall(false)
              }
            } else {
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/call/${newCall._id}`, newCall)
              getCalls()
              setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupCall({ ...popupCall, view: 'hidden', opacity: 'opacity-0' })
                setLoadingNewCall(false)
              }, 200)
            }
          }
        }} onMouseEnter={() => setPopupCall({ ...popupCall, mouse: true })} onMouseLeave={() => setPopupCall({ ...popupCall, mouse: false })} onMouseMove={() => setPopupCall({ ...popupCall, mouse: true })} className={`${popupCall.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-6 lg:p-8 rounded-2xl m-auto border flex flex-col gap-4 border-white bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{ error }</p>
              : ''
          }
          <p className="text-lg font-medium">{titleMeeting}</p>
          <div className="flex flex-col gap-2">
            <p>Tipo</p>
            <Select change={(e: any) => setNewCall({ ...newCall, type: e.target.value })} value={newCall.type}>
              <option value=''>Seleccionar tipo</option>
              <option>Llamada por Zoom</option>
              <option>Visita</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Nombre de la llamada</p>
            <Input change={(e: any) => setNewCall({ ...newCall, nameMeeting: e.target.value })} placeholder='Nombre de la llamada' value={newCall.nameMeeting} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Seleccionar calendario</p>
            <Select change={(e: any) => setNewCall({ ...newCall, calendar: e.target.value })} value={newCall.calendar}>
              <option>Seleccionar calendario</option>
              {
                calendars.map((calendar: any) => <option key={calendar._id} value={calendar._id}>{calendar.name}</option>)
              }
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Titulo</p>
            <Input change={(e: any) => setNewCall({ ...newCall, title: e.target.value })} placeholder='Titulo' value={newCall.title} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Duración</p>
            <Select change={(e: any) => setNewCall({ ...newCall, duration: e.target.value })} value={newCall.duration}>
              <option value='15 minutos'>15 minutos</option>
              <option value='20 minutos'>20 minutos</option>
              <option value='25 minutos'>25 minutos</option>
              <option value='30 minutos'>30 minutos</option>
              <option value='40 minutos'>40 minutos</option>
              {
                newCall.type === 'Visita'
                  ? (
                    <>
                      <option value='45 minutos'>45 minutos</option>
                      <option value='50 minutos'>50 minutos</option>
                      <option value='60 minutos'>60 minutos</option>
                      <option value='70 minutos'>70 minutos</option>
                      <option value='80 minutos'>80 minutos</option>
                      <option value='90 minutos'>90 minutos</option>
                      <option value='100 minutos'>100 minutos</option>
                      <option value='110 minutos'>110 minutos</option>
                      <option value='120 minutos'>120 minutos</option>
                    </>
                  )
                  : ''
              }
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Descripción</p>
            <Textarea change={(e: any) => setNewCall({ ...newCall, description: e.target.value })} placeholder='Descripción' value={newCall.description!} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Precio</p>
            <Input change={(e: any) => setNewCall({ ...newCall, price: e.target.value })} placeholder='Precio' value={newCall.price} />
          </div>
          <div className="flex flex-col gap-2">
            <p className='font-medium'>Formulario</p>
            {
              newCall.labels?.length
                ? newCall.labels.map((label, i) => (
                  <>
                    <div className='flex gap-4 justify-between'>
                      <p className='font-medium'>Campo {i + 1}</p>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        const oldLabels = [...newCall.labels!]
                        oldLabels.splice(i, 1)
                        setNewCall({ ...newCall, labels: oldLabels })
                      }}><AiOutlineClose /></button>
                    </div>
                    <p>Texto</p>
                    <Input placeholder='Texto' change={(e: any) => {
                      const oldData = [...newCall.labels!]
                      oldData[i].text = e.target.value
                      setNewCall({ ...newCall, data: oldData })
                    }} value={label.text} />
                    <p>Dato</p>
                    <Select change={(e: any) => {
                      const oldData = [...newCall.labels!]
                      oldData[i].data = e.target.value
                      oldData[i].name = clientData.find(dat => dat.data === e.target.value)!.name
                      setNewCall({ ...newCall, data: oldData })
                    }} value={label.data}>
                      <option value=''>Seleccionar dato</option>
                      {
                        clientData?.length
                          ? clientData.map(data => (
                            <option key={data.data} value={data.data}>{data.name}</option>
                          ))
                          : ''
                      }
                    </Select>
                  </>
                ))
                : ''
            }
            <Button2 action={(e: any) => {
              e.preventDefault()
              if (newCall.labels) {
                const oldData = [...newCall.labels]
                oldData.push({ text: '', data: '', name: '' })
                setNewCall({ ...newCall, labels: oldData })
              } else {
                setNewCall({ ...newCall, data: [{ data: '', text: '' }] })
              }
            }}>Agregar campo</Button2>
          </div>
          <div className='flex flex-col gap-2'>
            <p>Crear dato personalizado</p>
            <div className='flex gap-2'>
              <Input change={(e: any) => setNewData(e.target.value)} value={newData} placeholder='Nuevo dato' />
              <ButtonSubmit2 color='main' action={async (e: any) => {
                e.preventDefault()
                if (!loadingNewData) {
                  setLoadingNewData(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-data`, { data: newData })
                  setNewData('')
                  getClientData()
                  setLoadingNewData(false)
                }
              }} submitLoading={loadingNewData} textButton='Crear dato' config='w-36' />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Texto boton</p>
            <Input change={(e: any) => setNewCall({ ...newCall, buttonText: e.target.value })} value={newCall.buttonText} placeholder='Texto boton' />
          </div>
          <div className="flex flex-col gap-2">
            <p>Tags</p>
            {
              tags.length
                ? (
                  <div className="flex gap-2 flex-wrap">
                    {
                      tags.map(tag => (
                        <div key={tag._id} className="flex gap-1">
                          <input onChange={(e: any) => {
                            if (e.target.checked) {
                              const oldTags = [...newCall.tags ? newCall.tags : []]
                              oldTags.push(tag.tag)
                              setNewCall({ ...newCall, tags: oldTags })
                            } else {
                              const oldTags = newCall.tags!.filter(tg => tg !== tag.tag)
                              setNewCall({ ...newCall, tags: oldTags })
                            }
                          }} type="checkbox" checked={newCall.tags?.includes(tag.tag)} />
                          <p>{tag.tag}</p>
                        </div>
                      ))
                    }
                  </div>
                )
                : <p>No tienes tags creados</p>
            }
            <p>Nuevo tag</p>
            <div className='flex gap-2'>
              <Input placeholder='Nuevo tag' change={(e: any) => setNewTag(e.target.value)} value={newTag} />
              <ButtonSubmit2 submitLoading={loadingTag} textButton='Crear tag' action={async (e: any) => {
                e.preventDefault()
                if (!loadingTag) {
                  setLoadingTag(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newTag })
                  getTags()
                  setNewTag('')
                  setLoadingTag(false)
                }
              }} color='main' config='w-32' />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Acción al agendar llamada</p>
            <Select change={(e: any) => setNewCall({ ...newCall, action: e.target.value })} value={newCall.action}>
              <option>Mostrar mensaje</option>
              <option>Ir a una pagina</option>
            </Select>
          </div>
          {
            newCall.action === 'Mostrar mensaje'
              ? (
                <div className="flex flex-col gap-2">
                  <p>Mensaje despues de agendar</p>
                  <Textarea placeholder="Mensaje" change={(e: any) => setNewCall({ ...newCall, message: e.target.value })} value={newCall.message!} />
                </div>
              )
              : ''
          }
          {
            newCall.action === 'Ir a una pagina'
              ? (
                <div className="flex flex-col gap-2">
                  <p>Mensaje despues de agendar</p>
                  <Select change={(e: any) => setNewCall({ ...newCall, redirect: e.target.value })}>
                    <option value=''>Seleccionar pagina</option>
                    {
                      funnels.map(funnel => (
                        <>
                          {
                            funnel.steps.map(step => (
                              <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>
                            ))
                          }
                        </>
                      ))
                    }
                  </Select>
                </div>
              )
              : ''
          }
          <Button type='submit' loading={loadingNewCall} config='w-full'>{titleMeeting === 'Crear reunion' ? 'Crear reunion' : 'Editar reunion'}</Button>
        </form>
      </div>
  )
}
