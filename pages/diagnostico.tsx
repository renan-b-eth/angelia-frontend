// angelia-frontend/pages/diagnostico.tsx
import React from 'react';
import styled from 'styled-components';
import VoiceDiagnosisCard from '../components/VoiceDiagnosisCard'; // Importe o novo componente
import Head from 'next/head'; // Para metadados da página
import Navbar from '../components/Navbar'; // Se você tiver uma Navbar global

// Componente Wrapper para o conteúdo da página
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0A192F;
  color: #CCD6F6;
  padding: 4rem 2rem;
  padding-top: 120px; /* Para acomodar a Navbar fixa */
`;

const DiagnosticoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Diagnóstico por Voz - Angelia AI</title>
        <meta name="description" content="Obtenha um diagnóstico preliminar da sua voz usando inteligência artificial." />
      </Head>
      <Navbar /> {/* Assumindo que você tem uma Navbar global */}
      <PageWrapper>
        {/* Renderiza o componente de diagnóstico */}
        <VoiceDiagnosisCard />
      </PageWrapper>
    </>
  );
};

export default DiagnosticoPage;