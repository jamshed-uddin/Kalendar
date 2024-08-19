# Kalendar

Kalendar is a calendar app with events

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (v14 or higher)
- npm or yarn package manager

## Table of Contents

- [Getting started](#Getting-Started)
- [Folder structure](#Folder-tructure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)

## Getting Started

Follow these steps to get the app running locally:

### 1. Clone the repository

```sh
git clone https://github.com/jamshed-uddin/Kalendar.git
```

### 2. Go to the directory

```sh
cd Kalendar
```

### 2. Install the dependencies

```sh
npm install
```

### 4. Start the app

```sh
npm run dev
```

### 5. Dependencies

```json
     "@heroicons/react": "^2.1.5",
    "axios": "^1.7.4",
    "date-fns": "^3.6.0",
    "react": "^18.3.1",
    "react-datepicker": "^7.3.0",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-modal": "^3.16.1",
    "react-router-dom": "^6.26.1",
    "uuid": "^10.0.0"
```

### 6. Dev Dependencies

```json
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "vite": "^5.4.1"
```

## Folder structure

```bash
src/
├── components/ # UI components
├── context/ # Global state management
├── hooks/ # Custom hooks
├── pages/ # All pages
├── styles/ # Style modules
└── App.js # Main entry point
```

## Features

- **View Events**: Display events filtered by date and tag.
- **Add/Edit Events**: Add new events or edit existing ones using a form.
- **Delete Events**: Remove events from the calendar.
- **Date Validation**: Ensure that end dates are not before start dates.

## API Endpoints

- **GET** `/api/events`: Fetch all events.
- **POST** `/api/events`: Add a new event.
- **PUT** `/api/events/:id`: Update an event.
- **DELETE** `/api/events/:id`: Remove an event.

## Error Handling

- Notifications are displayed for API errors using `toast`.

## Future Improvements

- Implement real API integration.
- Optimize state management and improve performance.
