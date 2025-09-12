import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '../../src/components/Navigation'

// Mock the useAuth hook
const mockUseAuth = jest.fn()

jest.mock('../../src/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

describe('Navigation', () => {
  const mockLogout = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: mockLogout,
    })

    const { container } = render(<Navigation />)
    expect(container.firstChild).toBeNull()
  })

  it('renders navigation when user is authenticated', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: mockLogout,
    })

    render(<Navigation />)

    expect(screen.getByText('IFCode')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('contains correct navigation links', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: mockLogout,
    })

    render(<Navigation />)

    const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i })
    expect(dashboardLinks.length).toBeGreaterThanOrEqual(1)
    expect(dashboardLinks[0]).toHaveAttribute('href', '/dashboard')

    const usersLink = screen.getByRole('link', { name: /users/i })
    expect(usersLink).toHaveAttribute('href', '/users')
  })

  it('calls logout function when logout button is clicked', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: mockLogout,
    })

    render(<Navigation />)

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it('displays user name correctly', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'John Doe' }
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: mockLogout,
    })

    render(<Navigation />)

    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument()
  })

  it('handles missing user name gracefully', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: '' }
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      googleLogin: jest.fn(),
      logout: mockLogout,
    })

    render(<Navigation />)

    expect(screen.getByText('Welcome,')).toBeInTheDocument()
  })
})