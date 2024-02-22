
import React from 'react'
import styles from '../styles/HomeSeccion1.module.css'
import { useRouter } from 'next/navigation'
const  HomeSeccion1 = () => {

  const router = useRouter()

  const CambiarRuta = () =>{
    router.push('/productos')
  }

  return (
    <div className={styles.contenedor}>
        <div className={styles.contenedorNegro}>
          <div className={styles.contenedorDatos}>
              <h1 className={styles.textoTitulo}>SportFitStyle</h1>
              <div className={styles.contenedorDescripcion}>
                <p className={styles.textoDescripcion}>Explora para encontrar todo lo que necesitas en ropa deportiva</p>
              </div>   
              <div className={styles.contenedorBoton}>
                <button className={styles.boton} onClick={CambiarRuta}>
                    Ver Productos
                </button>
              </div>
          </div>
        </div>
      </div>
  )
}

export default HomeSeccion1