import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import EmployeePageContainer from "./Components/EmployeePageContainer";
import AddEmployeePage from "./Components/AddEmployeePage";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState(new Set(["All"]));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial employee data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const employeesData = response.data.map((emp) => ({
          ...emp,
          department: emp.company.name, // Assuming company name is the department
        }));
        setEmployees(employeesData);
        setFilteredEmployees(employeesData); // Initial filtered list will be the same as the full list

        // Add departments to the department filter list
        const initialDepartments = new Set(["All", ...employeesData.map((emp) => emp.department)]);
        setDepartments(initialDepartments);
      } catch (error) {
        setError("Error fetching employee data. Please try again later.");
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Add a new employee to the existing list
  const addEmployee = (newEmployee) => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department || !newEmployee.designation) {
      alert("All fields are required!");
      return;
    }

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);

    // Add new employee's department to the department filter
    setDepartments((prevDepartments) => new Set([...prevDepartments, newEmployee.department]));
  };

  // Handle filtering by name or department
  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filteredByName = employees.filter((emp) =>
      emp.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredEmployees(filteredByName);
  };

  const handleDepartmentFilter = (selectedDepartment) => {
    if (selectedDepartment === "All") {
      setFilteredEmployees(employees);
    } else {
      const filteredByDepartment = employees.filter(
        (emp) => emp.department === selectedDepartment
      );
      setFilteredEmployees(filteredByDepartment);
    }
  };

  return (
    <>
      <Header />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      <Routes>
        <Route
          path="/"
          element={
            <EmployeePageContainer
              employees={filteredEmployees}
              onSearch={handleSearch}
              onDepartmentFilter={handleDepartmentFilter}
              departments={Array.from(departments)} // Convert Set to array for rendering in dropdown
            />
          }
        />
        <Route
          path="/add-employee"
          element={<AddEmployeePage addEmployee={addEmployee} />}
        />
      </Routes>
    </>
  );
};

export default App;
