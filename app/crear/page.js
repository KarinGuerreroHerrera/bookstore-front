"use client"

import { useState } from "react"
import { useAuthors } from "../context/AuthorsContext"
import { useRouter } from "next/navigation"

export default function CrearUsuario() {
  const { agregarAutor } = useAuthors()
  const router = useRouter()

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState("")

  const enviarFormulario = (e) => {
    e.preventDefault()

    if (!name || !birthDate || !description || !image) {
      setError("Todos los campos son obligatorios")
      return
    }

    agregarAutor({ name, birthDate, description, image })

    setName("")
    setBirthDate("")
    setDescription("")
    setImage("")
    setError("")

    router.push("/authors")
  }

  return (
    <div>
      <h1>Crear usuarios</h1>
      <form onSubmit={enviarFormulario} aria-label="Formulario crear usuario">
        <div>
          <label htmlFor="name">Nombre</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        <div>
          <label htmlFor="birthDate">Fecha de nacimiento</label>
          <input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>  
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        <div>
          <label htmlFor="image">Imagen</label>
          <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        {error && <p role="alert">{error}</p>}
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  )
}