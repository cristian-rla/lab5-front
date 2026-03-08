import {useState} from "react"

interface ItemFormProps<T extends {id:number} & Record<string, any>> {
    itemName: string,
    data: T,
    mode: "create" | "update",
    submitSuccessful: (id:number, data:T) => void, 
    cancelEdit?: () => void
}

function ItemForm<T extends {id:number} & Record<string, any>>({itemName, data, mode, submitSuccessful, cancelEdit}: ItemFormProps<T>) {
    const [formData, setFormData] = useState<T>(data);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData({ ...formData,
            [name] : value
        })
    }
    return (
    <>
      <h3>{mode === 'update' ? 'Edit ' : 'Create '} {itemName}</h3>
      <form className ="form-group" onSubmit={(e) => {
        e.preventDefault();
        submitSuccessful(formData.id, formData);

      }}> {/* No se si esto es lo mejor, pero asi no tengo que escribir un form para cada tipo de item. Solo tengo que pasarle el item y el nombre del item para mostrarlo en el titulo. Antes, como lo ponia en un fragment, como que no tenian el estilo de inline block que al parecer se renderizo al cambiar a div */}
        {Object.entries(formData).filter(([key]) => key !== 'id').map(([key, value]) => (
            <div key={key}>
                <label htmlFor={key}>{key}:</label>
                <input id={key} name ={key} value={String(value)} onChange={handleChange} />
            </div>
        ))}
        <button type="submit"> {cancelEdit ? 'Edit ' : 'Create '} </button> {/* Este boton al picarle desencadena el submit */}
        {mode === 'update' && (
            <button type="reset" onClick={cancelEdit}>Cancel</button>
        )}
      </form>
    </>
  )
}

export default ItemForm;