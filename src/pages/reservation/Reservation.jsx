import React, { useState, useEffect } from "react";

const Reservation = () => {
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [event, setEvent] = useState("");
  const [selectedItem, setSelectedItem] = useState("Select Time");
  const [availableTables, setAvailableTables] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTableId, setSelectedTableId] = useState(""); // State to store selected table id

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      // Ensure date is formatted as YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split("T")[0];

      const response = await fetch(
        "http://localhost:3000/api/reservation/availableTables",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            partySize,
            date: formattedDate,
            event,
            time: selectedItem, // include selected time in the request body
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAvailableTables(data || []); // Ensure availableTables is not undefined
        console.log("Reservation successful");
        // Handle success, maybe show a success message to the user
      } else {
        console.error("Failed to make reservation");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  const handleTableSelection = (selectedTable) => {
    console.log("Selected Table:", selectedTable);
    setSelectedItem(selectedTable.number);
    setSelectedTableId(selectedTable._id);
  };

  const confirmOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          partySize,
          guestInfo: { name, email },
          table: selectedTableId,
          event,
        }),
      });
      if (response.ok) {
        console.log("Reservation confirmed successfully");
      } else {
        console.error("Failed to confirm reservation");
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
    }
  };

  useEffect(() => {
    const fetchAvailableTables = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/reservation/availableTables"
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableTables(data || []);
        } else {
          console.error("Failed to fetch available tables");
        }
      } catch (error) {
        console.error("Error fetching available tables:", error);
      }
    };
    fetchAvailableTables();
  }, []);

  return (
    <form
      onSubmit={handleReservation}
      className="px-8 pt-6 pb-16 mb-4 bg-white rounded shadow-md section-container card"
    >
      <div className="flex flex-col items-center justify-center gap-8 px-4 py-8 space-y-7 md:py-36">
        <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug text-textColor">
          Personalize Your <span className="text-primary">Dine In</span>
        </h2>
      </div>

      <div className="container flex flex-col justify-center py-3 my-8 ">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <label className="input input-bordered bg-slate-200">
            <span className="text-textColor">Party size</span>
            <input
              type="text"
              placeholder="Your name"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
            />
          </label>
          <label className="input input-bordered bg-slate-200">
            <span className="text-textColor">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="w-full dropdown md:w-52">
            <button className="m-1 text-gray-700 bg-gray-200 border-none shadow btn rounded-box">
              {selectedItem}
            </button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box">
              <li>
                <a onClick={() => handleItemClick("Lunch")}>Lunch</a>
              </li>
              <li>
                <a onClick={() => handleItemClick("Breakfast")}>Breakfast</a>
              </li>
              <li>
                <a onClick={() => handleItemClick("Dinner")}>Dinner</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-4">
          {availableTables && availableTables.length > 0 && (
            <h2 className="text-2xl font-bold text-center text-primary">
              Available Tables
            </h2>
          )}
          <div className="flex flex-wrap justify-center">
            {availableTables &&
              availableTables.map((table, index) => (
                <button
                  key={index}
                  className="m-1 text-gray-700 bg-gray-200 btn"
                  onClick={() => handleTableSelection(table)}
                >
                  Table {table.number} - Capacity: {table.capacity}
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="btn bg-slate-200 text-textColor md:w-auto"
          >
            Make a reservation
          </button>
        </div>

        <div className="container flex flex-col justify-center py-3 my-8 ">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <label className="input input-bordered bg-slate-200">
              <span className="text-textColor">Name</span>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered bg-slate-200">
              <span className="text-textColor">Email</span>
              <input
                type="text"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
        </div>

        {selectedTableId && (
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={confirmOrder}
              className="btn bg-slate-200 text-textColor md:w-auto"
            >
              Confirm the reservation
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Reservation;
