import { useState } from "react"
import makeAsyncScriptLoader from "react-async-script";

const useWrapper =(url,Component)=>{
    const [scriptLoaded,setScriptLoaded] = useState(false)
    const LoadingElement = () => {
        return <div>Loading...</div>
    }
    const Wrap = ()=>{
        const AsyncScriptLoader = makeAsyncScriptLoader(url,{removeOnUnmount:true})(LoadingElement)
        if(scriptLoaded) return <Component/>
        return(
            <AsyncScriptLoader 
                asyncScriptOnLoad={() => {
                    setScriptLoaded({ scriptLoaded: true })
                }}
            />
        )
    }
    return [scriptLoaded,Wrap]
}
export default useWrapper