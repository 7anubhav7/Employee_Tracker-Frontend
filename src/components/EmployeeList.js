import React from "react";

const EmployeeList = ({ employees, filterStatus, onUpdateTaskStatus }) => {
  // Filter tasks based on selected status
  const getFilteredTasks = (tasks) => {
    if (filterStatus === "All") return tasks;
    return tasks.filter((task) => task.status === filterStatus);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In Progress":
        return "status-in-progress";
      case "Completed":
        return "status-completed";
      default:
        return "";
    }
  };

  // Handle status change
  const handleStatusChange = (employeeId, taskId, newStatus) => {
    onUpdateTaskStatus(employeeId, taskId, newStatus);
  };

  // Get next status in workflow
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
        return "In Progress";
      case "In Progress":
        return "Completed";
      case "Completed":
        return "Pending";
      default:
        return "Pending";
    }
  };

  return (
    <div className="employee-list">
      <h2>Employees & Tasks</h2>

      {employees.map((employee) => {
        const filteredTasks = getFilteredTasks(employee.tasks);

        return (
          <div key={employee.id} className="card">
            <div className="card-header">
              <h3>{employee.name}</h3>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                {employee.role}
              </span>
            </div>
            <div className="card-body">
              {filteredTasks.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#666",
                    padding: "2rem",
                  }}
                >
                  No {filterStatus !== "All" ? filterStatus.toLowerCase() : ""}{" "}
                  tasks found
                </div>
              ) : (
                <div className="tasks-container">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="task-item">
                      <div className="task-info">
                        <span
                          className="task-title"
                          style={{ fontWeight: "500" }}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`status-badge ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleStatusChange(
                              employee.id,
                              task.id,
                              getNextStatus(task.status)
                            )
                          }
                          title={`Mark as ${getNextStatus(task.status)}`}
                        >
                          {task.status === "Completed" ? "Reopen" : "Update"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Task counts summary */}
              {filterStatus === "All" && employee.tasks.length > 0 && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                  >
                    <span>
                      <strong>Total:</strong> {employee.tasks.length}
                    </span>
                    <span style={{ color: "#28a745" }}>
                      <strong>Completed:</strong>{" "}
                      {
                        employee.tasks.filter((t) => t.status === "Completed")
                          .length
                      }
                    </span>
                    <span style={{ color: "#ffc107" }}>
                      <strong>In Progress:</strong>{" "}
                      {
                        employee.tasks.filter((t) => t.status === "In Progress")
                          .length
                      }
                    </span>
                    <span style={{ color: "#dc3545" }}>
                      <strong>Pending:</strong>{" "}
                      {
                        employee.tasks.filter((t) => t.status === "Pending")
                          .length
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeList;
