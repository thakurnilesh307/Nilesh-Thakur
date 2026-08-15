import { cacheLife, cacheTag } from 'next/cache'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function getProjects() {
  'use cache'
  cacheLife('minutes')
  cacheTag('projects')
  const res = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB,
    filter: { property: 'Featured', checkbox: { equals: true } },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  return res.results
}

export async function getAllProjects() {
  'use cache'
  cacheLife('minutes')
  cacheTag('projects')
  const res = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB,
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  return res.results
}

export async function getNowItems() {
  'use cache'
  cacheLife('minutes')
  cacheTag('now')
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NOW_DB,
    filter: { property: 'Status', select: { equals: 'active' } },
  })
  return res.results
}

export async function getLogEntries(nowItemId: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('logs', nowItemId)
  const res = await notion.databases.query({
    database_id: process.env.NOTION_LOG_DB,
    filter: { property: 'Now Item', relation: { contains: nowItemId } },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  return res.results
}

export async function getRecentActivity(limit = 8) {
  'use cache'
  cacheLife('minutes')
  cacheTag('logs')
  const res = await notion.databases.query({
    database_id: process.env.NOTION_LOG_DB,
    sorts: [{ property: 'Date', direction: 'descending' }],
    page_size: limit,
  })
  return res.results
}

export async function getPhotos() {
  'use cache'
  // Notion-hosted files are S3 URLs signed with X-Amz-Expires=3600. A cache entry
  // that outlives that hour hands the browser dead links, so keep the whole
  // window (including the stale-while-revalidate tail) under 60 minutes.
  cacheLife({ stale: 300, revalidate: 1800, expire: 3000 })
  cacheTag('photos')
  const res = await notion.databases.query({
    database_id: process.env.NOTION_PHOTOS_DB,
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  return res.results
}
