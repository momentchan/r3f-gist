// CustomShaderMaterial.jsx
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react'
import { useFrame } from '@react-three/fiber'

/* --------------------------------------------------------- */
/* Default shaders — basic UV coloring + time-based tint      */
/* --------------------------------------------------------- */
const DEFAULT_VS = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const DEFAULT_FS = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec3 color = vec3(vUv, abs(sin(uTime)));
    gl_FragColor = vec4(color, 1.0);
  }
`

/* --------------------------------------------------------- */
/* CustomShaderMaterial                                      */
/* --------------------------------------------------------- */
export const CustomShaderMaterial = forwardRef(
  (
    {
      vertexShader   = DEFAULT_VS,
      fragmentShader = DEFAULT_FS,
      uniforms       = {},   // e.g. { uAlpha: 0.3, uSpeed: 2.0 }
      ...props                // transparency, side, blending, etc.
    },
    ref
  ) => {
    /* 1. Build a uniform object that never changes its reference */
    const uniformRef = useRef({
      uTime: { value: 0 },    // built-in time uniform
      // Convert initial uniforms to { value: xxx } form
      ...Object.fromEntries(
        Object.entries(uniforms).map(([key, val]) => [key, { value: val }])
      ),
    })

    /* 2. Expose the internal ShaderMaterial to parent via ref */
    const materialRef = useRef()
    useImperativeHandle(ref, () => materialRef.current)

    /* 3. Increment uTime every frame */
    useFrame(({ clock }) => {
      uniformRef.current.uTime.value = clock.getElapsedTime()
    })

    /* 4. When the incoming uniforms prop changes, update only .value */
    useEffect(() => {
      for (const [key, val] of Object.entries(uniforms)) {
        if (uniformRef.current[key]) {
          // Existing key: update its value
          uniformRef.current[key].value = val
        } else {
          // New key: add it
          uniformRef.current[key] = { value: val }
        }
      }
    }, [uniforms])

    /* 5. Render the Three.js <shaderMaterial> */
    return (
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformRef.current}  // reference never changes
        {...props}
      />
    )
  }
)
