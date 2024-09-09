export interface RecurenceData {
    repetition: boolean
    minute: number
    hour: number
    dayOfMonth: number | null
    month: string | null
    year: number | null
    dayOfWeek: string[]
}
