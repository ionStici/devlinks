# devlinks // Link Sharing App

## Overview

[**devlinks.fun**](https://www.devlinks.fun) is a web app developed as a solution to my first guru-level challenge on [Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT).

The app allows users to create personalized profiles where they can share their social links and professional information in the form of a profile card.

Users can easily manage their profile details, including adding a profile picture, updating their name and bio, and linking to up to 15 different platforms.

The project is currently live and accessible at [devlinks.fun](https://www.devlinks.fun), where users can experience the app's features and share their profile via a unique URL.

## Preview

![](./preview.png)

## Features

- **Responsive Design:** The app is fully responsive, ensuring a seamless experience across all devices.

- **User Authentication:** Users can sign up with a new account and log in securely.

- **Profile Management:**

  - Users can log out, change their email and password, or delete their account.
  - The "Profile Details" section allows users to update their first name, last name, "About You" section, and profile picture.

- **Link Management:**

  - Users can manage up to 15 links, including popular platforms like GitHub, LinkedIn, Twitter, and more.
  - Links can be reordered via drag-and-drop, with validation on the server side.

- **Profile Access:** Profiles can be accessed via URLs in the format of `devlinks.fun/@username`, where users' profiles are displayed as a card, complete with their picture, name, "About You" section, and social links.

- **Robust Validation and Error Handling:** The app includes both client-side and server-side validation to ensure data integrity. All potential issues, such as invalid credentials or mismatched passwords, are effectively managed, providing users with clear feedback.

- **Feedback:** Utilizes the `useFormStatus` React hook and the `react-hot-toast` library to provide feedback during form submissions and server responses.

## Technologies Used

- **React:** For building a dynamic, client-side rendered web app.
- **Vite:** For fast development and optimized production builds.
- **TypeScript:** For type-safe code and better developer experience.
- **React Router DOM:** For client-side routing and navigation.
- **React Query:** For efficient server state management and data fetching.
- **React Hot Toast:** For providing user feedback through notifications.
- **Tailwind CSS:** For efficient and responsive styling.
- **Framer Motion:** To enable intuitive drag-and-drop functionality.
- **NestJS:** For building a robust and scalable backend API.
- **TypeORM:** For database operations and entity management.
- **SQLite:** For lightweight and efficient data storage.
- **JWT Auth:** For secure user authentication and authorization.

## Installation Instructions

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/ionStici/devlinks.git
# Navigate to the frontend directory
cd devlinks/frontend
# Install dependencies
npm install
# Start the development server
npm run dev
```

### Backend Setup

```bash
# Navigate to the backend directory
cd devlinks/backend
# Install dependencies
npm install
# Start the development server
npm run start:dev
```

After setting up both projects:

- Frontend will be available at `http://localhost:5173`
- Backend API will be available at `http://localhost:3000`

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Development

### Environment Variables

#### Frontend (.env)

```env
VITE_APP_API_URL=http://localhost:3000
```

#### Backend (.env)

```env
JWT_SECRET=1ec9bde82155ae49ed3ec59ada043
JWT_TOKEN_AUDIENCE=http://localhost:5173
JWT_TOKEN_ISSUER=http://localhost:3000
JWT_ACCESS_TOKEN_TTL=900
JWT_REFRESH_TOKEN_TTL=86400
```

## Security

The application implements several security measures:

- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Password Hashing**: Passwords are hashed using bcrypt
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: All user inputs are validated using DTOs

## Project Structure

```plaintext
frontend/
|-- public/          # Static files served as-is
|-- src/
    |-- app/           # Main application routes and layouts
    |-- assets/        # Static assets (images, fonts, etc.)
    |-- components/    # Reusable UI components
    |-- config/        # Application configuration
    |-- data/          # Static data and constants
    |-- features/      # Feature-specific components and logic
    |-- hooks/         # Custom React hooks
    |-- lib/           # Third-party library configurations
    |-- styles/        # Global styles and Tailwind config
    |-- types/         # TypeScript type definitions
    |-- utils/         # Utility functions and helpers
    |-- main.tsx       # Application entry point
    |-- vite-env.d.ts  # Vite environment type definitions

backend/
|-- src/
    |-- auth/          # Authentication module
    |-- config/        # Application configuration
    |-- data/          # Database seeds and migrations
    |-- profiles/      # Profile management module
    |-- users/         # User management module
    |-- app.module.ts  # Main application module
    |-- main.ts        # Application entry point
```

## Deployment and Demo

- The frontend is deployed on Netlify
- The backend is deployed on Render
- Check out the live demo at [devlinks.fun](https://www.devlinks.fun)

## Contributing

Contributions are not only welcome, but they're also highly appreciated! Whether you're looking to squash a bug, implement a new feature, or polish up the documentation, your contributions help make devlinks better for everyone.

### How to Get Started

- **Report Issues:** If you encounter any bugs, have a suggestion, or want to request a feature, please open an issue in the GitHub repository. Providing detailed information helps us understand and address the issue more efficiently.

- **Submit Pull Requests:** If you'd like to contribute code, please fork the repository and submit a pull request. We review all contributions and will work with you to get your changes merged.

For detailed guidelines on how to contribute, including coding standards and how to submit a pull request, please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) file.

Thank you for helping to make devlinks better for everyone!

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) file for more information.

## Author

Contact Information:

- Website - [ionstici.dev](https://ionstici.dev)
- GitHub - [ionStici](https://github.com/ionStici)
- Frontend Mentor - [@ionStici](https://www.frontendmentor.io/profile/ionStici)
- Twitter - [@ionsticidev](https://x.com/ionsticidev)

## Acknowledgments

Special thanks to:

- **Frontend Mentor** for the challenge.
- **Render & Netlify** for hosting the application.
- **React** community for their continuous support and resources.

## Release Notes

- **Version 2.0.0** : Major refactor with new tech stack and enhanced account management features.
  - Migrated from Next.js + Supabase to React + Vite and NestJS
  - Added new account management features (change email, change password, delete account)
  - Improved backend architecture with TypeORM and SQLite
  - Enhanced type safety with TypeScript
- **Version 1.0.0** : Initial release.

## Roadmap

Planned features for future releases include:

- [ ] A homepage showcasing the app's features.
- [ ] An improved design to the user profile card.
- [x] More account management features.
