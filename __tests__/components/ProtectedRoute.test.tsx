import { render, screen } from '@testing-library/react'
import ProtectedRoute from '../../src/components/ProtectedRoute'

// Mock the dependencies
const mockUseAuth = jest.fn()
const mockPush = jest.fn()

jest.mock('../../src/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })
}))

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading spinner when loading is true', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
      isAuthenticated: false,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: jest.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders nothing and redirects to login when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: jest.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(mockPush).toHaveBeenCalledWith('/login')
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: jest.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('does not redirect when loading is true', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
      isAuthenticated: false,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: jest.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(mockPush).not.toHaveBeenCalled()
  })
})