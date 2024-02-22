import React from 'react'
import styles from '@/styles/productoSeleccionado.module.css'
const Tallas = ({talla}) => {
  return (
    <div className={styles.contenedorTalla}>
        <div>
            <p className={styles.talla}>Talla</p>
        </div>
        <div className={styles.contenedorArrayTallas}>
            {talla && talla.map((size, index) => (
                <button className={styles.botonTalla}>
                    {size}
                </button>
            ))}
        </div>
        
    </div>
  )
}

export default Tallas