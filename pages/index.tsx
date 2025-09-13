// angelia-frontend/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

// Importe TODOS os componentes das seções aqui
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorksSection from '../components/HowItWorksSection';
// import ScienceSection from '../components/ScienceSection'; // Descomente quando criar
import TeamSection from '../components/TeamSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// Componentes da Hero Section (pode ser um componente separado se quiser)
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 4rem 2rem;
  background-color: #0A192F;
  color: #CCD6F6;
  padding-top: 80px; /* Ajuste para não ficar atrás do header fixo */
`;

const HeroLogoContainer = styled.div`
  margin-bottom: 1rem;
`;

const HeroSlogan = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  color: #8892B0;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PrimaryButton = styled.a`
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: #64FFDA;
  color: #0A192F;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4CAF9D;
    transform: translateY(-3px);
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Angel.ia - O Futuro do Diagnóstico está em sua Voz</title>
        <meta name="description" content="Angel.ia: Inteligência Artificial para detecção precoce de condições neurodegenerativas pela voz." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroContainer>
          <HeroLogoContainer>
            <Image
              src="/images/logo.png"
              alt="angel.ia Logo - O Futuro do Diagnóstico está em sua Voz"
              width={300}
              height={300}
              priority
            />
          </HeroLogoContainer>
          <HeroSlogan>The Future of Diagnosis Is In Your Voice</HeroSlogan>
          <Link href="/ferramenta" passHref legacyBehavior>
            <PrimaryButton>Experimente a Ferramenta</PrimaryButton>
          </Link>
        </HeroContainer>
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <HowItWorksSection />
        {/* <ScienceSection /> */} {/* Descomente quando criar */}
        <TeamSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default Home;