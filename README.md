# Daywise

A responsive weather-aware discovery, planning and preparation app built with Next.js, React and Tailwind CSS. It uses Open-Meteo for weather forecasts and geocoding, and browser localStorage for plans and saved places.

## Run locally

1. Install Node.js 20.9 or newer from https://nodejs.org/.
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Deploy to Vercel

1. Create a GitHub repository and upload the contents of this folder.
2. Sign in to https://vercel.com/ using GitHub.
3. Select **Add New → Project**, import the Daywise repository.
4. Keep the framework preset as **Next.js** and leave the build settings at their defaults.
5. Select **Deploy**. Vercel will build and publish the app.

Every push to the connected GitHub branch will trigger a new deployment.

## Notes before public/commercial launch

- The app uses Open-Meteo's public APIs directly from the browser. Review the current Open-Meteo terms, attribution requirements, rate limits and commercial licensing before public or commercial use: https://open-meteo.com/en/terms
- Saved plans, checklists and preferences are stored in local browser storage. They do not sync across devices and can be lost if browser data is cleared.
- The activity suitability score is a transparent starter heuristic, not a professional forecast or safety guarantee. It currently considers rain probability, wind, temperature and UV. It is limited by the available 14-day forecast.
- Discovery content is sample editorial content and should be replaced or connected to a reliable content/place data source before launch.
- Notification preferences are stored as a setting only; browser push notifications are not implemented in this MVP.
- The location shown on first load is a Hisar demo location. Users can change it by searching a city from the home screen.
