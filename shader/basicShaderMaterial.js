import * as THREE from 'three'

export default class BasicShaderMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            vertexShader: /* glsl */`

            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
            }`,
            fragmentShader: /* glsl */ `

            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }`,
            uniforms: {

            }
        })
    }
}