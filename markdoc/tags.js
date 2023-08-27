import { Callout } from '@/components/Callout'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { MarkdownIcon } from '@/components/icons/MarkdownIcon'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical'
      }
    },
    render: Callout
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String }
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    )
  },
  'quick-links': {
    render: QuickLinks
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String }
    }
  },
  see: {
    selfClosing: true,
    attributes: {
      no: { type: Number }
    },
    render: ({ no }) => (
      <a href={`#ref-${no}`} className="align-super text-xs">
        [{no}]
      </a>
    )
  },
  ref: {
    attributes: {
      no: { type: Number }
    },
    render: ({ no, children }) => (
      <span id={`ref-${no}`} className="mb-1 block text-sm">
        [{no}]: {children}
      </span>
    )
  },
  icon: {
    selfClosing: true,
    attributes: {
      icon: String,
      variant: String
    },
    render: MarkdownIcon
  },
  positive: {
    render: ({ children }) => (
      <span className="inline-flex items-center gap-3">
        <MarkdownIcon variant="good" icon="check" />
        <span>
          <span className="font-semibold">Gut: </span>
          {children}
        </span>
      </span>
    )
  },
  negative: {
    render: ({ children }) => (
      <span className="inline-flex items-center gap-3">
        <MarkdownIcon variant="bad" icon="cross" />
        <span>
          <span className="font-semibold">Schlecht: </span>
          {children}
        </span>
      </span>
    )
  }
}

export default tags
