'use client'

import { useState, createContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export const CarritoContext = createContext() // creamos el contexto

// creamos el componente que exportaremos como padre con sus respectivos values que compartiremos.
function contexCart({children}) {

    const [largoCarrito, setLargoCarrito] = useState(0)
    const {data: session} = useSession()

    // actualizamos el primer valor de largoCarrito
    useEffect(() =>{

        const largoCart = async() =>{
  
          const response = await axios.get(`http://localhost:4000/userCart?userId=${session.user.id}`,
            {
              headers:{authorization:`Bearer ${session.user.token}`}
            }
          )
          if(response.data.success === 1){
            const largo = response.data.userCart.reduce((suma, item) => suma + item.quantity, 0)
            setLargoCarrito(largo)
          }
          return    
        }
        
        if(session){
          largoCart()
        }           
  
    },[session?.user])

    // agregar uno mas al largo.
    const AddPr = () =>{
        setLargoCarrito(largoCarrito + 1)
    }

  return (
    <CarritoContext.Provider value={{largoCarrito, setLargoCarrito, AddPr}}  >
        {children}
    </CarritoContext.Provider>
  )
}

export default contexCart

