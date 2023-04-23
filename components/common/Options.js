import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Options() {
  const [options, setOptions] = useState([
    {
      title: 'Company Name',
      key: 'companyName',
      icon: <FontAwesome name='institution' size={24} color='black' />,
    },
    {
      title: 'Your Name',
      key: 'userName',
      icon: <MaterialIcons name='drive-file-rename-outline' size={24} color='black' />,
    },
    {
      title: 'Set Signature',
      key: 'signature',
      icon: <FontAwesome5 name='signature' size={24} color='black' />,
    },
    {
      title: 'Set Email to send reports to',
      key: 'email',
      icon: <MaterialIcons name='attach-email' size={24} color='black' />,
    },
  ]);

  const [values, setValues] = useState({
    companyName: 'Not set',
    companyLogo: 'Not set',
    userName: 'Not set',
    signature: 'Not set',
    email: 'Not set',
  });

  const [edit, setEdit] = useState({});

  const getSettings = async () => {
    try {
      const storedValues = await AsyncStorage.multiGet(Object.keys(values));
      const newValues = {};
      for (const [key, value] of storedValues) {
        newValues[key] = value || 'Not set';
      }
      setValues(newValues);
    } catch (e) {
      console.error('Error getting settings:', e);
    }
  };

  const saveValue = async (key, value) => {
    const newValue = value === '' ? 'Not set' : value;
    try {
      await AsyncStorage.setItem(key, newValue);
      setValues({ ...values, [key]: newValue });
      setEdit({ ...edit, [key]: false });
    } catch (e) {
      console.error('Error saving value:', e);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <ScrollView>
      {options.map(({ title, key, icon }) => (
        <>
          <TouchableOpacity
            key={key}
            onPress={() => {
              const updatedEdit = {};
              Object.keys(edit).forEach((k) => {
                updatedEdit[k] = k === key ? !edit[k] : false;
              });
              setEdit({ ...updatedEdit, [key]: !edit[key] });
            }}
          >
            <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 20 }}>
              <Text style={{ fontSize: 17 }}>
                {icon}
                {'  '}
                {title}
              </Text>
              {!edit[key] ? (
                <Text style={styles.isSet(values[key])}>{values[key]}</Text>
              ) : (
                <View style={styles.container}>
                  <TextInput
                    onBlur={() => saveValue(key, values[key])}
                    autoFocus={true}
                    style={styles.input2}
                    value={values[key] === 'Not set' ? '' : values[key]}
                    onChangeText={(value) => setValues({ ...values, [key]: value })}
                  />
                  <TouchableOpacity style={styles.button} onPress={() => saveValue(key, values[key])}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View key={key + key} style={{ height: 0.5, backgroundColor: 'lightgrey' }} />
        </>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  isSet: (isSet) => ({
    color: isSet != 'Not set' ? 'grey' : 'red',
    marginLeft: 40,
  }),
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  input2: {
    flex: 1,
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 12,
    marginRight: 8,
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
