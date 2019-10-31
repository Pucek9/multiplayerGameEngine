import { LinearFilter, WebGLRenderTarget } from 'three';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';

export class ShaderService {
  savePass: SavePass;
  blendPass: ShaderPass;
  outputPass: ShaderPass;

  constructor() {
    const renderTargetParameters = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
    };
    this.savePass = new SavePass(
      // new WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters),
      new WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters),
    );
    // blend pass
    this.blendPass = new ShaderPass(BlendShader, 'tDiffuse1');
    this.blendPass.uniforms['tDiffuse2'].value = this.savePass.renderTarget.texture;
    this.blendPass.uniforms['mixRatio'].value = 0.65;
    // output pass
    this.outputPass = new ShaderPass(CopyShader);
    this.outputPass.renderToScreen = true;
    this.turnOffShaders();
  }

  turnOnShaders() {
      this.savePass.enabled = true;
      this.blendPass.enabled = true;
      this.outputPass.enabled = true;
  }

  turnOffShaders() {
      this.savePass.enabled = false;
      this.blendPass.enabled = false;
      this.outputPass.enabled = false;
  }

}

const shaderService = new ShaderService();
export default shaderService;
