'use client'

import React from 'react'
import styles from '@/styles/ResumenCarrito.module.css'

const  ResumenCarrito = ({precioTotal, cantidadProductos}) => {
  return (
    <div className={styles.contenedorResumen}>
        <h4>Resumen de la Compra</h4>
        <div className={styles.totalProductos}>
            <div className={styles.datosProduct}>
                    <p className={styles.datoproduct}>Cantidad de productos: </p>
                    <p className={styles.cantidadPro}> ({cantidadProductos})</p>
            </div>
                           
            <div className={styles.precioTotal}>
                <p className={styles.datoPrecio}>Total:</p>
                <p className={styles.precioFinal}>${precioTotal}</p>
            </div>

            <button className={styles.botonCart}>
                Comprar
            </button>
        </div>
    </div>
  )
}

export default ResumenCarrito