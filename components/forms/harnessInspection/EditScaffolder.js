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
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditScaffolder({ route, navigation }) {
  
  const { id, name, harness, harnessIssueDate, lanyard, lanyardIssueDate, inspected, inspectionDate } = route.params;
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    harness: harness,
    harnessIssueDate: new Date(harnessIssueDate),
    lanyard: lanyard,
    lanyardIssueDate: new Date(lanyardIssueDate),
    inspection: inspected,
    inspectionDate: new Date(inspectionDate),
  });
  const updateObjectById = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('harnessInspection');
      if (jsonValue != null) {
        const array = JSON.parse(jsonValue);
        const index = array.findIndex(obj => obj.id === formData.id);
        if (index !== -1) {
          array[index] = { ...array[index], ...formData };
          const updatedJson = JSON.stringify(array);
          await AsyncStorage.setItem('harnessInspection', updatedJson);
          console.log('Object updated successfully!');
          navigation.navigate('Harness Inspection');
        } else {
          console.log('Object with the given id not found.');
        }
      }
    } catch (e) {
      console.error('Error updating object:', e);
    }
  }
  const deleteItemById = async () => {
    try {
      const items = await AsyncStorage.getItem('harnessInspection');
      if (items !== null) {
        const parsedItems = JSON.parse(items);
        const filteredItems = parsedItems.filter((item) => item.id !== formData.id);
        await AsyncStorage.setItem('harnessInspection', JSON.stringify(filteredItems));
        navigation.navigate('Harness Inspection');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteScaffolder = () =>{
    Alert.alert('Delete Scaffolder', 'Are you sure ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'DELETE', onPress: deleteItemById},
      ]);
   
  }
  
  

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={styles.controls}>
        <TouchableOpacity onPress={deleteScaffolder}>
        <AntDesign name="delete" size={34} color="red" />
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={updateObjectById}>
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
            <View style={{ alignItems: 'center', height: 80 }}>
              <Text>Issue Date</Text>
              <DateTimePicker
                testID='Harness'
                value={formData.harnessIssueDate}
                mode='date'
                is24Hour={false}
                onChange={(event, selectedDate) => handleChange('harnessIssueDate', selectedDate)}
              />
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
            <View style={{ alignItems: 'center', height: 80 }}>
              <Text>Issue Date</Text>
              <DateTimePicker
                testID='Lanyard'
                value={formData.lanyardIssueDate}
                mode='date'
                is24Hour={true}
                onChange={(event, selectedDate) => handleChange('lanyardIssueDate', selectedDate)}
              />
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
            placeholder='No Inspection Notes logged'
            onChangeText={(value) => handleChange('inspection', value)}
          />
          <View style={{ alignItems: 'center', height: 80 }}>
          <Text>Inspection Date</Text>
          <DateTimePicker
                testID='Inspection'
                value={formData.inspectionDate}
                mode='date'
                is24Hour={true}
                onChange={(event, selectedDate) => handleChange('inspectionDate', selectedDate)}
              />
              </View>
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  controls: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
