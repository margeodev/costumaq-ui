export class Endereco {
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  localidade: string;
  uf: string;
  cep: string;
}

export class Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string
  cnjp: string;
  telefone: string;
  whatsapp: string;
  tipoCliente: 'PESSOA_FISICA';
  endereco = new Endereco();
}

export class Mecanico {
  id: number;
  nome: string;
  cpf: string;
}

export class Equipamento {
  id: number;
  numeroSerie: string;
  modelo: string;
  fabricante: string;
}

export class OrdemServico {
  codigo: number;
  descricaoProblema: string;
  observacaoEquipamento: string;
  dataEntrada: Date;
  equipamento = new Equipamento();
  cliente = new Cliente();
}

export class ServicoResumo {
  ordemServico = new OrdemServico();
}


export class Servico {
  id: number;
  ordemServico = new OrdemServico();
  mecanico = new Mecanico();
  tipoServico: null;
  valor: number;
  statusServico: 'NAO_DEFINIDO';
  descricao: string;
  dataEntrega: Date;
  dataGarantia: Date;
  concluido: boolean;
}


