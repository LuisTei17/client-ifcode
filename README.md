# IFCode Client

A modern Next.js client application with JWT authentication, user management, and Google OAuth integration. Built with TypeScript and Tailwind CSS.

## Features

### 🔐 Authentication
- **JWT Token Authentication** - Secure token-based authentication with automatic token refresh
- **Email/Password Login** - Traditional email and password authentication
- **User Registration** - Account creation with form validation
- **Google OAuth 2.0** - Social authentication integration (UI ready)
- **Protected Routes** - Automatic route protection for authenticated users
- **Persistent Sessions** - Login state maintained across browser sessions

### 👥 User Management (CRUD Operations)
- **List Users** - `GET /users` - View all users in a paginated table
- **Create User** - `POST /users` - Add new users with validation
- **View User Details** - `GET /users/:id` - Display individual user information
- **Update User** - `PATCH /users/:id` - Edit user name and email
- **Delete User** - `DELETE /users/:id` - Remove users with confirmation

### 🎨 User Interface
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Modern UI Components** - Clean and intuitive user interface
- **Loading States** - Proper loading indicators for all async operations
- **Error Handling** - Comprehensive error messages and retry functionality
- **Form Validation** - Client-side validation with helpful error messages

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Running API server (see API Configuration section)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LuisTei17/client-ifcode.git
cd client-ifcode
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Configuration

The client expects a backend API with the following endpoints:

### Authentication Endpoints
```
POST /auth/login - User login
POST /auth/register - User registration  
POST /auth/google - Google OAuth authentication
```

### User Management Endpoints
```
GET /users - List all users (protected)
POST /users - Create new user (protected)
GET /users/:id - Get user by ID (protected)
PATCH /users/:id - Update user (protected)
DELETE /users/:id - Delete user (protected)
```

## Project Structure

```
src/
├── app/                    # Next.js 13+ App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── users/             # User management pages
│       ├── create/        # Create user page
│       └── [id]/          # Dynamic user pages
│           ├── page.tsx   # User details
│           └── edit/      # Edit user page
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Main navigation
│   └── ProtectedRoute.tsx # Route protection wrapper
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
└── lib/                   # Utilities and configuration
    └── api.ts             # API client with Axios
```

## Technologies Used

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Authentication**: JWT tokens with js-cookie
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Authentication Flow

1. **Login/Register**: Users can create accounts or sign in with email/password
2. **Token Storage**: JWT tokens are stored in secure HTTP-only cookies
3. **Auto-Refresh**: Tokens are automatically included in API requests
4. **Route Protection**: Protected pages redirect unauthenticated users to login
5. **Logout**: Clears tokens and redirects to home page

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
