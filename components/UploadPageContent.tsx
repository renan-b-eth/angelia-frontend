// angelia-frontend/components/UploadPageContent.tsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMic, FiPause, FiSquare, FiSend, FiXCircle } from 'react-icons/fi'; // Adicionado FiSend e FiXCircle
import { useReactMediaRecorder } from 'react-media-recorder';

// --- Styled Components ---
const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #112240;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #CCD6F6;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #33445C;
  border-radius: 4px;
  background-color: #0A192F;
  color: #CCD6F6;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #64FFDA;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #33445C;
  border-radius: 4px;
  background-color: #0A192F;
  color: #CCD6F6;
  font-size: 1rem;
  appearance: none; /* Remove o estilo padrão do select */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23CCD6F6%22%20d%3D%22M287%20197.3L159.9%2069.1c-3-3-7.7-3-10.7%200l-127%20128.2c-3%203-3%207.7%200%2010.7l14.3%2014.3c3%203%207.7%203%2010.7%200L144.5%20118.8l118.7%20119.8c3%203%207.7%203%2010.7%200l14.3-14.3c3.1-3%203.1-7.7.1-10.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
`;

const RecordingControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

const ActionButton = styled(RecordingButton)<{ color?: string }>`
  background-color: ${props => props.color || '#64FFDA'};
  color: ${props => props.color === '#E84D4D' ? '#FFF' : '#0A192F'};
  border-radius: 4px;
  width: auto;
  min-width: 120px;
  height: 45px;
  padding: 0 1.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const AudioPreview = styled.audio`
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 4px;
  outline: none;
  background-color: #0A192F;
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
  margin-top: 1rem;
  color: #64FFDA;
  font-size: 0.9rem;
  text-align: center;
`;

const UploadPageContent: React.FC = () => {
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

  const [displayStatusMessage, setDisplayStatusMessage] = useState<string>('Ocioso');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>('unknown');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('other');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    switch (mediaRecorderStatus) {
      case 'idle':
        setDisplayStatusMessage('Pressione o microfone para iniciar a gravação.');
        break;
      case 'recording':
        setDisplayStatusMessage('Gravando áudio...');
        break;
      case 'paused':
        setDisplayStatusMessage('Gravação pausada.');
        break;
      case 'stopped':
        setDisplayStatusMessage('Gravação finalizada. Revise ou envie.');
        break;
      default:
        setDisplayStatusMessage('Status desconhecido.');
    }
  }, [mediaRecorderStatus]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClearRecording = () => {
    clearBlobUrl();
    if (audioRef.current) {
      audioRef.current.load();
    }
    // O useEffect atualizará a mensagem de status para 'Ocioso'
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!mediaBlobUrl) {
      setDisplayStatusMessage('Por favor, grave um áudio primeiro para enviar.');
      return;
    }

    setDisplayStatusMessage('Enviando áudio para o dataset...');
    setIsLoading(true);

    try {
      const response = await fetch(mediaBlobUrl);
      const audioBlob = await response.blob();

      const formData = new FormData();
      // CORREÇÃO CRÍTICA AQUI: Usar a extensão .webm para o arquivo,
      // para que o navegador defina o Content-Type correto (audio/webm).
      formData.append('audio_file', audioBlob, `recorded_audio_${Date.now()}.webm`);
      formData.append('diagnosis', selectedDiagnosis);
      formData.append('age', age.toString());
      formData.append('gender', gender);

      // Usar a variável de ambiente para a URL do backend
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!BACKEND_URL) {
        throw new Error("URL do backend não configurada. Verifique NEXT_PUBLIC_BACKEND_URL.");
      }

      console.log(`[Frontend] Enviando para: ${BACKEND_URL}/add-to-dataset/`);

      const apiResponse = await fetch(`${BACKEND_URL}/add-to-dataset/`, {
        method: 'POST',
        body: formData,
        // Não defina Content-Type aqui; o navegador fará isso automaticamente para FormData com boundary
      });

      if (!apiResponse.ok) {
        let errorDetail = 'Falha ao adicionar ao dataset.';
        try {
          const errorData = await apiResponse.json();
          errorDetail = errorData.detail || errorDetail;
        } catch (jsonError) {
          // Se não conseguir parsear JSON, use o status e texto da resposta
          errorDetail = `Erro ${apiResponse.status}: ${apiResponse.statusText}`;
        }
        throw new Error(errorDetail);
      }

      const result = await apiResponse.json();
      setDisplayStatusMessage(`Sucesso! ${result.message}`);
      handleClearRecording(); // Limpa o áudio e reseta o status
      // Opcional: resetar os campos do formulário aqui
      setSelectedDiagnosis('unknown');
      setAge(0);
      setGender('other');

    } catch (error: any) {
      const errorMessage = error.message || "Ocorreu um erro desconhecido.";
      setDisplayStatusMessage(`Erro ao enviar: ${errorMessage}`);
      console.error("[Frontend] Erro ao enviar áudio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContentContainer>
      <RecordingControls>
        <RecordingButton
          type="button"
          onClick={startRecording}
          disabled={mediaRecorderStatus === "recording" || mediaRecorderStatus === "paused" || isLoading}
          active={mediaRecorderStatus === "recording"}
          title="Iniciar Gravação"
        >
          <FiMic size={24} />
        </RecordingButton>
        <RecordingButton
          type="button"
          onClick={stopRecording}
          disabled={mediaRecorderStatus === "idle" || mediaRecorderStatus === "stopped" || isLoading}
          title="Parar Gravação"
        >
          <FiSquare size={24} />
        </RecordingButton>
        {mediaRecorderStatus === "recording" && (
            <RecordingButton
              type="button"
              onClick={pauseRecording}
              disabled={isLoading}
              title="Pausar Gravação"
            >
              <FiPause size={24} />
            </RecordingButton>
        )}
        {mediaRecorderStatus === "paused" && (
            <RecordingButton
              type="button"
              onClick={resumeRecording}
              disabled={isLoading}
              title="Continuar Gravação"
            >
              <FiMic size={24} />
            </RecordingButton>
        )}
      </RecordingControls>
      <StatusMessage>{displayStatusMessage}</StatusMessage>

      {mediaBlobUrl && (
        <>
          <AudioPreview controls src={mediaBlobUrl} ref={audioRef} />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="diagnosis">Diagnóstico:</Label>
              <Select
                id="diagnosis"
                value={selectedDiagnosis}
                onChange={(e) => setSelectedDiagnosis(e.target.value)}
                disabled={isLoading}
              >
                <option value="unknown">Desconhecido</option>
                <option value="healthy">Saudável</option>
                <option value="parkinson">Parkinson</option>
                <option value="alzheimer">Alzheimer</option>
                {/* Adicione mais opções conforme necessário */}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="age">Idade:</Label>
              <Input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                min="0"
                disabled={isLoading}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="gender">Gênero:</Label>
              <Select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={isLoading}
              >
                <option value="other">Outro</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </Select>
            </FormGroup>
            <ButtonGroup>
              <ActionButton
                type="submit"
                disabled={isLoading || !mediaBlobUrl}
                title="Enviar para o Dataset"
              >
                {isLoading ? 'Enviando...' : <><FiSend size={20} /> Enviar para o Dataset</>}
              </ActionButton>
              <ActionButton
                type="button"
                onClick={handleClearRecording}
                disabled={isLoading}
                color="#E84D4D"
                title="Limpar Gravação"
              >
                <FiXCircle size={20} /> Limpar
              </ActionButton>
            </ButtonGroup>
          </Form>
        </>
      )}
    </PageContentContainer>
  );
};

export default UploadPageContent;