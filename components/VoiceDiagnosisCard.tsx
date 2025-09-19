// angelia-frontend/components/VoiceDiagnosisCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMic, FiPause, FiSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useReactMediaRecorder } from 'react-media-recorder';

// --- Styled Components (reutilizados ou adaptados) ---
const DiagnoseCard = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #112240;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7);
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 2rem;
  color: #FFF;
  margin-bottom: 2rem;
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

const StatusMessage = styled.p`
  margin-top: 1rem;
  color: #64FFDA;
  font-size: 0.9rem;
  min-height: 1.5rem;
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

const DiagnosisResult = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: #0A192F;
  border-radius: 8px;
  text-align: left;
  border: 1px solid #1A2D4F;
`;

const ResultTitle = styled.h3`
  color: #64FFDA;
  font-family: 'Sora', sans-serif;
  margin-bottom: 1rem;
`;

const ResultItem = styled.p`
  color: #CCD6F6;
  margin-bottom: 0.5rem;
  & strong {
    color: #FFF;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const VoiceDiagnosisCard: React.FC = () => {
  // --- Estados para a gravação de Áudio ---
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

  // --- Estados para o Diagnóstico por Voz ---
  const [diagnoseStatus, setDiagnoseStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [diagnoseMessage, setDiagnoseMessage] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<{ predicted_diagnosis: string; probabilities: { [key: string]: string } } | null>(null);

  // Efeito para limpar mensagens após um tempo
  useEffect(() => {
    if (diagnoseStatus === 'success' || diagnoseStatus === 'error') {
      const timer = setTimeout(() => {
        setDiagnoseStatus('idle');
        setDiagnoseMessage('');
        setDiagnosisResult(null); // Limpa o resultado também
      }, 8000); // Um pouco mais para o resultado do diagnóstico
      return () => clearTimeout(timer);
    }
  }, [diagnoseStatus]);


  const handleClearRecording = () => {
    clearBlobUrl();
    if (audioRef.current) {
      audioRef.current.load();
    }
    setDiagnoseStatus('idle');
    setDiagnoseMessage('');
    setDiagnosisResult(null);
  };

  // Enviar para Diagnóstico
  const handleDiagnoseVoice = async () => {
    if (!mediaBlobUrl) {
      setDiagnoseStatus('error');
      setDiagnoseMessage('Por favor, grave o áudio antes de tentar diagnosticar.');
      return;
    }
    setDiagnoseStatus('loading');
    setDiagnoseMessage('Analisando sua voz para diagnóstico...');
    setDiagnosisResult(null); // Limpa resultados anteriores

    try {
      const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());
      const audioFile = new File([audioBlob], `recorded_diagnosis_${Date.now()}.wav`, {
        type: "audio/wav",
      });

      const data = new FormData();
      data.append('audio_file', audioFile);
      
      const response = await fetch(`${BACKEND_URL}/diagnose-voice/`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Ocorreu um erro no servidor ao diagnosticar.');
      }

      setDiagnoseStatus('success');
      setDiagnoseMessage(result.message || `Diagnóstico concluído.`);
      setDiagnosisResult(result);
    
    } catch (error: any) {
      setDiagnoseStatus('error');
      setDiagnoseMessage(error.message || 'Ocorreu um erro desconhecido ao diagnosticar.');
      console.error("Erro ao diagnosticar voz:", error);
    }
  };


  return (
    <DiagnoseCard>
      <Title>Diagnóstico por Voz</Title>
      <p style={{marginBottom: '1.5rem', color: '#8892B0'}}>
        Grave sua voz (preferencialmente uma vogal sustentada, ex: "Aaaaaa", por alguns segundos) 
        para que o modelo de Machine Learning tente identificar um diagnóstico.
      </p>
      
      <FormGroup>
        <StatusMessage>Status de Gravação: {mediaRecorderStatus}</StatusMessage>
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
        
        {mediaBlobUrl && (
          <>
            <AudioPreview controls src={mediaBlobUrl} ref={audioRef} />
            <button onClick={handleClearRecording} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', marginTop: '1rem', fontSize: '0.9rem' }}>
                Limpar Gravação
            </button>
          </>
        )}
      </FormGroup>

      <SubmitButton type="button" onClick={handleDiagnoseVoice} disabled={diagnoseStatus === 'loading' || !mediaBlobUrl}>
        {diagnoseStatus === 'loading' ? 'Diagnosticando...' : 'Obter Diagnóstico por Voz'}
      </SubmitButton>

      {diagnoseStatus === 'success' && <Message type="success"><FiCheckCircle /> {diagnoseMessage}</Message>}
      {diagnoseStatus === 'error' && <Message type="error"><FiAlertCircle /> {diagnoseMessage}</Message>}

      {diagnosisResult && diagnoseStatus === 'success' && (
        <DiagnosisResult>
          <ResultTitle>Resultado do Diagnóstico:</ResultTitle>
          <ResultItem>Diagnóstico Predito: <strong>{diagnosisResult.predicted_diagnosis}</strong></ResultItem>
          <ResultTitle style={{marginTop: '1.5rem'}}>Probabilidades:</ResultTitle>
          {Object.entries(diagnosisResult.probabilities).map(([diag, prob]) => (
            <ResultItem key={diag}>{diag}: <strong>{(parseFloat(prob) * 100).toFixed(2)}%</strong></ResultItem>
          ))}
          <p style={{fontSize: '0.85rem', color: '#8892B0', marginTop: '1.5rem'}}>
            **Este é um resultado de modelo de Machine Learning e não substitui o diagnóstico médico profissional.**
          </p>
        </DiagnosisResult>
      )}
    </DiagnoseCard>
  );
};

export default VoiceDiagnosisCard;