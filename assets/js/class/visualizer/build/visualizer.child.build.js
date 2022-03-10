import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/visualizer.child.shader.js'
import VisualizerParam from '../param/visualizer.param.js'

export default class{
    constructor({group, size}){
        this.size = size
        
        this.param = {
            size: 45,
            seg: 100,
            color: 0xffffff,
            pointSize: 1,
            layer: PROCESS
        }

        this.init(group)
    }


    // init
    init(group){
        this.initRenderTarget()
        this.create(group)
    }
    initRenderTarget(){
        const {w, h} = this.size.el

        this.renderTarget = new THREE.WebGLRenderTarget(w, h, {format: THREE.RGBAFormat})
        this.renderTarget.samples = 2048

        this.rtCamera = new THREE.PerspectiveCamera(VisualizerParam.fov, w / h, VisualizerParam.near, VisualizerParam.far)
        this.rtCamera.position.z = VisualizerParam.pos

        this.rtScene = new THREE.Scene()
    }


    // create
    create(group){
        this.createCircle(group)
    }
    createCircle(group){
        const {size, seg} = this.param
        const {position, uv} = new THREE.BoxGeometry(size, size, size, seg, seg, seg).attributes

        this.particle = new Particle({
            count: position.count,
            materialOpt: {
                vertexShader: Shader.draw.vertex,
                fragmentShader: Shader.draw.fragment,
                transparent: true,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uColor: {value: new THREE.Color(this.param.color)},
                    uPointSize: {value: this.param.pointSize},
                    uTime: {value: 0},
                    uAudio: {value: 0},
                    uSize: {value: this.param.size / 2}
                }
            }
        })

        this.particle.setAttribute('position', position.array, 3)
        this.particle.setAttribute('uv', uv.array, 2)

        // this.particle.get().layers.set(PROCESS)

        // group.add(this.particle.get())
        this.rtScene.add(this.particle.get())
    }


    // animate
    animate({renderer, audioData, audioDataAvg}){
        if(audioData){
            this.particle.setUniform('uAudio', audioDataAvg)
        }

        const time = window.performance.now()

        this.particle.setUniform('uTime', time)

        this.particle.get().rotation.x += 0.006
        this.particle.get().rotation.y += 0.006

        renderer.setRenderTarget(this.renderTarget)
        renderer.clear()
        renderer.render(this.rtScene, this.rtCamera)
        renderer.setRenderTarget(null)
    }
}