import { useState } from "react"
import makeAsyncScriptLoader from "react-async-script";

const useWrapper =(url,Component)=>{
    const LoadingElement = () => {
        return <div>Loading...</div>
    }
    const Wrap = ()=>{
        const [scriptLoaded,setScriptLoaded] = useState(false)
        const AsyncScriptLoader = makeAsyncScriptLoader(url)(LoadingElement)
        if(scriptLoaded) return <Component/>
        return(
            <AsyncScriptLoader 
                asyncScriptOnLoad={() => {
                    setScriptLoaded({ scriptLoaded: true })
                }}
            />
        )
    }
    return Wrap
}
export default useWrapper