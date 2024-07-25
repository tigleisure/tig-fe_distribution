/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['t1.kakaocdn.net'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
