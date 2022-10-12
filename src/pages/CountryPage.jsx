import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import loader from "../assets/globe.svg"

function CountryPage() {
    const {country} = useParams()
    const [loading, setLoading] = useState(true)
    const [singleCountry, setSingleCountry] = useState({})
    const navigate = useNavigate()

    function fetchData(country){
      setSingleCountry({})
      fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(raw=> raw.json())
            .then((data)=>{
              if (data.status) {
                setLoading(false)
                alert("Oops... it seems like the api doesn't have data on this country")
                navigate("/")
              }
             setSingleCountry(data[0])
            }
            )
    }

    useEffect(()=>{
      fetchData(country)
    },[country])

    const borderCountries = singleCountry?.borders?.map((borderingCountry)=>{
      return <p onClick={()=> navigate(`/${borderingCountry}`)} key={borderingCountry}>{borderingCountry}</p>
    })

  return (
    <section className="single-country">
     {singleCountry?.name ? 
     <>
     <div 
     onClick={()=> navigate(-1)}
     className="back">

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="29" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>

    <p>Back</p>
      </div>

      <div className="image-details container">
      <img src={singleCountry.flags?.svg} alt={`flag of ${singleCountry.name}`} />

      <div className="country-details-container">
        <h1 className="name">{singleCountry.name.official}</h1>

        <div className="first-container">
          <p><b>Native Name: </b>{singleCountry.name.nativeName? singleCountry.name.nativeName[Object.keys(singleCountry.name.nativeName)[0]].official : singleCountry.name.common}</p>

          <p><b>Population: </b>{singleCountry.population.toLocaleString()}</p>

          <p><b>Region: </b>Europe</p>
          <p><b>Sub Region: </b>{singleCountry.region}</p>

          {singleCountry.capital && <p><b>Capital: </b>{singleCountry.capital[0]}</p>}
        </div>

        <div className="second-container">
        <p><b>Top Level Domain: </b>{singleCountry.tld[0]}</p>

        {singleCountry.currencies && <p><b>Currencies: </b>{singleCountry.currencies[Object.keys(singleCountry.currencies)[0]].name}</p>}

        {singleCountry.languages && <p><b>Languages: </b>{singleCountry.languages[Object.keys(singleCountry.languages)[0]]}</p>}
        </div>

        {borderCountries && <div className="third-container">
          <p><b>Border Countries:</b></p>
          <div className="border-countries">
            {borderCountries}
          </div>
          
        </div>}
      </div>
      </div> </> : <div className="loader">
          <img src={loader} alt="loading country" />
            <p>Loading Country...</p>
          </div>}
    </section>
  )
}

export default CountryPage