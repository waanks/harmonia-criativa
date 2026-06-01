export interface HorarioAulaResponse {
  id: number;
  diaSemana: string;
  horarioInicio: string;
  horarioFim: string;
}

export interface AlunoResponse {
  id: number;
  nomeAluno: string;
  email: string;
  telefone: string;
  curso: string;
  mensalidade: number;
  horariosAulas: HorarioAulaResponse[];
  observacoes?: string;
}
