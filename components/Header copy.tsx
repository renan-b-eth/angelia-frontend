// components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'; // Importar o componente Image do Next.js

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem; // Ajuste para telas menores
  }
`;

// O ESTILO PARA O LINK DA LOGO
const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Espaço entre a imagem e o texto, se houver */
  text-decoration: none;
  cursor: pointer;
`;

// Estilo para o texto "Angel.ia" que acompanhará a imagem
const LogoText = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 1.8rem; /* Ajustado para um pouco maior */
  font-weight: bold;
  color: #64FFDA; /* Cor do texto "Angel.ia" */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav`
  a {
    margin-left: 1.5rem;
    color: #CCD6F6;
    transition: color 0.3s;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    &:hover { color: #64FFDA; }

    @media (max-width: 768px) {
      margin-left: 1rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    display: none; /* Esconde a navegação principal em telas menores, você pode adicionar um menu hambúrguer se quiser */
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoLink href="/">
        {/* Usando o componente Image do Next.js para otimização */}
        {/* Ajuste width e height conforme o tamanho desejado para a logo no header */}
        <Image 
          src="/images/logo.png" // Caminho para a sua logo
          alt="angel.ia Logo"
          width={40} // Largura da imagem da logo em pixels
          height={40} // Altura da imagem da logo em pixels
          priority // Prioriza o carregamento desta imagem
        />
        <LogoText>Angel.ia</LogoText>
      </LogoLink>

      <Nav>
        <Link href="/#problema">O Problema</Link>
        <Link href="/#solucao">A Solução</Link>
        <Link href="/#beneficios">Benefícios</Link>
        <Link href="/#equipe">Equipe</Link>
        <Link href="/#como-funciona">Como Funciona</Link>
        <Link href="/#perguntas">FAQ</Link>
        <Link href="/#contato">Contato</Link>
        <Link href="/ferramenta">Ferramenta IA</Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;