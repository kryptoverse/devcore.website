# DevCore - Modern Web Agency Platform

A stunning Next.js web application featuring real-time chat, authentication, and a beautiful UI showcasing web agency services.

## 🌟 Features

### 🎨 Modern UI/UX
- **Responsive Design** - Fully responsive across all devices
- **Dark/Light Mode** - Theme switching with next-themes
- **Smooth Animations** - Framer Motion animations throughout
- **Glassmorphism Effects** - Modern design aesthetics
- **Interactive Components** - Engaging user interactions

### 🔐 Authentication System
- **NextAuth.js Integration** - Secure authentication
- **Email/Password Login** - Traditional credentials auth
- **Email Verification** - 6-digit code verification
- **Password Reset** - Secure password recovery
- **Protected Routes** - Middleware-based route protection
- **Session Management** - Persistent user sessions

### 💬 Real-time Chat System
- **Socket.io Integration** - Real-time messaging
- **Role-based Chat** - Customers ↔ Admins communication
- **Online Status** - Real-time presence indicators
- **Global Notifications** - Toast notifications on any page
- **Admin Online Alerts** - Customers notified when admin connects
- **Message Notifications** - Alerts for new messages
- **Mobile Responsive Chat** - Adaptive layout for mobile devices
- **Message History** - Persistent chat history

### 📱 Pages & Sections
- **Home Page** - Hero, Services, Portfolio, Team, Testimonials
- **Services Showcase** - UI/UX Design, Blockchain, Game Dev, Web Dev, AI & Automation
- **Contact Form** - Get in touch functionality
- **Chat Interface** - Real-time customer support
- **Authentication Pages** - Sign In, Sign Up, Verify Email, Password Reset
- **Legal Pages** - Privacy Policy, Terms & Conditions

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.4
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io Client
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Icons**: Iconify, Lucide React
- **Notifications**: React Hot Toast
- **Theme**: next-themes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend README)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devcore-frontend.git
cd devcore-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Your app URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `SECRET` | App secret key | Yes |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── chat/              # Chat page
│   │   │   ├── contact/           # Contact page
│   │   │   ├── signin/            # Sign in page
│   │   │   ├── signup/            # Sign up page
│   │   │   ├── verify-email/      # Email verification
│   │   │   ├── forgot-password/   # Password reset request
│   │   │   └── reset-password/    # Password reset
│   │   ├── api/
│   │   │   ├── auth/              # NextAuth API routes
│   │   │   ├── layout-data/       # Layout data API
│   │   │   └── page-data/         # Page data API
│   │   ├── components/
│   │   │   ├── auth/              # Auth components
│   │   │   ├── chat/              # Chat components
│   │   │   ├── home/              # Home page sections
│   │   │   ├── layout/            # Header, Footer
│   │   │   └── ui/                # Reusable UI components
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── lib/
│   │   └── auth.ts                # NextAuth configuration
│   ├── providers/
│   │   ├── Provider.tsx           # Global providers
│   │   └── SocketProvider.tsx     # Socket.io provider
│   ├── store/
│   │   └── useChatStore.ts        # Chat state management
│   └── types/
│       └── next-auth.d.ts         # NextAuth type definitions
├── public/
│   └── images/                    # Static assets
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

## 🎨 Key Components

### Chat System
- **ChatContainer** - Main chat layout
- **Sidebar** - User list with online status
- **ChatWindow** - Message display and input
- **ChatHeader** - Chat header with user info
- **MessageInput** - Message composition
- **SocketProvider** - Global socket connection manager

### Authentication
- **SignIn** - Login form with verification link
- **SignUp** - Registration form
- **VerifyEmail** - Email verification with resend
- **ForgotPassword** - Password reset request
- **ResetPassword** - New password form

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Features Breakdown

### Services Offered
1. **UI/UX Design** - User interface and experience design
2. **Blockchain Development** - Decentralized applications
3. **Game Development** - Interactive gaming experiences
4. **Website Development** - Modern web applications
5. **AI & Automation** - Intelligent automation solutions

### Chat Features
- ✅ Real-time messaging
- ✅ Role-based access (Admin/Customer)
- ✅ Online/offline status
- ✅ Global notifications
- ✅ Mobile responsive
- ✅ Message persistence
- ✅ Typing indicators ready
- ✅ Admin online alerts

### Authentication Features
- ✅ Email/password authentication
- ✅ Email verification with code
- ✅ Resend verification code
- ✅ Password reset via email
- ✅ Protected routes
- ✅ Session persistence
- ✅ Role-based access control

## 🔒 Security

- NextAuth.js for secure authentication
- HTTP-only cookies for session tokens
- CSRF protection
- Environment variable protection
- Secure password reset flow
- Email verification requirement

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Adaptive chat interface
- Touch-friendly interactions
- Optimized images

## 🎨 Design System

- Consistent color palette
- Typography scale
- Spacing system
- Component library
- Animation guidelines

## 📝 Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email hello@devcore.website or visit [www.devcore.website](https://www.devcore.website)

## 📄 License

ISC

## 👥 Author

DevCore Team

---

**Live Demo**: [https://www.devcore.website](https://www.devcore.website)
