import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../types/ScreenModel';
import { FontLoader, Mesh, MeshPhongMaterial, TextGeometry } from 'three';
// import '../games/balls/fonts/gentilis_bold.typeface.json';

const loader = new FontLoader();

export default class Text implements IUpdatable {
  public x: number;
  public y: number;
  public z = 50;
  public object: Mesh;
  private geometry: TextGeometry;
  private material: MeshPhongMaterial;

  constructor() {}

  setGeometry() {
    console.log('load');
    loader.load(
      '../games/balls/fonts/gentilis_bold.typeface.json',
      font => {
        console.log('loaded', font);
        this.geometry = new TextGeometry('5', {
          font: font,
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelOffset: 0,
          bevelSegments: 5,
        });
      },
      () => {},
      err => {
        console.log('err', err);
      },
    );
    // this.geometry = new SphereGeometry(10, 10, 10, 1);
  }

  setMaterial() {
    this.material = new MeshPhongMaterial({ color: 0xffffff, flatShading: true });
  }

  init(screen: ScreenModel) {
    this.setGeometry();
    this.setMaterial();
    this.object = new Mesh(this.geometry, this.material);
    this.object.position.z = this.z;
    screen.scene.add(this.object);
  }

  update() {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }
}
