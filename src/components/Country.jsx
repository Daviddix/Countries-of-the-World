import React from 'react'
import { useNavigate } from 'react-router-dom'

function Country({name, population, region, capital, image}) {

  
    const navigate = useNavigate()
  return (
    <div 
          onClick={()=> navigate(`/${name}`)}
          className="country">
            <img src={image} alt={`flag of ${name}`} />

            <div className="country-details">
              <h1 className="name">{name}</h1>
              <p className="population"><b>Population: </b>{population}</p>
              <p className="region"><b>Region: </b>{region}</p>
              <p className="capital"><b>Capital: </b>{capital}</p>
            </div>
          </div>
  )
}

export default Country