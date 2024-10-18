/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "placehold.it",
        port: "",
        pathname: "/**", // Aceitar qualquer caminho a partir do domínio
      },
    ],
  },
};

export default nextConfig;
