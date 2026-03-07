"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthorsContext = createContext()

export function AuthorsProvider({ children }) {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data))
  }, [])

  const agregarAutor = (nuevoAutor) => {
    setAuthors(prev => [...prev, { ...nuevoAutor, id: Date.now() }])
  }
  const editarAutor = (id, datosActualizados) => {
    setAuthors(prev => prev.map(autor => autor.id === id ? { ...autor, ...datosActualizados } : autor))
  }
  const eliminarAutor = (id) => {
    setAuthors(prev => prev.filter(autor => autor.id !== id))
  }

  return (
    <AuthorsContext.Provider value={{ authors, agregarAutor, editarAutor, eliminarAutor }}>
      {children}
    </AuthorsContext.Provider>
  )
}

export function useAuthors() {
  return useContext(AuthorsContext)
}