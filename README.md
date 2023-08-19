# FilmList

Welcome to the FilmList project! This website allows users to explore movie information, search for movies, maintain watchlists, and more.

## Features

- **Search Movies:** Search for movies by title, genre, or other criteria.
- **Popular Movies:** Display a list of popular movies using data from The Movie Database (TMDb) API.
- **User Authentication:** Sign in using OAuth providers (Google) or create an account using credentials.
- **Watchlist:** Maintain a personal watchlist of movies you want to watch.
- **Watched Movies:** Mark movies as watched and keep track of your viewing history.

## Technologies Used

- Frontend: React.js
- Backend: Next.js
- Styling: Tailwind CSS
- Database: MongoDB (for user data and watchlists)
- APIs: The Movie Database (TMDb) API

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/nabeel-w/FilmList.git
   cd FilmList/
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   GOOGLE_ID
   GOOGLE_CLIENT_SECRET
   MONGODB_URI
   NEXTAUTH_URL
   NEXTAUTH_URL_INTERNAL
   NEXTAUTH_SECRET
   API_TOKEN
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the website.

## Screenshots

![Website Preview](https://i.ibb.co/qmPq3jc/Screenshot-2023-08-17-231456.png)

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, feel free to submit a pull request.

## License

This project is licensed under the MIT License.

---
Created with ❤️ by [Nabeel Wasif](https://github.com/nabeel-w)

