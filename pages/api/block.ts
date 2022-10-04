import type { NextApiRequest, NextApiResponse } from 'next'
const { Client } = require('@notionhq/client')
const postmark = require('postmark')

import { SubmitData } from '../../src/types'
import { config } from '../../src/lib/constants'

const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_TOKEN)
const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, start, end, type, requests }: SubmitData = req.body

  await notionClient.pages.create({
    parent: {
      database_id: config.notion_db,
    },
    properties: {
      title: [{ text: { content: name } }],
      Allocation: { name: 'PENDING' },
      Dates: {
        start,
        end,
      },
      Email: [{ text: { content: email } }],
    },
  })

  await postmarkClient.sendEmailWithTemplate({
    From: 'hello@native.com.cy',
    To: 'dev-test@email.x',
    TemplateId: config.template_id,
    TemplateModel: {
      name,
      email,
      booking_type: type,
      start,
      end,
      requests,
    },
  })

  res.status(200).end()
}
