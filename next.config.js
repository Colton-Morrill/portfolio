/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-solid-svg-icons",
    ],
  },

  i18n: {
    locales: ["en", "esp"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
