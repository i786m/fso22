import React from 'react';

const Person = ({ id, name, number }) => {
  return (
    <li key={id}>
      {name} : {number}
    </li>
  );
};

export default Person;
