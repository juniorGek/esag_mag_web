import { useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

function ScanCodePage() {
  const scannerId = "html5qr-code-full-region";
  const html5QrcodeRef = useRef(null);

  useEffect(() => {
    // Vérifier si l'instance est déjà initialisée
    if (html5QrcodeRef.current) {
      return;
    }

    const html5Qrcode = new Html5Qrcode(scannerId);
    html5QrcodeRef.current = html5Qrcode;

    const cameraConfig = { facingMode: "environment" }; // Utilisation de la caméra arrière
    const scannerConfig = { fps: 10, qrbox: 250 }; // Configuration du scanner

    function onScanSuccess(decodedText, decodedResult) {
      alert(`Code scanné: ${decodedText}`);
      console.log(`Code scanné: ${decodedText}`, decodedResult);
      // Arrêter le scanner après un scan réussi
      html5Qrcode.stop().catch(error => {
        console.error("Erreur lors de l'arrêt du scanner", error);
      });
    }

    function onScanFailure(error) {
      console.warn(`Erreur de scan: ${error}`);
    }

    // Démarrer le scanner automatiquement
    html5Qrcode.start(cameraConfig, scannerConfig, onScanSuccess, onScanFailure)
      .catch(error => {
        console.error("Erreur lors du démarrage du scanner", error);
      });

    return () => {
      if (html5Qrcode.getState() === Html5QrcodeScannerState.SCANNING) {
        html5Qrcode.stop().catch(error => {
          console.error("Erreur lors de l'arrêt du scanner", error);
        });
      }
    };
  }, [scannerId]);

  return (
    <div>
      <h2>Scanner de QR Code</h2>
      <div id={scannerId}></div>
    </div>
  );
}

export default ScanCodePage;
