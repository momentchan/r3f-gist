import CustomEffectBase from "./CustomEffectBase";

/**
 * Usage:
 * 
 * import { EffectComposer } from '@react-three/postprocessing';
 * import SampleEffect from './SampleEffect';
 * 
 * // Inside your R3F <Canvas>:
 * <EffectComposer>
 *   <SampleEffect />
 * </EffectComposer>
 */

class SampleEffectClass extends CustomEffectBase {
    constructor() {
        super(
            'SampleEffect',
            {
                fragmentShader: /* glsl */`
                    void mainImage(const in vec4 inputColor, in vec2 uv, out vec4 outputColor)
                    {
                        outputColor = vec4(uv, .0, 1.0);
                    }
                `,
                childUniforms: new Map(),
                vertexShader: null,
                defines: {},
            }
        );
    }
}


export default function SampleEffect() {

    const effect = new SampleEffectClass();

    return <primitive object={effect} />
}