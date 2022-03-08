import * as THREE from '../../../lib/three.module.js'
import Circle from '../../objects/circle.js'
import Ring from '../../objects/ring.js'
import Shader from '../shader/visualizer.circle.shader.js'

export default class{
    constructor({group}){
        this.param = {
            circleRad: 14,
            seg: 64,
            color: 0xffffff,
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
        this.circle = new Circle({
            radius: this.param.circleRad,
            seg: this.param.seg,
            materialOpt: {
                color: this.param.color
                // vertexShader: Shader.circle.vertex,
                // fragmentShader: Shader.circle.fragment,
                // transparent: true,
                // blending: THREE.AdditiveBlending,
                // uniforms: {
                //     uColor: {value: new THREE.Color(this.param.color)},
                //     uOpacity: {value: this.param.circleOpacity}
                // }
            }
        })

        this.circle.get().layers.set(PROCESS)

        group.add(this.circle.get())
    }
}