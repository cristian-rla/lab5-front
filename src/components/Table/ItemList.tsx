import { useState, useEffect } from "react";
import Item from "./Item";
import ItemForm from "./itemForm";

interface ItemListProps<T extends {id : number, name: string} & Record<string, any>> {
    itemName : string, 
    emptyItem : Omit<T, 'id'>,
    fetchItems : () => Promise<T[]>,
    updateRecord : (id:number, data:T) => Promise<void>,
    createRecord : (data:Omit<T,'id'>) => Promise<void>,
    deleteRecord : (id:number) => Promise<void>
}

function ItemTable<T extends {id : number, name: string} & Record<string, any>>({itemName, emptyItem, fetchItems, createRecord, updateRecord, deleteRecord} : ItemListProps<T>){
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<T[]|null>(null)
    const [loading, setLoading] = useState<Boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Tuve que agregar una funcion para coordinar  los estados del hijo y el padre.

    async function deleteItem(id:number) {
        if (window.confirm("Do you want to delete this " + itemName.toLowerCase() + "?")) {
            try{
                await deleteRecord(id);
                setError(null)
                loadItems();
            } catch( error ){
                setError('Could not delete the ' + itemName.toLowerCase())
            }
        }
    };
    function focusItemEdit(id : number){
        setEditingId(id);
    }
    function cancelEditing(){
        setEditingId(null)
    }
    async function createItem(data : Omit<T, 'id'>){
        try {
        if(!data.name.trim()){
            setError(`The name of the ${itemName.toLowerCase()} is mandatory`);
            return;
        }
        setError(null);
        await createRecord(data as any);
        await loadItems();
        } catch (error) {
            setError(`Could not create the ${itemName}`);
        }

    }
    async function editItem(id : number, data:T){
        try {
            setEditingId(null);
            await updateRecord(id, data as any); // estoy cansado. Creo que esta funcion deberia ser pasada por el padre. 
            // aqui arrojaria un error si no se pudo actualizar el empleado, pero si se pudo actualizar, entonces actualizo la lista de empleados para que se vea reflejado el cambio.
            await loadItems()
            setError(null);
        } catch (error) {
            setError(`Could not update the ${itemName.toLowerCase()}`);
        }
    }
    async function loadItems(){
        try {
            setLoading(true);
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
        } catch( error ){
            setError(`Error loading the ${itemName.toLowerCase()}`)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadItems();
        console.log(emptyItem)
    }, []);
    
    if(loading) {
        return <div>Loading...</div>
    }
    
    return (
    <div> 
        {items &&
        <table>
            <thead>
                <tr>
                    {Object.keys(items[0]).filter((k)=> k !=='id').map((k) =><th key ={k}>{k}</th>)}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {(!editingId ) && (
                    <>
                        <ItemForm data={emptyItem} mode = "create" submitSuccessful={createItem} />
                        {/* ACA LA DIFERENCIA ES QUE LE PASO LA FUNCION CREATEITEM QUE TAMBIEN RECIBE LOS MISMOS PARAMETROS, ASI QUE LA EJECUTA DESDE EL HIJO */}
                    </>
                )}
            {items.map((item) => {
                return (
                    <>
                        {item.id !== editingId ? 
                        <Item data = {item}
                            deleteFn={deleteItem}
                            editFn={focusItemEdit}
                        /> : 
                        <ItemForm data = {item} mode ="update" submitSuccessful={(formData) => editItem(item.id, {...item, ...formData})} cancelEdit={cancelEditing}/>
                        // AQUI PUSE UNA FUNCION FLECHA PORQUE TENGO QUE USAR COMO PARAMETROS ATRIBUTOS QUE SOLO ME INTERESA QUE ESTA CAPA CONOZCA 
                        // RESULTA QUE LA FUNCION DE SUBMIT SUCCESSFUL AHORA PUEDE PASAR UN PARAMETRO DESDE EL HIJO (formData) PERO APARTE PUEDO USAR PARAMETROS DESDE EL PADRE
                        }
                    </>
            )})}
            </tbody>
        </table>
        }
        {error && <p>{error}</p>}
    </div>)
    
}

export default ItemTable

