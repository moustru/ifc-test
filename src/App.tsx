import { useEffect, useMemo, useRef } from "react";
import { IFCWindow } from "./ifc";

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const IFCEntity = useMemo(() => new IFCWindow(containerRef), []);

  useEffect(() => {
    IFCEntity.init();
  }, [containerRef, IFCEntity]);

  const loadFile = (e: CustomEvent<HTMLInputElement>) => {
    IFCEntity.load(e);
  };

  return (
    <div className="wrapper">
      {/* @ts-expect-error - Несоответствие типов, разобраться позже */}
      <input type="file" className="file-loader" onChange={loadFile} />
      <div id="container" ref={containerRef} />
    </div>
  );
}

export default App;
