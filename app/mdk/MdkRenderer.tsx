'use client'

import { useMemo, useState } from 'react'
import { ShowCategory } from './ShowCategory'
import { DocsHeader } from '@/components/DocsHeader'
import { Prose } from '@/components/Prose'
import { MDK } from '@/utils/mdk'

export const MdkRenderer = ({ mdk }: { mdk: MDK }) => {
  const [search, setSearch] = useState('')

  const filteredMdk: MDK = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()
    return mdk
      .map((c) => ({
        category: c.category,
        entries: c.entries.filter((group) => {
          const titleMatch = group.key.toLowerCase().includes(searchTerm)
          if (titleMatch) return true

          const tagsMatch = group.tags.some((t) => t.includes(searchTerm))
          if (tagsMatch) return true

          const someEntryMatches = group.entries.some((e) => e.title.toLowerCase().includes(searchTerm))
          if (someEntryMatches) return true

          return false
        })
      }))
      .filter((c) => c.entries.length > 0)
  }, [search, mdk])

  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <DocsHeader title="Musterdatenkatalog" />
      <Prose>
        <p>
          Der Musterdatenkatalog ist ein{' '}
          <a href="https://bertelsmannstift.github.io/Musterdatenkatalog/def/musterdatensatz.html">
            Projekt der Bertelsmann-Stiftung
          </a>
          . Hier finden Sie eine aufbereitete Variante des Musterkatalogs, an dem Sie sich beim Durchführen einer
          Dateninventur orientieren können.
          <br />
          Die Musterdatensätze sind in Kategorien gruppiert und haben jeweils Beispiel-Schlagwörter und
          Beispiel-Datensätze.
        </p>
      </Prose>

      <div className="mt-8">
        <input
          placeholder="Nach Musterdatensätzen suchen"
          className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-col gap-6 divide-y divide-gray-900/10">
          {filteredMdk.map((c) => (
            <ShowCategory category={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
