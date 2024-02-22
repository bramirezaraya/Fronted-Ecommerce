'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/productos.module.css'
import corazon from '../public/corazon.png'
import corazonRojo from '../public/corazon-rojo.png'

const Products = ({productos, firstPage,lastPage,}) => {

    const [like, setLike] = useState([])    
    
  return (
    <div className={styles.elemento}>
        {productos && productos.map((prop, index) => (
            <div key={index} className={styles.imagenes}>
                <div className={styles.relativo}>
                    {/* <button className={styles.corazones}>
                        <Image src={corazon} width={25} height={25} className={styles.imagenCorazon}/>
                    </button> */}
                    
                    <Link href={`/productos/${prop.id}`}>
                        <Image src={prop.imageUrl} height={400} width={400} alt={prop.name}  className={styles.imagen}/>   
                    </Link> 
                </div>
                            
                <div className={styles.contenedorInfo}>
                    <Link href={`/productos/${prop.id}`} className={styles.estiloLinkDescripcion} style={{textDecoration:'none'}} >
                    <div className={styles.info}>
                        <p className={styles.textoNegro}>{prop.name}</p>
                        <p className={styles.description}>{prop.description}</p>
                    </div>
                    <p className={styles.textoNegro}>${prop.price}</p>
                    </Link>             
                </div>                
            </div>  
        )).slice(firstPage,lastPage)}
    </div>
  )
}

export default Products