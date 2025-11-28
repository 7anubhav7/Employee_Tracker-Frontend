# Employee Task Tracker

A modern, responsive single-page web application for tracking employee tasks and progress. Built with React, this frontend-only application provides a comprehensive task management system with real-time statistics and local data persistence.

## Features

- **Employee Management**: View all employees with their assigned tasks
- **Task Filtering**: Filter tasks by status (Pending, In Progress, Completed)
- **Task Management**: Add new tasks and update task status
- **Dashboard**: View comprehensive statistics and completion rates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: All data persists in browser local storage
- **Modern UI**: Clean, intuitive interface with smooth animations

## Project Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project files** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd employee-tracker
   ```
3. **Install dependencies:**:
   ```bash
   npm install
   ```
4. **Start the development server:**:
   ```bash
   npm start
   ```
5. **Open your browser and visit:**:
   ```bash
   http://localhost:3000
   ```

### Available Scripts

- npm start - Runs the app in development mode
- npm test - Launches the test runner
- npm run build - Builds the app for production
- npm run eject - **Note: this is irreversible**

## Framework and Libraries Used

### Core Framework

- **React 19.2.0** - JavaScript library for building user interfaces
- **React DOM** - DOM-specific methods for React

### Development Tools

- **Create React App** - Bootstrapping tool for React applications
- **React Scripts** - Configuration and scripts for Create React App

### Testing

- **@testing-library/react** - React testing utilities
- **@testing-library/jest-dom** - Custom jest matchers for DOM elements
- **@testing-library/user-event** - User interaction simulation

### Performance

- **web-vitals** - Core web vitals measurement

## Project Structure

src/

├── components/

│ ├── Dashboard.js # Statistics and overview component

│ ├── EmployeeList.js # Employee and task listing with filtering

│ └── AddTaskForm.js # Form for adding new tasks

├── App.js # Main application component

├── App.css # Application styles

├── index.js # Application entry point

└── index.css # Global styles

## Assumptions Made

### Data Structure

- Employees have unique IDs and can have multiple tasks
- Tasks have unique IDs, titles, and status (Pending/In Progress/Completed)
- No backend API exists, so all data is managed locally

### User Experience

- Users want to quickly see task completion rates and statistics
- Task status follows a linear progression: Pending → In Progress → Completed
- Users may want to reassign tasks by changing their status

### Technical Assumptions

- Modern browsers with ES6+ support and localStorage capability
- No authentication or user roles required
- Single-page application without routing
- Mock data is sufficient for demonstration purposes

### Business Rules

- Tasks can be added to any existing employee
- Task status can be updated by any user
- All employees are visible to all users
- No task deletion functionality required

## Features Overview

### Dashboard

- Total employee count
- Total task count and completion rate
- Task distribution by status
- Individual employee progress with visual progress bars

### Employee List

- Filter tasks by status
- Update task status with one click
- View task counts per employee
- Responsive card-based layout

### Add Task Form

- Assign tasks to specific employees
- Set initial task status
- Real-time form validation
- Task preview before submission
- Employee workload summary

## Data Persistence

The application uses browser localStorage to persist all data. This means:

- Data survives browser refreshes
- Data is specific to the browser and device
- No server-side storage required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a demonstration project. Feel free to extend functionality by:

- Adding task editing capabilities
- Implementing task deadlines
- Adding task categories or priorities
- Including employee profiles with contact information

## License

This project is created for educational and demonstration purposes.
