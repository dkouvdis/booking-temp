export enum TypeSelectEnum {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export type TypeSelect = 'day' | 'week' | 'month' | undefined

export type SubmitData = {
  name: string
  email: string
  type: string
  start: string
  end: string
  requests: string
}
