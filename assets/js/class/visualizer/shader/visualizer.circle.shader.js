import ShaderMethod from '../../../method/method.shader.js'

export default {
    circle: {
        vertex: `
            varying vec2 vUv;

            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                
                vUv = uv;
            }
        `,
        fragment: `
            varying vec2 vUv;

            uniform vec3 uColor;
            uniform float uOpacity;

            void main(){
                float dist = distance(vUv, vec2(0.5));
                float opacity = smoothstep(0.5, 0.425, dist) * clamp(vUv.y, 0.0, 1.0) * uOpacity;

                vec4 color = vec4(uColor, opacity);

                gl_FragColor = color;
            }
        `
    },
    ring: {
        vertex: `
            attribute float aOpacity;

            varying vec2 vUv;
            varying float vOpacity;

            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                
                vUv = uv;
                vOpacity = aOpacity;
            }
        `,
        fragment: `
            varying vec2 vUv;
            varying float vOpacity;

            uniform vec3 uColor;
            // uniform float uOpacity;

            void main(){
                // float dist = distance(vUv, vec2(0.5));
                // float opacity = (dist > 0.4 ? smoothstep(0.5, 0.4, dist) : 0.0) * uOpacity;

                vec4 color = vec4(uColor, vOpacity);

                gl_FragColor = color;
            }
        `
    },
    bloom: {
        vertex: `
            varying vec2 vUv;

            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                
                vUv = uv;
            }
        `,
        fragment: `
            varying vec2 vUv;

            uniform vec3 uColor;
            uniform float uOpacity;

            ${ShaderMethod.createRing()}

            void main(){
                vec2 coord = vUv - 0.5;
                vec2 center = vec2(0);
                float radius = 0.5;
                float thickness = 0.2;
                float blur = 0.375;

                float opacity = ring(coord, center, radius, thickness, blur) * uOpacity;

                vec4 color = vec4(uColor, opacity);

                gl_FragColor = color;
            }
        `
    }
}