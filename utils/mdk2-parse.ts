import { writeFile } from 'fs/promises'
import data from '../data/mdk2.json'

const normalize = (input: string): string =>
  input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .trim()

const crossMatch = (haystack: Array<string | undefined>, needles: Array<string | undefined>): boolean => {
  const cleanedHaystack = haystack.filter((x): x is string => x !== undefined).map(normalize)
  const cleanedNeedles = needles.filter((x): x is string => x !== undefined).map(normalize)

  return cleanedNeedles.some((needle) => cleanedHaystack.some((hay) => hay.includes(needle)))
}

type Entry = {
  name: string
  title: string
  notes?: string
  tags: string[]
  author?: string
  maintainer?: string
}

type Group =
  | {
      type: 'test'
      name: string
      test: (entry: Entry) => boolean
    }
  | {
      type: 'needles'
      name: string
      needles: string[]
    }

const testGroup = (entry: Entry, group: Group) => {
  if (group.type === 'test') return group.test(entry)
  return crossMatch([...entry.tags, entry.title, entry.name, entry.author, entry.maintainer], group.needles)
}

const groups: Group[] = [
  {
    name: 'bebauungsplan',
    type: 'needles',
    needles: ['bauleitplan', 'bebauungsplan', 'bplan']
  },
  {
    name: 'stadtentwicklung',
    type: 'needles',
    needles: ['stadtentwicklung', 'entwicklungsgebiet', 'entwicklungsmaßnahme', 'stadtplanung', 'entwicklungsplanung']
  },
  {
    name: 'flaechennutzungsplan',
    type: 'needles',
    needles: [
      'flachennutzungsplan',
      'fnp',
      'hohenlinie',
      'wohnplatz',
      'kartenaufnahme',
      'topographisch',
      'DTK',
      'luftbild',
      'umlegung',
      'landschaftsplan',
      'ortsbezirke',
      'stadtgrenze',
      'grenze',
      'raumordnung',
      'sanierungsgebiet',
      'dlm',
      'dgm',
      'postleitzahlengebiet',
      'uek',
      'schummerung',
      'historische-tk',
      'positionsblatt',
      'webatlas',
      'bodennutzung',
      'bodenflächen'
    ]
  },
  {
    name: 'liegenschaft',
    type: 'needles',
    needles: ['liegenschaft', 'lika', 'alkis', 'baugenehmigungen']
  },
  {
    name: 'umwelt',
    type: 'needles',
    needles: [
      'naturpark',
      'protectedsite',
      'biotop',
      'luftraum',
      'naturdenkmal',
      'grundwasser',
      'umwelt',
      'hydrologie',
      'agrarstruktur'
    ]
  },
  {
    name: 'points-of-interest',
    type: 'needles',
    needles: [
      'bibliothek',
      'landeplatz',
      'denkmal',
      'welterbestatte',
      'poi',
      'polizeiwache',
      'militarstandort',
      'amter',
      'sportanlage',
      'hotspot',
      'toilette',
      'gesundheitseinrichtung',
      'bushaltestelle',
      'friedhof',
      'museum',
      'brunnen',
      'standorte'
    ]
  },
  {
    name: 'verkehr',
    type: 'needles',
    needles: ['luftverkehr', 'verbindung', 'radfernweg', 'mobilitat', 'parkplatz', 'fahrrad', 'pkw', 'verkehr']
  },
  {
    name: 'finanzen',
    type: 'needles',
    needles: [
      'schulden',
      'finanzen',
      'investition',
      'teilhaushalt',
      'zuwendung',
      'beteiligungen',
      'bürgschaften',
      'haushaltsplan',
      'doppelhaushalt'
    ]
  },
  {
    name: 'bildung',
    type: 'needles',
    needles: ['bildung', 'schule', 'kindergarten', 'krippe', 'kindertagesstatte', 'kita']
  },
  {
    name: 'abfall',
    type: 'needles',
    needles: ['abfall']
  },
  {
    name: 'wahl',
    type: 'needles',
    needles: ['wahlergebnis', 'wahlen']
  },
  {
    name: 'soziales',
    type: 'needles',
    needles: [
      'anzahl-haushalt',
      'anzahl-einwohner',
      'armut',
      'wegzuge',
      'anzahl-gebaude',
      'anzahl-personen',
      'religion',
      'geburten',
      'asyl',
      'bevölkerungsstand',
      'sozialmonitoring',
      'beschwerdemanagement',
      'sozialhilfe',
      'Jugendhilfe',
      'eheschließung',
      'einbürgerung',
      'familienstand',
      'bevölkerungsbewegung',
      'ausländer',
      'pflege',
      'jahrbuch',
      'grundsicherung'
    ]
  },
  {
    name: 'wirtschaft',
    type: 'needles',
    needles: [
      'anzahl-unternehmen',
      'baufertigstellung',
      'beschäftigung',
      'erwerbstätigkeit',
      'ausschreibung',
      'industrie',
      'ausfuhr',
      'baugewerbe',
      'verbraucherpreisindex',
      'viehbestand',
      'umsatz',
      'verdienste',
      'Gewerbeanzeigen',
      'insolvenzen',
      'baumobsternte',
      'erntebericht',
      'dienstleistungsunternehmen',
      'Handwerkszählung',
      'gartenbau'
    ]
  },
  {
    name: 'landwirtschaft',
    type: 'needles',
    needles: ['landwirtschaft', 'viehhaltung']
  },
  {
    name: 'recht',
    type: 'needles',
    needles: ['justiz', 'strafverfolgung']
  }
]

const rawData = data.flat()

const grouped = new Map<string, Entry[]>()

for (const entry of rawData) {
  let found = false
  for (const groupTest of groups) {
    if (testGroup(entry, groupTest)) {
      grouped.set(groupTest.name, [...(grouped.get(groupTest.name) || []), entry])
      found = true
      break
    }
  }
  if (!found) grouped.set('unsorted', [...(grouped.get('unsorted') || []), entry])
}

await Promise.all(
  Array.from(grouped.entries()).map(async ([group, entries]) => {
    await writeFile(`data/${group}.json`, JSON.stringify(entries))
  })
)
