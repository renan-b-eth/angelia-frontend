// pages/ferramenta.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMic, FiPause, FiPlay, FiRefreshCw, FiArrowLeft } from 'react-icons/fi'; // Ícones

// --- Tipos para o estado da ferramenta ---
type ToolState = 'intro' | 'recording' | 'paused' | 'processing' | 'results';

// --- Tipos para o Relatório ---
type RiskLevel = 'low' | 'medium' | 'high'; // Tipo para o nível de risco

interface VocalBiomarker {
  name: string;
  value: string;
  status: string;
  type: RiskLevel; // Agora usando o tipo RiskLevel
}

interface ReportData {
  overallRisk: RiskLevel;
  recommendation: string;
  vocalBiomarkers: VocalBiomarker[];
  implications: string;
}

// --- Estilização (Styled Components) ---

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0A192F;
  color: #CCD6F6;
  padding: 2rem;
  overflow-x: hidden;
`;

const ToolCard = styled(motion.div)`
  width: 100%;
  max-width: 700px;
  background-color: #112240;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 2.2rem;
  color: #FFF;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Instructions = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #8892B0;
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? '#64FFDA' : '#1A2D4F'};
  color: ${props => props.primary ? '#0A192F' : '#CCD6F6'};
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.primary ? '#4CAF9D' : '#2A4365'};
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
    transform: none;
  }
`;

const RecordMainButton = styled(ActionButton)<{ paused?: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.paused ? '#FFC107' : '#E84D4D'}; /* Amarelo para pausado, Vermelho para gravar */
  color: ${props => props.paused ? '#0A192F' : 'white'};

  &:hover {
    background-color: ${props => props.paused ? '#E6B800' : '#CC3E3E'};
  }
`;


const spinnerAnimation = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(100, 255, 218, 0.2);
  border-top-color: #64FFDA;
  border-radius: 50%;
  animation: ${spinnerAnimation} 1s linear infinite;
  margin: 2rem auto;
`;

const recordingAnimation = keyframes`
  0% { transform: scaleY(0.1); }
  50% { transform: scaleY(1); }
  100% { transform: scaleY(0.1); }
`;

const VoiceVisualizer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  gap: 5px;
  margin: 2rem auto;
  width: 80%;
  max-width: 300px;

  div {
    width: 8px;
    height: 100%;
    background-color: #64FFDA;
    animation: ${recordingAnimation} 1.2s infinite ease-in-out;
    border-radius: 2px;
  }
  div:nth-child(2) { animation-delay: 0.1s; }
  div:nth-child(3) { animation-delay: 0.2s; }
  div:nth-child(4) { animation-delay: 0.3s; }
  div:nth-child(5) { animation-delay: 0.4s; }
  div:nth-child(6) { animation-delay: 0.5s; }
  div:nth-child(7) { animation-delay: 0.6s; }
  div:nth-child(8) { animation-delay: 0.7s; }
  div:nth-child(9) { animation-delay: 0.8s; }
  div:nth-child(10) { animation-delay: 0.9s; }
`;

const ReportContainer = styled.div`
  margin-top: 2rem;
  padding: 2.5rem;
  border: 1px solid #64FFDA;
  border-radius: 8px;
  background-color: rgba(100, 255, 218, 0.05);
  text-align: left;
`;

const ReportTitle = styled.h3`
  font-family: 'Sora', sans-serif;
  color: #64FFDA;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ReportSection = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px dashed #1A2D4F;
  padding-bottom: 1.5rem;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.h4`
  font-family: 'Sora', sans-serif;
  color: #CCD6F6;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
`;

const ReportItem = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #8892B0;
  line-height: 1.7;
  margin-bottom: 0.5rem;

  strong {
    color: #FFF;
  }
`;

const ResultEmphasis = styled.span<{ type: RiskLevel }>`
  color: ${props => {
    switch(props.type) {
      case 'low': return '#64FFDA'; // Verde-água para baixo risco/bom
      case 'medium': return '#FFC107'; // Amarelo para atenção
      case 'high': return '#E84D4D'; // Vermelho para alto risco
      default: return '#8892B0';
    }
  }};
  font-weight: bold;
`;

const Disclaimer = styled.p`
  margin-top: 2rem;
  color: #FFC107;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const BackHomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  color: #64FFDA;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Componente do Relatório (NOVO) ---
const AnalysisReport: React.FC = () => {
  // Dados simulados para o relatório, agora com tipagem rigorosa
  const reportData: ReportData = {
    overallRisk: 'medium',
    recommendation: 'Recomenda-se acompanhamento com um neurologista ou fonoaudiólogo para avaliação aprofundada.',
    vocalBiomarkers: [
      { name: "Jitter (Variação de Pitch)", value: "2.5%", status: "Elevado", type: "high" },
      { name: "Shimmer (Variação de Amplitude)", value: "4.1%", status: "Normal", type: "low" },
      { name: "Taxa de Harmonia-Ruído (NHR)", value: "0.15", status: "Levemente Alterado", type: "medium" },
      { name: "Duração da Fonetização", value: "3.2s", status: "Normal", type: "low" },
    ],
    implications: "Padrões vocais como jitter elevado podem estar associados a uma menor estabilidade do controle motor da fala, comum em estágios iniciais de algumas condições neurodegenerativas.",
  };

  return (
    <ReportContainer>
      <ReportTitle>Relatório de Análise Vocal angel.ia</ReportTitle>

      <ReportSection>
        <SectionHeader>Risco Preliminar Detectado:</SectionHeader>
        <ReportItem>
          Nível de Risco: <ResultEmphasis type={reportData.overallRisk}>
            {reportData.overallRisk === 'low' && 'BAIXO'}
            {reportData.overallRisk === 'medium' && 'MÉDIO (Atenção)'}
            {reportData.overallRisk === 'high' && 'ALTO'}
          </ResultEmphasis>
        </ReportItem>
        <ReportItem>
          Recomendação: <strong>{reportData.recommendation}</strong>
        </ReportItem>
      </ReportSection>

      <ReportSection>
        <SectionHeader>Biomarcadores Vocais Analisados:</SectionHeader>
        {reportData.vocalBiomarkers.map((bm, index) => (
          <ReportItem key={index}>
            <strong>{bm.name}:</strong> {bm.value} (Status: <ResultEmphasis type={bm.type}>{bm.status}</ResultEmphasis>)
          </ReportItem>
        ))}
      </ReportSection>

      <ReportSection>
        <SectionHeader>Implicações Potenciais:</SectionHeader>
        <ReportItem>{reportData.implications}</ReportItem>
      </ReportSection>

      <Disclaimer>
        AVISO LEGAL: Este relatório é gerado por Inteligência Artificial e oferece uma análise preliminar baseada em biomarcadores vocais. Ele NÃO constitui um diagnóstico médico. A interpretação e as decisões de tratamento devem ser feitas exclusivamente por um profissional de saúde qualificado.
      </Disclaimer>
    </ReportContainer>
  );
};

// --- Componente da Página principal da Ferramenta ---
const Ferramenta: NextPage = () => {
  const [state, setState] = useState<ToolState>('intro');
  const [countdown, setCountdown] = useState(30); // Gravação de 30 segundos
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Efeito para gerenciar o temporizador e os estados
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state === 'recording' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (state === 'recording' && countdown === 0) {
      handleStopRecording(); // Para a gravação automaticamente
    } else if (state === 'processing') {
      timer = setTimeout(() => setState('results'), 3000); // Simula 3s de análise
    }

    // Cleanup para o timer
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state, countdown]);

  // Função para iniciar a gravação do microfone
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Garantir que a stream seja parada após a gravação
        stream.getTracks().forEach(track => track.stop());

        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          console.log("Audio gravado:", audioBlob);
          // TODO: Aqui você enviaria audioBlob para seu backend de IA
          // Ex: fetch('/api/analyze-audio', { method: 'POST', body: audioBlob })
          setState('processing');
        } else {
          console.warn("Nenhum dado de áudio gravado.");
          alert("Nenhum áudio foi gravado. Tente novamente.");
          setState('intro'); // Volta para o início se nada foi gravado
        }
      };

      mediaRecorderRef.current.start();
      setCountdown(30); // Inicia contagem de 30 segundos
      setState('recording');
    } catch (err) {
      console.error("Erro ao acessar o microfone:", err);
      alert("Precisamos de acesso ao seu microfone para gravar a voz. Verifique as permissões.");
      setState('intro'); // Volta para o início em caso de erro
    }
  };

  // Função para parar a gravação
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording' || mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.stop();
    }
  };

  // Função para pausar a gravação
  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setState('paused');
    }
  };

  // Função para resumir a gravação
  const handleResumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setState('recording');
    }
  };

  // Função para resetar todo o processo
  const handleReset = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop(); // Garante que pare qualquer gravação ativa ou pausada
      // A stream associada já deve ter sido parada no onstop do mediaRecorder
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setCountdown(30);
    setState('intro'); // Volta para a tela de introdução
  };

  // Renderização condicional do conteúdo com base no estado
  const renderContent = () => {
    switch (state) {
      case 'intro':
        return (
          <>
            <Title>Sua Voz, Sua Saúde.</Title>
            <Instructions>
              Bem-vindo à ferramenta de análise vocal da angel.ia.
              Aqui, sua voz se torna uma ponte para a detecção precoce de possíveis biomarcadores
              relacionados a condições neurodegenerativas.
              <br/><br/>
              Para iniciar, por favor, prepare-se para gravar sua voz por 30 segundos.
              Siga as instruções abaixo.
            </Instructions>
            <ActionButton primary onClick={startRecording}>
              <FiMic size={20} /> Iniciar Gravação
            </ActionButton>
          </>
        );
      case 'recording':
        return (
          <>
            <Title>Gravando... ({countdown}s restantes)</Title>
            <Instructions>
              Fale de forma clara e contínua sobre qualquer assunto (ex: seu dia, uma história).
            </Instructions>
            <VoiceVisualizer>
              {Array.from({ length: 10 }).map((_, i) => <div key={i} />)}
            </VoiceVisualizer>
            <ButtonGroup>
              <ActionButton onClick={handlePauseRecording}><FiPause size={20} /> Pausar</ActionButton>
              <ActionButton onClick={handleStopRecording} primary><FiMic size={20} /> Finalizar</ActionButton>
            </ButtonGroup>
          </>
        );
      case 'paused':
        return (
          <>
            <Title>Gravação Pausada ({countdown}s restantes)</Title>
            <Instructions>
              Retome a gravação para continuar ou finalize para analisar o que já foi capturado.
            </Instructions>
            <RecordMainButton paused onClick={handleResumeRecording}>
              <FiPlay size={40} /> Retomar
            </RecordMainButton>
            <ButtonGroup>
              <ActionButton onClick={handleReset}><FiRefreshCw size={20} /> Refazer</ActionButton>
              <ActionButton onClick={handleStopRecording} primary><FiMic size={20} /> Finalizar</ActionButton>
            </ButtonGroup>
          </>
        );
      case 'processing':
        return (
          <>
            <Title>Analisando sua voz...</Title>
            <Instructions>Nossa IA está processando os biomarcadores vocais. Isso pode levar alguns segundos.</Instructions>
            <Spinner />
          </>
        );
      case 'results':
        return (
          <>
            <Title>Resultados da Análise</Title>
            <AnalysisReport /> {/* Componente de Relatório aqui */}
            <ButtonGroup>
              <ActionButton primary onClick={handleReset}><FiRefreshCw size={20} /> Fazer Nova Análise</ActionButton>
            </ButtonGroup>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Ferramenta de Análise | angel.ia</title>
      </Head>
      <PageContainer>
        <ToolCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {renderContent()}
        </ToolCard>
        <BackHomeLink href="/"><FiArrowLeft size={16} /> Voltar para a página inicial</BackHomeLink>
      </PageContainer>
    </>
  );
};

export default Ferramenta;