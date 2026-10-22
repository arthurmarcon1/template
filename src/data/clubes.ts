/* Clubes que ja receberam torneios da F&M (briefing de 13/10/2026).
   logo: opcional. Com o arquivo em public/, o nome vira imagem na faixa
   (ex.: { nome: "Fomera Padel", logo: "/clubes/fomera.svg" }). */

export type Clube = { nome: string; logo?: string };

export const clubes: Clube[] = [
  { nome: "Agudo Winner Sports Padel e Beach" },
  { nome: "Star Padel Club" },
  { nome: "Fomera Padel" },
  { nome: "Fair Play Arena" },
  { nome: "Cesla SM" },
  { nome: "G15 Village" },
  { nome: "Pier 158" },
  { nome: "8000 Esportes Beach" },
  { nome: "SH House" },
  { nome: "Elite Padel Club" },
];
