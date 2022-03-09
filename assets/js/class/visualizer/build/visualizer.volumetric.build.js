import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
import Shader from '../shader/visualizer.volumetric.shader.js'

export default class{
    constructor({group, size, child}){
        this.size = size
        
        this.texture = child.renderTarget.texture

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.object = new Plane({
            width: this.size.obj.w,
            height: this.size.obj.h,
            widthSeg: 1,
            heightSeg: 1,
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    // uRes: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)},
                    tDiffuse: {value: this.texture},
                    lightPosition: {value: new THREE.Vector2(0.5, 0.5)},
                    exposure: {value: 0.18},
                    decay: {value: 0.95},
                    // density: {value: 0.8},
                    density: {value: 0.6},
                    weight: {value: 0.4},
                    samples: {value: 50}
                }
            }
        })

        group.add(this.object.get())
    }


    // resize
    resize(size){
        this.size = size
        
        this.object.resize({width: this.size.obj.w, height: this.size.obj.h, widthSeg: 1, heightSeg: 1})
    }
}