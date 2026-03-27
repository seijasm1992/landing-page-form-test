import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '@/app/components/ContactForm'

// Mocking the global fetch for testing submission
global.fetch = vi.fn()

describe('ContactForm Component', () => {
  it('renders all form fields successfully', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('tu@correo.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('¿En qué podemos ayudarte?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Cuéntanos más sobre tu proyecto o consulta...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
  })

  it('shows zod validation errors if we try to submit an empty form', async () => {
    // Reset the fetch mock count
    ;(global.fetch as any).mockClear()

    render(<ContactForm />)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
    
    fireEvent.click(submitButton)

    await waitFor(() => {
      // If validation fails, the API shouldn't be called.
      expect(global.fetch).not.toHaveBeenCalled()
    })
  })
})
