import ShaderMethod from '../../../method/method.shader.js'

export default {
    draw: {
        vertex: `
            varying vec2 vUv;

            uniform float uPointSize;

            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                
                gl_PointSize = uPointSize;

                vUv = uv;
            }
        `,
        fragment: `
            varying vec2 vUv;

            uniform vec3 uColor;

            void main(){
                vec4 color = vec4(uColor, 1.0);

                gl_FragColor = color;
            }
        `
    },
}