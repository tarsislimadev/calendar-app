# Calendar App

This is a modern, interactive calendar web application built with React, designed to help users manage their events efficiently. It provides a clean interface for viewing monthly calendars and offers comprehensive features for creating, editing, and deleting events.

## Features

### Core Calendar Functionality
- **Monthly Calendar View**: Displays a clear grid layout of the current month.
- **Intuitive Navigation**: Easily navigate between months using dedicated buttons, and quickly return to the current date with the "Today" button.
- **Current Date Highlighting**: The current day is visually highlighted for quick reference.
- **Responsive Design**: The application layout adapts seamlessly to various screen sizes, from desktop to mobile devices.

### Event Management
- **Effortless Event Creation**: Add new events by simply clicking on any date in the calendar or using the convenient floating action button.
- **Color-Coded Categories**: Organize events into five distinct categories (Work, Personal, Health, Social, Other), each with its own color for easy visual identification.
- **Comprehensive Event Details**: Each event can include a title, time, category, and a detailed description.
- **Clear Event Display**: Events are displayed as compact, color-coded blocks directly on the calendar dates.
- **Easy Event Modification**: Click on any existing event to open a modal for editing its details or deleting it.
- **Data Persistence**: All events are automatically saved to the browser's local storage, ensuring your data is retained even after closing the browser.

### User Interface & Experience
- **Modern Aesthetic**: A clean, minimalist design built using Tailwind CSS and shadcn/ui components provides a professional and user-friendly experience.
- **Interactive Elements**: Enjoy smooth transitions, hover effects, and intuitive interactions throughout the application.
- **Streamlined Modals**: Event creation and editing are handled through well-designed, easy-to-use modal dialogs.
- **Quick Access**: The floating action button (plus icon) offers a fast way to add new events from any view.

## Technical Stack

- **Frontend Framework**: React 18 (with Hooks)
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Browser Local Storage

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tarsislimadev/calendar-app.git
    cd calendar-app
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or npm install
    # or yarn install
    ```

3.  **Start the development server:**
    ```bash
    pnpm run dev
    # or npm run dev
    # or yarn dev
    ```

    The application will be accessible at `http://localhost:5173/` (or another port if 5173 is in use).

## Project Structure

```
calendar-app/
├── public/
├── src/
│   ├── assets/             # Static assets like images
│   ├── components/         # Reusable React components
│   │   ├── ui/             # UI components from shadcn/ui
│   │   ├── Calendar.jsx    # Main calendar component
│   │   ├── CalendarGrid.jsx# Component for displaying the calendar grid
│   │   └── EventModal.jsx  # Modal for event creation/editing
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── App.css             # Global application styles
│   ├── App.jsx             # Main application component
│   ├── index.css           # Tailwind CSS base styles
│   └── main.jsx            # Entry point of the React application
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # Lock file for dependencies
└── vite.config.js          # Vite bundler configuration
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

