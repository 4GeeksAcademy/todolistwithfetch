import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import AppTareas from "./apptareas.jsx";
//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<AppTareas/>
			
		</div>
	);
};

export default Home;
