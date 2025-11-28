import React, { useState } from "react";

const AddTaskForm = ({ employees, onAddTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    employeeId: "",
    status: "Pending",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.employeeId) {
      alert("Please fill in all required fields");
      return;
    }

    // Create new task object
    const newTask = {
      title: formData.title.trim(),
      employeeId: parseInt(formData.employeeId),
      status: formData.status,
    };

    // Call parent function to add task
    onAddTask(newTask);

    // Reset form and show success message
    setFormData({
      title: "",
      employeeId: "",
      status: "Pending",
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Get selected employee name for preview
  const getSelectedEmployeeName = () => {
    const employee = employees.find(
      (emp) => emp.id === parseInt(formData.employeeId)
    );
    return employee ? employee.name : "";
  };

  return (
    <div className="add-task-form">
      <div className="card">
        <div className="card-header">
          <h2>Add New Task</h2>
        </div>
        <div className="card-body">
          {showSuccess && (
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#d4edda",
                color: "#155724",
                border: "1px solid #c3e6cb",
                borderRadius: "4px",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              ✅ Task added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="employeeId">Assign to Employee *</label>
              <select
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Task Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter task description..."
                required
                maxLength={100}
              />
              <small style={{ color: "#666", fontSize: "0.875rem" }}>
                {formData.title.length}/100 characters
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Task Preview */}
            {formData.title && formData.employeeId && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                }}
              >
                <h4 style={{ marginBottom: "0.5rem" }}>Task Preview:</h4>
                <p>
                  <strong>Employee:</strong> {getSelectedEmployeeName()}
                </p>
                <p>
                  <strong>Task:</strong> {formData.title}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`status-badge ${
                      formData.status === "Pending"
                        ? "status-pending"
                        : formData.status === "In Progress"
                        ? "status-in-progress"
                        : "status-completed"
                    }`}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {formData.status}
                  </span>
                </p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.75rem" }}
            >
              Add Task
            </button>
          </form>
        </div>
      </div>

      {/* Recent Employees Summary */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <div className="card-header">
          <h3>Employee Workload Summary</h3>
        </div>
        <div className="card-body">
          {employees.map((employee) => (
            <div
              key={employee.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{employee.name}</strong>
                <div style={{ fontSize: "0.875rem", color: "#666" }}>
                  {employee.role}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "600" }}>
                  {employee.tasks.length} tasks
                </div>
                <div style={{ fontSize: "0.75rem", color: "#666" }}>
                  {
                    employee.tasks.filter((t) => t.status === "Completed")
                      .length
                  }{" "}
                  completed
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
