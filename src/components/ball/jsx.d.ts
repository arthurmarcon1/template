/* Tipagem do <three-d-stage> no JSX. Os atributos sao os do web
   component em three-d-stage.ts. */
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "three-d-stage": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
        background?: string;
        autorotate?: boolean;
      };
    }
  }
}
