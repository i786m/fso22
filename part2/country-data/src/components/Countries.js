import React from 'react';
import Country from './Country';

const Countries = ({ countries, setFilter,  filter }) => {
  
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()))

   if(!filter){
    return 'Please specify a filter to begin'
   }else if(filter&&!filteredCountries.length){
    return 'No countries satisfy the given criteria'
   }else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else if (filteredCountries.length <= 10) {
    return (
      <>
        <ul>
          {filteredCountries.map(country => (
            <li key={country.ccn3}>{country.name.common}
            <button onClick={()=>setFilter(country.name.common)}>Show</button></li>
          ))}
        </ul>
      </>
    );
  } else {
    return 'Too many matches, specify another filter';
  }
};

export default Countries;
