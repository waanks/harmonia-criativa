import { inject, Injectable } from "@angular/core";
import { AlunoResponse } from "../models/aluno.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlunoService {
  private http = inject(HttpClient);
  private apiUrl = "https://harmonia-api-production.up.railway.app/alunos";

  listarTodos(): Observable<AlunoResponse[]> {
    return this.http.get<AlunoResponse[]>(this.apiUrl);
  }
}
