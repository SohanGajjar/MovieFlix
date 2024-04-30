## MovieFlix
MovieFlix is a web application that displays a list of top movies from The Movie Database (TMDb) API. The app shows the most popular movies for each year, and users can filter movies by genre. As the user scrolls through the list, the app loads top movies from previous/next years. The app shows movies according to search query.

## Features
- Display a list of movies sorted in descending order of popularity
- Show movie title, image, genre, rating, and a short description for each movie
- Load 20 movies per year initially, with movies from 2012 shown by default
- Implemented smooth scrolling behavior to load more movies as the user scrolls up (previous year) or down (next year)
- Implemented skeleton until the movies are loaded
- Implemented search functionality to search for any movie that matches the string
- Filter movies by genre
- Implemented scroll-to-start and scroll-to-top feature
- Custom UI components created using React and TypeScript

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/SohanGajjar/MovieFlix.git

2. Navigate to the project directory:
    ```bash
    cd MovieFlix

3. Install dependencies:
    ```bash
    npm install

## Usage

1. Start the development server:
     ```bash
   npm start
2. Open your browser and navigate to http://localhost:3000 to view the app.
