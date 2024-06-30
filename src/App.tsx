import { Scene } from "three";
import "./App.css";
import "./ifc";
import { type ChangeEvent, useRef, useEffect } from "react";
import { IFCLoader } from "web-ifc-three";
import { useIFC } from "./ifc";

const scene = new Scene();

// Sets up the IFC loading
const ifcLoader = new IFCLoader();

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIFC({ scene, canvasRef: canvasRef.current! });
  });

  const chooseFile = (e: ChangeEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file = (e.target as any).files[0];
    const ifcURL = URL.createObjectURL(file);

    ifcLoader.load(ifcURL, (ifcModel) => scene.add(ifcModel));
  };

  return (
    <div className="wrapper">
      <canvas id="ifc-canvas" ref={canvasRef} />;
      <input type="file" id="file-input" onChange={chooseFile} />
    </div>
  );
}

export default App;
