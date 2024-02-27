import { useState } from "react";
import "./App.css";
import { Card } from "./components/card/card";
import { useFoodData } from "./hooks/useFoodData";
import { CreateModal } from "./components/create-modal/create-modal";

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return <div className="container">
    <h1>Cardápio</h1>
    <div className="card-grid">
      {data?.map(foodData =>
        <Card
          key={foodData.id}
          id={foodData.id}
          price={foodData.price}
          name={foodData.name}
          image={foodData.image}          
        />

      )}
    </div>
    {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
    <button onClick={handleOpenModal}>Novo</button>
  </div>;
}

export default App;
