export type VisualizarTarefaViewModel = {
  id: string;
  titulo: string;
  dataCriacao: Date;
  dataConclusao?: Date;

  quantidadeItens: number;
  percentualConcluido: number;

  prioridade: string;
  situacao: string;

  itens: VisualizarTarefaViewModel[];
};