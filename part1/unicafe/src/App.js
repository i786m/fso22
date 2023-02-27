import React, { useState } from 'react';


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics=({good,neutral,bad})=>{
  const total = good + neutral + bad;

  const average = ((good - bad) / total).toFixed(2);

  const positive = ((good / total) * 100).toFixed(2) + ' %';

  if(!total){return(<p>No Feedback Given</p>)}
  
  return(
    <table>
        <tbody>
          <StatisticsLine text='Good' value={good} />
          <StatisticsLine text='Neutral' value={neutral} />
          <StatisticsLine text='Bad' value={bad} />
          <StatisticsLine text='All' value={total} />
          <StatisticsLine text='Average' value={average} />
          <StatisticsLine text='Positive' value={positive} />
        </tbody>
      </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = value => () => {
    if (value === 'good') {
      setGood(good + 1);
    } else if (value === 'neutral') {
      setNeutral(neutral + 1);
    } else if (value === 'bad') {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={feedback('good')} text='Good' />
      <Button handleClick={feedback('neutral')} text='Neutral' />
      <Button handleClick={feedback('bad')} text='Bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />     
    </div>
  );
};

export default App;
