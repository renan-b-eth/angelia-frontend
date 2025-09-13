// angelia-frontend/pages/admin/upload.tsx
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';

// Styled Components para o layout da página
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0A192F;
  color: #CCD6F6;
  padding: 4rem 2rem;
  padding-top: 120px; /* Ajuste para não ficar atrás do header fixo */
`;

const LoadingMessage = styled.p`
  color: #64FFDA;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
`;

// Importação dinâmica do UploadPageContent
// Isso garante que o componente só será carregado no lado do cliente,
// evitando problemas com APIs do navegador (como Web Workers) durante o build/SSR.
const DynamicUploadPageContent = dynamic(() => import('../../components/UploadPageContent'), {
  ssr: false, // Desabilita o Server-Side Rendering para este componente
  loading: () => <LoadingMessage>Carregando ferramenta...</LoadingMessage>,
});

const UploadPage: React.FC = () => {
  return (
    <PageContainer>
      <DynamicUploadPageContent />
    </PageContainer>
  );
};

export default UploadPage;