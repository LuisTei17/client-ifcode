# Testing Documentation

This document describes the testing setup and structure for the IFCode Client application.

## Testing Stack

- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements

## Test Structure

```
__tests__/
├── components/          # Component tests
│   ├── Navigation.test.tsx
│   └── ProtectedRoute.test.tsx
├── contexts/            # Context tests
│   └── AuthContext.test.tsx
├── lib/                 # Library/utility tests
│   ├── api.test.ts
│   └── interceptors.test.ts
├── pages/               # Page component tests
│   └── login.test.tsx
└── utils/               # Utility function tests
    └── validation.test.ts
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

Current test coverage includes:

### Components (100% Coverage)
- **Navigation.tsx** - Tests navigation rendering, user display, and logout functionality
- **ProtectedRoute.tsx** - Tests route protection, loading states, and authentication redirects

### Core Functionality Tests
- **AuthContext** - Authentication state management, error handling, and token validation
- **API Functions** - Data validation, error handling, and API endpoint structure
- **Form Validation** - Email validation, password strength, and form submission validation
- **Login Page** - Form validation, error handling, loading states, and authentication flows

## Test Patterns

### 1. Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import Component from '../src/components/Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 2. Mocking Dependencies
```typescript
// Mock external dependencies
const mockFunction = jest.fn()
jest.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => mockFunction()
}))
```

### 3. User Interaction Testing
```typescript
import userEvent from '@testing-library/user-event'

it('handles user interactions', async () => {
  const user = userEvent.setup()
  render(<Component />)
  
  const button = screen.getByRole('button')
  await user.click(button)
  
  expect(mockFunction).toHaveBeenCalled()
})
```

### 4. Form Testing
```typescript
it('validates form input', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)
  
  const emailInput = screen.getByLabelText(/email/i)
  await user.type(emailInput, 'invalid-email')
  
  expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
})
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation
- Focus on what the component does, not how it does it
- Test user interactions and expected outcomes
- Avoid testing internal state or implementation details

### 2. Use Descriptive Test Names
```typescript
// Good
it('shows error message when login fails')

// Bad  
it('test login error')
```

### 3. Arrange, Act, Assert Pattern
```typescript
it('updates user name when form is submitted', async () => {
  // Arrange
  const user = userEvent.setup()
  render(<EditUserForm />)
  
  // Act
  const nameInput = screen.getByLabelText(/name/i)
  await user.clear(nameInput)
  await user.type(nameInput, 'New Name')
  await user.click(screen.getByRole('button', { name: /save/i }))
  
  // Assert
  expect(mockUpdateUser).toHaveBeenCalledWith({ name: 'New Name' })
})
```

### 4. Mock External Dependencies
- Mock API calls, router navigation, and external services
- Keep mocks simple and focused on the specific test case
- Reset mocks between tests using `beforeEach`

### 5. Test Edge Cases
- Empty states
- Loading states
- Error states
- Authentication states (logged in/out)
- Form validation errors

## Mocking Strategies

### Authentication Context
```typescript
const mockUseAuth = jest.fn()
jest.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

// In test
mockUseAuth.mockReturnValue({
  user: mockUser,
  isAuthenticated: true,
  loading: false,
  // ... other auth functions
})
```

### Next.js Router
```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    // ... other router methods
  })
}))
```

### API Calls
```typescript
// Test validation logic without actual API calls
const isValidLoginData = (email: string, password: string) => {
  return email.includes('@') && password.length >= 6
}

expect(isValidLoginData('test@example.com', 'password')).toBe(true)
```

## Continuous Integration

Tests run automatically on:
- Pull requests
- Push to main branch
- Before deployments

All tests must pass before code can be merged.

## Adding New Tests

When adding new features:

1. **Write tests first** (TDD approach recommended)
2. **Test the happy path** - normal user flow
3. **Test error cases** - what happens when things go wrong
4. **Test edge cases** - empty states, boundary conditions
5. **Update this documentation** if new patterns are introduced

## Debugging Tests

### Common Issues

1. **Module resolution errors**
   - Ensure paths are correct (use relative paths for imports in tests)
   - Check Jest configuration for module mapping

2. **Async issues**
   - Use `waitFor` for async operations
   - Use `act` for state updates
   - Properly mock async functions

3. **Mocking issues**
   - Clear mocks between tests
   - Mock at the module level, not inside tests
   - Ensure mock implementations match expected interface

### Debug Commands

```bash
# Run specific test file
npm test Navigation.test.tsx

# Run tests in verbose mode
npm test -- --verbose

# Run tests with debugging
npm test -- --detectOpenHandles
```

This testing setup ensures reliability, maintainability, and confidence in the codebase while following React and Next.js testing best practices.