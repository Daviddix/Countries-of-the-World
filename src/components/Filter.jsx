import { useRef } from "react"
import { useState } from "react"

function Filter({setCountries, setLoading}) {
  const [regionDisplay, setRegionDisplay] = useState(false)
  const [regions, setRegions] = useState(["Africa", "America", "Asia", "Europe", "Oceania"])
  const titleRef = useRef()

  function getRegionToFetch(region){
    setRegionDisplay(false)
    setCountries([])    
    setLoading(true)
    titleRef.current.textContent = region
    fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(raw=> raw.json())
    .then((data)=> {
      setCountries(data)
      setLoading(false)
    }).catch((err)=>{
      setLoading(false)
      alert("oops, seems like an error occurred, Please check your internet connection and try again")
      setCountries(JSON.parse(localStorage.getItem("rest-country-list-data")))
      titleRef.current.textContent = "Filter by region"
    })
    
  }

  const individualRegion = regions.map((region)=>{
    return <p key={region} onClick={(e)=> getRegionToFetch(e.target.textContent)}>{region}</p>
  })

  return (
    <div 
    onClick={()=> setRegionDisplay((prev)=> !prev)}
    className="select-faker"> 
        <div 
         className="title">

          <p ref={titleRef}> Filter by region </p>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

          </div>


       {regionDisplay && <div 
        className="regions"
        onClick={(e)=> e.stopPropagation()}
        >
        {individualRegion}
        </div>}
       
    </div>
  )
}

export default Filter