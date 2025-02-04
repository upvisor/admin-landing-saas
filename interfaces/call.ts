export interface ICall {
    _id?: string
    type?: string
    nameMeeting: string
    title?: string
    duration: string
    description?: string
    price?: string
    labels?: { text: string, name: string, data: string }[]
    buttonText?: string
    tags?: string[]
    action: string
    redirect?: string
    message?: string
    calendar?: string
}