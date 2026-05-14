import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cpfCnpj",
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return "";

    // Remove qualquer caractere que não seja número
    const numeros = value.toString().replace(/\D/g, "");

    // Formatação para CPF (11 dígitos ou menos)
    if (numeros.length <= 11) {
      const cpfFormatado = numeros.padStart(11, "0");
      return cpfFormatado.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4",
      );
    }

    // Formatação para CNPJ (Mais de 11 dígitos, padroniza em 14)
    const cnpjFormatado = numeros.padStart(14, "0").substring(0, 14);
    return cnpjFormatado.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  }
}
