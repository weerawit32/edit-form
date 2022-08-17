import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [person, setPerson] = useState(() => {
    return {
      id: "",
      name: "",
      age: "",
    };
  });

  const { id, name, age } = person;

  const handleOnChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(person);
  };

  return (
    <div className="App">
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder="Enter Your name..."
          type="text"
          name="name"
          value={name}
          onChange={handleOnChange}
        ></input>
        <input
          placeholder="Enter Your age..."
          type="text"
          name="age"
          value={age}
          onChange={handleOnChange}
        ></input>
        <button>OK</button>
      </form>
    </div>
  );
}

export default App;
