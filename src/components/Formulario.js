import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import useMoneda from '../hooks/useMoneda'
import useCriptoMoneda from '../hooks/useCriptoMoneda'
import Error from './Error'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color .3s ease;

  &:hover{
    background-color: #326ac0;
    cursor: pointer;
  }
`

const Formulario = ({ setMoneda, setCriptoMoneda }) => {

  // State del listado de criptomonedas
  const [listaCriptoMonedas, setlistaCriptoMonedas] = useState([])
  const [error, setError] = useState(false)

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
    { codigo: 'PEN', nombre: 'Sol Peruano' }
  ]

  // Utilizar useMoneda
  const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS)

  // Utilizar Cripto Moneda

  const [ criptomoneda, SelectCripto ] =useCriptoMoneda('Elige tu Criptomoneda', '', listaCriptoMonedas)

  // Ejecutar llamado a la api
  useEffect(() => {
    const consultarApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

      const resultado = await axios.get(url)

      setlistaCriptoMonedas(resultado.data.Data)
      // console.log(resultado.data.Data);
    }

    consultarApi()
  }, [])

  // cuando el usuario hace submit
  const cotizarMoneda = e => {
    e.preventDefault();

    // validar si ambos campos estan llenos
    if (moneda === '' || criptomoneda === '') {
      setError(true);
      return
    }

    // En caso contrario pasar los datos al componente principal
    setError(false)
    setMoneda(moneda)
    setCriptoMoneda(criptomoneda)
  }

  return (
    <form action="" onSubmit={cotizarMoneda}>
      {
        error ? <Error mensaje='Todos los campos son obligatorios'/> : null
      }

      <SelectMonedas />
      <SelectCripto />
      <Boton 
        type="submit"
      />
    </form>
  )
}

export default Formulario
