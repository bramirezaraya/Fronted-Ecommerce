import React from 'react'
import Image from 'next/image'
import flechaArriba from '../public/ampliar-arriba.png'
import flechaAbajo from '../public/ampliar-abajo.png'
import styles from '../styles/productos.module.css'

const Filtros = ({nameTitulo, setItem, item, ArrayFiltro, setItemArray, itemArray}) => {


    const CambioEstado = (dato) =>{

        const copiaArray = [...itemArray]

        const index = copiaArray.indexOf(dato)

        if(index == -1){
            copiaArray.push(dato)
        }else{
            copiaArray.splice(index,1)
        }

        setItemArray(copiaArray)
    }


  return (
    <div className={styles.filtro}>
                    <div className={styles.filtrosDespliegue}>
                      <h5>{nameTitulo}</h5>
                        <button className={styles.botonFiltroDespliegue} onClick={() => setItem(!item)}>
                            <Image src={item ? flechaArriba : flechaAbajo} width={20} height={20} alt='flecha' />
                        </button>
                    </div>
                    {/* checkInput de los generos (hombre,mujer, etc...) */}
                    {item && ArrayFiltro.map((dato, index) => (    
                        <div key={index} className={styles.contenedorCheckInput}>
                            <div className={`form-check ${styles.checkInput}`}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id={index} 
                                    onChange={() => CambioEstado(dato.filtro)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {dato.name}
                                </label>
                            </div>
                      </div> 
                    ))                   
                    }
                </div>
  )
}

export default Filtros
