'use client'

import React, { useState } from 'react'
import styles from '@/styles/Signup.module.css'
import Link from 'next/link'
import oculto from '@/public/oculto.png'
import visto from '@/public/ver.png'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useRouter} from 'next/navigation'


const SignUp = () => {

  const [ver, setVer] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //hooks para mostrar correcto/error
  const [focusName, setFocusName] = useState(false)
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

  const ValidarName = () =>{
      if(name.length >= 3 && name.length <= 15){
        const regex = /^[a-zA-Z]+$/;
        return regex.test(name)
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

  const EnviarDatos = async() =>{

    if(ValidarEmail() && ValidarName() && ValidarPassword()){
        try{
            const response = await axios.post('http://localhost:4000/Register',{password:password, email:email, name:name})
            if(response.status === 200){
                setTimeout(() => {
                  ruta.push('/Signin')
                }, 2000);
                Swal.fire({
                  title: response.data.message,
                  icon: "success",
                  timer:1800
                });   
              setEmail('')
              setName('')
              setPassword('')
              setFocusName(false)
              setFocusEmail(false)
              setFocusPassword(false)
            }
        }catch(error){
          Swal.fire({
            title: error.response.data.message,
            icon: "error"
          });
        }
      return
    }   
    return Swal.fire({
          title: 'Datos no validos',
          icon: "error"
        });
  }


  return (
    <div className={styles.contenedorPrincipal}>
          <div className={styles.contenedorImagen}>

          </div>
          <div className={styles.contenedorFormulario}>
                <h2 className={styles.titulo}>Bienvenido a SportFitStyle</h2>

                <div className={styles.formulario}>
                  <div className={styles.datos}>
                      <label>Nombre</label>
                      <input 
                        className={
                          focusName
                          ? ValidarName()
                            ? `${styles.contenedorInput} ${styles.correcto}`
                            : `${styles.contenedorInput} ${styles.error}`
                          : styles.contenedorInput
                        }
                        type="text"
                        placeholder='Jhon Doe'
                        maxLength={15} 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        onFocus={() => setFocusName(true)}
                      />
                  </div> 
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
                </div>

                <div className={styles.contenedorCheckPassword}>
                    <div className={styles.checkPassword}>
                                Entre 7 y 15 caracteres
                    </div>
                    <div className={styles.checkPassword}>
                               Minimo 1 minúscula
                    </div>
                    <div className={styles.checkPassword}>
                                Minimo 1 mayúscula
                    </div>
                    <div className={styles.checkPassword}>
                                Minimo 1 número
                    </div>
                </div>

                <div className={styles.contenedorBoton}>
                  <button onClick={EnviarDatos} className={styles.botonSignUp}>
                      Crear Cuenta
                  </button>
                  <div className={styles.contenedorLog}>
                    <p>¿Ya tienes una cuenta?</p>
                    <Link className={styles.login} href={'/Signin'}>Iniciar Sesión</Link>
                  </div>
                </div>

          </div>

    </div>
  )
}

export default SignUp