import { useState, useEffect } from 'react';
import axios from 'axios';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data));
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (
      persons.some(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
    )
      alert(`${personObject.name} already exists in the directory`);
    else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <main>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={addPerson}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </main>
  );
};

export default App;
