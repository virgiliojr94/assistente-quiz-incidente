"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Flame, AlertTriangle, CircleDashed, CheckCircle, Circle } from 'lucide-react';

const perguntas = [
  {
    titulo: 'Impacto Institucional',
    pergunta: 'O incidente afeta a operação do órgão, serviços prestados ou imagem pública?',
    opcoes: [
      { texto: 'Sim, afeta totalmente e gera risco institucional.', pontos: 4 },
      { texto: 'Afeta parcialmente serviços essenciais.', pontos: 3 },
      { texto: 'Afeta áreas não essenciais.', pontos: 2 },
      { texto: 'Não há impacto institucional perceptível.', pontos: 0 },
    ],
  },
  {
    titulo: 'Impacto no Usuário Final',
    pergunta: 'O cidadão ou servidor é impedido de executar suas funções?',
    opcoes: [
      { texto: 'Sim, completamente impedido.', pontos: 4 },
      { texto: 'Há dificuldade significativa, mas ainda funciona.', pontos: 3 },
      { texto: 'Pequeno incômodo, sem bloqueio funcional.', pontos: 1 },
      { texto: 'Sem impacto para o usuário final.', pontos: 0 },
    ],
  },
  {
    titulo: 'Impacto Regulatório',
    pergunta: 'O incidente pode violar legislação, contratos ou normas técnicas?',
    opcoes: [
      { texto: 'Sim, há violação imediata.', pontos: 4 },
      { texto: 'Risco potencial de não conformidade.', pontos: 2 },
      { texto: 'Não há impacto regulatório.', pontos: 0 },
    ],
  },
  {
    titulo: 'Escalabilidade da Falha',
    pergunta: 'O incidente pode se agravar ou propagar para outros serviços?',
    opcoes: [
      { texto: 'Sim, já está afetando outros serviços.', pontos: 4 },
      { texto: 'Pode escalar rapidamente.', pontos: 3 },
      { texto: 'Impacto contido, mas com risco.', pontos: 2 },
      { texto: 'Totalmente isolado.', pontos: 0 },
    ],
  },
  {
    titulo: 'Recorrência',
    pergunta: 'O incidente já aconteceu antes? Há histórico no monitoramento?',
    opcoes: [
      { texto: 'Sim, acontece com frequência.', pontos: 4 },
      { texto: 'Já ocorreu algumas vezes.', pontos: 2 },
      { texto: 'Primeira ocorrência conhecida.', pontos: 0 },
    ],
  },
  {
    titulo: 'Facilidade de Correção',
    pergunta: 'Exige intervenção manual ou é facilmente resolvível?',
    opcoes: [
      { texto: 'Precisa de ação humana imediata.', pontos: 4 },
      { texto: 'Requer análise, mas pode ser automatizado.', pontos: 2 },
      { texto: 'Já tem correção automática.', pontos: 0 },
    ],
  },
];

const icones = {
  P0: <Flame className="text-red-600" />, 
  P1: <AlertTriangle className="text-orange-500" />,
  P2: <CircleDashed className="text-yellow-500" />,
  P3: <CheckCircle className="text-green-500" />,
  P4: <Circle className="text-blue-500" />,
};

const prioridadeFinal = (total) => {
  if (total >= 20) return 'P0';
  if (total >= 16) return 'P1';
  if (total >= 11) return 'P2';
  if (total >= 6) return 'P3';
  return 'P4';
};

export default function AssistentePrioridade() {
  const [etapa, setEtapa] = useState('onboarding');
  const [dados, setDados] = useState({ nome: '', cargo: '', email: '', app: '', infra: '' });
  const [respostas, setRespostas] = useState([]);
  const [index, setIndex] = useState(0);
  const [resultado, setResultado] = useState(null);

  const handleNext = () => setEtapa('form');
  const handleForm = e => setDados({ ...dados, [e.target.name]: e.target.value });
  const handleStart = () => setEtapa('quiz');

  const handleResposta = (opcao) => {
    const nova = [...respostas, { ...perguntas[index], resposta: opcao.texto, pontos: opcao.pontos }];
    if (index + 1 === perguntas.length) {
      const total = nova.reduce((acc, r) => acc + r.pontos, 0);
      const prioridade = prioridadeFinal(total);
      setResultado({ total, prioridade, respostas: nova });
      setEtapa('resultado');
    } else {
      setRespostas(nova);
      setIndex(index + 1);
    }
  };

  const gerarMensagem = () => {
    const texto = `*Classificação de Incidente - ${dados.app}*
` +
      `👤 *${dados.nome}* (${dados.cargo})
📧 ${dados.email}
🖥️ ${dados.infra}

` +
      `📊 *Prioridade:* ${resultado.prioridade} (Pontuação: ${resultado.total})

` +
      resultado.respostas.map(r => `*${r.titulo}*
${r.pergunta}
➡️ ${r.resposta} (+${r.pontos})
`).join('
') +
      `
📎 Enviado via Assistente de Priorização.`;
    return `https://api.whatsapp.com/send?phone=5595981121572&text=${encodeURIComponent(texto)}`;
  };

  if (etapa === 'onboarding') return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-xl w-full p-6">
        <Card>
          <CardContent className="space-y-4 p-6 text-center">
            <h1 className="text-2xl font-bold">🔍 Assistente de Priorização de Incidentes</h1>
            <p>Classifique incidentes com base em critérios objetivos da SEFAZ RR.</p>
            <ul className="text-left list-disc px-6 text-sm">
              <li>✅ Responda 6 perguntas técnicas e institucionais</li>
              <li>✅ Obtenha a prioridade P0 a P4</li>
              <li>✅ Compartilhe com a equipe via WhatsApp</li>
            </ul>
            <a href="https://docs.google.com/document/d/1VGsVyPhKCJdppXdnlSd6tv3OiFSZAvemfgsogdIH8lY" className="text-blue-500 underline" target="_blank" rel="noreferrer">📄 Ver documentação oficial</a>
            <Button className="mt-4 w-full" onClick={handleNext}>Continuar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (etapa === 'form') return (
    <div className="max-w-xl mx-auto p-6">
      <Card><CardContent className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">Preencha os dados iniciais</h2>
        <Input placeholder="Nome completo" name="nome" value={dados.nome} onChange={handleForm} />
        <Input placeholder="Cargo" name="cargo" value={dados.cargo} onChange={handleForm} />
        <Input placeholder="Email corporativo" name="email" value={dados.email} onChange={handleForm} />
        <Input placeholder="Nome da aplicação/serviço" name="app" value={dados.app} onChange={handleForm} />
        <Input placeholder="Infraestrutura / servidor" name="infra" value={dados.infra} onChange={handleForm} />
        <Button className="mt-2 w-full" onClick={handleStart}>Iniciar Classificação</Button>
      </CardContent></Card>
    </div>
  );

  if (etapa === 'quiz') {
    const atual = perguntas[index];
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card><CardContent className="space-y-4 p-6">
            <h2 className="text-lg font-bold">{atual.titulo}</h2>
            <p>{atual.pergunta}</p>
            <div className="flex flex-col gap-4 pt-4">
              {atual.opcoes.map((op, i) => (
                <Button key={i} variant="outline" onClick={() => handleResposta(op)}>{op.texto}</Button>
              ))}
            </div>
          </CardContent></Card>
        </motion.div>
      </div>
    );
  }

  if (etapa === 'resultado') return (
    <div className="max-w-xl mx-auto p-6">
      <Card><CardContent className="space-y-4 p-6 text-center">
        <div className="text-4xl">{icones[resultado.prioridade]}</div>
        <h2 className="text-2xl font-bold">Prioridade: {resultado.prioridade}</h2>
        <p className="text-muted-foreground">Pontuação total: {resultado.total}</p>
        <div className="text-left text-sm space-y-2 pt-4">
          {resultado.respostas.map((r, i) => (
            <div key={i}><strong>{r.titulo}</strong><br />{r.pergunta}<br /><em>{r.resposta}</em> (+{r.pontos})</div>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <a href={gerarMensagem()} target="_blank" rel="noreferrer">
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full">📤 Enviar via WhatsApp</Button>
          </a>
          <Button variant="outline" onClick={() => window.location.reload()}>🔁 Nova Classificação</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}