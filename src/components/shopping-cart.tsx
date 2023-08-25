'use client'

import { Movie } from '@prisma/client'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

import { CheckoutDialog } from '@/components/checkout-dialog'

const ShoppingCartContext = createContext({
  addMovie: (movie: Movie) => {},
  checkout: () => {},
  itemCount: 0,
})

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: PropsWithChildren) {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])

  return (
    <ShoppingCartContext.Provider
      value={{
        addMovie: (movie: Movie) => {
          setMovies((movies) => [...movies, movie])
        },
        checkout: () => {
          setCheckoutOpen(true)
        },
        itemCount: movies.length,
      }}
    >
      {children}
      <CheckoutDialog
        checkoutOpen={checkoutOpen}
        setCheckoutOpen={setCheckoutOpen}
        itemCount={movies.length}
        clearCart={() => setMovies([])}
      />
    </ShoppingCartContext.Provider>
  )
}
