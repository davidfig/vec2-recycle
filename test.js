import * as vec2 from './'

describe('vec2-recycle', function() {
  describe('constructor', function() {
    it('sets x and y if they are passed', function() {
      var v = vec2.create(5, 6)
      expect(v[0]).toBe(5)
      expect(v[1]).toBe(6)
    })

    it('defaults x and y to zero if not passed', function() {
      var v = vec2.create()
      expect(v[0]).toBe(0)
      expect(v[1]).toBe(0)
    })

    it('x, y are always created on the object itself', function() {
      var v = vec2.create()
      expect(v.length).toBe(2)
      expect()
    })

    it('should return a new instance if not called with new', function() {
      var v = vec2.create(1, 2)
      expect(v[0]).toBe(1)
      expect(v[1]).toBe(2)
    })
  })

  describe('#clone', function() {
    it('should return a new Vec2 with the same component values', function() {
      var v = vec2.create(0, 1)
      var v2 = vec2.clone(v)
      expect(v).not.toBe(v2)
      expect(vec2.equal(v, v2)).toBe(true)
    })
  })

  describe('#set', function() {
    it('sets x and y', function() {
      var v = vec2.create()
      vec2.set(v, 10, 9)
      expect(v[0]).toBe(10)
      expect(v[1]).toBe(9)
      vec2.set(v, 5)
      expect(v[0]).toBe(5)
      expect(v[1]).toBe(5)
    })
 })

    it('is chainable', function() {
      var v = vec2.create()
      expect(vec2.set(v, 1, 2)).toBe(v)
    })

    it('copy', function () {
      var v1 = vec2.create(1, 2)
      var v2 = vec2.create(2, 3)
      vec2.copy(v1, v2)
      expect(v1[0]).toBe(v2[0])
      expect(v1[1]).toBe(v2[1])
    })

  describe('#negate', function() {
    it('makes positive values negative', function() {
      var
      v = vec2.create(2, 2),
      v2 = vec2.negate(v)

      expect(v2[0]).toBe(-2)
      expect(v2[1]).toBe(-2)
    })

    it('makes negative values positive', function() {
      var
      v = vec2.create(-2, -2),
      v2 = vec2.negate(v)

      expect(v2[0]).toBe(2)
      expect(v2[1]).toBe(2)
    })

    it('is chainable when returnNew is falsy', function() {
      var v = vec2.create(1,1)
      expect(vec2.negate(v)).toBe(v)
    })

    it('returns a new Vec2 when returnNew is truthy', function() {
      var v = vec2.create(1,1)
      expect(vec2.negate(v, true)).not.toBe(v)
    })
  })

  describe('math', function() {
    var v, v2

    beforeEach(function() {
      v = vec2.create(1,2)
      v2 = vec2.create(10, 10)
    })

    describe('#add', function() {
      it('adds to both this.x and this.y when returnNew is falsy', function() {
        vec2.add(v, v2)
        expect(v[0]).toBe(11)
        expect(v[1]).toBe(12)
      })

      it('returns a new vector when returnNew is truthy', function() {
        var r = vec2.add(v, v2, true)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)

        expect(r[0]).toBe(11)
        expect(r[1]).toBe(12)
      })

      it('returns itself when returnNew is falsy', function() {
        var r = vec2.add(v, v2)
        expect(v[0]).toBe(11)
        expect(v[1]).toBe(12)
        expect(r).toBe(v)
      })
    })

    describe('#subtract', function() {
      it('subtracts from both this.x and this.y when returnNew is falsy', function() {
        vec2.subtract(v, v2)
        expect(v[0]).toBe(-9)
        expect(v[1]).toBe(-8)
      })

      it('returns a new vector when returnNew is truthy', function() {
        var r = vec2.subtract(v, v2, true)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)

        expect(r[0]).toBe(-9)
        expect(r[1]).toBe(-8)
      })

      it('returns itself when returnNew is falsy', function() {
        var v = vec2.create(1,2)
        expect(vec2.subtract(v, vec2.create(1,1))).toBe(v)
      })
    })

    describe('#multiply', function() {
      it('multiplies both this.x and this.y when returnNew is falsy', function() {
        vec2.multiply(v, v2)
        expect(v[0]).toBe(10)
        expect(v[1]).toBe(20)
      })

      it('returns a new vector when returnNew is truthy', function() {
        var r = vec2.multiplyScalar(v, 10, true)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)

        expect(r[0]).toBe(10)
        expect(r[1]).toBe(20)
      })

      describe('scalar argument', function() {
        it('accepts a scalar', function() {
          var v = vec2.create(1,2)

          vec2.multiplyScalar(v, 5)

          expect(v[0]).toBe(5)
          expect(v[1]).toBe(10)
        })

        it('returns a new Vec2 when returnNew is truthy', function() {
          var
          v = vec2.create(1,2),
          r = vec2.multiplyScalar(v, 5, true)

          expect(r[0]).toBe(5)
          expect(r[1]).toBe(10)

          expect(v[0]).toBe(1)
          expect(v[1]).toBe(2)
        })

        it('returns itself when returnNew is falsy', function() {
          var v = vec2.create(1,2)
          expect(vec2.multiplyScalar(v, 1)).toBe(v)
        })
      })
    })

    describe('#rotate', function() {
      it('accepts a scalar angle in radians', function() {
        var v = vec2.create(10, 20)

        var rotated = vec2.rotate(v, 1.2, { clone: true })
        expect(Number(rotated[0]).toFixed(4)).toBe('-15.0172')
        expect(Number(rotated[1]).toFixed(4)).toBe('16.5675')
      })

      it('accepts a scalar angle in radians (inverse)', function() {
        var v = vec2.create(10, 20)

        var rotated = vec2.rotate(v, 1.2, { inverse: true, clone: true })
        expect(Number(rotated[0]).toFixed(4)).toBe('22.2644')
        expect(Number(rotated[1]).toFixed(4)).toBe('-2.0732')
      })

      it('returns a new vector if returnNew is truthy', function() {
        var v = vec2.create(10, 20)
        expect(vec2.rotate(v, 1.0, { clone: true})).not.toBe(v)
      })

      it('returns itself when returnNew is falsy', function() {
        var v = vec2.create(10, 20)
        expect(vec2.rotate(v, 1.0, { inverse: true })).toBe(v)
      })
    })

    describe('#length', function() {
      it('calculates the length', function() {
        expect(vec2.length(v2)).toBe(14.142135623730951)
      })

      it('is always positive', function() {
        vec2.subtract(v2, vec2.create(100, 200))
        expect(vec2.length(v2) > 0)
      })
    })

    describe('#lengthSquared', function() {
      it('squares x and y, then sum them', function() {
        expect(vec2.lengthSquared(v2)).toBe(200)
      })

      it('is always be positive', function() {
        vec2.subtract(v2, vec2.create(100, 200))
        expect(vec2.length(v2) > 0)
      })
    })

    describe('#distance', function() {
      it('returns a new Vec2 representing the distance between two vectors', function() {
        var
        v = vec2.create(0, 10),
        v2 = vec2.create(0,0),
        d = vec2.distance(v, v2)

        expect(d).toBe(10)
      })
    })

    describe('#normalize', function() {
      it('properly normalizes a vector', function() {
        var v = vec2.create(2, 5)
        var v2 = vec2.normalize(v)
        expect(Math.abs(v2[0] - 0.37139068)).toBeLessThan(0.0001)
        expect(Math.abs(v2[1] - 0.92847669)).toBeLessThan(0.0001)
        expect(v).toBe(v2)
      })

      it('should return a new vector when returnNew is truthy', function() {
        var v = vec2.create(2, 5)
        var v2 = vec2.normalize(v, true)
        expect(Math.abs(v2[0] - 0.37139068)).toBeLessThan(0.0001)
        expect(Math.abs(v2[1] - 0.92847669)).toBeLessThan(0.0001)
        expect(v).not.toBe(v2)
      })

      it ('should properly normalize a vector at 0,0', function() {
        var v = vec2.create(0,0)
        vec2.normalize(v)
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
      })
    })

    describe('#normal', function() {

      it('negates the y axis and swap x/y', function() {
        var v3 = vec2.normal(v)
        expect(v3).toBe(v)
        expect(v3[0]).toBe(-2)
        expect(v3[1]).toBe(1)
      })

      it('negates the y axis and swap x/y (returnNew)', function() {
        var v3 = vec2.normal(v, true)
        expect(v3).not.toBe(v)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v3[0]).toBe(-2)
        expect(v3[1]).toBe(1)
      })
    })

    describe('#abs', function() {
      it('returns a new vector with positive values', function() {
        var
        v = vec2.create(-10, -100)

        vec2.abs(v)

        expect(v[0]).toBe(10)
        expect(v[1]).toBe(100)
      })

      it('itself with positive values applied', function() {
        var
        v = vec2.create(-10, -100),
        e = vec2.create(10, 100),
        result = vec2.abs(v)

        expect(vec2.equal(result, e)).toBe(true)
        expect(result).toBe(v)
      })

      it('should return a new Vec2 when returnNew is specified', function() {
        var
        v = vec2.create(-10, -100),
        result = vec2.abs(v, true)
        expect(result).not.toBe(v)
      })
    })
  })

  describe('#nearest', function() {
    it('returns nearest Vec2 to this Vec2', function() {
      var
      v = vec2.create(0, 0),
      closest = vec2.create(1, 0),
      middle = vec2.create(2, 0),
      far = vec2.create(3, 0)

      var nearest = vec2.nearest(v, [middle, closest, far])

      expect(nearest).toBe(closest)
    })

    it('returns first of nearest Vec2s if there are multiple nearest', function() {
      var
      v = vec2.create(0, 0),
      closest = vec2.create(1, 0),
      anotherClosest = vec2.create(-1, 0)

      var nearest = vec2.nearest(v, [closest, anotherClosest])

      expect(nearest).toBe(closest)
    })

    it('returns null if no Vec2s are in given Array', function() {
      var v = vec2.create(0, 0)

      var nearest = vec2.nearest(v, [])

      expect(nearest).toBe(null)
    })
  })

  describe('#equal', function() {
    it('returns true when both Vec2s have the same values', function() {
      var
      v = vec2.create(1,2),
      v2 = vec2.create(1,2)

      expect(vec2.equal(v, v2)).toBe(true)
    })

    it('returns false when the Vec2s have the different values', function() {
      var
      v = vec2.create(1,2),
      v2 = vec2.create(1,1)

      expect(vec2.equal(v, v2)).toBe(false)
    })

    it('detects values that are closer than precision', function() {
      var v = vec2.create(1, 2)
      expect(vec2.equal(v, vec2.create(1.00001, 2), 0.0001)).toBe(true)
    })
  })

  describe('clamp', function() {
    it('lowers to the upper bound if above', function() {
      var
      val = vec2.create(4, 6),
      low = vec2.create(0, 0),
      high = vec2.create(2, 4)

      var clamp =vec2.clamp(val, low, high)
      expect(clamp[0]).toBe(2)
      expect(clamp[1]).toBe(4)
    })

    it('raises to the lowerbound if below', function() {
      var
      val = vec2.create(-2, -10),
      low = vec2.create(0, 0),
      high = vec2.create(2, 4)

      var clamp = vec2.clamp(val, low, high)
      expect(clamp[0]).toBe(0)
      expect(clamp[1]).toBe(0)
    })

    it('applies the result to itself if returnNew is false', function() {
      var
      val = vec2.create(4, 6),
      low = vec2.create(0, 0),
      high = vec2.create(2, 4)

      var clamp = vec2.clamp(val, low, high)
      expect(clamp).toBe(val)
    })

    it('returns a new Vec2 if returnNew is truthy', function() {
      var
      val = vec2.create(4, 6),
      low = vec2.create(0, 0),
      high = vec2.create(2, 4)

      var clamp = vec2.clamp(low, high, true)
      expect(clamp).not.toBe(val)
    })

    it('uses a scalar for min', () => {
        var val = vec2.create(1, -1)

        var clamp = vec2.clamp(val, 0)
        expect(clamp[0]).toBe(1)
        expect(clamp[1]).toBe(0)
    })

    it('uses a scalar for max', () => {
        var val = vec2.create(1, -1)

        var clamp = vec2.clamp(val, null, 0.5)
        expect(clamp[0]).toBe(0.5)
        expect(clamp[1]).toBe(-1)
    })

    it('uses a scalar for min & max', () => {
        var val = vec2.create(1, -1)

        var clamp = vec2.clamp(val, -0.5, 0.5)
        expect(clamp[0]).toBe(0.5)
        expect(clamp[1]).toBe(-0.5)
    })
  })

  describe('#lerp', function() {
    it('should return the first point when 0', function() {
      var v = vec2.create(5, 5)
      vec2.lerp(v, vec2.create(100, 5), 0)
      expect(v[0]).toBe(5)
      expect(v[1]).toBe(5)
    })

    it('should return the last point when 1', function() {
      var v = vec2.create(5, 5)
      vec2.lerp(v, vec2.create(100, 5), 1)
      expect(v[0]).toBe(100)
      expect(v[1]).toBe(5)
    })

    it('should return the halfway point when .5', function() {
      var v = vec2.create(0, 5)
      vec2.lerp(v, vec2.create(100, 5), 0.5)
      expect(v[0]).toBe(50)
      expect(v[1]).toBe(5)
    })

    it('should return the halfway point when .5 (returnNew)', function() {
      var v = vec2.create(0, 5)
      var v2 = vec2.lerp(v, vec2.create(100, 5), 0.5, true)

      expect(v[0]).toBe(0)
      expect(v[1]).toBe(5)
      expect(v2[0]).toBe(50)
      expect(v2[1]).toBe(5)
    })
  })

  describe('#dot', function() {
    it('should return the dot product of this vector', function() {
      var v = vec2.create(10, 10)
      const dot = vec2.dot(v, vec2.create(5, 15))
      expect(dot).toBe(200)
    })
  })

  describe('#dotPerpendicular', function() {
    it('should return the perpendicular dot product of this vector', function() {
      var v = vec2.create(10, 10)
      var dot = vec2.dotPerpendicular(v, vec2.create(5, 15))
      expect(dot).toBe(100)
    })
  })

//   describe('#angle', function() {
//     it('should return the radians between two vecs', function() {
//       var v = vec2.create(10, 0)
//       var angle = vec2.angle(v, vec2.create(0, 10))
//       expect(angle).toBe(Math.PI/2)
//     })
//   })

  describe('#divideScalar', function() {
    it('applies the result to itself if returnNew is falsy', function() {
      var v = vec2.create(10, 20)
      vec2.divideScalar(v, 10)
      expect(v[0]).toBe(1)
      expect(v[1]).toBe(2)
    })

    it('returns a new vector when returnNew is truthy', function() {
      var v = vec2.create(10, 20)
      var v2 = vec2.divideScalar(v, 10, true)
      expect(v[0]).toBe(10)
      expect(v[1]).toBe(20)

      expect(v2[0]).toBe(1)
      expect(v2[1]).toBe(2)
    })
  })

  describe('#isPointOnLine', function() {
    it('should return true when on the specified line', function() {
      var v = vec2.create(0, 0)
      expect(vec2.isPointOnLine(v, vec2.create(1, 1), vec2.create(-1, -1))).toBe(true)
    })

    it('should return false when not on the specified line', function() {
      var v = vec2.create(0, 0)
      expect(vec2.isPointOnLine(v, vec2.create(1, 1), vec2.create(-4, -1))).toBe(false)
    })
  })
})