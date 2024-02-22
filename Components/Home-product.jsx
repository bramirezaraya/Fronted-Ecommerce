import React from 'react'
import Image from 'next/image'
import flecha from '../public/flecha.png'
import styles from '../styles/HomeSeccion2.module.css'

const HomeProduct = ({Imagen, texto}) => {
  return (
    <div className={styles.item}>
        <Image src={Imagen} width={350} height={350} alt={'imagenHome'}/>
        <div className={styles.infoProduct}>
            <p className={styles.textoProduct}>{texto}</p>
            <Image src={flecha} width={20} height={20} alt='flecha' />
        </div>
    </div>
  )
}

export default HomeProduct