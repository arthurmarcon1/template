import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF primeiro, WebP como segundo. O Next negocia pelo Accept do
       navegador e cai em AVIF ou WebP sem precisar converter na mao. */
    formats: ["image/avif", "image/webp"],
    /* Larguras alinhadas com o grid, mais as faixas altas que a hero
       exige. A foto da hero usa object-fit: cover num container muito
       mais alto que a proporcao da imagem, entao o navegador escala pela
       ALTURA: em 1920x1080 a imagem e renderizada com 1919px de largura,
       ainda que a caixa tenha 806px. Sem 1600 e 1920 aqui, o maior
       arquivo disponivel era 1400 e a ampliacao passava de 2x. */
    deviceSizes: [380, 640, 768, 1024, 1280, 1400, 1600, 1920],
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
