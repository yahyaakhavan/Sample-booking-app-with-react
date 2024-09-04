# Booking Project

A simple booking application built with React.js that allows users to search for hotels, view details, and add bookmarks. The application fetches data from a sample JSON database and provides features such as search filters, map integration, and user authentication.

> **Note**: This sample project is not responsive. The focus of this project was on implementing and demonstrating the React concepts and skills I have learned.

## Features

- **Hotel Search**: Users can search for hotels based on various criteria, including the number of adults, children, and rooms required. These options are passed as search parameters to filter the results.

- **Data Fetching**: The application uses the Axios library to fetch data from a sample JSON database.

- **Map Integration**: Hotels are displayed on a map using markers. Users can also add new locations directly by clicking on the map, and these are saved to the database.

- **Hotel and Bookmark Details**: Users can click on any hotel or bookmark to view a detailed page about the selected item.

- **Navigation**: React Router is used to navigate between different pages within the application.

- **State Management**: Utilizes React hooks such as `useContext`, `useReducer`, and `useEffect` for state management and side effects.

- **User Authentication**: Includes a login form that handles authentication logic using a fake user setup.

## Usage

1. **Search for Hotels**: Use the search form to filter hotels based on your preferences.
2. **View Hotel Locations**: Check the map for hotel markers to see their locations.
3. **Add a New Place**: Click on the map to add a new place to the database.
4. **Bookmark Hotels**: Save your favorite hotels and navigate to them easily from the bookmarks.
5. **Login**: Authenticate using the login form to access more features.

## Technologies Used

- **React.js**: JavaScript library for building user interfaces
- **Axios**: HTTP client for making requests to the JSON database
- **React Router**: Declarative routing for React applications
- **React Hooks**: `useContext`, `useReducer`, and `useEffect` for managing state and side effects
- **JSON Server**: Mock backend for handling API requests (if applicable)

## Limitations

- **Non-Responsive Design**: This project was developed with a focus on practicing React.js concepts and is not optimized for responsiveness across different devices.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

For any questions or feedback, please contact yahya.akhavan@gmail.com.
