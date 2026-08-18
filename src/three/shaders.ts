/**
 * Shared GLSL for the field.
 *
 * `morph` is the heart of it: scroll arrives as a single 0..1 uniform, is
 * scaled across the four formations, and each formation's contribution is a
 * tent function that peaks at its own index. Consecutive tents always sum to
 * 1, so the blend is exact with no normalisation pass. Easing the fractional
 * part before building the tents is what makes formations settle rather than
 * slide linearly past each other.
 */
const MORPH = /* glsl */ `
  attribute vec3 aPos0;
  attribute vec3 aPos1;
  attribute vec3 aPos2;
  attribute vec3 aPos3;

  float tent(float t, float i) {
    return max(0.0, 1.0 - abs(t - i));
  }

  float easedStage(float progress) {
    float t = progress * 3.0;
    float i = floor(t);
    float f = clamp(t - i, 0.0, 1.0);
    f = f * f * (3.0 - 2.0 * f);
    return i + f;
  }

  vec3 blend(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float stage) {
    return p0 * tent(stage, 0.0)
         + p1 * tent(stage, 1.0)
         + p2 * tent(stage, 2.0)
         + p3 * tent(stage, 3.0);
  }

  // Slow organic wander, seeded per node so no two drift in step.
  vec3 drift(vec3 p, float seed, float time, float amount) {
    float phase = seed * 6.2831853;
    p.x += sin(time * 0.35 + phase) * amount;
    p.y += cos(time * 0.29 + phase * 1.7) * amount;
    p.z += sin(time * 0.31 + phase * 2.3) * amount;
    return p;
  }
`

export const pointsVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aSeed;

  varying float vSeed;
  varying float vDepth;

  ${MORPH}

  void main() {
    vec3 pos = blend(aPos0, aPos1, aPos2, aPos3, easedStage(uProgress));
    pos = drift(pos, aSeed, uTime, 0.22);

    vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    // Perspective-correct sizing: nearer nodes are physically larger, which
    // is what gives the field depth without any fog.
    gl_PointSize = uSize * aScale * uPixelRatio * (16.0 / max(-viewPosition.z, 0.1));

    vSeed = aSeed;
    vDepth = -viewPosition.z;
  }
`

export const pointsFragment = /* glsl */ `
  precision highp float;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uCoreBoost;

  varying float vSeed;
  varying float vDepth;

  void main() {
    // Points render as squares; carve a disc out of each one.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float halo = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);

    vec3 color = mix(uColorA, uColorB, vSeed);
    color += core * uCoreBoost;

    // Distance fade stands in for fog and keeps the far field from muddying
    // the type it sits behind.
    float depthFade = smoothstep(98.0, 10.0, vDepth);
    float alpha = (halo * 0.5 + core * 0.75) * depthFade * uOpacity;

    gl_FragColor = vec4(color, alpha);
  }
`

export const linksVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;

  attribute vec3 aLink0;
  attribute vec3 aLink1;
  attribute vec3 aLink2;
  attribute vec3 aLink3;

  varying float vStretch;
  varying float vDepth;

  ${MORPH}

  void main() {
    float stage = easedStage(uProgress);

    vec3 self = blend(aPos0, aPos1, aPos2, aPos3, stage);
    vec3 other = blend(aLink0, aLink1, aLink2, aLink3, stage);

    // Both endpoints drift, but a link only looks right if it stays attached,
    // so each endpoint is drifted with its own seed derived from position.
    self = drift(self, fract(dot(aPos1, vec3(0.13, 0.27, 0.41))), uTime, 0.22);
    other = drift(other, fract(dot(aLink1, vec3(0.13, 0.27, 0.41))), uTime, 0.22);

    // How far this link has been pulled apart by the current morph. Links
    // that stretch past a threshold fade out, so the network visibly
    // dissolves and re-forms between formations instead of smearing.
    vStretch = distance(self, other);

    vec4 viewPosition = modelViewMatrix * vec4(self, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    vDepth = -viewPosition.z;
  }
`

export const linksFragment = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vStretch;
  varying float vDepth;

  void main() {
    float intact = smoothstep(13.0, 2.0, vStretch);
    float depthFade = smoothstep(98.0, 10.0, vDepth);
    float alpha = intact * depthFade * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`
