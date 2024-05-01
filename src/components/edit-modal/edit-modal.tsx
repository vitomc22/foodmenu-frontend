import { useEffect, useState } from "react";
import { deleteData, useFoodDataUpdate } from "../../hooks/useFoodDataMutate";
import { FoodData } from '../../interface/foodData';

import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void;
}

interface ModalProps {
  closeModal(): void;
  id?: number;
  price: number;
  name: string;
  image: string;
}


const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      ></input>
    </>
  );
};


export function EditModal(props: ModalProps) {
  const id = props.id;
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const [image, setImage] = useState(props.image);
  const closeModal = props.closeModal;
  const { mutate, isSuccess, isLoading } = useFoodDataUpdate();



  const submit = () => {
    const foodData: FoodData = {
      id,
      name,
      price,
      image,
    };
    mutate(foodData);
  };

  const remove = () => {
    const foodData: FoodData = {
      id,
      name,
      price,
      image,
    };
    deleteData(foodData);
    closeModal();
  };

  useEffect(() => {
    closeModal();
  }, [isSuccess]);


  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <button onClick={closeModal} className="close">
          &times;
        </button>
        <h2>Editar Item: {props.id}</h2>
        <form className="input-container">
          <Input label="Name" value={name} updateValue={setName} />
          <Input label="Price" value={price} updateValue={setPrice} />
          <Input label="Image" value={image} updateValue={setImage} />
        </form>
        <div className="action-buttons">
          <button onClick={submit} className="button-secondary">
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <button  onClick={remove} className="button-secondary">
            {"Remove"}
          </button>
        </div>

      </div>
    </div>
  );
}
