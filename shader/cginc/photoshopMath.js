const photoshopMath = /* glsl */ `

vec3 hueShift(vec3 col, float Offset) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 P = mix(vec4(col.bg, K.wz), vec4(col.gb, K.xy), step(col.b, col.g));
    vec4 Q = mix(vec4(P.xyw, col.r), vec4(col.r, P.yzx), step(P.x, col.r));
    float D = Q.x - min(Q.w, Q.y);
    float E = 1e-10;
    vec3 hsv = vec3(abs(Q.z + (Q.w - Q.y) / (6.0 * D + E)), D / (Q.x + E), Q.x);

    float hue = hsv.x + Offset / 360.0;
    hsv.x = (hue < 0.0) ? hue + 1.0 : (hue > 1.0) ? hue - 1.0 : hue;

    vec4 K2 = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 P2 = abs(fract(hsv.xxx + K2.xyz) * 6.0 - K2.www);
    return hsv.z * mix(K2.xxx, clamp(P2 - K2.xxx, 0.0, 1.0), hsv.y);
}


vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 HSVShift(vec3 baseColor, vec3 shift) {
    vec3 hsv = rgb2hsv(baseColor);
    hsv = hsv + shift.xyz;
    hsv.yz = clamp(hsv.yz, 0.0, 1.0);
    return hsv2rgb(hsv);
}

vec3 BlendOverLay(vec3 baseColor, vec3 blendColor, float lerp) {
    return mix(baseColor, (2.0 * baseColor * blendColor), lerp);
}
`

export default photoshopMath