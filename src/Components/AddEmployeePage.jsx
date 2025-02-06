import React, { useState } from "react";

const AddEmployeePage = ({ addEmployee }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Success message state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear any previous messages
    setError("");
    setSuccess("");

    // Validation: Check if all fields are filled
    if (!name || !email || !department || !designation) {
      setError("All fields are required!");
      return;
    }

    // Create a new employee object
    const newEmployee = { name, email, department, designation };

    // Add the new employee using the addEmployee function passed from the parent
    addEmployee(newEmployee);

    // Show success message
    setSuccess("Employee added successfully! 🎉");

    // Clear form fields after submission
    setName("");
    setEmail("");
    setDepartment("");
    setDesignation("");

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Add New Employee</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}{" "}
      {/* ✅ Success message */}
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 mt-1"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 mt-1"
        />
      </div>
      <div>
        <label>Department</label>
        <input
          type="text"
          value={department}
          placeholder="Enter Your Department"
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 w-full mb-4 mt-1"
        />
      </div>
      <div>
        <label>Designation</label>
        <input
          type="text"
          value={designation}
          placeholder="Enter Your Designation"
          onChange={(e) => setDesignation(e.target.value)}
          className="border p-2 w-full mb-4 mt-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeePage;
