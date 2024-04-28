import { useState } from "react";

function App() {
	const employees = [
		{
			name: "Ashish",
			package: "4LPA",
		},
		{
			name: "Vinay",
			package: "7LPA",
		},
		{
			name: "Vikrant",
			package: "19LPA",
		},
		{
			name: "Ashish 1",
			package: "14LPA",
		},
		{
			name: "Vinay1",
			package: "15LPA",
		},
		{
			name: "Vikrant1",
			package: "30LPA",
		},
	];

	const [expand, setExpand] = useState(false);
	const [employeesToShow, setEmployeesToShow] = useState(employees);

	const handleSort = () => {
		setExpand(!expand);
		let sorted = [...employeesToShow].sort((a, b) => {
			if (expand) {
				return parseInt(b.package) - parseInt(a.package);
			} else {
				return parseInt(a.package) - parseInt(b.package);
			}
		});
		setEmployeesToShow(sorted);
	};

	return (
		<>
			<div>
				{employeesToShow.map((elem, index) => (
					<div key={index}>
						<span style={{ padding: "16px" }}>{elem.name}</span>
						<span style={{ cursor: "pointer" }} onClick={handleSort}>
							{`${elem.package} ${expand ? "⬆️" : "⬇️"}`}
						</span>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
