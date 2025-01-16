

float smin(float a, float b, float k) {
    float h = max(k-abs(a-b), 0.0) / k;
    return min(a, b) - h*h*h*k * (1.0/6.0);
}

float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); 
}

// Octahedron SDF - https://iquilezles.org/articles/distfunctions/
float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x+p.y+p.z-s)*0.57735027;
}

// Custom gradient - https://iquilezles.org/articles/palettes/
vec3 palette(float t) {
        return .5+.5*cos(6.28318*(t+vec3(.3,.416,.557)));
}
