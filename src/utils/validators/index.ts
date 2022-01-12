export type MaxLengthType = {
    value: number | undefined
    message: string
}

export const maxLenghtCreator = (value:number | undefined):MaxLengthType => ({
    value,
    message: `Maximum length ${value} characters`
})