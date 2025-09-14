// angelia-frontend/components/FerramentaPageContent.tsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiCheckCircle, FiAlertCircle, FiMic, FiPause, FiSquare } from 'react-icons/fi';
import { useReactMediaRecorder } from 'react-media-recorder';

// --- Styled Components ---
const PageContainer = styled.div`
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;
  background-color: #0A192F; color: #CCD6F6; padding: 4rem 2rem; padding-top: 120px;
`;
const ToolCard = styled.div`
  width: 100%; max-width: 600px; background-color: #112240; border-radius: 8px;
  padding: 3rem; text-align: center; box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7);
`;
const Title = styled.h1`
  font-family: 'Sora', sans-serif; font-size: 2rem; color: #FFF; margin-bottom: 2rem;
`;
const Form = styled.form`
  display: flex; flex-direction: column; gap: 1.5rem; text-align: left;
`;
const FormGroup = styled.div`
  display: flex; flex-direction: column;
`;
const Label = styled.label`
  font-family: 'Inter', sans-serif; font-size: 1rem; color: #CCD6F6; margin-bottom: 0.5rem;
`;
const Input = styled.input`
  padding: 0.8rem 1rem; border: 1px solid #1A2D4F; border-radius: 4px;
  background-color: #0A192F; color: #CCD6F6; font-size: 1rem;
  &:focus { outline: none; border-color: #64FFDA; box-shadow: 0 0 0 1px #64FFDA; }
`;
const RecordingControls = styled.div`
  display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;
`;
const RecordingButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? '#E84D4D' : '#64FFDA'};
  color: ${props => props.active ? '#FFF' : '#0A192F'};
  border: none; border-radius: 50%; width: 60px; height: 60px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s;
  &:disabled { background-color: #555; cursor: not-allowed; }
  &:hover:not(:disabled) { transform: scale(1.05); }
`;
const AudioPreview = styled.audio`
  width: 100%; margin-top: 1.5rem; border-radius: 4px; outline: none;
  &::-webkit-media-controls-panel { background-color: #0A192F; color: #CCD6F6; }
  &::-webkit-media-controls-current-time-display, &::-webkit-media-controls-time-remaining-display { color: #CCD6F6; }
  &::-webkit-media-controls-play-button, &::-webkit-media-controls-mute-button { color: #64FFDA; }
`;
const StatusMessage = styled.p`
  margin-top: 1rem; color: #64FFDA; font-size: 0.9rem; min-height: 1.5rem;
`;
const SubmitButton = styled.button`
  background-color: #64FFDA; color: #0A192F; font-family: 'Sora', sans-serif;
  font-size: 1.1rem; font-weight: bold; padding: 1rem 1.5rem; border: none;
  border-radius: 4px; cursor: pointer; transition: all 0.3s;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 2rem;
  &:disabled { background-color: #555; cursor: not-allowed; }
`;
const Message = styled.div<{ type: 'success' | 'error' }>`
  margin-top: 1.5rem; padding: 1rem; border-radius: 4px;
  background-color: ${props => props.type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(232, 77, 77, 0.1)'};
  color: ${props => props.type === 'success' ? '#64FFDA' : '#E84D4D'};
  display: flex; align-items: center; gap: 0.5rem;
`;
const Separator = styled.div`
  display: flex; align-items: center; text-align: center; color: #8892B0; margin: 1.5rem 0;
  &::before, &::after { content: ''; flex: 1; border-bottom: 1px solid #1A2D4F; }
  &:not(:empty)::before { margin-right: .25em; }
  &:not(:empty)::after { margin-left: .25em; }
`;
const ResultCard = styled.div`
  background-color: #0A192F; border: 1px solid #1A2D4F; border-radius: 8px;
  padding: 1.5rem; margin-top: 2rem; text-align: left;
  h2 { color: #64FFDA; font-family: 'Sora', sans-serif; font-size: 1.2rem; margin-bottom: 1rem; }
  p { font-size: 1.1rem; color: #CCD6F6; font-weight: bold; }
`;

// --- FerramentaPageContent Component ---
interface AnalysisResult {
  riskLevel: string;
  confidence: number;
  recommendation: string;
  // Adicione outras propriedades que seu backend pode retornar
}

const FerramentaPageContent: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null); // Tipagem corrigida

  const {
    status: mediaRecorderStatus,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({
    audio: true,
    mediaRecorderOptions: {
      mimeType: "audio/webm"
    }
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      clearBlobUrl();
      if (audioRef.current) audioRef.current.load();
      setAnalysisResult(null);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleAnalyze = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Analisando áudio...');
    setAnalysisResult(null);

    let audioFile: File | null = null;
    if (mediaBlobUrl) {
      const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());
      audioFile = new File([audioBlob], `analysis_audio_${Date.now()}.webm`, {
        type: "audio/webm",
      });
    } else if (uploadedFile) {
      audioFile = uploadedFile;
    }

    if (!audioFile) {
      setStatus('error');
      setMessage('Por favor, grave ou selecione um arquivo de áudio.');
      return;
    }

    try {
      const data = new FormData();
      data.append('audio_file', audioFile);

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${BACKEND_URL}/analyze/`, {
        method: 'POST',
        body: data,
      });

      const result: AnalysisResult = await response.json(); // Tipagem corrigida

      if (!response.ok) {
        throw new Error(result.recommendation || 'Ocorreu um erro na análise.'); // Usando 'recommendation' como exemplo de mensagem de erro
      }

      setStatus('success');
      setMessage('Análise concluída!');
      setAnalysisResult(result);

      clearBlobUrl();
      setUploadedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (audioRef.current) audioRef.current.load();

    } catch (error: unknown) { // Use unknown para capturar erros e refinar o tipo
      setStatus('error');
      if (error instanceof Error) {
        setMessage(error.message);
        console.error("Erro ao analisar áudio:", error);
      } else {
        setMessage('Ocorreu um erro desconhecido na análise.');
        console.error("Erro desconhecido ao analisar áudio:", error);
      }
    }
  };

  const handleClearRecording = () => {
    clearBlobUrl();
    if (audioRef.current) audioRef.current.load();
    setStatus('idle');
    setMessage('');
    setAnalysisResult(null);
  };

  const handleClearUpload = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setStatus('idle');
    setMessage('');
    setAnalysisResult(null);
  };

  return (
    <PageContainer>
      <ToolCard>
        <Title>Analisar Áudio</Title>
        <Form onSubmit={handleAnalyze}>
          <FormGroup>
            <Label>Gravar Áudio</Label>
            <RecordingControls>
              <RecordingButton type="button" onClick={() => { startRecording(); setUploadedFile(null); setAnalysisResult(null); }} disabled={mediaRecorderStatus === "recording" || mediaRecorderStatus === "paused"} active={mediaRecorderStatus === "recording"} title="Iniciar Gravação">
                <FiMic size={24} />
              </RecordingButton>
              <RecordingButton type="button" onClick={stopRecording} disabled={mediaRecorderStatus === "idle" || mediaRecorderStatus === "stopped"} title="Parar Gravação">
                <FiSquare size={24} />
              </RecordingButton>
              {mediaRecorderStatus === "recording" && ( <RecordingButton type="button" onClick={pauseRecording} title="Pausar Gravação"> <FiPause size={24} /> </RecordingButton> )}
              {mediaRecorderStatus === "paused" && ( <RecordingButton type="button" onClick={resumeRecording} title="Continuar Gravação"> <FiMic size={24} /> </RecordingButton> )}
            </RecordingControls>
            <StatusMessage>Status Gravação: {mediaRecorderStatus}</StatusMessage>
            {mediaBlobUrl && (
              <>
                <AudioPreview controls src={mediaBlobUrl} ref={audioRef} />
                <button onClick={handleClearRecording} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Limpar Gravação
                </button>
              </>
            )}
          </FormGroup>

          <Separator>OU</Separator>

          <FormGroup>
            <Label htmlFor="audioFile">Carregar Arquivo de Áudio (.wav, .mp3, .webm)</Label>
            <Input type="file" id="audioFile" name="audioFile" accept="audio/*" onChange={handleFileChange} ref={fileInputRef} />
            {uploadedFile && (
              <>
                <StatusMessage>Arquivo carregado: {uploadedFile.name}</StatusMessage>
                <button onClick={handleClearUpload} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Limpar Carregamento
                </button>
              </>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={status === 'loading' || (!mediaBlobUrl && !uploadedFile)}>
            {status === 'loading' ? 'Analisando...' : 'Analisar Áudio'}
          </SubmitButton>

          {status === 'success' && <Message type="success"><FiCheckCircle /> {message}</Message>}
          {status === 'error' && <Message type="error"><FiAlertCircle /> {message}</Message>}

          {analysisResult && (
            <ResultCard>
              <h2>Resultado da Análise:</h2>
              <p><strong>Nível de Risco:</strong> {analysisResult.riskLevel}</p>
              <p><strong>Confiança:</strong> {(analysisResult.confidence * 100).toFixed(2)}%</p>
              <p><strong>Recomendação:</strong> {analysisResult.recommendation}</p>
            </ResultCard>
          )}
        </Form>
      </ToolCard>
    </PageContainer>
  );
};

export default FerramentaPageContent;