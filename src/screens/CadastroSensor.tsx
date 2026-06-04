import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createSensor, updateSensor } from '../services/api';
import { SensorEspacial } from '../types/missao';

// Adicionamos o 'route' para capturar parâmetros passados na navegação
export default function CadastroSensor({ navigation, route }: any) {
  // Se o Dashboard enviou um sensor para editar, capturamos aqui
  const sensorParaEditar = route.params?.sensor;

  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  // Se existir um sensor para editar, preenchemos os Inputs com os dados dele
  useEffect(() => {
    if (sensorParaEditar) {
      setId(sensorParaEditar.id);
      setNome(sensorParaEditar.nome);
      setTipo(sensorParaEditar.tipo);
      setStatus(sensorParaEditar.status || '');
      // Convertendo número para string para colocar no TextInput
      setTemperatura(sensorParaEditar.temperatura ? String(sensorParaEditar.temperatura) : '');
      setLocalizacao(sensorParaEditar.localizacao || '');
    }
  }, [sensorParaEditar]);

  const handleSalvar = async () => {
    if (!nome || !tipo || !temperatura) {
      Alert.alert('Erro', 'Preencha pelo menos nome, tipo e temperatura.');
      return;
    }

    const dadosSensor: SensorEspacial = {
      nome,
      tipo,
      status,
      temperatura: parseFloat(temperatura),
      localizacao
    };

    try {
      if (id) {
        // Se temos um ID no state, significa que estamos editando (PUT)
        await updateSensor(id, dadosSensor);
        Alert.alert('Sucesso!', 'Sensor atualizado com sucesso no banco!');
      } else {
        // Sem ID, significa que é um novo cadastro (POST)
        await createSensor(dadosSensor);
        Alert.alert('Sucesso!', 'Sensor cadastrado com sucesso!');
      }
      navigation.goBack(); // Volta para o Dashboard e recarrega a lista
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o sensor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* O título da tela muda dinamicamente */}
      <Text style={styles.tituloDaTela}>
        {id ? 'Editar Sensor' : 'Novo Sensor'}
      </Text>

      <Text style={styles.label}>Nome do Sensor:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Sensor Alpha" />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Ex: Térmico" />

      <Text style={styles.label}>Status:</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder="Ex: Ativo" />

      <Text style={styles.label}>Temperatura (°C):</Text>
      <TextInput style={styles.input} value={temperatura} onChangeText={setTemperatura} keyboardType="numeric" placeholder="Ex: 25.5" />

      <Text style={styles.label}>Localização:</Text>
      <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} placeholder="Ex: Módulo Central" />

      {/* O texto do botão também muda */}
      <View style={{ marginTop: 10 }}>
          <Button 
            title={id ? "Atualizar Sensor" : "Salvar Sensor"} 
            onPress={handleSalvar} 
            color="#0066cc" 
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  tituloDaTela: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 5, marginBottom: 10 },
});