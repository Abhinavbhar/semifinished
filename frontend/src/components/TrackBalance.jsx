import React from 'react';

const TrackBalance = () => {
  return (
    <div className="flex justify-start items-start h-screen mt-10">
      {/* Outlined box taking 25% of the screen with editable background */}
      <div className="w-2/6 h-2/4 ml-60 p-4 border border-black rounded-lg" style={{ 
        backgroundImage: "url('/src/assets/back_track.jpg')",
        backgroundSize: "cover" }}>
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-7 ml-20 mt-5">Track Balance</h1>
        {/* Light blue box */}
        <div className="bg-blue-100 p-4 rounded-lg mb-4 ml-10 mt-10 mr-20">
          {/* "You owe" */}
          <p className="text-red-500 text-2xl ml-10">You owe :<span className="ml-4">$69.00</span></p>
          {/* "You are owed" */}
          <p className="text-xl ml-10">You are owed: $420.00 + $20.00</p>
        </div>
        {/* List of people */}
        <ul className='mt-10'>
          <li className="mb-4">
            <span className="font-bold text-2xl ml-10">Ele Phant : </span>
            <span className=" text-xl ml-2">you owe</span>
            <span className="ml-10 text-2xl text-red-400">$32.21</span>
          </li>
          <li className="mb-4">
            <span className="font-bold text-2xl ml-10">Fish Man :</span>
            <span className="text-xl ml-5">owes you</span>
            <span className="ml-9 text-2xl text-yellow-500">$22.00</span>
          </li>
          <li className="mb-4">
            <span className="font-bold text-2xl ml-10">Dino Sor :</span>
            <span className="text-xl ml-6 text-green-400">settled up</span>
          </li>
        </ul>
        {/* View more */}
        <p className="text-blue-500 cursor-pointer ml-5">View more</p>
      </div>
    </div>
  );
};

export default TrackBalance;
