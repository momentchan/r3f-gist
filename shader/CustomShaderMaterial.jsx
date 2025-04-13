import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export const CustomShaderMaterial = forwardRef(
  ({ vertexShader, fragmentShader, uniforms = {}, ...props }, ref) => {
    const materialRef = useRef()

    // Let parent access internal ShaderMaterial
    useImperativeHandle(ref, () => materialRef.current)

    const mergedUniforms = useMemo(() => {
      return {
        uTime: { value: 0 },
        ...uniforms,
      }
    }, [uniforms])

    useFrame(({ clock }) => {
      if (materialRef.current?.uniforms?.uTime) {
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      }
    })

    return (
      <shaderMaterial
        ref={materialRef}
        vertexShader={
          vertexShader ??
          `
          varying vec2 vUv; // Declare varying to pass UV to fragment shader

          void main() {
            vUv = uv; // Pass UV attribute to the fragment shader
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `
        }
        fragmentShader={
          fragmentShader ??
          `
          uniform float uTime;
          varying vec2 vUv; // Receive UV from the vertex shader

          void main() {
            vec3 color = vec3(vUv, abs(sin(uTime))); // Use UV for color
            gl_FragColor = vec4(color, 1.0);
          }
        `
        }
        uniforms={mergedUniforms}
        {...props}
      />
    )
  }
)
