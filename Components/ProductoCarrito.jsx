'use client'

import React from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductoCarrito.module.css'
import quitar from '../public/menos.png'
import agregar from '../public/agregar.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import eliminar from '../public/eliminar.png'


const productoCarrito = ({ productos, cantidad}) => {

  const {data: session} = useSession()

  const token = session?.user.token
  const idUser = session?.user.id

  const PrecioTotalProductos = (cantidad, precio) =>{
    return cantidad * precio
  }

  // quitar del carrito un producto de a 1, en caso que sea 1 se elimina completo.
  const RemoveProduct = async(id) =>{
      try{
          const response = await axios.delete(`http://localhost:4000/removeProductCart?idProduct=${id}&idUser=${idUser}`,
            {headers:{authorization:`Bearer ${token}`}},
          )
          // mandamos una alerta al usuario.
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1200
          });
          
          // relogeamos la pagina
          setTimeout(() => {
            window.location.reload(); 
          }, 1200);

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

  // eliminar el producto completo del carrito.
  const DeleteProduct = async(idProduct) =>{
    try{

      const response = await axios.delete(`http://localhost:4000/deleteProduct?idProduct=${idProduct}&idUser=${idUser}`,
      {headers:
        {authorization:`Bearer ${token}`}
      })
      
      //alerta al usuario.
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1200
      });

      // relogeamos la pagina
      setTimeout(() => {
        window.location.reload(); 
      }, 1200);

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
  // agregar un producto mas.
  const AddProduct = async(id) =>{
    try{
        const response = await axios.post(`http://localhost:4000/addProductCart`,{idProduct:id, idUser:idUser},
          {headers:{authorization:`Bearer ${token}`}},
        )
        // mandamos una alerta al usuario.
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1200
        });
          // relogeamos la pagina
        setTimeout(() => {
          window.location.reload(); 
        }, 1200);
            
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
    <div className={styles.contenedorProductosCarrito}>
        <h4>Productos del Carrito</h4>
        { productos && productos.map((item, index) => (       
        <div key={index} className={styles.contenedorProductoCarrito}>                      
            <div className={styles.ProductoCarritoInfo}>
                  <Image className={styles.imagenProductoCarrito} src={item.imageUrl} width={100} height={100} alt='imagen' />
                  <div className={styles.infoProducto}>
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                  </div>
            </div>
            <div className={styles.cantidadProductos}>
                <button onClick={() => RemoveProduct(item.id)}  className={styles.cantidadBoton}>
                  <Image src={quitar} width={20} height={20}  alt='quitar'/>
                </button>                                              
                <p className={styles.cantidadParrafo}>{cantidad[index].quantity}</p>
                <button onClick={() => AddProduct(item.id)} className={styles.cantidadBoton}>
                  <Image src={agregar} width={20} height={20} alt='agregar'/>   
                </button>
                <p className={styles.precio}>${item.price}</p>
            </div>

            <p className={styles.precioTotal}>${PrecioTotalProductos(cantidad[index].quantity, item.price)}</p>
            <button onClick={() => DeleteProduct(item.id)} className={styles.cantidadBoton}>
              <Image src={eliminar} width={25} height={25} alt='eliminar'/>   
            </button>
        </div>
        ))}
    </div>
  )
}

export default productoCarrito