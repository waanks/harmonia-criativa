import {Component, inject, OnInit, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TelefonePipe } from "../telefone-pipe";
import { CurrencyPipe } from "@angular/common";
import { AlunoService } from "../core/services/aluno-service";
import { AlunoResponse } from "../core/models/aluno.model";

@Component({
  selector: "app-cadastro-aluno",
  imports: [ReactiveFormsModule, TelefonePipe, CurrencyPipe],
  templateUrl: "./cadastro-aluno.html",
  styleUrl: "./cadastro-aluno.css",
  standalone: true,
})
export class CadastroAluno implements OnInit {
  private readonly alunoService = inject(AlunoService);

  alunos = signal<AlunoResponse[]>([]);
  erro = signal<string | null>(null);

  dadosAluno = new FormGroup({
    nome: new FormControl(""),
    email: new FormControl(""),
    cpf: new FormControl(""),
    telefone: new FormControl(""),
    dataNascimento: new FormControl(""),
    curso: new FormControl(""),
    mensalidade: new FormControl(""),
    dataInicio: new FormControl(""),
    diasAulas: new FormControl(""),
    horariosAulas: new FormControl(""),
    observacao: new FormControl(""),
  });

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

  salvarAluno() {
    const alunosSalvos = localStorage.getItem("alunos");

    const listaAlunos = alunosSalvos ? JSON.parse(alunosSalvos) : [];

    listaAlunos.push(this.dadosAluno.value);

    localStorage.setItem("alunos", JSON.stringify(listaAlunos));

    this.dadosAluno.reset();
  }
}
