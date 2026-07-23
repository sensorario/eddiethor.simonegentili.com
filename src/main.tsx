import { createRoot } from "react-dom/client";
import "../node_modules/@sensorario/sg-components/dist/sg-components.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
