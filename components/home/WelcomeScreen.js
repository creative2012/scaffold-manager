import React, { useEffect, useState } from 'react';
import { Image, Button, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function WelcomeScreen({ navigation }) {
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('Not set');
  const [imageUri, setImageUri] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await AsyncStorage.setItem('image', result.uri);
      getData('image', setImageUri);
    }
  };

  const getData = async (key, set) => {
    try {
      const value = await AsyncStorage.getItem(key);
      value !== null && value !== 'Not set' ? set(value) : set(`${key} not set`);
    } catch (e) {}
  };

  useEffect(() => {
    async function checkPermissions() {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    checkPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // AsyncStorage.removeItem('image');
      getData('companyName', setCompanyName);
      getData('userName', setUserName);
      getData('image', setImageUri);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={imageUri != 'image not set' ? { uri: imageUri } : require('../../assets/manager.png')}
            style={{ width: 200, height: 200, marginTop: 50, marginBottom: 20 }}
            onLoad={handleImageLoad}
          />
        </TouchableOpacity>
        <Text style={styles.appName}>Scaffold Manager</Text>
        <Text style={styles.companyName(companyName)}>{companyName}</Text>
      </View>
      <ScrollView style={{ marginTop: 150 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Harness Inspection')}>
            <Text style={styles.text}>Point of Works</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Harness Inspection')}>
            <Text style={styles.text}>Incident Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Harness Inspection')}>
            <Text style={styles.text}>Scaffold Inspection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Harness Inspection')}>
            <Text style={styles.text}>Harness Inspection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
  },
  companyName: (isSet) => ({
    color: isSet.substr(isSet.length - 7) != 'not set' ? 'black' : 'red',
  }),
  button: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});
