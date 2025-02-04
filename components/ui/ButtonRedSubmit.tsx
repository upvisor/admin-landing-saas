import React from 'react'
import { Spinner2 } from '.'

interface Props {
    submitLoading: boolean
    textButton: string
    action: any
    config?: string
}

export const ButtonRedSubmit: React.FC<Props> = ({ submitLoading, textButton, action, config }) => {
  return (
    <button onClick={action} className={`${config} ${submitLoading ? `cursor-not-allowed bg-red-500/80 hover:bg-red-500/80` : `hover:bg-red-500/80 bg-red-500`} text-sm transition-colors duration-300 text-white rounded-xl h-10`}>{submitLoading ? <Spinner2 /> : textButton}</button>
  )
}