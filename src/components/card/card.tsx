import { useState } from "react";
import { EditModal } from "../edit-modal/edit-modal";
import "./card.css"

interface CardProps {
    id?: number;
    price: number,
    name: string,
    image: string
}



export function Card(props: CardProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }
    return (
        <div className="card" onDoubleClick={handleOpenModal}>
            <img src={props.image} />
            <h2>{props.name}</h2>
            <p><b>Valor: {props.price}</b></p>
            <p><b>Código: {props.id}</b></p>
            {isModalOpen && <EditModal id={props.id} image={props.image} name={props.name} price={props.price} closeModal={handleOpenModal} />}
        </div>
    )
}