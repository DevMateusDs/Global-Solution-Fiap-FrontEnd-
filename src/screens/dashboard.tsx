import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Alert } from 'react-native';
import { SensorEspacial, Alerta, EventoOperacional } from "../types/missao";
import { getSensores, getAlertas, getEventos, deleteSensor, deleteAlerta, deleteEvento } from "../services/api";

type AbaAtual = 'sensores' | 'alertas' | 'eventos';

export default function Dashboard({ navigation }: any) {
    const [aba, setAba] = useState<AbaAtual>('sensores');
    const [loading, setLoading] = useState(false);

    // Estados para cada lista
    const [sensores, setSensores] = useState<SensorEspacial[]>([]);
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const [eventos, setEventos] = useState<EventoOperacional[]>([]);

    useEffect(() => {
        carregarDados();
    }, [aba]); // Recarrega sempre que mudar de aba

    const carregarDados = async () => {
        setLoading(true);
        try {
            if (aba === 'sensores') {
                const dados = await getSensores();
                setSensores(dados);
            } else if (aba === 'alertas') {
                const dados = await getAlertas();
                setAlertas(dados);
            } else if (aba === 'eventos') {
                const dados = await getEventos();
                setEventos(dados);
            }
        } catch (error) {
            console.error(`Falha ao carregar dados da aba ${aba}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletar = (id: number | undefined) => {
        if (!id) return;

        Alert.alert("Confirmar", "Deseja mesmo remover este registro do banco H2?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Remover", 
                style: "destructive",
                onPress: async () => {
                    try {
                        if (aba === 'sensores') await deleteSensor(id);
                        if (aba === 'alertas') await deleteAlerta(id);
                        if (aba === 'eventos') await deleteEvento(id);
                        
                        Alert.alert("Sucesso", "Registro removido!");
                        carregarDados(); // Recarrega a lista atualizada
                    } catch (e) {
                        Alert.alert("Erro", "Não foi possível deletar.");
                    }
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Controle de Missão Espacial</Text>

            {/* Menu de Abas Alternáveis */}
            <View style={styles.AbasContainer}>
                {(['sensores', 'alertas', 'eventos'] as AbaAtual[]).map((tipoAba) => (
                    <TouchableOpacity
                        key={tipoAba}
                        style={[styles.botaoAba, aba === tipoAba && styles.botaoAbaAtiva]}
                        onPress={() => setAba(tipoAba)}
                    >
                        <Text style={[styles.textoAba, aba === tipoAba && styles.textoAbaAtiva]}>
                            {tipoAba.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Botão de Cadastro Dinâmico */}
            <View style={{ marginBottom: 15 }}>
                <Button
                    title={`Cadastrar Novo ${aba.slice(0, -2)}`}
                    color="#0066cc"
                    onPress={() => {
                        if (aba === 'sensores') navigation.navigate('CadastroSensor');
                        if (aba === 'eventos') navigation.navigate('CadastroEvento');
                        if (aba === 'alertas') navigation.navigate('CadastroAlerta');
                    }}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={aba === 'sensores' ? sensores : aba === 'alertas' ? alertas : eventos}
                    keyExtractor={(item: any) => String(item.id)}
                    renderItem={({ item }: any) => (
                        <View style={styles.card}>
                            <View style={{ flex: 1 }}>
                                {aba === 'sensores' && (
                                    <>
                                        <Text style={styles.cardTitulo}>{item.nome}</Text>
                                        <Text>Tipo: {item.tipo} | Status: {item.status}</Text>
                                        <Text>Temp: {item.temperatura}°C | Local: {item.localizacao}</Text>
                                    </>
                                )}
                                {aba === 'alertas' && (
                                    <>
                                        <Text style={[styles.cardTitulo, { color: '#cc0000' }]}>{item.titulo}</Text>
                                        <Text>Nível: {item.nivel}</Text>
                                        <Text>Descrição: {item.descricao}</Text>
                                        <Text style={styles.dataText}>Hora: {item.dataHora}</Text>
                                    </>
                                )}
                                {aba === 'eventos' && (
                                    <>
                                        <Text style={styles.cardTitulo}>Sistema: {item.sistema}</Text>
                                        <Text>Status: {item.status}</Text>
                                        <Text>Descrição: {item.descricao}</Text>
                                        <Text style={styles.dataText}>Hora: {item.dataHora}</Text>
                                    </>
                                )}
                            </View>
                            <View style={styles.acoesContainer}>
                                {/* Mostra o botão de editar apenas se estiver na aba de sensores */}
                                {aba === 'sensores' && (
                                    <TouchableOpacity 
                                        style={styles.botaoEditar} 
                                        onPress={() => navigation.navigate('CadastroSensor', { sensor: item })}
                                    >
                                        <Text style={styles.textoAcao}>✎</Text>
                                    </TouchableOpacity>
                                )}
                                
                                <TouchableOpacity style={styles.botaoDeletar} onPress={() => handleDeletar(item.id)}>
                                    <Text style={styles.textoAcaoDeletar}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F0F4F8' },
    titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#102A43' },
    AbasContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    botaoAba: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: '#D9E2EC', marginHorizontal: 2, borderRadius: 5 },
    botaoAbaAtiva: { backgroundColor: '#0066cc' },
    textoAba: { fontWeight: 'bold', color: '#486581', fontSize: 12 },
    textoAbaAtiva: { color: '#fff' },
    card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2, alignItems: 'center' },
    cardTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#334E68' },
    dataText: { fontSize: 11, color: '#627D98', marginTop: 4 },
    botaoDeletar: { backgroundColor: '#FFEEEE', padding: 10, borderRadius: 5, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
    textoDeletar: { color: '#cc0000', fontWeight: 'bold', },     
    acoesContainer: { flexDirection: 'row', alignItems: 'center' },
    botaoEditar: { backgroundColor: '#E1F5FE', padding: 10, borderRadius: 5, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', marginLeft: 5 },
    textoAcao: { color: '#0288D1', fontWeight: 'bold' },
    textoAcaoDeletar: { color: '#cc0000', fontWeight: 'bold' }
});