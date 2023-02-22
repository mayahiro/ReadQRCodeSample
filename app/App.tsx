import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

const checkPermission = async () => {
  console.log('checkPermission');

  const cameraPermission = await Camera.getCameraPermissionStatus();
  if (cameraPermission === 'not-determined') {
    console.log('not-determined');
    const newPermission = await Camera.requestCameraPermission();
    if (newPermission === 'denied') {
      console.log('denied');
      // show error
    }
  } else if (cameraPermission === 'denied') {
    console.log('denied');
    // show error
  }
};

function App(): JSX.Element {
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  console.log(barcodes);

  useEffect(() => {
    checkPermission();
  }, []);

  if (device == null) {
    return <Text>Loading</Text>;
  }

  return (
    <Camera
      device={device}
      isActive={true}
      style={StyleSheet.absoluteFill}
      frameProcessor={frameProcessor}
    />
  );
}

export default App;
