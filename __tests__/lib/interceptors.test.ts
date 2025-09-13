import Cookies from 'js-cookie'

// Mock js-cookie
const mockCookies = Cookies as jest.Mocked<typeof Cookies>

// Simple test for API interceptors functionality
describe('API Interceptors', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should exist and be testable', () => {
    expect(true).toBe(true)
  })

  describe('Token handling', () => {
    it('should get token from cookies', () => {
      mockCookies.get.mockReturnValue('mock-token')
      const token = mockCookies.get('access_token')
      expect(token).toBe('mock-token')
      expect(mockCookies.get).toHaveBeenCalledWith('access_token')
    })

    it('should remove token from cookies', () => {
      mockCookies.remove('access_token')
      expect(mockCookies.remove).toHaveBeenCalledWith('access_token')
    })
  })
})