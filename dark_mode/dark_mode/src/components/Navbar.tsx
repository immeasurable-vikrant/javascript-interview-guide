import useTheme from "../hooks/useTheme";

const Navbar = () => {
        const { isDark, toggleMode } = useTheme()

        const handleChange = () => {
                toggleMode()
        }

        console.log("isDark", isDark)
	return (
		<nav>
			<ul>
				<li>Home</li>
				<li>About</li>
			</ul>

                        <div><input type="checkbox" onChange={handleChange} /></div>
		</nav>
	);
};

export default Navbar;
