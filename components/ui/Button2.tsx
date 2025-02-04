import React, { PropsWithChildren } from 'react'
import { Spinner2 } from '.'

interface Props {
    action?: any
    config?: string
    loading?: boolean
}

export const Button2: React.FC<PropsWithChildren<Props>> = ({ children, action, config, loading }) => {
  return (
    <button onClick={action} className={`${config} ${loading ? `cursor-not-allowed bg-main/80 hover:bg-main/80` : `hover:bg-main/80 bg-main`} bg-main min-h-9 h-9 px-4 w-fit text-white text-sm rounded-xl transition-colors duration-300 hover:bg-main/80`}>{ loading !== undefined ? loading ? <Spinner2 /> : children : children }</button>
  )
}
