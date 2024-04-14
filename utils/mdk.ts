/**
 * This script pulls data from the musterdatenkatalog and cleans it.
 *
 * - group datasets by musterdatensatz
 * - collect and clean up tags
 * - remove incorrect datasets
 * - reduce datasets per musterdatensatz
 */

import { writeFile } from 'fs/promises'
import { parse } from 'papaparse'
import { request } from 'undici'
import { validate as uuidValidate } from 'uuid'

const URL =
  'https://raw.githubusercontent.com/bertelsmannstift/Musterdatenkatalog/master/musterdatenkatalog/musterdatenkatalog_v4.csv'

type Cleaned = {
  title: string
  url: string
  tags: string[]
  key: string
}

type Group = {
  key: string
  tags: string[]
  entries: Array<{
    title: string
    url: string
  }>
}

export type Category = { category: string; entries: Group[] }

export type MDK = Category[]

const TAG_PREFIXES = ['protected', 'mcloud-', 'gdi-', 'inspire', 'paragraph-', '-änd.-', 'berlin', 'berliner']

const TAG_DENYLIST = [
  'andernach',
  'arnsberg',
  'astheim',
  'bedburg-hau',
  'beindersheim',
  'bendorf',
  'bernkastel-kues',
  'biebesheim',
  'bischofsheim',
  'bochum',
  'braunschweig',
  'bremen',
  'brüggen',
  'burgbrohl',
  'chemnitz',
  'cochem-land',
  'coding-da-vinci-2021',
  'dernau',
  'diepholz',
  'dormagen',
  'düsseldorf',
  'emmerich',
  'ennepe-ruhr-kreis',
  'essen',
  'freiburg',
  'geldern',
  'gelsenkirchen',
  'geo',
  'geodaten',
  'geoservice',
  'gerolstein',
  'gifhorn',
  'altenahr',
  'goch',
  'grefrath',
  'greussen',
  'hagen',
  'hallschlag',
  'hamm',
  'helmstedt',
  'herne',
  'hvv',
  'karlsruhe',
  'kempen',
  'kiel',
  'konstanz',
  'krefeld',
  'kreis-viersen',
  'local',
  'lokal',
  'mayen',
  'mittenwalde',
  'öffentlich',
  'open-data',
  'opendata',
  'opengeodata',
  'peine',
  'remagen',
  'salzgitter',
  'simplesearch',
  'stadt-gelsenkirchen',
  'stadtverwaltungkommunalpolitikundkommunalfinanzen',
  'stromnzv_par._17',
  'südhessen',
  'thüringen',
  'trier',
  'urmitz',
  'weißenthurm',
  'wolfenbüttel',
  'wuppertal',
  'des',
  'alsdorf',
  'becherbach',
  'jahr',
  'monat',
  'fnp-elmshorn',
  'allgemein',
  'büttelborn',
  'cochem',
  'crumstadt',
  'dornheim',
  'elmshorn',
  'erfelden',
  'freiburg-im-breisgau',
  'friedrichshain-kreuzberg',
  'gaa',
  'gdimrh',
  'goslar',
  'grw',
  'gsi',
  'gtfs',
  'humboldt',
  'inez',
  'innerhalb-nrw',
  'insgesamt',
  'issum',
  'jockgrim',
  'kalkar',
  'kerken',
  'kettig',
  'kevelaer',
  'kleve',
  'klimprax',
  'kreis-recklinghausen',
  'kreis-soest',
  'kreis-unna',
  'kupferstadt-stolberg',
  'märkischer-kreis',
  'meerbusch',
  'moers-kapellen',
  'mülheim-kärlich',
  'nette',
  'nettetal',
  'niederkrüchten',
  'pelm',
  'schwalmtal',
  'steinstraße',
  'transparenzportal',
  'web',
  'wolfsburg',
  'kalenborn-scheuern',
  'goddelau',
  'ginsheim',
  'geinsheim',
  'tönisvorst',
  'rheurdt',
  'rhein-kreis-neuss',
  'leeheim',
  'datenkatalog'
]

const TAG_MAP = [
  ['b-pläne', 'b-plan'],
  ['bplan', 'b-plan'],
  ['addresses', 'adresse'],
  ['adressen', 'adresse'],
  ['alk', 'alkis'],
  ['ampelanlagen', 'ampel'],
  ['lichtzeichenanlagen', 'ampel'],
  ['ampeln', 'ampel'],
  ['ausländerinnen', 'ausländer'],
  ['bauleitpläne', 'bauleitplan'],
  ['bauleitplanung', 'bauleitplan'],
  ['bäume', 'baum'],
  ['baustellen', 'baustelle'],
  ['bebauungspläne', 'bebauungsplan'],
  ['behörden', 'behörde'],
  ['bibliotheken', 'bibliothek'],
  ['bücher', 'buch'],
  ['busgelder', 'busgeld'],
  ['defibrillatoren', 'defillibrator'],
  ['denkmäler', 'denkmal'],
  ['dienstleistungen', 'dienstleistung'],
  ['dienstleitungen', 'dienstleistung'],
  ['dienstleistungsverzeichnis', 'dienstleistung'],
  ['ehrenämter', 'ehrenamt'],
  ['emissionen', 'emission'],
  ['emissionsdaten', 'emission'],
  ['events', 'event'],
  ['fahrplandaten', 'fahrplan'],
  ['feuerwehren', 'feuerwehr'],
  ['fluren', 'flur'],
  ['friedhöfe', 'friedhof'],
  ['fußgängerinnen', 'fußgänger'],
  ['gebäude-datenbank', 'gebäude'],
  ['gymnasien', 'gymnasium'],
  ['hotels', 'hotel'],
  ['hunde', 'hund'],
  ['kinder', 'kind'],
  ['kindertageseinrichtungen', 'kindertageseinrichtung'],
  ['kita', 'kindertageseinrichtung'],
  ['luftbilder', 'luftbild'],
  ['mitarbeiterinnen', 'mitarbeiter'],
  ['museen', 'museum'],
  ['oberbürgermeisterin', 'oberbürgermeister'],
  ['organisationen', 'organisation'],
  ['schulen', 'schule'],
  ['sehenswürdigkeiten', 'sehenswürdigkeit'],
  ['strassen', 'straße'],
  ['straßen', 'straße'],
  ['straßennamen', 'straßenname'],
  ['toiletten', 'toilette'],
  ['topografie', 'topographie'],
  ['vhs', 'volkshochschule'],
  ['vornamenstatistik', 'vornamen'],
  ['wahlen', 'wahl'],
  ['wanderwege', 'wanderweg'],
  ['zuwendungen', 'zuwendung'],
  ['automobil', 'auto'],
  ['kfz', 'auto']
]

const cleanTagString = (tag: string): string => {
  const cleaned = tag.toLowerCase().trim().replace('_', '-').replace('--', '-')
  const translated = TAG_MAP.find((m) => m[0] === cleaned)
  return translated !== undefined ? translated[1] : cleaned
}

const filterTags = (tags: Array<[string, number]>): string[] => {
  // sort by usage descending
  let cleaned = tags.sort((a, b) => b[1] - a[1])

  // if more than 3 tags are used more than once, remove all tags used once
  cleaned = cleaned.filter((t) => t[1] > 1).length > 3 ? cleaned.filter((t) => t[1] > 1) : cleaned

  // remove blacklisted tags
  cleaned = cleaned.filter((t) => !TAG_PREFIXES.some((bl) => t[0].toLowerCase().includes(bl)))
  cleaned = cleaned.filter((t) => !TAG_DENYLIST.includes(t[0].toLowerCase()))

  // remove uuids
  cleaned = cleaned.filter((t) => !uuidValidate(t[0]))

  // remove tags shorter than 3 letters or longer than 40 letters
  cleaned = cleaned.filter((t) => t[0].length >= 3 && t[0].length <= 40)

  // limit to 10 tags
  cleaned = cleaned.slice(0, 10)

  // minor string cleanups
  return cleaned.map((t) => t[0].replace('_', '-').replace('--', '-'))
}

const res = await request(URL)
const data = await res.body.text()

const parsed = parse<Record<string, string>>(data, { header: true })

// clean raw data
const cleaned: Cleaned[] = parsed.data
  .map((e) => ({
    title: e['dct:title'],
    url: e['dcat:landingpage'],
    tags: e['dcat:theme'] !== undefined ? e['dcat:theme'].split(', ').filter((t: string) => /[a-zA-Z]/g.test(t)) : [],
    key: e.MUSTERDATENSATZ
  }))
  .filter((e) => e.key !== undefined)

// group by key and collect tags
const grouped = cleaned.reduce(
  (acc, e) => {
    const key = e.key
    const tags = e.tags.map((t) => cleanTagString(t))

    // skip on the following conditions:
    // - bebauungspläne outside their category
    // - radioactivity data in orthophotos
    // - stadtgebiet contains covid info
    // - url includes datenregister.berlin.de -- seems to be restricted
    // - bürgerservice - termin: exclude alkis, no geo data here
    if (key !== 'Raumplanung - Bebauungsplan' && tags.some((t) => t === 'bebauungsplan' || t === 'bauleitplan'))
      return acc
    if (key === 'Raumplanung - Orthofoto' && tags.some((t) => t === 'strahlenschutzvorsorge')) return acc
    if (key === 'Raumplanung - Raumgliederung - Stadtgebiet' && tags.some((t) => t === 'corona' || t === 'covid-19'))
      return acc
    if (e.url.includes('datenregister.berlin.de')) return acc
    if (
      key === 'Bürgerservice - Termin' &&
      tags.some((t) => t === 'alkis' || t === 'topographie' || t === 'infrastruktur' || t === 'bildung')
    )
      return acc

    const a = acc[key]

    if (a !== undefined) {
      for (const tag of tags) {
        const index = a.tags.findIndex((e) => e[0] === tag)
        if (index !== -1) {
          a.tags[index][1] += 1
        } else {
          a.tags.push([tag, 1])
        }
      }
      a.entries = [...a.entries, e]
    } else {
      acc[key] = {
        tags: e.tags.map((t) => [t, 1]),
        entries: [e]
      }
    }
    return acc
  },
  {} as Record<
    string,
    {
      tags: Array<[string, number]>
      entries: Cleaned[]
    }
  >
)

const filteredTags = Object.entries(grouped).map(([key, o]) => ({
  key,
  tags: filterTags(o.tags),
  entries: o.entries
    .filter((e, _, self) => {
      // filter out entries without tags if this group has at least one entry with tags
      if (self.some((e) => e.tags.length > 0) && e.tags.length === 0) {
        return false
      }
      return true
    })
    .map((e) => ({ title: e.title, url: e.url }))
    .slice(0, 10)
}))

// collect by category
const hierarchy = filteredTags.reduce((acc, e) => {
  const category = e.key.split(' - ')[0]
  const existingIndex = acc.findIndex((a) => a.category === category)
  if (existingIndex !== -1) {
    acc[existingIndex].entries.push(e)
  } else {
    acc.push({
      category,
      entries: [e]
    })
  }
  return acc
}, [] as MDK)
await writeFile('data/mdk.json', JSON.stringify(hierarchy))
