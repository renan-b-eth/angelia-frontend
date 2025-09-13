// components/TeamSection.tsx
import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image'; // Para otimizar as imagens dos membros da equipe
import { FiLinkedin, FiMail } from 'react-icons/fi'; // Ícones para contato


// Importe imagens (exemplo, você precisará ter essas imagens na pasta /public)
// Certifique-se de que os caminhos e nomes de arquivo correspondem
//import teamMember1 from '../public/images/team-member-1.jpg'; // Ex: Foto de um fundador
//import teamMember2 from '../public/images/team-member-2.jpg'; // Ex: Foto de outro membro
// ... adicione mais conforme necessário

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0A192F;
`;

const Title = styled.h2`
  font-family: 'Sora', sans-serif;
  font-size: 2.5rem;
  color: #CCD6F6;
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
`;

const MemberCard = styled(motion.div)`
  background-color: #112240;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #1A2D4F;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 3px solid #64FFDA;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MemberName = styled.h3`
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  color: #FFF;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #64FFDA;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #8892B0;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #CCD6F6;
    font-size: 1.5rem;
    transition: color 0.3s;
    &:hover { color: #64FFDA; }
  }
`;

// Animação dos cards
const memberCardVariants: Variants = { // <--- ADICIONE ': Variants' AQUI
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    } 
  },
};

const teamMembers = [
  {
    name: "Dr. Camilla",
    role: "Cardiologista no A.I & Cientista Chefe",
    bio: "Pioneira em bioacústica e IA na saúde, lidera a visão científica da angel.ia.",
    image: "/images/team-member-1.jpg", // Caminho no diretório public
    linkedin: "https://linkedin.com/in/anasilva",
    email: "dr.camilla@angel.ia",
  },
  {
    name: "Dr Henrique",
    role: "Pesquisador e Idealizador",
    bio: "Especialista em desenvolvimento de software e IA, arquiteto da nossa plataforma.",
    image: "/images/team-member-2.jpg", // Caminho no diretório public
    linkedin: "https://linkedin.com/in/carlosmendes",
    email: "dr.henrique@angel.ia",
  },
  // Adicione mais membros conforme necessário
];

const TeamSection: React.FC = () => {
  return (
    <SectionContainer id="equipe">
      <Title>Nossa Equipe. O Coração da Inovação.</Title>
      <TeamGrid
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {teamMembers.map((member, index) => (
          <MemberCard variants={memberCardVariants} key={index}>
            <MemberImageWrapper>
              <Image 
                src={member.image} 
                alt={member.name} 
                width={150} 
                height={150} 
                layout="responsive" // Ou "fill" com um container position:relative
              />
            </MemberImageWrapper>
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            <MemberBio>{member.bio}</MemberBio>
            <SocialLinks>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
              <a href={`mailto:${member.email}`}><FiMail /></a>
            </SocialLinks>
          </MemberCard>
        ))}
      </TeamGrid>
    </SectionContainer>
  );
};

export default TeamSection;