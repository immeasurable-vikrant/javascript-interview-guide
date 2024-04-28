import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()


const ThemeProvider = ({children}) => {
        const [isDark, setIsDark] = useState(false)

        const toggleMode = () => {
                setIsDark((prev) => !prev)
        }

        useEffect(() => {
                document.documentElement.setAttribute('app__theme', isDark ? 'dark' : 'light')
        }, [isDark])

        return <ThemeContext.Provider value={{isDark, toggleMode}}>{children}</ThemeContext.Provider>

}

export default ThemeProvider