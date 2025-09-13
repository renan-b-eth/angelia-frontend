// angelia-frontend/components/DynamicRecorderPage.tsx
import React, { useState, useRef, useEffect } from 'react'; // Adicionado useEffect
import styled from 'styled-components';
import { FiMic, FiPause, FiSquare } from 'react-icons/fi';
import { useReactMediaRecorder } from 'react-media-recorder';

// --- Styled Components ---
const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #112240;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const RecordingControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const RecordingButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? '#E84D4D' : '#64FFDA'};
  color: ${props => props.active ? '#FFF' : '#0A192F'};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

const AudioPreview = styled.audio`
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 4px;
  outline: none;
  background-color: #0A192F; /* Fundo para o player */
  &::-webkit-media-controls-panel {
    background-color: #0A192F;
    color: #CCD6F6;
  }
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    color: #CCD6F6;
  }
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-mute-button {
    color: #64FFDA;
  }
`;

const StatusMessage = styled.p`
  margin-top: 0.5rem;
  color: #64FFDA;
  font-size: 0.9rem;
`;

interface DynamicRecorderPageProps extends Record<string, never> {} // Corrigido para não ser uma interface vazia literal

const DynamicRecorderPage: React.FC<DynamicRecorderPageProps> = () => {
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
    // Removidos onStart, onStop, onPause, onResume aqui
  });

  const [displayStatusMessage, setDisplayStatusMessage] = useState<string>('Ocioso');

  useEffect(() => {
    switch (mediaRecorderStatus) {
      case 'idle':
        setDisplayStatusMessage('Ocioso');
        break;
      case 'recording':
        setDisplayStatusMessage('Gravando...');
        break;
      case 'paused':
        setDisplayStatusMessage('Gravação pausada.');
        break;
      case 'stopped':
        setDisplayStatusMessage('Gravação parada.');
        break;
      default:
        setDisplayStatusMessage('Status desconhecido.');
    }
  }, [mediaRecorderStatus]); // Atualiza a mensagem quando o status do gravador muda

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClearRecording = () => {
    clearBlobUrl();
    if (audioRef.current) {
      audioRef.current.load();
    }
    // setDisplayStatusMessage('Ocioso'); // O useEffect vai lidar com isso quando clearBlobUrl mudar o status para 'idle'
  };

  return (
    <RecorderContainer>
      <RecordingControls>
        <RecordingButton
          type="button"
          onClick={startRecording}
          disabled={mediaRecorderStatus === "recording" || mediaRecorderStatus === "paused"}
          active={mediaRecorderStatus === "recording"}
          title="Iniciar Gravação"
        >
          <FiMic size={24} />
        </RecordingButton>
        <RecordingButton
          type="button"
          onClick={stopRecording}
          disabled={mediaRecorderStatus === "idle" || mediaRecorderStatus === "stopped"}
          title="Parar Gravação"
        >
          <FiSquare size={24} />
        </RecordingButton>
        {mediaRecorderStatus === "recording" && (
            <RecordingButton
              type="button"
              onClick={pauseRecording}
              title="Pausar Gravação"
            >
              <FiPause size={24} />
            </RecordingButton>
        )}
        {mediaRecorderStatus === "paused" && (
            <RecordingButton
              type="button"
              onClick={resumeRecording}
              title="Continuar Gravação"
            >
              <FiMic size={24} />
            </RecordingButton>
        )}
      </RecordingControls>
      <StatusMessage>Status: {displayStatusMessage}</StatusMessage>
      {mediaBlobUrl && (
        <>
          <AudioPreview controls src={mediaBlobUrl} ref={audioRef} />
          <button onClick={handleClearRecording} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', marginTop: '1rem', fontSize: '0.9rem' }}>
              Limpar Gravação
          </button>
        </>
      )}
    </RecorderContainer>
  );
};

export default DynamicRecorderPage;