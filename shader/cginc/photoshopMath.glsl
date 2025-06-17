/*  photoshop_math_webgl.glsl  --  WebGL-safe (no #version) */
#ifndef PHOTOSHOP_MATH_WEBGL
#define PHOTOSHOP_MATH_WEBGL

/* --------- utilities --------- */
#ifndef saturate
#define saturate(x) clamp(x, 0.0, 1.0)
#endif

/* ---------- Luma ------------ */
float Luma(vec3 rgb){ return dot(rgb, vec3(0.2126729, 0.7151522, 0.0721750)); }

/* ---------- Blend helpers (bool mix) ------------ */
vec3 sel(vec3 a, vec3 b, bvec3 cond){ return vec3(cond.x?b.x:a.x, cond.y?b.y:a.y, cond.z?b.z:a.z); }

/* ========== Multiply / Screen (最常用) ========== */
vec3 BlendMultiply(vec3 base, vec3 blend){ return base * blend; }
vec3 BlendScreen(vec3 base, vec3 blend){ return 1.0 - (1.0-base)*(1.0-blend); }

/* ========= Overlay (用邏輯 mix 重寫) ============ */
vec3 BlendOverlay(vec3 base, vec3 blend){
    bvec3 lt = lessThan(base, vec3(0.5));
    vec3 m1 = 2.0 * base * blend;
    vec3 m2 = 1.0 - 2.0*(1.0-base)*(1.0-blend);
    return sel(m1, m2, lt);
}

/* ========= SoftLight ================================= */
float SoftMask(float b, float s){
    return    (s < 0.5)
           ? (2.0*b*s + b*b*(1.0-2.0*s))
           : (sqrt(b)*(2.0*s-1.0) + 2.0*b*(1.0-s));
}
vec3 BlendSoftLight(vec3 base, vec3 blend){
    return vec3( SoftMask(base.r, blend.r),
                 SoftMask(base.g, blend.g),
                 SoftMask(base.b, blend.b) );
}

/* ========== HardLight ================================= */
vec3 BlendHardLight(vec3 base, vec3 blend){
    bvec3 lt = lessThan(blend, vec3(0.5));
    vec3 m1 = 2.0 * base * blend;
    vec3 m2 = 1.0 - 2.0*(1.0-base)*(1.0-blend);
    return sel(m1, m2, lt);
}

/* ========== Color Dodge / Burn  ====================== */
vec3 BlendColorDodge(vec3 base, vec3 blend){
    bvec3 white = equal(blend, vec3(1.0));
    vec3 res = min(base / (1.0-blend), vec3(1.0));
    return sel(res, blend, white);
}
vec3 BlendColorBurn(vec3 base, vec3 blend){
    bvec3 zero = equal(blend, vec3(0.0));
    vec3 res = 1.0 - (1.0-base) / blend;
    return sel( max(res,vec3(0.0)), blend, zero );
}

/* ----  Desaturate 1-liner (有 alpha 版) ------------- */
vec3 Desaturate(vec3 c,float f){
    float g = dot(c, vec3(0.3,0.59,0.11));
    return mix(c, vec3(g), f);
}

#endif   /* PHOTOSHOP_MATH_WEBGL */
