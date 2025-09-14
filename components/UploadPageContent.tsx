// angelia-frontend/components/UploadPageContent.tsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiCheckCircle, FiAlertCircle, FiMic, FiPause, FiSquare, FiSend, FiXCircle } from 'react-icons/fi';
import { useReactMediaRecorder } from 'react-media-recorder';

// --- Styled Components ---
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0A192F;
  color: #CCD6F6;
  padding: 4rem 2rem;
  padding-top: 120px;
`;

const UploadCard = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #112240;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7);
`;

const Title = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 2rem;
  color: #FFF;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
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

const Select = styled.select`
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

const RecordingControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const RecordingButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? '#E84D4D' : '#64FFDA'};
  color: ${props => props.active ? '#FFF' : '#0A192F'};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  &:disabled { background-color: #555; cursor: not-allowed; }
  &:hover:not(:disabled) { transform: scale(1.05); }
`;

const AudioPreview = styled.audio`
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 4px;
  outline: none;
  &::-webkit-media-controls-panel { background-color: #0A192F; color: #CCD6F6; }
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display { color: #CCD6F6; }
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-mute-button { color: #64FFDA; }
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  color: #64FFDA;
  font-size: 0.9rem;
  min-height: 1.5rem;
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
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  &:disabled { background-color: #555; cursor: not-allowed; }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  background-color: ${props => props.type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(232, 77, 77, 0.1)'};
  color: ${props => props.type === 'success' ? '#64FFDA' : '#E84D4D'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UploadPageContent: React.FC = () => {
  const [formData, setFormData] = useState({ diagnosis: 'saudavel', age: '', gender: 'outro' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    status: mediaRecorderStatus,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    mediaRecorderOptions: {
      mimeType: "audio/webm",
    },
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mediaBlobUrl) {
      setStatus('error');
      setMessage('Por favor, grave o áudio antes de enviar.');
      return;
    }
    setStatus('loading');
    setMessage('Enviando para o dataset...');

    try {
      const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());
      const audioFile = new File([audioBlob], `recorded_audio_${Date.now()}.webm`, {
        type: "audio/webm",
      });

      const data = new FormData();
      data.append('audio_file', audioFile);
      data.append('diagnosis', formData.diagnosis);
      data.append('age', formData.age);
      data.append('gender', formData.gender);
      
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${BACKEND_URL}/add-to-dataset/`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Ocorreu um erro no servidor.');
      }

      setStatus('success');
      setMessage(`Sucesso! Áudio ${result.audio_filename} adicionado.`);
      
      setFormData({ diagnosis: 'saudavel', age: '', gender: 'outro' }); // Reset form data
      clearBlobUrl();
      if (audioRef.current) audioRef.current.load(); // Reload audio element to clear source
    
    } catch (error: unknown) {
      setStatus('error');
      if (error instanceof Error) {
        setMessage(error.message);
        console.error("Erro ao enviar áudio para o dataset:", error);
      } else {
        setMessage('Ocorreu um erro desconhecido.');
        console.error("Erro desconhecido ao enviar áudio para o dataset:", error);
      }
    }
  };

  const handleClearRecording = () => {
    clearBlobUrl();
    if (audioRef.current) {
      audioRef.current.load();
    }
    setStatus('idle');
    setMessage('');
  };

  return (
    <PageContainer>
      <UploadCard>
        <Title>Alimentar Dataset (Gravação)</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="diagnosis">Diagnóstico (Rótulo)</Label>
            <Select id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required>
              <option value="saudavel">Saudável</option>
              <option value="parkinson">Parkinson</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="age">Idade</Label>
            <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gender">Gênero</Label>
            <Select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Gravar Áudio (30 segundos recomendado)</Label>
            <RecordingControls>
              <RecordingButton type="button" onClick={startRecording} disabled={mediaRecorderStatus === "recording" || mediaRecorderStatus === "paused"} active={mediaRecorderStatus === "recording"} title="Iniciar Gravação">
                <FiMic size={24} />
              </RecordingButton>
              <RecordingButton type="button" onClick={stopRecording} disabled={mediaRecorderStatus === "idle" || mediaRecorderStatus === "stopped"} title="Parar Gravação">
                <FiSquare size={24} />
              </RecordingButton>
              {mediaRecorderStatus === "recording" && ( <RecordingButton type="button" onClick={pauseRecording} title="Pausar Gravação"> <FiPause size={24} /> </RecordingButton> )}
              {mediaRecorderStatus === "paused" && ( <RecordingButton type="button" onClick={resumeRecording} title="Continuar Gravação"> <FiMic size={24} /> </RecordingButton> )}
            </RecordingControls>
            <StatusMessage>Status: {mediaRecorderStatus}</StatusMessage>
            {mediaBlobUrl && (
              <>
                <AudioPreview controls src={mediaBlobUrl} ref={audioRef} />
                <button onClick={handleClearRecording} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Limpar Gravação
                </button>
              </>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={status === 'loading' || !mediaBlobUrl}>
            {status === 'loading' ? 'Enviando...' : 'Enviar para o Dataset'}
          </SubmitButton>

          {status === 'success' && <Message type="success"><FiCheckCircle /> {message}</Message>}
          {status === 'error' && <Message type="error"><FiAlertCircle /> {message}</Message>}
        </Form>
      </UploadCard>
    </PageContainer>
  );
};

export default UploadPageContent;