import { addMonths, addWeeks } from 'date-fns'
import { TypeSelect, TypeSelectEnum } from '../types'

export const localedDate = (date?: Date): string => {
  const today: Date = date ? new Date(date) : new Date()

  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()

  return [year, month, day].join('-')
}

export const endDate = (type: TypeSelect, startDate: string): string => {
  const selectedDay = new Date(startDate)

  switch (type) {
    case TypeSelectEnum.DAY:
      return startDate
    case TypeSelectEnum.WEEK:
      return localedDate(addWeeks(selectedDay, 1))
    case TypeSelectEnum.MONTH:
      return localedDate(addMonths(selectedDay, 1))
    default:
      return ''
  }
}
