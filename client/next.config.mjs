/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // Express 서버로 프록시
      },
    ];
  },
};

export default nextConfig;
