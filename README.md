<p align="center">
  <img src="./public/images/pictor-98.jpg" alt="Pictor 98 Logo" />
</p>

# Pictor 98

Pictor 98 is a retro-styled web application that generates a random daily picture from NASA's Astronomy Picture of the Day (APOD) API, paired with a cosmic greeting. The app features server-side rendering using Node.js, Express, and EJS, along with custom CSS styling inspired by the Windows 98 aesthetic.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Daily Picture:** Fetches a random image or video from NASA's APOD API.
- **Cosmic Greetings:** Displays a random greeting from a curated list of interstellar messages.
- **Retro Aesthetic:** Styled to mimic the nostalgic Windows 98 interface.
- **Fallback Support:** Provides a default image and message if the NASA API is unavailable.

## Installation

> [!NOTE]
>
> Ensure you have [Node.js](https://nodejs.org/en/) (version 14 or later) and [npm](https://www.npmjs.com/) installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/pictor-98.git
   cd pictor-98
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your NASA API key:

   ```env
   NASA_API_KEY=YOUR_NASA_API_KEY
   ```

  > [!NOTE]
  > 
  > You can obtain a free API key from the [NASA API website](https://api.nasa.gov/). This key is required to access the APOD API. If you don't have an API key, the app will use the default `DEMO_KEY`, however this has much lower rate limits.

4. **Run the Application**

   Start the app using one of the following commands:
   - For development mode (with hot reloading):

     ```bash
     npm run dev
     ```

   - For production mode:

     ```bash
     npm run build
     npm start
     ```

5. **Access the App**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure

```plaintext
.
├── public/                   # Static assets (CSS, images)
│   ├── styles.css            
|   └── images/               
├── src/                      # Source code
│   ├── app.ts                # Main entry point for the app
│   ├── config/               # Configuration files
│   │   └── apodConfig.ts     # NASA API configuration
│   ├── controllers/          # Controller logic
│   │   └── apodController.ts # Handles APOD data fetching
│   ├── data/                 # Static data
│   │   └── greetings.json    # List of cosmic greetings
│   ├── models/               # TypeScript interfaces
│   │   └── Apod.ts           # APOD data model
│   ├── routes/               # Express routes
│   │   └── apodRoutes.ts     # Routes for APOD-related endpoints
│   ├── services/             # Business logic
│   │   └── apodService.ts    # Fetches APOD data and greetings
│   ├── views/                # EJS templates
│   │   ├── index.ejs         # Main page template
│   │   ├── error.ejs         # Error page template
│   │   └── partials/         # EJS partials
│   └── middleware/           # Express middleware
├── .env                      # Environment variables
├── package.json              
├── package-lock.json         
└── tsconfig.json             
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- **[NASA Open APIs](https://api.nasa.gov/):** For providing free and accessible APIs for space enthusiasts, such as the [Astronomy Picture of the Day (APOD) API](https://github.com/nasa/apod-api).
- **[Windows 98 Icon Viewer](https://win98icons.alexmeub.com/):** For providing open access to stunning Windows 98 icons, which were used in the logo design.
- **Special Thanks:** To Mr. Dalwin Lewis for pushing us continuously to learn and grow.
