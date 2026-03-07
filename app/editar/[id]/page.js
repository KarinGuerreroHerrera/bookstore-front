"use client"

import { useState } from "react"
import { useAuthors } from "../../context/AuthorsContext"
import { useRouter, useParams } from "next/navigation"

export default function EditarAutor() {
  const { authors, editarAutor } = useAuthors()
  const router = useRouter()
  const { id } = useParams()

  const autor = authors.find(a => String(a.id) === String(id))

  const [name, setName] = useState(autor?.name || "")
  const [birthDate, setBirthDate] = useState(autor?.birthDate || "")
  const [description, setDescription] = useState(autor?.description || "")
  const [image, setImage] = useState(autor?.image || "")
  const [error, setError] = useState("")

  const guardarCambios = (e) => {
    e.preventDefault()

    if (!name || !birthDate || !description || !image) {
      setError("Todos los campos son obligatorios")
      return
    }

    editarAutor(autor.id, { name, birthDate, description, image })
    router.push("/authors")
  }

  if (!autor) return <p>Autor no encontrado</p>

  return (
    <div>
      <h1>Editar autor</h1>
      <form onSubmit={guardarCambios} aria-label="Formulario editar autor">
        <div>
          <label>Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        <div>
          <label>Fecha de nacimiento</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        <div>
          <label>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        <div>
          <label>Imagen</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} aria-invalid={error ? "true" : "false"} />
        </div>
        {error && <p role="alert">{error}</p>}
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  )
}