import { GPUComputationRenderer } from "./GPUComputationRenderer"

export default class GPGPU {
    constructor(renderer, w = 512, h = 512) {
        this.gpuCompute = new GPUComputationRenderer(w, h, renderer)
        this.variables = {}
    }

    addVariable(name, data, simulationMat) {
        const texture = this.gpuCompute.createTexture()
        texture.image.data = data

        const variable = this.gpuCompute.addVariableByMat(name, simulationMat, texture)
        this.variables[name] = variable
        return variable
    }

    setVariableDependencies(variable, dependencies) {
        this.gpuCompute.setVariableDependencies(this.variables[variable], dependencies.map(key => this.variables[key]))
    }

    init() {
        this.gpuCompute.init()
    }

    compute() {
        this.gpuCompute.compute()
    }

    getUniform(name, property) {
        return this.variables[name].material.uniforms[property]
    }

    setUniform(name, property, value) {
        this.getUniform(name, property).value = value
    }
    
    getCurrentRenderTarget(name) {
        return this.gpuCompute.getCurrentRenderTarget(this.variables[name]).texture
    }
}