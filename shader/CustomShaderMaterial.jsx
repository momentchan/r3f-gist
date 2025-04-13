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
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `
        }
        fragmentShader={
          fragmentShader ??
          `
          uniform float uTime;
          void main() {
            gl_FragColor = vec4(abs(sin(uTime)), 0.2, 1.0, 1.0);
          }
        `
        }
        uniforms={mergedUniforms}
        {...props}
      />
    )
  }
)
