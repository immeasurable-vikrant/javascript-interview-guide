import { useContext } from "react";
import { ThemeContext } from "../themeContext/themeContext";

const useTheme = () => {
     const theme = useContext(ThemeContext)
     return theme
}

export default useTheme