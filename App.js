import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ScanQrCodeScreen({ navigation }) {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0c0b0b',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    teletactile: {
      fontFamily: 'Teletactile',
      lineHeight: 20
    },
    marginHorizontal20: {
      marginHorizontal: '10%'
    },
    colorWhite: {
      color: 'white'
    },
    textCenter: {
      textAlign: 'center'
    },
    btn: {
      borderRadius: 10,
      padding: '5%',
      backgroundColor: '#545454'
    },
    fontSize20: {
      fontSize: 20
    },
    mt5: {
      marginTop: '5%'
    }
  });

  const fetchFonts = async () => {
    await Font.loadAsync({
      'Teletactile': require('./assets/fonts/Teletactile-3zavL.ttf'),
    });
  }

  useEffect(() => {

    // setScanning(false);

    console.log('useEffect'); // DEBUG

    // (async () => {
    //   const { status } = await BarCodeScanner.requestPermissionsAsync();
    //   setHasPermission(status === 'granted');
    // })();

    fetchFonts().then(() => {
      setFontLoaded(true);
    });
  }, []);

  const [fontLoaded, setFontLoaded] = useState(false);


  return (

    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      {fontLoaded ? (
            <View style={styles.marginHorizontal20}>
            <Text style={[styles.teletactile, styles.colorWhite, styles.textCenter]}>
              Generate your QR Code on our website by connecting your wallet
            </Text>
      
            <Text
              style={[
                styles.teletactile,
                styles.colorWhite,
                styles.textCenter,
                styles.mt5,
              ]}
            >
              Then scan it to initialize the Ranch
            </Text>
            <TouchableOpacity style={[styles.btn, styles.mt5]}>
              <Text
                onPress={() => navigation.navigate('QrCodeScanner')}
                style={[
                  styles.teletactile,
                  styles.textCenter,
                  styles.fontSize20,
                  styles.colorWhite,
                ]}
              >
                Scan QR Code
              </Text>
            </TouchableOpacity>
          </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </View>


  );
}

function QrCodeScanner() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0c0b0b',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  });

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() { 

  // const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // const fetchFonts = async () => {
  //   await Font.loadAsync({
  //     'Teletactile': require('./assets/fonts/Teletactile-3zavL.ttf'),
  //   });
  // }

  useEffect(() => {

    // setScanning(false);

    console.log('useEffect'); // DEBUG

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    // fetchFonts().then(() => {
    //   setFontLoaded(true);
    // });
  }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  // const scanQrCode = () => {
  //   setScanning(true);
  // }

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ScanQrCodeScreen" component={ScanQrCodeScreen} />
        <Stack.Screen name="QrCodeScanner" component={QrCodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


