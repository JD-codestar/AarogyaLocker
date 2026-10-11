# CareConnect 🏥

CareConnect is a modern, responsive healthcare appointment-booking platform built for the CU Hackathon. Inspired by the usability of leading healthcare discovery platforms, it provides a seamless and visually stunning user experience for finding doctors and booking appointments.

This project is a fully functional frontend prototype built with React, TypeScript, and Vite.

## ✨ Key Features & Changes Implemented

### 1. Modern UI/UX Design System
- **Custom Design System**: Implemented a complete design system using CSS variables with a curated color palette (Deep Blue, Ice Blue, Cyan, Green, Red).
- **Premium Aesthetics**: Features glassmorphism effects, smooth micro-animations, subtle shadows, and a beautiful abstract mesh gradient background (blending white, blue, and red) on the search page.
- **Custom Icons**: Fully self-contained inline SVG icons (no heavy external icon libraries).

### 2. Multi-Page Architecture
- **React Router Integration**: Upgraded the app from a single-page scrolling layout to a proper multi-page application using `react-router-dom`.
- **Home Page (`/`)**: Features a wide search bar, 4 prominent photo-based service cards (Instant Video Consultation, Find Doctors Near You, Lab Tests, Surgeries), How it Works steps, and Testimonials.
- **Find Doctors Page (`/doctors`)**: A dedicated search results page featuring:
  - A sticky, glassmorphic header with search context and interactive filter pills.
  - A horizontal list layout for doctor cards (Practo style) with separated action areas for pricing and booking.
  - An empty state for when no doctors match the search query.

### 3. Interactive Features & State
- **Live Search Filtering**: The hero search bar instantly filters the featured doctors by name or specialty and transitions the user to the Find Doctors page.
- **Simulated Authentication**: A beautifully designed "Sign In / Create Account" modal that includes client-side validation and simulates a logged-in state by updating the navigation bar with a user profile avatar.
- **Booking Flow**: A fully functional mock booking modal that lets users pick dates/times, enter patient details, and see a success confirmation.
- **Doctor Profiles**: Detailed modal views for individual doctors showing their full bio, education, and languages spoken.

### 4. Code Quality & Accessibility
- **TypeScript**: Strictly typed interfaces for all components and demo data.
- **Accessibility (a11y)**: Semantic HTML tags (`<nav>`, `<main>`, `<section>`), ARIA labels on all interactive elements, keyboard-accessible modals (focus trapping and Esc key support), and a "skip to main content" link for screen readers.
- **Zero Errors**: Passes all TypeScript compiler (`tsc`) checks and Oxlint rules.

---

## 🚀 How to Run Locally

1. **Install Dependencies**
   Make sure you are in the project directory, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **View in Browser**
   Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the app.

---

*Note: All doctor profiles, testimonials, and services depicted in this application are fictional and created solely for demonstration purposes.*
