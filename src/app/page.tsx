import { site } from "@/lib/site";

/* Pagina em branco de proposito. As secoes da landing entram aqui,
   uma por arquivo, em src/components/sections/. */

export default function Page() {
  return (
    <main id="conteudo">
      <h1>{site.nome}</h1>
      <p>{site.descricao}</p>
    </main>
  );
}
