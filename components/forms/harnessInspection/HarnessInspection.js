import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';
import Modal from 'react-native-modal';

const Item = ({ item, navigation, pass, fail }) => (
  <View style={styles.item(item.inspectionDate)}>
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.date}>Harness: {item.harness}</Text>
      <Text style={styles.date}>Lanyard: {item.lanyard}</Text>
      <Text style={styles.dateCheck(item.inspectionDate)}>
        {checkDate(item.inspectionDate)
          ? `Inspected: ${new Date(item.inspectionDate).toLocaleDateString()}`
          : 'Inspection Due'}{' '}
      </Text>
    </View>
    <View style={styles.editBtns}>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <AntDesign name='closesquareo' size={34} color='black' onPress={() => fail(item.id, item.name)} />
        <Text>Fail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <AntDesign name='checksquareo' size={34} color='black' onPress={() => pass(item.id)} />
        <Text>Pass</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={() =>
          navigation.navigate('Edit Scaffolder', {
            id: item.id,
            name: item.name,
            harness: item.harness,
            harnessIssueDate: item.harnessIssueDate,
            lanyard: item.lanyard,
            lanyardIssueDate: item.lanyardIssueDate,
            inspected: item.inspection,
            inspectionDate: item.inspectionDate,
          })
        }
      >
        <AntDesign name='edit' size={34} color='black' />
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function HarnessInspection({ navigation }) {
  const today = new Date();
  const [inspection, setInspection] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const pass = (id) => {
    updateItem(id, 'No Issues');
  };
  const fail = (id, name) => {
    setInspection('');
    setName(name);
    setId(id);
    setIsVisible(!isVisible);
  };

  const updateItem = async (id, inspection) => {
    try {
      const jsonValue = await AsyncStorage.getItem('harnessInspection');
      if (jsonValue != null) {
        const array = JSON.parse(jsonValue);
        const index = array.findIndex((obj) => obj.id === id);
        if (index !== -1) {
          array[index] = { ...array[index], inspectionDate: today, inspection: inspection };
          const updatedJson = JSON.stringify(array);
          await AsyncStorage.setItem('harnessInspection', updatedJson);
          console.log('Object updated successfully!');
          fetchData();
        } else {
          console.log('Object with the given id not found.');
        }
      }
    } catch (e) {
      console.error('Error updating object:', e);
    }
    isVisible && setIsVisible(false);
    setInspection('');
  };

  const renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const viewPDF = async (option) => {
    const imageUri = await AsyncStorage.getItem('image');
    const asset = Asset.fromModule(imageUri);
    const image = await manipulateAsync(asset.localUri ?? asset.uri, [], { base64: true });
    const htmlString = `
    <html>
      <head>
        <style>
          
          body{
            padding: 20px
          }
          #container{
            width:100%;
            height:100%;

          }
          #title{
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            font-size: 15px;
            }

            tr:nth-child(even) {
            background-color: lightgrey;
            }
        </style>
      </head>
      <body>
        <div id="container">
          <div id="title"><img src="data:image/jpeg;base64,${
            image.base64
          }"  height="50"/> Monthly Harness Inspection</div>
          
          <table>
            <tr>
              <th style="width: 16%">Name</th>
              <th style="width: 10%">Harness</th>
              <th style="width: 12%">Issue</th>
              <th style="width: 10%">Lanyard</th>
              <th style="width: 12%">Issue</th>
              <th style="width: 12%">Inspected</th>
              <th style="width: 30%">Comments</th>
            </tr>
            ${data
              .map(
                (formData, index) => `
                  <tr key="${index}">
                    <td>${formData.name}</td>
                    <td>${formData.harness}</td>
                    <td>${new Date(formData.harnessIssueDate).toLocaleDateString()}</td>
                    <td>${formData.lanyard}</td>
                    <td>${new Date(formData.lanyardIssueDate).toLocaleDateString()}</td>
                    <td>${new Date(formData.inspectionDate).toLocaleDateString()}</td>
                    <td>${formData.inspection}</td>
                  </tr>
`
              )
              .join('')}
          </table>
        </div>
      </body>
    </html>
  `;
    if (option === 'share') {
      const generatePdf = await Print.printToFileAsync({
        html: htmlString,
        orientation: 'landscape',
        fileName: 'MonthlyHarnessInspection.pdf',
      });


      await shareAsync(generatePdf.uri);
    } else {
      await Print.printAsync({ html: htmlString, orientation: 'landscape', fileName: 'MonthlyHarnessInspection.pdf' });
    }
  };
  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('harnessInspection');
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   // AsyncStorage.removeItem('harnessInspection')

  //   fetchData();
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={{ alignItems: 'center', gap: 5 }}
            onPress={() => navigation.navigate('Add Scaffolder')}
          >
            <AntDesign name='adduser' size={44} color='black' />
            <Text>Add</Text>
          </TouchableOpacity>
          <View style={styles.controls2}>
            <TouchableOpacity style={{ alignItems: 'center', gap: 5 }} onPress={() => navigation.navigate('Harness Information')}>
              <AntDesign name='infocirlceo' size={34} color='black' />
              <Text>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', gap: 5 }} onPress={() => viewPDF('print')}>
              <AntDesign name='sharealt' size={34} color='black' />
              <Text>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        {data != [] && (
          <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} navigation={navigation} fail={fail} pass={pass} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <Modal isVisible={isVisible} style={styles.bottomModal} onBackdropPress={() => setIsVisible(!isVisible)}>
        <View style={styles.modalContent}>
          <Text>Inspection Outcome for {name}</Text>
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={40}
            onBlur={() => {}}
            autoFocus={true}
            style={styles.inputMulti}
            value={inspection}
            placeholder=''
            onChangeText={(value) => setInspection(value)}
          />
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {renderButton('Close', () => setIsVisible(!isVisible))}
            {renderButton('Save', () => updateItem(id, inspection))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const checkDate = (date) => {
  let myDate = new Date(date);
  let today = new Date();

  let thirtyDays = 1000 * 60 * 60 * 24 * 30;

  return today - myDate < thirtyDays;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controls2: {
    padding: 10,
    flexDirection: 'row',
    gap: 30,
  },
  item: (date) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: checkDate(date) ? 'lightgreen' : '#FFCCCB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
  }),

  title: {
    fontSize: 22,
  },
  date: {
    fontSize: 13,
  },
  dateCheck: (date) => ({
    fontSize: 13,
    fontWeight: checkDate(date) ? 'normal' : 'bold',
  }),
  editBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 100,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  inputMulti: {
    width: '100%',
    height: 200,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 12,
    marginVertical: 10,

    fontSize: 18,
  },
});
