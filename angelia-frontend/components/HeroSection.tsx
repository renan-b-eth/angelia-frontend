import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

// --- Tipagem ---
// Nenhuma prop é necessária para este componente, então não precisamos definir uma interface.
// O tipo `Variants` do Framer Motion pode ser usado para tipar nossas animações.

// --- Estilização (Styled Components) ---
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0A192F;
  color: #CCD6F6;
  text-align: center;
  padding: 2rem;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  color: #FFF;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem; // Ajuste para telas menores
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 650px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// --- Animações (Framer Motion) ---
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8 
    } 
  },
};

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      {/* <SoundWaveAnimation /> // Seu componente de animação */}
      
      <Title variants={fadeIn} initial="hidden" animate="visible">
        O Futuro do Diagnóstico Está na Sua Voz.
      </Title>
      
      <Subtitle 
        variants={fadeIn} 
        initial="hidden" 
        animate="visible" 
        // Adicionando um 'transition' diretamente para o delay
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Vocalix utiliza Inteligência Artificial para detectar sinais precoces de Parkinson, Alzheimer e outras condições através de simples biomarcadores vocais.
      </Subtitle>

      {/* Seus botões de ação viriam aqui */}
    </HeroContainer>
  );
};

export default HeroSection;