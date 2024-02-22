'use client'
import React, { useState } from 'react'
import styles from '@/styles/SignIn.module.css'
import Link from 'next/link'
import oculto from '@/public/oculto.png'
import visto from '@/public/ver.png'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useRouter} from 'next/navigation'
import { signIn } from 'next-auth/react'


const SignIn = () => {

  const [ver, setVer] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //hooks para mostrar correcto/error
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)

  const ruta = useRouter()

  const ValidarPassword = () =>{
    if(password.length >= 7 && password.length <= 15){
      // Expresión regular que permite solo letras (mayúsculas o minúsculas y numeros)
      const regex = /^[a-zA-Z0-9]+$/;
      // Comprobación de la cadena contra la expresión regular
      //retornara true o false
      return regex.test(password);
  }
  return false
  }
  
  const ValidarEmail = () =>{
    if(email.length >= 10 && email.length <= 40){
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; // tipo email
        return regex.test(email)
      }
        return false
  }

  const Login = async() =>{

    if(ValidarEmail() && ValidarPassword()){
        const responseNextAuth = await signIn("credentials", {
          email:email,
          password:password,
          redirect: false, // para que no envie al otro form.
        });

        console.log(responseNextAuth)
        
        if(responseNextAuth.status === 200){
          Swal.fire({
            title: 'Bienvenido',
            icon: "success",
            timer:2000
          });
          setTimeout(() => {
            ruta.push('/')
          }, 2000);
        }else{
           Swal.fire({
            title: responseNextAuth.error,
            icon: "error"
         });
        }        
    }   
  }


  return (
    <div className={styles.contenedorPrincipal}>
          <div className={styles.contenedorImagen}>

          </div>
          <div className={styles.contenedorFormulario}>
                <h2 className={styles.titulo}>Bienvenido a SportFitStyle</h2>

                <div className={styles.formulario}>
                  <div className={styles.datos}>
                      <label>Email</label>
                      <input 
                        className={
                          focusEmail ?
                                ValidarEmail() ?
                                `${styles.contenedorInput} ${styles.correcto}`
                                :`${styles.contenedorInput} ${styles.error}`
                          : styles.contenedorInput
                        }  
                        type="email" 
                        placeholder='Jhon@gmail.com'
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        onFocus={() => setFocusEmail(true)}
                        maxLength={40}
                      />
                  </div>   
                  <div className={styles.datos}>
                      <label>Contraseña</label>
                      <div className={styles.input}>
                        <input 
                          className={ 
                            focusPassword ?
                              ValidarPassword() ?
                              `${styles.contenedorInput} ${styles.correcto}`
                              :`${styles.contenedorInput} ${styles.error}`
                            : styles.contenedorInput
                          } 
                          maxLength={15} 
                          type={ver ? "text" : 'password'} 
                          placeholder='Ingrese su Contraseña' 
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          onFocus={() => setFocusPassword(true)}
                         />
                        <Image  onClick={() => setVer(!ver)} className={styles.imagenPassword} src={ ver ? oculto : visto} width={24} height={24} alt='password'/>
                      </div>          
                  </div>
                  <Link className={styles.forgotPassword} href={'/Signup'}>¿Ha olvidado su contraseña?</Link>
                </div>

                <div className={styles.contenedorBoton}>
                  <button onClick={Login} className={styles.botonSignIn}>
                      Iniciar Sesión
                  </button>
                  <div className={styles.contenedorReg}>
                    <p>¿No tienes una cuenta?</p>
                    <Link className={styles.register} href={'/Signup'}>Regístrarse</Link>
                  </div>
                </div>

          </div>

    </div>
  )
}

export default SignIn