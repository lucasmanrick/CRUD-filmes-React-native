import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/home/home';
import TodosFilmes from './src/pages/todosFilmes/todosFilmes';
import CadastrarFilme from './src/pages/cadastrarFilmes/cadastrarFilmes';
import EditaFilme from './src/pages/editaFilme/editaFilme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='todosFilmes' component={TodosFilmes}/>
        <Stack.Screen name='cadastrarFilme' component={CadastrarFilme}/>
        <Stack.Screen name='editaFilme' component={EditaFilme}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});