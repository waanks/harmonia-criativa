import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "telefone",
})
export class TelefonePipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return "";

    // Remove tudo o que não for número
    const numeros = value.toString().replace(/\D/g, "");

    // Formato sem DDD (ex: 98888-7777 ou 3333-4444)
    if (numeros.length === 8) {
      return numeros.replace(/(\d{4})(\d{4})/, "$1-$2");
    }
    if (numeros.length === 9) {
      return numeros.replace(/(\d{5})(\d{4})/, "$1-$2");
    }

    // Formato com DDD Fixo (ex: (83) 3333-4444)
    if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    // Formato com DDD Celular (ex: (83) 98888-7777)
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    // Se tiver DDI (+55), limita e formata o restante (ex: +55 (83) 98888-7777)
    if (numeros.length === 13) {
      return numeros.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
    }

    // Retorna o número limpo caso não se encaixe nos padrões acima
    return numeros;
  }
}
