const utility = /*glsl*/ `

float remap(float In, vec2 InMinMax, vec2 OutMinMax) {
    return OutMinMax.x + (In - InMinMax.x) * (OutMinMax.y - OutMinMax.x) / (InMinMax.y - InMinMax.x);
}

vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

float smoothEdge(vec2 uv, vec2 smoothness) {
    return smoothstep(0.0, smoothness.x, uv.x) * smoothstep(1.0, 1.0 - smoothness.x, uv.x) * smoothstep(0.0, smoothness.y, uv.y) * smoothstep(1.0, 1.0 - smoothness.y, uv.y);
}

float Contrast(float In, float Contrast) {
	float midpoint = pow(0.5, 2.2);
	return (In - midpoint) * Contrast + midpoint;
}
`

export default utility