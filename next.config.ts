import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF primeiro, WebP como segundo. O Next negocia pelo Accept do
       navegador e cai em AVIF ou WebP sem precisar converter na mao. */
    formats: ["image/avif", "image/webp"],
    /* Larguras alinhadas com o grid: coluna cheia, 7/12, 5/12 e 4/12
       nos breakpoints que a pagina realmente usa. */
    deviceSizes: [380, 640, 768, 1024, 1280, 1400],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
