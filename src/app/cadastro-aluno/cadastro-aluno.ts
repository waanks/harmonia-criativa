import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TelefonePipe } from "../telefone-pipe";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-cadastro-aluno",
  imports: [ReactiveFormsModule, TelefonePipe, CurrencyPipe],
  templateUrl: "./cadastro-aluno.html",
  styleUrl: "./cadastro-aluno.css",
  standalone: true,
})
export class CadastroAluno {
  alunos: any[] = [];
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
    const alunosSalvos = localStorage.getItem("alunos");

    this.alunos = alunosSalvos ? JSON.parse(alunosSalvos) : [];
  }

  salvarAluno() {
    const alunosSalvos = localStorage.getItem("alunos");

    const listaAlunos = alunosSalvos ? JSON.parse(alunosSalvos) : [];

    listaAlunos.push(this.dadosAluno.value);

    localStorage.setItem("alunos", JSON.stringify(listaAlunos));

    this.dadosAluno.reset();
  }
}
