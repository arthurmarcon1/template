/* Configuracao central de dados da empresa.
   Tudo entre [ ] e placeholder e precisa ser confirmado antes de
   qualquer publicacao. Nenhum numero, data ou preco foi inventado. */

export const site = {
  nome: "[Nome da empresa]",
  descricao:
    "Organização de torneios de padel e beach tennis, da inscrição à premiação.",
  modalidades: ["Padel", "Beach tennis"],

  instagram: {
    handle: "[@instagram]",
    url: "https://instagram.com/[instagram]",
  },

  /* Formato do wa.me: codigo do pais + DDD + numero, so digitos. */
  telefone: "[+55 00 00000-0000]",
  whatsapp: "https://wa.me/[5500000000000]",

  cidade: "[Cidade]",
  estado: "[UF]",
} as const;
