// recyclable vector2 library
// based on https://github.com/tmpvar/vec2.js

const cache = []

export function create(x = 0, y = 0) {
    if (cache.length) {
        const v = cache.pop()
        v[0] = x
        v[1] = y
        return v
    } else {
        return [x, y]
    }
}

/**
 * get cache size
 * @returns {number}
 */
export function cacheSize() {
    return cache.length
}

/** remove all entries from cache */
export function cacheClean() {
    while (cache.length) {
        cache.pop()
    }
}

/**
 * shrink cache to a certain number of entries
 * @param {number} length
 */
export function shrinkCache(length) {
    const shrink = cache.length - length
    for (let i = 0; i < shrink; i++) {
        cache.pop()
    }
}

/**
 * set the value of vec2
 * @param {number[]} v
 * @param {number} x
 * @param {number} [y] - use x if not set
 * @returns {number[]}
 */
export function set(v, x, y = x) {
    v[0] = x
    v[1] = y
    return v
}

/**
 * copy source values to destination
 * @param {number[]} destination
 * @param {number[]} source
 * @returns {number[]} destination
 */
export function copy(destination, source) {
    destination[0] = source[0]
    destination[1] = source[1]
    return destination
}

/**
 * @param {number[]} v
 */
export function clone(v) {
    return create(v[0], v[1])
}

/**
 * recycle the vector for future use
 * @param {number[]} v
 */
export function recycle(v) {
    cache.push(v)
}

/**
 * @param {number[]} v
 * @param {boolean} [clone] leave original vec2 and return a cloned, negated version
 * @returns {number[]}
 */
export function negate(v, clone) {
    if (clone) {
        const v2 = create(v[0], v[1])
        v2[0] = -v[0]
        v2[1] = -v[1]
        return v2
    } else {
        v[0] = -v[0]
        v[1] = -v[1]
        return v
    }
}

/**
 * v1 + v2
 * note: if clone is false, v1 is returned with the result
 * @param {number[]} v1
 * @param {number[]} v2
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v1 or the cloned vector
 */
export function add(v1, v2, clone) {
    if (clone) {
        return create(v1[0] + v2[0], v1[1] + v2[1])
    } else {
        v1[0] += v2[0]
        v1[1] += v2[1]
        return v1
    }
}

/**
 * v1 - v2
 * @param {number[]} v1
 * @param {number[]} v2
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v1 or the cloned vector
 */
export function subtract(v1, v2, clone) {
    if (clone) {
        return create(v1[0] - v2[0], v1[1] - v2[1])
    } else {
        v1[0] -= v2[0]
        v1[1] -= v2[1]
        return v1
    }
}

/**
 * v1 * v2
 * @param {number[]} v1
 * @param {number[]} v2
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v1 or the cloned vector
 */
export function multiply(v1, v2, clone) {
    if (clone) {
        return create(v1[0] * v2[0], v1[1] * v2[1])
    } else {
        v1[0] *= v2[0]
        v1[1] *= v2[1]
        return v1
    }
}

/**
 * v * scalar
 * @param {number[]} v
 * @param {number} scalar
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v or the cloned vector
 */
export function multiplyScalar(v, scalar, clone) {
    if (clone) {
        return create(v[0] * scalar, v[1] * scalar)
    } else {
        v[0] *= scalar
        v[1] *= scalar
        return v
    }
}

/**
 * v1 / v2
 * @param {number[]} v1
 * @param {number[]} v2
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v1 or the cloned vector
 */
export function divide(v1, v2, clone) {
    if (clone) {
        return create(v1[0] / v2[0], v1[1] / v2[1])
    } else {
        v1[0] /= v2[0]
        v1[1] /= v2[1]
        return v1
    }
}

/**
 * v / scalar
 * @param {number[]} v
 * @param {number} scalar
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v or the cloned vector
 */
export function divideScalar(v, scalar, clone) {
    if (clone) {
        return create(v[0] / scalar, v[1] / scalar)
    } else {
        v[0] /= scalar
        v[1] /= scalar
        return v
    }
}

/**
 * rotates a vector
 * @param {number[]} v
 * @param {number} radians
 * @param {options} [options]
 * @param {boolean} [options.inverse]
 * @param {boolean} [options.clone] returns a new vector with the result
 * @returns {number[]} v or the cloned vector
 */
export function rotate(v, radians, options = {}) {
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    const inverse = options.inverse ? -1 : 1
    const rx = cos * v[0] - (inverse * sin) * v[1]
    const ry = (inverse * sin) * v[0] + cos * v[1]

    if (options.clone) {
        return create(rx, ry)
    } else {
        v[0] = rx
        v[1] = ry
        return v
    }
}

/**
 * length of vector
 * @param {number[]} v
 * @returns {number}
 */
export function length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1])
}

/**
 * squared length of vector
 * @param {number[]} v
 * @returns {number}
 */
export function lengthSquared(v) {
    return v[0] * v[0] + v[1] * v[1]
}

/**
 * distance between two vectors
 * @param {number[]} v1
 * @param {number[]} v2
 * @returns {number}
 */
export function distance(v1, v2) {
    return Math.sqrt(Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2))
}

/**
 * distance squared between two vectors
 * @param {number[]} v1
 * @param {number[]} v2
 * @returns {number}
 */
export function distanceSquared(v1, v2) {
    return Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2)
}

/**
 * returns closest vec2 to v in array
 * @param {number[]} v
 * @param {number[]} array
 * @returns {number[]}
 */
export function nearest(v, array) {
    let closestDistance = Infinity
    let closest = null
    let current
    for (const v2 of array) {
        current = distanceSquared(v, v2)
        if (current < closestDistance) {
            closestDistance = current
            closest = v2
        }
    }
    return closest
}

/**
 * converts to unit vector
 * @param {number[]} v
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v1 or the cloned vector
 */
export function normalize(v, clone) {
    const len = length(v)
    const invertedLength = len === 0 ? 0 : 1 / len
    const x = v[0] * invertedLength
    const y = v[1] * invertedLength
    if (clone) {
        return create(x, y)
    } else {
        v[0] = x
        v[1] = y
        return v
    }
}

/**
 * @param {number[]} v1
 * @param {number[]} v2
 * @param {number} [precision] difference between components to still be equal
 */
export function equal(v1, v2, precision) {
    if (precision) {
        return Math.abs(v1[0] - v2[0]) < precision && Math.abs(v1[1] - v2[1]) < precision
    } else {
        return v1[0] === v2[0] && v1[1] === v2[1]
    }
}

/**
 * @param {number[]} v
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v or the cloned vector
 */
export function abs(v, clone) {
    if (clone) {
        return create(Math.abs(v[0]), Math.abs(v[1]))
    } else {
        v[0] = Math.abs(v[0])
        v[1] = Math.abs(v[1])
        return v
    }
}

/**
 * clamp vector using min/max values or vectors
 * @param {number[]} v
 * @param {(number|number[])} [min]
 * @param {(number|number[])} [max]
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v or the cloned vector
 */
export function clamp(v, min=null, max=null, clone) {
    if (clone) {
        const v2 = create()
        if (min !== null) {
            if (Array.isArray(min)) {
                v2[0] = v[0] < min[0] ? min[0] : v[0]
                v2[1] = v[1] < min[1] ? min[1] : v[1]
            } else {
                v2[0] = v[0] < min ? min : v[0]
                v2[1] = v[1] < min ? min : v[1]
            }
        }
        if (max !== null) {
            if (Array.isArray(max)) {
                v2[0] = v[0] > max[0] ? max[0] : v[0]
                v2[1] = v[1] > max[1] ? max[1] : v[1]
            } else {
                v2[0] = v[0] > max ? max : v[0]
                v2[1] = v[1] > max ? max : v[1]
            }
        }
        return v2
    } else {
        if (min !== null) {
            if (Array.isArray(min)) {
                v[0] = v[0] < min[0] ? min[0] : v[0]
                v[1] = v[1] < min[1] ? min[1] : v[1]
            } else {
                v[0] = v[0] < min ? min : v[0]
                v[1] = v[1] < min ? min : v[1]
            }
        }
        if (max !== null) {
            if (Array.isArray(max)) {
                v[0] = v[0] > max[0] ? max[0] : v[0]
                v[1] = v[1] > max[1] ? max[1] : v[1]
            } else {
                v[0] = v[0] > max ? max : v[0]
                v[1] = v[1] > max ? max : v[1]
            }
        }
        return v
    }
}

/**
 * linear interpolation between two vectors
 * @param {number[]} v1
 * @param {number[]} v2
 * @param {number} percent - between 0 and 1
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v1 or the cloned vector
 */
export function lerp(v1, v2, percent, clone) {
    const v = subtract(v2, v1, true)
    multiplyScalar(v, percent)
    if (clone) {
        return add(v, v1)
    } else {
        return add(v1, v)
    }
}

/**
 * @param {number[]} v
 * @param {boolean} [clone] return a new vector with the result
 * @returns {number[]} v or the cloned vector
 */
export function normal(v, clone) {
    if (clone) {
        return create(-v[1], v[0])
    } else {
        const swap = v[0]
        v[0] = -v[1]
        v[1] = swap
        return v
    }
}

/**
 * @param {number[]} v1
 * @param {number[]} v2
 * @returns {number}
 */
export function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1]
}

/**
 * @param {number[]} v1
 * @param {number[]} v2
 * @returns {number}
 */
export function dotPerpendicular(v1, v2) {
    return v1[0] * v2[1] - v1[1] * v2[0]
}

/**
 * angle between v1 and v2
 * @param {number[]} v1
 * @param {number[]} v2
 * @returns {number}
 */
export function angle(v1, v2) {
    return Math.atan2(v2[1] - v1[1], v2[0] - v1[0])
}

/**
 * @param {number[]} point
 * @param {number[]} start
 * @param {number[]} end
 * @returns {boolean}
 */
export function isPointOnLine(point, start, end) {
    return (start[1] - point[1]) * (start[0] - end[0]) === (start[1] - end[1]) * (start[0] - point[0])
}