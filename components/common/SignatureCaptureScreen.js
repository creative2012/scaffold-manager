import React, { useState, useRef } from 'react';
import { Button, View, StyleSheet, Dimensions, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const SIGNATURE_PAD_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <script src="https://unpkg.com/signature_pad"></script>
  </head>
  <body>
    <canvas id="signature-pad" style="width: 100%; height: 100%;"></canvas>
    <script>
      var canvas = document.getElementById('signature-pad');
      var signaturePad = new SignaturePad(canvas);
      signaturePad.minWidth = 2;
      signaturePad.maxWidth = 4.5;

      function clearSignature() {
        signaturePad.clear();
      }

      function saveSignature() {
        signaturePad.off();
        const dataUrl = signaturePad.toDataURL();
        window.ReactNativeWebView.postMessage(dataUrl);
      }
    </script>
  </body>
</html>
`;

export default function SignatureCaptureScreen({ setIsInteractingWithSignaturePad, saveValue }) {
  const [signature, setSignature] = useState(null);
  const webViewRef = useRef(null);

  const handleSave = () => {
    webViewRef.current.injectJavaScript('saveSignature();');
  };

  const handleClear = () => {
    webViewRef.current.injectJavaScript('clearSignature();');
  };

  const handleReset = () => {
    setSignature(null);
    webViewRef.current.reload();
  };

  const handleMessage = async (event) => {
    const signatureDataUrl = event.nativeEvent.data;
    const signatureBase64 = signatureDataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
    const fileUri = FileSystem.documentDirectory + 'signature.png';
    try {
      await FileSystem.writeAsStringAsync(fileUri, signatureBase64, { encoding: FileSystem.EncodingType.Base64 });
      setSignature(fileUri);
      saveValue('signature', fileUri);
      console.log(fileUri)
    } catch (error) {
      console.error('Error writing signature file:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      {signature ? (
        <Image source={{ uri: signature }} style={styles.signatureImage} resizeMode="contain" />
      ) : (
        <WebView
          onTouchStart={() => setIsInteractingWithSignaturePad(true)}
          onTouchEnd={() => setIsInteractingWithSignaturePad(false)}
          ref={webViewRef}
          style={styles.webView}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          onMessage={handleMessage}
          source={{ html: SIGNATURE_PAD_HTML }}
        />
      )}
      <View style={styles.buttons}>
        {!signature && (
          <>
            <Button title="Save" onPress={handleSave} />
            <Button title="Clear" onPress={handleClear} />
          </>
        )}
        {signature && <Button title="Reset" onPress={handleReset} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    width: Dimensions.get('window').width - 40,
    height: 200,
  },
  signatureImage: {
    width: Dimensions.get('window').width - 40,
    height: 200,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
  },
});
