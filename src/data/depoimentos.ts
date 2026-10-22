/* Depoimentos de clubes: ate 3. So entram depoimentos reais, com
   autorizacao para publicar. Card sem texto nao renderiza; com a lista
   vazia, a secao inteira fica oculta. Formato:
   { texto: "...", nome: "Nome da pessoa", cargo: "Proprietario", clube: "Clube, cidade" } */

export type Depoimento = {
  texto: string;
  nome: string;
  cargo: string;
  clube: string;
};

export const depoimentos: Depoimento[] = [];
