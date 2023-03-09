import { useState, useEffect } from 'react';

//components
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

//services
import numberService from './services/numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  //initial render
  useEffect(() => {
    numberService.getAll().then(initialNumbers => setPersons(initialNumbers));
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    //check if contact exists in directory
    const personExists = persons.some(
      p => p.name.toLowerCase() === newName.toLowerCase()
    );

    //add contact if not in directory

    if (!personExists) {
      numberService
        .addContact(personObject)
        .then(returnedContact => setPersons(persons.concat(returnedContact)));
      console.log(newName, 'added');
      setNewName('');
      setNewNumber('');
    }

    // update contact if existing in directory
    else {
      const existingId = persons.find(
        p => p.name.toLowerCase() === newName.toLowerCase()
      ).id;

      window.confirm(
        `${personObject.name} already exists in the directory. Would you like to update the number`
      ) &&
        numberService
          .updateContact(existingId, personObject)
          .then(returnedPerson =>
            setPersons(
              persons.map(person =>
                person.id === existingId ? returnedPerson : person
              )
            )
          );
      setNewName('');
      setNewNumber('');
      console.log(existingId, 'updated');
    }
  };

  //delete contact
  const handleDelete = id => {
    const deletedName = persons.find(p => p.id === id).name;
    window.confirm(
      `Are you sure you want to delete ${deletedName} permanently?`
    ) &&
      numberService
        .deleteContact(id)
        .then(setPersons(persons.filter(p => p.id !== id)));
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </main>
  );
};

export default App;
