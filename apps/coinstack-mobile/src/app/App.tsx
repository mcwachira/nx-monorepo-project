import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider>
    <NavigationContainer>

    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>


    </PaperProvider>
   
  )
}

export default App

const styles = StyleSheet.create({

  text:{
    justifyContent:'center',
    alignItems:'center',
  }
})
