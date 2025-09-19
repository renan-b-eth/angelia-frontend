// angelia-frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pub-03b33c3cc01341c68dcb40c656d81b34.r2.dev'], // <--- ADICIONE ESTA LINHA!
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;