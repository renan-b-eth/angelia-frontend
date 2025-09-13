// components/ContactSection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0B1A30;
`;

const Title = styled.h2`
  font-family: 'Sora', sans-serif;
  font-size: 2.5rem;
  color: #CCD6F6;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #8892B0;
  text-align: center;
  max-width: 600px;
  margin-bottom: 3rem;
`;

const ContactForm = styled(motion.form)`
  background-color: #112240;
  padding: 3rem;
  border-radius: 8px;
  border: 1px solid #1A2D4F;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #CCD6F6;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #1A2D4F;
  border-radius: 4px;
  background-color: #0A192F;
  color: #CCD6F6;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #64FFDA;
    box-shadow: 0 0 0 1px #64FFDA;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid #1A2D4F;
  border-radius: 4px;
  background-color: #0A192F;
  color: #CCD6F6;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #64FFDA;
    box-shadow: 0 0 0 1px #64FFDA;
  }
`;

const SubmitButton = styled.button`
  background-color: #64FFDA;
  color: #0A192F;
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #4CAF9D;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Em um projeto real, você enviaria esses dados para um serviço de backend
    // ou uma API de formulário (ex: Formspree, Netlify Forms, etc.)
    console.log("Dados do formulário:", formData);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula envio
    alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <SectionContainer id="contato">
      <Title>Entre em Contato.</Title>
      <Subtitle>Tem perguntas, sugestões ou interesse em parceria? Adoraríamos ouvir você.</Subtitle>
      <ContactForm
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Mensagem</Label>
          <TextArea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </FormGroup>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </SubmitButton>
      </ContactForm>
    </SectionContainer>
  );
};

export default ContactSection;