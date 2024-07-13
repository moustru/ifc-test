import { useEffect, useMemo, useRef } from "react";
import { IFCWindow } from "./ifc";

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const IFCEntity = useMemo(() => new IFCWindow(containerRef), []);

  useEffect(() => {
    IFCEntity.init();
  }, [containerRef, IFCEntity]);

  const loadFile = (e: CustomEvent<HTMLInputElement>) => {
    // @ts-expect-error - Не видит files в EventTarget, хоть убей
    IFCEntity.load(e.target!.files[0]);
  };

  return (
    <div className="wrapper">
      <input type="file" className="file-loader" onChange={() => loadFile} />
      <div id="container" ref={containerRef} />
    </div>
  );
}

export default App;
