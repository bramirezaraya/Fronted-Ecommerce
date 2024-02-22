import React from 'react'
import styles from '../styles/HomeSeccion2.module.css'
import nba from '../public/nba.jpg'
import futbol from '../public/arsenal.jpg'
import psg from '../public/psg.jpg'
import HomeProduct from './Home-product'

const  HomeSeccion2 = () => {
  return (
    <div className={styles.contenedor}>
        <h1>¿Que estas buscando?...</h1>
        <div className={styles.contenedorProductos}>
            <HomeProduct texto={'Futbol'} Imagen={futbol}  />
            <HomeProduct texto={'NBA'} Imagen={nba}  />
            <HomeProduct texto={'Ver todo'} Imagen={psg}  />
        </div>
    </div>
  )
}

export default HomeSeccion2