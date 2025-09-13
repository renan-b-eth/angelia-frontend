import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: #0A192F;
  text-align: center;
  border-top: 1px solid #1A2D4F;
`;

const CopyrightText = styled.p`
  color: #8892B0;
  font-size: 0.9rem;

  a {
    color: #64FFDA;
    text-decoration: none;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <CopyrightText>
        © {new Date().getFullYear()} Vocalix. Todos os direitos reservados. Este é um projeto acadêmico.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;