import { render, screen } from '@testing-library/react'
import CrearUsuario from '../app/crear/page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('../app/context/AuthorsContext', () => ({
  useAuthors: () => ({ agregarAutor: jest.fn() }),
}))

const setup = () => {
  render(<CrearUsuario />)

  const heading = screen.getByRole('heading', { name: /crear usuarios/i })
  const nameInput = screen.getByLabelText(/nombre/i)
  const fechaInput = screen.getByLabelText(/fecha de nacimiento/i)
  const descInput = screen.getByLabelText(/descripción/i)
  const imgInput = screen.getByLabelText(/imagen/i)
  const submitBtn = screen.getByRole('button', { name: /crear usuario/i })

  return { heading, nameInput, fechaInput, descInput, imgInput, submitBtn }
}

describe('Render inicial de /crear', () => {
  test('renderiza el título, todos los campos y el botón', () => {
    const { heading, nameInput, fechaInput, descInput, imgInput, submitBtn } = setup()

    expect(heading).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(fechaInput).toBeInTheDocument()
    expect(descInput).toBeInTheDocument()
    expect(imgInput).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })
})