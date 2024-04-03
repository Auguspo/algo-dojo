/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Match only the `/api/ejercicios` route
        source: '/api/ejercicios',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' }, // Allow cookies (optional)
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Adjust allowed origins if needed
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT', // Allowed HTTP methods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version', // Allowed headers
          },
        ],
      },
    ];
  },
};

export default nextConfig;
