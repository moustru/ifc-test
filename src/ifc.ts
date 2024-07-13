import { MutableRefObject } from "react";
import * as OBC from "@thatopen/components";

export class IFCWindow {
  containerRef: MutableRefObject<HTMLDivElement | null>;

  components = new OBC.Components();
  worlds = this.components.get(OBC.Worlds);

  world = this.worlds.create<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBC.SimpleRenderer
  >();

  ifcLoader = this.components.get(OBC.IfcLoader);

  constructor(containerRef: MutableRefObject<HTMLDivElement | null>) {
    this.containerRef = containerRef;
  }

  init() {
    this.world.scene = new OBC.SimpleScene(this.components);
    this.world.renderer = new OBC.SimpleRenderer(
      this.components,
      this.containerRef.current as HTMLDivElement
    );

    this.world.camera = new OBC.SimpleCamera(this.components);

    this.components.init();

    this.world.scene.setup();

    this.world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);
  }

  async load(e: File) {
    await this.ifcLoader.setup();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    const reader = new FileReader();

    reader.readAsArrayBuffer(e);

    reader.onloadend = async function (evt) {
      const arrayBuffer = evt.target?.result;
      const array = new Uint8Array(arrayBuffer as ArrayBuffer);
      const group = await that.ifcLoader.load(array);

      that.world.scene.three.add(group);

      console.log(group);
    };
  }
}
