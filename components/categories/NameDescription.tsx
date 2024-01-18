import axios from 'axios'
import React, { useState } from 'react'
import { ICategory } from '../../interfaces'

interface Props {
  setCategoryInfo: any
  categoryInfo: ICategory
}

export const NameDescription: React.FC<Props> = ({setCategoryInfo, categoryInfo}) => {

  const [descriptionLoading, setDecriptionLoading] = useState(false)
  const [descriptionAi, setDesacriptionAi] = useState('')

  const inputChange = (e: any) => {
    setCategoryInfo({...categoryInfo, [e.target.name]: e.target.value})
  }

  const generateDescription = async () => {
    setDecriptionLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-description-category`, { description: categoryInfo.category })
    const filterSeo = response.data[0].text.split('\n').filter((item: any) => item !== '')
    setDesacriptionAi(filterSeo)
    setDecriptionLoading(false)
  }

  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Nombre</p>
        <input type='text' placeholder='Nombre del producto' name='category' onChange={inputChange} value={categoryInfo.category} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Descripción</p>
        <textarea placeholder='Descripción del producto' name='description' onChange={inputChange} value={categoryInfo.description} className='p-1.5 border rounded text-sm font-light h-36 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        {
          categoryInfo.category !== ''
            ? (
              <button onClick={(e: any) => {
                  e.preventDefault()
                  generateDescription()
                }} className='w-[350px] cursor-pointer h-9 text-sm bg-gradient-to-r transition-opacity duration-200 text-white rounded from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 hover:opacity-75'>{descriptionLoading ? <svg aria-hidden="true" className="w-5 h-5 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg> : 'Crear descripción con inteligencia artificial'}</button>
            )
            : (
              <button onClick={(e: any) => e.preventDefault()} className='w-[350px] cursor-not-allowed h-9 text-sm bg-gradient-to-r text-white rounded from-violet-300 to-fuchsia-300'>{descriptionLoading ? <svg aria-hidden="true" className="w-5 h-5 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg> : 'Crear descripción con inteligencia artificial'}</button>
            )
        }
        {
          descriptionAi !== ''
            ? <textarea value={descriptionAi} onChange={(e: any) => setDesacriptionAi(e.target.value)} className='w-full mt-3 p-1.5 border rounded text-sm font-light h-36 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /> 
            : ''
        }
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Url</p>
        <input type='text' placeholder='Slug' name='slug' onChange={inputChange} value={categoryInfo.slug} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
