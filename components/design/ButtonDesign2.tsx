import React from 'react'

interface Props {
    style?: any,
    text?: string
    config?: string
}

export const ButtonDesign2: React.FC<Props> = ({ style, text, config }) => {
  return (
    <button className={`${config} w-fit px-6 h-10 border`} style={{ backgroundColor: '#ffffff', color: style?.button, borderRadius: style?.form === 'Redondeadas' ? `${style?.borderButton}px` : '' }}>{text}</button>
  )
}
