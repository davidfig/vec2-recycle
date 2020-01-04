# vec2-recycle
Another vanilla vector 2 library with recycling

Similar in scope (and based on) https://github.com/tmpvar/vec2.js. Differences:

* uses a cache to recycle vectors to minimize garbage collection
* uses a number[2] without any prototypes
* is not watchable (unlike the above library--removed for speed purposes)

## Simple Example
```js
import * as vec2 from 'vec2-recycle'

const v1 = vec2.create(5, 4)
const v2 = vec2.create(8, 9)

// copies to a new vector
const v3 = vec2.add(v1, v2, true)

// v1 is replaced
vec2.subtract(v1, v2)

vec2.recycle(v2)
```

## API Documentation
[https://davidfig.github.io/vec2-recycle/jsdoc/](https://davidfig.github.io/vec2-recycle/)

## Installation

    yarn add vec2-recycle
or

    npm i vec2-recycle
  
## Tests

1. Clone repository
2. yarn install
3. yarn test (for jest test code)

## Other Libraries
If you liked pixi-viewport, please try my other open source libraries:
* [pixi-scrollbox](https://github.com/davidfig/pixi-scrollbox) - pixi.js scrollbox: a masked box that can scroll vertically or horizontally with scrollbars (uses pixi-viewport)
* [pixi-ease](https://github.com/davidfig/pixi-ease) - pixi.js animation library using easing functions
* [intersects](https://github.com/davidfig/intersects) - a simple collection of 2d collision/intersects functions. Supports points, circles, lines, axis-aligned boxes, and polygons

## license  
MIT License  
(c) 2020 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)