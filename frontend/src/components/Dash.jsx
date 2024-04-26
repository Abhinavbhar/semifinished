import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dash() {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/split`, {
          headers: {
            authorization: token,
          }
        });
        console.log(response.data)
        setExpenses(response.data.expense);
        setTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Expenses History</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">S No</th>
              <th className="py-2 px-4 bg-gray-100">Description</th>
              <th className="py-2 px-4 bg-gray-100">Expense Settled</th>
              <th className="py-2 px-4 bg-gray-100">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{expense.description || 'No description'}</td>
                <td className={`py-2 px-4 ${expense.isSettled ? 'text-green-600' : 'text-red-600'}`}>
                  {expense.isSettled ? 'Settled' : 'Unsettled'}
                </td>
                <td className="py-2 px-4">{expense.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold">Total Amount: {totalAmount}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View More</button>
        <Link to={'createexpense'} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add Expense</Link>
      </div>
    </div>
  );
}

export default Dash;