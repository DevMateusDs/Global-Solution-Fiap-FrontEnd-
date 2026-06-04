export interface Alerta {
    id?: number;
    titulo: string;
    nivel: string;
    descricao: string;
    dataHora: string;
}

export interface EventoOperacional {
  id?: number;
  sistema: string;
  descricao: string;
  status: string;
  dataHora: string;
}

export interface SensorEspacial {
  id?: number;
  nome: string;
  tipo: string;
  status: string;
  temperatura: number;
  localizacao: string;
}