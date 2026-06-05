// src/screens/CadastroAlerta.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createAlertas } from '../services/api';
import { Alerta } from '../types/missao';

export default function CadastroAlerta({ navigation }: any) {
  const [titulo, setTitulo] = useState('');
  const [nivel, setNivel] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataHora, setDataHora] = useState('');

  const handleSalvar = async () => {
    if (!titulo || !nivel || !descricao) {
      Alert.alert('Erro', 'Preencha pelo menos o título, nível e descrição.');
      return;
    }

    const novoAlerta: Alerta = {
      titulo,
      nivel,
      descricao,
      dataHora
    };

    try {
      await createAlertas(novoAlerta);
      Alert.alert('Sucesso!', 'Alerta cadastrado com sucesso no banco H2!');
      navigation.goBack(); // Volta para o Dashboard
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o alerta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloDaTela}>Novo Alerta Crítico</Text>

      <Text style={styles.label}>Título do Alerta:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ex: Falha de Comunicação" />

      <Text style={styles.label}>Nível de Gravidade:</Text>
      <TextInput style={styles.input} value={nivel} onChangeText={setNivel} placeholder="Ex: Alto, Médio, Baixo" />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Ex: Perda de sinal com o módulo 3" />

      <Text style={styles.label}>Data e Hora:</Text>
      <TextInput style={styles.input} value={dataHora} onChangeText={setDataHora} placeholder="Ex: 03/06/2026 15:45" />

      <View style={{ marginTop: 10 }}>
          <Button title="Salvar Alerta" onPress={handleSalvar} color="#cc0000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  tituloDaTela: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#cc0000', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 5, marginBottom: 10 },
});