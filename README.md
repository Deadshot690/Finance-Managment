# FinFlow - Personal Finance Management App

FinFlow is a modern, intuitive personal finance management application designed to help users track their income and expenses, set budgets, and gain insights into their spending habits. It leverages AI to provide personalized saving tips and budget recommendations.

![FinFlow Dashboard](https://picsum.photos/seed/finflow-dashboard/1200/600?data-ai-hint=dashboard%20analytics)

## Features

- **Secure Authentication**: User registration and login functionality using Firebase Authentication (Email & Password).
- **Dashboard Overview**: At-a-glance view of total income, expenses, and current balance with interactive charts.
- **Transaction Management**: Easily add, view, and manage income and expense transactions.
- **Budget Tracking**: Set monthly budgets for different spending categories and monitor progress.
- **AI-Powered Insights**:
    - **AI Budget Advisor**: Get personalized recommendations to optimize your budget based on your spending history.
    - **Custom AI Saving Tips**: Define your own rules to receive tailored saving tips from an AI assistant.
- **Real-time Database**: All data is stored and synced in real-time using Google Firestore, ensuring a seamless experience.
- **Responsive Design**: A clean, modern UI built with ShadCN UI and Tailwind CSS that works beautifully on all devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication & Database**: [Firebase](https://firebase.google.com/) (Auth & Firestore)
- **AI Integration**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)

---

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or a compatible package manager
- A Google account to create a Firebase project

### 1. Set Up Firebase

This application requires a Firebase project to handle authentication and the database.

1.  **Create a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the on-screen instructions.

2.  **Create a Web App**:
    - In your project's dashboard, click the Web icon (`</>`) to register a new web app.
    - Give it a nickname and click "Register app".
    - Firebase will provide you with a `firebaseConfig` object. **Copy these keys.** You will need them for the environment variables.

3.  **Enable Authentication**:
    - In the left menu, go to **Build > Authentication**.
    - Click "Get started".
    - Select **Email/Password** from the list of providers, enable it, and click Save.

4.  **Set Up Firestore Database**:
    - In the left menu, go to **Build > Firestore Database**.
    - Click "Create database".
    - Choose **Start in production mode**.
    - Select a location for your database (choose one close to your users).
    - Go to the **Rules** tab and replace the default rules with the following to ensure users can only access their own data:
      ```
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{userId}/{document=**} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }
        }
      }
      ```
    - Click **Publish**.

### 2. Local Installation & Setup

1.  **Clone the Repository** (or download the source code):
    ```sh
    git clone https://your-repository-url.git
    cd your-project-directory
    ```

2.  **Install Dependencies**:
    ```sh
    npm install
    ```

3.  **Create Environment File**:
    - Create a file named `.env` in the root of your project.
    - Add the Firebase config keys you copied earlier into this file. The keys must be prefixed with `NEXT_PUBLIC_`.
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

4.  **Update Firebase Config in Code**:
    - Open the file `src/lib/firebase.ts`.
    - Replace the hardcoded `firebaseConfig` object with one that reads from your environment variables:
    ```ts
    import { initializeApp, getApps, getApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

### 3. Running the Application

1.  **Start the Development Server**:
    ```sh
    npm run dev
    ```

2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or whatever port is shown in your terminal). You should see the login page.

You can now create an account and start using the application!
