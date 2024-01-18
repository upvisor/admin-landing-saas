"use client"
import { CategorySeo, Media, NameDescription } from '@/components/categories'
import { ICategory } from '@/interfaces'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Spinner2 } from '../../../../components/ui'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default  function Page () {

  const [categoryInfo, setCategoryInfo] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [loading, setLoading] = useState(false)
  const initialCategory = { category: '' }

  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, categoryInfo)
    router.push('/productos/categorias')
  }

  return (
    <>
      <Head>
        <title>Nueva categoría</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                categoryInfo.category === initialCategory.category
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 text-white text-sm rounded w-40 h-9 cursor-not-allowed'>{loading ? <Spinner2 /> : 'Crear categoría'}</button>
                  : <button onClick={handleSubmit} className='bg-main text-white border border-main transition-colors duration-200 text-sm rounded-md w-40 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Crear categoría'}</button>
              }
              <Link className='pt-1.5 pb-1.5 my-auto text-sm rounded pl-4 pr-4' href='/productos/categorias'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] w-full mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/productos/categorias' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl font-medium mt-auto mb-auto'>Nueva categoría</h1>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <NameDescription categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
              <CategorySeo categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
            </div>
            <div className='flex gap-4 flex-col w-1/3'>
              <Media categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
            </div>
          </form>
        </div>
    </>
  )
}