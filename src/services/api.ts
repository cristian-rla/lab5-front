// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";
 
export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los países:", error);
    throw error;
  }
};
export const getCountry = async (id : string) => {
  try {
    const response = await axios.get(`${API_URL}/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el país:", error);
    throw error;
  }
};
export const createCountry = async (country : { name: string; capital: string; currency: string }) => {
  try {
    const response = await axios.post(`${API_URL}/countries`, country);
    return response.data;
  } catch (error) {
    console.error("Error al crear el país:", error);
    throw error;
  }
};
export const updateCountry = async (id : string, country : { name: string; capital: string; currency: string }) => {
  try {
    const response = await axios.put(`${API_URL}/countries/${id}`, country);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el país:", error);
    throw error;
  }
};
export const deleteCountry = async (id : string) => {
  try {
    const response = await axios.delete(`${API_URL}/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el país:", error);
    throw error;
  }
};


type Employee = {
    id: number,
    name : string, 
    email : string, 
    phone : string, 
    role : string
}

export type EmployeeUpdate = Omit<Employee, "id">;


export const getEmployees = async () =>{
    try {
        const response = await axios.get(`${API_URL}/employees`);
        return response.data;
    } catch (error){
        console.error("Error al obtener los empleados", error);
        throw error;
    }
}

export const getEmployeeById = async (id:number) => {
    try {
        const response = await axios.get(`${API_URL}/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener empleado", error);
        throw error;
    }
}

export const createEmployee = async (employee : EmployeeUpdate) => {
    try {
        const response = await axios.post(`${API_URL}/employees`, employee);
        return response.data;
    } catch (error) {
        console.error("Error al crear empleado", error);
        throw error;
    }
}
export const updateEmployee = async (id : number, employee : EmployeeUpdate) => {
    try {
        const response = await axios.put(`${API_URL}/employees/${id}`, employee)
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el empleado", error);
        throw error;
    }
};
export const deleteEmployee = async (id : number) => {
    try{
        const response = await axios.delete(`${API_URL}/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el empleado", error);
        throw error;
    }
}