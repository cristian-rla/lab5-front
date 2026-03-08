import './Item.css'
interface Item {
    id: number;
    name: string;
}
interface ItemProps {
    data : Item;
    deleteFn : (id: number) => void;
    editFn : (id: number) => void;
}

export default function Item({ data , deleteFn, editFn }: ItemProps) {
    return (
        <tr>
            {Object.entries(data).filter(([key])=> (key !== "id")).map(([key, value]) => (
                <td key={key}>
                    {value}
                </td>

            ))}
            <td>
                <button className="btn btn-primary" onClick={() => editFn(data.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteFn(data.id)}>Delete</button>
            </td>
        </tr>
    )
}

