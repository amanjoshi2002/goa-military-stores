/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove or comment out the following line if it exists
  // output: 'export',
};

module.exports = nextConfig;
