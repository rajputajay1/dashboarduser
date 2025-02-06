import React, { useState, useEffect } from "react";

const EmployeePageContainer = ({ employees, onSearch, onDepartmentFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  useEffect(() => {
    // Apply search filter when search term changes
    const filteredByName = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filteredByName);
  }, [searchTerm, employees]);

  useEffect(() => {
    // Apply department filter when selected department changes
    if (selectedDepartment === "All") {
      setFilteredEmployees(employees);
    } else {
      const filteredByDepartment = employees.filter(
        (emp) => emp.department === selectedDepartment
      );
      setFilteredEmployees(filteredByDepartment);
    }
  }, [selectedDepartment, employees]);

  const departments = [
    "All",
    ...new Set(employees.map((emp) => emp.department)),
  ];

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-[#303234] text-lg font-semibold text-center bg-[#F3F6FA] py-3 rounded">
          Employee List
        </h2>

        {/* Search & Filter Section */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            className="border p-2 rounded-lg w-full sm:w-[300px]"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-[200px]"
          >
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Responsive Table with Horizontal Scroll */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse table-auto min-w-[600px]">
            <thead className="bg-[#F3F6FA]">
              <tr>
                <th className="border px-4 py-2 text-left">SR No</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Department</th>
                <th className="border px-4 py-2 text-left">Designation</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{employee.name}</td>
                    <td className="border px-4 py-2">{employee.email}</td>
                    <td className="border px-4 py-2">{employee.department}</td>
                    <td className="border px-4 py-2">{employee.website}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeePageContainer;
