'use client'
import React, { useEffect, useState, useContext} from 'react'
import Link from 'next/link'
import styles from '../styles/navigation.module.css'
import Image from 'next/image'
import corazon from '../public/corazon.png'
import carrito from '../public/carrito-de-compras.png'
import user from '../public/user-perfil.png'
import { usePathname } from 'next/navigation'
import flechaAbajo from '../public/ampliar-abajo.png'
import { useSession, signOut } from 'next-auth/react'
import axios from 'axios'
import { CarritoContext } from '@/context/contexCart'

function navigation() {
  const ruta = usePathname()
  const [rutaActual, setRutaActual] = useState(ruta);
  const [sesion, setSesion] = useState(false)
  const {data: session} = useSession()

  const {largoCarrito, setLargoCarrito} = useContext(CarritoContext)

  // useEffect(() =>{

  //     const largoCart = async() =>{

  //       const response = await axios.get(`http://localhost:4000/userCart?userId=${session.user.id}`,
  //         {
  //           headers:{authorization:`Bearer ${session.user.token}`}
  //         }
  //       )
  //       if(response.data.success === 1){
  //         const largo = response.data.userCart.reduce((suma, item) => suma + item.quantity, 0)
  //         setLargoCarrito(largo)
  //       }
  //       return    
  //     }
      
  //     if(session){
  //       largoCart()
  //     }           

  // },[largoCarrito])



  return (
    <div className={styles.contenedor}>

      <div className={styles.contenedorTitulo}>
         <Link href={'/'}  className={styles.titulo}>SportFitStyle.</Link>
      </div>    
      <div className={styles.lista}>
          <li><Link href={'/'}    className={rutaActual === '/' ? `${styles.textoLista} ${styles.textoListaSeleccionado}` : styles.textoLista}>Inicio</Link></li>
          <li><Link href={'/productos'}   className={rutaActual === '/productos' ? `${styles.textoLista} ${styles.textoListaSeleccionado}` : styles.textoLista}>Productos</Link></li>
          <li><Link href={'/productos'} className={styles.textoLista}>Acerca de nosotros</Link></li>
          <li><Link href={'/'} className={styles.textoLista}>Contacto</Link></li>
      </div>

      {!session ?
          <div>
              <div className={styles.ContenedorDatosLog}>
                <div className={styles.contenedorLog} 
                  onClick={() => setSesion(!sesion)}     
                >
                  <Image src={user} width={32} height={32} alt='user'/>
                  <div>
                    <p>¡Hola!</p>
                    <p className={styles.login}>Inicia Sesión o Regístrate</p>
                  </div>
                </div>
              </div>
              {sesion && 
                <div className={styles.log}>
                  <Link onClick={() => setSesion(false)}  href={'/Signin'} className={styles.botonLogin}
                  >
                      Iniciar Sesión
                  </Link>
                  <div className={styles.signUp}>
                    <p>¿No tienes una cuenta?</p>
                    <Link onClick={() => setSesion(false)}  href={'/Signup'} className={styles.botonSignUp}>Regístraste</Link>
                  </div>    
                </div>
                }
          </div> 
        
        : <div>
              <div className={styles.datosCarritos}>
                <div className={styles.contenedorLogin} onClick={() => setSesion(!sesion)}>
                  <Image src={user} width={32} height={32}/>
                  <div className={styles.datosLogin}>
                    <p>¡Hola! {session.user.name}</p>
                    <p>Mi cuenta <Image src={flechaAbajo} width={20} height={20} alt='flechaAbajo' />  </p>
                  </div>
                </div>
                <Link href={'/Carrito'} className={styles.botones}>
                  <Image src={carrito} width={32} height={32} alt='carrito'/>
                    { largoCarrito &&
                        <span className={styles.carritoLargoProd}>{largoCarrito}</span>
                    }          
                </Link>
              </div>
              {sesion && 
                <div className={styles.log}>
                  <p className={styles.favoritos}>Mis favoritos</p>
                  <button onClick={signOut} className={styles.botonLogin}
                  >
                    Cerrar Sesión
                  </button>
                </div>
                }
          </div>
      }
      
      
    </div>
  )
}

export default navigation