varying vec3 vertexNormal;
void main() {

	float intensity = pow(0.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 0.5);

	gl_FragColor = vec4(0.4, 0.6, 1.0, 1.0) * intensity;
}
