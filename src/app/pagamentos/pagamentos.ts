import { Component } from '@angular/core';
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-pagamentos",
  imports: [CurrencyPipe],
  templateUrl: "./pagamentos.html",
  styleUrl: "./pagamentos.css",
})
export class Pagamentos {
  alunos: any[] = [];
  pagamentos: any[] = [];

  ngOnInit() {
    const alunosSalvos = localStorage.getItem("alunos");
    this.alunos = alunosSalvos ? JSON.parse(alunosSalvos) : [];

    const pagamentos = localStorage.getItem("pagamentos");
    this.pagamentos = pagamentos ? JSON.parse(pagamentos) : [];
  }
}
