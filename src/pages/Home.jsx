import Filter from "../components/Filter"
import SearchBar from "../components/SearchBar"
import { useState } from "react"
import Country from "../components/Country"
import { useEffect } from "react"

function Home() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if (localStorage.getItem("rest-country-list-data") == null) {
      fetch("https://restcountries.com/v3.1/all")
      .then(raw=> raw.json())
      .then((data)=> {
        setCountries(data)
        localStorage.setItem("rest-country-list-data", JSON.stringify(data))
        setLoading(false)
      })
    }
    else{
      setCountries(JSON.parse(localStorage.getItem("rest-country-list-data")))
      setLoading(false)
    }
  },[])

 const countryList = countries.map((country)=>{
    return <Country 
    name={country.name.official}
    population={country.population.toLocaleString()}
    region={country.region}
    capital={country.capital && country.capital[0]}
    image={country.flags.svg}
    key={country.name.official}
     />
  })

  return (
    <section className="home">
     
        <div className="search-and-filter container">
            <SearchBar
            setCountries={setCountries}
            setLoading={setLoading}
            />

            <Filter 
            setCountries={setCountries}
            setLoading={setLoading}
            />
        </div>

        {loading && <div className="loader">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>

            <p>Loading Countries...</p>
          </div>}

        <div className="countries container">
        {countryList}         
          </div>

          
          </section>
  )
}

export default Home