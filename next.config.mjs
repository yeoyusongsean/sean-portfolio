/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   basePath: '/sean-portfolio',  // Your repo name
//   images: {
//     unoptimized: true,  // Required for static export
//   },
// };

// export default nextConfig;