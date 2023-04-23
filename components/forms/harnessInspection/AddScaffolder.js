import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddScaffolder({ navigation }) {
  const today = new Date()
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    harness: '',
    harnessIssueDate: today,
    lanyard: '',
    lanyardIssueDate: today,
    inspection: '',
    inspectionDate: today,
  });

  const save = async () => {
    try {
      
      
      let newFormData = { ...formData, inspectionDate: today, id: formData.lanyard + formData.harness };

      // Retrieve existing data from AsyncStorage
      let existingData = await AsyncStorage.getItem('harnessInspection');
      existingData = existingData ? JSON.parse(existingData) : [];

      // Add new item to the existing data
      existingData.push(newFormData);

      // Save updated data back to AsyncStorage
      await AsyncStorage.setItem('harnessInspection', JSON.stringify(existingData));
      navigation.navigate('Harness Inspection');
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={styles.controls}>
          <TouchableOpacity onPress={save}>
            <AntDesign name='save' size={34} color='black' />
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <TextInput
            onBlur={() => {}}
            autoFocus={false}
            style={styles.input}
            value={formData.name}
            placeholder='Name'
            onChangeText={(value) => handleChange('name', value)}
          />
          <View style={styles.inputContainer}>
            <Image style={styles.inputImage} source={require('../../../assets/harness.png')} />
            <TextInput
              onBlur={() => {}}
              autoFocus={false}
              style={styles.input}
              value={formData.harness}
              placeholder='Harness No'
              onChangeText={(value) => handleChange('harness', value)}
            />
            <View style={{alignItems:'center', height: 80}}>
              <Text>Issue Date</Text>
              <DateTimePicker testID='Harness' value={formData.harnessIssueDate} mode='date' is24Hour={false} 
              onChange={(event, selectedDate) => handleChange('harnessIssueDate', selectedDate)} />
            </View>
          </View>
          <View></View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputImage} source={require('../../../assets/lanyard.png')} />
            <TextInput
              onBlur={() => {}}
              autoFocus={false}
              style={styles.input}
              value={formData.lanyard}
              placeholder='Lanyard No'
              onChangeText={(value) => handleChange('lanyard', value)}
            />
            <View style={{alignItems:'center', height: 80}}>
              <Text>Issue Date</Text>
              <DateTimePicker testID='Lanyard' value={formData.lanyardIssueDate} mode='date' is24Hour={true} 
              onChange={(event, selectedDate) => handleChange('lanyardIssueDate', selectedDate)} />
            </View>
          </View>
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={40}
            onBlur={() => {}}
            autoFocus={false}
            style={styles.inputMulti}
            value={formData.inspection}
            placeholder='Initial Inspection Notes'
            onChangeText={(value) => handleChange('inspection', value)}
          />
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  controls: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 0,
  },
  input: {
    flex: 1,
    height: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 18,
  },
  inputMulti: {
    flex: 1,
    height: 200,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 12,
    marginVertical: 10,

    fontSize: 18,
  },
  container: {
    margin: 20,
  },
  inputContainer: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputImage: {
    flex: 0.2,
    alignSelf: 'flex-start',
    height: 60,
    resizeMode: 'contain',
  },
});
