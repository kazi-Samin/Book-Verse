import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    // Ensure apiUrl doesn't end with a slash to avoid double slashes in destination
    const cleanApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    return [
      {
        source: "/api/auth/:path*",
        destination: `${cleanApiUrl}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
