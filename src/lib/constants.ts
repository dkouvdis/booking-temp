import { TypeSelect } from '../types'

export const config = {
  notion_db: process.env.NOTION_DB,
  template_id: process.env.POSTMARK_TEMPLATE,
}

type Options = Array<{
  label: string
  type: TypeSelect
}>

export const typeOptions: Options = [
  { label: '---', type: undefined },
  {
    label: 'One day',
    type: 'day',
  },
  {
    label: 'Week',
    type: 'week',
  },
  {
    label: 'Month',
    type: 'month',
  },
]
