import React from 'react'
import Image from 'next/image'
import { IFunnel, IService } from '@/interfaces'
import { useSession } from 'next-auth/react'

interface Props {
    popup: any
    setPopup: any
    pages?: any
    indexPage?: any
    indexFunnel?: any
    indexStep?: any
    setPages?: any
    funnels?: IFunnel[]
    setFunnels?: any
    indexService?: any
    indexStepService?: any
    services?: IService[]
    setServices?: any
}

export const PopupPagesBlocks: React.FC<Props> = ({ popup, setPopup, pages, indexPage, indexFunnel, indexStep, setPages, funnels, setFunnels, indexService, indexStepService, services, setServices }) => {
  
  const { data: session } = useSession()
  
  return (
    <div onClick={() => {
        if (!popup.mouse) {
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 bg-black/30 fixed z-50`}>
        <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 p-8 bg-white h-[550px] m-auto rounded-xl border w-[810px] flex flex-col gap-4 shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <h2 className='font-medium text-lg'>Bloques de contenidos</h2>
          <div className='flex flex-wrap gap-4 overflow-y-auto'>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: 'https://images-imagenes-upvisor-web.b-cdn.net/Imagen%20prueba.jpg' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: 'https://images-imagenes-upvisor-web.b-cdn.net/Imagen%20prueba.jpg' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: 'https://images-imagenes-upvisor-web.b-cdn.net/Imagen%20prueba.jpg' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Slider.png' />
              <p className="m-auto">Carrusel</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloque%201.png' />
              <p className="m-auto">Bloque 1</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloque%202.png' />
              <p className="m-auto">Bloque 2</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloque%203.png' />
              <p className="m-auto">Bloque 3</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloque%204.png' />
              <p className="m-auto">Bloque 4</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloque%205.png' />
              <p className="m-auto">Bloque 5</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Contacto.png' />
              <p className="m-auto">Contacto</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border my-auto dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Suscripci%C3%B3n.png' />
              <p className="mx-auto">Suscripción</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Lead%201.png' />
              <p className="m-auto">Lead 1</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Video.png' />
              <p className="m-auto">Video</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Agendar%20llamada.png' />
              <p className="m-auto">Agendar llamada</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border m-auto dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloque%207.png' />
              <p className="mx-auto">Bloque 7</p>
            </div>
            {
              session?.user.plan === 'Inicial'
                ? ''
                : (
                  <div onClick={() => {
                    if (indexPage !== -1) {
                      const oldPages = [...pages]
                      oldPages[indexPage].design.push({ content: 'Checkout', info: {  } })
                      setPages(oldPages)
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    } else if (indexFunnel !== -1 && indexStep !== -1) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Checkout', info: {  } })
                      setFunnels(oldFunnels)
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    } else if (indexService !== -1 && indexStepService !== -1) {
                      const oldServices = [...services!]
                      oldServices[indexService].steps[indexStepService].design?.push({ content: 'Checkout', info: {  } })
                      setServices(oldServices)
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    }
                  }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
                    <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Checkout.png' />
                    <p className="m-auto">Checkout</p>
                  </div>
                )
            }
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Llamadas', meetings: [], info: {  } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Llamadas', meetings: [], info: {  } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Llamadas', meetings: [], info: {  } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Calls.png' />
              <p className="m-auto">Llamadas</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Lead%202.png' />
              <p className="m-auto">Lead 2</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Servicios.png' />
              <p className="m-auto">Servicios</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Planes.png' />
              <p className="m-auto">Planes</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Preguntas%20frecuentes.png' />
              <p className="m-auto">Preguntas frecuentes</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Bloques.png' />
              <p className="m-auto">Bloques</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Rese%C3%B1as.png' />
              <p className="m-auto">Reseñas</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Formulario.png' />
              <p className="m-auto">Formulario</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Lead%203.png' />
              <p className="m-auto">Lead 3</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30 dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='https://imagenes-upvisor-web.b-cdn.net/Tabla%20comparativa.png' />
              <p className="m-auto">Tabla comparativa</p>
            </div>
          </div>
        </div>
      </div>
  )
}
