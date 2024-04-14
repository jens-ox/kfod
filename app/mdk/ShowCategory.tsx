'use client'

import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Category } from '@/utils/mdk'

export const ShowCategory = ({ category }: { category: Category }) => {
  return (
    <Disclosure as="div" key={category.category} className="pt-6" defaultOpen={false}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-base font-semibold leading-7">
              {category.category} ({category.entries.length})
            </span>
            <span className="ml-6 flex h-7 items-center">
              {open ? (
                <MinusIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </span>
          </Disclosure.Button>
          <Disclosure.Panel as="dd" className="mt-2 pr-12">
            <div className="flex flex-col gap-4">
              {category.entries.map((e) => (
                <div key={e.key} className="flex flex-col gap-4 rounded-lg border p-2 shadow">
                  <h3 className="font-bold">{e.key}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {e.tags.map((t) => (
                      <span className="rounded-full border border-gray-200 bg-gray-100 px-1" key={`${e.key}-${t}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <ul className="text-sm">
                    {e.entries.map((e) => (
                      <li key={e.url}>
                        <a
                          className="text-sky-600 underline transition duration-150 hover:text-sky-700"
                          href={e.url}
                          target="_blank"
                        >
                          {e.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
