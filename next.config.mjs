/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Tone.js needs this
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
