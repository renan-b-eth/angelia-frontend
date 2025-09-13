// components/BenefitsSection.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiHeart, FiAward } from 'react-icons/fi'; // Novos ícones

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0B1A30;
`;

const Title = styled.h2`
  font-family: 'Sora', sans-serif;
  font-size: 2.5rem;
  color: #CCD6F6;
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BenefitsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1100px;
`;

const BenefitCard = styled(motion.div)`
  background-color: #112240;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #1A2D4F;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  color: #64FFDA;
  margin-bottom: 1.5rem;
`;

const BenefitTitle = styled.h3`
  font-family: 'Sora', sans-serif;
  font-size: 1.4rem;
  color: #FFF;
  margin-bottom: 0.75rem;
`;

const BenefitText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #8892B0;
`;

// Animação dos cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BenefitsSection: React.FC = () => {
  return (
    <SectionContainer id="beneficios">
      <Title>Benefícios que Transformam Vidas.</Title>
      <BenefitsGrid
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <BenefitCard variants={cardVariants}>
          <BenefitIcon><FiCheckCircle /></BenefitIcon>
          <BenefitTitle>Detecção Precoce</BenefitTitle>
          <BenefitText>Identifique sinais de risco antes que os sintomas sejam visíveis, permitindo intervenções mais eficazes.</BenefitText>
        </BenefitCard>
        <BenefitCard variants={cardVariants}>
          <BenefitIcon><FiShield /></BenefitIcon>
          <BenefitTitle>Não Invasivo e Seguro</BenefitTitle>
          <BenefitText>Análise de voz rápida e simples, sem procedimentos invasivos, garantindo conforto e segurança.</BenefitText>
        </BenefitCard>
        <BenefitCard variants={cardVariants}>
          <BenefitIcon><FiHeart /></BenefitIcon>
          <BenefitTitle>Qualidade de Vida</BenefitTitle>
          <BenefitText>Ao agir precocemente, ajudamos a preservar a autonomia e a melhorar a qualidade de vida dos pacientes.</BenefitText>
        </BenefitCard>
        <BenefitCard variants={cardVariants}>
          <BenefitIcon><FiAward /></BenefitIcon>
          <BenefitTitle>Baseado em Evidências</BenefitTitle>
          <BenefitText>Nossa tecnologia é fundamentada em pesquisa acadêmica rigorosa e validação científica contínua.</BenefitText>
        </BenefitCard>
      </BenefitsGrid>
    </SectionContainer>
  );
};

export default BenefitsSection;