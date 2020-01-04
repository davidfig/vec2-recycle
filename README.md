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
[https://davidfig.github.io/pixi-viewport/jsdoc/](https://davidfig.github.io/pixi-viewport/jsdoc/)

## Installation

    yarn add pixi-viewport
or

    npm i pixi-viewport

or [grab the latest release](https://github.com/davidfig/pixi-viewport/releases/) and use it:

```html
<script src="/directory-to-file/pixi.js"></script>
<script src="/directory-to-file/pixi-viewport.js"></script>
<!-- or <script type="module" src="/directory-to-file/pixi-viewport.es.js"></script> -->
<script>
    const Viewport = new Viewport.Viewport(options)
</script>
```

## Build Examples
I've included a bunch of build examples in the docs/builds directory, including: [browserify](https://github.com/davidfig/pixi-viewport/tree/master/docs/builds/browserify), [rollup](https://github.com/davidfig/pixi-viewport/tree/master/docs/builds/rollup), [standalone (e.g., cdn)](https://github.com/davidfig/pixi-viewport/tree/master/docs/builds/standalone), [standalone (pixi.js v4)](https://github.com/davidfig/pixi-viewport/tree/master/docs/builds/standalone-v4), and [typescript](https://github.com/davidfig/pixi-viewport/tree/master/docs/builds/ts). You can see the live demos at [https://davidfig.github.io/pixi-viewport/builds/](https://davidfig.github.io/pixi-viewport/builds/).
  
## Tests

1. Clone repository
2. yarn install
3. yarn test (for Mocha test code)
4. yarn coverage (for Instanbul coverage)

## Other Libraries
If you liked pixi-viewport, please try my other open source libraries:
* [pixi-scrollbox](https://github.com/davidfig/pixi-scrollbox) - pixi.js scrollbox: a masked box that can scroll vertically or horizontally with scrollbars (uses pixi-viewport)
* [pixi-ease](https://github.com/davidfig/pixi-ease) - pixi.js animation library using easing functions
* [intersects](https://github.com/davidfig/intersects) - a simple collection of 2d collision/intersects functions. Supports points, circles, lines, axis-aligned boxes, and polygons

## license  
MIT License  
(c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)