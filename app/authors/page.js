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
          <li key={author.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            {author.image && (
              <img src={author.image} alt={author.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            )}
            <h2>{author.name}</h2>
            <p><strong>Fecha de nacimiento:</strong> {author.birthDate}</p>
            <p>{author.description}</p>
            <button onClick={() => router.push(`/editar/${author.id}`)}>Editar</button>
            <button onClick={() => eliminarAutor(author.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}