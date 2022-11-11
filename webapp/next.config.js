/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    EVENT_CONTRACT: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
};

module.exports = nextConfig;
