import React from 'react';

const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.flags.alt} />
      <p>
        {country.name.common} has a population of {country.population} and an
        area of {country.area} km<sup>2</sup>.
      </p>
      <p>The capital is {country.capital}.</p>
      <p>The languages spoken in {country.name.common} include:</p>
      <ul>
        {Object.entries(country.languages).map(lang => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>
    </>
  );
};

export default Country;
