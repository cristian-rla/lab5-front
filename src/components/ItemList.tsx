import { useState, useEffect } from "react";
import Item from "./Item";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee, type EmployeeUpdate } from "../services/api";
import ItemForm from "./itemForm";

function ItemList<T extends {id : number, name: string} & Record<string, any>>(){
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<T[]|null>(null)
    const [loading, setLoading] = useState<Boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    async function deleteItem(id:number) {
        if (window.confirm("¿Estás seguro de que quieres eliminar este país?")) {
            try{
                await deleteEmployee(id);
                setError(null)
                setItems(items?.filter((item) => item.id !== id) || null);
            } catch( error ){
                setError('No se pudo eliminar el empleado')
            }
        }
    };
    function focusItemEdit(id : number){
        setEditingId(id);
    }
    function cancelEditing(){
        setEditingId(null)
    }
    async function addEmployee(_ : number, data : T){
        try {
        if(!data.name.trim()){
            setError("El nombre del empleado es obligatorio");
            return;
        }
        setError(null);
        await createEmployee(data as any);
        setItems(items ? [...items, data] : [data]);
        } catch (error) {
            setError("No se pudo crear el empleado");
        }

    }
    async function editItem(id : number, employee:T){
        try {
        setEditingId(null);
        await updateEmployee(id, employee as any); // estoy cansado. Creo que esta funcion deberia ser pasada por el padre. 
        // aqui arrojaria un error si no se pudo actualizar el empleado, pero si se pudo actualizar, entonces actualizo la lista de empleados para que se vea reflejado el cambio.
        setItems(items?.map((item) => item.id === id ? employee : item) || null);
        setError(null);
        } catch (error) {
            setError("No se pudo actualizar el empleado");
        }
    }

    async function fetchEmployees(){
        try {
            setLoading(true);
            const employees = await getEmployees();
            setItems(employees);
        } catch( error ){
            setError("Error al cargar empleados")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {fetchEmployees()}, []);

    if(loading) return (<p>Cargando...</p>)
    if(error) return (
    <>
        <p>{error}</p>
        <button onClick={() => {
            setError(null);
        }}>Reintentar</button>
    </>
    
    )
    if(!items) return (<p>No hay empleados</p>)

    return (
    <> {!editingId && (
        <>
            <ItemForm itemName="Employee" data={{id: 0, name: "", email: "", phone: "", role: ""} as any} submitSuccessful={addEmployee} />
        </>
    )}
        {items?.map((item) => {
            return (
                <div key={item.id}>
                {item.id !== editingId ? 
                <Item data = {item}
                    deleteFn={deleteItem}
                    editFn={focusItemEdit}
                 /> : 
                <ItemForm  itemName = {"Employee"} data = {item} submitSuccessful={editItem} cancelEdit={cancelEditing}/>
                }</div>
            )})}
        {error && <p>{error}</p>}
    </>)
    
}

export default ItemList

