import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

//state 

const [filter, setFilter] = useState('')
const [countries,setCountries]=useState(null)
  const handleFilterChange = event => {
    setFilter(event.target.value);
  };
  
useEffect(() => {
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response=>setCountries(response.data))
}, [])


  return (
    <>
    <main>
      <h1>Data for Countries</h1>
      <Filter filter={filter} onChange={handleFilterChange} />
      {countries ? <Countries  countries={countries} filter={filter}/> : null}
    </main>
    </>
  )
}

export default App