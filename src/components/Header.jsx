import { useLayoutEffect } from "react"
import { useState } from "react"

function Header() {
  const [theme, setTheme] = useState("light")

 useLayoutEffect(()=>{
  if (localStorage.getItem("rest-countries-theme")) {
    setTheme(localStorage.getItem("rest-countries-theme"))

    document.body.classList = []
    document.body.classList.add(theme)
  }else{
    localStorage.setItem('rest-countries-theme', theme)
  }
 }, [theme])
  

  function setThemeModeFunction(){
    setTheme(prev => prev == "light"? "dark" : "light")
    localStorage.setItem("rest-countries-theme", theme == "light"? "dark" : "light") 
  }

  return (
    <header>
      <div className="inner-header container">
         <a title="Back to home" href="/"><p>Where in the world</p></a>

      <div 
      onClick={setThemeModeFunction}
      className="theme-switcher">

       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>

        <p>Dark Mode</p>
      </div>
      </div>
      </header>
  )
}

export default Header