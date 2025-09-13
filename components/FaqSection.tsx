// components/FaqSection.tsx
import React from 'react';
import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import { FiChevronDown } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 100px 2rem;
  background-color: #0B1A30;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
`;
const AccordionRoot = styled(Accordion.Root)`
  width: 100%;
  max-width: 750px;
  border-radius: 6px;
  background-color: #112240;
`;
const AccordionItem = styled(Accordion.Item)`
  border-bottom: 1px solid #1A2D4F;
  &:last-child { border-bottom: none; }
`;
const AccordionTrigger = styled(Accordion.Trigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  font-size: 1.2rem;
  font-family: 'Sora', sans-serif;
  color: #CCD6F6;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    transition: transform 0.3s ease;
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`;
const AccordionContent = styled(Accordion.Content)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #8892B0;
  line-height: 1.6;
`;

const faqData = [
  { q: "A análise é precisa?", a: "Nossa IA é treinada com um vasto banco de dados clínicos e está em constante aprimoramento. Ela serve como uma ferramenta de triagem preliminar para auxiliar profissionais de saúde." },
  { q: "Meus dados de voz estão seguros?", a: "Sim. A segurança e a privacidade são nossas maiores prioridades. Todos os dados são anonimizados e criptografados, seguindo as mais rigorosas normas de proteção de dados." },
  { q: "Isso substitui um médico?", a: "Absolutamente não. angel.ia é uma ferramenta de suporte ao diagnóstico, projetada para fornecer insights precoces a médicos e especialistas, que são os únicos capazes de fornecer um diagnóstico definitivo." }
];

const FaqSection: React.FC = () => (
  <SectionContainer>
    <Title>Perguntas Frequentes</Title>
    <AccordionRoot type="single" collapsible>
      {faqData.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <Accordion.Header>
            <AccordionTrigger>
              {item.q}
              <FiChevronDown size={24} />
            </AccordionTrigger>
          </Accordion.Header>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  </SectionContainer>
);

export default FaqSection;