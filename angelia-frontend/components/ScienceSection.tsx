import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled(motion.section)`
  padding: 100px 2rem;
  background-color: #0B1A30;
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
  margin-bottom: 2.5rem;
`;

const Button = styled.a`
  font-size: 1rem;
  color: #64FFDA;
  background-color: transparent;
  border: 1px solid #64FFDA;
  border-radius: 4px;
  padding: 1rem 2rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
  }
`;

const ScienceSection: React.FC = () => {
  return (
    <SectionContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <ContentWrapper>
        <Title>Nascido da Academia. Validado pela Ciência.</Title>
        <Paragraph>
          Vocalix não é mágica, é ciência. Nossa tecnologia é fruto de anos de pesquisa acadêmica em fonoaudiologia, inteligência artificial e neurologia. Estamos comprometidos com a validação clínica rigorosa e a publicação de nossos resultados.
        </Paragraph>
        <Button href="/whitepaper.pdf" target="_blank">
          Leia nosso Whitepaper
        </Button>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default ScienceSection;