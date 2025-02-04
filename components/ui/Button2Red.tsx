import React, { PropsWithChildren } from 'react'

interface Props {
    action?: any
    config?: any
}

export const Button2Red: React.FC<PropsWithChildren<Props>> = ({ children, action, config }) => {
  return (
    <button onClick={action} className={`${config} bg-red-500 h-9 px-4 w-fit text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>{ children }</button>
  )
}
