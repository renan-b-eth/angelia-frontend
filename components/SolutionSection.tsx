import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image'; // Importar o componente Image do Next.js

// --- Estilização ---
const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0A192F;
  overflow-x: hidden; // Evita barras de rolagem horizontais durante a animação
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    order: 2; // O texto fica abaixo da imagem no mobile
  }
`;

const ImageColumn = styled(motion.div)`
  width: 100%;
  height: 350px;
  background-color: #112240; // Placeholder para a imagem
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #64FFDA;
  font-size: 1.5rem;
  // No projeto real, substitua isso por um componente <Image> do Next.js
  
  @media (max-width: 768px) {
    order: 1;
    height: 250px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #CCD6F6;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #8892B0;
  margin-bottom: 2rem;
`;

const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HighlightItem = styled.li`
  color: #8892B0;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '✓';
    color: #64FFDA;
    margin-right: 15px;
    font-size: 1.2rem;
  }
`;

// --- Animações ---
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};


const SolutionSection: React.FC = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <ImageColumn
          variants={fromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
           <Image 
                    src="/images/banner.png" // Caminho para a sua logo
                    alt="angel.ia Logo"
                    width={350} // Largura da imagem da logo em pixels
                    height={350} // Altura da imagem da logo em pixels
                    priority // Prioriza o carregamento desta imagem
                  />
        </ImageColumn>
        <TextColumn
          variants={fromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Title>A revolução da análise vocal.</Title>
          <Paragraph>
            Nossa plataforma de IA analisa mais de 300 características da sua voz em segundos. Timbre, ritmo, jitter e shimmer se tornam biomarcadores digitais, revelando padrões invisíveis ao ouvido humano.
          </Paragraph>
          <HighlightList>
            <HighlightItem><strong>Detecção Precoce:</strong> Identifique riscos antes dos sintomas.</HighlightItem>
            <HighlightItem><strong>100% Não-Invasivo:</strong> Apenas 30 segundos de fala.</HighlightItem>
            <HighlightItem><strong>Acessível:</strong> Realizável de qualquer lugar, com qualquer microfone.</HighlightItem>
          </HighlightList>
        </TextColumn>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default SolutionSection;