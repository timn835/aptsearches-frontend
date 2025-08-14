import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LangProvider } from "@/components/context/lang-provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LangProvider defaultLang="en" storageKey="aptsearches-lang">
			<App />
		</LangProvider>
	</StrictMode>
);
