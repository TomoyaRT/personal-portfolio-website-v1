import { Effect } from 'postprocessing';
import { Uniform, Texture } from 'three';
import fragmentShader from '@/components/canvas/fluid/glsl/post.frag';
import hexToRgb from '@/components/canvas/fluid/utils';

interface FluidEffectProps {
  tFluid?: Texture;
  intensity?: number;
  fluidColor?: string;
  backgroundColor?: string;
}

class FluidEffect extends Effect {
  state: {
    tFluid: Texture | undefined;
    intensity: number;
    fluidColor: string;
    backgroundColor: string;
    cachedFluidColor: any;
    cachedBackgroundColor: any;
  };

  constructor({ tFluid, intensity = 1.0, fluidColor = '#ffffff', backgroundColor = '#000000' }: FluidEffectProps = {}) {
    const uniforms = new Map(
      Object.entries({
        tFluid: new Uniform(tFluid),
        uIntensity: new Uniform(intensity),
        uColor: new Uniform(hexToRgb(fluidColor)),
        uBackgroundColor: new Uniform(hexToRgb(backgroundColor)),
      }),
    );

    super('FluidEffect', fragmentShader, { uniforms });

    this.state = {
      tFluid,
      intensity,
      fluidColor,
      backgroundColor,
      cachedFluidColor: hexToRgb(fluidColor),
      cachedBackgroundColor: hexToRgb(backgroundColor),
    };
  }

  updateUniform(key: string, value: any) {
    const uniform = this.uniforms.get(key);
    if (uniform && uniform.value !== value) {
      uniform.value = value;
    }
  }

  update() {
    const newFluidColor = hexToRgb(this.state.fluidColor);
    if (newFluidColor !== this.state.cachedFluidColor) {
      this.state.cachedFluidColor = newFluidColor;
      this.updateUniform('uColor', newFluidColor);
    }

    const newBackgroundColor = hexToRgb(this.state.backgroundColor);
    if (newBackgroundColor !== this.state.cachedBackgroundColor) {
      this.state.cachedBackgroundColor = newBackgroundColor;
      this.updateUniform('uBackgroundColor', newBackgroundColor);
    }

    this.updateUniform('uIntensity', this.state.intensity);
  }
}

export default FluidEffect;
