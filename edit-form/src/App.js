import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { userSchema } from "./Validations/UserValidation";
// import Table from 'react-bootstrap/Table';
import { AddToLocalStorage} from './addToLocalStorage'

function App() {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 3);
  const [people, setPeople] = AddToLocalStorage("key", []);
  const [person, setPerson] = useState(() => {
    return {
      id: "",
      name: "",
      age: "",
    };
  });

  const { name, age } = person;

  const handleOnEdit = (id, data) => {
    setPeople((prevPeople) => {
      const index = prevPeople.findIndex(person => person.id === id);
      const newPeople = [...prevPeople];
      newPeople[index] = data;
      
      return newPeople;
    })
  }

  const onDelete = (id) => {
    setPeople((prevPeople) => {
      const newPeople = prevPeople.filter(person => person.id !== id);
      
      return newPeople;
    })
  }

  const handleOnChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value, id: small_id });
    console.log(person);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setPeople([...people, person]);
    setPerson({ name: "", age: "" });

    console.log(person);
  };

  useEffect(() => {
    console.log(people);
  }, [people]);

  return (
    <div>
      <PeopleList people={people} handleOnEdit={handleOnEdit} onDelete={onDelete} />
      <div className="App">
        <form onSubmit={handleOnSubmit}>
          <input
            placeholder="Enter Your name..."
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            required
          ></input>
          <input
            placeholder="Enter Your age..."
            type="text"
            name="age"
            value={age}
            onChange={handleOnChange}
            required
          ></input>
          <button>OK</button>
        </form>
      </div>
    </div>
  );
}

function PeopleList ({ people, handleOnEdit, onDelete }) {
  return (
    <div className="mx-auto">

      <table striped bordered hover className="mx-auto">
        <thead>
          <tr>
            <th> Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        {people && people.map((data) => <TableContent key={data.id} data={data} handleOnEdit={handleOnEdit} onDelete={onDelete} />)}
      </table>
    </div>
  );
};

function TableContent ({ data, handleOnEdit, onDelete }) {
  const { id, name, age } = data;
  const [editable, setEditable] = useState(true);
  const [cacheData, setCacheData] = useState(null);
  // const [datas, setDatas] = useState({
  //   name,
  //   age,
  //   id,
  // });

  const handleOnChange = (e) => {
    // setDatas({ ...datas, [e.target.name]: e.target.value });
    handleOnEdit(id, {...data, [e.target.name]: e.target.value});
  };

  const handleEdit = () => {
    setCacheData(data);
    setEditable(!editable);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleSave = () => {
    setEditable(true);
  }

  const handleCancel = () => {
    console.log(cacheData);
    handleOnEdit(id, cacheData);
    setEditable(true);
  }

  return (
    <tbody key={id}>
      <tr>
        <td>
          {" "}
          <input
            readOnly={editable}
            placeholder="Enter Your name..."
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            required
          ></input>
        </td>
        <td>{age}</td>
        <td>
          {editable && (<><button onClick={handleEdit}>Edit</button><button onClick={handleDelete}>delete</button></>)}
          {!editable && (<><button onClick={handleSave}>save</button><button onClick={handleCancel}>cancel</button></>)}

          
        </td>
      </tr>
    </tbody>
  );
};

export default App;
