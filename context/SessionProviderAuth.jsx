'use client'

import React from 'react'
import {SessionProvider} from "next-auth/react"

/// provedor para manejar la sesion de los usuarios.
const SessionProviderAuth = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionProviderAuth