// components/HowItWorksSection.tsx
import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Estilização (DEFINIÇÕES COMPLETAS!) ---
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0A192F;
`;

const Title = styled.h2`
  font-family: 'Sora', sans-serif; /* Usando a nova fonte de título */
  font-size: 2.5rem;
  color: #CCD6F6;
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const TimelineContainer = styled.div` /* Removido (motion.div) */
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

const StepCard = styled.div` /* Removido (motion.div) */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 30%;
  padding: 1rem; /* Adicionado padding para melhor visual */

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #112240;
  border: 2px solid #64FFDA;
  color: #64FFDA;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.h3`
  font-family: 'Sora', sans-serif; /* Usando a nova fonte de título */
  font-size: 1.5rem;
  color: #FFF;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-family: 'Inter', sans-serif; /* Usando a nova fonte de texto */
  font-size: 1rem;
  line-height: 1.6;
  color: #8892B0;
`;

// --- Componente principal ---
const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement para o ref do TimelineContainer

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Certifique-se de que timelineRef.current existe antes de tentar selecionar elementos
      if (timelineRef.current) {
        const cards = gsap.utils.toArray<HTMLDivElement>('.step-card', timelineRef.current);
        
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%', 
            end: 'bottom 80%',
            toggleActions: 'play none none none',
            // markers: true, // Descomente para ver os marcadores do ScrollTrigger durante o desenvolvimento
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert(); // Limpeza do efeito
  }, []);

  return (
    <SectionContainer ref={sectionRef} id="como-funciona"> {/* Adicionado ID para navegação */}
      <Title>Simples, rápido e inteligente.</Title>
      <TimelineContainer ref={timelineRef}>
        <StepCard className="step-card">
          <StepNumber>1</StepNumber>
          <StepTitle>Gravação</StepTitle>
          <StepDescription>O paciente grava uma pequena amostra de voz (30s) através da nossa plataforma segura.</StepDescription>
        </StepCard>
        <StepCard className="step-card">
          <StepNumber>2</StepNumber>
          <StepTitle>Análise IA</StepTitle>
          <StepDescription>Nosso algoritmo patenteado processa centenas de biomarcadores vocais em segundos.</StepDescription>
        </StepCard>
        <StepCard className="step-card">
          <StepNumber>3</StepNumber>
          <StepTitle>Relatório</StepTitle>
          <StepDescription>Um relatório preliminar de risco é gerado para o profissional de saúde avaliar.</StepDescription>
        </StepCard>
      </TimelineContainer>
    </SectionContainer>
  );
};

export default HowItWorksSection;