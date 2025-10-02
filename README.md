
# Thoern Booking Application

Thoern Booking is a full-stack web application for booking freelancers and managing appointments between freelancers and customers. The app provides a seamless experience for both user types, allowing freelancers to set their availability and workfields, and customers to search, book, and manage appointments.

## Features

- **User Registration & Login**: Register as a freelancer or customer, and securely log in.
- **Freelancer Availability**: Freelancers can set and manage their available times.
- **Workfields**: Freelancers can select their areas of expertise (workfields).
- **Find Freelancers**: Customers can search and filter available freelancers by name and workfield, and book available time slots.
- **Booking Management**: Both freelancers and customers can view their bookings in a dashboard.
- **Responsive UI**: Modern, mobile-friendly interface built with React and Bootstrap.
- **Role-based Access**: Different views and actions for freelancers, customers, and admins.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, React Bootstrap
- **Backend**: .NET 8 Minimal API (C#), SQLite
- **API**: RESTful endpoints for all core features
- **Authentication**: Session-based authentication
- **Docker**: Multi-container setup for frontend and backend
- **Hosting**: Selfhosted on a RaspberryPi 5 on a nginx-server
- **CI/CD**: CI/CD automated via self-hosted runner on Github Actions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (for backend)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

### Local Development

#### 1. Clone the repository

```sh
git clone https://github.com/ThoernVE/thoern-booking.git
cd thoern-booking
```

#### 2. Install frontend dependencies

```sh
npm install
```

#### 3. Start the development servers

- **Frontend**: Runs on Vite dev server (default: http://localhost:5173)
- **Backend**: .NET Minimal API (default: http://localhost:5000)

You can start both servers using Docker Compose, or manually:

**With Docker Compose:**

```sh
docker-compose up --build
```

**Manually:**

 ```sh
npm run dev
```

A javascript-file will then start both the frontend and backend servers.


### Usage

1. Register as a freelancer or customer.
2. Freelancers: Set your available times and workfields.
3. Customers: Search for freelancers, filter by workfield, and book available times.
4. View and manage your bookings from the dashboard.

### Project Structure

- `src/` - React frontend source code
- `backend/` - .NET backend source code and SQLite database
- `public/` - Static assets
- `docker-compose.yml` - Multi-container orchestration

### API Overview

- `/api/users` - User registration and management
- `/api/availableTimes` - Manage freelancer availability
- `/api/bookTime` - Book a freelancer's available time
- `/api/bookingInformation` - View bookings
- `/api/workfields` - List of available workfields

### License

MIT License

### Live preview:

booking.thoernve.dev
