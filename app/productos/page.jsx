'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../../styles/productos.module.css'
import Pagination from '@/Components/Pagination'
import Products from '@/Components/Products'
import Image from 'next/image'
import Filtro from '@/Components/Filtros'
import lupita from '../../public/busqueda.png'
import RootLayout from '@/app/layout'

const  Productos = () => {

  const [productos, setProductos] = useState()
  const [pagination, setPagination] = useState()
  const [productsPerPage, setProductsPerPage] = useState(9)
  const [currectPage, setCurrectPage] = useState(1)
  const [moduloProductos, setModuloProductos] = useState()

  // hooks para filtro de categoria
  const [categoria, setCategoria] = useState(true)
  const [genero, setGenero] = useState([])
  //hooks para filtro de ligas
  const [categoriaLiga, setCategoriaLiga] = useState(true)
  const [liga, setLiga] = useState([])

  const [filtrosAplicados, setFiltrosAplicados] = useState(false)

  //hooks busqueda
  const [busqueda, setBusqueda] = useState('')
  const [arrayBusqueda, setArrayBusqueda] = useState()

  const lastPage = productsPerPage*currectPage
  const firstPage  = lastPage - productsPerPage


  // primer useffect para llamar todos los productos.
  useEffect(() =>{  
    /// llamada a los productos.
    const Productos = async() =>{
      try{
        const response = await axios.get('http://localhost:4000/productos')
        let data = response.data.productos
        // si tenemos busqueda.
        if(busqueda !== ''){
          const productoFiltrado = data.filter((e) => e.name.toLowerCase().includes(busqueda.toLowerCase()))
          // setArrayBusqueda(productoFiltrado) // setiamos el array con las busquedas.
          data = productoFiltrado
        }
          setProductos(data) // setiamos los datos de los productos
          setModuloProductos(data.length % 9) // obtendremos el modulo
          setPagination(data.length / 9) // obtendremos cuantas paginas tendremos con los productos.        
      }catch(error){
        console.log(error)
      }
    }
    if(filtrosAplicados) return
    Productos()
    setCurrectPage(1)
  },[busqueda, filtrosAplicados])


  //para cuando apliquemos filtros.
  useEffect(() =>{

    const CambioFiltro = async() =>{
      try{
        const arrayConcatGenero = genero.join(',')
        const arrayConcatLiga = liga.join(',')
        const response = await axios.get(`http://localhost:4000/productos/filtrados?genero=${arrayConcatGenero}&nombreLiga=${arrayConcatLiga}`)
        let data = response.data.productos

        if(busqueda !== ''){
          const filtroBusqueda = data.filter((productos) => productos.name.toLowerCase().includes(busqueda.toLowerCase()))
          // setArrayBusqueda(filtroBusqueda)
          data = filtroBusqueda
        }

        setProductos(data)
        setModuloProductos(data.length % 9)
        setPagination(data.length / 9)
        
        return
      }catch(error){
        console.log(error)
      }
    }

    if(productos && genero.length > 0 || liga.length > 0){
      CambioFiltro()
      setFiltrosAplicados(true)
    }else{
      setFiltrosAplicados(false) // para que se haga el anterior useeffect.
    }
    setCurrectPage(1);
    
  },[liga, genero, busqueda])


  return (
    <RootLayout showNavigation={true}>
        <div className={styles.contenedor}>
            
            {/* contenedor para aplicar la busqueda */}
            <div className={styles.contenedorBusqueda}>
              <div className={styles.inputBusqueda}>
                  <input 
                    type="text" 
                    placeholder='Buscar Productos' 
                    onChange={(e) => {setBusqueda(e.target.value)}} className={styles.busqueda} 
                  />
                  <Image src={lupita} width={20} height={20} className={styles.lupita} alt={'lupa'} />
              </div>
            </div>
            {/* contenedor para mostrar los productos filtrados */}
            <div className={styles.contenedorProductos}>
              <div className={styles.contenedorFiltros}>
                  <h4>Filtros</h4>
                  <Filtro 
                      nameTitulo={'Categoria'}
                      item={categoria}
                      setItem={setCategoria}
                      ArrayFiltro={[{name:'Hombre', filtro:'male'}, {name:'Mujer', filtro:'female'}, {name:'Niño', filtro:'boy'}, {name:'Niña', filtro:'girl'}]}
                      setItemArray={setGenero}
                      itemArray={genero}
                  />
                  <Filtro 
                      nameTitulo={'Liga'}
                      item={categoriaLiga}
                      setItem={setCategoriaLiga}
                      ArrayFiltro={[{name:'Premier League', filtro:'Premier League'}, {name:'Serie A', filtro:'Serie A'}, 
                      {name:'Selecciones', filtro:'Selecciones'}, {name:'La liga', filtro:'La liga'}, {name:'Bundesliga', filtro:'Bundesliga'}, 
                      {name:'Liga Argentina', filtro:'Liga Argentina'}, {name:'Liga Chilena', filtro:'Liga Chilena'},, {name:'Ligue 1', filtro:'Ligue 1'}]}
                      setItemArray={setLiga}
                      itemArray={liga}
                  />
              </div>

              <div className={styles.contenedorPrincipal}>
                  {/* componente de despliegue de los productos */}
                  {productos ?
                  <Products 
                    productos ={productos}
                    firstPage ={firstPage}
                    lastPage = {lastPage}
                  /> : <p>Cargando...</p>
                }
                  
                  {/* Componente para la navegacion entre productos */}
                {productos && productos.length > 0 ? 
                    moduloProductos > 0 ? 
                    <Pagination
                      totalProducts={productos.length}
                      firstPage={firstPage}   
                      lastPage={lastPage}             
                      currectPage={currectPage}
                      setCurrectPage={setCurrectPage}
                      pagination={pagination}
                      modulo={1}
                    /> :
                    <Pagination
                      totalProducts={productos.length}
                      firstPage={firstPage}   
                      lastPage={lastPage}             
                      currectPage={currectPage}
                      setCurrectPage={setCurrectPage}
                      pagination={pagination}
                      modulo={0}
                    />
                  : <p>No existe resultados con los filtros seleccionados.</p>
                } 
              </div>
            </div>
            
        </div>
    </RootLayout>
  )
}

export default Productos
