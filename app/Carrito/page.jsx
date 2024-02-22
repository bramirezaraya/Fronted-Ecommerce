'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RootLayout from '@/app/layout'
import styles from '../../styles/userCart.module.css'
import carritoVacio from '../../public/carro-vacio.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ProductoCarrito from '@/Components/ProductoCarrito'
import ResumenCarrito from '@/Components/ResumenCarrito'
import { useSession } from 'next-auth/react'

const UserCart = () => {

  const [productos, setProductos] = useState(null)  
  const [cantidad, setCantidad] = useState(null)
  const [precioTotal, setPrecioTotal] = useState(0)
  const [cantidadProductos, setCantidadProductos] = useState(0)
  const [reload, setReload] = useState(true)

  const ruta = useRouter()

   const {data: session} = useSession()
    const userId = session?.user.id
    const token = session?.user.token

  useEffect(() =>{

    const getProductCart = async() =>{
        try{
            if(userId && token){
                const response = await axios.get(`http://localhost:4000/userCart?userId=${userId}`,
                {
                    headers:{authorization:`Bearer ${token}`}
                })
                setProductos(response.data.ProductosOrdenados)
                setCantidad(response.data.userCart) // cantidad de productos de un articulos.

                // total productos.
                let cantidadP = 0;
                response.data.userCart.map((item) => cantidadP = cantidadP + item.quantity)
                setCantidadProductos(cantidadP)

                // precio total de los productos
                let precioTotal = 0;
                response.data.userCart.map((item, index) => {
                    precioTotal = precioTotal + (item.quantity * response.data.ProductosOrdenados[index].price)
                })
                setPrecioTotal(precioTotal)
            }
        }catch(error){
            console.log(error)
        }
    }
    getProductCart()
    // para mostrar el reload en un tiempo definido.
    setTimeout(() => {
        setReload(false)
    }, 300);
  },[token, userId])

  return (
    <RootLayout showNavigation={true}>
        <div className={styles.contenedor}>
            
            {reload ? 
                // loading boostrap
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div> 
                : 
                <>
                    {productos ? 
                        <div className={styles.contenedorCarrito}>
                            {/* productos en el carrito */}
                            <ProductoCarrito productos={productos} cantidad={cantidad}/>
                                        
                            {/* resumen carrito */}
                            <ResumenCarrito precioTotal={precioTotal} cantidadProductos={cantidadProductos} />
                        </div>
                        : 
                        <div className={styles.contenedorCartVacio}>
                            <div className={styles.contenedorInfoCartVacio}>
                                <Image src={carritoVacio} width={80} height={80} alt='imagen'/>
                                <div className={styles.cartVacioInfo}>
                                    <h4>Tu carrito esta vacío</h4>
                                    <p>Aprovecha Tenemos varias camisetas para tu elección</p>
                                </div>
                            </div>         
                            <button onClick={() => ruta.push('/productos') } href={'/productos'} className={styles.botonCartVacio}>
                                Ver Productos
                            </button>
                        </div>
                    }
                </>
            }
                 
        </div>
    </RootLayout>
   
  )
}

export default UserCart