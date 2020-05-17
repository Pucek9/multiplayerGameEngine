import ScreenModel from './ScreenModel';
import Updatable from './Updatable';

export default interface CursorModel extends Updatable {
  x: number;
  y: number;
  z: number;
  object?;
  // geometry?;
  // material?;

  setGeometry();

  setMaterial();

  init(screen: ScreenModel);
}
