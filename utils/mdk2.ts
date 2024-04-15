/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWriteStream } from 'fs'
import { Agent, RetryAgent } from 'undici'

const LIMIT = 1000

const KEYS_TO_REMOVE = [
  'relationships_as_subject',
  'relationships_as_object',
  'resources',
  'creator_user_id',
  'id',
  'isopen',
  'identifier',
  'issued',
  'language',
  'metadata_created',
  'metadata_modified',
  'num_resources',
  'num_tags',
  'created',
  'modified',
  'is_organization',
  'approval_status',
  'state',
  'owner_org',
  'private',
  'type',
  'temporal_end',
  'temporal_start',
  'harvest_object_id',
  'harvest_source_id',
  'theme',
  'version',
  'access_rights',
  'conforms_to',
  'documentation',
  'frequency',
  'guid',
  'legalbasisText',
  'metadata_original_html',
  'provenance',
  'uri',
  'spatial',
  'extras'
]

const KEYS_TO_PARSE = [
  'contributorID',
  'politicalGeocodingURI',
  'geocodingText',
  'source',
  'applicable_legislation',
  'hvd_category',
  'alternate_identifier'
]

const retryAgent = new RetryAgent(new Agent(), {
  statusCodes: [403]
})

const getBatch = async (offset: number) => {
  const res = await retryAgent.request({
    method: 'GET',
    origin: 'https://ckan.govdata.de',
    path: `/api/3/action/current_package_list_with_resources?limit=${LIMIT}&offset=${offset}`
  })
  let data
  try {
    data = (await res.body.json()) as { result: any }
  } catch (error) {
    console.error(`no valid JSON response`)
  }
  if (data)
    return data.result.map((e: any) => ({
      ...e,
      tags: e.tags.map((t: any) => t.display_name),
      groups: e.groups.map((g: any) => g.name),
      ...Object.fromEntries(e.extras.map((e: { key: string; value: string }) => [e.key, e.value]))
    }))
}

const writeStream = createWriteStream('data/mdk2.json')
let offset = 3 * LIMIT
let reachedEnd = false
writeStream.write('[')
while (!reachedEnd) {
  const result = await getBatch(offset)
  console.log(`batch ${offset / LIMIT}, count ${result.length}`)
  writeStream.write(
    `${JSON.stringify(result, (key, value) => {
      if (value === null || value === '' || KEYS_TO_REMOVE.includes(key)) return

      if (KEYS_TO_PARSE.includes(key)) {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed
      }

      if (!['groups', 'tags'].includes(key) && Array.isArray(value) && value.length === 1) return value[0]

      return value
    })}`
  )
  reachedEnd = process.env.DEBUG !== undefined || result.length < 1000
  if (reachedEnd) {
    writeStream.write(']')
  } else {
    writeStream.write(',')
    offset += LIMIT
  }
}
