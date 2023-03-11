import React from 'react';

const Filter = ({ filter, onChange }) => {
  return (
    <p>
      Find countries : <input type='text' value={filter} onChange={onChange} />
    </p>
  );
};

export default Filter;