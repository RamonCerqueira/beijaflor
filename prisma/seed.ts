import { PrismaClient, TransactionType, NoticeCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seed...');

  // Limpar dados existentes para evitar duplicidade em re-runs
  await prisma.notice.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Banco de dados limpo com sucesso.');

  // 1. Criar usuário Administrador
  const passwordHash = await bcrypt.hash('adminbeijaflor', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      passwordHash,
    },
  });
  console.log(`Usuário admin criado: ${admin.username}`);

  // 2. Criar Transações Financeiras (Mockadas de forma realista)
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const transactions = [
    // RECEITAS (INCOME)
    {
      description: 'Doação Individual Mensal - Amigos do Beija-Flor',
      amount: 12450.00,
      type: TransactionType.INCOME,
      category: 'Doações Individuais',
      date: new Date(currentYear, currentMonth, 5),
    },
    {
      description: 'Doação de Benfeitor da Itália (Campanha Solidária)',
      amount: 8500.00,
      type: TransactionType.INCOME,
      category: 'Doações Internacionais',
      date: new Date(currentYear, currentMonth, 10),
    },
    {
      description: 'Convênio Municipal - Apoio à Educação Infantil',
      amount: 15000.00,
      type: TransactionType.INCOME,
      category: 'Subvenções Governamentais',
      date: new Date(currentYear, currentMonth, 15),
    },
    {
      description: 'Arrecadação Rifa Beneficente de Páscoa/Primavera',
      amount: 3250.00,
      type: TransactionType.INCOME,
      category: 'Eventos Beneficentes',
      date: new Date(currentYear, currentMonth, 22),
    },
    {
      description: 'Doações pelo PIX Geral da Landing Page',
      amount: 1980.50,
      type: TransactionType.INCOME,
      category: 'Doações Individuais',
      date: new Date(currentYear, currentMonth, 28),
    },
    // DESPESAS (EXPENSE)
    {
      description: 'Salário dos Professores e Pedagogas da Creche',
      amount: 14200.00,
      type: TransactionType.EXPENSE,
      category: 'Recursos Humanos',
      date: new Date(currentYear, currentMonth, 5),
    },
    {
      description: 'Compra de Alimentos para Refeições da Creche (Mensal)',
      amount: 5430.20,
      type: TransactionType.EXPENSE,
      category: 'Alimentação',
      date: new Date(currentYear, currentMonth, 8),
    },
    {
      description: 'Manutenção de Infraestrutura e Reparos das Salas',
      amount: 1250.00,
      type: TransactionType.EXPENSE,
      category: 'Infraestrutura/Manutenção',
      date: new Date(currentYear, currentMonth, 12),
    },
    {
      description: 'Materiais Pedagógicos, Tintas e Papelaria para Oficinas',
      amount: 980.40,
      type: TransactionType.EXPENSE,
      category: 'Material Didático',
      date: new Date(currentYear, currentMonth, 18),
    },
    {
      description: 'Contas de Água e Energia Elétrica',
      amount: 1650.00,
      type: TransactionType.EXPENSE,
      category: 'Despesas Operacionais',
      date: new Date(currentYear, currentMonth, 20),
    },
    {
      description: 'Instrutor de Capoeira e Teatro (Oficinas dos Adolescentes)',
      amount: 2800.00,
      type: TransactionType.EXPENSE,
      category: 'Recursos Humanos',
      date: new Date(currentYear, currentMonth, 25),
    },
    {
      description: 'Aluguel de Transporte para Passeio Cultural das Crianças',
      amount: 1100.00,
      type: TransactionType.EXPENSE,
      category: 'Eventos/Atividades Extra',
      date: new Date(currentYear, currentMonth - 1, 28), // Mês passado
    },
    {
      description: 'Doação Individual Mensal - Parcerias de Salvador',
      amount: 11200.00,
      type: TransactionType.INCOME,
      category: 'Doações Individuais',
      date: new Date(currentYear, currentMonth - 1, 5), // Mês passado
    },
    {
      description: 'Compra de Cestas Básicas para Famílias Vulneráveis',
      amount: 4500.00,
      type: TransactionType.EXPENSE,
      category: 'Assistência Social',
      date: new Date(currentYear, currentMonth - 1, 15), // Mês passado
    },
  ];

  for (const tx of transactions) {
    await prisma.transaction.create({ data: tx });
  }
  console.log(`Criadas ${transactions.length} transações financeiras.`);

  // 3. Criar Avisos/Comunicados
  const notices = [
    {
      title: 'Início das Matrículas para a Creche-Escola 2026',
      content: 'Atenção comunidade! Estão abertas as inscrições para preenchimento de vagas na nossa creche-escola. O critério principal de seleção é a vulnerabilidade socioeconômica da família. Documentação necessária: RG dos responsáveis, Certidão de Nascimento da criança, comprovante de residência e folha de resumo do Cadastro Único. Procure a secretaria da Associação de segunda a sexta, das 08:00 às 12:00.',
      category: NoticeCategory.GENERAL,
      date: new Date(currentYear, currentMonth, 2),
      active: true,
    },
    {
      title: 'Reunião de Pais e Responsáveis - Alinhamento Semestral',
      content: 'Convidamos todas as mães, pais e responsáveis pelas crianças do Projeto Beija-Flor para a nossa reunião geral com o Padre Marco Pagliucci e a equipe pedagógica. Pauta: Desenvolvimento escolar das crianças, calendário de oficinas dos adolescentes e prestação de contas. Data: Próximo sábado, às 09:00, no salão paroquial. A presença é de extrema importância para o andamento do projeto.',
      category: NoticeCategory.MEETING,
      date: new Date(currentYear, currentMonth, 10),
      active: true,
    },
    {
      title: 'Apresentação Especial do Grupo de Teatro e Capoeira',
      content: 'No próximo dia 15 deste mês, os adolescentes das nossas oficinas de teatro, circo e capoeira farão uma apresentação especial aberta ao público. Venham prestigiar os talentos da nossa comunidade de Massaranduba! O evento acontecerá na quadra do projeto a partir das 16:30. Entrada gratuita.',
      category: NoticeCategory.EVENT,
      date: new Date(currentYear, currentMonth, 12),
      active: true,
    },
    {
      title: 'Mutirão de Limpeza e Pintura da Sede',
      content: 'Estamos convidando voluntários para colaborar com a pintura de duas salas de aula novas que abrigarão os atendimentos de reforço escolar. Traga sua energia e boa vontade para nos ajudar a fazer da nossa escola um lugar ainda mais bonito e acolhedor! Lanche comunitário será servido para todos.',
      category: NoticeCategory.EVENT,
      date: new Date(currentYear, currentMonth - 1, 20),
      active: true,
    },
  ];

  for (const notice of notices) {
    await prisma.notice.create({ data: notice });
  }
  console.log(`Criados ${notices.length} avisos no mural.`);

  console.log('Seed completo com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
