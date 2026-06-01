import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CalendarComponent } from "@schedule-x/angular";
import {
  createViewDay,
  createViewWeekAgenda,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  createViewList,
  createCalendar,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import "temporal-polyfill/global";

// Interface para tipar a resposta que vem do Spring Boot
interface AgendaResponse {
  id: string;
  title: string;
  start: string; // Vem no formato ISO ex: "2026-06-01T14:00:00"
  end: string; // Vem no formato ISO ex: "2026-06-01T15:00:00"
}

@Component({
  selector: "app-aulas",
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: "./aulas.html",
  styleUrl: "./aulas.css",
})
export class Aulas implements OnInit {
  private apiUrl = "http://localhost:8080/alunos/agenda"; // URL do seu endpoint do Spring

  calendarApp = createCalendar({
    locale: "pt-BR",
    timezone: "America/Sao_Paulo",
    events: [],
    views: [
      createViewWeek(),
      createViewDay(),
      createViewWeekAgenda(),
      createViewMonthAgenda(),
      createViewMonthGrid(),
      createViewList(),
    ],
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarAgenda();
  }

  private carregarAgenda() {
    this.http.get<AgendaResponse[]>(this.apiUrl).subscribe({
      next: (dadosDaApi) => {
        const eventosMapeados = dadosDaApi.map((item) => {
          const startPlain = Temporal.PlainDateTime.from(item.start);
          const endPlain = Temporal.PlainDateTime.from(item.end);
          const startZoned = startPlain.toZonedDateTime("America/Sao_Paulo");
          const endZoned = endPlain.toZonedDateTime("America/Sao_Paulo");
          console.log(item);

          return {
            id: item.id,
            title: item.title,
            start: startZoned,
            end: endZoned,
          };
        });

        this.calendarApp.events.set(eventosMapeados);
      },
      error: (err) => {
        console.error("Erro ao buscar a agenda dos alunos:", err);
      },
    });
  }
}
