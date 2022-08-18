import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { userSchema } from "./Validations/UserValidation";
// import Table from 'react-bootstrap/Table';

function App() {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 3);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(() => {
    return {
      id: "",
      name: "",
      age: "",
    };
  });

  const { name, age } = person;

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
      <PeopleList people={people} />
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

const PeopleList = ({ people }) => {
  return (
    <table striped bordered hover>
      <thead>
        <tr>
          <th> Name</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      {people && people.map((data) => <TableContent data={data} />)}
    </table>
  );
};

const TableContent = ({ data }) => {
  const { id, name, age } = data;
  const [editable, setEditable] = useState(true);
  const [cacheData, setCacheData] = useState({});
  // const [datas, setDatas] = useState({
  //   name,
  //   age,
  //   id,
  // });

  const handleOnChange = (e) => {
    // setDatas({ ...datas, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    // setCacheData(perso)
    setEditable(!editable);
  };

  const handleDelete = () => {};

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
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>delete</button>
        </td>
      </tr>
    </tbody>
  );
};

export default App;
