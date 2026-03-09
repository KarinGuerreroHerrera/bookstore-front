import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CrearUsuario from '../app/crear/page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('../app/context/AuthorsContext', () => ({
  useAuthors: () => ({ agregarAutor: jest.fn() }),
}))

const setup = () => {
  render(<CrearUsuario />)
  return {
    user: userEvent.setup(),
    nameInput: screen.getByLabelText(/nombre/i),
    fechaInput: screen.getByLabelText(/fecha de nacimiento/i),
    descInput: screen.getByLabelText(/descripción/i),
    imgInput: screen.getByLabelText(/imagen/i),
    submitBtn: screen.getByRole('button', { name: /crear usuario/i }),
  }
}

describe('Formulario de creación de autor', () => {

  test('renderiza correctamente los campos del formulario', () => {
    const { nameInput, fechaInput, descInput, imgInput } = setup()
    expect(nameInput).toBeInTheDocument()
    expect(fechaInput).toBeInTheDocument()
    expect(descInput).toBeInTheDocument()
    expect(imgInput).toBeInTheDocument()
  })

  test('el botón inicia deshabilitado', () => {
    const { submitBtn } = setup()
    expect(submitBtn).toBeDisabled()
  })

  test('muestra mensaje de error si se envía el formulario vacío', async () => {
    render(<CrearUsuario />)
    const form = screen.getByRole('form', { name: /formulario crear usuario/i })
    fireEvent.submit(form)
    expect(await screen.findByRole('alert')).toHaveTextContent(/todos los campos son obligatorios/i)
  })

  test('el botón permanece deshabilitado con datos incompletos', async () => {
    const { user, nameInput, submitBtn } = setup()
    await user.type(nameInput, 'Solo nombre')
    expect(submitBtn).toBeDisabled()
  })

  test('el botón se habilita cuando todos los campos tienen datos', async () => {
    const { user, nameInput, fechaInput, descInput, imgInput, submitBtn } = setup()
    await user.type(nameInput, 'Stephen King')
    await user.type(fechaInput, '1947-09-21')
    await user.type(descInput, 'Escritor de novelas de terror')
    await user.type(imgInput, 'https://imagen.com/stephen.jpg')
    expect(submitBtn).not.toBeDisabled()
  })

  test('los errores desaparecen cuando el formulario se completa correctamente', async () => {
    const { user, nameInput, fechaInput, descInput, imgInput } = setup()
    render(<CrearUsuario />)
    const form = screen.getAllByRole('form', { name: /formulario crear usuario/i })[0]
    fireEvent.submit(form)
    expect(await screen.findAllByRole('alert')).not.toHaveLength(0)
    await user.type(nameInput, 'Stephen King')
    await user.type(fechaInput, '1947-09-21')
    await user.type(descInput, 'Autor famoso')
    await user.type(imgInput, 'https://imagen.com')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

})