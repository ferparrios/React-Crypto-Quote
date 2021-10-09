import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100%;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {

  const [moneda, setMoneda] = useState('')
  const [criptoMoneda, setCriptoMoneda] = useState('')
  const [result, setResult] = useState({})
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // evitamos la ejecucion la primera vez
      if (moneda === '') return;

      // Consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`

      const resultado = await axios.get(url);
      // Mostar el spinner
      setloading(true)
      // Ocultar el resultado
      setTimeout(() => {
        // Guardar Cargando
        setloading(false)
        // Guardar cotizacion
        setResult(resultado.data.DISPLAY[criptoMoneda][moneda])
      }, 3000)
      
      // console.log(resultado.data.DISPLAY[criptoMoneda][moneda]);
    }
    cotizarCriptomoneda()
    // console.log('Cotizando...');
  }, [moneda, criptoMoneda])

  // Mostrar Spinner o resultado

  const componente = (loading) ? <Spinner /> : <Cotizacion resultado={result} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto"/>
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario setMoneda={setMoneda} setCriptoMoneda={setCriptoMoneda} />

        {componente}
        
      </div>
    </Contenedor>
  );
}

export default App;
