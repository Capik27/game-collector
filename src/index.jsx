import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { store } from "./store/init_store";
import { Detector } from "./components/Detector";
import { Stats } from "./components/Stats";
import { Provider } from "react-redux";
import { GLOBAL_W } from "./constants";

const size =
	GLOBAL_W > 600 ? (GLOBAL_W > 800 ? (GLOBAL_W > 1000 ? 100 : 80) : 60) : 40;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<Detector size={size} />
			<Stats />
		</Provider>
	</React.StrictMode>
);
