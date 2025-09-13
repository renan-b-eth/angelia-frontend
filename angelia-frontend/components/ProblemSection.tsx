import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image'; // Importar o componente Image do Next.js

// --- Estilização ---
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0B1A30; // Um tom ligeiramente diferente para contraste
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #CCD6F6;
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
`;

const Card = styled(motion.div)`
  background-color: #112240;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #1A2D4F;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  color: #64FFDA; // Cor de destaque
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #FFF;
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #8892B0;
`;

// --- Animações ---
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Anima os cards um após o outro
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};


const ProblemSection: React.FC = () => {
  return (
    <SectionContainer>
        <Image 
                  src="/images/logo_redonda.png" // Caminho para a sua logo
                  alt="angel.ia Logo"
                  width={500} // Largura da imagem da logo em pixels
                  height={500} // Altura da imagem da logo em pixels
                  priority // Prioriza o carregamento desta imagem
                />
      <Title>Diagnósticos tardios mudam vidas.<br/>E se pudéssemos agir antes?</Title>
      <GridContainer
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // A animação começa quando 20% da seção estiver visível
      >
        <Card variants={cardVariants}>
          <CardIcon>{/* [Ícone de Calendário] */ '🗓️'}</CardIcon>
          <CardTitle>Janela Perdida</CardTitle>
          <CardText>Muitas doenças neurodegenerativas só são diagnosticadas quando os sintomas motores são evidentes. Meses ou anos preciosos para o tratamento são perdidos.</CardText>
        </Card>

        <Card variants={cardVariants}>
          <CardIcon>{/* [Ícone de Seringa com X] */ '💉'}</CardIcon>
          <CardTitle>Métodos Invasivos</CardTitle>
          <CardText>Exames atuais podem ser caros, invasivos e demorados, criando uma barreira para a detecção precoce em massa.</CardText>
        </Card>

        <Card variants={cardVariants}>
          <CardIcon>{/* [Ícone de Interrogação] */ '❓'}</CardIcon>
          <CardTitle>A Incerteza</CardTitle>
          <CardText>A jornada até um diagnóstico preciso é longa e cheia de ansiedade para pacientes e suas famílias.</CardText>
        </Card>

      </GridContainer>
    </SectionContainer>
  );
};

export default ProblemSection;