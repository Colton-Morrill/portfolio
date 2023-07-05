/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    locales: ["en", "esp"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
