import React, { useState, useEffect } from 'react';
import './App.css';
import { hello_backend } from 'declarations/hello_backend';

function App() {
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      await update();
    }
    fetchBalance();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector("#submit-btn");
    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    button.setAttribute("disabled",true);

    if(document.getElementById("input-amount").value.length !=0)
    {
      await hello_backend.topUp(inputAmount);
    }

    if(document.getElementById("withdrawal-amount").value.length !=0)
      {
        await hello_backend.withdraw(withdrawalAmount);
      }

      await hello_backend.compound();
    
     await update();
    document.getElementById("input-amount").value ="";
    document.getElementById("withdrawal-amount").value ="";
    button.removeAttribute("disabled");
  };

  async function update(){
    const updatedBalance = await hello_backend.checkBalance();
    setCurrentAmount(Math.round(updatedBalance * 100) / 100);
  }

  return (
    <main>
      <div className="container">
        <img src='dbank_logo.jpeg' alt="DBank logo" width={100} />
        <h1>
          Current Balance: ${currentAmount}
        </h1>
        <div className="divider" />
        <form onSubmit={handleSubmit}>
          <h2>Amount to Top Up</h2>
          <input
            id="input-amount"
            type="number"
            step="0.01"
            min={0}
            name="topUp"
          />
          <h2>Amount to Withdraw</h2>
          <input
            id="withdrawal-amount"
            type="number"
            name="withdraw"
            step="0.01"
            min={0}
          />
          <input
            id="submit-btn"
            type="submit"
            value="Finalise Transaction"
          />
        </form>
      </div>
    </main>
  );
}

export default App;
