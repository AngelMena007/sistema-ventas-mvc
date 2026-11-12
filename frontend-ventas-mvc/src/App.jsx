import Encabezado from './components/Encabezado.jsx'
import ProductoCard from './components/ProductoCard.jsx';
import FormularioProducto from './components/FormularioProducto.jsx';
import FormEliminarProd from './components/FormEliminarProd.jsx';
import './App.css';
import { obtenerProductos, registrarProducto, eliminarProducto } from './services/productoService.js';
import { useEffect, useState } from 'react';

function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos()
        setProductos(datos)
      } catch (error) {
        console.error("Error al cargar productos: ", error)
      }
    }
    cargarProductos();
  }, []);

  const guardarProducto = async (nuevoProducto) => {
    try {
      await registrarProducto(nuevoProducto);

      const datos = await obtenerProductos()
      setProductos(datos)
      return true
    } catch(error) {
      console.error("Error al registrar el producto: ", error)
      return false
    }
  }

  const eliminarProd = async (id) => {
    try {
      await eliminarProducto(id);

      const datos = await obtenerProductos();
      setProductos(datos);
      return true;
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      return false;
    }
  }

  return (
    <div className='contenedor'>
      <Encabezado />
      <h1>Registrar un Producto</h1>
      <FormularioProducto  onRegistrar={guardarProducto}/>
      <br />
      <hr />
      <h2>Lista de Productos</h2>
      <div className='productos-grid'>
        {productos.map((producto) => (
          <ProductoCard 
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          stock={producto.stock}
          />
        ))}
      </div>
      <br />
      <hr />
      <h2>Eliminar Producto</h2>
      <FormEliminarProd onEliminar={eliminarProd} />
    </div>
  )
}

export default App;