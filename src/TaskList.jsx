import React, { useState, useEffect } from "react";
import "./TaskList.css";
import Icon from "./assets/icon.png";

function TaskList() {
  // Tenta pegar a lista do localStorage e faz tratamento de erros
  const listStorage = localStorage.getItem('List');
  let initialList = [];
  
  try {
    initialList = listStorage ? JSON.parse(listStorage) : [];
  } catch (e) {
    console.error("Failed to parse list from localStorage", e);
  }

  const [list, setList] = useState(initialList);
  const [newItem, setNewItem] = useState("");

  // Atualiza o localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('List', JSON.stringify(list));
  }, [list]);

  // Adiciona um novo item à lista
  function addingItem(form) {
    form.preventDefault();
    if (!newItem) {
      return;
    }
    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem("");
    document.getElementById("input-task").focus();
  }

  // Marca um item como completado ou não
  function clicked(index) {
    const listAux = [...list];
    listAux[index].isCompleted = !listAux[index].isCompleted;
    setList(listAux);
  }

  // Deleta um item específico da lista
  function deleted(index) {
    const listAux = [...list];
    listAux.splice(index, 1);
    setList(listAux);
  }

  // Deleta todos os itens da lista
  function deletedAll() {
    setList([]);
  }

  return (
    <div>
      <h1>Task List</h1>
      <form onSubmit={addingItem}>
        <input
          type="text"
          id="input-task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Inser a task"
        />
        <button className="add" type="submit">Add</button>
      </form>
      <div className="TaskList">
        <div style={{ textAlign: 'center' }}>
          {list.length < 1 
            ? <img className="icon-center" src={Icon} alt="Task Icon"/>
            : list.map((item, index) => (
                <div key={index} className={item.isCompleted ? "item full" : "item"}>
                  <span onClick={() => clicked(index)}>{item.text}</span>
                  <button onClick={() => deleted(index)} className="del">Delete</button>
                </div>
              ))
          }
          {list.length > 0 && 
            <button onClick={deletedAll} className="deleteAll">Delete All</button>
          }
        </div>
      </div>
    </div>
  );
}

export default TaskList;
