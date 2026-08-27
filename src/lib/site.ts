/* Configuracao central de dados da marca.
   Tudo entre [ ] e placeholder e precisa ser confirmado pelo Uilian
   antes de qualquer publicacao. Nenhum numero foi inventado:
   seguidores e recomendacao vieram do briefing e sao reais. */

export const site = {
  nome: "Uilian Machado",
  papel: "Dentista e professor",
  produto: "ResinArt",

  instagram: {
    handle: "@uiliancm",
    url: "https://instagram.com/uiliancm",
  },

  /* PLACEHOLDER: substituir [NUMERO] pelo WhatsApp real no formato
     internacional sem simbolos, ex. 5555999999999.
     O link so funciona depois disso. */
  whatsapp:
    "https://wa.me/[NUMERO]?text=Ol%C3%A1%2C%20quero%20entrar%20na%20lista%20de%20espera%20da%20ResinArt",

  cro: "[CRO-RS 00000]",
  cidade: "[cidade]",
  estado: "RS",
} as const;

/* Rotulo unico por intencao (taste-skill Secao 4.5, no duplicate CTA intent).
   Este texto e o MESMO no heroi, no CTA final e em qualquer outro ponto. */
export const CTA_PRIMARIO = "Entrar na lista de espera";
export const CTA_SECUNDARIO = "Ver o método";

/* Faixa de autoridade. Os dois primeiros sao dados reais do briefing.
   Os dois ultimos aguardam confirmacao. */
export const autoridade = [
  {
    valor: "18,2 mil",
    rotulo: "seguidores no Instagram",
    real: true,
    alvo: 18.2,
    decimais: 1,
    sufixo: " mil",
  },
  {
    valor: "98%",
    rotulo: "de recomendação, 25 avaliações",
    real: true,
    alvo: 98,
    decimais: 0,
    sufixo: "%",
  },
  /* Sem alvo numerico: nao ha o que contar ate o dado existir. */
  { valor: "[X]", rotulo: "alunos formados", real: false },
  { valor: "[X]", rotulo: "anos de clínica", real: false },
] as const;
