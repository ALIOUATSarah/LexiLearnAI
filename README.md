# LexiLearn AI - Intelligent Educational Platform

A modern educational platform built with Next.js 14, featuring interactive learning modules, progress tracking, and analytics dashboards.

## Features

- 🎓 Interactive learning modules
- 📊 Real-time progress tracking
- 👨‍🏫 Teacher dashboard with analytics
- 👨‍👩‍👧‍👦 Parent monitoring system
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 📈 Interactive charts and visualizations
- 🔔 Real-time notifications

## Tech Stack

- **Framework:** Next.js 14
- **Language:** JavaScript/JSX
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Notifications:** Sonner
- **State Management:** React Hooks
- **Authentication:** NextAuth.js (to be implemented)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- npm 9.0 or later
- Git

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ALIOUATSarah/younes.git
   cd younes
   ```

2. **Install all required dependencies**

   ```bash
   npm install
   ```

3. **Install specific UI dependencies**

   ```bash
   npm install @radix-ui/react-avatar @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-slot @radix-ui/react-tabs
   ```

4. **Install chart and notification dependencies**

   ```bash
   npm install recharts sonner
   ```

5. **Install utility dependencies**
   ```bash
   npm install class-variance-authority clsx tailwind-merge
   ```

## Project Setup

2. **Configure Tailwind CSS**
   Make sure your `tailwind.config.js` includes the following paths:

   ```js
   content: [
     "./pages/**/*.{js,jsx}",
     "./components/**/*.{js,jsx}",
     "./app/**/*.{js,jsx}",
     "./src/**/*.{js,jsx}",
   ];
   ```

3. **Set up path aliases**
   Ensure your `jsconfig.json` includes:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

## Running the Application

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
lexilearn-ai/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login/        # Login page
│   │   └── register/     # Registration page
│   ├── (dashboard)/      # Dashboard routes
│   │   ├── teacher/      # Teacher dashboard
│   │   ├── student/      # Student dashboard
│   │   └── parent/       # Parent dashboard
│   ├── course/           # Course pages
│   ├── lessons/          # Lesson pages
│   ├── quiz/             # Quiz pages
│   └── layout.jsx        # Root layout
├── components/           # React components
│   ├── ui/              # UI components
│   │   ├── avatar.jsx
│   │   ├── badge.jsx
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── progress.jsx
│   │   ├── radio-group.jsx
│   │   ├── tabs.jsx
│   │   └── toaster.jsx
│   └── charts.jsx       # Chart components
├── hooks/               # Custom React hooks
│   └── use-toast.js    # Toast notification hook
├── lib/                # Utility functions
│   └── utils.js       # Utility functions
└── public/            # Static assets
```

## Key Features Implemented

- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📊 Interactive charts using Recharts
- 🔔 Toast notifications using Sonner
- 📱 Responsive design for all devices
- 🔒 Authentication system (to be implemented in future this is just a demo )
- 📈 Progress tracking and analytics
- 📚 Course and lesson management
- ✍️ Quiz system

## Development Guidelines

1. **Code Style**

   - Use functional components with hooks
   - Follow the existing component structure
   - Use Tailwind CSS for styling
   - Implement proper error handling

2. **Component Structure**

   - Place UI components in `components/ui`
   - Place page-specific components in their respective directories
   - Use the `@/` path alias for imports

3. **State Management**
   - Use React hooks for local state
   - Implement proper loading states
   - Handle errors appropriately

## Common Issues and Solutions

1. **Module not found errors**

   - Ensure all dependencies are installed
   - Check import paths are correct
   - Verify path aliases are configured

2. **Styling issues**

   - Check Tailwind CSS configuration
   - Verify class names are correct
   - Ensure proper CSS imports

3. **Component rendering issues**
   - Check for proper client/server component usage
   - Verify component exports
   - Check for proper prop passing

## Support

For development support:

- Check the Next.js documentation
- Review Radix UI component documentation
- Consult Tailwind CSS documentation
- Check the project's issue tracker

## License

THE SARAH License

## Acknowledgments

- Next.js team for the amazing framework
- Radix UI for the accessible components
- Tailwind CSS for the utility-first CSS framework
- Recharts for the beautiful charts
- Sonner for the toast notifications
