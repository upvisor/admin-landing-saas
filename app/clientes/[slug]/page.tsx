"use client"
import { Button, Button2, Button2Red, ButtonSubmit, ButtonSubmit2, Card, Input, Spinner, Textarea } from '@/components/ui'
import { IClient, IFunnel, IMeeting, IService } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { SlArrowDown } from 'react-icons/sl'

export default function Page ({ params }: { params: { slug: string } }) {

  const [clientData, setClientData] = useState<Partial<IClient>>()
  const [tags, setTags] = useState([])
  const [loadingClientTag, setLoadingClientTag] = useState(false)
  const [newClientTag, setNewClientTag] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [popupEmail, setPopupEmail] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [email, setEmail] = useState({ subject: '', email: '' })
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [funnels, setFunnels] = useState<IFunnel[]>()
  const [data, setData] = useState([])
  const [dataView, setDataView] = useState(false)
  const [services, setServices] = useState<IService[]>([])
  const [popupPrice, setPopupPrice] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [price, setPrice] = useState('')
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [service, setService] = useState<IService>()

  const router = useRouter()

  useEffect(() => {
    const getClientData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-email/${params.slug}`);
        setClientData(response.data);
        
        // Usar Promise.all para esperar que todas las llamadas se completen
        const funnelsFind = await Promise.all(
          response.data.funnels.map(async (funnel: any) => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${funnel.funnel}`);
            return res.data;
          })
        );
        
        setFunnels(funnelsFind);
  
        const respon = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`);
        const filter = respon.data.filter((service: IService) => 
          response.data.services.some((serv: any) => serv.service === service._id)
        );
        setServices(filter);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
  
    getClientData();
  }, [params.slug]);

  const getClientTags = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const getMeetings = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meetings/${params.slug}`)
    setMeetings(res.data)
  }

  useEffect(() => {
    getMeetings()
  }, [])

  const getData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteClient = async (e: any) => {
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/client/${clientData?._id}`)
      router.push('/clientes')
    }
  }

  return (
    <>
      <Head>
        <title>Cliente: {clientData?._id}</title>
      </Head>
      <div onClick={() => {
        if (!popupPrice.mouse) {
          setPopupPrice({ ...popupPrice, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupPrice({ ...popupPrice, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupPrice.view} ${popupPrice.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
        <div onMouseEnter={() => setPopupPrice({ ...popupPrice, mouse: true })} onMouseLeave={() => setPopupPrice({ ...popupPrice, mouse: false })} className={`${popupPrice.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 w-[500px] p-6 flex flex-col gap-2 rounded-xl border bg-white m-auto dark:bg-neutral-800 dark:border-neutral-700`} style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
          <p>Asignar precio</p>
          <Input change={(e: any) => setPrice(e.target.value)} placeholder='Precio' value={price} />
          <div className='flex gap-6'>
            <ButtonSubmit action={async (e: any) => {
              e.preventDefault()
              if (!loadingPrice) {
                setLoadingPrice(true)
                const oldServices = [...clientData?.services!]
                oldServices.find(servi => servi.service === service?._id)!.price = price
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData?._id}`, { services: oldServices })
                setPopupPrice({ ...popupPrice, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupPrice({ ...popupPrice, view: 'hidden', opacity: 'opacity-0' })
                  setLoadingPrice(false)
                }, 200)
              }
            }} color='main' submitLoading={loadingPrice} textButton='Asignar precio' config='w-44' />
            <button onClick={() => {
              setPopupPrice({ ...popupPrice, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupPrice({ ...popupPrice, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }}>Cancelar</button>
          </div>
        </div>
      </div>
      {
        clientData?.email
          ? (
            <div onClick={() => {
              if (!popup.mouse) {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
              <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 w-[500px] p-6 flex flex-col gap-2 rounded-xl border bg-white m-auto dark:bg-neutral-800 dark:border-neutral-700`} style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
                <p>Estas seguro que deseas eliminar el cliente <span className='font-semibold'>{clientData!.email}</span></p>
                <div className='flex gap-6'>
                  <ButtonSubmit action={deleteClient} color='red-500' submitLoading={loading} textButton='Eliminar cliente' config='w-44' />
                  <button onClick={() => {
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                    }, 200)
                  }}>Cancelar</button>
                </div>
              </div>
            </div>
          )
          : ''
      }
      {
        clientData?.email
          ? (
            <div onClick={() => {
              if (!popupEmail.mouse) {
                setPopupEmail({ ...popupEmail, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupEmail({ ...popupEmail, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`${popupEmail.view} ${popupEmail.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
              <div onMouseEnter={() => setPopupEmail({ ...popupEmail, mouse: true })} onMouseLeave={() => setPopupEmail({ ...popupEmail, mouse: false })} className={`${popupEmail.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 w-[700px] p-8 flex flex-col gap-4 rounded-xl border bg-white m-auto dark:bg-neutral-800 dark:border-neutral-700`} style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
                <h3 className='text-lg font-medium'>Enviar email</h3>
                <div className='flex flex-col gap-2'>
                  <p>Asunto</p>
                  <Input placeholder='Asunto' value={email.subject} change={(e: any) => setEmail({ ...email, subject: e.target.value })} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Correo</p>
                  <Textarea placeholder='Correo' value={email.email} change={(e: any) => setEmail({ ...email, email: e.target.value })} />
                </div>
                <ButtonSubmit action={async (e: any) => {
                  e.preventDefault()
                  if (!loadingEmail) {
                    setLoadingEmail(true)
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/email/${clientData.email}`, email)
                    setPopupEmail({ ...popupEmail, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupEmail({ ...popupEmail, view: 'hidden', opacity: 'opacity-0' })
                      setLoadingEmail(false)
                    }, 200)
                  }
                }} color='main' submitLoading={loadingEmail} textButton='Envíar correo' config='w-36' />
              </div>
            </div>
          )
          : ''
      }
      <div className='bg-bg p-6 overflow-y-auto dark:bg-neutral-900 h-full'>
        <div className='flex flex-col gap-6 w-full max-w-[1280px] m-auto'>
          {
            clientData
              ? (
                <>
                  <div className='flex gap-3 w-full justify-between m-auto'>
                    <div className='flex gap-3 my-auto'>
                      <Link href='/clientes' className='border rounded-xl p-2 bg-white transition-colors duration-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                      <h1 className='text-2xl font-medium mt-auto mb-auto'>{ clientData.email }</h1>
                    </div>
                    <Button action={(e: any) => {
                      e.preventDefault()
                      setPopupEmail({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupEmail({ ...popup, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Envíar email</Button>
                  </div>
                  <form className='flex gap-6 w-full m-auto'>
                    <div className='flex gap-6 flex-col w-2/3'>
                      <Card title='Servicios'>
                        {
                          services.length
                            ? services.map(service => {
                              if (clientData.services?.find(serv => serv.service === service._id)?.step && clientData.services?.find(serv => serv.service === service._id)?.step !== '') {
                                return (
                                  <div key={service._id} className='flex gap-4 justify-around overflow-y-auto'>
                                    <p className='my-auto text-center min-w-32'>{clientData.services?.find(serv => serv.service === service._id)?.payStatus}</p>
                                    <p className='my-auto text-center min-w-32'>{service.name}</p>
                                    {
                                      clientData.services?.find(serv => serv.service === service._id)?.price
                                        ? <p className='text-center my-auto min-w-32'>${NumberFormat(Number(clientData.services?.find(serv => serv.service === service._id)?.price))}</p>
                                        : <Button2 color='main' action={(e: any) => {
                                          e.preventDefault()
                                          setService(service)
                                          setPopupPrice({ ...popupPrice, view: 'flex', opacity: 'opacity-0' })
                                          setTimeout(() => {
                                            setPopupPrice({ ...popupPrice, view: 'flex', opacity: 'opacity-1' })
                                          }, 10)
                                        }}>Asignar precio</Button2>
                                    }
                                    <p className='my-auto text-center min-w-32'>{service.typeService}</p>
                                    <p className='my-auto text-center min-w-32'>{service.typePrice}</p>
                                    <p className='my-auto text-center min-w-32'>{service.steps.find(step => step._id === clientData.services!.find(serv => serv.service === service._id)!.step)?.step}</p>
                                  </div>
                                )
                              } else {
                                return <p key={service._id}>Este cliente no esta asociado a algun servicio</p>
                              }
                            })
                            : <p>Este cliente no esta asociado a algun servicio</p>
                        }
                      </Card>
                      <Card title='Embudo actual'>
                        {
                          funnels?.length
                            ? funnels.map((funnel, index) => (
                              <>
                                <p>Embudo: {funnel?.funnel}</p>
                                <p>Etapas:</p>
                                <div className='flex gap-4 justify-around overflow-x-auto'>
                                  {
                                    funnel?.steps.map(step => {
                                      if (step._id === clientData.funnels![index].step) {
                                        return (
                                          <div key={step._id} className='p-4 bg-main rounded-lg flex'>
                                            <p className='text-white my-auto text-center'>{step.step}</p>
                                          </div>
                                        )
                                      } else {
                                        return (
                                          <div key={step._id} className='p-4 flex'>
                                            <p className='m-auto text-center'>{step.step}</p>
                                          </div>
                                        )
                                      }
                                    })
                                  }
                                </div>
                              </>
                            ))
                            : <p>Este cliente no esta en un embudo</p>
                        }
                      </Card>
                      <Card title='Llamadas'>
                        {
                          meetings.length
                            ? meetings.map((meeting, index) => (
                              <button key={meeting._id} onClick={(e: any) => {
                                e.preventDefault()
                                router.push(`/llamadas/${meeting._id}`)
                              }} className={`${index + 1 < meetings.length ? 'border-b border-border' : ''} flex rounded-lg gap-4 p-4 justify-between transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700`}>
                                <p>{meeting.meeting}</p>
                                <p>{new Date(meeting.date).toLocaleDateString()} - {new Date(meeting.date).toLocaleTimeString()}</p>
                              </button>
                            ))
                            : <p>Este cliente no ha agendado ninguna llamada</p>
                        }
                      </Card>
                    </div>
                    <div className='flex gap-6 flex-col w-1/3'>
                      <Card title='Datos'>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Nombre</p>
                          <Input placeholder='Nombre' value={clientData.firstName} change={(e: any) => setClientData({ ...clientData, firstName: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Apellido</p>
                          <Input placeholder='Apellido' value={clientData.lastName} change={(e: any) => setClientData({ ...clientData, lastName: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Email</p>
                          <Input placeholder='Email' value={clientData.email} change={(e: any) => setClientData({ ...clientData, email: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Teléfono</p>
                          <Input placeholder='Teléfono' value={clientData.phone} change={(e: any) => setClientData({ ...clientData, phone: e.target.value })} />
                        </div>
                        {
                          data?.length
                            ? (
                              <div className='flex flex-col gap-4'>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  if (dataView) {
                                    setDataView(false)
                                  } else {
                                    setDataView(true)
                                  }
                                }} className='w-full flex gap-4 justify-between'>
                                  <p className='font-medium my-auto'>Campos personalizados</p>
                                  <SlArrowDown className={`${dataView ? 'rotate-180' : ''} transition-all duration-200 text-lg my-auto`} />
                                </button>
                                {
                                  dataView
                                    ? data.map((data: any) => {
                                      if (data.data === 'firstName' || data.data === 'lastName' || data.data === 'email' || data.data === 'phone') {
                                        return
                                      } else {
                                        return (
                                          <div key={data.data} className='flex flex-col gap-2'>
                                            <p className='text-sm'>{data.data}</p>
                                            <Input placeholder='Teléfono' value={clientData.data!.find(dat => dat.name === data.data)?.value} change={(e: any) => {
                                              const oldData = [...clientData.data!]
                                              if (oldData.find(dat => dat.name === data.data)) {
                                                oldData.find(dat => dat.name === data.data)!.value = e.target.value
                                              } else {
                                                oldData.push({ name: data.data, value: e.target.value })
                                              }
                                              setClientData({ ...clientData, data: oldData })
                                            }} />
                                          </div>
                                        )
                                      }
                                    })
                                    : ''
                                }
                              </div>
                            )
                            : ''
                        }
                        <ButtonSubmit2 action={async (e: any) => {
                          e.preventDefault()
                          if (!loadingEdit) {
                            setLoadingEdit(true)
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/client/${params.slug}`, clientData)
                            setLoadingEdit(false)
                          }
                        }} color='main' submitLoading={loadingEdit} textButton='Guardar datos' config='w-40' />
                      </Card>
                      <Card title='Tags'>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Tags</p>
                          {
                            tags?.length
                              ? <div className='flex gap-3 flex-wrap'>
                                {
                                  tags.map((tag: any) => (
                                    <div className='flex gap-1' key={tag.tag}>
                                      <input onChange={async (e: any) => {
                                        if (clientData.tags) {
                                          if (e.target.checked) {
                                            const tags = clientData.tags.concat(e.target.value)
                                            setClientData({...clientData, tags: tags})
                                            const updated = {...clientData, tags: tags}
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                          } else {
                                            const filter = clientData.tags.filter(tag => tag !== e.target.value)
                                            setClientData({...clientData, tags: filter})
                                            const updated = {...clientData, tags: filter}
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                          }
                                        } else {
                                          setClientData({...clientData, tags: [e.target.value]})
                                          const updated = {...clientData, tags: [e.target.value]}
                                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                        }
                                      }} value={tag.tag} type='checkbox' checked={clientData.tags?.find(e => e === tag.tag) ? true : false} />
                                      <p className='text-sm'>{tag.tag}</p>
                                    </div>
                                  ))
                                }
                              </div>
                              : <p className='text-sm'>No hay tags creados</p>
                          }
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Nuevo tag</p>
                          <div className='flex gap-2'>
                            <Input placeholder='Nuevo tag' change={(e: any) => setNewClientTag(e.target.value)} value={newClientTag} />
                            <ButtonSubmit2 action={async (e: any) => {
                              e.preventDefault()
                              if (!loadingClientTag) {
                                setLoadingClientTag(true)
                                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newClientTag })
                                setNewClientTag('')
                                getClientTags()
                                setLoadingClientTag(false)
                              }
                            }} color='main' submitLoading={loadingClientTag} textButton='Crear tag' config='w-32' />
                          </div>
                        </div>
                      </Card>
                      <div className='flex flex-col gap-4 p-2'>
                        <h2 className='font-medium'>Eliminar cliente</h2>
                        <Button2Red action={(e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }}>Eliminar</Button2Red>
                      </div>
                    </div>
                  </form>
                </>
              )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </>
  )
}