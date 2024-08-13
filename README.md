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

  - Users can log out, change their password, or delete their account.
  - The "Profile Details" section allows users to update their first name, last name, "About You" section, and profile picture.

- **Link Management:**

  - Users can manage up to 15 links, including popular platforms like GitHub, LinkedIn, Twitter, and more.
  - Links can be reordered via drag-and-drop, with validation on the server side.

- **Profile Access:** Profiles can be accessed via URLs in the format of `devlinks.fun/@username`, where users’ profiles are displayed as a card, complete with their picture, name, "About You" section, and social links.

- **Robust Validation and Error Handling:** The app includes both client-side and server-side validation to ensure data integrity. All potential issues, such as invalid credentials or mismatched passwords, are effectively managed, providing users with clear feedback.

- **Feedback:** Utilizes the `useFormStatus` React hook and the `react-hot-toast` library to provide feedback during form submissions and server responses.

## Technologies Used

- **React and Next.js:** For building a dynamic, server-side rendered web app.

- **Supabase:** For seamless user management and real-time data storage.

- **Framer Motion:** To enable intuitive drag-and-drop functionality.

- **React Hot Toast:** For providing user feedback through notifications.

- **Tailwind CSS:** For efficient and responsive styling.

## Installation Instructions

```bash
# Clone the repository
git clone https://github.com/ionStici/devlinks.git
# Navigate to the repository
cd devlinks
# Install dependencies
npm install
# Start the development server
npm run dev
```

After setting up the project, navigate to `http://localhost:3000` to start using the app.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Project Structure

```plaintext
src/
|-- actions/            # Next.js Server Actions
|-- app/                # Next.js App Router
|   |-- segment/        # Page segment
|   |-- segment/_components/  # Page specific components
|-- hooks/              # Custom React Hooks
|-- ui/                 # Reusable UI components
|-- data/               # Static data used by the app
|-- utils/              # Utilities and Constants
|   |-- supabase/       # Supabase configuration
```

## Deployment and Demo

- The application is deployed on Vercel
- Check out the live demo at [devlinks.fun](https://www.devlinks.fun)

## Contributing

Contributions are not only welcome, but they're also highly appreciated! Whether you're looking to squash a bug, implement a new feature, or polish up the documentation, your contributions help make devlinks better for everyone.

### How to Get Started

- **Report Issues:** If you encounter any bugs, have a suggestion, or want to request a feature, please open an issue in the GitHub repository. Providing detailed information helps us understand and address the issue more efficiently.

- **Submit Pull Requests:** If you’d like to contribute code, please fork the repository and submit a pull request. We review all contributions and will work with you to get your changes merged.

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
- **Vercel** for hosting the application.
- **React** community for their continuous support and resources.

## Release Notes

- **Version 1.0.0** : Initial release.

## Roadmap

Planned features for future releases include:

- A homepage showcasing the app's features.
- An improved design to the user profile card.
- More account management features.
