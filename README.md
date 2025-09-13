# Next.js PWA Application

This is a Next.js application with Progressive Web App (PWA) support. The application includes user authentication features, allowing users to log in, register, and access a protected dashboard.

## Features

- **PWA Support**: The application is configured as a Progressive Web App, providing offline capabilities and a native app-like experience.
- **User Authentication**: Users can log in, register, and access a protected dashboard.
- **Responsive Design**: The application is designed to be responsive and accessible on various devices.
- **Social Login Options**: Users can authenticate using social media accounts.

## Project Structure

```
nextjs-pwa-app
├── public
│   ├── manifest.json       # PWA configuration
│   └── favicon.ico         # Application favicon
├── src
│   ├── pages
│   │   ├── index.tsx       # Homepage
│   │   ├── login.tsx       # Login page
│   │   ├── register.tsx    # Registration page
│   │   ├── dashboard.tsx    # Protected dashboard page
│   │   └── _app.tsx        # Custom App component
│   ├── components
│   │   ├── SocialLogin.tsx  # Social login component
│   │   ├── AuthGuard.tsx    # Route protection component
│   │   └── Navbar.tsx       # Navigation bar component
│   ├── utils
│   │   └── jwt.ts           # JWT utility functions
│   └── styles
│       └── globals.css      # Global CSS styles
├── package.json             # npm configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextjs-pwa-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Navigate to the login page to authenticate or register a new account.
- After logging in, you will be redirected to the dashboard, which is protected and accessible only to authenticated users.
- Explore the application and test the PWA features.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.