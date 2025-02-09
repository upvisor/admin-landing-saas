import { IDesign } from '@/interfaces'
import React from 'react'

interface Props {
    style?: any,
    text?: string
    config?: string
    design: IDesign
}

export const ButtonDesign2: React.FC<Props> = ({ style, text, config, design }) => {
  return (
    <button className={`${config} w-fit px-6 h-10 border`} style={{ color: design.info.textColor, borderRadius: style?.form === 'Redondeadas' ? `${style?.borderButton}px` : '' }}>{text}</button>
  )
}
