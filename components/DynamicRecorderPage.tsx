// angelia-frontend/components/DynamicRecorderPage.tsx
import dynamic from 'next/dynamic';
import React from 'react';

// Este componente é um wrapper que vai carregar o componente real de forma dinâmica
// Desabilita SSR para o componente interno
const DynamicRecorderPage = dynamic(() => import('../pages/admin/upload'), { // OU '../pages/ferramenta'
  ssr: false, // Desativa a renderização no lado do servidor
});

// Nota: Este é um exemplo simplificado.
// Se sua página de upload/ferramenta tem props, você precisaria passá-las aqui.
// No nosso caso, o componente UploadPage/FerramentaPage já é uma página completa,
// então podemos carregá-lo diretamente.

interface DynamicPageProps {
  // Se sua página UploadPage/FerramentaPage aceita props, defina-as aqui
  // Por exemplo: someProp: string;
}

const RecorderWrapper: React.FC<DynamicPageProps> = (props) => {
  return <DynamicRecorderPage {...props} />;
};

export default RecorderWrapper;