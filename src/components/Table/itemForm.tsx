import {useState} from "react"

interface ItemFormProps<T extends Record<string, any>> {
    data: Omit<T, 'id'>,
    mode: "create" | "update",
    submitSuccessful: (formData : Omit<T,'id'>) => void, 
    cancelEdit?: () => void
}

function ItemForm<T extends Record<string, any>>({data, mode, submitSuccessful, cancelEdit}: ItemFormProps<T>) {
    const [formData, setFormData] = useState<Omit<T, 'id'>>(data);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData({ ...formData,
            [name] : value
        })
    }
    return (
    <tr>
        {Object.entries(formData).filter(([key]) => key !== 'id').map(([key, value]) => (
            <td key={key}>
                <input id={key} name ={key} value={String(value)} onChange={handleChange} />
            </td>
        ))}
        <td>
        <button type="submit" 
            onClick={(e) => {
                e.preventDefault();
                submitSuccessful(formData);
            }}> 
            {cancelEdit ? 'Accept ' : 'Create '} 
        </button> {/* Este boton al picarle desencadena el submit */}
        {mode === 'update' && (
            <button type="reset" onClick={cancelEdit}>Cancel</button>
        )}
        </td>
    </tr>
  )
}

export default ItemForm;