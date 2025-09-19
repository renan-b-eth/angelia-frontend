// angelia-frontend/components/Navbar.tsx (EXEMPLO - adapte à sua Navbar real)
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'; // Importe Link do Next.js

const Nav = styled.nav`
  background-color: #0A192F;
  color: #FFF;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
`;

const Logo = styled.a`
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #64FFDA;
  text-decoration: none;
  &:hover {
    color: #FFF;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: #CCD6F6;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: color 0.3s;
  &:hover {
    color: #64FFDA;
  }
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <Link href="/" passHref legacyBehavior>
        <Logo>Angelia AI</Logo>
      </Link>
      <NavLinks>
        <Link href="/" passHref legacyBehavior>
          <NavLink>Home</NavLink>
        </Link>
        {/* NOVO LINK AQUI */}
        <Link href="/diagnostico" passHref legacyBehavior>
          <NavLink>Diagnóstico por Voz</NavLink>
        </Link>
        {/* Se você ainda tem a página de upload para o dataset */}
        <Link href="/upload-data" passHref legacyBehavior>
          <NavLink>Alimentar Dataset</NavLink>
        </Link>
        {/* Outros links... */}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;