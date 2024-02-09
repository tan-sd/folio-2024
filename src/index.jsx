import React from "react";
import ReactDOM from "react-dom/client";
import Experience from "./Experience";
import "./main.css";
import { Canvas } from "@react-three/fiber";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Navbar />
        <div className="canvas-container">
            <Canvas
                shadows
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
            >
                <Experience />
            </Canvas>
        </div>
        <Footer />
    </React.StrictMode>
);
