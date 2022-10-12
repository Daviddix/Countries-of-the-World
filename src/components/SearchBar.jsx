import { useRef, useState } from "react"

function SearchBar({setCountries, setLoading}) {

 const [searchInput, setSearchInput] = useState("")
 const searchBarRef = useRef()
 
 function setToLocalStorage(){
  setCountries(JSON.parse(localStorage.getItem("rest-country-list-data")))
 }

  function searchForCountry(searchParameter, e){
    e.preventDefault()
    searchBarRef.current.blur()
    setCountries([])
    setLoading(true)
    if (searchParameter.trim()) {
      fetch(`https://restcountries.com/v3.1/name/${searchParameter}`)
      .then((raw)=> raw.json())
      .then((data)=> {
        if (data.status) {
          setLoading(false)
          alert("Country not found")
         return setToLocalStorage()
        }
        setLoading(false)
        setCountries(data)
      })
      .catch((err)=>{
        setLoading(false)
        alert("seems like theres a problem with your internet connection")
        setCountries(JSON.parse(localStorage.getItem("rest-country-list-data")))
        setSearchInput("")
      })
    }else{
      setToLocalStorage()
      setLoading(false)
    }
    
  }

 
  return (
    <form 
    onSubmit={(e)=> searchForCountry(searchInput, e)}
    className="search-bar">

        <svg
        onClick={(e)=> searchForCountry(searchInput, e)}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

        <input 
        ref={searchBarRef}
        value={searchInput}
        onChange={(e)=> setSearchInput(e.target.value)}
        type="search" 
        placeholder="Search for a country..."/>
    </form>
  )
}

export default SearchBar