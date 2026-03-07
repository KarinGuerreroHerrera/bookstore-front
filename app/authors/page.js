"use client"

import { useAuthors } from "../context/AuthorsContext"
import { useRouter } from "next/navigation"

export default function Authors() {
  const { authors, eliminarAutor } = useAuthors()
  const router = useRouter()

  return (
    <div>
      <h1>Lista de autores</h1>
      <ul>
        {authors.map(author => (
          <li key={author.id}>
            {author.name}
            <button onClick={() => router.push(`/editar/${author.id}`)}>Editar</button>
            <button onClick={() => eliminarAutor(author.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}