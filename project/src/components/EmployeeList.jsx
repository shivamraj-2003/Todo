import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmployees } from '../store';
import axios from 'axios';

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api?results=10'); 
        dispatch(setEmployees(response.data.results)); 
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-2xl border-t-4 border-blue-500">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Employee List</h1>

        {employees.length === 0 ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {employees.map((employee) => (
              <li
                key={employee.login.uuid}
                className="p-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-md shadow-lg flex justify-between items-center hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={employee.picture.thumbnail}
                    alt={`${employee.name.first} ${employee.name.last}`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">{employee.name.first} {employee.name.last}</h3>
                    <p>Age: {employee.dob.age}</p>
                    <p>Location: {employee.location.city}, {employee.location.state}, {employee.location.country}</p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => alert(`Contact: ${employee.email}`)}
                >
                  Contact
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
