import { useThree, extend } from "@react-three/fiber"
import { useState } from "react"
import { SSAOPass } from "three-stdlib"
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"
import { Effects as EffectComposer2, } from "@react-three/drei"
import { EffectPass } from "postprocessing"
import { VelocityDepthNormalPass, SSGIEffect, TRAAEffect } from "realism-effects"

extend({ SSAOPass })
extend({
    VelocityDepthNormalPass,
    SSGIPass: class extends EffectPass {
        constructor(scene, camera, velocityDepthNormalPass) {
            super(camera, new SSGIEffect(scene, camera, velocityDepthNormalPass))
        }
    },
    TRAAPass: class extends EffectPass {
        constructor(scene, camera, velocityDepthNormalPass) {
            super(camera, new TRAAEffect(scene, camera, velocityDepthNormalPass))
        }
    },
})


export function SSAOEffects(props) {
    const { scene, camera } = useThree()
    return (
        <EffectComposer2 {...props}>
            <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={1.2} kernelSize={0} />
        </EffectComposer2>
    )
}

export function N8Effects(props) {
    return (
        <EffectComposer disableNormalPass multisampling={0}>
            <N8AO aoRadius={2} intensity={2} aoSamples={6} denoiseSamples={4} />
            <SMAA />
        </EffectComposer>
    )
}

export function SSGIEffects(props) {
    const { scene, camera } = useThree()
    const [velocityDepthNormalPass, setVelocityDepthNormalPass] = useState(null)
    return (
        <EffectComposer disableNormalPass>
            <velocityDepthNormalPass ref={setVelocityDepthNormalPass} args={[scene, camera]} />
            {velocityDepthNormalPass && (
                <>
                    <sSGIPass args={[scene, camera, velocityDepthNormalPass]} />
                    <tRAAPass args={[scene, camera, velocityDepthNormalPass]} />
                </>
            )}
        </EffectComposer>
    )
}