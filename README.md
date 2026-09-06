# 🚐 Camper Rental Application

A modern web application built with **Next.js (App Router)** for discovering and booking campers/motorhomes. Users can browse available campers, filter them by various parameters, view detailed information with image galleries, and submit booking requests directly through the platform.

---

## 🚀 Live Demo

- **Live Application:** [сайт]

---

## ✨ Features

- **Hero Landing Page:** An engaging introduction to camper rentals with a quick call-to-action to explore the catalog.
- **Camper Catalog:**
  - Displays a grid/list of camper cards with key details (price, engine, transmission, location, ratings).
  - **Infinite Scroll / Pagination:** Loads 4 campers at a time using `useInfiniteQuery`.
- **Advanced Backend Filtering:**
  - Filter campers by location, body type, engine type, and transmission.
  - Queries are processed directly on the server to retrieve matching results.
- **Camper Detail Page (`/catalog/[camperId]`):**
  - Opens in a new tab when clicking **Show More**.
  - Detailed specs, features, and user reviews with a 5-star rating system.
  - Interactive **Swiper** image gallery with thumbnail navigation loops.
- **Interactive Booking Form:**
  - Complete form validation for booking requests (Name, Email, Date, Comment).
  - Toast notifications confirming successful booking submissions.
- **SEO & Metadata:** Custom metadata, OpenGraph tags, and favicon configured via Next.js Metadata API.
- **Clean UI & Responsive Desktop Layout:** Designed strictly according to Figma specifications using React Icons and modern styling.

---

## 🛠️ Tech Stack & Libraries

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Data Fetching & State:** [TanStack Query (React Query)](https://tanstack.com/query) (`useInfiniteQuery`)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **UI Components & Carousel:** [Swiper.js](https://swiperjs.com/) (Thumbs Gallery Loop)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/) (or React Toastify)
- **Form Handling & Validation:** React Hook Form / Yup / Zod
- **Styling:** CSS Modules / Tailwind CSS / Styled Components

---

## 💻 Getting Started Locally

Follow these steps to run the project on your local machine:

### Prerequisites

Make sure you have **Node.js** (v18.x or higher) and **npm** / **yarn** / **pnpm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Serhii-SSD/traveltrucks](git@github.com:Serhii-SSD/traveltrucks.git)
   ```
2. **Install dependencies:**
   Bash

npm install

# or

yarn install

# or

pnpm install

3. **Run the development server:**
   Bash

npm run dev

# or

yarn dev

# or

pnpm dev

4. \*_Open in Browser:_
   Navigate to http://localhost:3000 to view the application.
   📁 Project Structure
   |── app/
   │ │ ├── page.tsx # Home / Hero page
   │ │ ├── catalog/
   │ │ │ ├── page.tsx # Catalog page with filters & pagination
   │ │ │ └── [camperId]/
   │ │ │ └── page.tsx # Camper details page
   │ │ ├── layout.tsx # Root layout & providers
   │ │ └── favicon.ico
   │ ├── components/ # Reusable UI components (Filters, CamperCard, BookingForm, Gallery, etc.)
   │ ├── services/ # API services & Axios instances
   │ └── types/ # TypeScript interfaces / types
   │
   ├── public/ # Static assets (images, icons)
   ├── README.md
   └── package.json

   👤 Author

Developed by Serhii Demydenko

    GitHub: @Serhii-SSD

    LinkedIn: https://www.linkedin.com/in/sergij-demydenko/
