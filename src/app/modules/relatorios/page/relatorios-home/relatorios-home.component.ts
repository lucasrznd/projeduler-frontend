import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { RelatorioService } from 'src/app/services/relatorios/relatorio.service';

@Component({
  selector: 'app-relatorios-home',
  templateUrl: './relatorios-home.component.html',
  styleUrls: ['./relatorios-home.component.scss']
})
export class RelatoriosHomeComponent implements OnInit {
  public filtroForm!: FormGroup;

  // Dados para os gráficos
  horasPorProjetoData: any;
  horasPorMesData: any;
  atividadesPorStatusData: any;
  topUsuariosData: any;

  // Opções comuns para os gráficos
  chartOptions: any;

  // Dados de seleção para os filtros
  projetos: Array<ProjetoResponse> = [];
  usuarios: Array<UsuarioResponse> = [];

  // Loading flags
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private relatorioService: RelatorioService
  ) { }

  ngOnInit(): void {
    this.inicializarFiltros();
    this.carregarDadosIniciais();
    this.configurarOpcoesGraficos();
  }

  inicializarFiltros(): void {
    const dataAtual = new Date();
    const dataInicial = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 3, 1);

    this.filtroForm = this.formBuilder.group({
      dataInicio: [dataInicial],
      dataFim: [dataAtual],
      projetoId: [null],
      usuarioId: [null],
      status: [null]
    });

    // Escuta mudanças no formulário
    this.filtroForm.valueChanges.subscribe(() => {
      this.buscarDados();
    });
  }

  carregarDadosIniciais(): void {
    this.loading = true;

    // Carregar projetos e usuários para os filtros
    this.relatorioService.listarProjetos().subscribe({
      next: (data) => {
        this.projetos = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar projetos'
        });
      }
    });

    this.relatorioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar usuários'
        });
      }
    });

    // Buscar dados iniciais
    this.buscarDados();
  }

  configurarOpcoesGraficos(): void {
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  buscarDados(): void {
    this.loading = true;

    // Obter valores do formulário
    const filtros = this.filtroForm.value;

    // Buscar horas por projeto
    this.relatorioService.buscarHorasPorProjeto(filtros).subscribe({
      next: (data) => {
        this.horasPorProjetoData = {
          labels: data.map(item => item.nomeProjeto),
          datasets: [
            {
              label: 'Horas Trabalhadas',
              backgroundColor: this.gerarCoresAleatoriasTransparentes(data.length),
              borderColor: this.gerarCoresAleatorias(data.length),
              borderWidth: 1,
              data: data.map(item => item.totalHoras)
            }
          ]
        };
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar dados de horas por projeto'
        });
      }
    });

    // Buscar horas por mês
    this.relatorioService.buscarHorasPorMes(filtros).subscribe({
      next: (data) => {
        this.horasPorMesData = {
          labels: data.map(item => item.mes),
          datasets: [
            {
              label: 'Horas Trabalhadas',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: data.map(item => item.totalHoras),
              fill: false,
              tension: 0.4
            }
          ]
        };
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar dados de horas por mês'
        });
      }
    });

    // Buscar atividades por status
    this.relatorioService.buscarAtividadesPorStatus(filtros).subscribe({
      next: (data) => {
        this.atividadesPorStatusData = {
          labels: data.map(item => item.status),
          datasets: [
            {
              data: data.map(item => item.quantidade),
              backgroundColor: this.gerarCoresAleatoriasTransparentes(data.length),
              hoverBackgroundColor: this.gerarCoresAleatorias(data.length)
            }
          ]
        };
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar dados de atividades por status'
        });
      }
    });

    // Buscar top usuários
    this.relatorioService.buscarTopUsuariosPorHoras(filtros).subscribe({
      next: (data) => {
        console.log(data);
        this.topUsuariosData = {
          labels: data.map(item => item.nomeUsuario),
          datasets: [
            {
              label: 'Horas Trabalhadas',
              backgroundColor: '#FF9800',
              data: data.map(item => item.totalHoras)
            }
          ]
        };
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar dados de top usuários'
        });
        this.loading = false;
      }
    });
  }

  gerarCoresAleatorias(quantidade: number): string[] {
    const cores = [];
    for (let i = 0; i < quantidade; i++) {
      cores.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
    }
    return cores;
  }

  gerarCoresAleatoriasTransparentes(quantidade: number): string[] {
    const cores = [];
    for (let i = 0; i < quantidade; i++) {
      cores.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
    }
    return cores;
  }

  limparFiltros(): void {
    const dataAtual = new Date();
    const dataInicial = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 3, 1);

    this.filtroForm.patchValue({
      dataInicio: dataInicial,
      dataFim: dataAtual,
      projetoId: null,
      usuarioId: null,
      status: null
    });
  }
}
