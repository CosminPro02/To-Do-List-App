import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskEditIndex, setTaskEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  function handleAdaugare() {
    if (task.trim() !== "") {
      setList((list) => [...list, task]);
      setTask("");
    } else {
      alert("camp necompletat");
    }
  }

  function handleFinalizare(index) {
    if (completedTasks.includes(index)) {
      setCompletedTasks((prev) => prev.filter((_, i) => i !== index));
    } else {
      setCompletedTasks((prev) => [...prev, index]);
    }
  }

  function handleStergere(index) {
    setList(list.filter((_, i) => i !== index));
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    setTaskEditIndex(null);
  }

  function handleEditIndex(index) {
    setTaskEditIndex(index);
    setEditedText(list[index]);
  }

  function handleEdit() {
    if (editedText.trim() !== "") {
      const updateList = [...list];
      updateList[taskEditIndex] = editedText;
      setList(updateList);
      setTaskEditIndex(null);
      setEditedText("");
    } else alert("camp gol");
  }

  return (
    <>
      <div className="background-image flex flex-col items-center">
        <div className="w-[500px] mt-25">
          <h1 className="text-4xl text-left mb-4">TO DO LIST</h1>
          <div className="flex mb-10">
            {taskEditIndex === null ? (
              <>
                <input
                  className="w-[400px] h-[60px] border-1 p-3 outline-none rounded-[25px] border-r-transparent rounded-r-none text-2xl bg-white text-black border-transparent"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  maxLength={50}
                ></input>
                <button
                  className="border-1 h-[60px] p-3 rounded-[25px] border-l-transparent rounded-l-none text-xl cursor-pointer bg-white text-black border-transparent"
                  onClick={handleAdaugare}
                >
                  Add
                </button>
              </>
            ) : (
              <>
                <input
                  className="w-[400px] h-[60px] border-1 p-3 outline-none rounded-[25px] border-r-transparent rounded-r-none text-2xl bg-white text-black border-transparent"
                  value={editedText}
                  onChange={(event) => setEditedText(event.target.value)}
                ></input>
                <button
                  className="border-1 h-[60px] p-3 rounded-[25px] border-l-transparent rounded-l-none text-xl bg-white text-black border-transparent"
                  onClick={handleEdit}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
        {list.length !== 0 && (
          <div className="flex justify-center mt-6">
            <ul className="text-black space-y-4 bg-white backdrop-opacity-30 w-[800px] p-[20px] rounded-[15px] shadow-md hover:shadow-xl transition-shadow justify-between items-center">
              {list.map((sarcina, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center gap-4 p-3 border-b border-gray-400 min-h-[50px]"
                >
                  <span
                    onClick={() => handleFinalizare(index)}
                    className={`text-4xl cursor-pointer break-words flex-1 overflow-ellipsis overflow-hidden leading-normal ${
                      completedTasks.includes(index) ? "text-gray-500" : ""
                    }`}
                  >
                    {sarcina}
                  </span>
                  <button
                    className="border-2 p-2 ml-5 cursor-pointer ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleStergere(index)}
                  >
                    delete
                  </button>
                  <button
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-color"
                    onClick={() => handleEditIndex(index)}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
