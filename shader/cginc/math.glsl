float backout(float progress, float swing) {
    float p = progress - 1.0;
    return (p * p * ((swing + 1.0) * p + swing) + 1.0);
}

