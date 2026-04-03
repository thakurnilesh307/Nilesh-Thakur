const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_TOKEN })

console.log('notion keys:', Object.keys(notion))

async function getProjects() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB,
    filter: { property: "Featured", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
  })
  return res.results
}

async function getNowItems() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NOW_DB,
    filter: { property: "Status", select: { equals: "active" } },
  })
  return res.results
}

async function getLogEntries(nowItemId) {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_LOG_DB,
    filter: { property: "Now Item", relation: { contains: nowItemId } },
    sorts: [{ property: "Date", direction: "descending" }],
  })
  return res.results
}

async function getPhotos() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_PHOTOS_DB,
    sorts: [{ property: "Date", direction: "descending" }],
  })
  return res.results
}

module.exports = { getProjects, getNowItems, getLogEntries, getPhotos }
