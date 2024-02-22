'use client'

import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Image from 'next/image'
import styles from '../../../styles/productoSeleccionado.module.css'
import Tallas from '@/Components/Tallas'
import RootLayout from '@/app/layout'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import {CarritoContext} from '@/context/contexCart'

function Articulos({params}) {

  const [producto, setProducto] = useState()
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0)

  // datos del usuario al iniciar sesion.
  const {data: session} = useSession()
  const token = session?.user.token
  const userId = session?.user.id
  const {largoCarrito, setLargoCarrito, AddPr} = useContext(CarritoContext)

  // cuando seleccionen un producto, se le mostrara su informacion.
  useEffect(() =>{

    const getProduct = async() =>{
      try{
        const response = await axios.get(`http://localhost:4000/productoSeleccionado?id=${params.id}`)
        setProducto(response.data.productos)

      }catch(error){
        console.log(error)
      }
    }

    getProduct()

  },[])

  const AgregarCarrito = async() =>{

    try{
      const response = await axios.post('http://localhost:4000/addProductCart', {idUser:userId, idProduct:params.id},
      {headers:{
        authorization: `Bearer ${token}`
      }})

      // aumentamos el valor del largo del carrito
      AddPr()
      Swal.fire({
        title: response.data.message,
        icon: "success",
        timer:1800
      });

    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    }


  }

  return (
    <RootLayout showNavigation={true}>
      <div className={styles.contenedor}>
        {producto ? 
        <>
          {/* imagenes del producto  */}
          <div className={styles.contenedorImagenes}>
            <div className={styles.contenedorImagenesPequeñas}>
                {producto.imageUrl.map((imagen, index) => (
                  <button key={index} onClick={() => setImagenSeleccionada(index)} className={ index === imagenSeleccionada ? styles.botonImagenSeleccionada : styles.botonImagenes}>
                      <Image src={imagen} width={70} height={70} alt={producto.name} />
                  </button>
                ))}
            </div>
            <Image  src={producto.imageUrl[imagenSeleccionada]} width={650} height={650} alt={producto.name} />
          </div>

          {/* info del product */}
          <div className={styles.infoProduct}>
            <div>
              <h3>{producto.name}</h3>
              <p className={styles.prices}>${producto.price}</p>
            </div>

            {/* info del producto */}
            <div>
                <p> ¿Qué es una camiseta versión fan?<br/><br/>⚽ Es una camiseta pensada para el hincha casual, holgada y de corte recto (Regular fit).
                <br/>⚽ Tela gruesa y resistente, 100% Poliéster reciclado.
                <br/>⚽ Sus escudos y logos están perfectamente bordados.
                <br/>⚽ Tipografía y color del estampado, idéntico al de la camiseta que usa el equipo.
                <br/>⚽ Si prefieres un ajuste más holgado recomendamos 1 talla más.
                <p>{largoCarrito}</p>
                </p>
            </div>
            {/* tallas disponibles */}
            <div>
                <Tallas talla={['XS','S','M','L','XL']}/>
            </div>
            <div className={styles.contenedorBoton}>
                <button onClick={AgregarCarrito} className={styles.carritoButton}>
                  Agregar Al Carrito
                </button>
            </div>          
            
          </div>
        </>    
        : <div>Cargando...</div>}
      </div>
    </RootLayout>
  )
}

export default Articulos