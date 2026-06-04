import axios from "axios";  
import { SensorEspacial, Alerta, EventoOperacional } from "../types/missao";

const API_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Serviços sensor espacial

//get
export const getSensores = async (): Promise<SensorEspacial[]> => {
    try{
        const response = await api.get<SensorEspacial[]>('/sensores');
        return response.data;
    } catch(error) {
        console.log("Erro ao buscar sensores:", error);
        throw error;
    }
};

//post
export const createSensor = async (sensor: SensorEspacial): Promise<SensorEspacial> => {
    try{
        const response = await api.post<SensorEspacial>('/sensores', sensor);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar sensor:", error);
        throw error;
    }
};

// Serviços Alerta

//get
export const getAlertas = async (): Promise<Alerta[]> => {
    try{
        const response = await api.get<Alerta[]>('/alertas');
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar Alertas:", error);
        throw error;
    }
};

//post
export const createAlertas = async (alerta: Alerta): Promise<Alerta> => {
    try{
        const response = await api.post<Alerta>('/alertas', alerta);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar Alertas:", error);
        throw error;
    }
};

// Serviço Evento Operacionais

//GET
export const getEventos= async (): Promise<EventoOperacional[]> => {
    try{
        const response = await api.get<EventoOperacional[]>('/eventos');
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar Eventos:", error);
        throw error;
    }
};

//post
export const createEventos = async (evento: EventoOperacional): Promise<EventoOperacional> => {
    try{
        const response = await api.post<EventoOperacional>('/eventos', evento);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar Eventos:", error);
        throw error;
    }
};


//(PUT) e (DELETE)


export const updateSensor = async (id: number, sensor: SensorEspacial): Promise<SensorEspacial> => {
    try {
        const response = await api.put<SensorEspacial>(`/sensores/${id}`, sensor);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar sensor ${id}:`, error);
        throw error;
    }
};

export const deleteSensor = async (id: number): Promise<void> => {
    try {
        await api.delete(`/sensores/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar sensor ${id}:`, error);
        throw error;
    }
};

export const deleteAlerta = async (id: number): Promise<void> => {
    try {
        await api.delete(`/alertas/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar alerta ${id}:`, error);
        throw error;
    }
};

export const deleteEvento = async (id: number): Promise<void> => {
    try {
        await api.delete(`/eventos/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar evento ${id}:`, error);
        throw error;
    }
};

export default api;