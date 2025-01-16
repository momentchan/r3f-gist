import { Effect } from 'postprocessing';

export default class CustomEffectBase extends Effect {
    constructor(name, { fragmentShader = null, childUniforms = new Map(), vertexShader = null, defines = {}, ...options } = {}) {

        const defaultFragmentShader = /* glsl */`
            void mainImage(const in vec4 inputColor, in vec2 uv, out vec4 outputColor)
            {
                outputColor = vec4(uv, .0, 1.0);
            }
        `
        const baseUniforms = new Map([
            ['time', { value: 0 }],
            ['mousePos', { value: [0, 0] }],
            ['mouseDown', { value: -1 }],
        ]);

        super(name,
            fragmentShader || defaultFragmentShader,
            {
                uniforms: new Map([...baseUniforms, ...childUniforms])
            }
        )
    }

    update(renderer, inputBuffer, deltaTime) {
        this.uniforms.get('time').value += deltaTime
    }

    setUniform(name, value) {
        if (this.uniforms.has(name)) {
            this.uniforms.get(name).value = value;
        } else {
            console.warn(`Uniform "${name}" does not exist.`);
        }
    }

    setMousePos(x, y) {
        // Normalize mouse coordinates to [-1, 1]
        const nx = (x / window.innerWidth) * 2 - 1;
        const ny = -((y / window.innerHeight) * 2 - 1); // Flip Y-axis
        this.setUniform('mousePos', [nx, ny])
    }

    setMouseDown(down) {
        this.setUniform('mouseDown', down)
    }
}