// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/countries";
export const getCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los países:", error);
    throw error;
  }
};
export const getCountry = async (id : string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el país:", error);
    throw error;
  }
};
export const createCountry = async (country : { name: string; capital: string; currency: string }) => {
  try {
    const response = await axios.post(API_URL, country);
    return response.data;
  } catch (error) {
    console.error("Error al crear el país:", error);
    throw error;
  }
};
export const updateCountry = async (id : string, country : { name: string; capital: string; currency: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, country);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el país:", error);
    throw error;
  }
};
export const deleteCountry = async (id : string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el país:", error);
    throw error;
  }
};