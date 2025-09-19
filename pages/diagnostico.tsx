// angelia-frontend/pages/diagnostico.tsx
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import dynamic from 'next/dynamic'; // Importe o 'dynamic'

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0A192F;
  color: #CCD6F6;
  padding: 4rem 2rem;
  padding-top: 120px; /* Para acomodar a Navbar fixa */
`;

const LoadingMessage = styled.p`
  color: #64FFDA;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
`;

// --- Importação Dinâmica do Componente ---
// Carrega o VoiceDiagnosisCard dinamicamente, desabilitando a renderização no servidor (SSR)
const DynamicVoiceDiagnosisCard = dynamic(
  () => import('../components/VoiceDiagnosisCard'),
  {
    ssr: false, // ISSO É CRUCIAL! Garante que o componente só renderize no navegador.
    loading: () => <LoadingMessage>Carregando ferramenta de diagnóstico...</LoadingMessage>,
  }
);

const DiagnosticoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Diagnóstico por Voz - Angelia AI</title>
        <meta name="description" content="Obtenha um diagnóstico preliminar da sua voz usando inteligência artificial." />
      </Head>
      <PageWrapper>
        {/* Renderiza o componente que agora é carregado dinamicamente */}
        <DynamicVoiceDiagnosisCard />
      </PageWrapper>
    </>
  );
};

export default DiagnosticoPage;