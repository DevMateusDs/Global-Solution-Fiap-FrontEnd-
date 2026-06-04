import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createEventos } from '../services/api';
import { EventoOperacional } from '../types/missao';

export default function CadastroEvento({ navigation }: any) {
  const [sistema, setSistema] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [dataHora, setDataHora] = useState('');

  const handleSalvar = async () => {
    if (!sistema || !descricao || !status) {
      Alert.alert('Erro', 'Preencha sistema, descrição e status.');
      return;
    }

    const novoEvento: EventoOperacional = {
      sistema,
      descricao,
      status,
      dataHora
    };

    try {
      await createEventos(novoEvento);
      Alert.alert('Sucesso!', 'Evento cadastrado com sucesso no banco H2!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o evento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloDaTela}>Novo Evento Operacional</Text>

      <Text style={styles.label}>Sistema Monitorado:</Text>
      <TextInput style={styles.input} value={sistema} onChangeText={setSistema} placeholder="Ex: Propulsão Principal" />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Ex: Falha na ignição" />

      <Text style={styles.label}>Status:</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder="Ex: Crítico" />

      <Text style={styles.label}>Data e Hora:</Text>
      <TextInput style={styles.input} value={dataHora} onChangeText={setDataHora} placeholder="Ex: 03/06/2026 14:30" />

      <View style={{ marginTop: 10 }}>
          <Button title="Salvar Evento" onPress={handleSalvar} color="#0066cc" />
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