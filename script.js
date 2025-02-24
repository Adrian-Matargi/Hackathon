// Função para abrir o link do QR Code automaticamente
function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('resultado').textContent = 'QR Code Escaneado: ' + decodedText;
    // Verifica se o QR Code é uma URL válida antes de redirecionar
    if (decodedText && decodedText.startsWith("http")) {
      window.location.href = decodedText;  // Redireciona para a URL lida no QR Code
    }
  }

  // Função de erro
  function onScanError(errorMessage) {
    console.warn(`Erro de leitura: ${errorMessage}`);
  }

  // Função para iniciar a leitura do QR Code
  function iniciarLeituraQRCode() {
    const config = {
      fps: 30,  // Aumenta os frames por segundo para melhorar a detecção
      qrbox: 300,  // Aumenta o tamanho da área de leitura
      aspectRatio: 1,  // Ajusta para manter a proporção de captura de vídeo
      disableFlip: false,  // Permite rotação, caso o dispositivo esteja deitado
    };
    const qrCodeReader = new Html5Qrcode("qr-reader");
    // Iniciar leitura com a câmera traseira ou a primeira câmera disponível
    qrCodeReader.start(
      { facingMode: "environment" },  // Preferir a câmera traseira
      config,
      onScanSuccess,
      onScanError
    ).catch(err => {
      console.error("Erro ao acessar a câmera:", err);
      document.getElementById('resultado').textContent = "Falha ao acessar a câmera.";
    });
  }

  // Função para verificar e iniciar a leitura quando uma câmera for detectada
  function verificarCameras() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(device => device.kind === 'videoinput');
        if (cameras.length === 0) {
          console.error("Nenhuma câmera encontrada");
          document.getElementById('resultado').textContent = "Câmera não detectada!";
        } else {
          iniciarLeituraQRCode();
        }
      })
      .catch(error => {
        console.error("Erro ao acessar os dispositivos de mídia:", error);
        document.getElementById('resultado').textContent = "Erro ao acessar as câmeras!";
      });
  }

  // Iniciar a leitura assim que a página carregar
  window.onload = () => {
    verificarCameras();
  };