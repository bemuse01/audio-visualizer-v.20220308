import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/visualizer.child.shader.js'

export default class{
    constructor({group}){
        this.param = {
            size: 40,
            seg: 100,
            color: 0xffffff,
            pointSize: 1,
            layer: PROCESS
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.createCircle(group)
    }
    createCircle(group){
        // this.circle = new Circle({
        //     radius: this.param.circleRad,
        //     seg: this.param.seg,
        //     materialOpt: {
        //         color: this.param.color
        //         // vertexShader: Shader.circle.vertex,
        //         // fragmentShader: Shader.circle.fragment,
        //         // transparent: true,
        //         // blending: THREE.AdditiveBlending,
        //         // uniforms: {
        //         //     uColor: {value: new THREE.Color(this.param.color)},
        //         //     uOpacity: {value: this.param.circleOpacity}
        //         // }
        //     }
        // })

        // this.circle.get().layers.set(PROCESS)

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
                    uPointSize: {value: this.param.pointSize}
                }
            }
        })

        this.particle.setAttribute('position', position.array, 3)
        this.particle.setAttribute('uv', uv.array, 2)

        this.particle.get().layers.set(PROCESS)

        group.add(this.particle.get())
    }


    // animate
    animate(){
        this.particle.get().rotation.x += 0.005
        this.particle.get().rotation.y += 0.005
    }
}