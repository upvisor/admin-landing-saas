import React, { PropsWithChildren } from 'react'

interface Props {
    action?: any
    config?: any
    type?: any
}

export const ButtonRed: React.FC<PropsWithChildren<Props>> = ({ children, action, config, type }) => {
  return (
    <button type={type ? type : 'button'} onClick={action} className={`${config} bg-red-500 h-10 px-4 w-fit text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>{ children }</button>
  )
}