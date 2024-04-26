import axios from 'axios';
import React, { useState } from 'react';

const AddExpenses = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [calculated, setCalculated] = useState([]);
  const [calculateExpense, setCalculateExpense] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [description, setDescription] = useState('');

  const handleToggleForm = () => {
    setShowForm(!showForm);
    console.log(calculateExpense);
  };

  const addUser = (event) => {
    event.preventDefault();
    const newUserName = event.target.elements.userName.value.trim();
    const newAmount = event.target.elements.amount.value.trim();

    if (newUserName && newAmount) {
      setUsers([...users, { name: newUserName, amount: newAmount }]);
      event.target.elements.userName.value = '';
      event.target.elements.amount.value = '';
    } else {
      alert('Please enter a user name and amount.');
    }
  };

  const removeUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = { users, description, totalAmount };
  
      const sendExpense = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/split`, data, {
        headers: { authorization: token }
      });
  
      if (sendExpense.status === 200 || sendExpense.status === 201) {
        alert("Expense added successfully");
        console.log(sendExpense.data);
        window.location.href = '/dashboard';
      } else {
        alert("Failed to add expense. Please try again.");
        console.error(sendExpense.data);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handleCalculateExpense = () => {
    if (users.length === 0) {
      alert('Please add at least one user with an expense amount.');
      return;
    }

    setCalculateExpense(true);
    const totalAmount = users.reduce((acc, user) => acc + parseFloat(user.amount), 0);
    setTotalAmount(totalAmount); // Update the totalAmount state
    const averageExpense = users && users.length > 0 ? totalAmount / users.length : 0;

    // Calculate balance for each user
    const balances = users.map(user => ({
      name: user.name,
      balance: parseFloat(user.amount) - averageExpense
    }));

    // Determine payments
    const payments = [];
    let sortedBalances = [...balances].sort((a, b) => a.balance - b.balance);
    let i = 0;
    let j = sortedBalances.length - 1;

    while (i < j) {
      const debtor = sortedBalances[i];
      const creditor = sortedBalances[j];
      const paymentAmount = Math.min(Math.abs(debtor.balance), creditor.balance);

      if (paymentAmount > 0) {
        payments.push({
          from: debtor.name,
          to: creditor.name,
          amount: paymentAmount
        });

        debtor.balance += paymentAmount;
        creditor.balance -= paymentAmount;

        if (debtor.balance === 0) {
          i++;
        }
        if (creditor.balance === 0) {
          j--;
        }
      }
    }

    setCalculated(payments);
  };

  return (
    <div className="flex justify-end h-screen item-start">
      <div
        className="w-2/6 h-2/4 mr-40 p-4 border border-black rounded-lg"
        style={{
          backgroundImage: "url('/src/assets/back_track.jpg')",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-4xl font-bold mb-7 ml-20 mt-5">Add Expenses</h1>
        <div className="flex items-center mb-4">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter a Description"
            className="border border-gray-400 rounded-md px-2 py-1 ml-2"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {showForm && (
          <form onSubmit={addUser} className="mt-5 ml-20">
            <div className="flex items-center mb-4">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter User Name"
                className="border border-gray-400 rounded-md px-2 py-1 ml-2"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter Amount"
                className="border border-gray-400 rounded-md px-2 py-1 ml-10"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Add User
            </button>
            {users.length > 0 && (
              <ul className="list-none mt-4 ml-2">
                {users.map((user, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span>{user.amount} - </span>
                    {user.name}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md ml-10"
                      onClick={() => removeUser(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </form>
        )}

        {!showForm && (
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md ml-20" onClick={handleToggleForm}>
            +
          </button>
        )}

        {calculateExpense ? (
          <div className="mt-4 ml-20">
            <h2 className="text-xl font-bold">Calculated Expenses:</h2>
            <ul className="list-none">
              {calculated.map((payment, index) => (
                <li key={index}>
                  {payment.from} owes {payment.to} {payment.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}

        <div className="mt-4 ml-20">
          <h2 className="text-xl font-bold">Total Expense:</h2>
          <p>{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Improved buttons design */}
      <div className="flex flex-col justify-center items-center mr-8">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-md mb-4"
          onClick={handleCalculateExpense}
        >
          Calculate Expense
        </button>
        <button
          className="bg-green-500 text-white px-5 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Add to History
        </button>
      </div>
    </div>
  );
};

export default AddExpenses;