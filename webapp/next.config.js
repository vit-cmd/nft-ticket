/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["ticket-nft.infura-ipfs.io"],
  },
};

module.exports = nextConfig;
