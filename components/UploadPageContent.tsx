// angelia-frontend/components/UploadPageContent.tsx (versão para enviar audio direto)
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiCheckCircle, FiAlertCircle, FiMic, FiPause, FiSquare } from 'react-icons/fi';
import { useReactMediaRecorder } from 'react-media-recorder';

// ... (Cole todos os seus Styled Components aqui, eles não mudam)

const UploadPageContent: React.FC = () => {
  const [formData, setFormData] = useState({ diagnosis: 'saudavel', age: '', gender: 'outro' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const { status: mediaRecorderStatus, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({ audio: true });
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mediaBlobUrl) {
      setStatus('error');
      setMessage('Por favor, grave o áudio antes de enviar.');
      return;
    }
    setStatus('loading');
    setMessage('Enviando áudio...');

    try {
      const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());
      const audioFile = new File([audioBlob], `recorded_audio_${Date.now()}.webm`, { type: "audio/webm" }); // Envia como webm

      const data = new FormData();
      data.append('audio_file', audioFile);
      data.append('diagnosis', formData.diagnosis);
      data.append('age', formData.age);
      data.append('gender', formData.gender);

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${BACKEND_URL}/add-to-dataset/`, { method: 'POST', body: data });
      const result = await response.json();

      if (!response.ok) throw new Error(result.detail || 'Erro no servidor.');
      
      setStatus('success');
      setMessage(`Sucesso! Áudio ${result.audio_filename} adicionado.`);
      clearBlobUrl();
      if (audioRef.current) audioRef.current.load();
    } catch (error: unknown) {
      setStatus('error');
      if (error instanceof Error) setMessage(error.message);
      else setMessage('Ocorreu um erro desconhecido.');
    }
  };
  
  // ... (O resto do seu JSX do return permanece o mesmo)
};

export default UploadPageContent;