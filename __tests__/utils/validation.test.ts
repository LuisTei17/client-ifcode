// Test validation utilities that would be used across forms

describe('Form Validation Utilities', () => {
  describe('Email validation', () => {
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    it('validates correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@domain.com',
        'firstname.lastname@subdomain.example.com'
      ]

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true)
      })
    })

    it('rejects invalid email formats', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@domain.com',
        'user@',
        'user@domain',
        'user space@domain.com',
        'user@@domain.com'
      ]

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false)
      })
    })
  })

  describe('Password validation', () => {
    const isValidPassword = (password: string): { isValid: boolean; errors: string[] } => {
      const errors: string[] = []
      
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long')
      }
      
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter')
      }
      
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter')
      }
      
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number')
      }
      
      return {
        isValid: errors.length === 0,
        errors
      }
    }

    it('validates strong passwords', () => {
      const strongPasswords = [
        'MyPassword123',
        'SecurePass1',
        'StrongP@ss1'
      ]

      strongPasswords.forEach(password => {
        const result = isValidPassword(password)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })
    })

    it('rejects weak passwords', () => {
      const weakPasswords = [
        { password: 'short', expectedErrors: 3 },
        { password: 'toolongbutnoupperornumbers', expectedErrors: 2 },
        { password: 'ALLUPPERCASE123', expectedErrors: 1 },
        { password: 'alllowercase123', expectedErrors: 1 },
        { password: 'NoNumbers', expectedErrors: 2 }
      ]

      weakPasswords.forEach(({ password, expectedErrors }) => {
        const result = isValidPassword(password)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBeGreaterThanOrEqual(1)
      })
    })
  })

  describe('Form field validation', () => {
    const validateRequiredField = (value: string, fieldName: string): string | null => {
      if (!value || value.trim() === '') {
        return `${fieldName} is required`
      }
      return null
    }

    const validateFieldLength = (value: string, fieldName: string, minLength: number, maxLength?: number): string | null => {
      if (value.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters long`
      }
      
      if (maxLength && value.length > maxLength) {
        return `${fieldName} must be no more than ${maxLength} characters long`
      }
      
      return null
    }

    it('validates required fields', () => {
      expect(validateRequiredField('', 'Name')).toBe('Name is required')
      expect(validateRequiredField('   ', 'Email')).toBe('Email is required')
      expect(validateRequiredField('Valid input', 'Name')).toBeNull()
    })

    it('validates field length constraints', () => {
      expect(validateFieldLength('ab', 'Name', 3)).toBe('Name must be at least 3 characters long')
      expect(validateFieldLength('abc', 'Name', 3)).toBeNull()
      expect(validateFieldLength('a'.repeat(101), 'Name', 1, 100)).toBe('Name must be no more than 100 characters long')
      expect(validateFieldLength('valid', 'Name', 1, 100)).toBeNull()
    })
  })

  describe('Form submission validation', () => {
    interface LoginForm {
      email: string
      password: string
    }

    interface RegisterForm extends LoginForm {
      name: string
      confirmPassword: string
    }

    const validateLoginForm = (form: LoginForm): { isValid: boolean; errors: Record<string, string> } => {
      const errors: Record<string, string> = {}
      
      if (!form.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
      }
      
      if (!form.password.trim()) {
        errors.password = 'Password is required'
      }
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      }
    }

    const validateRegisterForm = (form: RegisterForm): { isValid: boolean; errors: Record<string, string> } => {
      const errors: Record<string, string> = {}
      
      if (!form.name.trim()) {
        errors.name = 'Full name is required'
      }
      
      if (!form.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
      }
      
      if (!form.password.trim()) {
        errors.password = 'Password is required'
      } else if (form.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
      }
      
      if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      }
    }

    it('validates login form correctly', () => {
      const validForm: LoginForm = {
        email: 'test@example.com',
        password: 'password123'
      }
      
      const result = validateLoginForm(validForm)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('catches login form errors', () => {
      const invalidForm: LoginForm = {
        email: 'invalid-email',
        password: ''
      }
      
      const result = validateLoginForm(invalidForm)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBe('Please enter a valid email address')
      expect(result.errors.password).toBe('Password is required')
    })

    it('validates register form correctly', () => {
      const validForm: RegisterForm = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      }
      
      const result = validateRegisterForm(validForm)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('catches register form errors', () => {
      const invalidForm: RegisterForm = {
        name: '',
        email: 'invalid-email',
        password: 'short',
        confirmPassword: 'different'
      }
      
      const result = validateRegisterForm(invalidForm)
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Full name is required')
      expect(result.errors.email).toBe('Please enter a valid email address')
      expect(result.errors.password).toBe('Password must be at least 8 characters long')
      expect(result.errors.confirmPassword).toBe('Passwords do not match')
    })
  })
})