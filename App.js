import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import {
  WelcomeScreen,
  HarnessInspection,
  HarnessInformation,
  AddScaffolder,
  EditScaffolder,
  Options,
} from './components';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons name='options' size={24} color='white' onPress={() => navigation.navigate('Options')} />
            ),
            title: 'Home',
          })}
          name='Welcome'
          component={WelcomeScreen}
        />
        <Stack.Screen name='Harness Inspection' component={HarnessInspection} />
        <Stack.Screen name='Harness Information' component={HarnessInformation} />
        <Stack.Screen name='Edit Scaffolder' component={EditScaffolder} />
        <Stack.Screen name='Add Scaffolder' component={AddScaffolder} />
        <Stack.Screen name='Options' component={Options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColoer: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
