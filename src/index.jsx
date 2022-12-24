import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { store } from "./store/init_store";
import { Detector } from "./components/Detector";
import { Stats } from "./components/Stats";
import { Provider } from "react-redux";
console.log("index");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<Detector />
			<Stats />
		</Provider>
	</React.StrictMode>
);
