// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type Country = {
  id: string;
  name: string;
  capital: string;
  currency: string;
}

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


export type Employee = {
    id: number,
    name : string, 
    email : string, 
    phone : string, 
    role : string
}
export const emptyEmployee = {
  name:"",
  email : "", 
  phone : "", 
  role : ""
}

export type EmployeeUpdate = Omit<Employee, "id">;

export interface EmployeeRepo {
  getEmployees : () => Promise<Employee[]>,
  getEmployeeById : (id : number) => Promise<Employee[]>,
  createEmployee : (employee : EmployeeUpdate) => Promise<void>,
  updateEmployee : (id : number, employeeData : EmployeeUpdate) => Promise<void>,
  deleteEmployee : (id : number) => Promise<void>
}

export const createEmployeeRepo = (prefix:string) : EmployeeRepo => {
  return {
    getEmployees : async () => {
        try {
          const response = await axios.get(`${API_URL}/employees/${prefix}`);
          return response.data;
      } catch (error){
          console.error("Error al obtener los empleados", error);
          throw error;
      }
    },
    getEmployeeById : async (id:number) => {
      try {
        const response = await axios.get(`${API_URL}/employees/${prefix}/${id}`)
        return response.data;
      } catch (error) {
        console.error('Error al obtener el empleado');
        throw error;
      }
    },
    createEmployee : async (employee:EmployeeUpdate) => {
      try {
        const response = await axios.post(`${API_URL}/employees/${prefix}`, employee);
        return response.data;
      } catch (error) {
        console.error(`Error al crear al empleado ${employee}`);
        console.log(error);
        throw error;
      }
    },
    updateEmployee : async (id:number, employeeData : EmployeeUpdate) => {
      try {
        const response = await axios.put(`${API_URL}/employees/${prefix}/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error al actualizar el empleado ${id} con los datos ${employeeData}`);
        throw error;
      }
    },
    deleteEmployee : async (id:number) => {
      try {
        const response = await axios.delete(`${API_URL}/employees/${prefix}/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error al borrar el empleado ${id}`);
        throw error;
      }
    }
  }
}