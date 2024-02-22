import React from 'react'
import styles from '../styles/productos.module.css'
import iconLeft from '../public/icon-left.png'
import iconRight from '../public/icon-right.png'
import Image from 'next/image'

const Pagination = ({setCurrectPage, currectPage, pagination, firstPage, lastPage, totalProducts,modulo}) => {

    // funcion retroceder
    const Retroceder = () =>{
        if(currectPage > 1){
            setCurrectPage(currectPage - 1)
            window.scrollTo({top:0,behavior:'smooth'})
        }
            return
    }
    
    // funcion Avanzar
    const Avanzar = () =>{
        if(currectPage < pagination){
            setCurrectPage(currectPage+1)
            window.scrollTo({top:0,behavior:'smooth'})
        }
            return
    }

    const totalModulos = totalProducts % 9

  return (
    <div className={styles.contenedorBotones}>
        
        {currectPage === Math.floor(pagination+1) && modulo === 1 ? 
         <div className={styles.resultados}>{firstPage+1}-{totalModulos + firstPage} de {totalProducts} resultados</div> :
         <div className={styles.resultados}>{firstPage+1}-{lastPage} de {totalProducts} resultados</div>
        }

        <div className={styles.containerBoton}>
            <div>
                <button className={styles.botones} onClick={() => Retroceder()} ><Image src={iconLeft} width={30} height={30} alt='flechasNavegacion' /> </button>
            </div>
            <div className={styles.paginationNum}>
                {pagination ? Array.from({length:pagination+modulo}, (_, index) => (
                    <button  key={index} onClick={() =>{setCurrectPage(index+1), window.scrollTo({top:0,behavior:'smooth'})}} className={ index+1 === currectPage ? `${styles.fondoColor}` : `${styles.circuloPagina}`}>
                    {index+1}
                    </button>
                )): <div>Cargando...</div>}
            </div>
                        
            <div>
                <button className={styles.botones} onClick={() => Avanzar()}><Image src={iconRight} width={30} height={30} alt='botonRight' /></button>
            </div>
        </div>
        
    </div>
  )
}

export default Pagination