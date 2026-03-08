import { useState } from 'react'

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
        <div>
            <h3>{data.name}</h3>
            <ul>
                {Object.entries(data).filter(([key])=> (key !== "name" && key !== "id")).map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}:</strong> {value}
                    </p>

                ))}
                <div>
                    <button className="btn btn-primary" onClick={() => editFn(data.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteFn(data.id)}>Eliminate</button>
                </div>
            </ul>
        </div>
    )
}

