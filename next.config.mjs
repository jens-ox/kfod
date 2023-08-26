import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true
  }
}

module.exports = withMDX(nextConfig)
