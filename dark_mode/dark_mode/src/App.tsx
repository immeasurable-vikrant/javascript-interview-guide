import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import About from "./components/About.tsx";
import ThemeProvider from "./themeContext/themeContext.tsx";

function App() {
	return (
		<>
			<ThemeProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/" element={<About />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
