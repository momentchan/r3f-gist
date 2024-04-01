import fractal from "./Cginc/Fractal";
import utility from "./Cginc/Utility";

const fractalShader = {

    name: 'FractcalShader',

    uniforms: {
        'tDiffuse': { value: null },
        'uTime': { value: 0 },
        'uSpeed': { value: 0 },
        'uAspect': { value: 0 }
    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */ `

        uniform float uTime;
        uniform float uSpeed;
        uniform float uAspect;
		varying vec2 vUv;

        ${fractal}
        ${utility}
        
        float getFractal(vec2 uv, float time) {
            vec3 p = vec3(uv, time);
        
            float value;
            value = simplex3d_fractal(p);
            value = Contrast(value, 5.0);
        
            value = remap(value, vec2(-1.0, 1.0), vec2(0.0, 1.0));
            value = clamp(value, 0.0, 1.0);
            return value;
        }

		void main() {

            vec4 col = vec4(getFractal(vUv * 1.5 * vec2(uAspect, 1.0), uTime * uSpeed));
            col.a = 1.0;
            
			gl_FragColor = col;
		}`
};

export { fractalShader };