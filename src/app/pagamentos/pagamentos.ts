import { Component, inject, OnInit, signal } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { AlunoService } from "../core/services/aluno-service";
import { AlunoResponse } from "../core/models/aluno.model";

@Component({
  selector: "app-pagamentos",
  imports: [CurrencyPipe],
  templateUrl: "./pagamentos.html",
  styleUrl: "./pagamentos.css",
})
export class Pagamentos implements OnInit {
  private alunoService = inject(AlunoService);

  alunos = signal<AlunoResponse[]>([]);
  erro = signal<string | null>(null);

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunoService.listarTodos().subscribe({
      next: (dados) => {
        this.alunos.set(dados);
      },
      error: (err) => {
        console.error("Erro ao buscar alunos:", err);
        this.erro.set("Não foi possível carregar a lista de alunos.");
      },
    });
  }
}
