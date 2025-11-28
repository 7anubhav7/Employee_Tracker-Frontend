import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";
import AddTaskForm from "./components/AddTaskForm";

// Mock data
const initialEmployees = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    tasks: [
      { id: 101, title: "Build login page", status: "Completed" },
      { id: 102, title: "Implement dashboard", status: "In Progress" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Backend Developer",
    tasks: [{ id: 103, title: "API integration", status: "Pending" }],
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "UI/UX Designer",
    tasks: [
      { id: 104, title: "Design system", status: "In Progress" },
      { id: 105, title: "User testing", status: "Pending" },
    ],
  },
];

function App() {
  const [employees, setEmployees] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeView, setActiveView] = useState("dashboard");

  // Load data from localStorage or use initial data
  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees(initialEmployees);
    }
  }, []);

  // Save to localStorage whenever employees change
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);

  // Add new task
  const addTask = (newTask) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === newTask.employeeId) {
        return {
          ...emp,
          tasks: [
            ...emp.tasks,
            {
              id: Date.now(),
              title: newTask.title,
              status: newTask.status,
            },
          ],
        };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  // Update task status
  const updateTaskStatus = (employeeId, taskId, newStatus) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === employeeId) {
        return {
          ...emp,
          tasks: emp.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>Employee Task Tracker</h1>
          <nav className="nav-tabs">
            <button
              className={activeView === "dashboard" ? "active" : ""}
              onClick={() => setActiveView("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={activeView === "employees" ? "active" : ""}
              onClick={() => setActiveView("employees")}
            >
              Employees
            </button>
            <button
              className={activeView === "add-task" ? "active" : ""}
              onClick={() => setActiveView("add-task")}
            >
              Add Task
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {activeView === "dashboard" && <Dashboard employees={employees} />}

        {activeView === "employees" && (
          <>
            <div className="filter-controls">
              <label>Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <EmployeeList
              employees={employees}
              filterStatus={filterStatus}
              onUpdateTaskStatus={updateTaskStatus}
            />
          </>
        )}

        {activeView === "add-task" && (
          <AddTaskForm employees={employees} onAddTask={addTask} />
        )}
      </main>
    </div>
  );
}

export default App;
