uniform vec2 resolution;
uniform float time;

varying vec2 vUv;

void main(void)
{
	gl_FragColor = vec4(
    vUv.x,
    vUv.y,
    sin(vUv.y * 100.0 + time * 10.0),
    1.0);
}