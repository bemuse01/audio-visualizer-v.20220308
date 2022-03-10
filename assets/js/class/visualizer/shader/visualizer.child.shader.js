import ShaderMethod from '../../../method/method.shader.js'

export default {
    draw: {
        vertex: `
            varying vec2 vUv;

            uniform float uPointSize;
            uniform float uTime;
            uniform float uAudio;

            ${ShaderMethod.snoise4D()}

            void main(){
                vec3 newPosition = position;

                float x = snoise4D(vec4(position * 0.1 * 0.25, uTime * 0.001 + uAudio)) * 10.0 * uAudio;
                float y = snoise4D(vec4(position * 0.2 * 0.25, uTime * 0.001 + uAudio)) * 10.0 * uAudio;
                float z = snoise4D(vec4(position * 0.3 * 0.25, uTime * 0.001 + uAudio)) * 10.0 * uAudio;

                newPosition.x += x;
                newPosition.y += y;
                newPosition.z += z;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                
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