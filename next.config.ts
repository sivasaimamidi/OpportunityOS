import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '192.168.1.39',
    '192.168.1.39:3000',
    '*.trycloudflare.com',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.loca.lt',
  ],
};

export default nextConfig;
