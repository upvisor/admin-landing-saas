export interface IUser {
    _id?: string
    name?: string
    email: string
    password?: string
    type: string
    permissions?: string[]
}