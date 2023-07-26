# SkyCast Weather App

Welcome to **SkyCast**, Your Ultimate Weather Companion! 🌤️

## Table of Contents

- [Introduction](##introduction)
- [Key Features](##key-features)
- [Installation and Setup](##installation-and-setup)
- [Usage](##usage)
- [Tech Stack Used](##tech-stack-used)
- [Contributing](##contributing)
- [License](##license)
- [Acknowledgments](##acknowledgments)
- [Contact](##contact)

## Introduction

SkyCast is a modern and user-friendly weather app designed to provide you with real-time weather data for any city or country. Stay informed about the latest forecasts, personalize your weather experience, and toggle between Celsius and Fahrenheit temperature units 🌡️. With its responsive design and theme customization options 🎨, SkyCast ensures an enjoyable weather-tracking experience on any device. Discover the wonders of weather with SkyCast! 🌤️

## Key Features

- **Real-time Weather Data:** Access dynamic and up-to-date weather information from reliable APIs for any location worldwide.
- **City and Country-based Forecasts:** Fetch weather data based on specific cities or countries to stay informed about various locations.
- **Personalized Weather Experience:** Sign in to the app and enjoy a personalized weather journey tailored to your preferences.
- **Favorites Locations:** Easily manage and save your favorite locations for quick access to their weather forecasts.
- **Temperature Units Toggle:** Seamlessly switch between Celsius (°C) and Fahrenheit (°F) temperature units as per your preference.
- **Theme Customization:** Choose from a selection of themes to personalize the app's appearance and match your style.
- **Responsive Design:** Enjoy a delightful weather tracking experience on any device, thanks to the app's beautiful and responsive design.
- **Dark Mode Support:** Embrace Dark Mode for enhanced visibility and comfort during low-light conditions.

## Screenshots

![Screenshot 1](/path/to/screenshot1.png)
![Screenshot 2](/path/to/screenshot2.png)
![Screenshot 3](/path/to/screenshot3.png)

## Installation and Setup

Follow these instructions to install and set up the SkyCast Weather App locally on your machine:

### Setting up the React.js App

1. Clone the repository:
   
   ```
   git clone https://github.com/rajarshisamaddar/skycast.git
   cd skycast-main
   ```
2. Install dependencies:
   
   ```
   npm install
   or
   yarn install
   ```
3. Start the development server:
   
   ```
   npm start
   or
   yarn start
   ```
4. Open your browser and navigate to `http://localhost:3000` to view the app.

### Setting up the Node.js App

5. Navigate to the directory:
   
   ```
   cd backend
   ```
6. Install dependencies:
   
   ```
   npm install
   or
   yarn install
   ```
7. Start the development server:
   
   ```
   npm start
   or
   yarn start
   ```
8. Open your browser and navigate to `http://localhost:3033` to view the app.

### Connecting API

9. Open the `API - Demo.ts` file and replace your credentials and the API keys.
    
10. Now enjoy your own local version of SkyCast.

## Usage

Below are some guidelines on how to use the app and navigate through its features effectively.

#### Getting Started

To begin using SkyCast, follow these steps:

1. Open [skycast.rajarshisamaddar.com](https://skycast.rajarshisamaddar.com) in your web browser.

2. If you are not authenticated, you will be redirected to [skycast.rajarshisamaddar.com/auth](https://skycast.rajarshisamaddar.com/auth) to log in or sign up for an account.

3. After successful authentication, you will be directed to the home page at [skycast.rajarshisamaddar.com](https://skycast.rajarshisamaddar.com).

#### User Authentication

If you are a new user, click on the "Sign Up" option on the authentication page and fill in the required details. If you already have an account, use the "Sign In" option and enter your credentials. In case you forget your password, click on "Forgot Password" to recover your account.

#### Home Page

The home page is the main dashboard of the app. Here, you will find the header and body sections, each providing different functionalities and weather information.

#### Header

1. **Search Location**: On the left side of the header, you will see a search bar. Start typing the name of a location, and the app will show relevant suggestions in the dropdown. Select a location from the results, and the entire app state will update to display weather data and forecasts for the selected location.

2. **Selected Location**: The middle section of the header displays the title of the currently selected location.

3. **Favorites**: On the right side of the header, there are two icons. Click on the "Favorites" icon to add the selected location to your favorites list. If the location is already in your favorites, clicking the icon again will remove it from the list.

4. **Settings**: The other icon on the right side is the "Settings" icon. Click on it to open a popup modal with three options: "Unit Selection," "Theme Selection," and "Location Selection." Choose your preferred options, and the app will update accordingly.

#### Body

The body section of the app is divided into four parts:

1. **Breadcrumb**: This section displays key weather information for the selected location.

2. **Hourly Forecast**: Here, you can view the weather forecast for the next 24 hours in an hourly breakdown.

3. **Daily Forecast**: The "Day Forecast" section provides the weather forecast for the next 3 days.

4. **Footer**: The footer contains additional information or credit to the app developer.

#### Settings

The "Settings" popup modal allows you to personalize your app experience:

1. **Unit Selection**: Choose your preferred unit for displaying weather data (e.g., Celsius, Fahrenheit).

2. **Theme Selection**: Select your preferred theme for the app's interface (e.g., light mode, dark mode).

3. **Location Selection**: If you have saved locations in your favorites list, you can select one to set it as the default location for the app.

#### Favorites

By clicking on the "Favorites" icon in the header, you add or remove your current location from the list of favorite locations. Add or remove locations to keep track of the weather in your most frequently visited places.

#### Weather Forecast

SkyCast provides accurate and up-to-date weather information, giving you the power to plan your day effectively.

I hope you enjoy using SkyCast for all your weather forecasting needs!

## Tech Stack Used

- React.js
- Material-UI
- Node JS
- JSON Server
- Redux Toolkit
- HTML5
- CSS3
- SCSS
- JavaScript
- TypeScript
- WeatherAPI.com - API
- IPinfo.io - API
- Render.com
- Netlify.com

## Contributing

I welcome contributions from the community. If you find any bugs or have suggestions for new features, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Acknowledgments

We would like to extend our heartfelt gratitude to the following services and platforms, which have played a crucial role in the development and deployment of SkyCast - Weather Forecast App:

- WeatherAPI: WeatherAPI has provided us with reliable weather data and forecasts, enabling us to deliver accurate and up-to-date weather information to our users.

- IPinfo: IPAPI has been instrumental in helping us retrieve location information based on user IP addresses, making it seamless for users to get weather forecasts for their current location.

- Netlify: Netlify's hosting and continuous deployment platform have allowed us to efficiently deploy and manage SkyCast, making it easily accessible to our users.

- Render: Render's cloud platform has been a key contributor to the smooth and reliable performance of SkyCast, ensuring our app runs efficiently and securely.

I am deeply appreciative of the excellent services and support provided by these platforms, which have significantly contributed to the success and functionality of SkyCast. Without their dedication and high-quality services, bringing this weather forecast app to life would not have been possible.

## Contact

For any inquiries or feedback, please contact us at me@rajarshisamaddar.com.
