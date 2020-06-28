import Model3D from './Model3D';
import ScreenModel from './ScreenModel';
import Updatable from './Updatable';

export default interface CursorModel extends Updatable, Model3D {
  object?;
  // geometry?;
  // material?;

  setGeometry();

  setMaterial();

  init(screen: ScreenModel);
}
