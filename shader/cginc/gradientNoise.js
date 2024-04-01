const gNoisie = /*glsl*/`

float noise(vec2 co) {
	vec2 seed = vec2(sin(co.x), cos(co.y));
	return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 gradientNoise_dir(vec2 p) {
	p = mod(p, 289.0);
	float x = mod((34.0 * p.x + 1.0) * p.x, 289.0) + p.y;
	x = mod((34.0 * x + 1.0) * x, 289.0);
	x = fract(x / 41.0) * 2.0 - 1.0;
	return normalize(vec2(x - floor(x + 0.5), abs(x) - 0.5));
}

float gradientNoise(vec2 p) {
	vec2 ip = floor(p);
	vec2 fp = fract(p);
	float d00 = dot(gradientNoise_dir(ip), fp);
	float d01 = dot(gradientNoise_dir(ip + vec2(0.0, 1.0)), fp - vec2(0.0, 1.0));
	float d10 = dot(gradientNoise_dir(ip + vec2(1.0, 0.0)), fp - vec2(1.0, 0.0));
	float d11 = dot(gradientNoise_dir(ip + vec2(1.0, 1.0)), fp - vec2(1.0, 1.0));
	fp = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
	return mix(mix(d00, d01, fp.y), mix(d10, d11, fp.y), fp.x);
}

float gradientNoise(vec2 UV, float Scale) {
	return gradientNoise(UV * Scale) + 0.5;
}

vec2 scatter(vec2 uv, float radius) {
	return -radius + vec2(gradientNoise(uv, 1000.0), gradientNoise(uv.yx, 1000.0)) * radius * 2.0;
}

`
export default gNoisie