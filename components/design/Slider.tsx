import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from "./Slider.module.css"
import { Navigation, Pagination } from "swiper/modules"
import axios from 'axios'
import { Design, ICall, ICategoryPage, IDesign, IForm, IFunnel, IPage, IService } from '@/interfaces'
import { Button, Button2 } from '../ui'
import { ButtonDesign } from './ButtonDesign'

interface Props {
    design: IDesign
    edit: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    ind: number
    inde?: number
    indx?: number
    pageNeed: IPage[]
    funnels?: IFunnel[]
    setFunnels?: any
    responsive: string
    calls: ICall[] | undefined
    forms: IForm[] | undefined
    services?: IService[]
    setServices?: any
    style?: any
}

export const Slider: React.FC<Props> = ({ design, edit, pages, setPages, index, ind, inde, indx, pageNeed, funnels, setFunnels, responsive, calls, forms, services, setServices, style }) => {
  return (
    <div>
      <Swiper
        className={styles.mySwiper}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {
          design.info.banner?.length
            ? design.info.banner.map((banner, i: number) => (
              <SwiperSlide key={i}>
                <div className={`flex ${responsive === '400px' ? 'h-[450px]' : 'h-[700px]'}`}>
                  {
                    edit !== 'Carrusel'
                      ? (
                        <>
                          <div className="m-auto w-full p-4">
                            <div className='max-w-[1280px] w-full m-auto flex flex-col gap-3'>
                              <h1
                                className={`${responsive === '400px' ? 'text-4xl' : 'text-5xl'} transition-opacity duration-200 text-white font-semibold`}
                                dangerouslySetInnerHTML={{ __html: banner.title ? banner.title  : '' }}
                              />
                              <p
                                className={`${responsive === '400px' ? 'text-base' : 'text-lg'} transition-opacity duration-200 text-white`}
                                dangerouslySetInnerHTML={{ __html: banner.description ? banner.description : '' }}
                              />
                              {
                                banner.button && banner.button !== '' && banner.buttonLink && banner.buttonLink !== ''
                                  ? <ButtonDesign style={style} text={banner.button} /> 
                                  : ''
                              }
                            </div>
                          </div>
                          <Image width={1920} height={1080} className={`absolute object-cover h-full w-full -z-10`} src={banner.image!} alt='banner' />
                        </>
                      )
                      : (
                        <>
                        <div className="m-auto w-full p-4">
                          <div className='max-w-[1600px] w-full m-auto flex flex-col gap-4'>
                            <textarea placeholder='Titulo' value={banner.title} onChange={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                if (oldFunnels[inde].steps[ind].design![index].info.banner?.length) {
                                  oldFunnels[inde].steps[ind].design![index].info.banner![i].title = e.target.value
                                  setFunnels(oldFunnels)
                                }
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                if (oldServices[indx].steps[ind].design![index].info.banner?.length) {
                                  oldServices[indx].steps[ind].design![index].info.banner![i].title = e.target.value
                                  setServices(oldServices)
                                }
                              } else {
                                const oldPages = [...pages]
                                if (oldPages[ind].design[index].info.banner?.length) {
                                  oldPages[ind].design[index].info.banner![i].title = e.target.value
                                  setPages(oldPages)
                                }
                              }
                            }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} text-white font-semibold p-1.5 rounded border bg-transparent`} style={{ color: design.info.textColor }} />
                            <textarea placeholder='Descripción' value={banner.description} onChange={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                if (oldFunnels[inde].steps[ind].design![index].info.banner?.length) {
                                  oldFunnels[inde].steps[ind].design![index].info.banner![i].description = e.target.value
                                  setFunnels(oldFunnels)
                                }
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                if (oldServices[indx].steps[ind].design![index].info.banner?.length) {
                                  oldServices[indx].steps[ind].design![index].info.banner![i].description = e.target.value
                                  setServices(oldServices)
                                }
                              } else {
                                const oldPages = [...pages]
                                if (oldPages[ind].design[index].info.banner?.length) {
                                  oldPages[ind].design[index].info.banner![i].description = e.target.value
                                  setPages(oldPages)
                                }
                              }
                            }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} text-white p-1.5 rounded border bg-transparent`} style={{ color: design.info.textColor }} />
                            <div className='flex gap-4'>
                              <div className='px-6 py-2 text-white' style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style?.form === 'Redondeadas' ? `${style?.borderButton}px` : '' }}>
                                <input type='text' placeholder='Boton' className='text-white border border-neutral-500 bg-transparent' value={banner.button} onChange={(e: any) => {
                                  if (inde !== undefined) {
                                    const oldFunnels = [...funnels!]
                                    if (oldFunnels[inde].steps[ind].design![index].info.banner?.length) {
                                      oldFunnels[inde].steps[ind].design![index].info.banner![i].button = e.target.value
                                      setFunnels(oldFunnels)
                                    }
                                  } else if (indx !== undefined) {
                                    const oldServices = [...services!]
                                    if (oldServices[indx].steps[ind].design![index].info.banner?.length) {
                                      oldServices[indx].steps[ind].design![index].info.banner![i].button = e.target.value
                                      setServices(oldServices)
                                    }
                                  } else {
                                    const oldPages = [...pages]
                                    if (oldPages[ind].design[index].info.banner?.length) {
                                      oldPages[ind].design[index].info.banner![i].button = e.target.value
                                      setPages(oldPages)
                                    }
                                  }
                                }} />
                              </div>
                              <select value={banner.buttonLink} onChange={(e: any) => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  if (oldFunnels[inde].steps[ind].design![index].info.banner?.length) {
                                    oldFunnels[inde].steps[ind].design![index].info.banner![i].buttonLink = e.target.value
                                    setFunnels(oldFunnels)
                                  }
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  if (oldServices[indx].steps[ind].design![index].info.banner?.length) {
                                    oldServices[indx].steps[ind].design![index].info.banner![i].buttonLink = e.target.value
                                    setServices(oldServices)
                                  }
                                } else {
                                  const oldPages = [...pages]
                                  if (oldPages[ind].design[index].info.banner?.length) {
                                    oldPages[ind].design[index].info.banner![i].buttonLink = e.target.value
                                    setPages(oldPages)
                                  }
                                }
                              }} className='rounded'>
                                <option>Acción boton</option>
                                {
                                  pageNeed.map(page => (
                                    <option key={page.slug}>/{page.slug}</option>
                                  ))
                                }
                                {
                                  funnels?.map(funnel => {
                                    return funnel.steps.map(step => (
                                      <option key={step._id} value={step.slug}>Ir a {funnel.funnel} - {step.step}</option>
                                    ))
                                  })
                                }
                                <option>Abrir popup</option>
                                {
                                  forms?.map(form => <option key={form._id} value={form._id}>Abrir formulario {form.nameForm} como popup</option>)
                                }
                                {
                                  calls?.map(call => <option key={call._id} value={call._id}>Abrir llamada {call.nameMeeting} como popup</option>)
                                }
                              </select>
                            </div>
                            <input type='file' className='m-auto text-white text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/40 file:text-white hover:file:bg-main/20' onChange={async (e: any) => {
                              const formData = new FormData();
                              formData.append('image', e.target.files[0]);
                              formData.append('name', e.target.files[0].name);
                              const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                headers: {
                                  accept: 'application/json',
                                  'Accept-Language': 'en-US,en;q=0.8'
                                }
                              })
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                if (oldFunnels[inde].steps[ind].design![index].info.banner?.length) {
                                  oldFunnels[inde].steps[ind].design![index].info.banner![i].image = data
                                  setFunnels(oldFunnels)
                                }
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                if (oldServices[indx].steps[ind].design![index].info.banner?.length) {
                                  oldServices[indx].steps[ind].design![index].info.banner![i].image = data
                                  setServices(oldServices)
                                }
                              } else {
                                const oldPages = [...pages]
                                if (oldPages[ind].design[index].info.banner?.length) {
                                  oldPages[ind].design[index].info.banner![i].image = data
                                  setPages(oldPages)
                                }
                              }
                            }} />
                            <Button2 action={() => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  if (oldFunnels[inde].steps[ind].design![index].info.banner?.length) {
                                    oldFunnels[inde].steps[ind].design![index].info.banner?.push({ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' })
                                    setFunnels(oldFunnels)
                                  }
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  if (oldServices[indx].steps[ind].design![index].info.banner?.length) {
                                    oldServices[indx].steps[ind].design![index].info.banner?.push({ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' })
                                    setServices(oldServices)
                                  }
                                } else {
                                  const oldPages = [...pages]
                                  if (oldPages[ind].design[index].info.banner?.length) {
                                    oldPages[ind].design[index].info.banner?.push({ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' })
                                    setPages(oldPages)
                                  }
                                }
                              }}>Agregar banner</Button2>
                          </div>
                        </div>
                        <Image width={1920} height={1080} className={`absolute object-cover h-full w-full -z-10`} src={banner.image!} alt='banner' />
                        </>
                      )
                  }
                </div>
              </SwiperSlide>
            ))
            : ''
        }
      </Swiper>
    </div>
  )
}
