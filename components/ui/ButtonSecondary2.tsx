import React, { PropsWithChildren } from 'react'

interface Props {
    action: any
    config?: string
}

export const ButtonSecondary2: React.FC<PropsWithChildren<Props>> = ({ children, action, config }) => {
  return (
    <button onClick={action} className={`${config} bg-transparent border border-main h-9 px-4 w-fit text-main text-sm rounded-xl transition-colors duration-300 hover:bg-main/5`}>{ children }</button>
  )
}
