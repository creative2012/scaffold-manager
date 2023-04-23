import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';


const Item = ({ item, navigation }) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.date}>Harness: {item.harness}</Text>
      <Text style={styles.date}>Lanyard: {item.lanyard}</Text>
      <Text style={styles.date}>Inspected: {new Date(item.inspectionDate).toLocaleDateString()}</Text>
    </View>
    <View style={styles.editBtns}>
      <TouchableOpacity style={{alignItems:'center'}}>
        <AntDesign name='checksquareo' size={34} color='black' />
        <Text>Inspect</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:'center'}}
        onPress={() =>
          navigation.navigate('Edit Scaffolder', {
            id: item.id,
            name: item.name,
            harness: item.harness,
            harnessIssueDate: item.harnessIssueDate,
            lanyard: item.lanyard,
            lanyardIssueDate: item.lanyardIssueDate,
            inspected: item.inspection,
            inspectionDate: item.inspectionDate
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
  const [currentDate, setCurrentDate] = useState('');
  const [data, setData] = useState([]);

  const viewPDF = async () => {
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
          <div id="title"><img src="data:image/jpeg;base64,${image.base64}"  height="50"/> Monthly Harness Inspection</div>
          
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
`              )
              .join('')}
          </table>
        </div>
      </body>
    </html>
  `;

    const pdfData = await Print.printAsync({ html: htmlString, orientation: 'landscape', fileName: 'MonthlyHarnessInspection.pdf' });
    if (pdfData && pdfData.uri) {
      // You can open the PDF file using Linking.openURL()
      Linking.openURL(pdfData.uri);
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem('harnessInspection');
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('harnessInspection');
        const data = jsonValue != null ? JSON.parse(jsonValue) : [];
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('harnessInspection');
          const data = jsonValue != null ? JSON.parse(jsonValue) : [];
          setData(data);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
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
          <TouchableOpacity style={{ alignItems: 'center', gap: 5 }} onPress={viewPDF}>
            <AntDesign name='pdffile1' size={34} color='black' />
            <Text>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', gap: 5 }}>
            <AntDesign name='printer' size={34} color='black' />
            <Text>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', gap: 5 }}>
            <Entypo name='share-alternative' size={34} color='black' />
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      {data != [] && (
        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

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

  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'lightgreen',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
  },
  date: {
    fontSize: 13,
  },
  editBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
});
