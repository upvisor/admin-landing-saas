import React from 'react'
import { Spinner2 } from '.'

interface Props {
    submitLoading: boolean
    textButton: string
    action: any
    color: string
    config?: string
}

export const ButtonSubmit: React.FC<Props> = ({ submitLoading, textButton, action, color, config }) => {
  return (
    <button onClick={action} className={`${config} ${submitLoading ? `cursor-not-allowed bg-${color}/80 hover:bg-${color}/80` : `hover:bg-${color}/80 bg-${color}`} text-sm transition-colors duration-300 text-white rounded-xl h-10`}>{submitLoading ? <Spinner2 /> : textButton}</button>
  )
}
