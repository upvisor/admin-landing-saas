import React from 'react'
import { Spinner2 } from '.'

interface Props {
    submitLoading: boolean
    textButton: string
    action: any
    color: string
    config?: string
}

export const ButtonSubmit2: React.FC<Props> = ({ submitLoading, textButton, action, color, config }) => {
  return (
    <button onClick={action} className={`${config} ${submitLoading ? `cursor-not-allowed bg-${color}/80 hover:bg-${color}/80` : `hover:bg-${color}/80 bg-${color}`} transition-colors duration-300 text-white text-sm rounded-xl h-9`}>{submitLoading ? <Spinner2 /> : textButton}</button>
  )
}
