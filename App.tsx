// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/dashboard';
import CadastroSensor from './src/screens/CadastroSensor';
import CadastroEvento from './src/screens/CadastroEvento';
import CadastroAlerta from './src/screens/CadastroAlerta';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ title: 'Monitoramento da Missão' }} 
        />
        {/* Registrando a nova tela */}
        <Stack.Screen 
          name="CadastroSensor" 
          component={CadastroSensor} 
          options={{ title: 'Novo Sensor' }} 
        />
        <Stack.Screen name="CadastroAlerta" component={CadastroAlerta} options={{ title: 'Novo Alerta' }} />
        <Stack.Screen name="CadastroEvento" component={CadastroEvento} options={{ title: 'Novo Evento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}