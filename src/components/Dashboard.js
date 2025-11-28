import React from "react";

const Dashboard = ({ employees }) => {
  // Calculate statistics
  const calculateStats = () => {
    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    let inProgressTasks = 0;
    let totalEmployees = employees.length;

    employees.forEach((employee) => {
      employee.tasks.forEach((task) => {
        totalTasks++;
        if (task.status === "Completed") completedTasks++;
        if (task.status === "Pending") pendingTasks++;
        if (task.status === "In Progress") inProgressTasks++;
      });
    });

    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const avgTasksPerEmployee =
      totalEmployees > 0 ? (totalTasks / totalEmployees).toFixed(1) : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      completionRate,
      totalEmployees,
      avgTasksPerEmployee,
    };
  };

  const stats = calculateStats();

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalEmployees}</div>
          <div className="stat-label">Total Employees</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.avgTasksPerEmployee}</div>
          <div className="stat-label">Avg Tasks per Employee</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#28a745" }}>
            {stats.completedTasks}
          </div>
          <div className="stat-label">Completed Tasks</div>
        </div>

        <div className="stat-card">
          <div className="stat-number" style={{ color: "#ffc107" }}>
            {stats.inProgressTasks}
          </div>
          <div className="stat-label">In Progress</div>
        </div>

        <div className="stat-card">
          <div className="stat-number" style={{ color: "#dc3545" }}>
            {stats.pendingTasks}
          </div>
          <div className="stat-label">Pending Tasks</div>
        </div>
      </div>

      {/* Employee Progress Section */}
      <div className="card">
        <div className="card-header">
          <h3>Employee Task Distribution</h3>
        </div>
        <div className="card-body">
          {employees.map((employee) => {
            const employeeTasks = employee.tasks.length;
            const employeeCompleted = employee.tasks.filter(
              (task) => task.status === "Completed"
            ).length;
            const completionRate =
              employeeTasks > 0
                ? Math.round((employeeCompleted / employeeTasks) * 100)
                : 0;

            return (
              <div
                key={employee.id}
                className="employee-progress-item"
                style={{
                  marginBottom: "1rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>{employee.name}</span>
                  <span style={{ color: "#666" }}>
                    {completionRate}% Complete
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#e9ecef",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${completionRate}%`,
                      height: "100%",
                      backgroundColor:
                        completionRate === 100 ? "#28a745" : "#667eea",
                      transition: "all 0.3s ease",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                    color: "#666",
                    marginTop: "0.25rem",
                  }}
                >
                  <span>
                    {employeeCompleted} of {employeeTasks} tasks completed
                  </span>
                  <span>{employee.role}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
