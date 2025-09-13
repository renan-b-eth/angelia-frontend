// angelia-frontend/components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const Nav = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #0A192F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0 10px 30px -10px rgba(2,12,27,0.7);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    display: none; /* Esconde links em telas pequenas, você pode adicionar um menu hambúrguer */
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #CCD6F6;
  transition: color 0.3s;

  &:hover {
    color: #64FFDA;
  }
`;

const Header: React.FC = () => {
  return (
    <Nav>
      <LogoContainer>
        <Link href="/" passHref>
          <Image src="/images/logo.png" alt="angel.ia Logo" width={50} height={50} />
        </Link>
      </LogoContainer>
      <NavLinks>
        <Link href="/" passHref legacyBehavior><NavItem>Home</NavItem></Link>
        <Link href="/#problema" passHref legacyBehavior><NavItem>O Problema</NavItem></Link>
        <Link href="/#solucao" passHref legacyBehavior><NavItem>A Solução</NavItem></Link>
        <Link href="/#beneficios" passHref legacyBehavior><NavItem>Benefícios</NavItem></Link>
        <Link href="/#como-funciona" passHref legacyBehavior><NavItem>Como Funciona</NavItem></Link>
        <Link href="/#time" passHref legacyBehavior><NavItem>Time</NavItem></Link>
        <Link href="/#faq" passHref legacyBehavior><NavItem>FAQ</NavItem></Link>
        <Link href="/#contato" passHref legacyBehavior><NavItem>Contato</NavItem></Link>
        <Link href="/ferramenta" passHref legacyBehavior><NavItem>Ferramenta</NavItem></Link>
        {/* Para o admin, podemos adicionar um link para acesso rápido, mas em produção, seria mais escondido */}
        <Link href="/admin/upload" passHref legacyBehavior><NavItem style={{ color: '#E84D4D' }}>Admin</NavItem></Link>
      </NavLinks>
    </Nav>
  );
};

export default Header;