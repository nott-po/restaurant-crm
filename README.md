# Restaurant CRM

Single-page application for restaurant operations built with React, React Router, Redux Toolkit, RTK Query, and a custom Webpack setup.

## Features

- Authentication flow backed by DummyJSON API
- Dashboard with summarized stats
- Tables view with status indicators and details
- Orders list with filters
- Staff list
- Branch locations displayed on a map
- Responsive layout for mobile and desktop

## Tech Stack

- React 19 with hooks
- React Router v7 for routing
- Redux Toolkit for state management
- RTK Query for data fetching and caching
- Webpack 5 with custom configuration
- Native CSS (no UI libraries)
- Leaflet for maps

## Project Structure

```
src/
├── app/                         # Redux store configuration
├── features/
│   ├── auth/                    # Auth slice and pages
│   ├── branches/                # Branches page and API
│   ├── dashboard/               # Dashboard page
│   ├── orders/                  # Orders page and hooks
│   ├── staff/                   # Staff page and hooks
│   └── tables/                  # Tables pages, slices, and APIs
├── shared/
│   ├── api/                     # Base API configuration
│   ├── constants/               # App constants and sample data
│   ├── lib/                     # Helpers
│   ├── pages/                   # Common pages
│   ├── styles/                  # Global CSS
│   └── ui/                      # Reusable UI components
├── App.jsx
└── index.js
```

## Dependencies

### Production

- @reduxjs/toolkit
- leaflet
- react
- react-dom
- react-icons
- react-leaflet
- react-redux
- react-router-dom

### Development

- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader
- copy-webpack-plugin
- css-loader
- html-webpack-plugin
- prettier
- style-loader
- webpack
- webpack-cli
- webpack-dev-server

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository.
2. Install dependencies.

### Development

Start the development server:

`npm start`

### Production Build

Create a production build:

`npm run build`

The build output will be in the dist directory.

## API

All requests use the DummyJSON API:

- /auth/login
- /users
- /recipes

## Demo Credentials

Username: emilys
Password: emilyspass

## Live Demo

Deployment link: ADD_DEPLOYMENT_URL

## Requirements Coverage

- React components separate logic and presentation
- Routing via React Router (multiple pages)
- State management via Redux Toolkit
- Data retrieval and caching via RTK Query
- Webpack build without create-react-app
- Modular and readable structure
- Responsive layout with native CSS

## Quality Checks (Optional)

- Lighthouse score 90+ in all categories
- No HTML or CSS validation errors

## License

ISC
