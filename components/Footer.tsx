// angelia-frontend/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'; // Exemplo de ícones

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem;
  background-color: #0A192F;
  color: #8892B0;
  text-align: center;
  border-top: 1px solid #112240;
`;

const SocialLinks = styled.div`
  margin-bottom: 1rem;
  a {
    color: #CCD6F6;
    font-size: 1.5rem;
    margin: 0 0.8rem;
    transition: color 0.3s;
    &:hover {
      color: #64FFDA;
    }
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <a href="https://twitter.com/sua_angelia" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
        <a href="https://linkedin.com/company/angelia" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
        <a href="https://github.com/angelia" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
      </SocialLinks>
      <Copyright>&copy; {new Date().getFullYear()} angel.ia. Todos os direitos reservados.</Copyright>
    </FooterContainer>
  );
};

export default Footer;