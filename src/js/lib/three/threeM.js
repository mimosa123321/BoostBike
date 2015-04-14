// Three.js r46 - http://github.com/mrdoob/three.js
var THREE_M = THREE_M || {};
if (!self.Int32Array) self.Int32Array = Array, self.Float32Array = Array;
THREE_M.Clock = function(a) {
    this.autoStart = a !== void 0 ? a : !0;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = !1
};
THREE_M.Clock.prototype.start = function() {
    this.oldTime = this.startTime = Date.now();
    this.running = !0
};
THREE_M.Clock.prototype.stop = function() {
    this.getElapsedTime();
    this.running = !1
};
THREE_M.Clock.prototype.getElapsedTime = function() {
    this.elapsedTime += this.getDelta();
    return this.elapsedTime
};
THREE_M.Clock.prototype.getDelta = function() {
    var a = 0;
    this.autoStart && !this.running && this.start();
    if (this.running) {
        var c = Date.now(),
            a = 0.001 * (c - this.oldTime);
        this.oldTime = c;
        this.elapsedTime += a
    }
    return a
};
THREE_M.Color = function(a) {
    a !== void 0 && this.setHex(a);
    return this
};
THREE_M.Color.prototype = {
    constructor: THREE_M.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function(a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this
    },
    copyGammaToLinear: function(a) {
        this.r = a.r * a.r;
        this.g = a.g * a.g;
        this.b = a.b * a.b;
        return this
    },
    copyLinearToGamma: function(a) {
        this.r = Math.sqrt(a.r);
        this.g = Math.sqrt(a.g);
        this.b = Math.sqrt(a.b);
        return this
    },
    setRGB: function(a, c, b) {
        this.r = a;
        this.g = c;
        this.b = b;
        return this
    },
    setHSV: function(a, c, b) {
        var d, g, f;
        if (b === 0) this.r = this.g = this.b = 0;
        else switch (d = Math.floor(a * 6), g = a * 6 - d, a = b * (1 - c), f = b * (1 -
            c * g), c = b * (1 - c * (1 - g)), d) {
            case 1:
                this.r = f;
                this.g = b;
                this.b = a;
                break;
            case 2:
                this.r = a;
                this.g = b;
                this.b = c;
                break;
            case 3:
                this.r = a;
                this.g = f;
                this.b = b;
                break;
            case 4:
                this.r = c;
                this.g = a;
                this.b = b;
                break;
            case 5:
                this.r = b;
                this.g = a;
                this.b = f;
                break;
            case 6:
            case 0:
                this.r = b, this.g = c, this.b = a
        }
        return this
    },
    setHex: function(a) {
        a = Math.floor(a);
        this.r = (a >> 16 & 255) / 255;
        this.g = (a >> 8 & 255) / 255;
        this.b = (a & 255) / 255;
        return this
    },
    getHex: function() {
        return ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255)
    },
    getContextStyle: function() {
        return "rgb(" +
            Math.floor(this.r * 255) + "," + Math.floor(this.g * 255) + "," + Math.floor(this.b * 255) + ")"
    },
    clone: function() {
        return (new THREE_M.Color).setRGB(this.r, this.g, this.b)
    }
};
THREE_M.Vector2 = function(a, c) {
    this.x = a || 0;
    this.y = c || 0
};
THREE_M.Vector2.prototype = {
    constructor: THREE_M.Vector2,
    set: function(a, c) {
        this.x = a;
        this.y = c;
        return this
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    clone: function() {
        return new THREE_M.Vector2(this.x, this.y)
    },
    add: function(a, c) {
        this.x = a.x + c.x;
        this.y = a.y + c.y;
        return this
    },
    addSelf: function(a) {
        this.x += a.x;
        this.y += a.y;
        return this
    },
    sub: function(a, c) {
        this.x = a.x - c.x;
        this.y = a.y - c.y;
        return this
    },
    subSelf: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        return this
    },
    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a) : this.set(0, 0);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var c = this.x - a.x,
            a = this.y - a.y;
        return c * c + a * a
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y
    }
};
THREE_M.Vector3 = function(a, c, b) {
    this.x = a || 0;
    this.y = c || 0;
    this.z = b || 0
};
THREE_M.Vector3.prototype = {
    constructor: THREE_M.Vector3,
    set: function(a, c, b) {
        this.x = a;
        this.y = c;
        this.z = b;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },
    clone: function() {
        return new THREE_M.Vector3(this.x, this.y, this.z)
    },
    add: function(a, c) {
        this.x = a.x + c.x;
        this.y = a.y + c.y;
        this.z = a.z + c.z;
        return this
    },
    addSelf: function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    },
    sub: function(a, c) {
        this.x = a.x - c.x;
        this.y = a.y - c.y;
        this.z = a.z - c.z;
        return this
    },
    subSelf: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },
    multiply: function(a, c) {
        this.x = a.x * c.x;
        this.y = a.y * c.y;
        this.z = a.z * c.z;
        return this
    },
    multiplySelf: function(a) {
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this
    },
    divideSelf: function(a) {
        this.x /= a.x;
        this.y /= a.y;
        this.z /= a.z;
        return this
    },
    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthManhattan: function() {
        return this.x + this.y + this.z
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    cross: function(a, c) {
        this.x = a.y * c.z - a.z * c.y;
        this.y = a.z * c.x - a.x * c.z;
        this.z = a.x * c.y - a.y * c.x;
        return this
    },
    crossSelf: function(a) {
        var c = this.x,
            b = this.y,
            d = this.z;
        this.x = b * a.z - d * a.y;
        this.y = d * a.x - c * a.z;
        this.z = c * a.y - b * a.x;
        return this
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        return (new THREE_M.Vector3).sub(this, a).lengthSq()
    },
    setPositionFromMatrix: function(a) {
        this.x = a.n14;
        this.y = a.n24;
        this.z = a.n34
    },
    setRotationFromMatrix: function(a) {
        var c = Math.cos(this.y);
        this.y = Math.asin(a.n13);
        Math.abs(c) > 1.0E-5 ? (this.x = Math.atan2(-a.n23 / c, a.n33 / c), this.z = Math.atan2(-a.n12 / c, a.n11 / c)) : (this.x = 0, this.z = Math.atan2(a.n21, a.n22))
    },
    isZero: function() {
        return this.lengthSq() < 1.0E-4
    }
};
THREE_M.Vector4 = function(a, c, b, d) {
    this.x = a || 0;
    this.y = c || 0;
    this.z = b || 0;
    this.w = d !== void 0 ? d : 1
};
THREE_M.Vector4.prototype = {
    constructor: THREE_M.Vector4,
    set: function(a, c, b, d) {
        this.x = a;
        this.y = c;
        this.z = b;
        this.w = d;
        return this
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w !== void 0 ? a.w : 1
    },
    clone: function() {
        return new THREE_M.Vector4(this.x, this.y, this.z, this.w)
    },
    add: function(a, c) {
        this.x = a.x + c.x;
        this.y = a.y + c.y;
        this.z = a.z + c.z;
        this.w = a.w + c.w;
        return this
    },
    addSelf: function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
    },
    sub: function(a, c) {
        this.x = a.x - c.x;
        this.y = a.y - c.y;
        this.z = a.z -
            c.z;
        this.w = a.w - c.w;
        return this
    },
    subSelf: function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        this.w -= a.w;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        this.w *= a;
        return this
    },
    divideScalar: function(a) {
        a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function() {
        return this.dot(this)
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    lerpSelf: function(a, c) {
        this.x += (a.x - this.x) * c;
        this.y += (a.y - this.y) * c;
        this.z += (a.z - this.z) * c;
        this.w += (a.w - this.w) * c;
        return this
    }
};
THREE_M.Ray = function(a, c) {
    function b(a, b, c) {
        o.sub(c, a);
        r = o.dot(b);
        if (r <= 0) return null;
        n = p.add(a, m.copy(b).multiplyScalar(r));
        return q = c.distanceTo(n)
    }

    function d(a, b, c, d) {
        o.sub(d, b);
        p.sub(c, b);
        m.sub(a, b);
        t = o.dot(o);
        w = o.dot(p);
        u = o.dot(m);
        B = p.dot(p);
        F = p.dot(m);
        A = 1 / (t * B - w * w);
        x = (B * u - w * F) * A;
        y = (t * F - w * u) * A;
        return x >= 0 && y >= 0 && x + y < 1
    }
    this.origin = a || new THREE_M.Vector3;
    this.direction = c || new THREE_M.Vector3;
    this.intersectScene = function(a) {
        return this.intersectObjects(a.children)
    };
    this.intersectObjects = function(a) {
        var b,
            c, d = [];
        b = 0;
        for (c = a.length; b < c; b++) Array.prototype.push.apply(d, this.intersectObject(a[b]));
        d.sort(function(a, b) {
            return a.distance - b.distance
        });
        return d
    };
    var g = new THREE_M.Vector3,
        f = new THREE_M.Vector3,
        e = new THREE_M.Vector3,
        h = new THREE_M.Vector3,
        a = new THREE_M.Vector3,
        c = new THREE_M.Vector3,
        i = new THREE_M.Vector3,
        l = new THREE_M.Vector3,
        k = new THREE_M.Vector3;
    this.intersectObject = function(m) {
        for (var n, o = [], p = 0, r = m.children.length; p < r; p++) Array.prototype.push.apply(o, this.intersectObject(m.children[p]));
        if (m instanceof THREE_M.Particle) {
            p =
                b(this.origin, this.direction, m.matrixWorld.getPosition());
            if (p === null || p > m.scale.x) return [];
            n = {
                distance: p,
                point: m.position,
                face: null,
                object: m
            };
            o.push(n)
        } else if (m instanceof THREE_M.Mesh) {
            p = b(this.origin, this.direction, m.matrixWorld.getPosition());
            if (p === null || p > m.geometry.boundingSphere.radius * Math.max(m.scale.x, Math.max(m.scale.y, m.scale.z))) return o;
            var q, t = m.geometry,
                w = t.vertices,
                u;
            m.matrixRotationWorld.extractRotation(m.matrixWorld);
            p = 0;
            for (r = t.faces.length; p < r; p++)
                if (n = t.faces[p], a.copy(this.origin),
                    c.copy(this.direction), u = m.matrixWorld, i = u.multiplyVector3(i.copy(n.centroid)).subSelf(a), q = i.dot(c), !(q <= 0) && (g = u.multiplyVector3(g.copy(w[n.a].position)), f = u.multiplyVector3(f.copy(w[n.b].position)), e = u.multiplyVector3(e.copy(w[n.c].position)), n instanceof THREE_M.Face4 && (h = u.multiplyVector3(h.copy(w[n.d].position))), l = m.matrixRotationWorld.multiplyVector3(l.copy(n.normal)), q = c.dot(l), m.doubleSided || (m.flipSided ? q > 0 : q < 0)))
                    if (q = l.dot(i.sub(g, a)) / q, k.add(a, c.multiplyScalar(q)), n instanceof THREE_M.Face3) d(k,
                        g, f, e) && (n = {
                        distance: a.distanceTo(k),
                        point: k.clone(),
                        face: n,
                        object: m
                    }, o.push(n));
                    else if (n instanceof THREE_M.Face4 && (d(k, g, f, h) || d(k, f, e, h))) n = {
                distance: a.distanceTo(k),
                point: k.clone(),
                face: n,
                object: m
            }, o.push(n)
        }
        return o
    };
    var o = new THREE_M.Vector3,
        p = new THREE_M.Vector3,
        m = new THREE_M.Vector3,
        r, n, q, t, w, u, B, F, A, x, y
};
THREE_M.Rectangle = function() {
    function a() {
        f = d - c;
        e = g - b
    }
    var c, b, d, g, f, e, h = !0;
    this.getX = function() {
        return c
    };
    this.getY = function() {
        return b
    };
    this.getWidth = function() {
        return f
    };
    this.getHeight = function() {
        return e
    };
    this.getLeft = function() {
        return c
    };
    this.getTop = function() {
        return b
    };
    this.getRight = function() {
        return d
    };
    this.getBottom = function() {
        return g
    };
    this.set = function(f, e, k, o) {
        h = !1;
        c = f;
        b = e;
        d = k;
        g = o;
        a()
    };
    this.addPoint = function(f, e) {
        h ? (h = !1, c = f, b = e, d = f, g = e) : (c = c < f ? c : f, b = b < e ? b : e, d = d > f ? d : f, g = g > e ? g : e);
        a()
    };
    this.add3Points =
        function(f, e, k, o, p, m) {
            h ? (h = !1, c = f < k ? f < p ? f : p : k < p ? k : p, b = e < o ? e < m ? e : m : o < m ? o : m, d = f > k ? f > p ? f : p : k > p ? k : p, g = e > o ? e > m ? e : m : o > m ? o : m) : (c = f < k ? f < p ? f < c ? f : c : p < c ? p : c : k < p ? k < c ? k : c : p < c ? p : c, b = e < o ? e < m ? e < b ? e : b : m < b ? m : b : o < m ? o < b ? o : b : m < b ? m : b, d = f > k ? f > p ? f > d ? f : d : p > d ? p : d : k > p ? k > d ? k : d : p > d ? p : d, g = e > o ? e > m ? e > g ? e : g : m > g ? m : g : o > m ? o > g ? o : g : m > g ? m : g);
            a()
        };
    this.addRectangle = function(f) {
        h ? (h = !1, c = f.getLeft(), b = f.getTop(), d = f.getRight(), g = f.getBottom()) : (c = c < f.getLeft() ? c : f.getLeft(), b = b < f.getTop() ? b : f.getTop(), d = d > f.getRight() ? d : f.getRight(), g = g >
            f.getBottom() ? g : f.getBottom());
        a()
    };
    this.inflate = function(f) {
        c -= f;
        b -= f;
        d += f;
        g += f;
        a()
    };
    this.minSelf = function(f) {
        c = c > f.getLeft() ? c : f.getLeft();
        b = b > f.getTop() ? b : f.getTop();
        d = d < f.getRight() ? d : f.getRight();
        g = g < f.getBottom() ? g : f.getBottom();
        a()
    };
    this.intersects = function(a) {
        return Math.min(d, a.getRight()) - Math.max(c, a.getLeft()) >= 0 && Math.min(g, a.getBottom()) - Math.max(b, a.getTop()) >= 0
    };
    this.empty = function() {
        h = !0;
        g = d = b = c = 0;
        a()
    };
    this.isEmpty = function() {
        return h
    }
};
THREE_M.Math = {
    clamp: function(a, c, b) {
        return a < c ? c : a > b ? b : a
    },
    clampBottom: function(a, c) {
        return a < c ? c : a
    },
    mapLinear: function(a, c, b, d, g) {
        return d + (a - c) * (g - d) / (b - c)
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    }
};
THREE_M.Matrix3 = function() {
    this.m = []
};
THREE_M.Matrix3.prototype = {
    constructor: THREE_M.Matrix3,
    transpose: function() {
        var a, c = this.m;
        a = c[1];
        c[1] = c[3];
        c[3] = a;
        a = c[2];
        c[2] = c[6];
        c[6] = a;
        a = c[5];
        c[5] = c[7];
        c[7] = a;
        return this
    },
    transposeIntoArray: function(a) {
        var c = this.m;
        a[0] = c[0];
        a[1] = c[3];
        a[2] = c[6];
        a[3] = c[1];
        a[4] = c[4];
        a[5] = c[7];
        a[6] = c[2];
        a[7] = c[5];
        a[8] = c[8];
        return this
    }
};
THREE_M.Matrix4 = function(a, c, b, d, g, f, e, h, i, l, k, o, p, m, r, n) {
    this.set(a !== void 0 ? a : 1, c || 0, b || 0, d || 0, g || 0, f !== void 0 ? f : 1, e || 0, h || 0, i || 0, l || 0, k !== void 0 ? k : 1, o || 0, p || 0, m || 0, r || 0, n !== void 0 ? n : 1);
    this.flat = Array(16);
    this.m33 = new THREE_M.Matrix3
};
THREE_M.Matrix4.prototype = {
    constructor: THREE_M.Matrix4,
    set: function(a, c, b, d, g, f, e, h, i, l, k, o, p, m, r, n) {
        this.n11 = a;
        this.n12 = c;
        this.n13 = b;
        this.n14 = d;
        this.n21 = g;
        this.n22 = f;
        this.n23 = e;
        this.n24 = h;
        this.n31 = i;
        this.n32 = l;
        this.n33 = k;
        this.n34 = o;
        this.n41 = p;
        this.n42 = m;
        this.n43 = r;
        this.n44 = n;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function(a) {
        this.set(a.n11, a.n12, a.n13, a.n14, a.n21, a.n22, a.n23, a.n24, a.n31, a.n32, a.n33, a.n34, a.n41, a.n42, a.n43, a.n44);
        return this
    },
    lookAt: function(a,
        c, b) {
        var d = THREE_M.Matrix4.__v1,
            g = THREE_M.Matrix4.__v2,
            f = THREE_M.Matrix4.__v3;
        f.sub(a, c).normalize();
        if (f.length() === 0) f.z = 1;
        d.cross(b, f).normalize();
        d.length() === 0 && (f.x += 1.0E-4, d.cross(b, f).normalize());
        g.cross(f, d).normalize();
        this.n11 = d.x;
        this.n12 = g.x;
        this.n13 = f.x;
        this.n21 = d.y;
        this.n22 = g.y;
        this.n23 = f.y;
        this.n31 = d.z;
        this.n32 = g.z;
        this.n33 = f.z;
        return this
    },
    multiply: function(a, c) {
        var b = a.n11,
            d = a.n12,
            g = a.n13,
            f = a.n14,
            e = a.n21,
            h = a.n22,
            i = a.n23,
            l = a.n24,
            k = a.n31,
            o = a.n32,
            p = a.n33,
            m = a.n34,
            r = a.n41,
            n = a.n42,
            q = a.n43,
            t = a.n44,
            w = c.n11,
            u = c.n12,
            B = c.n13,
            F = c.n14,
            A = c.n21,
            x = c.n22,
            y = c.n23,
            v = c.n24,
            J = c.n31,
            s = c.n32,
            E = c.n33,
            R = c.n34,
            U = c.n41,
            K = c.n42,
            P = c.n43,
            O = c.n44;
        this.n11 = b * w + d * A + g * J + f * U;
        this.n12 = b * u + d * x + g * s + f * K;
        this.n13 = b * B + d * y + g * E + f * P;
        this.n14 = b * F + d * v + g * R + f * O;
        this.n21 = e * w + h * A + i * J + l * U;
        this.n22 = e * u + h * x + i * s + l * K;
        this.n23 = e * B + h * y + i * E + l * P;
        this.n24 = e * F + h * v + i * R + l * O;
        this.n31 = k * w + o * A + p * J + m * U;
        this.n32 = k * u + o * x + p * s + m * K;
        this.n33 = k * B + o * y + p * E + m * P;
        this.n34 = k * F + o * v + p * R + m * O;
        this.n41 = r * w + n * A + q * J + t * U;
        this.n42 = r * u + n * x + q * s + t * K;
        this.n43 = r * B + n *
            y + q * E + t * P;
        this.n44 = r * F + n * v + q * R + t * O;
        return this
    },
    multiplySelf: function(a) {
        return this.multiply(this, a)
    },
    multiplyToArray: function(a, c, b) {
        this.multiply(a, c);
        b[0] = this.n11;
        b[1] = this.n21;
        b[2] = this.n31;
        b[3] = this.n41;
        b[4] = this.n12;
        b[5] = this.n22;
        b[6] = this.n32;
        b[7] = this.n42;
        b[8] = this.n13;
        b[9] = this.n23;
        b[10] = this.n33;
        b[11] = this.n43;
        b[12] = this.n14;
        b[13] = this.n24;
        b[14] = this.n34;
        b[15] = this.n44;
        return this
    },
    multiplyScalar: function(a) {
        this.n11 *= a;
        this.n12 *= a;
        this.n13 *= a;
        this.n14 *= a;
        this.n21 *= a;
        this.n22 *= a;
        this.n23 *=
            a;
        this.n24 *= a;
        this.n31 *= a;
        this.n32 *= a;
        this.n33 *= a;
        this.n34 *= a;
        this.n41 *= a;
        this.n42 *= a;
        this.n43 *= a;
        this.n44 *= a;
        return this
    },
    multiplyVector3: function(a) {
        var c = a.x,
            b = a.y,
            d = a.z,
            g = 1 / (this.n41 * c + this.n42 * b + this.n43 * d + this.n44);
        a.x = (this.n11 * c + this.n12 * b + this.n13 * d + this.n14) * g;
        a.y = (this.n21 * c + this.n22 * b + this.n23 * d + this.n24) * g;
        a.z = (this.n31 * c + this.n32 * b + this.n33 * d + this.n34) * g;
        return a
    },
    multiplyVector4: function(a) {
        var c = a.x,
            b = a.y,
            d = a.z,
            g = a.w;
        a.x = this.n11 * c + this.n12 * b + this.n13 * d + this.n14 * g;
        a.y = this.n21 * c + this.n22 *
            b + this.n23 * d + this.n24 * g;
        a.z = this.n31 * c + this.n32 * b + this.n33 * d + this.n34 * g;
        a.w = this.n41 * c + this.n42 * b + this.n43 * d + this.n44 * g;
        return a
    },
    rotateAxis: function(a) {
        var c = a.x,
            b = a.y,
            d = a.z;
        a.x = c * this.n11 + b * this.n12 + d * this.n13;
        a.y = c * this.n21 + b * this.n22 + d * this.n23;
        a.z = c * this.n31 + b * this.n32 + d * this.n33;
        a.normalize();
        return a
    },
    crossVector: function(a) {
        var c = new THREE_M.Vector4;
        c.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
        c.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
        c.z = this.n31 * a.x + this.n32 * a.y + this.n33 *
            a.z + this.n34 * a.w;
        c.w = a.w ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1;
        return c
    },
    determinant: function() {
        var a = this.n11,
            c = this.n12,
            b = this.n13,
            d = this.n14,
            g = this.n21,
            f = this.n22,
            e = this.n23,
            h = this.n24,
            i = this.n31,
            l = this.n32,
            k = this.n33,
            o = this.n34,
            p = this.n41,
            m = this.n42,
            r = this.n43,
            n = this.n44;
        return d * e * l * p - b * h * l * p - d * f * k * p + c * h * k * p + b * f * o * p - c * e * o * p - d * e * i * m + b * h * i * m + d * g * k * m - a * h * k * m - b * g * o * m + a * e * o * m + d * f * i * r - c * h * i * r - d * g * l * r + a * h * l * r + c * g * o * r - a * f * o * r - b * f * i * n + c * e * i * n + b * g * l * n - a * e * l * n - c * g * k * n + a * f * k * n
    },
    transpose: function() {
        var a;
        a = this.n21;
        this.n21 = this.n12;
        this.n12 = a;
        a = this.n31;
        this.n31 = this.n13;
        this.n13 = a;
        a = this.n32;
        this.n32 = this.n23;
        this.n23 = a;
        a = this.n41;
        this.n41 = this.n14;
        this.n14 = a;
        a = this.n42;
        this.n42 = this.n24;
        this.n24 = a;
        a = this.n43;
        this.n43 = this.n34;
        this.n43 = a;
        return this
    },
    clone: function() {
        var a = new THREE_M.Matrix4;
        a.n11 = this.n11;
        a.n12 = this.n12;
        a.n13 = this.n13;
        a.n14 = this.n14;
        a.n21 = this.n21;
        a.n22 = this.n22;
        a.n23 = this.n23;
        a.n24 = this.n24;
        a.n31 = this.n31;
        a.n32 = this.n32;
        a.n33 = this.n33;
        a.n34 = this.n34;
        a.n41 = this.n41;
        a.n42 = this.n42;
        a.n43 = this.n43;
        a.n44 = this.n44;
        return a
    },
    flatten: function() {
        this.flat[0] = this.n11;
        this.flat[1] = this.n21;
        this.flat[2] = this.n31;
        this.flat[3] = this.n41;
        this.flat[4] = this.n12;
        this.flat[5] = this.n22;
        this.flat[6] = this.n32;
        this.flat[7] = this.n42;
        this.flat[8] = this.n13;
        this.flat[9] = this.n23;
        this.flat[10] = this.n33;
        this.flat[11] = this.n43;
        this.flat[12] = this.n14;
        this.flat[13] = this.n24;
        this.flat[14] = this.n34;
        this.flat[15] = this.n44;
        return this.flat
    },
    flattenToArray: function(a) {
        a[0] = this.n11;
        a[1] = this.n21;
        a[2] = this.n31;
        a[3] = this.n41;
        a[4] = this.n12;
        a[5] = this.n22;
        a[6] = this.n32;
        a[7] = this.n42;
        a[8] = this.n13;
        a[9] = this.n23;
        a[10] = this.n33;
        a[11] = this.n43;
        a[12] = this.n14;
        a[13] = this.n24;
        a[14] = this.n34;
        a[15] = this.n44;
        return a
    },
    flattenToArrayOffset: function(a, c) {
        a[c] = this.n11;
        a[c + 1] = this.n21;
        a[c + 2] = this.n31;
        a[c + 3] = this.n41;
        a[c + 4] = this.n12;
        a[c + 5] = this.n22;
        a[c + 6] = this.n32;
        a[c + 7] = this.n42;
        a[c + 8] = this.n13;
        a[c + 9] = this.n23;
        a[c + 10] = this.n33;
        a[c + 11] = this.n43;
        a[c + 12] = this.n14;
        a[c + 13] = this.n24;
        a[c + 14] = this.n34;
        a[c + 15] = this.n44;
        return a
    },
    setTranslation: function(a, c, b) {
        this.set(1, 0, 0, a, 0, 1, 0, c, 0, 0, 1, b, 0, 0, 0, 1);
        return this
    },
    setScale: function(a, c, b) {
        this.set(a, 0, 0, 0, 0, c, 0, 0, 0, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    setRotationX: function(a) {
        var c = Math.cos(a),
            a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, c, -a, 0, 0, a, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationY: function(a) {
        var c = Math.cos(a),
            a = Math.sin(a);
        this.set(c, 0, a, 0, 0, 1, 0, 0, -a, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationZ: function(a) {
        var c = Math.cos(a),
            a = Math.sin(a);
        this.set(c, -a, 0, 0, a, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    setRotationAxis: function(a, c) {
        var b = Math.cos(c),
            d = Math.sin(c),
            g = 1 - b,
            f = a.x,
            e = a.y,
            h = a.z,
            i = g * f,
            l = g * e;
        this.set(i * f + b, i * e - d * h, i * h + d * e, 0, i * e + d * h, l * e + b, l * h - d * f, 0, i * h - d * e, l * h + d * f, g * h * h + b, 0, 0, 0, 0, 1);
        return this
    },
    setPosition: function(a) {
        this.n14 = a.x;
        this.n24 = a.y;
        this.n34 = a.z;
        return this
    },
    getPosition: function() {
        return THREE_M.Matrix4.__v1.set(this.n14, this.n24, this.n34)
    },
    getColumnX: function() {
        return THREE_M.Matrix4.__v1.set(this.n11, this.n21, this.n31)
    },
    getColumnY: function() {
        return THREE_M.Matrix4.__v1.set(this.n12,
            this.n22, this.n32)
    },
    getColumnZ: function() {
        return THREE_M.Matrix4.__v1.set(this.n13, this.n23, this.n33)
    },
    getInverse: function(a) {
        var c = a.n11,
            b = a.n12,
            d = a.n13,
            g = a.n14,
            f = a.n21,
            e = a.n22,
            h = a.n23,
            i = a.n24,
            l = a.n31,
            k = a.n32,
            o = a.n33,
            p = a.n34,
            m = a.n41,
            r = a.n42,
            n = a.n43,
            q = a.n44;
        this.n11 = h * p * r - i * o * r + i * k * n - e * p * n - h * k * q + e * o * q;
        this.n12 = g * o * r - d * p * r - g * k * n + b * p * n + d * k * q - b * o * q;
        this.n13 = d * i * r - g * h * r + g * e * n - b * i * n - d * e * q + b * h * q;
        this.n14 = g * h * k - d * i * k - g * e * o + b * i * o + d * e * p - b * h * p;
        this.n21 = i * o * m - h * p * m - i * l * n + f * p * n + h * l * q - f * o * q;
        this.n22 = d * p * m - g * o * m +
            g * l * n - c * p * n - d * l * q + c * o * q;
        this.n23 = g * h * m - d * i * m - g * f * n + c * i * n + d * f * q - c * h * q;
        this.n24 = d * i * l - g * h * l + g * f * o - c * i * o - d * f * p + c * h * p;
        this.n31 = e * p * m - i * k * m + i * l * r - f * p * r - e * l * q + f * k * q;
        this.n32 = g * k * m - b * p * m - g * l * r + c * p * r + b * l * q - c * k * q;
        this.n33 = d * i * m - g * e * m + g * f * r - c * i * r - b * f * q + c * e * q;
        this.n34 = g * e * l - b * i * l - g * f * k + c * i * k + b * f * p - c * e * p;
        this.n41 = h * k * m - e * o * m - h * l * r + f * o * r + e * l * n - f * k * n;
        this.n42 = b * o * m - d * k * m + d * l * r - c * o * r - b * l * n + c * k * n;
        this.n43 = d * e * m - b * h * m - d * f * r + c * h * r + b * f * n - c * e * n;
        this.n44 = b * h * l - d * e * l + d * f * k - c * h * k - b * f * o + c * e * o;
        this.multiplyScalar(1 / a.determinant());
        return this
    },
    setRotationFromEuler: function(a, c) {
        var b = a.x,
            d = a.y,
            g = a.z,
            f = Math.cos(b),
            b = Math.sin(b),
            e = Math.cos(d),
            d = Math.sin(d),
            h = Math.cos(g),
            g = Math.sin(g);
        switch (c) {
            case "YXZ":
                var i = e * h,
                    l = e * g,
                    k = d * h,
                    o = d * g;
                this.n11 = i + o * b;
                this.n12 = k * b - l;
                this.n13 = f * d;
                this.n21 = f * g;
                this.n22 = f * h;
                this.n23 = -b;
                this.n31 = l * b - k;
                this.n32 = o + i * b;
                this.n33 = f * e;
                break;
            case "ZXY":
                i = e * h;
                l = e * g;
                k = d * h;
                o = d * g;
                this.n11 = i - o * b;
                this.n12 = -f * g;
                this.n13 = k + l * b;
                this.n21 = l + k * b;
                this.n22 = f * h;
                this.n23 = o - i * b;
                this.n31 = -f * d;
                this.n32 = b;
                this.n33 = f * e;
                break;
            case "ZYX":
                i =
                    f * h;
                l = f * g;
                k = b * h;
                o = b * g;
                this.n11 = e * h;
                this.n12 = k * d - l;
                this.n13 = i * d + o;
                this.n21 = e * g;
                this.n22 = o * d + i;
                this.n23 = l * d - k;
                this.n31 = -d;
                this.n32 = b * e;
                this.n33 = f * e;
                break;
            case "YZX":
                i = f * e;
                l = f * d;
                k = b * e;
                o = b * d;
                this.n11 = e * h;
                this.n12 = o - i * g;
                this.n13 = k * g + l;
                this.n21 = g;
                this.n22 = f * h;
                this.n23 = -b * h;
                this.n31 = -d * h;
                this.n32 = l * g + k;
                this.n33 = i - o * g;
                break;
            case "XZY":
                i = f * e;
                l = f * d;
                k = b * e;
                o = b * d;
                this.n11 = e * h;
                this.n12 = -g;
                this.n13 = d * h;
                this.n21 = i * g + o;
                this.n22 = f * h;
                this.n23 = l * g - k;
                this.n31 = k * g - l;
                this.n32 = b * h;
                this.n33 = o * g + i;
                break;
            default:
                i = f * h, l = f *
                    g, k = b * h, o = b * g, this.n11 = e * h, this.n12 = -e * g, this.n13 = d, this.n21 = l + k * d, this.n22 = i - o * d, this.n23 = -b * e, this.n31 = o - i * d, this.n32 = k + l * d, this.n33 = f * e
        }
        return this
    },
    setRotationFromQuaternion: function(a) {
        var c = a.x,
            b = a.y,
            d = a.z,
            g = a.w,
            f = c + c,
            e = b + b,
            h = d + d,
            a = c * f,
            i = c * e;
        c *= h;
        var l = b * e;
        b *= h;
        d *= h;
        f *= g;
        e *= g;
        g *= h;
        this.n11 = 1 - (l + d);
        this.n12 = i - g;
        this.n13 = c + e;
        this.n21 = i + g;
        this.n22 = 1 - (a + d);
        this.n23 = b - f;
        this.n31 = c - e;
        this.n32 = b + f;
        this.n33 = 1 - (a + l);
        return this
    },
    scale: function(a) {
        var c = a.x,
            b = a.y,
            a = a.z;
        this.n11 *= c;
        this.n12 *= b;
        this.n13 *=
            a;
        this.n21 *= c;
        this.n22 *= b;
        this.n23 *= a;
        this.n31 *= c;
        this.n32 *= b;
        this.n33 *= a;
        this.n41 *= c;
        this.n42 *= b;
        this.n43 *= a;
        return this
    },
    compose: function(a, c, b) {
        var d = THREE_M.Matrix4.__m1,
            g = THREE_M.Matrix4.__m2;
        d.identity();
        d.setRotationFromQuaternion(c);
        g.setScale(b.x, b.y, b.z);
        this.multiply(d, g);
        this.n14 = a.x;
        this.n24 = a.y;
        this.n34 = a.z;
        return this
    },
    decompose: function(a, c, b) {
        var d = THREE_M.Matrix4.__v1,
            g = THREE_M.Matrix4.__v2,
            f = THREE_M.Matrix4.__v3;
        d.set(this.n11, this.n21, this.n31);
        g.set(this.n12, this.n22, this.n32);
        f.set(this.n13,
            this.n23, this.n33);
        a = a instanceof THREE_M.Vector3 ? a : new THREE_M.Vector3;
        c = c instanceof THREE_M.Quaternion ? c : new THREE_M.Quaternion;
        b = b instanceof THREE_M.Vector3 ? b : new THREE_M.Vector3;
        b.x = d.length();
        b.y = g.length();
        b.z = f.length();
        a.x = this.n14;
        a.y = this.n24;
        a.z = this.n34;
        d = THREE_M.Matrix4.__m1;
        d.copy(this);
        d.n11 /= b.x;
        d.n21 /= b.x;
        d.n31 /= b.x;
        d.n12 /= b.y;
        d.n22 /= b.y;
        d.n32 /= b.y;
        d.n13 /= b.z;
        d.n23 /= b.z;
        d.n33 /= b.z;
        c.setFromRotationMatrix(d);
        return [a, c, b]
    },
    extractPosition: function(a) {
        this.n14 = a.n14;
        this.n24 = a.n24;
        this.n34 = a.n34;
        return this
    },
    extractRotation: function(a) {
        var c = THREE_M.Matrix4.__v1,
            b = 1 / c.set(a.n11, a.n21, a.n31).length(),
            d = 1 / c.set(a.n12, a.n22, a.n32).length(),
            c = 1 / c.set(a.n13, a.n23, a.n33).length();
        this.n11 = a.n11 * b;
        this.n21 = a.n21 * b;
        this.n31 = a.n31 * b;
        this.n12 = a.n12 * d;
        this.n22 = a.n22 * d;
        this.n32 = a.n32 * d;
        this.n13 = a.n13 * c;
        this.n23 = a.n23 * c;
        this.n33 = a.n33 * c;
        return this
    }
};
THREE_M.Matrix4.makeInvert3x3 = function(a) {
    var c = a.m33,
        b = c.m,
        d = a.n33 * a.n22 - a.n32 * a.n23,
        g = -a.n33 * a.n21 + a.n31 * a.n23,
        f = a.n32 * a.n21 - a.n31 * a.n22,
        e = -a.n33 * a.n12 + a.n32 * a.n13,
        h = a.n33 * a.n11 - a.n31 * a.n13,
        i = -a.n32 * a.n11 + a.n31 * a.n12,
        l = a.n23 * a.n12 - a.n22 * a.n13,
        k = -a.n23 * a.n11 + a.n21 * a.n13,
        o = a.n22 * a.n11 - a.n21 * a.n12,
        a = a.n11 * d + a.n21 * e + a.n31 * l;
    a === 0 && console.error("THREE_M.Matrix4.makeInvert3x3: Matrix not invertible.");
    a = 1 / a;
    b[0] = a * d;
    b[1] = a * g;
    b[2] = a * f;
    b[3] = a * e;
    b[4] = a * h;
    b[5] = a * i;
    b[6] = a * l;
    b[7] = a * k;
    b[8] = a * o;
    return c
};
THREE_M.Matrix4.makeFrustum = function(a, c, b, d, g, f) {
    var e;
    e = new THREE_M.Matrix4;
    e.n11 = 2 * g / (c - a);
    e.n12 = 0;
    e.n13 = (c + a) / (c - a);
    e.n14 = 0;
    e.n21 = 0;
    e.n22 = 2 * g / (d - b);
    e.n23 = (d + b) / (d - b);
    e.n24 = 0;
    e.n31 = 0;
    e.n32 = 0;
    e.n33 = -(f + g) / (f - g);
    e.n34 = -2 * f * g / (f - g);
    e.n41 = 0;
    e.n42 = 0;
    e.n43 = -1;
    e.n44 = 0;
    return e
};
THREE_M.Matrix4.makePerspective = function(a, c, b, d) {
    var g, a = b * Math.tan(a * Math.PI / 360);
    g = -a;
    return THREE_M.Matrix4.makeFrustum(g * c, a * c, g, a, b, d)
};
THREE_M.Matrix4.makeOrtho = function(a, c, b, d, g, f) {
    var e, h, i, l;
    e = new THREE_M.Matrix4;
    h = c - a;
    i = b - d;
    l = f - g;
    e.n11 = 2 / h;
    e.n12 = 0;
    e.n13 = 0;
    e.n14 = -((c + a) / h);
    e.n21 = 0;
    e.n22 = 2 / i;
    e.n23 = 0;
    e.n24 = -((b + d) / i);
    e.n31 = 0;
    e.n32 = 0;
    e.n33 = -2 / l;
    e.n34 = -((f + g) / l);
    e.n41 = 0;
    e.n42 = 0;
    e.n43 = 0;
    e.n44 = 1;
    return e
};
THREE_M.Matrix4.__v1 = new THREE_M.Vector3;
THREE_M.Matrix4.__v2 = new THREE_M.Vector3;
THREE_M.Matrix4.__v3 = new THREE_M.Vector3;
THREE_M.Matrix4.__m1 = new THREE_M.Matrix4;
THREE_M.Matrix4.__m2 = new THREE_M.Matrix4;
THREE_M.Object3D = function() {
    this.name = "";
    this.id = THREE_M.Object3DCount++;
    this.parent = void 0;
    this.children = [];
    this.up = new THREE_M.Vector3(0, 1, 0);
    this.position = new THREE_M.Vector3;
    this.rotation = new THREE_M.Vector3;
    this.eulerOrder = "XYZ";
    this.scale = new THREE_M.Vector3(1, 1, 1);
    this.flipSided = this.doubleSided = this.dynamic = !1;
    this.renderDepth = null;
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE_M.Matrix4;
    this.matrixWorld = new THREE_M.Matrix4;
    this.matrixRotationWorld = new THREE_M.Matrix4;
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
    this.quaternion = new THREE_M.Quaternion;
    this.useQuaternion = !1;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this._vector = new THREE_M.Vector3
};
THREE_M.Object3D.prototype = {
    constructor: THREE_M.Object3D,
    translate: function(a, c) {
        this.matrix.rotateAxis(c);
        this.position.addSelf(c.multiplyScalar(a))
    },
    translateX: function(a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function(a) {
        this.translate(a, this._vector.set(0, 1, 0))
    },
    translateZ: function(a) {
        this.translate(a, this._vector.set(0, 0, 1))
    },
    lookAt: function(a) {
        this.matrix.lookAt(a, this.position, this.up);
        this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
    },
    add: function(a) {
        if (this.children.indexOf(a) ===
            -1) {
            a.parent !== void 0 && a.parent.remove(a);
            a.parent = this;
            this.children.push(a);
            for (var c = this; c.parent !== void 0;) c = c.parent;
            c !== void 0 && c instanceof THREE_M.Scene && c.addObject(a)
        }
    },
    remove: function(a) {
        var c = this.children.indexOf(a);
        if (c !== -1) {
            a.parent = void 0;
            this.children.splice(c, 1);
            for (c = this; c.parent !== void 0;) c = c.parent;
            c !== void 0 && c instanceof THREE_M.Scene && c.removeObject(a)
        }
    },
    getChildByName: function(a, c) {
        var b, d, g;
        b = 0;
        for (d = this.children.length; b < d; b++) {
            g = this.children[b];
            if (g.name === a) return g;
            if (c && (g = g.getChildByName(a, c), g !== void 0)) return g
        }
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z));
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(a) {
        this.matrixAutoUpdate &&
            this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
        for (var c = 0, b = this.children.length; c < b; c++) this.children[c].updateMatrixWorld(a)
    }
};
THREE_M.Object3DCount = 0;
THREE_M.Projector = function() {
    function a() {
        var a = e[f] = e[f] || new THREE_M.RenderableObject;
        f++;
        return a
    }

    function c() {
        var a = l[i] = l[i] || new THREE_M.RenderableVertex;
        i++;
        return a
    }

    function b(a, b) {
        return b.z - a.z
    }

    function d(a, b) {
        var c = 0,
            d = 1,
            g = a.z + a.w,
            f = b.z + b.w,
            e = -a.z + a.w,
            h = -b.z + b.w;
        return g >= 0 && f >= 0 && e >= 0 && h >= 0 ? !0 : g < 0 && f < 0 || e < 0 && h < 0 ? !1 : (g < 0 ? c = Math.max(c, g / (g - f)) : f < 0 && (d = Math.min(d, g / (g - f))), e < 0 ? c = Math.max(c, e / (e - h)) : h < 0 && (d = Math.min(d, e / (e - h))), d < c ? !1 : (a.lerpSelf(b, c), b.lerpSelf(a, 1 - d), !0))
    }
    var g, f, e = [],
        h, i, l = [],
        k, o, p = [],
        m, r = [],
        n, q, t = [],
        w, u, B = [],
        F = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        },
        A = new THREE_M.Vector3,
        x = new THREE_M.Vector4,
        y = new THREE_M.Matrix4,
        v = new THREE_M.Matrix4,
        J = [new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4],
        s = new THREE_M.Vector4,
        E = new THREE_M.Vector4;
    this.computeFrustum = function(a) {
        J[0].set(a.n41 - a.n11, a.n42 - a.n12, a.n43 - a.n13, a.n44 - a.n14);
        J[1].set(a.n41 + a.n11, a.n42 + a.n12, a.n43 + a.n13, a.n44 + a.n14);
        J[2].set(a.n41 + a.n21, a.n42 + a.n22, a.n43 +
            a.n23, a.n44 + a.n24);
        J[3].set(a.n41 - a.n21, a.n42 - a.n22, a.n43 - a.n23, a.n44 - a.n24);
        J[4].set(a.n41 - a.n31, a.n42 - a.n32, a.n43 - a.n33, a.n44 - a.n34);
        J[5].set(a.n41 + a.n31, a.n42 + a.n32, a.n43 + a.n33, a.n44 + a.n34);
        for (a = 0; a < 6; a++) {
            var b = J[a];
            b.divideScalar(Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z))
        }
    };
    this.projectVector = function(a, b) {
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        y.multiply(b.projectionMatrix, b.matrixWorldInverse);
        y.multiplyVector3(a);
        return a
    };
    this.unprojectVector = function(a, b) {
        b.projectionMatrixInverse.getInverse(b.projectionMatrix);
        y.multiply(b.matrixWorld, b.projectionMatrixInverse);
        y.multiplyVector3(a);
        return a
    };
    this.pickingRay = function(a, b) {
        var c;
        a.z = -1;
        c = new THREE_M.Vector3(a.x, a.y, 1);
        this.unprojectVector(a, b);
        this.unprojectVector(c, b);
        c.subSelf(a).normalize();
        return new THREE_M.Ray(a, c)
    };
    this.projectGraph = function(c, d) {
        f = 0;
        F.objects.length = 0;
        F.sprites.length = 0;
        F.lights.length = 0;
        var e = function(b) {
            if (b.visible !== !1) {
                var c;
                if (c = b instanceof THREE_M.Mesh || b instanceof THREE_M.Line)
                    if (!(c = b.frustumCulled === !1)) a: {
                        for (var d = b.matrixWorld,
                                f = -b.geometry.boundingSphere.radius * Math.max(b.scale.x, Math.max(b.scale.y, b.scale.z)), h = 0; h < 6; h++)
                            if (c = J[h].x * d.n14 + J[h].y * d.n24 + J[h].z * d.n34 + J[h].w, c <= f) {
                                c = !1;
                                break a
                            }
                        c = !0
                    }
                c ? (y.multiplyVector3(A.copy(b.position)), g = a(), g.object = b, g.z = A.z, F.objects.push(g)) : b instanceof THREE_M.Sprite || b instanceof THREE_M.Particle ? (y.multiplyVector3(A.copy(b.position)), g = a(), g.object = b, g.z = A.z, F.sprites.push(g)) : b instanceof THREE_M.Light && F.lights.push(b);
                c = 0;
                for (d = b.children.length; c < d; c++) e(b.children[c])
            }
        };
        e(c);
        d &&
            F.objects.sort(b);
        return F
    };
    this.projectScene = function(a, g, f) {
        var e = g.near,
            J = g.far,
            A, H, G, I, M, S, ba, W, j, X, V, da, ga, $, ua, ra;
        u = q = m = o = 0;
        F.elements.length = 0;
        g.parent === void 0 && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(g));
        a.updateMatrixWorld();
        g.matrixWorldInverse.getInverse(g.matrixWorld);
        y.multiply(g.projectionMatrix, g.matrixWorldInverse);
        this.computeFrustum(y);
        F = this.projectGraph(a, !1);
        a = 0;
        for (A = F.objects.length; a < A; a++)
            if (j = F.objects[a].object, X = j.matrixWorld,
                da = j.material, i = 0, j instanceof THREE_M.Mesh) {
                V = j.geometry;
                ga = j.geometry.materials;
                I = V.vertices;
                $ = V.faces;
                ua = V.faceVertexUvs;
                V = j.matrixRotationWorld.extractRotation(X);
                H = 0;
                for (G = I.length; H < G; H++) h = c(), h.positionWorld.copy(I[H].position), X.multiplyVector3(h.positionWorld), h.positionScreen.copy(h.positionWorld), y.multiplyVector4(h.positionScreen), h.positionScreen.x /= h.positionScreen.w, h.positionScreen.y /= h.positionScreen.w, h.visible = h.positionScreen.z > e && h.positionScreen.z < J;
                I = 0;
                for (H = $.length; I < H; I++) {
                    G =
                        $[I];
                    if (G instanceof THREE_M.Face3)
                        if (M = l[G.a], S = l[G.b], ba = l[G.c], M.visible && S.visible && ba.visible && (j.doubleSided || j.flipSided != (ba.positionScreen.x - M.positionScreen.x) * (S.positionScreen.y - M.positionScreen.y) - (ba.positionScreen.y - M.positionScreen.y) * (S.positionScreen.x - M.positionScreen.x) < 0)) W = p[o] = p[o] || new THREE_M.RenderableFace3, o++, k = W, k.v1.copy(M), k.v2.copy(S), k.v3.copy(ba);
                        else continue;
                    else if (G instanceof THREE_M.Face4)
                        if (M = l[G.a], S = l[G.b], ba = l[G.c], W = l[G.d], M.visible && S.visible && ba.visible && W.visible &&
                            (j.doubleSided || j.flipSided != ((W.positionScreen.x - M.positionScreen.x) * (S.positionScreen.y - M.positionScreen.y) - (W.positionScreen.y - M.positionScreen.y) * (S.positionScreen.x - M.positionScreen.x) < 0 || (S.positionScreen.x - ba.positionScreen.x) * (W.positionScreen.y - ba.positionScreen.y) - (S.positionScreen.y - ba.positionScreen.y) * (W.positionScreen.x - ba.positionScreen.x) < 0))) ra = r[m] = r[m] || new THREE_M.RenderableFace4, m++, k = ra, k.v1.copy(M), k.v2.copy(S), k.v3.copy(ba), k.v4.copy(W);
                        else continue;
                    k.normalWorld.copy(G.normal);
                    V.multiplyVector3(k.normalWorld);
                    k.centroidWorld.copy(G.centroid);
                    X.multiplyVector3(k.centroidWorld);
                    k.centroidScreen.copy(k.centroidWorld);
                    y.multiplyVector3(k.centroidScreen);
                    ba = G.vertexNormals;
                    M = 0;
                    for (S = ba.length; M < S; M++) W = k.vertexNormalsWorld[M], W.copy(ba[M]), V.multiplyVector3(W);
                    M = 0;
                    for (S = ua.length; M < S; M++)
                        if (ra = ua[M][I]) {
                            ba = 0;
                            for (W = ra.length; ba < W; ba++) k.uvs[M][ba] = ra[ba]
                        }
                    k.material = da;
                    k.faceMaterial = G.materialIndex !== null ? ga[G.materialIndex] : null;
                    k.z = k.centroidScreen.z;
                    F.elements.push(k)
                }
            } else if (j instanceof THREE_M.Line) {
            v.multiply(y, X);
            I = j.geometry.vertices;
            M = c();
            M.positionScreen.copy(I[0].position);
            v.multiplyVector4(M.positionScreen);
            H = 1;
            for (G = I.length; H < G; H++)
                if (M = c(), M.positionScreen.copy(I[H].position), v.multiplyVector4(M.positionScreen), S = l[i - 2], s.copy(M.positionScreen), E.copy(S.positionScreen), d(s, E)) s.multiplyScalar(1 / s.w), E.multiplyScalar(1 / E.w), j = t[q] = t[q] || new THREE_M.RenderableLine, q++, n = j, n.v1.positionScreen.copy(s), n.v2.positionScreen.copy(E), n.z = Math.max(s.z, E.z), n.material = da, F.elements.push(n)
        }
        a =
            0;
        for (A = F.sprites.length; a < A; a++)
            if (j = F.sprites[a].object, X = j.matrixWorld, j instanceof THREE_M.Particle && (x.set(X.n14, X.n24, X.n34, 1), y.multiplyVector4(x), x.z /= x.w, x.z > 0 && x.z < 1)) e = B[u] = B[u] || new THREE_M.RenderableParticle, u++, w = e, w.x = x.x / x.w, w.y = x.y / x.w, w.z = x.z, w.rotation = j.rotation.z, w.scale.x = j.scale.x * Math.abs(w.x - (x.x + g.projectionMatrix.n11) / (x.w + g.projectionMatrix.n14)), w.scale.y = j.scale.y * Math.abs(w.y - (x.y + g.projectionMatrix.n22) / (x.w + g.projectionMatrix.n24)), w.material = j.material, F.elements.push(w);
        f && F.elements.sort(b);
        return F
    }
};
THREE_M.Quaternion = function(a, c, b, d) {
    this.set(a || 0, c || 0, b || 0, d !== void 0 ? d : 1)
};
THREE_M.Quaternion.prototype = {
    constructor: THREE_M.Quaternion,
    set: function(a, c, b, d) {
        this.x = a;
        this.y = c;
        this.z = b;
        this.w = d;
        return this
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
        return this
    },
    setFromEuler: function(a) {
        var c = Math.PI / 360,
            b = a.x * c,
            d = a.y * c,
            g = a.z * c,
            a = Math.cos(d),
            d = Math.sin(d),
            c = Math.cos(-g),
            g = Math.sin(-g),
            f = Math.cos(b),
            b = Math.sin(b),
            e = a * c,
            h = d * g;
        this.w = e * f - h * b;
        this.x = e * b + h * f;
        this.y = d * c * f + a * g * b;
        this.z = a * g * f - d * c * b;
        return this
    },
    setFromAxisAngle: function(a, c) {
        var b = c / 2,
            d = Math.sin(b);
        this.x = a.x * d;
        this.y = a.y * d;
        this.z = a.z * d;
        this.w = Math.cos(b);
        return this
    },
    setFromRotationMatrix: function(a) {
        var c = Math.pow(a.determinant(), 1 / 3);
        this.w = Math.sqrt(Math.max(0, c + a.n11 + a.n22 + a.n33)) / 2;
        this.x = Math.sqrt(Math.max(0, c + a.n11 - a.n22 - a.n33)) / 2;
        this.y = Math.sqrt(Math.max(0, c - a.n11 + a.n22 - a.n33)) / 2;
        this.z = Math.sqrt(Math.max(0, c - a.n11 - a.n22 + a.n33)) / 2;
        this.x = a.n32 - a.n23 < 0 ? -Math.abs(this.x) : Math.abs(this.x);
        this.y = a.n13 - a.n31 < 0 ? -Math.abs(this.y) : Math.abs(this.y);
        this.z = a.n21 - a.n12 < 0 ? -Math.abs(this.z) : Math.abs(this.z);
        this.normalize();
        return this
    },
    calculateW: function() {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    },
    inverse: function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        a === 0 ? this.w = this.z = this.y = this.x = 0 : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a);
        return this
    },
    multiplySelf: function(a) {
        var c =
            this.x,
            b = this.y,
            d = this.z,
            g = this.w,
            f = a.x,
            e = a.y,
            h = a.z,
            a = a.w;
        this.x = c * a + g * f + b * h - d * e;
        this.y = b * a + g * e + d * f - c * h;
        this.z = d * a + g * h + c * e - b * f;
        this.w = g * a - c * f - b * e - d * h;
        return this
    },
    multiply: function(a, c) {
        this.x = a.x * c.w + a.y * c.z - a.z * c.y + a.w * c.x;
        this.y = -a.x * c.z + a.y * c.w + a.z * c.x + a.w * c.y;
        this.z = a.x * c.y - a.y * c.x + a.z * c.w + a.w * c.z;
        this.w = -a.x * c.x - a.y * c.y - a.z * c.z + a.w * c.w;
        return this
    },
    multiplyVector3: function(a, c) {
        c || (c = a);
        var b = a.x,
            d = a.y,
            g = a.z,
            f = this.x,
            e = this.y,
            h = this.z,
            i = this.w,
            l = i * b + e * g - h * d,
            k = i * d + h * b - f * g,
            o = i * g + f * d - e * b,
            b = -f *
            b - e * d - h * g;
        c.x = l * i + b * -f + k * -h - o * -e;
        c.y = k * i + b * -e + o * -f - l * -h;
        c.z = o * i + b * -h + l * -e - k * -f;
        return c
    }
};
THREE_M.Quaternion.slerp = function(a, c, b, d) {
    var g = a.w * c.w + a.x * c.x + a.y * c.y + a.z * c.z;
    g < 0 ? (b.w = -c.w, b.x = -c.x, b.y = -c.y, b.z = -c.z, g = -g) : b.copy(c);
    if (Math.abs(g) >= 1) return b.w = a.w, b.x = a.x, b.y = a.y, b.z = a.z, b;
    var f = Math.acos(g),
        g = Math.sqrt(1 - g * g);
    if (Math.abs(g) < 0.001) return b.w = 0.5 * (a.w + c.w), b.x = 0.5 * (a.x + c.x), b.y = 0.5 * (a.y + c.y), b.z = 0.5 * (a.z + c.z), b;
    c = Math.sin((1 - d) * f) / g;
    d = Math.sin(d * f) / g;
    b.w = a.w * c + b.w * d;
    b.x = a.x * c + b.x * d;
    b.y = a.y * c + b.y * d;
    b.z = a.z * c + b.z * d;
    return b
};
THREE_M.Vertex = function(a) {
    this.position = a || new THREE_M.Vector3
};
THREE_M.Face3 = function(a, c, b, d, g, f) {
    this.a = a;
    this.b = c;
    this.c = b;
    this.normal = d instanceof THREE_M.Vector3 ? d : new THREE_M.Vector3;
    this.vertexNormals = d instanceof Array ? d : [];
    this.color = g instanceof THREE_M.Color ? g : new THREE_M.Color;
    this.vertexColors = g instanceof Array ? g : [];
    this.vertexTangents = [];
    this.materialIndex = f;
    this.centroid = new THREE_M.Vector3
};
THREE_M.Face4 = function(a, c, b, d, g, f, e) {
    this.a = a;
    this.b = c;
    this.c = b;
    this.d = d;
    this.normal = g instanceof THREE_M.Vector3 ? g : new THREE_M.Vector3;
    this.vertexNormals = g instanceof Array ? g : [];
    this.color = f instanceof THREE_M.Color ? f : new THREE_M.Color;
    this.vertexColors = f instanceof Array ? f : [];
    this.vertexTangents = [];
    this.materialIndex = e;
    this.centroid = new THREE_M.Vector3
};
THREE_M.UV = function(a, c) {
    this.u = a || 0;
    this.v = c || 0
};
THREE_M.UV.prototype = {
    constructor: THREE_M.UV,
    set: function(a, c) {
        this.u = a;
        this.v = c;
        return this
    },
    copy: function(a) {
        this.u = a.u;
        this.v = a.v;
        return this
    },
    clone: function() {
        return new THREE_M.UV(this.u, this.v)
    }
};
THREE_M.Geometry = function() {
    this.id = THREE_M.GeometryCount++;
    this.vertices = [];
    this.colors = [];
    this.materials = [];
    this.faces = [];
    this.faceUvs = [
        []
    ];
    this.faceVertexUvs = [
        []
    ];
    this.morphTargets = [];
    this.morphColors = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.dynamic = this.hasTangents = !1
};
THREE_M.Geometry.prototype = {
    constructor: THREE_M.Geometry,
    applyMatrix: function(a) {
        var c = new THREE_M.Matrix4;
        c.extractRotation(a, new THREE_M.Vector3(1, 1, 1));
        for (var b = 0, d = this.vertices.length; b < d; b++) a.multiplyVector3(this.vertices[b].position);
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            var g = this.faces[b];
            c.multiplyVector3(g.normal);
            for (var f = 0, e = g.vertexNormals.length; f < e; f++) c.multiplyVector3(g.vertexNormals[f]);
            a.multiplyVector3(g.centroid)
        }
    },
    computeCentroids: function() {
        var a, c, b;
        a = 0;
        for (c = this.faces.length; a <
            c; a++) b = this.faces[a], b.centroid.set(0, 0, 0), b instanceof THREE_M.Face3 ? (b.centroid.addSelf(this.vertices[b.a].position), b.centroid.addSelf(this.vertices[b.b].position), b.centroid.addSelf(this.vertices[b.c].position), b.centroid.divideScalar(3)) : b instanceof THREE_M.Face4 && (b.centroid.addSelf(this.vertices[b.a].position), b.centroid.addSelf(this.vertices[b.b].position), b.centroid.addSelf(this.vertices[b.c].position), b.centroid.addSelf(this.vertices[b.d].position), b.centroid.divideScalar(4))
    },
    computeFaceNormals: function() {
        var a,
            c, b, d, g, f, e = new THREE_M.Vector3,
            h = new THREE_M.Vector3;
        a = 0;
        for (c = this.faces.length; a < c; a++) b = this.faces[a], d = this.vertices[b.a], g = this.vertices[b.b], f = this.vertices[b.c], e.sub(f.position, g.position), h.sub(d.position, g.position), e.crossSelf(h), e.isZero() || e.normalize(), b.normal.copy(e)
    },
    computeVertexNormals: function() {
        var a, c, b, d;
        if (this.__tmpVertices === void 0) {
            d = this.__tmpVertices = Array(this.vertices.length);
            a = 0;
            for (c = this.vertices.length; a < c; a++) d[a] = new THREE_M.Vector3;
            a = 0;
            for (c = this.faces.length; a < c; a++)
                if (b =
                    this.faces[a], b instanceof THREE_M.Face3) b.vertexNormals = [new THREE_M.Vector3, new THREE_M.Vector3, new THREE_M.Vector3];
                else if (b instanceof THREE_M.Face4) b.vertexNormals = [new THREE_M.Vector3, new THREE_M.Vector3, new THREE_M.Vector3, new THREE_M.Vector3]
        } else {
            d = this.__tmpVertices;
            a = 0;
            for (c = this.vertices.length; a < c; a++) d[a].set(0, 0, 0)
        }
        a = 0;
        for (c = this.faces.length; a < c; a++) b = this.faces[a], b instanceof THREE_M.Face3 ? (d[b.a].addSelf(b.normal), d[b.b].addSelf(b.normal), d[b.c].addSelf(b.normal)) : b instanceof THREE_M.Face4 && (d[b.a].addSelf(b.normal),
            d[b.b].addSelf(b.normal), d[b.c].addSelf(b.normal), d[b.d].addSelf(b.normal));
        a = 0;
        for (c = this.vertices.length; a < c; a++) d[a].normalize();
        a = 0;
        for (c = this.faces.length; a < c; a++) b = this.faces[a], b instanceof THREE_M.Face3 ? (b.vertexNormals[0].copy(d[b.a]), b.vertexNormals[1].copy(d[b.b]), b.vertexNormals[2].copy(d[b.c])) : b instanceof THREE_M.Face4 && (b.vertexNormals[0].copy(d[b.a]), b.vertexNormals[1].copy(d[b.b]), b.vertexNormals[2].copy(d[b.c]), b.vertexNormals[3].copy(d[b.d]))
    },
    computeTangents: function() {
        function a(a,
            b, c, d, g, f, R) {
            h = a.vertices[b].position;
            i = a.vertices[c].position;
            l = a.vertices[d].position;
            k = e[g];
            o = e[f];
            p = e[R];
            m = i.x - h.x;
            r = l.x - h.x;
            n = i.y - h.y;
            q = l.y - h.y;
            t = i.z - h.z;
            w = l.z - h.z;
            u = o.u - k.u;
            B = p.u - k.u;
            F = o.v - k.v;
            A = p.v - k.v;
            x = 1 / (u * A - B * F);
            s.set((A * m - F * r) * x, (A * n - F * q) * x, (A * t - F * w) * x);
            E.set((u * r - B * m) * x, (u * q - B * n) * x, (u * w - B * t) * x);
            v[b].addSelf(s);
            v[c].addSelf(s);
            v[d].addSelf(s);
            J[b].addSelf(E);
            J[c].addSelf(E);
            J[d].addSelf(E)
        }
        var c, b, d, g, f, e, h, i, l, k, o, p, m, r, n, q, t, w, u, B, F, A, x, y, v = [],
            J = [],
            s = new THREE_M.Vector3,
            E = new THREE_M.Vector3,
            R = new THREE_M.Vector3,
            U = new THREE_M.Vector3,
            K = new THREE_M.Vector3;
        c = 0;
        for (b = this.vertices.length; c < b; c++) v[c] = new THREE_M.Vector3, J[c] = new THREE_M.Vector3;
        c = 0;
        for (b = this.faces.length; c < b; c++) f = this.faces[c], e = this.faceVertexUvs[0][c], f instanceof THREE_M.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE_M.Face4 && (a(this, f.a, f.b, f.c, 0, 1, 2), a(this, f.a, f.b, f.d, 0, 1, 3));
        var P = ["a", "b", "c", "d"];
        c = 0;
        for (b = this.faces.length; c < b; c++) {
            f = this.faces[c];
            for (d = 0; d < f.vertexNormals.length; d++) K.copy(f.vertexNormals[d]), g = f[P[d]],
                y = v[g], R.copy(y), R.subSelf(K.multiplyScalar(K.dot(y))).normalize(), U.cross(f.vertexNormals[d], y), g = U.dot(J[g]), g = g < 0 ? -1 : 1, f.vertexTangents[d] = new THREE_M.Vector4(R.x, R.y, R.z, g)
        }
        this.hasTangents = !0
    },
    computeBoundingBox: function() {
        var a;
        if (this.vertices.length > 0) {
            this.boundingBox = {
                x: [this.vertices[0].position.x, this.vertices[0].position.x],
                y: [this.vertices[0].position.y, this.vertices[0].position.y],
                z: [this.vertices[0].position.z, this.vertices[0].position.z]
            };
            for (var c = 1, b = this.vertices.length; c < b; c++) {
                a =
                    this.vertices[c];
                if (a.position.x < this.boundingBox.x[0]) this.boundingBox.x[0] = a.position.x;
                else if (a.position.x > this.boundingBox.x[1]) this.boundingBox.x[1] = a.position.x;
                if (a.position.y < this.boundingBox.y[0]) this.boundingBox.y[0] = a.position.y;
                else if (a.position.y > this.boundingBox.y[1]) this.boundingBox.y[1] = a.position.y;
                if (a.position.z < this.boundingBox.z[0]) this.boundingBox.z[0] = a.position.z;
                else if (a.position.z > this.boundingBox.z[1]) this.boundingBox.z[1] = a.position.z
            }
        }
    },
    computeBoundingSphere: function() {
        for (var a =
                0, c = 0, b = this.vertices.length; c < b; c++) a = Math.max(a, this.vertices[c].position.length());
        this.boundingSphere = {
            radius: a
        }
    },
    mergeVertices: function() {
        var a = {},
            c = [],
            b = [],
            d, g = Math.pow(10, 4),
            f, e;
        f = 0;
        for (e = this.vertices.length; f < e; f++) d = this.vertices[f].position, d = [Math.round(d.x * g), Math.round(d.y * g), Math.round(d.z * g)].join("_"), a[d] === void 0 ? (a[d] = f, c.push(this.vertices[f]), b[f] = c.length - 1) : b[f] = b[a[d]];
        f = 0;
        for (e = this.faces.length; f < e; f++)
            if (a = this.faces[f], a instanceof THREE_M.Face3) a.a = b[a.a], a.b = b[a.b], a.c =
                b[a.c];
            else if (a instanceof THREE_M.Face4) a.a = b[a.a], a.b = b[a.b], a.c = b[a.c], a.d = b[a.d];
        this.vertices = c
    }
};
THREE_M.GeometryCount = 0;
THREE_M.Spline = function(a) {
    function c(a, b, c, d, g, f, e) {
        a = (c - a) * 0.5;
        d = (d - b) * 0.5;
        return (2 * (b - c) + a + d) * e + (-3 * (b - c) - 2 * a - d) * f + a * g + b
    }
    this.points = a;
    var b = [],
        d = {
            x: 0,
            y: 0,
            z: 0
        },
        g, f, e, h, i, l, k, o, p;
    this.initFromArray = function(a) {
        this.points = [];
        for (var b = 0; b < a.length; b++) this.points[b] = {
            x: a[b][0],
            y: a[b][1],
            z: a[b][2]
        }
    };
    this.getPoint = function(a) {
        g = (this.points.length - 1) * a;
        f = Math.floor(g);
        e = g - f;
        b[0] = f === 0 ? f : f - 1;
        b[1] = f;
        b[2] = f > this.points.length - 2 ? f : f + 1;
        b[3] = f > this.points.length - 3 ? f : f + 2;
        l = this.points[b[0]];
        k = this.points[b[1]];
        o = this.points[b[2]];
        p = this.points[b[3]];
        h = e * e;
        i = e * h;
        d.x = c(l.x, k.x, o.x, p.x, e, h, i);
        d.y = c(l.y, k.y, o.y, p.y, e, h, i);
        d.z = c(l.z, k.z, o.z, p.z, e, h, i);
        return d
    };
    this.getControlPointsArray = function() {
        var a, b, c = this.points.length,
            d = [];
        for (a = 0; a < c; a++) b = this.points[a], d[a] = [b.x, b.y, b.z];
        return d
    };
    this.getLength = function(a) {
        var b, c, d, g = b = b = 0,
            f = new THREE_M.Vector3,
            e = new THREE_M.Vector3,
            h = [],
            i = 0;
        h[0] = 0;
        a || (a = 100);
        c = this.points.length * a;
        f.copy(this.points[0]);
        for (a = 1; a < c; a++) b = a / c, d = this.getPoint(b), e.copy(d), i += e.distanceTo(f),
            f.copy(d), b *= this.points.length - 1, b = Math.floor(b), b != g && (h[b] = i, g = b);
        h[h.length] = i;
        return {
            chunks: h,
            total: i
        }
    };
    this.reparametrizeByArcLength = function(a) {
        var b, c, d, g, f, e, h = [],
            i = new THREE_M.Vector3,
            k = this.getLength();
        h.push(i.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            c = k.chunks[b] - k.chunks[b - 1];
            e = Math.ceil(a * c / k.total);
            g = (b - 1) / (this.points.length - 1);
            f = b / (this.points.length - 1);
            for (c = 1; c < e - 1; c++) d = g + c * (1 / e) * (f - g), d = this.getPoint(d), h.push(i.copy(d).clone());
            h.push(i.copy(this.points[b]).clone())
        }
        this.points =
            h
    }
};
THREE_M.Edge = function(a, c, b, d) {
    this.vertices = [a, c];
    this.vertexIndices = [b, d];
    this.faces = [];
    this.faceIndices = []
};
THREE_M.Camera = function() {
    if (arguments.length) return console.warn("DEPRECATED: Camera() is now PerspectiveCamera() or OrthographicCamera()."), new THREE_M.PerspectiveCamera(arguments[0], arguments[1], arguments[2], arguments[3]);
    THREE_M.Object3D.call(this);
    this.matrixWorldInverse = new THREE_M.Matrix4;
    this.projectionMatrix = new THREE_M.Matrix4;
    this.projectionMatrixInverse = new THREE_M.Matrix4
};
THREE_M.Camera.prototype = new THREE_M.Object3D;
THREE_M.Camera.prototype.constructor = THREE_M.Camera;
THREE_M.Camera.prototype.lookAt = function(a) {
    this.matrix.lookAt(this.position, a, this.up);
    this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
};
THREE_M.OrthographicCamera = function(a, c, b, d, g, f) {
    THREE_M.Camera.call(this);
    this.left = a;
    this.right = c;
    this.top = b;
    this.bottom = d;
    this.near = g !== void 0 ? g : 0.1;
    this.far = f !== void 0 ? f : 2E3;
    this.updateProjectionMatrix()
};
THREE_M.OrthographicCamera.prototype = new THREE_M.Camera;
THREE_M.OrthographicCamera.prototype.constructor = THREE_M.OrthographicCamera;
THREE_M.OrthographicCamera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix = THREE_M.Matrix4.makeOrtho(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE_M.PerspectiveCamera = function(a, c, b, d) {
    THREE_M.Camera.call(this);
    this.fov = a !== void 0 ? a : 50;
    this.aspect = c !== void 0 ? c : 1;
    this.near = b !== void 0 ? b : 0.1;
    this.far = d !== void 0 ? d : 2E3;
    this.updateProjectionMatrix()
};
THREE_M.PerspectiveCamera.prototype = new THREE_M.Camera;
THREE_M.PerspectiveCamera.prototype.constructor = THREE_M.PerspectiveCamera;
THREE_M.PerspectiveCamera.prototype.setLens = function(a, c) {
    this.fov = 2 * Math.atan((c !== void 0 ? c : 43.25) / (a * 2));
    this.fov *= 180 / Math.PI;
    this.updateProjectionMatrix()
};
THREE_M.PerspectiveCamera.prototype.setViewOffset = function(a, c, b, d, g, f) {
    this.fullWidth = a;
    this.fullHeight = c;
    this.x = b;
    this.y = d;
    this.width = g;
    this.height = f;
    this.updateProjectionMatrix()
};
THREE_M.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            c = Math.tan(this.fov * Math.PI / 360) * this.near,
            b = -c,
            d = a * b,
            a = Math.abs(a * c - d),
            b = Math.abs(c - b);
        this.projectionMatrix = THREE_M.Matrix4.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, c - (this.y + this.height) * b / this.fullHeight, c - this.y * b / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix = THREE_M.Matrix4.makePerspective(this.fov, this.aspect, this.near,
        this.far)
};
THREE_M.Light = function(a) {
    THREE_M.Object3D.call(this);
    this.color = new THREE_M.Color(a)
};
THREE_M.Light.prototype = new THREE_M.Object3D;
THREE_M.Light.prototype.constructor = THREE_M.Light;
THREE_M.Light.prototype.supr = THREE_M.Object3D.prototype;
THREE_M.AmbientLight = function(a) {
    THREE_M.Light.call(this, a)
};
THREE_M.AmbientLight.prototype = new THREE_M.Light;
THREE_M.AmbientLight.prototype.constructor = THREE_M.AmbientLight;
THREE_M.DirectionalLight = function(a, c, b) {
    THREE_M.Light.call(this, a);
    this.position = new THREE_M.Vector3(0, 1, 0);
    this.intensity = c !== void 0 ? c : 1;
    this.distance = b !== void 0 ? b : 0
};
THREE_M.DirectionalLight.prototype = new THREE_M.Light;
THREE_M.DirectionalLight.prototype.constructor = THREE_M.DirectionalLight;
THREE_M.PointLight = function(a, c, b) {
    THREE_M.Light.call(this, a);
    this.position = new THREE_M.Vector3(0, 0, 0);
    this.intensity = c !== void 0 ? c : 1;
    this.distance = b !== void 0 ? b : 0
};
THREE_M.PointLight.prototype = new THREE_M.Light;
THREE_M.PointLight.prototype.constructor = THREE_M.PointLight;
THREE_M.SpotLight = function(a, c, b, d) {
    THREE_M.Light.call(this, a);
    this.position = new THREE_M.Vector3(0, 1, 0);
    this.target = new THREE_M.Object3D;
    this.intensity = c !== void 0 ? c : 1;
    this.distance = b !== void 0 ? b : 0;
    this.castShadow = d !== void 0 ? d : !1
};
THREE_M.SpotLight.prototype = new THREE_M.Light;
THREE_M.SpotLight.prototype.constructor = THREE_M.SpotLight;
THREE_M.Material = function(a) {
    this.name = "";
    this.id = THREE_M.MaterialCount++;
    a = a || {};
    this.opacity = a.opacity !== void 0 ? a.opacity : 1;
    this.transparent = a.transparent !== void 0 ? a.transparent : !1;
    this.blending = a.blending !== void 0 ? a.blending : THREE_M.NormalBlending;
    this.depthTest = a.depthTest !== void 0 ? a.depthTest : !0;
    this.depthWrite = a.depthWrite !== void 0 ? a.depthWrite : !0;
    this.polygonOffset = a.polygonOffset !== void 0 ? a.polygonOffset : !1;
    this.polygonOffsetFactor = a.polygonOffsetFactor !== void 0 ? a.polygonOffsetFactor : 0;
    this.polygonOffsetUnits =
        a.polygonOffsetUnits !== void 0 ? a.polygonOffsetUnits : 0;
    this.alphaTest = a.alphaTest !== void 0 ? a.alphaTest : 0;
    this.overdraw = a.overdraw !== void 0 ? a.overdraw : !1
};
THREE_M.MaterialCount = 0;
THREE_M.NoShading = 0;
THREE_M.FlatShading = 1;
THREE_M.SmoothShading = 2;
THREE_M.NoColors = 0;
THREE_M.FaceColors = 1;
THREE_M.VertexColors = 2;
THREE_M.NormalBlending = 0;
THREE_M.AdditiveBlending = 1;
THREE_M.SubtractiveBlending = 2;
THREE_M.MultiplyBlending = 3;
THREE_M.AdditiveAlphaBlending = 4;
THREE_M.LineBasicMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.linewidth = a.linewidth !== void 0 ? a.linewidth : 1;
    this.linecap = a.linecap !== void 0 ? a.linecap : "round";
    this.linejoin = a.linejoin !== void 0 ? a.linejoin : "round";
    this.vertexColors = a.vertexColors ? a.vertexColors : !1;
    this.fog = a.fog !== void 0 ? a.fog : !0
};
THREE_M.LineBasicMaterial.prototype = new THREE_M.Material;
THREE_M.LineBasicMaterial.prototype.constructor = THREE_M.LineBasicMaterial;
THREE_M.MeshBasicMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.map = a.map !== void 0 ? a.map : null;
    this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
    this.envMap = a.envMap !== void 0 ? a.envMap : null;
    this.combine = a.combine !== void 0 ? a.combine : THREE_M.MultiplyOperation;
    this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
    this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
    this.fog = a.fog !== void 0 ? a.fog :
        !0;
    this.shading = a.shading !== void 0 ? a.shading : THREE_M.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin : "round";
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : !1;
    this.skinning = a.skinning !== void 0 ? a.skinning : !1;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets :
        !1
};
THREE_M.MeshBasicMaterial.prototype = new THREE_M.Material;
THREE_M.MeshBasicMaterial.prototype.constructor = THREE_M.MeshBasicMaterial;
THREE_M.MeshLambertMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.ambient = a.ambient !== void 0 ? new THREE_M.Color(a.ambient) : new THREE_M.Color(328965);
    this.map = a.map !== void 0 ? a.map : null;
    this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
    this.envMap = a.envMap !== void 0 ? a.envMap : null;
    this.combine = a.combine !== void 0 ? a.combine : THREE_M.MultiplyOperation;
    this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
    this.refractionRatio =
        a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
    this.fog = a.fog !== void 0 ? a.fog : !0;
    this.shading = a.shading !== void 0 ? a.shading : THREE_M.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin : "round";
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : !1;
    this.skinning =
        a.skinning !== void 0 ? a.skinning : !1;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : !1
};
THREE_M.MeshLambertMaterial.prototype = new THREE_M.Material;
THREE_M.MeshLambertMaterial.prototype.constructor = THREE_M.MeshLambertMaterial;
THREE_M.MeshPhongMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.ambient = a.ambient !== void 0 ? new THREE_M.Color(a.ambient) : new THREE_M.Color(328965);
    this.specular = a.specular !== void 0 ? new THREE_M.Color(a.specular) : new THREE_M.Color(1118481);
    this.shininess = a.shininess !== void 0 ? a.shininess : 30;
    this.metal = a.metal !== void 0 ? a.metal : !1;
    this.perPixel = a.perPixel !== void 0 ? a.perPixel : !1;
    this.map = a.map !== void 0 ? a.map : null;
    this.lightMap =
        a.lightMap !== void 0 ? a.lightMap : null;
    this.envMap = a.envMap !== void 0 ? a.envMap : null;
    this.combine = a.combine !== void 0 ? a.combine : THREE_M.MultiplyOperation;
    this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
    this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
    this.fog = a.fog !== void 0 ? a.fog : !0;
    this.shading = a.shading !== void 0 ? a.shading : THREE_M.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.wireframeLinecap =
        a.wireframeLinecap !== void 0 ? a.wireframeLinecap : "round";
    this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin : "round";
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : !1;
    this.skinning = a.skinning !== void 0 ? a.skinning : !1;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : !1
};
THREE_M.MeshPhongMaterial.prototype = new THREE_M.Material;
THREE_M.MeshPhongMaterial.prototype.constructor = THREE_M.MeshPhongMaterial;
THREE_M.MeshDepthMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.shading = a.shading !== void 0 ? a.shading : THREE_M.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1
};
THREE_M.MeshDepthMaterial.prototype = new THREE_M.Material;
THREE_M.MeshDepthMaterial.prototype.constructor = THREE_M.MeshDepthMaterial;
THREE_M.MeshNormalMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.shading = a.shading ? a.shading : THREE_M.FlatShading;
    this.wireframe = a.wireframe ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
};
THREE_M.MeshNormalMaterial.prototype = new THREE_M.Material;
THREE_M.MeshNormalMaterial.prototype.constructor = THREE_M.MeshNormalMaterial;
THREE_M.MeshFaceMaterial = function() {};
THREE_M.MeshShaderMaterial = function(a) {
    console.warn("DEPRECATED: MeshShaderMaterial() is now ShaderMaterial().");
    return new THREE_M.ShaderMaterial(a)
};
THREE_M.ParticleBasicMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.map = a.map !== void 0 ? a.map : null;
    this.size = a.size !== void 0 ? a.size : 1;
    this.sizeAttenuation = a.sizeAttenuation !== void 0 ? a.sizeAttenuation : !0;
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : !1;
    this.fog = a.fog !== void 0 ? a.fog : !0
};
THREE_M.ParticleBasicMaterial.prototype = new THREE_M.Material;
THREE_M.ParticleBasicMaterial.prototype.constructor = THREE_M.ParticleBasicMaterial;
THREE_M.ParticleCanvasMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.program = a.program !== void 0 ? a.program : function() {}
};
THREE_M.ParticleCanvasMaterial.prototype = new THREE_M.Material;
THREE_M.ParticleCanvasMaterial.prototype.constructor = THREE_M.ParticleCanvasMaterial;
THREE_M.ParticleDOMMaterial = function(a) {
    THREE_M.Material.call(this);
    this.domElement = a
};
THREE_M.ShaderMaterial = function(a) {
    THREE_M.Material.call(this, a);
    a = a || {};
    this.fragmentShader = a.fragmentShader !== void 0 ? a.fragmentShader : "void main() {}";
    this.vertexShader = a.vertexShader !== void 0 ? a.vertexShader : "void main() {}";
    this.uniforms = a.uniforms !== void 0 ? a.uniforms : {};
    this.attributes = a.attributes;
    this.shading = a.shading !== void 0 ? a.shading : THREE_M.SmoothShading;
    this.wireframe = a.wireframe !== void 0 ? a.wireframe : !1;
    this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth : 1;
    this.fog = a.fog !==
        void 0 ? a.fog : !1;
    this.lights = a.lights !== void 0 ? a.lights : !1;
    this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : !1;
    this.skinning = a.skinning !== void 0 ? a.skinning : !1;
    this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : !1
};
THREE_M.ShaderMaterial.prototype = new THREE_M.Material;
THREE_M.ShaderMaterial.prototype.constructor = THREE_M.ShaderMaterial;
THREE_M.Texture = function(a, c, b, d, g, f) {
    this.id = THREE_M.TextureCount++;
    this.image = a;
    this.mapping = c !== void 0 ? c : new THREE_M.UVMapping;
    this.wrapS = b !== void 0 ? b : THREE_M.ClampToEdgeWrapping;
    this.wrapT = d !== void 0 ? d : THREE_M.ClampToEdgeWrapping;
    this.magFilter = g !== void 0 ? g : THREE_M.LinearFilter;
    this.minFilter = f !== void 0 ? f : THREE_M.LinearMipMapLinearFilter;
    this.offset = new THREE_M.Vector2(0, 0);
    this.repeat = new THREE_M.Vector2(1, 1);
    this.needsUpdate = !1;
    this.onUpdate = null
};
THREE_M.Texture.prototype = {
    constructor: THREE_M.Texture,
    clone: function() {
        var a = new THREE_M.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
        a.offset.copy(this.offset);
        a.repeat.copy(this.repeat);
        return a
    }
};
THREE_M.TextureCount = 0;
THREE_M.MultiplyOperation = 0;
THREE_M.MixOperation = 1;
THREE_M.CubeReflectionMapping = function() {};
THREE_M.CubeRefractionMapping = function() {};
THREE_M.LatitudeReflectionMapping = function() {};
THREE_M.LatitudeRefractionMapping = function() {};
THREE_M.SphericalReflectionMapping = function() {};
THREE_M.SphericalRefractionMapping = function() {};
THREE_M.UVMapping = function() {};
THREE_M.RepeatWrapping = 0;
THREE_M.ClampToEdgeWrapping = 1;
THREE_M.MirroredRepeatWrapping = 2;
THREE_M.NearestFilter = 3;
THREE_M.NearestMipMapNearestFilter = 4;
THREE_M.NearestMipMapLinearFilter = 5;
THREE_M.LinearFilter = 6;
THREE_M.LinearMipMapNearestFilter = 7;
THREE_M.LinearMipMapLinearFilter = 8;
THREE_M.ByteType = 9;
THREE_M.UnsignedByteType = 10;
THREE_M.ShortType = 11;
THREE_M.UnsignedShortType = 12;
THREE_M.IntType = 13;
THREE_M.UnsignedIntType = 14;
THREE_M.FloatType = 15;
THREE_M.AlphaFormat = 16;
THREE_M.RGBFormat = 17;
THREE_M.RGBAFormat = 18;
THREE_M.LuminanceFormat = 19;
THREE_M.LuminanceAlphaFormat = 20;
THREE_M.DataTexture = function(a, c, b, d, g, f, e, h, i) {
    THREE_M.Texture.call(this, null, g, f, e, h, i);
    this.image = {
        data: a,
        width: c,
        height: b
    };
    this.format = d !== void 0 ? d : THREE_M.RGBAFormat
};
THREE_M.DataTexture.prototype = new THREE_M.Texture;
THREE_M.DataTexture.prototype.constructor = THREE_M.DataTexture;
THREE_M.DataTexture.prototype.clone = function() {
    var a = new THREE_M.DataTexture(this.data.slice(0), this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    return a
};
THREE_M.Particle = function(a) {
    THREE_M.Object3D.call(this);
    this.material = a
};
THREE_M.Particle.prototype = new THREE_M.Object3D;
THREE_M.Particle.prototype.constructor = THREE_M.Particle;
THREE_M.ParticleSystem = function(a, c) {
    THREE_M.Object3D.call(this);
    this.geometry = a;
    this.material = c;
    this.sortParticles = !1
};
THREE_M.ParticleSystem.prototype = new THREE_M.Object3D;
THREE_M.ParticleSystem.prototype.constructor = THREE_M.ParticleSystem;
THREE_M.Line = function(a, c, b) {
    THREE_M.Object3D.call(this);
    this.geometry = a;
    this.material = c;
    this.type = b !== void 0 ? b : THREE_M.LineStrip;
    this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE_M.LineStrip = 0;
THREE_M.LinePieces = 1;
THREE_M.Line.prototype = new THREE_M.Object3D;
THREE_M.Line.prototype.constructor = THREE_M.Line;
THREE_M.Mesh = function(a, c) {
    THREE_M.Object3D.call(this);
    this.geometry = a;
    this.material = c;
    if (c instanceof Array) console.warn("DEPRECATED: Mesh material can no longer be an Array. Using material at index 0..."), this.material = c[0];
    if (this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius, this.geometry.morphTargets.length)) {
        this.morphTargetBase = -1;
        this.morphTargetForcedOrder = [];
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var b = 0; b < this.geometry.morphTargets.length; b++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[b].name] = b
    }
};
THREE_M.Mesh.prototype = new THREE_M.Object3D;
THREE_M.Mesh.prototype.constructor = THREE_M.Mesh;
THREE_M.Mesh.prototype.supr = THREE_M.Object3D.prototype;
THREE_M.Mesh.prototype.getMorphTargetIndexByName = function(a) {
    if (this.morphTargetDictionary[a] !== void 0) return this.morphTargetDictionary[a];
    console.log("THREE_M.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
};
THREE_M.Bone = function(a) {
    THREE_M.Object3D.call(this);
    this.skin = a;
    this.skinMatrix = new THREE_M.Matrix4
};
THREE_M.Bone.prototype = new THREE_M.Object3D;
THREE_M.Bone.prototype.constructor = THREE_M.Bone;
THREE_M.Bone.prototype.supr = THREE_M.Object3D.prototype;
THREE_M.Bone.prototype.update = function(a, c) {
    this.matrixAutoUpdate && (c |= this.updateMatrix());
    if (c || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiply(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, c = !0;
    var b, d = this.children.length;
    for (b = 0; b < d; b++) this.children[b].update(this.skinMatrix, c)
};
THREE_M.SkinnedMesh = function(a, c) {
    THREE_M.Mesh.call(this, a, c);
    this.identityMatrix = new THREE_M.Matrix4;
    this.bones = [];
    this.boneMatrices = [];
    var b, d, g, f, e, h;
    if (this.geometry.bones !== void 0) {
        for (b = 0; b < this.geometry.bones.length; b++) g = this.geometry.bones[b], f = g.pos, e = g.rotq, h = g.scl, d = this.addBone(), d.name = g.name, d.position.set(f[0], f[1], f[2]), d.quaternion.set(e[0], e[1], e[2], e[3]), d.useQuaternion = !0, h !== void 0 ? d.scale.set(h[0], h[1], h[2]) : d.scale.set(1, 1, 1);
        for (b = 0; b < this.bones.length; b++) g = this.geometry.bones[b],
            d = this.bones[b], g.parent === -1 ? this.add(d) : this.bones[g.parent].add(d);
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        this.pose()
    }
};
THREE_M.SkinnedMesh.prototype = new THREE_M.Mesh;
THREE_M.SkinnedMesh.prototype.constructor = THREE_M.SkinnedMesh;
THREE_M.SkinnedMesh.prototype.addBone = function(a) {
    a === void 0 && (a = new THREE_M.Bone(this));
    this.bones.push(a);
    return a
};
THREE_M.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1;
    for (var a = 0, c = this.children.length; a < c; a++) {
        var b = this.children[a];
        b instanceof THREE_M.Bone ? b.update(this.identityMatrix, !1) : b.updateMatrixWorld(!0)
    }
    for (var c = this.bones.length, b = this.bones, d = this.boneMatrices, a = 0; a < c; a++) b[a].skinMatrix.flattenToArrayOffset(d,
        a * 16)
};
THREE_M.SkinnedMesh.prototype.pose = function() {
    this.updateMatrixWorld(!0);
    for (var a, c = [], b = 0; b < this.bones.length; b++) {
        a = this.bones[b];
        var d = new THREE_M.Matrix4;
        d.getInverse(a.skinMatrix);
        c.push(d);
        a.skinMatrix.flattenToArrayOffset(this.boneMatrices, b * 16)
    }
    if (this.geometry.skinVerticesA === void 0) {
        this.geometry.skinVerticesA = [];
        this.geometry.skinVerticesB = [];
        for (a = 0; a < this.geometry.skinIndices.length; a++) {
            var b = this.geometry.vertices[a].position,
                g = this.geometry.skinIndices[a].x,
                f = this.geometry.skinIndices[a].y,
                d =
                new THREE_M.Vector3(b.x, b.y, b.z);
            this.geometry.skinVerticesA.push(c[g].multiplyVector3(d));
            d = new THREE_M.Vector3(b.x, b.y, b.z);
            this.geometry.skinVerticesB.push(c[f].multiplyVector3(d));
            this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y !== 1 && (b = (1 - (this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y)) * 0.5, this.geometry.skinWeights[a].x += b, this.geometry.skinWeights[a].y += b)
        }
    }
};
THREE_M.MorphAnimMesh = function(a, c) {
    THREE_M.Mesh.call(this, a, c);
    this.duration = 1E3;
    this.mirroredLoop = !1;
    this.currentKeyframe = this.lastKeyframe = this.time = 0;
    this.direction = 1;
    this.directionBackwards = !1
};
THREE_M.MorphAnimMesh.prototype = new THREE_M.Mesh;
THREE_M.MorphAnimMesh.prototype.constructor = THREE_M.MorphAnimMesh;
THREE_M.MorphAnimMesh.prototype.updateAnimation = function(a) {
    var c = this.duration / (this.geometry.morphTargets.length - 1);
    this.time += this.direction * a;
    if (this.mirroredLoop) {
        if (this.time > this.duration || this.time < 0) {
            this.direction *= -1;
            if (this.time > this.duration) this.time = this.duration, this.directionBackwards = !0;
            if (this.time < 0) this.time = 0, this.directionBackwards = !1
        }
    } else this.time %= this.duration;
    a = THREE_M.Math.clamp(Math.floor(this.time / c), 0, this.geometry.morphTargets.length - 1);
    if (a != this.currentKeyframe) this.morphTargetInfluences[this.lastKeyframe] =
        0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a;
    c = this.time % c / c;
    this.directionBackwards && (c = 1 - c);
    this.morphTargetInfluences[this.currentKeyframe] = c;
    this.morphTargetInfluences[this.lastKeyframe] = 1 - c
};
THREE_M.Ribbon = function(a, c) {
    THREE_M.Object3D.call(this);
    this.geometry = a;
    this.material = c
};
THREE_M.Ribbon.prototype = new THREE_M.Object3D;
THREE_M.Ribbon.prototype.constructor = THREE_M.Ribbon;
THREE_M.LOD = function() {
    THREE_M.Object3D.call(this);
    this.LODs = []
};
THREE_M.LOD.prototype = new THREE_M.Object3D;
THREE_M.LOD.prototype.constructor = THREE_M.LOD;
THREE_M.LOD.prototype.supr = THREE_M.Object3D.prototype;
THREE_M.LOD.prototype.addLevel = function(a, c) {
    c === void 0 && (c = 0);
    for (var c = Math.abs(c), b = 0; b < this.LODs.length; b++)
        if (c < this.LODs[b].visibleAtDistance) break;
    this.LODs.splice(b, 0, {
        visibleAtDistance: c,
        object3D: a
    });
    this.add(a)
};
THREE_M.LOD.prototype.update = function(a) {
    if (this.LODs.length > 1) {
        a.matrixWorldInverse.getInverse(a.matrixWorld);
        a = a.matrixWorldInverse;
        a = -(a.n31 * this.position.x + a.n32 * this.position.y + a.n33 * this.position.z + a.n34);
        this.LODs[0].object3D.visible = !0;
        for (var c = 1; c < this.LODs.length; c++)
            if (a >= this.LODs[c].visibleAtDistance) this.LODs[c - 1].object3D.visible = !1, this.LODs[c].object3D.visible = !0;
            else break;
        for (; c < this.LODs.length; c++) this.LODs[c].object3D.visible = !1
    }
};
THREE_M.Sprite = function(a) {
    THREE_M.Object3D.call(this);
    this.color = a.color !== void 0 ? new THREE_M.Color(a.color) : new THREE_M.Color(16777215);
    this.map = a.map instanceof THREE_M.Texture ? a.map : THREE_M.ImageUtils.loadTexture(a.map);
    this.blending = a.blending !== void 0 ? a.blending : THREE_M.NormalBlending;
    this.useScreenCoordinates = a.useScreenCoordinates !== void 0 ? a.useScreenCoordinates : !0;
    this.mergeWith3D = a.mergeWith3D !== void 0 ? a.mergeWith3D : !this.useScreenCoordinates;
    this.affectedByDistance = a.affectedByDistance !== void 0 ? a.affectedByDistance :
        !this.useScreenCoordinates;
    this.scaleByViewport = a.scaleByViewport !== void 0 ? a.scaleByViewport : !this.affectedByDistance;
    this.alignment = a.alignment instanceof THREE_M.Vector2 ? a.alignment : THREE_M.SpriteAlignment.center;
    this.rotation3d = this.rotation;
    this.rotation = 0;
    this.opacity = 1;
    this.uvOffset = new THREE_M.Vector2(0, 0);
    this.uvScale = new THREE_M.Vector2(1, 1)
};
THREE_M.Sprite.prototype = new THREE_M.Object3D;
THREE_M.Sprite.prototype.constructor = THREE_M.Sprite;
THREE_M.Sprite.prototype.updateMatrix = function() {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    if (this.scale.x !== 1 || this.scale.y !== 1) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, this.scale.y);
    this.matrixWorldNeedsUpdate = !0
};
THREE_M.SpriteAlignment = {};
THREE_M.SpriteAlignment.topLeft = new THREE_M.Vector2(1, -1);
THREE_M.SpriteAlignment.topCenter = new THREE_M.Vector2(0, -1);
THREE_M.SpriteAlignment.topRight = new THREE_M.Vector2(-1, -1);
THREE_M.SpriteAlignment.centerLeft = new THREE_M.Vector2(1, 0);
THREE_M.SpriteAlignment.center = new THREE_M.Vector2(0, 0);
THREE_M.SpriteAlignment.centerRight = new THREE_M.Vector2(-1, 0);
THREE_M.SpriteAlignment.bottomLeft = new THREE_M.Vector2(1, 1);
THREE_M.SpriteAlignment.bottomCenter = new THREE_M.Vector2(0, 1);
THREE_M.SpriteAlignment.bottomRight = new THREE_M.Vector2(-1, 1);
THREE_M.Scene = function() {
    THREE_M.Object3D.call(this);
    this.overrideMaterial = this.fog = null;
    this.matrixAutoUpdate = !1;
    this.objects = [];
    this.lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE_M.Scene.prototype = new THREE_M.Object3D;
THREE_M.Scene.prototype.constructor = THREE_M.Scene;
THREE_M.Scene.prototype.addObject = function(a) {
    if (a instanceof THREE_M.Light) this.lights.indexOf(a) === -1 && this.lights.push(a);
    else if (!(a instanceof THREE_M.Camera || a instanceof THREE_M.Bone) && this.objects.indexOf(a) === -1) {
        this.objects.push(a);
        this.__objectsAdded.push(a);
        var c = this.__objectsRemoved.indexOf(a);
        c !== -1 && this.__objectsRemoved.splice(c, 1)
    }
    for (c = 0; c < a.children.length; c++) this.addObject(a.children[c])
};
THREE_M.Scene.prototype.removeObject = function(a) {
    if (a instanceof THREE_M.Light) {
        var c = this.lights.indexOf(a);
        c !== -1 && this.lights.splice(c, 1)
    } else a instanceof THREE_M.Camera || (c = this.objects.indexOf(a), c !== -1 && (this.objects.splice(c, 1), this.__objectsRemoved.push(a), c = this.__objectsAdded.indexOf(a), c !== -1 && this.__objectsAdded.splice(c, 1)));
    for (c = 0; c < a.children.length; c++) this.removeObject(a.children[c])
};
THREE_M.Fog = function(a, c, b) {
    this.color = new THREE_M.Color(a);
    this.near = c !== void 0 ? c : 1;
    this.far = b !== void 0 ? b : 1E3
};
THREE_M.FogExp2 = function(a, c) {
    this.color = new THREE_M.Color(a);
    this.density = c !== void 0 ? c : 2.5E-4
};
THREE_M.DOMRenderer = function() {
    THREE_M.Renderer.call(this);
    var a = null,
        c = new THREE_M.Projector,
        b, d, g, f;
    this.domElement = document.createElement("div");
    this.setSize = function(a, c) {
        b = a;
        d = c;
        g = b / 2;
        f = d / 2
    };
    this.render = function(b, d) {
        var i, l, k, o, p, m, r, n;
        a = c.projectScene(b, d);
        i = 0;
        for (l = a.length; i < l; i++)
            if (p = a[i], p instanceof THREE_M.RenderableParticle) {
                r = p.x * g + g;
                n = p.y * f + f;
                k = 0;
                for (o = p.material.length; k < o; k++)
                    if (m = p.material[k], m instanceof THREE_M.ParticleDOMMaterial) m = m.domElement, m.style.left = r + "px", m.style.top = n + "px"
            }
    }
};
THREE_M.CanvasRenderer = function(a) {
    function c(a) {
        if (w != a) n.globalAlpha = w = a
    }

    function b(a) {
        if (u != a) {
            switch (a) {
                case THREE_M.NormalBlending:
                    n.globalCompositeOperation = "source-over";
                    break;
                case THREE_M.AdditiveBlending:
                    n.globalCompositeOperation = "lighter";
                    break;
                case THREE_M.SubtractiveBlending:
                    n.globalCompositeOperation = "darker"
            }
            u = a
        }
    }

    function d(a) {
        if (B != a) n.strokeStyle = B = a
    }

    function g(a) {
        if (F != a) n.fillStyle = F = a
    }
    var f = this,
        e, h, i, l = new THREE_M.Projector,
        a = a || {},
        k = a.canvas !== void 0 ? a.canvas : document.createElement("canvas"),
        o, p, m, r, n = k.getContext("2d"),
        q = new THREE_M.Color(0),
        t = 0,
        w = 1,
        u = 0,
        B = null,
        F = null,
        A = null,
        x = null,
        y = null,
        v, J, s, E, R = new THREE_M.RenderableVertex,
        U = new THREE_M.RenderableVertex,
        K, P, O, aa, H, G, I, M, S, ba, W, j, X = new THREE_M.Color,
        V = new THREE_M.Color,
        da = new THREE_M.Color,
        ga = new THREE_M.Color,
        $ = new THREE_M.Color,
        ua = [],
        ra = [],
        qa, na, oa, pa, Da, za, Aa, Ba, L, Z, Q = new THREE_M.Rectangle,
        ea = new THREE_M.Rectangle,
        ha = new THREE_M.Rectangle,
        N = !1,
        ca = new THREE_M.Color,
        la = new THREE_M.Color,
        ma = new THREE_M.Color,
        fa = new THREE_M.Vector3,
        Y, xa, va, ta, T, wa, a = 16;
    Y = document.createElement("canvas");
    Y.width = Y.height = 2;
    xa = Y.getContext("2d");
    xa.fillStyle = "rgba(0,0,0,1)";
    xa.fillRect(0, 0, 2, 2);
    va = xa.getImageData(0, 0, 2, 2);
    ta = va.data;
    T = document.createElement("canvas");
    T.width = T.height = a;
    wa = T.getContext("2d");
    wa.translate(-a / 2, -a / 2);
    wa.scale(a, a);
    a--;
    this.domElement = k;
    this.sortElements = this.sortObjects = this.autoClear = !0;
    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    };
    this.setSize = function(a, b) {
        o = a;
        p = b;
        m = Math.floor(o / 2);
        r = Math.floor(p / 2);
        k.width = o;
        k.height = p;
        Q.set(-m, -r, m, r);
        ea.set(-m, -r, m, r);
        w = 1;
        u = 0;
        y = x = A = F =
            B = null
    };
    this.setClearColor = function(a, b) {
        q.copy(a);
        t = b;
        ea.set(-m, -r, m, r)
    };
    this.setClearColorHex = function(a, b) {
        q.setHex(a);
        t = b;
        ea.set(-m, -r, m, r)
    };
    this.clear = function() {
        n.setTransform(1, 0, 0, -1, m, r);
        ea.isEmpty() || (ea.minSelf(Q), ea.inflate(2), t < 1 && n.clearRect(Math.floor(ea.getX()), Math.floor(ea.getY()), Math.floor(ea.getWidth()), Math.floor(ea.getHeight())), t > 0 && (b(THREE_M.NormalBlending), c(1), g("rgba(" + Math.floor(q.r * 255) + "," + Math.floor(q.g * 255) + "," + Math.floor(q.b * 255) + "," + t + ")"), n.fillRect(Math.floor(ea.getX()),
            Math.floor(ea.getY()), Math.floor(ea.getWidth()), Math.floor(ea.getHeight()))), ea.empty())
    };
    this.render = function(a, k) {
        function p(a) {
            var b, c, d, g;
            ca.setRGB(0, 0, 0);
            la.setRGB(0, 0, 0);
            ma.setRGB(0, 0, 0);
            b = 0;
            for (c = a.length; b < c; b++) d = a[b], g = d.color, d instanceof THREE_M.AmbientLight ? (ca.r += g.r, ca.g += g.g, ca.b += g.b) : d instanceof THREE_M.DirectionalLight ? (la.r += g.r, la.g += g.g, la.b += g.b) : d instanceof THREE_M.PointLight && (ma.r += g.r, ma.g += g.g, ma.b += g.b)
        }

        function o(a, b, c, d) {
            var g, f, e, j, h, i;
            g = 0;
            for (f = a.length; g < f; g++) e = a[g],
                j = e.color, e instanceof THREE_M.DirectionalLight ? (h = e.matrixWorld.getPosition(), i = c.dot(h), i <= 0 || (i *= e.intensity, d.r += j.r * i, d.g += j.g * i, d.b += j.b * i)) : e instanceof THREE_M.PointLight && (h = e.matrixWorld.getPosition(), i = c.dot(fa.sub(h, b).normalize()), i <= 0 || (i *= e.distance == 0 ? 1 : 1 - Math.min(b.distanceTo(h) / e.distance, 1), i != 0 && (i *= e.intensity, d.r += j.r * i, d.g += j.g * i, d.b += j.b * i)))
        }

        function q(a, f, e) {
            c(e.opacity);
            b(e.blending);
            var j, h, i, k, l, ia;
            if (e instanceof THREE_M.ParticleBasicMaterial) {
                if (e.map) k = e.map.image, l = k.width >>
                    1, ia = k.height >> 1, e = f.scale.x * m, i = f.scale.y * r, j = e * l, h = i * ia, ha.set(a.x - j, a.y - h, a.x + j, a.y + h), Q.intersects(ha) && (n.save(), n.translate(a.x, a.y), n.rotate(-f.rotation), n.scale(e, -i), n.translate(-l, -ia), n.drawImage(k, 0, 0), n.restore())
            } else e instanceof THREE_M.ParticleCanvasMaterial && (j = f.scale.x * m, h = f.scale.y * r, ha.set(a.x - j, a.y - h, a.x + j, a.y + h), Q.intersects(ha) && (d(e.color.getContextStyle()), g(e.color.getContextStyle()), n.save(), n.translate(a.x, a.y), n.rotate(-f.rotation), n.scale(j, h), e.program(n), n.restore()))
        }

        function t(a, g, f, e) {
            c(e.opacity);
            b(e.blending);
            n.beginPath();
            n.moveTo(a.positionScreen.x, a.positionScreen.y);
            n.lineTo(g.positionScreen.x, g.positionScreen.y);
            n.closePath();
            if (e instanceof THREE_M.LineBasicMaterial) {
                a = e.linewidth;
                if (A != a) n.lineWidth = A = a;
                a = e.linecap;
                if (x != a) n.lineCap = x = a;
                a = e.linejoin;
                if (y != a) n.lineJoin = y = a;
                d(e.color.getContextStyle());
                n.stroke();
                ha.inflate(e.linewidth * 2)
            }
        }

        function w(a, d, g, e, j, h, m, n) {
            f.info.render.vertices += 3;
            f.info.render.faces++;
            c(n.opacity);
            b(n.blending);
            K = a.positionScreen.x;
            P = a.positionScreen.y;
            O = d.positionScreen.x;
            aa = d.positionScreen.y;
            H = g.positionScreen.x;
            G = g.positionScreen.y;
            Ga(K, P, O, aa, H, G);
            if (n instanceof THREE_M.MeshBasicMaterial)
                if (n.map) n.map.mapping instanceof THREE_M.UVMapping && (pa = m.uvs[0], Ka(K, P, O, aa, H, G, pa[e].u, pa[e].v, pa[j].u, pa[j].v, pa[h].u, pa[h].v, n.map));
                else if (n.envMap) {
                if (n.envMap.mapping instanceof THREE_M.SphericalReflectionMapping) a = k.matrixWorldInverse, fa.copy(m.vertexNormalsWorld[e]), Da = (fa.x * a.n11 + fa.y * a.n12 + fa.z * a.n13) * 0.5 + 0.5, za = -(fa.x * a.n21 + fa.y *
                    a.n22 + fa.z * a.n23) * 0.5 + 0.5, fa.copy(m.vertexNormalsWorld[j]), Aa = (fa.x * a.n11 + fa.y * a.n12 + fa.z * a.n13) * 0.5 + 0.5, Ba = -(fa.x * a.n21 + fa.y * a.n22 + fa.z * a.n23) * 0.5 + 0.5, fa.copy(m.vertexNormalsWorld[h]), L = (fa.x * a.n11 + fa.y * a.n12 + fa.z * a.n13) * 0.5 + 0.5, Z = -(fa.x * a.n21 + fa.y * a.n22 + fa.z * a.n23) * 0.5 + 0.5, Ka(K, P, O, aa, H, G, Da, za, Aa, Ba, L, Z, n.envMap)
            } else n.wireframe ? u(n.color, n.wireframeLinewidth, n.wireframeLinecap, n.wireframeLinejoin) : Ca(n.color);
            else if (n instanceof THREE_M.MeshLambertMaterial) n.map && !n.wireframe && (n.map.mapping instanceof THREE_M.UVMapping && (pa = m.uvs[0], Ka(K, P, O, aa, H, G, pa[e].u, pa[e].v, pa[j].u, pa[j].v, pa[h].u, pa[h].v, n.map)), b(THREE_M.SubtractiveBlending)), N ? !n.wireframe && n.shading == THREE_M.SmoothShading && m.vertexNormalsWorld.length == 3 ? (V.r = da.r = ga.r = ca.r, V.g = da.g = ga.g = ca.g, V.b = da.b = ga.b = ca.b, o(i, m.v1.positionWorld, m.vertexNormalsWorld[0], V), o(i, m.v2.positionWorld, m.vertexNormalsWorld[1], da), o(i, m.v3.positionWorld, m.vertexNormalsWorld[2], ga), V.r = Math.max(0, Math.min(n.color.r * V.r, 1)), V.g = Math.max(0, Math.min(n.color.g * V.g,
                1)), V.b = Math.max(0, Math.min(n.color.b * V.b, 1)), da.r = Math.max(0, Math.min(n.color.r * da.r, 1)), da.g = Math.max(0, Math.min(n.color.g * da.g, 1)), da.b = Math.max(0, Math.min(n.color.b * da.b, 1)), ga.r = Math.max(0, Math.min(n.color.r * ga.r, 1)), ga.g = Math.max(0, Math.min(n.color.g * ga.g, 1)), ga.b = Math.max(0, Math.min(n.color.b * ga.b, 1)), $.r = (da.r + ga.r) * 0.5, $.g = (da.g + ga.g) * 0.5, $.b = (da.b + ga.b) * 0.5, oa = Ha(V, da, ga, $), Fa(K, P, O, aa, H, G, 0, 0, 1, 0, 0, 1, oa)) : (X.r = ca.r, X.g = ca.g, X.b = ca.b, o(i, m.centroidWorld, m.normalWorld, X), X.r = Math.max(0, Math.min(n.color.r *
                X.r, 1)), X.g = Math.max(0, Math.min(n.color.g * X.g, 1)), X.b = Math.max(0, Math.min(n.color.b * X.b, 1)), n.wireframe ? u(X, n.wireframeLinewidth, n.wireframeLinecap, n.wireframeLinejoin) : Ca(X)) : n.wireframe ? u(n.color, n.wireframeLinewidth, n.wireframeLinecap, n.wireframeLinejoin) : Ca(n.color);
            else if (n instanceof THREE_M.MeshDepthMaterial) qa = k.near, na = k.far, V.r = V.g = V.b = 1 - B(a.positionScreen.z, qa, na), da.r = da.g = da.b = 1 - B(d.positionScreen.z, qa, na), ga.r = ga.g = ga.b = 1 - B(g.positionScreen.z, qa, na), $.r = (da.r + ga.r) * 0.5, $.g = (da.g + ga.g) *
                0.5, $.b = (da.b + ga.b) * 0.5, oa = Ha(V, da, ga, $), Fa(K, P, O, aa, H, G, 0, 0, 1, 0, 0, 1, oa);
            else if (n instanceof THREE_M.MeshNormalMaterial) X.r = F(m.normalWorld.x), X.g = F(m.normalWorld.y), X.b = F(m.normalWorld.z), n.wireframe ? u(X, n.wireframeLinewidth, n.wireframeLinecap, n.wireframeLinejoin) : Ca(X)
        }

        function Ma(a, d, g, e, h, n, m, l, p) {
            f.info.render.vertices += 4;
            f.info.render.faces++;
            c(l.opacity);
            b(l.blending);
            if (l.map || l.envMap) w(a, d, e, 0, 1, 3, m, l, p), w(h, g, n, 1, 2, 3, m, l, p);
            else if (K = a.positionScreen.x, P = a.positionScreen.y, O = d.positionScreen.x,
                aa = d.positionScreen.y, H = g.positionScreen.x, G = g.positionScreen.y, I = e.positionScreen.x, M = e.positionScreen.y, S = h.positionScreen.x, ba = h.positionScreen.y, W = n.positionScreen.x, j = n.positionScreen.y, l instanceof THREE_M.MeshBasicMaterial) Ia(K, P, O, aa, H, G, I, M), l.wireframe ? u(l.color, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : Ca(l.color);
            else if (l instanceof THREE_M.MeshLambertMaterial) N ? !l.wireframe && l.shading == THREE_M.SmoothShading && m.vertexNormalsWorld.length == 4 ? (V.r = da.r = ga.r = $.r = ca.r, V.g = da.g =
                ga.g = $.g = ca.g, V.b = da.b = ga.b = $.b = ca.b, o(i, m.v1.positionWorld, m.vertexNormalsWorld[0], V), o(i, m.v2.positionWorld, m.vertexNormalsWorld[1], da), o(i, m.v4.positionWorld, m.vertexNormalsWorld[3], ga), o(i, m.v3.positionWorld, m.vertexNormalsWorld[2], $), V.r = Math.max(0, Math.min(l.color.r * V.r, 1)), V.g = Math.max(0, Math.min(l.color.g * V.g, 1)), V.b = Math.max(0, Math.min(l.color.b * V.b, 1)), da.r = Math.max(0, Math.min(l.color.r * da.r, 1)), da.g = Math.max(0, Math.min(l.color.g * da.g, 1)), da.b = Math.max(0, Math.min(l.color.b * da.b, 1)), ga.r =
                Math.max(0, Math.min(l.color.r * ga.r, 1)), ga.g = Math.max(0, Math.min(l.color.g * ga.g, 1)), ga.b = Math.max(0, Math.min(l.color.b * ga.b, 1)), $.r = Math.max(0, Math.min(l.color.r * $.r, 1)), $.g = Math.max(0, Math.min(l.color.g * $.g, 1)), $.b = Math.max(0, Math.min(l.color.b * $.b, 1)), oa = Ha(V, da, ga, $), Ga(K, P, O, aa, I, M), Fa(K, P, O, aa, I, M, 0, 0, 1, 0, 0, 1, oa), Ga(S, ba, H, G, W, j), Fa(S, ba, H, G, W, j, 1, 0, 1, 1, 0, 1, oa)) : (X.r = ca.r, X.g = ca.g, X.b = ca.b, o(i, m.centroidWorld, m.normalWorld, X), X.r = Math.max(0, Math.min(l.color.r * X.r, 1)), X.g = Math.max(0, Math.min(l.color.g *
                X.g, 1)), X.b = Math.max(0, Math.min(l.color.b * X.b, 1)), Ia(K, P, O, aa, H, G, I, M), l.wireframe ? u(X, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : Ca(X)) : (Ia(K, P, O, aa, H, G, I, M), l.wireframe ? u(l.color, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : Ca(l.color));
            else if (l instanceof THREE_M.MeshNormalMaterial) X.r = F(m.normalWorld.x), X.g = F(m.normalWorld.y), X.b = F(m.normalWorld.z), Ia(K, P, O, aa, H, G, I, M), l.wireframe ? u(X, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : Ca(X);
            else if (l instanceof THREE_M.MeshDepthMaterial) qa = k.near, na = k.far, V.r = V.g = V.b = 1 - B(a.positionScreen.z, qa, na), da.r = da.g = da.b = 1 - B(d.positionScreen.z, qa, na), ga.r = ga.g = ga.b = 1 - B(e.positionScreen.z, qa, na), $.r = $.g = $.b = 1 - B(g.positionScreen.z, qa, na), oa = Ha(V, da, ga, $), Ga(K, P, O, aa, I, M), Fa(K, P, O, aa, I, M, 0, 0, 1, 0, 0, 1, oa), Ga(S, ba, H, G, W, j), Fa(S, ba, H, G, W, j, 1, 0, 1, 1, 0, 1, oa)
        }

        function Ga(a, b, c, d, g, e) {
            n.beginPath();
            n.moveTo(a, b);
            n.lineTo(c, d);
            n.lineTo(g, e);
            n.lineTo(a, b);
            n.closePath()
        }

        function Ia(a, b, c, d, g, e, f, j) {
            n.beginPath();
            n.moveTo(a, b);
            n.lineTo(c,
                d);
            n.lineTo(g, e);
            n.lineTo(f, j);
            n.lineTo(a, b);
            n.closePath()
        }

        function u(a, b, c, g) {
            if (A != b) n.lineWidth = A = b;
            if (x != c) n.lineCap = x = c;
            if (y != g) n.lineJoin = y = g;
            d(a.getContextStyle());
            n.stroke();
            ha.inflate(b * 2)
        }

        function Ca(a) {
            g(a.getContextStyle());
            n.fill()
        }

        function Ka(a, b, c, d, e, f, j, h, i, m, k, l, ia) {
            if (ia.image.width != 0) {
                if (ia.needsUpdate == !0 || ua[ia.id] == void 0) {
                    var o = ia.wrapS == THREE_M.RepeatWrapping,
                        p = ia.wrapT == THREE_M.RepeatWrapping;
                    ua[ia.id] = n.createPattern(ia.image, o && p ? "repeat" : o && !p ? "repeat-x" : !o && p ? "repeat-y" :
                        "no-repeat");
                    ia.needsUpdate = !1
                }
                g(ua[ia.id]);
                var o = ia.offset.x / ia.repeat.x,
                    p = ia.offset.y / ia.repeat.y,
                    L = ia.image.width * ia.repeat.x,
                    q = ia.image.height * ia.repeat.y,
                    j = (j + o) * L,
                    h = (h + p) * q,
                    i = (i + o) * L,
                    m = (m + p) * q,
                    k = (k + o) * L,
                    l = (l + p) * q;
                c -= a;
                d -= b;
                e -= a;
                f -= b;
                i -= j;
                m -= h;
                k -= j;
                l -= h;
                o = i * l - k * m;
                if (o == 0) {
                    if (ra[ia.id] == void 0) b = document.createElement("canvas"), b.width = ia.image.width, b.height = ia.image.height, a = b.getContext("2d"), a.drawImage(ia.image, 0, 0), ra[ia.id] = a.getImageData(0, 0, ia.image.width, ia.image.height).data, delete b;
                    b = ra[ia.id];
                    j = (Math.floor(j) + Math.floor(h) * ia.image.width) * 4;
                    X.setRGB(b[j] / 255, b[j + 1] / 255, b[j + 2] / 255);
                    Ca(X)
                } else o = 1 / o, ia = (l * c - m * e) * o, m = (l * d - m * f) * o, c = (i * e - k * c) * o, d = (i * f - k * d) * o, a = a - ia * j - c * h, j = b - m * j - d * h, n.save(), n.transform(ia, m, c, d, a, j), n.fill(), n.restore()
            }
        }

        function Fa(a, b, c, d, g, e, f, j, h, i, m, k, l) {
            var ia, o;
            ia = l.width - 1;
            o = l.height - 1;
            f *= ia;
            j *= o;
            h *= ia;
            i *= o;
            m *= ia;
            k *= o;
            c -= a;
            d -= b;
            g -= a;
            e -= b;
            h -= f;
            i -= j;
            m -= f;
            k -= j;
            o = 1 / (h * k - m * i);
            ia = (k * c - i * g) * o;
            i = (k * d - i * e) * o;
            c = (h * g - m * c) * o;
            d = (h * e - m * d) * o;
            a = a - ia * f - c * j;
            b = b - i * f - d * j;
            n.save();
            n.transform(ia, i, c, d, a, b);
            n.clip();
            n.drawImage(l, 0, 0);
            n.restore()
        }

        function Ha(a, b, c, d) {
            var g = ~~(a.r * 255),
                e = ~~(a.g * 255),
                a = ~~(a.b * 255),
                f = ~~(b.r * 255),
                j = ~~(b.g * 255),
                b = ~~(b.b * 255),
                h = ~~(c.r * 255),
                i = ~~(c.g * 255),
                c = ~~(c.b * 255),
                m = ~~(d.r * 255),
                k = ~~(d.g * 255),
                d = ~~(d.b * 255);
            ta[0] = g < 0 ? 0 : g > 255 ? 255 : g;
            ta[1] = e < 0 ? 0 : e > 255 ? 255 : e;
            ta[2] = a < 0 ? 0 : a > 255 ? 255 : a;
            ta[4] = f < 0 ? 0 : f > 255 ? 255 : f;
            ta[5] = j < 0 ? 0 : j > 255 ? 255 : j;
            ta[6] = b < 0 ? 0 : b > 255 ? 255 : b;
            ta[8] = h < 0 ? 0 : h > 255 ? 255 : h;
            ta[9] = i < 0 ? 0 : i > 255 ? 255 : i;
            ta[10] = c < 0 ? 0 : c > 255 ? 255 : c;
            ta[12] = m < 0 ? 0 : m > 255 ?
                255 : m;
            ta[13] = k < 0 ? 0 : k > 255 ? 255 : k;
            ta[14] = d < 0 ? 0 : d > 255 ? 255 : d;
            xa.putImageData(va, 0, 0);
            wa.drawImage(Y, 0, 0);
            return T
        }

        function B(a, b, c) {
            a = (a - b) / (c - b);
            return a * a * (3 - 2 * a)
        }

        function F(a) {
            a = (a + 1) * 0.5;
            return a < 0 ? 0 : a > 1 ? 1 : a
        }

        function Ea(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y,
                g = c * c + d * d;
            g != 0 && (g = 1 / Math.sqrt(g), c *= g, d *= g, b.x += c, b.y += d, a.x -= c, a.y -= d)
        }
        var Ja, La, sa, D;
        this.autoClear ? this.clear() : n.setTransform(1, 0, 0, -1, m, r);
        f.info.render.vertices = 0;
        f.info.render.faces = 0;
        e = l.projectScene(a, k, this.sortElements);
        h = e.elements;
        i = e.lights;
        (N = i.length > 0) && p(i);
        Ja = 0;
        for (La = h.length; Ja < La; Ja++)
            if (sa = h[Ja], D = sa.material, D = D instanceof THREE_M.MeshFaceMaterial ? sa.faceMaterial : D, !(D == null || D.opacity == 0)) {
                ha.empty();
                if (sa instanceof THREE_M.RenderableParticle) v = sa, v.x *= m, v.y *= r, q(v, sa, D, a);
                else if (sa instanceof THREE_M.RenderableLine) v = sa.v1, J = sa.v2, v.positionScreen.x *= m, v.positionScreen.y *= r, J.positionScreen.x *= m, J.positionScreen.y *= r, ha.addPoint(v.positionScreen.x, v.positionScreen.y), ha.addPoint(J.positionScreen.x, J.positionScreen.y), Q.intersects(ha) &&
                    t(v, J, sa, D, a);
                else if (sa instanceof THREE_M.RenderableFace3) v = sa.v1, J = sa.v2, s = sa.v3, v.positionScreen.x *= m, v.positionScreen.y *= r, J.positionScreen.x *= m, J.positionScreen.y *= r, s.positionScreen.x *= m, s.positionScreen.y *= r, D.overdraw && (Ea(v.positionScreen, J.positionScreen), Ea(J.positionScreen, s.positionScreen), Ea(s.positionScreen, v.positionScreen)), ha.add3Points(v.positionScreen.x, v.positionScreen.y, J.positionScreen.x, J.positionScreen.y, s.positionScreen.x, s.positionScreen.y), Q.intersects(ha) && w(v, J, s, 0, 1,
                    2, sa, D, a);
                else if (sa instanceof THREE_M.RenderableFace4) v = sa.v1, J = sa.v2, s = sa.v3, E = sa.v4, v.positionScreen.x *= m, v.positionScreen.y *= r, J.positionScreen.x *= m, J.positionScreen.y *= r, s.positionScreen.x *= m, s.positionScreen.y *= r, E.positionScreen.x *= m, E.positionScreen.y *= r, R.positionScreen.copy(J.positionScreen), U.positionScreen.copy(E.positionScreen), D.overdraw && (Ea(v.positionScreen, J.positionScreen), Ea(J.positionScreen, E.positionScreen), Ea(E.positionScreen, v.positionScreen), Ea(s.positionScreen, R.positionScreen),
                    Ea(s.positionScreen, U.positionScreen)), ha.addPoint(v.positionScreen.x, v.positionScreen.y), ha.addPoint(J.positionScreen.x, J.positionScreen.y), ha.addPoint(s.positionScreen.x, s.positionScreen.y), ha.addPoint(E.positionScreen.x, E.positionScreen.y), Q.intersects(ha) && Ma(v, J, s, E, R, U, sa, D, a);
                ea.addRectangle(ha)
            }
        n.setTransform(1, 0, 0, 1, 0, 0)
    }
};
THREE_M.SVGRenderer = function() {
    function a(a, b, c, d) {
        var g, e, f, h, i, m;
        g = 0;
        for (e = a.length; g < e; g++) f = a[g], h = f.color, f instanceof THREE_M.DirectionalLight ? (i = f.matrixWorld.getPosition(), m = c.dot(i), m <= 0 || (m *= f.intensity, d.r += h.r * m, d.g += h.g * m, d.b += h.b * m)) : f instanceof THREE_M.PointLight && (i = f.matrixWorld.getPosition(), m = c.dot(v.sub(i, b).normalize()), m <= 0 || (m *= f.distance == 0 ? 1 : 1 - Math.min(b.distanceTo(i) / f.distance, 1), m != 0 && (m *= f.intensity, d.r += h.r * m, d.g += h.g * m, d.b += h.b * m)))
    }

    function c(a) {
        J[a] == null && (J[a] = document.createElementNS("http://www.w3.org/2000/svg",
            "path"), K == 0 && J[a].setAttribute("shape-rendering", "crispEdges"));
        return J[a]
    }

    function b(a) {
        a = (a + 1) * 0.5;
        return a < 0 ? 0 : a > 1 ? 1 : a
    }
    var d = this,
        g, f, e, h = new THREE_M.Projector,
        i = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        l, k, o, p, m, r, n, q, t = new THREE_M.Rectangle,
        w = new THREE_M.Rectangle,
        u = !1,
        B = new THREE_M.Color,
        F = new THREE_M.Color,
        A = new THREE_M.Color,
        x = new THREE_M.Color,
        y, v = new THREE_M.Vector3,
        J = [],
        s = [],
        E, R, U, K = 1;
    this.domElement = i;
    this.sortElements = this.sortObjects = this.autoClear = !0;
    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    };
    this.setQuality = function(a) {
        switch (a) {
            case "high":
                K = 1;
                break;
            case "low":
                K = 0
        }
    };
    this.setSize = function(a, b) {
        l = a;
        k = b;
        o = l / 2;
        p = k / 2;
        i.setAttribute("viewBox", -o + " " + -p + " " + l + " " + k);
        i.setAttribute("width", l);
        i.setAttribute("height", k);
        t.set(-o, -p, o, p)
    };
    this.clear = function() {
        for (; i.childNodes.length > 0;) i.removeChild(i.childNodes[0])
    };
    this.render = function(k, l) {
        var J, v, G, I;
        this.autoClear && this.clear();
        d.info.render.vertices = 0;
        d.info.render.faces = 0;
        g = h.projectScene(k, l, this.sortElements);
        f = g.elements;
        e = g.lights;
        U = R = 0;
        if (u = e.length > 0) {
            F.setRGB(0, 0, 0);
            A.setRGB(0, 0, 0);
            x.setRGB(0, 0, 0);
            J = 0;
            for (v = e.length; J < v; J++) I = e[J], G = I.color, I instanceof THREE_M.AmbientLight ? (F.r += G.r, F.g += G.g, F.b += G.b) : I instanceof THREE_M.DirectionalLight ? (A.r += G.r, A.g += G.g, A.b += G.b) : I instanceof THREE_M.PointLight && (x.r += G.r, x.g += G.g, x.b += G.b)
        }
        J = 0;
        for (v = f.length; J < v; J++)
            if (G = f[J], I = G.material, I = I instanceof THREE_M.MeshFaceMaterial ? G.faceMaterial : I, !(I == null || I.opacity == 0))
                if (w.empty(), G instanceof THREE_M.RenderableParticle) m = G, m.x *=
                    o, m.y *= -p;
                else if (G instanceof THREE_M.RenderableLine) {
            if (m = G.v1, r = G.v2, m.positionScreen.x *= o, m.positionScreen.y *= -p, r.positionScreen.x *= o, r.positionScreen.y *= -p, w.addPoint(m.positionScreen.x, m.positionScreen.y), w.addPoint(r.positionScreen.x, r.positionScreen.y), t.intersects(w)) {
                G = m;
                var M = r,
                    S = U++;
                s[S] == null && (s[S] = document.createElementNS("http://www.w3.org/2000/svg", "line"), K == 0 && s[S].setAttribute("shape-rendering", "crispEdges"));
                E = s[S];
                E.setAttribute("x1", G.positionScreen.x);
                E.setAttribute("y1", G.positionScreen.y);
                E.setAttribute("x2", M.positionScreen.x);
                E.setAttribute("y2", M.positionScreen.y);
                I instanceof THREE_M.LineBasicMaterial && (E.setAttribute("style", "fill: none; stroke: " + I.color.getContextStyle() + "; stroke-width: " + I.linewidth + "; stroke-opacity: " + I.opacity + "; stroke-linecap: " + I.linecap + "; stroke-linejoin: " + I.linejoin), i.appendChild(E))
            }
        } else if (G instanceof THREE_M.RenderableFace3) {
            if (m = G.v1, r = G.v2, n = G.v3, m.positionScreen.x *= o, m.positionScreen.y *= -p, r.positionScreen.x *= o, r.positionScreen.y *= -p, n.positionScreen.x *=
                o, n.positionScreen.y *= -p, w.addPoint(m.positionScreen.x, m.positionScreen.y), w.addPoint(r.positionScreen.x, r.positionScreen.y), w.addPoint(n.positionScreen.x, n.positionScreen.y), t.intersects(w)) {
                var M = m,
                    S = r,
                    ba = n;
                d.info.render.vertices += 3;
                d.info.render.faces++;
                E = c(R++);
                E.setAttribute("d", "M " + M.positionScreen.x + " " + M.positionScreen.y + " L " + S.positionScreen.x + " " + S.positionScreen.y + " L " + ba.positionScreen.x + "," + ba.positionScreen.y + "z");
                I instanceof THREE_M.MeshBasicMaterial ? B.copy(I.color) : I instanceof THREE_M.MeshLambertMaterial ?
                    u ? (B.r = F.r, B.g = F.g, B.b = F.b, a(e, G.centroidWorld, G.normalWorld, B), B.r = Math.max(0, Math.min(I.color.r * B.r, 1)), B.g = Math.max(0, Math.min(I.color.g * B.g, 1)), B.b = Math.max(0, Math.min(I.color.b * B.b, 1))) : B.copy(I.color) : I instanceof THREE_M.MeshDepthMaterial ? (y = 1 - I.__2near / (I.__farPlusNear - G.z * I.__farMinusNear), B.setRGB(y, y, y)) : I instanceof THREE_M.MeshNormalMaterial && B.setRGB(b(G.normalWorld.x), b(G.normalWorld.y), b(G.normalWorld.z));
                I.wireframe ? E.setAttribute("style", "fill: none; stroke: " + B.getContextStyle() + "; stroke-width: " +
                    I.wireframeLinewidth + "; stroke-opacity: " + I.opacity + "; stroke-linecap: " + I.wireframeLinecap + "; stroke-linejoin: " + I.wireframeLinejoin) : E.setAttribute("style", "fill: " + B.getContextStyle() + "; fill-opacity: " + I.opacity);
                i.appendChild(E)
            }
        } else if (G instanceof THREE_M.RenderableFace4 && (m = G.v1, r = G.v2, n = G.v3, q = G.v4, m.positionScreen.x *= o, m.positionScreen.y *= -p, r.positionScreen.x *= o, r.positionScreen.y *= -p, n.positionScreen.x *= o, n.positionScreen.y *= -p, q.positionScreen.x *= o, q.positionScreen.y *= -p, w.addPoint(m.positionScreen.x,
                m.positionScreen.y), w.addPoint(r.positionScreen.x, r.positionScreen.y), w.addPoint(n.positionScreen.x, n.positionScreen.y), w.addPoint(q.positionScreen.x, q.positionScreen.y), t.intersects(w))) {
            var M = m,
                S = r,
                ba = n,
                W = q;
            d.info.render.vertices += 4;
            d.info.render.faces++;
            E = c(R++);
            E.setAttribute("d", "M " + M.positionScreen.x + " " + M.positionScreen.y + " L " + S.positionScreen.x + " " + S.positionScreen.y + " L " + ba.positionScreen.x + "," + ba.positionScreen.y + " L " + W.positionScreen.x + "," + W.positionScreen.y + "z");
            I instanceof THREE_M.MeshBasicMaterial ?
                B.copy(I.color) : I instanceof THREE_M.MeshLambertMaterial ? u ? (B.r = F.r, B.g = F.g, B.b = F.b, a(e, G.centroidWorld, G.normalWorld, B), B.r = Math.max(0, Math.min(I.color.r * B.r, 1)), B.g = Math.max(0, Math.min(I.color.g * B.g, 1)), B.b = Math.max(0, Math.min(I.color.b * B.b, 1))) : B.copy(I.color) : I instanceof THREE_M.MeshDepthMaterial ? (y = 1 - I.__2near / (I.__farPlusNear - G.z * I.__farMinusNear), B.setRGB(y, y, y)) : I instanceof THREE_M.MeshNormalMaterial && B.setRGB(b(G.normalWorld.x), b(G.normalWorld.y), b(G.normalWorld.z));
            I.wireframe ? E.setAttribute("style",
                "fill: none; stroke: " + B.getContextStyle() + "; stroke-width: " + I.wireframeLinewidth + "; stroke-opacity: " + I.opacity + "; stroke-linecap: " + I.wireframeLinecap + "; stroke-linejoin: " + I.wireframeLinejoin) : E.setAttribute("style", "fill: " + B.getContextStyle() + "; fill-opacity: " + I.opacity);
            i.appendChild(E)
        }
    }
};
THREE_M.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif",
    lights_lambert_vertex: "vLightWeighting = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n}\n#endif\nvLightWeighting = vLightWeighting * diffuse + ambient * ambientLightColor;",
    lights_phong_pars_vertex: "#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
    lights_phong_vertex: "#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif",
    lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDistance = lDistance;\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointDiffuseWeight = max( dot( normal, lVector ), 0.0 );\nfloat pointSpecularWeight = pow( pointDotNormalHalf, shininess );\n#ifdef PHYSICALLY_BASED_SHADING\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance;\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = pow( dirDotNormalHalf, shininess );\n#ifdef PHYSICALLY_BASED_SHADING\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform float shadowDarkness;\nuniform float shadowBias;\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_SOFT\nconst float xPixelOffset = 1.0 / SHADOWMAP_WIDTH;\nconst float yPixelOffset = 1.0 / SHADOWMAP_HEIGHT;\n#endif\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nshadowCoord.z += shadowBias;\nif ( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nfor ( float y = -1.25; y <= 1.25; y += 1.25 )\nfor ( float x = -1.25; x <= 1.25; x += 1.25 ) {\nvec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadow += 1.0;\n}\nshadow /= 9.0;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( shadowDarkness );\n#endif\n}\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE_M.UniformsUtils = {
    merge: function(a) {
        var c, b, d, g = {};
        for (c = 0; c < a.length; c++)
            for (b in d = this.clone(a[c]), d) g[b] = d[b];
        return g
    },
    clone: function(a) {
        var c, b, d, g = {};
        for (c in a)
            for (b in g[c] = {}, a[c]) d = a[c][b], g[c][b] = d instanceof THREE_M.Color || d instanceof THREE_M.Vector2 || d instanceof THREE_M.Vector3 || d instanceof THREE_M.Vector4 || d instanceof THREE_M.Matrix4 || d instanceof THREE_M.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
        return g
    }
};
THREE_M.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE_M.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE_M.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: 0.98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE_M.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE_M.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE_M.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: 6,
            texture: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        },
        shadowBias: {
            type: "f",
            value: 0.0039
        },
        shadowDarkness: {
            type: "f",
            value: 0.2
        }
    }
};
THREE_M.ShaderLib = {
    sprite: {
        vertexShader: "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    basic: {
        uniforms: THREE_M.UniformsUtils.merge([THREE_M.UniformsLib.common, THREE_M.UniformsLib.fog, THREE_M.UniformsLib.shadowmap]),
        vertexShader: [THREE_M.ShaderChunk.map_pars_vertex,
            THREE_M.ShaderChunk.lightmap_pars_vertex, THREE_M.ShaderChunk.envmap_pars_vertex, THREE_M.ShaderChunk.color_pars_vertex, THREE_M.ShaderChunk.skinning_pars_vertex, THREE_M.ShaderChunk.morphtarget_pars_vertex, THREE_M.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE_M.ShaderChunk.map_vertex, THREE_M.ShaderChunk.lightmap_vertex, THREE_M.ShaderChunk.envmap_vertex, THREE_M.ShaderChunk.color_vertex, THREE_M.ShaderChunk.skinning_vertex, THREE_M.ShaderChunk.morphtarget_vertex,
            THREE_M.ShaderChunk.default_vertex, THREE_M.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE_M.ShaderChunk.color_pars_fragment, THREE_M.ShaderChunk.map_pars_fragment, THREE_M.ShaderChunk.lightmap_pars_fragment, THREE_M.ShaderChunk.envmap_pars_fragment, THREE_M.ShaderChunk.fog_pars_fragment, THREE_M.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE_M.ShaderChunk.map_fragment, THREE_M.ShaderChunk.alphatest_fragment,
            THREE_M.ShaderChunk.lightmap_fragment, THREE_M.ShaderChunk.color_fragment, THREE_M.ShaderChunk.envmap_fragment, THREE_M.ShaderChunk.shadowmap_fragment, THREE_M.ShaderChunk.linear_to_gamma_fragment, THREE_M.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    lambert: {
        uniforms: THREE_M.UniformsUtils.merge([THREE_M.UniformsLib.common, THREE_M.UniformsLib.fog, THREE_M.UniformsLib.lights, THREE_M.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE_M.Color(328965)
            }
        }]),
        vertexShader: ["varying vec3 vLightWeighting;", THREE_M.ShaderChunk.map_pars_vertex,
            THREE_M.ShaderChunk.lightmap_pars_vertex, THREE_M.ShaderChunk.envmap_pars_vertex, THREE_M.ShaderChunk.lights_lambert_pars_vertex, THREE_M.ShaderChunk.color_pars_vertex, THREE_M.ShaderChunk.skinning_pars_vertex, THREE_M.ShaderChunk.morphtarget_pars_vertex, THREE_M.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE_M.ShaderChunk.map_vertex, THREE_M.ShaderChunk.lightmap_vertex, THREE_M.ShaderChunk.envmap_vertex, THREE_M.ShaderChunk.color_vertex, "vec3 transformedNormal = normalize( normalMatrix * normal );",
            THREE_M.ShaderChunk.lights_lambert_vertex, THREE_M.ShaderChunk.skinning_vertex, THREE_M.ShaderChunk.morphtarget_vertex, THREE_M.ShaderChunk.default_vertex, THREE_M.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vLightWeighting;", THREE_M.ShaderChunk.color_pars_fragment, THREE_M.ShaderChunk.map_pars_fragment, THREE_M.ShaderChunk.lightmap_pars_fragment, THREE_M.ShaderChunk.envmap_pars_fragment, THREE_M.ShaderChunk.fog_pars_fragment, THREE_M.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
            THREE_M.ShaderChunk.map_fragment, THREE_M.ShaderChunk.alphatest_fragment, "gl_FragColor.xyz = gl_FragColor.xyz * vLightWeighting;", THREE_M.ShaderChunk.lightmap_fragment, THREE_M.ShaderChunk.color_fragment, THREE_M.ShaderChunk.envmap_fragment, THREE_M.ShaderChunk.shadowmap_fragment, THREE_M.ShaderChunk.linear_to_gamma_fragment, THREE_M.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    phong: {
        uniforms: THREE_M.UniformsUtils.merge([THREE_M.UniformsLib.common, THREE_M.UniformsLib.fog, THREE_M.UniformsLib.lights, THREE_M.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE_M.Color(328965)
            },
            specular: {
                type: "c",
                value: new THREE_M.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            }
        }]),
        vertexShader: ["varying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE_M.ShaderChunk.map_pars_vertex, THREE_M.ShaderChunk.lightmap_pars_vertex, THREE_M.ShaderChunk.envmap_pars_vertex, THREE_M.ShaderChunk.lights_phong_pars_vertex, THREE_M.ShaderChunk.color_pars_vertex, THREE_M.ShaderChunk.skinning_pars_vertex, THREE_M.ShaderChunk.morphtarget_pars_vertex, THREE_M.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
            THREE_M.ShaderChunk.map_vertex, THREE_M.ShaderChunk.lightmap_vertex, THREE_M.ShaderChunk.envmap_vertex, THREE_M.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;\nvec3 transformedNormal = normalMatrix * normal;\nvNormal = transformedNormal;", THREE_M.ShaderChunk.lights_phong_vertex, THREE_M.ShaderChunk.skinning_vertex, THREE_M.ShaderChunk.morphtarget_vertex, THREE_M.ShaderChunk.default_vertex, THREE_M.ShaderChunk.shadowmap_vertex,
            "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;", THREE_M.ShaderChunk.color_pars_fragment, THREE_M.ShaderChunk.map_pars_fragment, THREE_M.ShaderChunk.lightmap_pars_fragment, THREE_M.ShaderChunk.envmap_pars_fragment, THREE_M.ShaderChunk.fog_pars_fragment, THREE_M.ShaderChunk.lights_phong_pars_fragment, THREE_M.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE_M.ShaderChunk.map_fragment,
            THREE_M.ShaderChunk.alphatest_fragment, THREE_M.ShaderChunk.lights_phong_fragment, THREE_M.ShaderChunk.lightmap_fragment, THREE_M.ShaderChunk.color_fragment, THREE_M.ShaderChunk.envmap_fragment, THREE_M.ShaderChunk.shadowmap_fragment, THREE_M.ShaderChunk.linear_to_gamma_fragment, THREE_M.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    particle_basic: {
        uniforms: THREE_M.UniformsUtils.merge([THREE_M.UniformsLib.particle, THREE_M.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE_M.ShaderChunk.color_pars_vertex,
            THREE_M.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE_M.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE_M.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE_M.ShaderChunk.color_pars_fragment, THREE_M.ShaderChunk.map_particle_pars_fragment,
            THREE_M.ShaderChunk.fog_pars_fragment, THREE_M.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE_M.ShaderChunk.map_particle_fragment, THREE_M.ShaderChunk.alphatest_fragment, THREE_M.ShaderChunk.color_fragment, THREE_M.ShaderChunk.shadowmap_fragment, THREE_M.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE_M.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE_M.ShaderChunk.morphtarget_vertex,
            THREE_M.ShaderChunk.default_vertex, "}"
        ].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
};
THREE_M.WebGLRenderer = function(a) {
    function c(a, b) {
        var c = a.vertices.length,
            d = b.material;
        if (d.attributes) {
            if (a.__webglCustomAttributesList === void 0) a.__webglCustomAttributesList = [];
            for (var g in d.attributes) {
                var f = d.attributes[g];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = !0;
                    var e = 1;
                    f.type === "v2" ? e = 2 : f.type === "v3" ? e = 3 : f.type === "v4" ? e = 4 : f.type === "c" && (e = 3);
                    f.size = e;
                    f.array = new Float32Array(c * e);
                    f.buffer = j.createBuffer();
                    f.buffer.belongsToAttribute = g;
                    f.needsUpdate = !0
                }
                a.__webglCustomAttributesList.push(f)
            }
        }
    }

    function b(a, b) {
        if (a.material && !(a.material instanceof THREE_M.MeshFaceMaterial)) return a.material;
        else if (b.materialIndex >= 0) return a.geometry.materials[b.materialIndex]
    }

    function d(a) {
        if (a instanceof THREE_M.MeshBasicMaterial && !a.envMap || a instanceof THREE_M.MeshDepthMaterial) return !1;
        return a && a.shading !== void 0 && a.shading === THREE_M.SmoothShading ? THREE_M.SmoothShading : THREE_M.FlatShading
    }

    function g(a) {
        if (a.vertexColors) return a.vertexColors;
        return !1
    }

    function f(a) {
        if (a.map || a.lightMap || a instanceof THREE_M.ShaderMaterial) return !0;
        return !1
    }

    function e(a, b, c) {
        var d, g, f, e, h = a.vertices;
        e = h.length;
        var i = a.colors,
            m = i.length,
            k = a.__vertexArray,
            n = a.__colorArray,
            l = a.__sortArray,
            o = a.__dirtyVertices,
            p = a.__dirtyColors,
            L = a.__webglCustomAttributesList;
        if (c.sortParticles) {
            N.multiplySelf(c.matrixWorld);
            for (d = 0; d < e; d++) g = h[d].position, ma.copy(g), N.multiplyVector3(ma), l[d] = [ma.z, d];
            l.sort(function(a, b) {
                return b[0] - a[0]
            });
            for (d = 0; d < e; d++) g = h[l[d][1]].position, f = d * 3, k[f] = g.x, k[f + 1] = g.y, k[f + 2] = g.z;
            for (d = 0; d < m; d++) f = d * 3, g = i[l[d][1]], n[f] = g.r, n[f +
                1] = g.g, n[f + 2] = g.b;
            if (L) {
                i = 0;
                for (m = L.length; i < m; i++)
                    if (h = L[i], h.boundTo === void 0 || h.boundTo === "vertices")
                        if (f = 0, g = h.value.length, h.size === 1)
                            for (d = 0; d < g; d++) e = l[d][1], h.array[d] = h.value[e];
                        else if (h.size === 2)
                    for (d = 0; d < g; d++) e = l[d][1], e = h.value[e], h.array[f] = e.x, h.array[f + 1] = e.y, f += 2;
                else if (h.size === 3)
                    if (h.type === "c")
                        for (d = 0; d < g; d++) e = l[d][1], e = h.value[e], h.array[f] = e.r, h.array[f + 1] = e.g, h.array[f + 2] = e.b, f += 3;
                    else
                        for (d = 0; d < g; d++) e = l[d][1], e = h.value[e], h.array[f] = e.x, h.array[f + 1] = e.y, h.array[f + 2] = e.z,
                            f += 3;
                else if (h.size === 4)
                    for (d = 0; d < g; d++) e = l[d][1], e = h.value[e], h.array[f] = e.x, h.array[f + 1] = e.y, h.array[f + 2] = e.z, h.array[f + 3] = e.w, f += 4
            }
        } else {
            if (o)
                for (d = 0; d < e; d++) g = h[d].position, f = d * 3, k[f] = g.x, k[f + 1] = g.y, k[f + 2] = g.z;
            if (p)
                for (d = 0; d < m; d++) g = i[d], f = d * 3, n[f] = g.r, n[f + 1] = g.g, n[f + 2] = g.b;
            if (L) {
                i = 0;
                for (m = L.length; i < m; i++)
                    if (h = L[i], h.needsUpdate && (h.boundTo === void 0 || h.boundTo === "vertices"))
                        if (g = h.value.length, f = 0, h.size === 1)
                            for (d = 0; d < g; d++) h.array[d] = h.value[d];
                        else if (h.size === 2)
                    for (d = 0; d < g; d++) e = h.value[d],
                        h.array[f] = e.x, h.array[f + 1] = e.y, f += 2;
                else if (h.size === 3)
                    if (h.type === "c")
                        for (d = 0; d < g; d++) e = h.value[d], h.array[f] = e.r, h.array[f + 1] = e.g, h.array[f + 2] = e.b, f += 3;
                    else
                        for (d = 0; d < g; d++) e = h.value[d], h.array[f] = e.x, h.array[f + 1] = e.y, h.array[f + 2] = e.z, f += 3;
                else if (h.size === 4)
                    for (d = 0; d < g; d++) e = h.value[d], h.array[f] = e.x, h.array[f + 1] = e.y, h.array[f + 2] = e.z, h.array[f + 3] = e.w, f += 4
            }
        }
        if (o || c.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, a.__webglVertexBuffer), j.bufferData(j.ARRAY_BUFFER, k, b);
        if (p || c.sortParticles) j.bindBuffer(j.ARRAY_BUFFER,
            a.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, n, b);
        if (L) {
            i = 0;
            for (m = L.length; i < m; i++)
                if (h = L[i], h.needsUpdate || c.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, h.buffer), j.bufferData(j.ARRAY_BUFFER, h.array, b)
        }
    }

    function h(a, b, c) {
        if (!a.__webglVertexBuffer) a.__webglVertexBuffer = j.createBuffer();
        if (!a.__webglNormalBuffer) a.__webglNormalBuffer = j.createBuffer();
        a.hasPos && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglVertexBuffer), j.bufferData(j.ARRAY_BUFFER, a.positionArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.position),
            j.vertexAttribPointer(b.attributes.position, 3, j.FLOAT, !1, 0, 0));
        if (a.hasNormal) {
            j.bindBuffer(j.ARRAY_BUFFER, a.__webglNormalBuffer);
            if (c === THREE_M.FlatShading) {
                var d, g, f, e, h, i, m, k, n, l, o = a.count * 3;
                for (l = 0; l < o; l += 9) c = a.normalArray, d = c[l], g = c[l + 1], f = c[l + 2], e = c[l + 3], i = c[l + 4], k = c[l + 5], h = c[l + 6], m = c[l + 7], n = c[l + 8], d = (d + e + h) / 3, g = (g + i + m) / 3, f = (f + k + n) / 3, c[l] = d, c[l + 1] = g, c[l + 2] = f, c[l + 3] = d, c[l + 4] = g, c[l + 5] = f, c[l + 6] = d, c[l + 7] = g, c[l + 8] = f
            }
            j.bufferData(j.ARRAY_BUFFER, a.normalArray, j.DYNAMIC_DRAW);
            j.enableVertexAttribArray(b.attributes.normal);
            j.vertexAttribPointer(b.attributes.normal, 3, j.FLOAT, !1, 0, 0)
        }
        j.drawArrays(j.TRIANGLES, 0, a.count);
        a.count = 0
    }

    function i(a, b, c, d, g, f) {
        if (d.opacity !== 0) {
            var e, h, c = u(a, b, c, d, f),
                b = c.attributes,
                a = !1,
                c = g.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
            c !== $ && ($ = c, a = !0);
            if (!d.morphTargets && b.position >= 0) a && (j.bindBuffer(j.ARRAY_BUFFER, g.__webglVertexBuffer), j.vertexAttribPointer(b.position, 3, j.FLOAT, !1, 0, 0));
            else if (f.morphTargetBase) {
                c = d.program.attributes;
                f.morphTargetBase !== -1 ? (j.bindBuffer(j.ARRAY_BUFFER, g.__webglMorphTargetsBuffers[f.morphTargetBase]),
                    j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0)) : c.position >= 0 && (j.bindBuffer(j.ARRAY_BUFFER, g.__webglVertexBuffer), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0));
                if (f.morphTargetForcedOrder.length) {
                    e = 0;
                    var i = f.morphTargetForcedOrder;
                    for (h = f.morphTargetInfluences; e < d.numSupportedMorphTargets && e < i.length;) j.bindBuffer(j.ARRAY_BUFFER, g.__webglMorphTargetsBuffers[i[e]]), j.vertexAttribPointer(c["morphTarget" + e], 3, j.FLOAT, !1, 0, 0), f.__webglMorphTargetInfluences[e] = h[i[e]], e++
                } else {
                    var i = [],
                        m = -1,
                        l = 0;
                    h = f.morphTargetInfluences;
                    var k, n = h.length;
                    e = 0;
                    for (f.morphTargetBase !== -1 && (i[f.morphTargetBase] = !0); e < d.numSupportedMorphTargets;) {
                        for (k = 0; k < n; k++) !i[k] && h[k] > m && (l = k, m = h[l]);
                        j.bindBuffer(j.ARRAY_BUFFER, g.__webglMorphTargetsBuffers[l]);
                        j.vertexAttribPointer(c["morphTarget" + e], 3, j.FLOAT, !1, 0, 0);
                        f.__webglMorphTargetInfluences[e] = m;
                        i[l] = 1;
                        m = -1;
                        e++
                    }
                }
                d.program.uniforms.morphTargetInfluences !== null && j.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
            }
            if (a) {
                if (g.__webglCustomAttributesList) {
                    e =
                        0;
                    for (h = g.__webglCustomAttributesList.length; e < h; e++) c = g.__webglCustomAttributesList[e], b[c.buffer.belongsToAttribute] >= 0 && (j.bindBuffer(j.ARRAY_BUFFER, c.buffer), j.vertexAttribPointer(b[c.buffer.belongsToAttribute], c.size, j.FLOAT, !1, 0, 0))
                }
                b.color >= 0 && (j.bindBuffer(j.ARRAY_BUFFER, g.__webglColorBuffer), j.vertexAttribPointer(b.color, 3, j.FLOAT, !1, 0, 0));
                b.normal >= 0 && (j.bindBuffer(j.ARRAY_BUFFER, g.__webglNormalBuffer), j.vertexAttribPointer(b.normal, 3, j.FLOAT, !1, 0, 0));
                b.tangent >= 0 && (j.bindBuffer(j.ARRAY_BUFFER,
                    g.__webglTangentBuffer), j.vertexAttribPointer(b.tangent, 4, j.FLOAT, !1, 0, 0));
                b.uv >= 0 && (g.__webglUVBuffer ? (j.bindBuffer(j.ARRAY_BUFFER, g.__webglUVBuffer), j.vertexAttribPointer(b.uv, 2, j.FLOAT, !1, 0, 0), j.enableVertexAttribArray(b.uv)) : j.disableVertexAttribArray(b.uv));
                b.uv2 >= 0 && (g.__webglUV2Buffer ? (j.bindBuffer(j.ARRAY_BUFFER, g.__webglUV2Buffer), j.vertexAttribPointer(b.uv2, 2, j.FLOAT, !1, 0, 0), j.enableVertexAttribArray(b.uv2)) : j.disableVertexAttribArray(b.uv2));
                d.skinning && b.skinVertexA >= 0 && b.skinVertexB >=
                    0 && b.skinIndex >= 0 && b.skinWeight >= 0 && (j.bindBuffer(j.ARRAY_BUFFER, g.__webglSkinVertexABuffer), j.vertexAttribPointer(b.skinVertexA, 4, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, g.__webglSkinVertexBBuffer), j.vertexAttribPointer(b.skinVertexB, 4, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, g.__webglSkinIndicesBuffer), j.vertexAttribPointer(b.skinIndex, 4, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, g.__webglSkinWeightsBuffer), j.vertexAttribPointer(b.skinWeight, 4, j.FLOAT, !1, 0, 0))
            }
            f instanceof THREE_M.Mesh ? (d.wireframe ?
                (d = d.wireframeLinewidth, d !== Ba && (j.lineWidth(d), Ba = d), a && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, g.__webglLineBuffer), j.drawElements(j.LINES, g.__webglLineCount, j.UNSIGNED_SHORT, 0)) : (a && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, g.__webglFaceBuffer), j.drawElements(j.TRIANGLES, g.__webglFaceCount, j.UNSIGNED_SHORT, 0)), W.info.render.calls++, W.info.render.vertices += g.__webglFaceCount, W.info.render.faces += g.__webglFaceCount / 3) : f instanceof THREE_M.Line ? (f = f.type === THREE_M.LineStrip ? j.LINE_STRIP : j.LINES, d = d.linewidth, d !==
                Ba && (j.lineWidth(d), Ba = d), j.drawArrays(f, 0, g.__webglLineCount), W.info.render.calls++) : f instanceof THREE_M.ParticleSystem ? (j.drawArrays(j.POINTS, 0, g.__webglParticleCount), W.info.render.calls++) : f instanceof THREE_M.Ribbon && (j.drawArrays(j.TRIANGLE_STRIP, 0, g.__webglVertexCount), W.info.render.calls++)
        }
    }

    function l(a) {
        ha[0].set(a.n41 - a.n11, a.n42 - a.n12, a.n43 - a.n13, a.n44 - a.n14);
        ha[1].set(a.n41 + a.n11, a.n42 + a.n12, a.n43 + a.n13, a.n44 + a.n14);
        ha[2].set(a.n41 + a.n21, a.n42 + a.n22, a.n43 + a.n23, a.n44 + a.n24);
        ha[3].set(a.n41 -
            a.n21, a.n42 - a.n22, a.n43 - a.n23, a.n44 - a.n24);
        ha[4].set(a.n41 - a.n31, a.n42 - a.n32, a.n43 - a.n33, a.n44 - a.n34);
        ha[5].set(a.n41 + a.n31, a.n42 + a.n32, a.n43 + a.n33, a.n44 + a.n34);
        for (var b, a = 0; a < 6; a++) b = ha[a], b.divideScalar(Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z))
    }

    function k(a) {
        for (var b = a.matrixWorld, c = -a.geometry.boundingSphere.radius * Math.max(a.scale.x, Math.max(a.scale.y, a.scale.z)), d = 0; d < 6; d++)
            if (a = ha[d].x * b.n14 + ha[d].y * b.n24 + ha[d].z * b.n34 + ha[d].w, a <= c) return !1;
        return !0
    }

    function o(a, b) {
        return b.z - a.z
    }

    function p(a) {
        var b,
            c, d, g, f, e, m, n, o = 0,
            p = a.lights;
        Y || (Y = new THREE_M.PerspectiveCamera(W.shadowCameraFov, W.shadowMapWidth / W.shadowMapHeight, W.shadowCameraNear, W.shadowCameraFar));
        b = 0;
        for (c = p.length; b < c; b++)
            if (n = p[b], n.castShadow && n instanceof THREE_M.SpotLight) {
                ga = -1;
                W.shadowMap[o] || (W.shadowMap[o] = new THREE_M.WebGLRenderTarget(W.shadowMapWidth, W.shadowMapHeight, {
                    minFilter: THREE_M.LinearFilter,
                    magFilter: THREE_M.LinearFilter,
                    format: THREE_M.RGBAFormat
                }), xa[o] = new THREE_M.Matrix4);
                d = W.shadowMap[o];
                g = xa[o];
                Y.position.copy(n.position);
                Y.lookAt(n.target.position);
                Y.parent == null && (console.warn("Camera is not on the Scene. Adding it..."), a.add(Y), this.autoUpdateScene && a.updateMatrixWorld());
                Y.matrixWorldInverse.getInverse(Y.matrixWorld);
                g.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
                g.multiplySelf(Y.projectionMatrix);
                g.multiplySelf(Y.matrixWorldInverse);
                Y.matrixWorldInverse.flattenToArray(la);
                Y.projectionMatrix.flattenToArray(ca);
                N.multiply(Y.projectionMatrix, Y.matrixWorldInverse);
                l(N);
                U(d);
                j.clearColor(1, 1, 1, 1);
                W.clear();
                j.clearColor(M.r, M.g, M.b, S);
                g = a.__webglObjects.length;
                for (d = 0; d < g; d++)
                    if (e = a.__webglObjects[d], n = e.object, e.render = !1, n.visible && n.castShadow && (!(n instanceof THREE_M.Mesh) || !n.frustumCulled || k(n))) n.matrixWorld.flattenToArray(n._objectMatrixArray), B(n, Y, !1), e.render = !0;
                A(!0);
                v(THREE_M.NormalBlending);
                for (d = 0; d < g; d++)
                    if (e = a.__webglObjects[d], e.render) n = e.object, e = e.buffer, F(n), m = n.customDepthMaterial ? n.customDepthMaterial : n.geometry.morphTargets.length ? ta : va, i(Y, p, null, m, e, n);
                g = a.__webglObjectsImmediate.length;
                for (d = 0; d < g; d++) e = a.__webglObjectsImmediate[d],
                    n = e.object, n.visible && n.castShadow && (n.matrixAutoUpdate && n.matrixWorld.flattenToArray(n._objectMatrixArray), $ = -1, B(n, Y, !1), F(n), f = u(Y, p, null, va, n), n.immediateRenderCallback ? n.immediateRenderCallback(f, j, ha) : n.render(function(a) {
                        h(a, f, va.shading)
                    }));
                o++
            }
    }

    function m(a, b, c, d, g, f, e, h) {
        var j, m, n, l;
        b ? (m = a.length - 1, l = b = -1) : (m = 0, b = a.length, l = 1);
        for (var k = m; k !== b; k += l)
            if (j = a[k], j.render) {
                m = j.object;
                n = j.buffer;
                if (h) j = h;
                else {
                    j = j[c];
                    if (!j) continue;
                    e && v(j.blending);
                    A(j.depthTest);
                    x(j.depthWrite);
                    y(j.polygonOffset,
                        j.polygonOffsetFactor, j.polygonOffsetUnits)
                }
                F(m);
                i(d, g, f, j, n, m)
            }
    }

    function r(a, b, c, d, g, f, e) {
        for (var i, m, n, l, k = 0, o = a.length; k < o; k++)
            if (i = a[k], m = i.object, m.visible) {
                $ = -1;
                if (e) n = e;
                else {
                    n = i[b];
                    if (!n) continue;
                    f && v(n.blending);
                    A(n.depthTest);
                    x(n.depthWrite);
                    y(n.polygonOffset, n.polygonOffsetFactor, n.polygonOffsetUnits)
                }
                F(m);
                l = u(c, d, g, n, m);
                m.immediateRenderCallback ? m.immediateRenderCallback(l, j, ha) : m.render(function(a) {
                    h(a, l, n.shading)
                })
            }
    }

    function n(a, b, c) {
        a.push({
            buffer: b,
            object: c,
            opaque: null,
            transparent: null
        })
    }

    function q(a) {
        for (var b in a.attributes)
            if (a.attributes[b].needsUpdate) return !0;
        return !1
    }

    function t(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = !1
    }

    function w(a, b) {
        for (var c = a.length - 1; c >= 0; c--) a[c].object === b && a.splice(c, 1)
    }

    function u(a, b, c, d, g) {
        d.program || W.initMaterial(d, b, c, g);
        if (d.morphTargets && !g.__webglMorphTargetInfluences) {
            g.__webglMorphTargetInfluences = new Float32Array(W.maxMorphTargets);
            for (var f = 0, e = W.maxMorphTargets; f < e; f++) g.__webglMorphTargetInfluences[f] = 0
        }
        var h = !1,
            f = d.program,
            e = f.uniforms,
            i = d.uniforms;
        f !== V && (j.useProgram(f), V = f, h = !0);
        if (d.id !== ga) ga = d.id, h = !0;
        if (h) {
            j.uniformMatrix4fv(e.projectionMatrix, !1, ca);
            if (c && d.fog)
                if (i.fogColor.value = c.color, c instanceof THREE_M.Fog) i.fogNear.value = c.near, i.fogFar.value = c.far;
                else if (c instanceof THREE_M.FogExp2) i.fogDensity.value = c.density;
            if (d instanceof THREE_M.MeshPhongMaterial || d instanceof THREE_M.MeshLambertMaterial || d.lights) {
                for (var m, n, l = 0, k = 0, o = 0, p, L, q, r = fa, t = r.directional.colors, Q = r.directional.positions, Z = r.point.colors, w =
                        r.point.positions, u = r.point.distances, J = 0, ea = 0, c = m = q = 0, h = b.length; c < h; c++)
                    if (m = b[c], n = m.color, p = m.position, L = m.intensity, q = m.distance, m instanceof THREE_M.AmbientLight) W.gammaInput ? (l += n.r * n.r, k += n.g * n.g, o += n.b * n.b) : (l += n.r, k += n.g, o += n.b);
                    else if (m instanceof THREE_M.DirectionalLight) q = J * 3, W.gammaInput ? (t[q] = n.r * n.r * L * L, t[q + 1] = n.g * n.g * L * L, t[q + 2] = n.b * n.b * L * L) : (t[q] = n.r * L, t[q + 1] = n.g * L, t[q + 2] = n.b * L), Q[q] = p.x, Q[q + 1] = p.y, Q[q + 2] = p.z, J += 1;
                else if (m instanceof THREE_M.SpotLight) q = J * 3, W.gammaInput ? (t[q] = n.r * n.r *
                    L * L, t[q + 1] = n.g * n.g * L * L, t[q + 2] = n.b * n.b * L * L) : (t[q] = n.r * L, t[q + 1] = n.g * L, t[q + 2] = n.b * L), n = 1 / p.length(), Q[q] = p.x * n, Q[q + 1] = p.y * n, Q[q + 2] = p.z * n, J += 1;
                else if (m instanceof THREE_M.PointLight) m = ea * 3, W.gammaInput ? (Z[m] = n.r * n.r * L * L, Z[m + 1] = n.g * n.g * L * L, Z[m + 2] = n.b * n.b * L * L) : (Z[m] = n.r * L, Z[m + 1] = n.g * L, Z[m + 2] = n.b * L), w[m] = p.x, w[m + 1] = p.y, w[m + 2] = p.z, u[ea] = q, ea += 1;
                c = J * 3;
                for (h = t.length; c < h; c++) t[c] = 0;
                c = ea * 3;
                for (h = Z.length; c < h; c++) Z[c] = 0;
                r.point.length = ea;
                r.directional.length = J;
                r.ambient[0] = l;
                r.ambient[1] = k;
                r.ambient[2] = o;
                b = fa;
                i.ambientLightColor.value = b.ambient;
                i.directionalLightColor.value = b.directional.colors;
                i.directionalLightDirection.value = b.directional.positions;
                i.pointLightColor.value = b.point.colors;
                i.pointLightPosition.value = b.point.positions;
                i.pointLightDistance.value = b.point.distances
            }
            if (d instanceof THREE_M.MeshBasicMaterial || d instanceof THREE_M.MeshLambertMaterial || d instanceof THREE_M.MeshPhongMaterial) i.opacity.value = d.opacity, W.gammaInput ? i.diffuse.value.copyGammaToLinear(d.color) : i.diffuse.value = d.color, (i.map.texture =
                d.map) && i.offsetRepeat.value.set(d.map.offset.x, d.map.offset.y, d.map.repeat.x, d.map.repeat.y), i.lightMap.texture = d.lightMap, i.envMap.texture = d.envMap, i.flipEnvMap.value = d.envMap instanceof THREE_M.WebGLRenderTargetCube ? 1 : -1, i.reflectivity.value = d.reflectivity, i.refractionRatio.value = d.refractionRatio, i.combine.value = d.combine, i.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE_M.CubeRefractionMapping;
            if (d instanceof THREE_M.LineBasicMaterial) i.diffuse.value = d.color, i.opacity.value = d.opacity;
            else if (d instanceof THREE_M.ParticleBasicMaterial) i.psColor.value = d.color, i.opacity.value = d.opacity, i.size.value = d.size, i.scale.value = O.height / 2, i.map.texture = d.map;
            else if (d instanceof THREE_M.MeshPhongMaterial) i.shininess.value = d.shininess, W.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.specular.value.copyGammaToLinear(d.specular)) : (i.ambient.value = d.ambient, i.specular.value = d.specular);
            else if (d instanceof THREE_M.MeshLambertMaterial) W.gammaInput ? i.ambient.value.copyGammaToLinear(d.ambient) :
                i.ambient.value = d.ambient;
            else if (d instanceof THREE_M.MeshDepthMaterial) i.mNear.value = a.near, i.mFar.value = a.far, i.opacity.value = d.opacity;
            else if (d instanceof THREE_M.MeshNormalMaterial) i.opacity.value = d.opacity;
            if (g.receiveShadow && !d._shadowPass && i.shadowMatrix) {
                for (b = 0; b < xa.length; b++) i.shadowMatrix.value[b] = xa[b], i.shadowMap.texture[b] = W.shadowMap[b];
                i.shadowDarkness.value = W.shadowMapDarkness;
                i.shadowBias.value = W.shadowMapBias
            }
            b = d.uniformsList;
            i = 0;
            for (c = b.length; i < c; i++)
                if (k = f.uniforms[b[i][1]])
                    if (l =
                        b[i][0], o = l.type, h = l.value, o === "i") j.uniform1i(k, h);
                    else if (o === "f") j.uniform1f(k, h);
            else if (o === "v2") j.uniform2f(k, h.x, h.y);
            else if (o === "v3") j.uniform3f(k, h.x, h.y, h.z);
            else if (o === "v4") j.uniform4f(k, h.x, h.y, h.z, h.w);
            else if (o === "c") j.uniform3f(k, h.r, h.g, h.b);
            else if (o === "fv1") j.uniform1fv(k, h);
            else if (o === "fv") j.uniform3fv(k, h);
            else if (o === "v3v") {
                if (!l._array) l._array = new Float32Array(3 * h.length);
                o = 0;
                for (p = h.length; o < p; o++) r = o * 3, l._array[r] = h[o].x, l._array[r + 1] = h[o].y, l._array[r + 2] = h[o].z;
                j.uniform3fv(k,
                    l._array)
            } else if (o === "m4") {
                if (!l._array) l._array = new Float32Array(16);
                h.flattenToArray(l._array);
                j.uniformMatrix4fv(k, !1, l._array)
            } else if (o === "m4v") {
                if (!l._array) l._array = new Float32Array(16 * h.length);
                o = 0;
                for (p = h.length; o < p; o++) h[o].flattenToArrayOffset(l._array, o * 16);
                j.uniformMatrix4fv(k, !1, l._array)
            } else if (o === "t") {
                if (j.uniform1i(k, h), k = l.texture)
                    if (k.image instanceof Array && k.image.length === 6) {
                        if (l = k, l.image.length === 6)
                            if (l.needsUpdate) {
                                if (!l.image.__webglTextureCube) l.image.__webglTextureCube =
                                    j.createTexture();
                                j.activeTexture(j.TEXTURE0 + h);
                                j.bindTexture(j.TEXTURE_CUBE_MAP, l.image.__webglTextureCube);
                                h = s(j.TEXTURE_CUBE_MAP, l, l.image[0]);
                                for (k = 0; k < 6; k++) j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + k, 0, j.RGBA, j.RGBA, j.UNSIGNED_BYTE, l.image[k]);
                                h && j.generateMipmap(j.TEXTURE_CUBE_MAP);
                                l.needsUpdate = !1
                            } else j.activeTexture(j.TEXTURE0 + h), j.bindTexture(j.TEXTURE_CUBE_MAP, l.image.__webglTextureCube)
                    } else k instanceof THREE_M.WebGLRenderTargetCube ? (l = k, j.activeTexture(j.TEXTURE0 + h), j.bindTexture(j.TEXTURE_CUBE_MAP,
                        l.__webglTexture)) : E(k, h)
            } else if (o === "tv") {
                if (!l._array) {
                    l._array = [];
                    o = 0;
                    for (p = l.texture.length; o < p; o++) l._array[o] = h + o
                }
                j.uniform1iv(k, l._array);
                o = 0;
                for (p = l.texture.length; o < p; o++)(k = l.texture[o]) && E(k, l._array[o])
            }(d instanceof THREE_M.ShaderMaterial || d instanceof THREE_M.MeshPhongMaterial || d.envMap) && e.cameraPosition !== null && j.uniform3f(e.cameraPosition, a.position.x, a.position.y, a.position.z);
            (d instanceof THREE_M.MeshPhongMaterial || d instanceof THREE_M.MeshLambertMaterial || d instanceof THREE_M.ShaderMaterial ||
                d.skinning) && e.viewMatrix !== null && j.uniformMatrix4fv(e.viewMatrix, !1, la);
            d.skinning && (j.uniformMatrix4fv(e.cameraInverseMatrix, !1, la), j.uniformMatrix4fv(e.boneGlobalMatrices, !1, g.boneMatrices))
        }
        j.uniformMatrix4fv(e.modelViewMatrix, !1, g._modelViewMatrixArray);
        e.normalMatrix && j.uniformMatrix3fv(e.normalMatrix, !1, g._normalMatrixArray);
        (d instanceof THREE_M.ShaderMaterial || d.envMap || d.skinning || g.receiveShadow) && e.objectMatrix !== null && j.uniformMatrix4fv(e.objectMatrix, !1, g._objectMatrixArray);
        return f
    }

    function B(a, b, c) {
        a._modelViewMatrix.multiplyToArray(b.matrixWorldInverse, a.matrixWorld, a._modelViewMatrixArray);
        c && THREE_M.Matrix4.makeInvert3x3(a._modelViewMatrix).transposeIntoArray(a._normalMatrixArray)
    }

    function F(a) {
        if (ra !== a.doubleSided) a.doubleSided ? j.disable(j.CULL_FACE) : j.enable(j.CULL_FACE), ra = a.doubleSided;
        if (qa !== a.flipSided) a.flipSided ? j.frontFace(j.CW) : j.frontFace(j.CCW), qa = a.flipSided
    }

    function A(a) {
        oa !== a && (a ? j.enable(j.DEPTH_TEST) : j.disable(j.DEPTH_TEST), oa = a)
    }

    function x(a) {
        pa !== a &&
            (j.depthMask(a), pa = a)
    }

    function y(a, b, c) {
        Da !== a && (a ? j.enable(j.POLYGON_OFFSET_FILL) : j.disable(j.POLYGON_OFFSET_FILL), Da = a);
        if (a && (za !== b || Aa !== c)) j.polygonOffset(b, c), za = b, Aa = c
    }

    function v(a) {
        if (a !== na) {
            switch (a) {
                case THREE_M.AdditiveBlending:
                    j.blendEquation(j.FUNC_ADD);
                    j.blendFunc(j.SRC_ALPHA, j.ONE);
                    break;
                case THREE_M.SubtractiveBlending:
                    j.blendEquation(j.FUNC_ADD);
                    j.blendFunc(j.ZERO, j.ONE_MINUS_SRC_COLOR);
                    break;
                case THREE_M.MultiplyBlending:
                    j.blendEquation(j.FUNC_ADD);
                    j.blendFunc(j.ZERO, j.SRC_COLOR);
                    break;
                default:
                    j.blendEquationSeparate(j.FUNC_ADD, j.FUNC_ADD), j.blendFuncSeparate(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA, j.ONE, j.ONE_MINUS_SRC_ALPHA)
            }
            na = a
        }
    }

    function J(a, b) {
        var c;
        a === "fragment" ? c = j.createShader(j.FRAGMENT_SHADER) : a === "vertex" && (c = j.createShader(j.VERTEX_SHADER));
        j.shaderSource(c, b);
        j.compileShader(c);
        if (!j.getShaderParameter(c, j.COMPILE_STATUS)) return console.error(j.getShaderInfoLog(c)), console.error(b), null;
        return c
    }

    function s(a, b, c) {
        return (c.width & c.width - 1) === 0 && (c.height & c.height - 1) === 0 ?
            (j.texParameteri(a, j.TEXTURE_WRAP_S, P(b.wrapS)), j.texParameteri(a, j.TEXTURE_WRAP_T, P(b.wrapT)), j.texParameteri(a, j.TEXTURE_MAG_FILTER, P(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, P(b.minFilter)), !0) : (j.texParameteri(a, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_MAG_FILTER, K(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, K(b.minFilter)), !1)
    }

    function E(a, b) {
        if (a.needsUpdate) {
            if (!a.__webglInit) a.__webglInit = !0, a.__webglTexture =
                j.createTexture(), W.info.memory.textures++;
            j.activeTexture(j.TEXTURE0 + b);
            j.bindTexture(j.TEXTURE_2D, a.__webglTexture);
            var c = s(j.TEXTURE_2D, a, a.image);
            a instanceof THREE_M.DataTexture ? j.texImage2D(j.TEXTURE_2D, 0, P(a.format), a.image.width, a.image.height, 0, P(a.format), j.UNSIGNED_BYTE, a.image.data) : j.texImage2D(j.TEXTURE_2D, 0, j.RGBA, j.RGBA, j.UNSIGNED_BYTE, a.image);
            c && j.generateMipmap(j.TEXTURE_2D);
            a.needsUpdate = !1;
            if (a.onUpdated) a.onUpdated()
        } else j.activeTexture(j.TEXTURE0 + b), j.bindTexture(j.TEXTURE_2D,
            a.__webglTexture)
    }

    function R(a, b) {
        j.bindRenderbuffer(j.RENDERBUFFER, a);
        b.depthBuffer && !b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_COMPONENT16, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_STENCIL, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a)) : j.renderbufferStorage(j.RENDERBUFFER, j.RGBA4, b.width, b.height)
    }

    function U(a) {
        var b = a instanceof THREE_M.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            if (a.depthBuffer === void 0) a.depthBuffer = !0;
            if (a.stencilBuffer === void 0) a.stencilBuffer = !0;
            a.__webglTexture = j.createTexture();
            if (b) {
                a.__webglFramebuffer = [];
                a.__webglRenderbuffer = [];
                j.bindTexture(j.TEXTURE_CUBE_MAP, a.__webglTexture);
                s(j.TEXTURE_CUBE_MAP, a, a);
                for (var c = 0; c < 6; c++) {
                    a.__webglFramebuffer[c] = j.createFramebuffer();
                    a.__webglRenderbuffer[c] = j.createRenderbuffer();
                    j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X +
                        c, 0, P(a.format), a.width, a.height, 0, P(a.format), P(a.type), null);
                    var d = a,
                        g = j.TEXTURE_CUBE_MAP_POSITIVE_X + c;
                    j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer[c]);
                    j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, g, d.__webglTexture, 0);
                    R(a.__webglRenderbuffer[c], a)
                }
            } else a.__webglFramebuffer = j.createFramebuffer(), a.__webglRenderbuffer = j.createRenderbuffer(), j.bindTexture(j.TEXTURE_2D, a.__webglTexture), s(j.TEXTURE_2D, a, a), j.texImage2D(j.TEXTURE_2D, 0, P(a.format), a.width, a.height, 0, P(a.format),
                P(a.type), null), c = j.TEXTURE_2D, j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer), j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, c, a.__webglTexture, 0), R(a.__webglRenderbuffer, a);
            b ? j.bindTexture(j.TEXTURE_CUBE_MAP, null) : j.bindTexture(j.TEXTURE_2D, null);
            j.bindRenderbuffer(j.RENDERBUFFER, null);
            j.bindFramebuffer(j.FRAMEBUFFER, null)
        }
        a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, g = d = 0) : (b = null, c = Q, a = ea, d = L, g = Z);
        b !== da && (j.bindFramebuffer(j.FRAMEBUFFER,
            b), j.viewport(d, g, c, a), da = b)
    }

    function K(a) {
        switch (a) {
            case THREE_M.NearestFilter:
            case THREE_M.NearestMipMapNearestFilter:
            case THREE_M.NearestMipMapLinearFilter:
                return j.NEAREST;
            default:
                return j.LINEAR
        }
    }

    function P(a) {
        switch (a) {
            case THREE_M.RepeatWrapping:
                return j.REPEAT;
            case THREE_M.ClampToEdgeWrapping:
                return j.CLAMP_TO_EDGE;
            case THREE_M.MirroredRepeatWrapping:
                return j.MIRRORED_REPEAT;
            case THREE_M.NearestFilter:
                return j.NEAREST;
            case THREE_M.NearestMipMapNearestFilter:
                return j.NEAREST_MIPMAP_NEAREST;
            case THREE_M.NearestMipMapLinearFilter:
                return j.NEAREST_MIPMAP_LINEAR;
            case THREE_M.LinearFilter:
                return j.LINEAR;
            case THREE_M.LinearMipMapNearestFilter:
                return j.LINEAR_MIPMAP_NEAREST;
            case THREE_M.LinearMipMapLinearFilter:
                return j.LINEAR_MIPMAP_LINEAR;
            case THREE_M.ByteType:
                return j.BYTE;
            case THREE_M.UnsignedByteType:
                return j.UNSIGNED_BYTE;
            case THREE_M.ShortType:
                return j.SHORT;
            case THREE_M.UnsignedShortType:
                return j.UNSIGNED_SHORT;
            case THREE_M.IntType:
                return j.INT;
            case THREE_M.UnsignedShortType:
                return j.UNSIGNED_INT;
            case THREE_M.FloatType:
                return j.FLOAT;
            case THREE_M.AlphaFormat:
                return j.ALPHA;
            case THREE_M.RGBFormat:
                return j.RGB;
            case THREE_M.RGBAFormat:
                return j.RGBA;
            case THREE_M.LuminanceFormat:
                return j.LUMINANCE;
            case THREE_M.LuminanceAlphaFormat:
                return j.LUMINANCE_ALPHA
        }
        return 0
    }
    var a = a || {},
        O = a.canvas !== void 0 ? a.canvas : document.createElement("canvas"),
        aa = a.precision !== void 0 ? a.precision : "highp",
        H = a.antialias !== void 0 ? a.antialias : !1,
        G = a.stencil !== void 0 ? a.stencil : !0,
        I = a.preserveDrawingBuffer !== void 0 ? a.preserveDrawingBuffer : !1,
        M = a.clearColor !== void 0 ? new THREE_M.Color(a.clearColor) : new THREE_M.Color(0),
        S = a.clearAlpha !== void 0 ? a.clearAlpha : 0,
        ba = a.maxLights !== void 0 ? a.maxLights : 4;
    this.domElement = O;
    this.context = null;
    this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1;
    this.shadowMapBias = 0.0039;
    this.shadowMapDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCameraNear = 1;
    this.shadowCameraFar = 5E3;
    this.shadowCameraFov = 50;
    this.shadowMap = [];
    this.shadowMapEnabled = !1;
    this.shadowMapSoft = this.shadowMapAutoUpdate = !0;
    this.maxMorphTargets = 8;
    this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0
        }
    };
    var W = this,
        j, X = [],
        V = null,
        da = null,
        ga = -1,
        $ = null,
        ua = 0,
        ra = null,
        qa = null,
        na = null,
        oa = null,
        pa = null,
        Da = null,
        za = null,
        Aa = null,
        Ba = null,
        L = 0,
        Z = 0,
        Q = 0,
        ea = 0,
        ha = [new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4, new THREE_M.Vector4],
        N = new THREE_M.Matrix4,
        ca = new Float32Array(16),
        la = new Float32Array(16),
        ma = new THREE_M.Vector4,
        fa = {
            ambient: [0, 0, 0],
            directional: {
                length: 0,
                colors: [],
                positions: []
            },
            point: {
                length: 0,
                colors: [],
                positions: [],
                distances: []
            }
        },
        Y, xa = [],
        va, ta, T = {},
        wa = !1;
    j = function() {
        var a;
        try {
            if (!(a = O.getContext("experimental-webgl", {
                    antialias: H,
                    stencil: G,
                    preserveDrawingBuffer: I
                }))) throw "Error creating WebGL context.";
            console.log(navigator.userAgent + " | " + a.getParameter(a.VERSION) + " | " + a.getParameter(a.VENDOR) + " | " + a.getParameter(a.RENDERER) + " | " + a.getParameter(a.SHADING_LANGUAGE_VERSION))
        } catch (b) {
            console.error(b)
        }
        return a
    }();
    j.clearColor(0, 0, 0, 1);
    j.clearDepth(1);
    j.clearStencil(0);
    j.enable(j.DEPTH_TEST);
    j.depthFunc(j.LEQUAL);
    j.frontFace(j.CCW);
    j.cullFace(j.BACK);
    j.enable(j.CULL_FACE);
    j.enable(j.BLEND);
    j.blendEquation(j.FUNC_ADD);
    j.blendFunc(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA);
    j.clearColor(M.r, M.g, M.b, S);
    (function() {
        T.vertices = new Float32Array(16);
        T.faces = new Uint16Array(6);
        var a = 0;
        T.vertices[a++] = -1;
        T.vertices[a++] = -1;
        T.vertices[a++] = 0;
        T.vertices[a++] = 1;
        T.vertices[a++] = 1;
        T.vertices[a++] = -1;
        T.vertices[a++] = 1;
        T.vertices[a++] =
            1;
        T.vertices[a++] = 1;
        T.vertices[a++] = 1;
        T.vertices[a++] = 1;
        T.vertices[a++] = 0;
        T.vertices[a++] = -1;
        T.vertices[a++] = 1;
        T.vertices[a++] = 0;
        a = T.vertices[a++] = 0;
        T.faces[a++] = 0;
        T.faces[a++] = 1;
        T.faces[a++] = 2;
        T.faces[a++] = 0;
        T.faces[a++] = 2;
        T.faces[a++] = 3;
        T.vertexBuffer = j.createBuffer();
        T.elementBuffer = j.createBuffer();
        j.bindBuffer(j.ARRAY_BUFFER, T.vertexBuffer);
        j.bufferData(j.ARRAY_BUFFER, T.vertices, j.STATIC_DRAW);
        j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, T.elementBuffer);
        j.bufferData(j.ELEMENT_ARRAY_BUFFER, T.faces, j.STATIC_DRAW);
        T.program = j.createProgram();
        j.attachShader(T.program, J("fragment", THREE_M.ShaderLib.sprite.fragmentShader));
        j.attachShader(T.program, J("vertex", THREE_M.ShaderLib.sprite.vertexShader));
        j.linkProgram(T.program);
        T.attributes = {};
        T.uniforms = {};
        T.attributes.position = j.getAttribLocation(T.program, "position");
        T.attributes.uv = j.getAttribLocation(T.program, "uv");
        T.uniforms.uvOffset = j.getUniformLocation(T.program, "uvOffset");
        T.uniforms.uvScale = j.getUniformLocation(T.program, "uvScale");
        T.uniforms.rotation = j.getUniformLocation(T.program,
            "rotation");
        T.uniforms.scale = j.getUniformLocation(T.program, "scale");
        T.uniforms.alignment = j.getUniformLocation(T.program, "alignment");
        T.uniforms.color = j.getUniformLocation(T.program, "color");
        T.uniforms.map = j.getUniformLocation(T.program, "map");
        T.uniforms.opacity = j.getUniformLocation(T.program, "opacity");
        T.uniforms.useScreenCoordinates = j.getUniformLocation(T.program, "useScreenCoordinates");
        T.uniforms.affectedByDistance = j.getUniformLocation(T.program, "affectedByDistance");
        T.uniforms.screenPosition =
            j.getUniformLocation(T.program, "screenPosition");
        T.uniforms.modelViewMatrix = j.getUniformLocation(T.program, "modelViewMatrix");
        T.uniforms.projectionMatrix = j.getUniformLocation(T.program, "projectionMatrix")
    })();
    (function() {
        var a = THREE_M.ShaderLib.depthRGBA,
            b = THREE_M.UniformsUtils.clone(a.uniforms);
        va = new THREE_M.ShaderMaterial({
            fragmentShader: a.fragmentShader,
            vertexShader: a.vertexShader,
            uniforms: b
        });
        ta = new THREE_M.ShaderMaterial({
            fragmentShader: a.fragmentShader,
            vertexShader: a.vertexShader,
            uniforms: b,
            morphTargets: !0
        });
        va._shadowPass = !0;
        ta._shadowPass = !0
    })();
    this.context = j;
    var ya = j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
    this.getContext = function() {
        return j
    };
    this.supportsVertexTextures = function() {
        return ya
    };
    this.setSize = function(a, b) {
        O.width = a;
        O.height = b;
        this.setViewport(0, 0, O.width, O.height)
    };
    this.setViewport = function(a, b, c, d) {
        L = a;
        Z = b;
        Q = c;
        ea = d;
        j.viewport(L, Z, Q, ea)
    };
    this.setScissor = function(a, b, c, d) {
        j.scissor(a, b, c, d)
    };
    this.enableScissorTest = function(a) {
        a ? j.enable(j.SCISSOR_TEST) : j.disable(j.SCISSOR_TEST)
    };
    this.setClearColorHex = function(a, b) {
        M.setHex(a);
        S = b;
        j.clearColor(M.r, M.g, M.b, S)
    };
    this.setClearColor = function(a, b) {
        M.copy(a);
        S = b;
        j.clearColor(M.r, M.g, M.b, S)
    };
    this.getClearColor = function() {
        return M
    };
    this.getClearAlpha = function() {
        return S
    };
    this.clear = function(a, b, c) {
        var d = 0;
        if (a === void 0 || a) d |= j.COLOR_BUFFER_BIT;
        if (b === void 0 || b) d |= j.DEPTH_BUFFER_BIT;
        if (c === void 0 || c) d |= j.STENCIL_BUFFER_BIT;
        j.clear(d)
    };
    this.clearTarget = function(a, b, c, d) {
        U(a);
        this.clear(b, c, d)
    };
    this.deallocateObject = function(a) {
        if (a.__webglInit)
            if (a.__webglInit = !1, delete a._modelViewMatrix, delete a._normalMatrixArray, delete a._modelViewMatrixArray, delete a._objectMatrixArray, a instanceof THREE_M.Mesh)
                for (var b in a.geometry.geometryGroups) {
                    var c = a.geometry.geometryGroups[b];
                    j.deleteBuffer(c.__webglVertexBuffer);
                    j.deleteBuffer(c.__webglNormalBuffer);
                    j.deleteBuffer(c.__webglTangentBuffer);
                    j.deleteBuffer(c.__webglColorBuffer);
                    j.deleteBuffer(c.__webglUVBuffer);
                    j.deleteBuffer(c.__webglUV2Buffer);
                    j.deleteBuffer(c.__webglSkinVertexABuffer);
                    j.deleteBuffer(c.__webglSkinVertexBBuffer);
                    j.deleteBuffer(c.__webglSkinIndicesBuffer);
                    j.deleteBuffer(c.__webglSkinWeightsBuffer);
                    j.deleteBuffer(c.__webglFaceBuffer);
                    j.deleteBuffer(c.__webglLineBuffer);
                    if (c.numMorphTargets)
                        for (var d = 0, g = c.numMorphTargets; d < g; d++) j.deleteBuffer(c.__webglMorphTargetsBuffers[d]);
                    if (c.__webglCustomAttributesList)
                        for (d in d = void 0, c.__webglCustomAttributesList) j.deleteBuffer(c.__webglCustomAttributesList[d].buffer);
                    W.info.memory.geometries--
                } else if (a instanceof THREE_M.Ribbon) a = a.geometry, j.deleteBuffer(a.__webglVertexBuffer),
                    j.deleteBuffer(a.__webglColorBuffer), W.info.memory.geometries--;
                else if (a instanceof THREE_M.Line) a = a.geometry, j.deleteBuffer(a.__webglVertexBuffer), j.deleteBuffer(a.__webglColorBuffer), W.info.memory.geometries--;
        else if (a instanceof THREE_M.ParticleSystem) a = a.geometry, j.deleteBuffer(a.__webglVertexBuffer), j.deleteBuffer(a.__webglColorBuffer), W.info.memory.geometries--
    };
    this.deallocateTexture = function(a) {
        if (a.__webglInit) a.__webglInit = !1, j.deleteTexture(a.__webglTexture), W.info.memory.textures--
    };
    this.updateShadowMap =
        function(a, b) {
            p(a, b)
        };
    this.render = function(a, b, c, d) {
        var g, f, e, h, i = a.lights,
            n = a.fog;
        ga = -1;
        this.autoUpdateObjects && this.initWebGLObjects(a);
        b.parent === void 0 && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(b));
        this.autoUpdateScene && a.updateMatrixWorld();
        this.shadowMapEnabled && this.shadowMapAutoUpdate && p(a, b);
        W.info.render.calls = 0;
        W.info.render.vertices = 0;
        W.info.render.faces = 0;
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        b.matrixWorldInverse.flattenToArray(la);
        b.projectionMatrix.flattenToArray(ca);
        N.multiply(b.projectionMatrix, b.matrixWorldInverse);
        l(N);
        U(c);
        (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
        h = a.__webglObjects;
        d = 0;
        for (g = h.length; d < g; d++)
            if (f = h[d], e = f.object, f.render = !1, e.visible && (!(e instanceof THREE_M.Mesh) || !e.frustumCulled || k(e))) {
                e.matrixWorld.flattenToArray(e._objectMatrixArray);
                B(e, b, !0);
                var L = f,
                    q = L.object,
                    t = L.buffer,
                    Z = void 0,
                    Z = Z = void 0,
                    Z = q.material;
                if (Z instanceof THREE_M.MeshFaceMaterial) {
                    if (Z =
                        t.materialIndex, Z >= 0) Z = q.geometry.materials[Z], Z.transparent ? (L.transparent = Z, L.opaque = null) : (L.opaque = Z, L.transparent = null)
                } else if (Z) Z.transparent ? (L.transparent = Z, L.opaque = null) : (L.opaque = Z, L.transparent = null);
                f.render = !0;
                if (this.sortObjects) e.renderDepth ? f.z = e.renderDepth : (ma.copy(e.position), N.multiplyVector3(ma), f.z = ma.z)
            }
        this.sortObjects && h.sort(o);
        h = a.__webglObjectsImmediate;
        d = 0;
        for (g = h.length; d < g; d++)
            if (f = h[d], e = f.object, e.visible) e.matrixAutoUpdate && e.matrixWorld.flattenToArray(e._objectMatrixArray),
                B(e, b, !0), e = f.object.material, e.transparent ? (f.transparent = e, f.opaque = null) : (f.opaque = e, f.transparent = null);
        a.overrideMaterial ? (v(a.overrideMaterial.blending), A(a.overrideMaterial.depthTest), x(a.overrideMaterial.depthWrite), y(a.overrideMaterial.polygonOffset, a.overrideMaterial.polygonOffsetFactor, a.overrideMaterial.polygonOffsetUnits), m(a.__webglObjects, !1, "", b, i, n, !0, a.overrideMaterial), r(a.__webglObjectsImmediate, "", b, i, n, !1, a.overrideMaterial)) : (v(THREE_M.NormalBlending), m(a.__webglObjects, !0, "opaque",
            b, i, n, !1), r(a.__webglObjectsImmediate, "opaque", b, i, n, !1), m(a.__webglObjects, !1, "transparent", b, i, n, !0), r(a.__webglObjectsImmediate, "transparent", b, i, n, !0));
        if (a.__webglSprites.length) {
            e = T.attributes;
            i = T.uniforms;
            n = ea / Q;
            d = [];
            g = Q * 0.5;
            h = ea * 0.5;
            f = !0;
            j.useProgram(T.program);
            V = T.program;
            $ = oa = na = -1;
            wa || (j.enableVertexAttribArray(T.attributes.position), j.enableVertexAttribArray(T.attributes.uv), wa = !0);
            j.disable(j.CULL_FACE);
            j.enable(j.BLEND);
            j.depthMask(!0);
            j.bindBuffer(j.ARRAY_BUFFER, T.vertexBuffer);
            j.vertexAttribPointer(e.position,
                2, j.FLOAT, !1, 16, 0);
            j.vertexAttribPointer(e.uv, 2, j.FLOAT, !1, 16, 8);
            j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, T.elementBuffer);
            j.uniformMatrix4fv(i.projectionMatrix, !1, ca);
            j.activeTexture(j.TEXTURE0);
            j.uniform1i(i.map, 0);
            e = 0;
            for (L = a.__webglSprites.length; e < L; e++)
                if (q = a.__webglSprites[e], q.visible && q.opacity !== 0) q.useScreenCoordinates ? q.z = -q.position.z : (q._modelViewMatrix.multiplyToArray(b.matrixWorldInverse, q.matrixWorld, q._modelViewMatrixArray), q.z = -q._modelViewMatrix.n34);
            a.__webglSprites.sort(o);
            e = 0;
            for (L =
                a.__webglSprites.length; e < L; e++) q = a.__webglSprites[e], q.visible && q.opacity !== 0 && q.map && q.map.image && q.map.image.width && (q.useScreenCoordinates ? (j.uniform1i(i.useScreenCoordinates, 1), j.uniform3f(i.screenPosition, (q.position.x - g) / g, (h - q.position.y) / h, Math.max(0, Math.min(1, q.position.z)))) : (j.uniform1i(i.useScreenCoordinates, 0), j.uniform1i(i.affectedByDistance, q.affectedByDistance ? 1 : 0), j.uniformMatrix4fv(i.modelViewMatrix, !1, q._modelViewMatrixArray)), b = q.map.image.width / (q.scaleByViewport ? ea : 1), d[0] =
                b * n * q.scale.x, d[1] = b * q.scale.y, j.uniform2f(i.uvScale, q.uvScale.x, q.uvScale.y), j.uniform2f(i.uvOffset, q.uvOffset.x, q.uvOffset.y), j.uniform2f(i.alignment, q.alignment.x, q.alignment.y), j.uniform1f(i.opacity, q.opacity), j.uniform3f(i.color, q.color.r, q.color.g, q.color.b), j.uniform1f(i.rotation, q.rotation), j.uniform2fv(i.scale, d), q.mergeWith3D && !f ? (j.enable(j.DEPTH_TEST), f = !0) : !q.mergeWith3D && f && (j.disable(j.DEPTH_TEST), f = !1), v(q.blending), E(q.map, 0), j.drawElements(j.TRIANGLES, 6, j.UNSIGNED_SHORT, 0));
            j.enable(j.CULL_FACE);
            j.enable(j.DEPTH_TEST);
            j.depthMask(pa)
        }
        c && c.minFilter !== THREE_M.NearestFilter && c.minFilter !== THREE_M.LinearFilter && (c instanceof THREE_M.WebGLRenderTargetCube ? (j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture), j.generateMipmap(j.TEXTURE_CUBE_MAP), j.bindTexture(j.TEXTURE_CUBE_MAP, null)) : (j.bindTexture(j.TEXTURE_2D, c.__webglTexture), j.generateMipmap(j.TEXTURE_2D), j.bindTexture(j.TEXTURE_2D, null)))
    };
    this.initWebGLObjects = function(a) {
        if (!a.__webglObjects) a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [];
        for (; a.__objectsAdded.length;) {
            var h = a.__objectsAdded[0],
                i = a,
                m = void 0,
                l = void 0,
                k = void 0;
            if (!h.__webglInit)
                if (h.__webglInit = !0, h._modelViewMatrix = new THREE_M.Matrix4, h._normalMatrixArray = new Float32Array(9), h._modelViewMatrixArray = new Float32Array(16), h._objectMatrixArray = new Float32Array(16), h.matrixWorld.flattenToArray(h._objectMatrixArray), h instanceof THREE_M.Mesh) {
                    l = h.geometry;
                    if (l.geometryGroups === void 0) {
                        var k = l,
                            o = void 0,
                            p = void 0,
                            L = void 0,
                            r = void 0,
                            Q = void 0,
                            Z = void 0,
                            s = void 0,
                            u = {},
                            J = k.morphTargets.length;
                        k.geometryGroups = {};
                        o = 0;
                        for (p = k.faces.length; o < p; o++) L = k.faces[o], r = L.materialIndex, Z = r !== void 0 ? r : -1, u[Z] === void 0 && (u[Z] = {
                            hash: Z,
                            counter: 0
                        }), s = u[Z].hash + "_" + u[Z].counter, k.geometryGroups[s] === void 0 && (k.geometryGroups[s] = {
                            faces3: [],
                            faces4: [],
                            materialIndex: r,
                            vertices: 0,
                            numMorphTargets: J
                        }), Q = L instanceof THREE_M.Face3 ? 3 : 4, k.geometryGroups[s].vertices + Q > 65535 && (u[Z].counter += 1, s = u[Z].hash + "_" + u[Z].counter, k.geometryGroups[s] === void 0 && (k.geometryGroups[s] = {
                            faces3: [],
                            faces4: [],
                            materialIndex: r,
                            vertices: 0,
                            numMorphTargets: J
                        })), L instanceof THREE_M.Face3 ? k.geometryGroups[s].faces3.push(o) : k.geometryGroups[s].faces4.push(o), k.geometryGroups[s].vertices += Q;
                        k.geometryGroupsList = [];
                        o = void 0;
                        for (o in k.geometryGroups) k.geometryGroups[o].id = ua++, k.geometryGroupsList.push(k.geometryGroups[o])
                    }
                    for (m in l.geometryGroups)
                        if (k = l.geometryGroups[m], !k.__webglVertexBuffer) {
                            o = k;
                            o.__webglVertexBuffer = j.createBuffer();
                            o.__webglNormalBuffer = j.createBuffer();
                            o.__webglTangentBuffer = j.createBuffer();
                            o.__webglColorBuffer = j.createBuffer();
                            o.__webglUVBuffer = j.createBuffer();
                            o.__webglUV2Buffer = j.createBuffer();
                            o.__webglSkinVertexABuffer = j.createBuffer();
                            o.__webglSkinVertexBBuffer = j.createBuffer();
                            o.__webglSkinIndicesBuffer = j.createBuffer();
                            o.__webglSkinWeightsBuffer = j.createBuffer();
                            o.__webglFaceBuffer = j.createBuffer();
                            o.__webglLineBuffer = j.createBuffer();
                            if (o.numMorphTargets) {
                                L = p = void 0;
                                o.__webglMorphTargetsBuffers = [];
                                p = 0;
                                for (L = o.numMorphTargets; p < L; p++) o.__webglMorphTargetsBuffers.push(j.createBuffer())
                            }
                            W.info.memory.geometries++;
                            r = h;
                            Q = r.geometry;
                            p = k.faces3;
                            Z = k.faces4;
                            o = p.length * 3 + Z.length * 4;
                            L = p.length * 1 + Z.length * 2;
                            Z = p.length * 3 + Z.length * 4;
                            p = b(r, k);
                            s = f(p);
                            u = d(p);
                            J = g(p);
                            k.__vertexArray = new Float32Array(o * 3);
                            if (u) k.__normalArray = new Float32Array(o * 3);
                            if (Q.hasTangents) k.__tangentArray = new Float32Array(o * 4);
                            if (J) k.__colorArray = new Float32Array(o * 3);
                            if (s) {
                                if (Q.faceUvs.length > 0 || Q.faceVertexUvs.length > 0) k.__uvArray = new Float32Array(o * 2);
                                if (Q.faceUvs.length > 1 || Q.faceVertexUvs.length > 1) k.__uv2Array = new Float32Array(o * 2)
                            }
                            if (r.geometry.skinWeights.length &&
                                r.geometry.skinIndices.length) k.__skinVertexAArray = new Float32Array(o * 4), k.__skinVertexBArray = new Float32Array(o * 4), k.__skinIndexArray = new Float32Array(o * 4), k.__skinWeightArray = new Float32Array(o * 4);
                            k.__faceArray = new Uint16Array(L * 3);
                            k.__lineArray = new Uint16Array(Z * 2);
                            if (k.numMorphTargets) {
                                k.__morphTargetsArrays = [];
                                r = 0;
                                for (Q = k.numMorphTargets; r < Q; r++) k.__morphTargetsArrays.push(new Float32Array(o * 3))
                            }
                            k.__webglFaceCount = L * 3;
                            k.__webglLineCount = Z * 2;
                            if (p.attributes) {
                                if (k.__webglCustomAttributesList ===
                                    void 0) k.__webglCustomAttributesList = [];
                                L = void 0;
                                for (L in p.attributes) {
                                    var r = p.attributes[L],
                                        Q = {},
                                        ea;
                                    for (ea in r) Q[ea] = r[ea];
                                    if (!Q.__webglInitialized || Q.createUniqueBuffers) Q.__webglInitialized = !0, Z = 1, Q.type === "v2" ? Z = 2 : Q.type === "v3" ? Z = 3 : Q.type === "v4" ? Z = 4 : Q.type === "c" && (Z = 3), Q.size = Z, Q.array = new Float32Array(o * Z), Q.buffer = j.createBuffer(), Q.buffer.belongsToAttribute = L, r.needsUpdate = !0, Q.__original = r;
                                    k.__webglCustomAttributesList.push(Q)
                                }
                            }
                            k.__inittedArrays = !0;
                            l.__dirtyVertices = !0;
                            l.__dirtyMorphTargets = !0;
                            l.__dirtyElements = !0;
                            l.__dirtyUvs = !0;
                            l.__dirtyNormals = !0;
                            l.__dirtyTangents = !0;
                            l.__dirtyColors = !0
                        }
                } else if (h instanceof THREE_M.Ribbon) {
                if (l = h.geometry, !l.__webglVertexBuffer) k = l, k.__webglVertexBuffer = j.createBuffer(), k.__webglColorBuffer = j.createBuffer(), W.info.memory.geometries++, k = l, o = k.vertices.length, k.__vertexArray = new Float32Array(o * 3), k.__colorArray = new Float32Array(o * 3), k.__webglVertexCount = o, l.__dirtyVertices = !0, l.__dirtyColors = !0
            } else if (h instanceof THREE_M.Line) {
                if (l = h.geometry, !l.__webglVertexBuffer) k =
                    l, k.__webglVertexBuffer = j.createBuffer(), k.__webglColorBuffer = j.createBuffer(), W.info.memory.geometries++, k = l, o = h, p = k.vertices.length, k.__vertexArray = new Float32Array(p * 3), k.__colorArray = new Float32Array(p * 3), k.__webglLineCount = p, c(k, o), l.__dirtyVertices = !0, l.__dirtyColors = !0
            } else if (h instanceof THREE_M.ParticleSystem && (l = h.geometry, !l.__webglVertexBuffer)) k = l, k.__webglVertexBuffer = j.createBuffer(), k.__webglColorBuffer = j.createBuffer(), W.info.geometries++, k = l, o = h, p = k.vertices.length, k.__vertexArray =
                new Float32Array(p * 3), k.__colorArray = new Float32Array(p * 3), k.__sortArray = [], k.__webglParticleCount = p, c(k, o), l.__dirtyVertices = !0, l.__dirtyColors = !0;
            if (!h.__webglActive) {
                if (h instanceof THREE_M.Mesh)
                    for (m in l = h.geometry, l.geometryGroups) k = l.geometryGroups[m], n(i.__webglObjects, k, h);
                else h instanceof THREE_M.Ribbon || h instanceof THREE_M.Line || h instanceof THREE_M.ParticleSystem ? (l = h.geometry, n(i.__webglObjects, l, h)) : THREE_M.MarchingCubes !== void 0 && h instanceof THREE_M.MarchingCubes || h.immediateRenderCallback ?
                    i.__webglObjectsImmediate.push({
                        object: h,
                        opaque: null,
                        transparent: null
                    }) : h instanceof THREE_M.Sprite && i.__webglSprites.push(h);
                h.__webglActive = !0
            }
            a.__objectsAdded.splice(0, 1)
        }
        for (; a.__objectsRemoved.length;) {
            h = a.__objectsRemoved[0];
            i = a;
            if (h instanceof THREE_M.Mesh || h instanceof THREE_M.ParticleSystem || h instanceof THREE_M.Ribbon || h instanceof THREE_M.Line) w(i.__webglObjects, h);
            else if (h instanceof THREE_M.Sprite) {
                i = i.__webglSprites;
                m = h;
                for (l = i.length - 1; l >= 0; l--) i[l] === m && i.splice(l, 1)
            } else(h instanceof THREE_M.MarchingCubes ||
                h.immediateRenderCallback) && w(i.__webglObjectsImmediate, h);
            h.__webglActive = !1;
            a.__objectsRemoved.splice(0, 1)
        }
        h = 0;
        for (i = a.__webglObjects.length; h < i; h++)
            if (ea = a.__webglObjects[h].object, m = ea.geometry, l = L = p = void 0, ea instanceof THREE_M.Mesh) {
                k = 0;
                for (o = m.geometryGroupsList.length; k < o; k++)
                    if (p = m.geometryGroupsList[k], l = b(ea, p), L = l.attributes && q(l), m.__dirtyVertices || m.__dirtyMorphTargets || m.__dirtyElements || m.__dirtyUvs || m.__dirtyNormals || m.__dirtyColors || m.__dirtyTangents || L) {
                        var E = ea,
                            L = j.DYNAMIC_DRAW,
                            r = !m.dynamic,
                            s = l;
                        if (p.__inittedArrays) {
                            var Q = d(s),
                                Z = g(s),
                                B = f(s),
                                R = Q === THREE_M.SmoothShading,
                                M = u = s = void 0,
                                D = void 0,
                                G = void 0,
                                I = void 0,
                                v = void 0,
                                A = void 0,
                                ha = void 0,
                                F = M = void 0,
                                y = void 0,
                                x = void 0,
                                N = void 0,
                                H = D = void 0,
                                P = void 0,
                                S = void 0,
                                ca = D = ha = void 0,
                                U = void 0,
                                X = N = x = y = v = void 0,
                                K = D = N = x = y = X = N = x = y = X = N = x = y = void 0,
                                O = void 0,
                                la = I = void 0,
                                T = void 0,
                                V = void 0,
                                ga = void 0,
                                aa = void 0,
                                ba = F = V = O = 0,
                                da = 0,
                                ma = K = M = 0,
                                Y = v = H = 0,
                                C = 0,
                                fa = void 0,
                                Y = p.__vertexArray,
                                T = p.__uvArray,
                                C = p.__uv2Array,
                                la = p.__normalArray,
                                G = p.__tangentArray,
                                P = p.__colorArray,
                                ca = p.__skinVertexAArray,
                                U = p.__skinVertexBArray,
                                A = p.__skinIndexArray,
                                $ = p.__skinWeightArray,
                                X = p.__morphTargetsArrays,
                                J = p.__webglCustomAttributesList,
                                z = void 0,
                                z = p.__faceArray,
                                fa = p.__lineArray,
                                S = E.geometry,
                                xa = S.__dirtyElements,
                                ta = S.__dirtyUvs,
                                I = S.__dirtyNormals,
                                ha = S.__dirtyTangents,
                                ra = S.__dirtyColors,
                                ga = S.__dirtyMorphTargets,
                                aa = S.vertices,
                                E = p.faces3,
                                ja = p.faces4,
                                ka = S.faces,
                                qa = S.faceVertexUvs[0],
                                pa = S.faceVertexUvs[1],
                                va = S.skinVerticesA,
                                wa = S.skinVerticesB,
                                oa = S.skinIndices,
                                na = S.skinWeights,
                                ya = S.morphTargets;
                            if (S.__dirtyVertices) {
                                s = 0;
                                for (u = E.length; s < u; s++) D = ka[E[s]], y = aa[D.a].position, x = aa[D.b].position, N = aa[D.c].position, Y[V] = y.x, Y[V + 1] = y.y, Y[V + 2] = y.z, Y[V + 3] = x.x, Y[V + 4] = x.y, Y[V + 5] = x.z, Y[V + 6] = N.x, Y[V + 7] = N.y, Y[V + 8] = N.z, V += 9;
                                s = 0;
                                for (u = ja.length; s < u; s++) D = ka[ja[s]], y = aa[D.a].position, x = aa[D.b].position, N = aa[D.c].position, D = aa[D.d].position, Y[V] = y.x, Y[V + 1] = y.y, Y[V + 2] = y.z, Y[V + 3] = x.x, Y[V + 4] = x.y, Y[V + 5] = x.z, Y[V + 6] = N.x, Y[V + 7] = N.y, Y[V + 8] = N.z, Y[V + 9] = D.x, Y[V + 10] = D.y, Y[V + 11] = D.z, V += 12;
                                j.bindBuffer(j.ARRAY_BUFFER,
                                    p.__webglVertexBuffer);
                                j.bufferData(j.ARRAY_BUFFER, Y, L)
                            }
                            if (ga) {
                                V = 0;
                                for (ga = ya.length; V < ga; V++) {
                                    s = Y = 0;
                                    for (u = E.length; s < u; s++) D = ka[E[s]], y = ya[V].vertices[D.a].position, x = ya[V].vertices[D.b].position, N = ya[V].vertices[D.c].position, aa = X[V], aa[Y] = y.x, aa[Y + 1] = y.y, aa[Y + 2] = y.z, aa[Y + 3] = x.x, aa[Y + 4] = x.y, aa[Y + 5] = x.z, aa[Y + 6] = N.x, aa[Y + 7] = N.y, aa[Y + 8] = N.z, Y += 9;
                                    s = 0;
                                    for (u = ja.length; s < u; s++) D = ka[ja[s]], y = ya[V].vertices[D.a].position, x = ya[V].vertices[D.b].position, N = ya[V].vertices[D.c].position, D = ya[V].vertices[D.d].position,
                                        aa = X[V], aa[Y] = y.x, aa[Y + 1] = y.y, aa[Y + 2] = y.z, aa[Y + 3] = x.x, aa[Y + 4] = x.y, aa[Y + 5] = x.z, aa[Y + 6] = N.x, aa[Y + 7] = N.y, aa[Y + 8] = N.z, aa[Y + 9] = D.x, aa[Y + 10] = D.y, aa[Y + 11] = D.z, Y += 12;
                                    j.bindBuffer(j.ARRAY_BUFFER, p.__webglMorphTargetsBuffers[V]);
                                    j.bufferData(j.ARRAY_BUFFER, X[V], L)
                                }
                            }
                            if (na.length) {
                                s = 0;
                                for (u = E.length; s < u; s++) D = ka[E[s]], y = na[D.a], x = na[D.b], N = na[D.c], $[v] = y.x, $[v + 1] = y.y, $[v + 2] = y.z, $[v + 3] = y.w, $[v + 4] = x.x, $[v + 5] = x.y, $[v + 6] = x.z, $[v + 7] = x.w, $[v + 8] = N.x, $[v + 9] = N.y, $[v + 10] = N.z, $[v + 11] = N.w, y = oa[D.a], x = oa[D.b], N = oa[D.c], A[v] =
                                    y.x, A[v + 1] = y.y, A[v + 2] = y.z, A[v + 3] = y.w, A[v + 4] = x.x, A[v + 5] = x.y, A[v + 6] = x.z, A[v + 7] = x.w, A[v + 8] = N.x, A[v + 9] = N.y, A[v + 10] = N.z, A[v + 11] = N.w, y = va[D.a], x = va[D.b], N = va[D.c], ca[v] = y.x, ca[v + 1] = y.y, ca[v + 2] = y.z, ca[v + 3] = 1, ca[v + 4] = x.x, ca[v + 5] = x.y, ca[v + 6] = x.z, ca[v + 7] = 1, ca[v + 8] = N.x, ca[v + 9] = N.y, ca[v + 10] = N.z, ca[v + 11] = 1, y = wa[D.a], x = wa[D.b], N = wa[D.c], U[v] = y.x, U[v + 1] = y.y, U[v + 2] = y.z, U[v + 3] = 1, U[v + 4] = x.x, U[v + 5] = x.y, U[v + 6] = x.z, U[v + 7] = 1, U[v + 8] = N.x, U[v + 9] = N.y, U[v + 10] = N.z, U[v + 11] = 1, v += 12;
                                s = 0;
                                for (u = ja.length; s < u; s++) D = ka[ja[s]], y = na[D.a],
                                    x = na[D.b], N = na[D.c], X = na[D.d], $[v] = y.x, $[v + 1] = y.y, $[v + 2] = y.z, $[v + 3] = y.w, $[v + 4] = x.x, $[v + 5] = x.y, $[v + 6] = x.z, $[v + 7] = x.w, $[v + 8] = N.x, $[v + 9] = N.y, $[v + 10] = N.z, $[v + 11] = N.w, $[v + 12] = X.x, $[v + 13] = X.y, $[v + 14] = X.z, $[v + 15] = X.w, y = oa[D.a], x = oa[D.b], N = oa[D.c], X = oa[D.d], A[v] = y.x, A[v + 1] = y.y, A[v + 2] = y.z, A[v + 3] = y.w, A[v + 4] = x.x, A[v + 5] = x.y, A[v + 6] = x.z, A[v + 7] = x.w, A[v + 8] = N.x, A[v + 9] = N.y, A[v + 10] = N.z, A[v + 11] = N.w, A[v + 12] = X.x, A[v + 13] = X.y, A[v + 14] = X.z, A[v + 15] = X.w, y = va[D.a], x = va[D.b], N = va[D.c], X = va[D.d], ca[v] = y.x, ca[v + 1] = y.y, ca[v + 2] = y.z,
                                    ca[v + 3] = 1, ca[v + 4] = x.x, ca[v + 5] = x.y, ca[v + 6] = x.z, ca[v + 7] = 1, ca[v + 8] = N.x, ca[v + 9] = N.y, ca[v + 10] = N.z, ca[v + 11] = 1, ca[v + 12] = X.x, ca[v + 13] = X.y, ca[v + 14] = X.z, ca[v + 15] = 1, y = wa[D.a], x = wa[D.b], N = wa[D.c], D = wa[D.d], U[v] = y.x, U[v + 1] = y.y, U[v + 2] = y.z, U[v + 3] = 1, U[v + 4] = x.x, U[v + 5] = x.y, U[v + 6] = x.z, U[v + 7] = 1, U[v + 8] = N.x, U[v + 9] = N.y, U[v + 10] = N.z, U[v + 11] = 1, U[v + 12] = D.x, U[v + 13] = D.y, U[v + 14] = D.z, U[v + 15] = 1, v += 16;
                                v > 0 && (j.bindBuffer(j.ARRAY_BUFFER, p.__webglSkinVertexABuffer), j.bufferData(j.ARRAY_BUFFER, ca, L), j.bindBuffer(j.ARRAY_BUFFER, p.__webglSkinVertexBBuffer),
                                    j.bufferData(j.ARRAY_BUFFER, U, L), j.bindBuffer(j.ARRAY_BUFFER, p.__webglSkinIndicesBuffer), j.bufferData(j.ARRAY_BUFFER, A, L), j.bindBuffer(j.ARRAY_BUFFER, p.__webglSkinWeightsBuffer), j.bufferData(j.ARRAY_BUFFER, $, L))
                            }
                            if (ra && Z) {
                                s = 0;
                                for (u = E.length; s < u; s++) D = ka[E[s]], v = D.vertexColors, A = D.color, v.length === 3 && Z === THREE_M.VertexColors ? (D = v[0], ca = v[1], U = v[2]) : U = ca = D = A, P[H] = D.r, P[H + 1] = D.g, P[H + 2] = D.b, P[H + 3] = ca.r, P[H + 4] = ca.g, P[H + 5] = ca.b, P[H + 6] = U.r, P[H + 7] = U.g, P[H + 8] = U.b, H += 9;
                                s = 0;
                                for (u = ja.length; s < u; s++) D = ka[ja[s]],
                                    v = D.vertexColors, A = D.color, v.length === 4 && Z === THREE_M.VertexColors ? (D = v[0], ca = v[1], U = v[2], v = v[3]) : v = U = ca = D = A, P[H] = D.r, P[H + 1] = D.g, P[H + 2] = D.b, P[H + 3] = ca.r, P[H + 4] = ca.g, P[H + 5] = ca.b, P[H + 6] = U.r, P[H + 7] = U.g, P[H + 8] = U.b, P[H + 9] = v.r, P[H + 10] = v.g, P[H + 11] = v.b, H += 12;
                                H > 0 && (j.bindBuffer(j.ARRAY_BUFFER, p.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, P, L))
                            }
                            if (ha && S.hasTangents) {
                                s = 0;
                                for (u = E.length; s < u; s++) D = ka[E[s]], ha = D.vertexTangents, H = ha[0], P = ha[1], S = ha[2], G[K] = H.x, G[K + 1] = H.y, G[K + 2] = H.z, G[K + 3] = H.w, G[K + 4] = P.x, G[K + 5] =
                                    P.y, G[K + 6] = P.z, G[K + 7] = P.w, G[K + 8] = S.x, G[K + 9] = S.y, G[K + 10] = S.z, G[K + 11] = S.w, K += 12;
                                s = 0;
                                for (u = ja.length; s < u; s++) D = ka[ja[s]], ha = D.vertexTangents, H = ha[0], P = ha[1], S = ha[2], ha = ha[3], G[K] = H.x, G[K + 1] = H.y, G[K + 2] = H.z, G[K + 3] = H.w, G[K + 4] = P.x, G[K + 5] = P.y, G[K + 6] = P.z, G[K + 7] = P.w, G[K + 8] = S.x, G[K + 9] = S.y, G[K + 10] = S.z, G[K + 11] = S.w, G[K + 12] = ha.x, G[K + 13] = ha.y, G[K + 14] = ha.z, G[K + 15] = ha.w, K += 16;
                                j.bindBuffer(j.ARRAY_BUFFER, p.__webglTangentBuffer);
                                j.bufferData(j.ARRAY_BUFFER, G, L)
                            }
                            if (I && Q) {
                                s = 0;
                                for (u = E.length; s < u; s++)
                                    if (D = ka[E[s]], G = D.vertexNormals,
                                        I = D.normal, G.length === 3 && R)
                                        for (K = 0; K < 3; K++) I = G[K], la[M] = I.x, la[M + 1] = I.y, la[M + 2] = I.z, M += 3;
                                    else
                                        for (K = 0; K < 3; K++) la[M] = I.x, la[M + 1] = I.y, la[M + 2] = I.z, M += 3;
                                s = 0;
                                for (u = ja.length; s < u; s++)
                                    if (D = ka[ja[s]], G = D.vertexNormals, I = D.normal, G.length === 4 && R)
                                        for (K = 0; K < 4; K++) I = G[K], la[M] = I.x, la[M + 1] = I.y, la[M + 2] = I.z, M += 3;
                                    else
                                        for (K = 0; K < 4; K++) la[M] = I.x, la[M + 1] = I.y, la[M + 2] = I.z, M += 3;
                                j.bindBuffer(j.ARRAY_BUFFER, p.__webglNormalBuffer);
                                j.bufferData(j.ARRAY_BUFFER, la, L)
                            }
                            if (ta && qa && B) {
                                s = 0;
                                for (u = E.length; s < u; s++)
                                    if (M = E[s], M = qa[M],
                                        M !== void 0)
                                        for (K = 0; K < 3; K++) la = M[K], T[F] = la.u, T[F + 1] = la.v, F += 2;
                                s = 0;
                                for (u = ja.length; s < u; s++)
                                    if (M = ja[s], M = qa[M], M !== void 0)
                                        for (K = 0; K < 4; K++) la = M[K], T[F] = la.u, T[F + 1] = la.v, F += 2;
                                F > 0 && (j.bindBuffer(j.ARRAY_BUFFER, p.__webglUVBuffer), j.bufferData(j.ARRAY_BUFFER, T, L))
                            }
                            if (ta && pa && B) {
                                s = 0;
                                for (u = E.length; s < u; s++)
                                    if (M = E[s], F = pa[M], F !== void 0)
                                        for (K = 0; K < 3; K++) T = F[K], C[ba] = T.u, C[ba + 1] = T.v, ba += 2;
                                s = 0;
                                for (u = ja.length; s < u; s++)
                                    if (M = ja[s], F = pa[M], F !== void 0)
                                        for (K = 0; K < 4; K++) T = F[K], C[ba] = T.u, C[ba + 1] = T.v, ba += 2;
                                ba > 0 && (j.bindBuffer(j.ARRAY_BUFFER,
                                    p.__webglUV2Buffer), j.bufferData(j.ARRAY_BUFFER, C, L))
                            }
                            if (xa) {
                                s = 0;
                                for (u = E.length; s < u; s++) z[da] = O, z[da + 1] = O + 1, z[da + 2] = O + 2, da += 3, fa[ma] = O, fa[ma + 1] = O + 1, fa[ma + 2] = O, fa[ma + 3] = O + 2, fa[ma + 4] = O + 1, fa[ma + 5] = O + 2, ma += 6, O += 3;
                                s = 0;
                                for (u = ja.length; s < u; s++) z[da] = O, z[da + 1] = O + 1, z[da + 2] = O + 3, z[da + 3] = O + 1, z[da + 4] = O + 2, z[da + 5] = O + 3, da += 6, fa[ma] = O, fa[ma + 1] = O + 1, fa[ma + 2] = O, fa[ma + 3] = O + 3, fa[ma + 4] = O + 1, fa[ma + 5] = O + 2, fa[ma + 6] = O + 2, fa[ma + 7] = O + 3, ma += 8, O += 4;
                                j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, p.__webglFaceBuffer);
                                j.bufferData(j.ELEMENT_ARRAY_BUFFER,
                                    z, L);
                                j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, p.__webglLineBuffer);
                                j.bufferData(j.ELEMENT_ARRAY_BUFFER, fa, L)
                            }
                            if (J) {
                                K = 0;
                                for (O = J.length; K < O; K++)
                                    if (z = J[K], z.__original.needsUpdate) {
                                        C = 0;
                                        if (z.size === 1)
                                            if (z.boundTo === void 0 || z.boundTo === "vertices") {
                                                s = 0;
                                                for (u = E.length; s < u; s++) D = ka[E[s]], z.array[C] = z.value[D.a], z.array[C + 1] = z.value[D.b], z.array[C + 2] = z.value[D.c], C += 3;
                                                s = 0;
                                                for (u = ja.length; s < u; s++) D = ka[ja[s]], z.array[C] = z.value[D.a], z.array[C + 1] = z.value[D.b], z.array[C + 2] = z.value[D.c], z.array[C + 3] = z.value[D.d], C +=
                                                    4
                                            } else {
                                                if (z.boundTo === "faces") {
                                                    s = 0;
                                                    for (u = E.length; s < u; s++) fa = z.value[E[s]], z.array[C] = fa, z.array[C + 1] = fa, z.array[C + 2] = fa, C += 3;
                                                    s = 0;
                                                    for (u = ja.length; s < u; s++) fa = z.value[ja[s]], z.array[C] = fa, z.array[C + 1] = fa, z.array[C + 2] = fa, z.array[C + 3] = fa, C += 4
                                                }
                                            } else if (z.size === 2)
                                            if (z.boundTo === void 0 || z.boundTo === "vertices") {
                                                s = 0;
                                                for (u = E.length; s < u; s++) D = ka[E[s]], y = z.value[D.a], x = z.value[D.b], N = z.value[D.c], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C + 2] = x.x, z.array[C + 3] = x.y, z.array[C + 4] = N.x, z.array[C + 5] = N.y, C += 6;
                                                s = 0;
                                                for (u =
                                                    ja.length; s < u; s++) D = ka[ja[s]], y = z.value[D.a], x = z.value[D.b], N = z.value[D.c], D = z.value[D.d], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C + 2] = x.x, z.array[C + 3] = x.y, z.array[C + 4] = N.x, z.array[C + 5] = N.y, z.array[C + 6] = D.x, z.array[C + 7] = D.y, C += 8
                                            } else {
                                                if (z.boundTo === "faces") {
                                                    s = 0;
                                                    for (u = E.length; s < u; s++) N = x = y = fa = z.value[E[s]], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C + 2] = x.x, z.array[C + 3] = x.y, z.array[C + 4] = N.x, z.array[C + 5] = N.y, C += 6;
                                                    s = 0;
                                                    for (u = ja.length; s < u; s++) D = N = x = y = fa = z.value[ja[s]], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C +
                                                        2] = x.x, z.array[C + 3] = x.y, z.array[C + 4] = N.x, z.array[C + 5] = N.y, z.array[C + 6] = D.x, z.array[C + 7] = D.y, C += 8
                                                }
                                            } else if (z.size === 3)
                                            if (Q = z.type === "c" ? ["r", "g", "b"] : ["x", "y", "z"], z.boundTo === void 0 || z.boundTo === "vertices") {
                                                s = 0;
                                                for (u = E.length; s < u; s++) D = ka[E[s]], y = z.value[D.a], x = z.value[D.b], N = z.value[D.c], z.array[C] = y[Q[0]], z.array[C + 1] = y[Q[1]], z.array[C + 2] = y[Q[2]], z.array[C + 3] = x[Q[0]], z.array[C + 4] = x[Q[1]], z.array[C + 5] = x[Q[2]], z.array[C + 6] = N[Q[0]], z.array[C + 7] = N[Q[1]], z.array[C + 8] = N[Q[2]], C += 9;
                                                s = 0;
                                                for (u = ja.length; s <
                                                    u; s++) D = ka[ja[s]], y = z.value[D.a], x = z.value[D.b], N = z.value[D.c], D = z.value[D.d], z.array[C] = y[Q[0]], z.array[C + 1] = y[Q[1]], z.array[C + 2] = y[Q[2]], z.array[C + 3] = x[Q[0]], z.array[C + 4] = x[Q[1]], z.array[C + 5] = x[Q[2]], z.array[C + 6] = N[Q[0]], z.array[C + 7] = N[Q[1]], z.array[C + 8] = N[Q[2]], z.array[C + 9] = D[Q[0]], z.array[C + 10] = D[Q[1]], z.array[C + 11] = D[Q[2]], C += 12
                                            } else {
                                                if (z.boundTo === "faces") {
                                                    s = 0;
                                                    for (u = E.length; s < u; s++) N = x = y = fa = z.value[E[s]], z.array[C] = y[Q[0]], z.array[C + 1] = y[Q[1]], z.array[C + 2] = y[Q[2]], z.array[C + 3] = x[Q[0]], z.array[C +
                                                        4] = x[Q[1]], z.array[C + 5] = x[Q[2]], z.array[C + 6] = N[Q[0]], z.array[C + 7] = N[Q[1]], z.array[C + 8] = N[Q[2]], C += 9;
                                                    s = 0;
                                                    for (u = ja.length; s < u; s++) D = N = x = y = fa = z.value[ja[s]], z.array[C] = y[Q[0]], z.array[C + 1] = y[Q[1]], z.array[C + 2] = y[Q[2]], z.array[C + 3] = x[Q[0]], z.array[C + 4] = x[Q[1]], z.array[C + 5] = x[Q[2]], z.array[C + 6] = N[Q[0]], z.array[C + 7] = N[Q[1]], z.array[C + 8] = N[Q[2]], z.array[C + 9] = D[Q[0]], z.array[C + 10] = D[Q[1]], z.array[C + 11] = D[Q[2]], C += 12
                                                }
                                            } else if (z.size === 4)
                                            if (z.boundTo === void 0 || z.boundTo === "vertices") {
                                                s = 0;
                                                for (u = E.length; s < u; s++) D =
                                                    ka[E[s]], y = z.value[D.a], x = z.value[D.b], N = z.value[D.c], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C + 2] = y.z, z.array[C + 3] = y.w, z.array[C + 4] = x.x, z.array[C + 5] = x.y, z.array[C + 6] = x.z, z.array[C + 7] = x.w, z.array[C + 8] = N.x, z.array[C + 9] = N.y, z.array[C + 10] = N.z, z.array[C + 11] = N.w, C += 12;
                                                s = 0;
                                                for (u = ja.length; s < u; s++) D = ka[ja[s]], y = z.value[D.a], x = z.value[D.b], N = z.value[D.c], D = z.value[D.d], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C + 2] = y.z, z.array[C + 3] = y.w, z.array[C + 4] = x.x, z.array[C + 5] = x.y, z.array[C + 6] = x.z, z.array[C + 7] = x.w, z.array[C +
                                                    8] = N.x, z.array[C + 9] = N.y, z.array[C + 10] = N.z, z.array[C + 11] = N.w, z.array[C + 12] = D.x, z.array[C + 13] = D.y, z.array[C + 14] = D.z, z.array[C + 15] = D.w, C += 16
                                            } else if (z.boundTo === "faces") {
                                            s = 0;
                                            for (u = E.length; s < u; s++) N = x = y = fa = z.value[E[s]], z.array[C] = y.x, z.array[C + 1] = y.y, z.array[C + 2] = y.z, z.array[C + 3] = y.w, z.array[C + 4] = x.x, z.array[C + 5] = x.y, z.array[C + 6] = x.z, z.array[C + 7] = x.w, z.array[C + 8] = N.x, z.array[C + 9] = N.y, z.array[C + 10] = N.z, z.array[C + 11] = N.w, C += 12;
                                            s = 0;
                                            for (u = ja.length; s < u; s++) D = N = x = y = fa = z.value[ja[s]], z.array[C] = y.x, z.array[C +
                                                1] = y.y, z.array[C + 2] = y.z, z.array[C + 3] = y.w, z.array[C + 4] = x.x, z.array[C + 5] = x.y, z.array[C + 6] = x.z, z.array[C + 7] = x.w, z.array[C + 8] = N.x, z.array[C + 9] = N.y, z.array[C + 10] = N.z, z.array[C + 11] = N.w, z.array[C + 12] = D.x, z.array[C + 13] = D.y, z.array[C + 14] = D.z, z.array[C + 15] = D.w, C += 16
                                        }
                                        j.bindBuffer(j.ARRAY_BUFFER, z.buffer);
                                        j.bufferData(j.ARRAY_BUFFER, z.array, L)
                                    }
                            }
                            r && (delete p.__inittedArrays, delete p.__colorArray, delete p.__normalArray, delete p.__tangentArray, delete p.__uvArray, delete p.__uv2Array, delete p.__faceArray, delete p.__vertexArray,
                                delete p.__lineArray, delete p.__skinVertexAArray, delete p.__skinVertexBArray, delete p.__skinIndexArray, delete p.__skinWeightArray)
                        }
                    }
                m.__dirtyVertices = !1;
                m.__dirtyMorphTargets = !1;
                m.__dirtyElements = !1;
                m.__dirtyUvs = !1;
                m.__dirtyNormals = !1;
                m.__dirtyColors = !1;
                m.__dirtyTangents = !1;
                l.attributes && t(l)
            } else if (ea instanceof THREE_M.Ribbon) {
            if (m.__dirtyVertices || m.__dirtyColors) {
                l = m;
                ea = j.DYNAMIC_DRAW;
                Q = k = Q = r = r = void 0;
                Z = l.vertices;
                o = l.colors;
                s = Z.length;
                p = o.length;
                u = l.__vertexArray;
                L = l.__colorArray;
                J = l.__dirtyColors;
                if (l.__dirtyVertices) {
                    for (r = 0; r < s; r++) Q = Z[r].position, k = r * 3, u[k] = Q.x, u[k + 1] = Q.y, u[k + 2] = Q.z;
                    j.bindBuffer(j.ARRAY_BUFFER, l.__webglVertexBuffer);
                    j.bufferData(j.ARRAY_BUFFER, u, ea)
                }
                if (J) {
                    for (r = 0; r < p; r++) Q = o[r], k = r * 3, L[k] = Q.r, L[k + 1] = Q.g, L[k + 2] = Q.b;
                    j.bindBuffer(j.ARRAY_BUFFER, l.__webglColorBuffer);
                    j.bufferData(j.ARRAY_BUFFER, L, ea)
                }
            }
            m.__dirtyVertices = !1;
            m.__dirtyColors = !1
        } else if (ea instanceof THREE_M.Line) {
            l = b(ea, p);
            L = l.attributes && q(l);
            if (m.__dirtyVertices || m.__dirtyColors || L) {
                ea = m;
                k = j.DYNAMIC_DRAW;
                s = o = R =
                    Z = B = void 0;
                Z = ea.vertices;
                p = ea.colors;
                s = Z.length;
                L = p.length;
                u = ea.__vertexArray;
                r = ea.__colorArray;
                J = ea.__dirtyColors;
                Q = ea.__webglCustomAttributesList;
                O = ka = ja = E = R = B = void 0;
                if (ea.__dirtyVertices) {
                    for (B = 0; B < s; B++) R = Z[B].position, o = B * 3, u[o] = R.x, u[o + 1] = R.y, u[o + 2] = R.z;
                    j.bindBuffer(j.ARRAY_BUFFER, ea.__webglVertexBuffer);
                    j.bufferData(j.ARRAY_BUFFER, u, k)
                }
                if (J) {
                    for (Z = 0; Z < L; Z++) s = p[Z], o = Z * 3, r[o] = s.r, r[o + 1] = s.g, r[o + 2] = s.b;
                    j.bindBuffer(j.ARRAY_BUFFER, ea.__webglColorBuffer);
                    j.bufferData(j.ARRAY_BUFFER, r, k)
                }
                if (Q) {
                    B =
                        0;
                    for (R = Q.length; B < R; B++)
                        if (O = Q[B], O.needsUpdate && (O.boundTo === void 0 || O.boundTo === "vertices")) {
                            o = 0;
                            ja = O.value.length;
                            if (O.size === 1)
                                for (E = 0; E < ja; E++) O.array[E] = O.value[E];
                            else if (O.size === 2)
                                for (E = 0; E < ja; E++) ka = O.value[E], O.array[o] = ka.x, O.array[o + 1] = ka.y, o += 2;
                            else if (O.size === 3)
                                if (O.type === "c")
                                    for (E = 0; E < ja; E++) ka = O.value[E], O.array[o] = ka.r, O.array[o + 1] = ka.g, O.array[o + 2] = ka.b, o += 3;
                                else
                                    for (E = 0; E < ja; E++) ka = O.value[E], O.array[o] = ka.x, O.array[o + 1] = ka.y, O.array[o + 2] = ka.z, o += 3;
                            else if (O.size === 4)
                                for (E =
                                    0; E < ja; E++) ka = O.value[E], O.array[o] = ka.x, O.array[o + 1] = ka.y, O.array[o + 2] = ka.z, O.array[o + 3] = ka.w, o += 4;
                            j.bindBuffer(j.ARRAY_BUFFER, O.buffer);
                            j.bufferData(j.ARRAY_BUFFER, O.array, k)
                        }
                }
            }
            m.__dirtyVertices = !1;
            m.__dirtyColors = !1;
            l.attributes && t(l)
        } else if (ea instanceof THREE_M.ParticleSystem) l = b(ea, p), L = l.attributes && q(l), (m.__dirtyVertices || m.__dirtyColors || ea.sortParticles || L) && e(m, j.DYNAMIC_DRAW, ea), m.__dirtyVertices = !1, m.__dirtyColors = !1, l.attributes && t(l)
    };
    this.initMaterial = function(a, b, c, d) {
        var g, e, f, h;
        a instanceof THREE_M.MeshDepthMaterial ? h = "depth" : a instanceof THREE_M.MeshNormalMaterial ? h = "normal" : a instanceof THREE_M.MeshBasicMaterial ? h = "basic" : a instanceof THREE_M.MeshLambertMaterial ? h = "lambert" : a instanceof THREE_M.MeshPhongMaterial ? h = "phong" : a instanceof THREE_M.LineBasicMaterial ? h = "basic" : a instanceof THREE_M.ParticleBasicMaterial && (h = "particle_basic");
        if (h) {
            var i = THREE_M.ShaderLib[h];
            a.uniforms = THREE_M.UniformsUtils.clone(i.uniforms);
            a.vertexShader = i.vertexShader;
            a.fragmentShader = i.fragmentShader
        }
        var k,
            l, m;
        k = m = i = 0;
        for (l = b.length; k < l; k++) f = b[k], f instanceof THREE_M.SpotLight && m++, f instanceof THREE_M.DirectionalLight && m++, f instanceof THREE_M.PointLight && i++;
        i + m <= ba ? k = m : (k = Math.ceil(ba * m / (i + m)), i = ba - k);
        f = {
            directional: k,
            point: i
        };
        i = m = 0;
        for (k = b.length; i < k; i++) l = b[i], l instanceof THREE_M.SpotLight && l.castShadow && m++;
        var n = 50;
        if (d !== void 0 && d instanceof THREE_M.SkinnedMesh) n = d.bones.length;
        var o;
        a: {
            k = a.fragmentShader;
            l = a.vertexShader;
            var i = a.uniforms,
                b = a.attributes,
                c = {
                    map: !!a.map,
                    envMap: !!a.envMap,
                    lightMap: !!a.lightMap,
                    vertexColors: a.vertexColors,
                    fog: c,
                    useFog: a.fog,
                    sizeAttenuation: a.sizeAttenuation,
                    skinning: a.skinning,
                    morphTargets: a.morphTargets,
                    maxMorphTargets: this.maxMorphTargets,
                    maxDirLights: f.directional,
                    maxPointLights: f.point,
                    maxBones: n,
                    shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                    shadowMapSoft: this.shadowMapSoft,
                    shadowMapWidth: this.shadowMapWidth,
                    shadowMapHeight: this.shadowMapHeight,
                    maxShadows: m,
                    alphaTest: a.alphaTest,
                    metal: a.metal,
                    perPixel: a.perPixel
                },
                p, d = [];
            h ? d.push(h) : (d.push(k), d.push(l));
            for (p in c) d.push(p),
                d.push(c[p]);
            h = d.join();
            p = 0;
            for (d = X.length; p < d; p++)
                if (X[p].code === h) {
                    o = X[p].program;
                    break a
                }
            p = j.createProgram();
            d = [ya ? "#define VERTEX_TEXTURES" : "", W.gammaInput ? "#define GAMMA_INPUT" : "", W.gammaOutput ? "#define GAMMA_OUTPUT" : "", W.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "",
                c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "", c.morphTargets ? "#define USE_MORPHTARGETS" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"
            ].join("\n");
            f = ["#ifdef GL_ES", "precision " + aa + " float;", "#endif", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "", W.gammaInput ? "#define GAMMA_INPUT" : "", W.gammaOutput ? "#define GAMMA_OUTPUT" : "", W.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fog instanceof THREE_M.FogExp2 ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" :
                "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.metal ? "#define METAL" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", c.shadowMapSoft ? "#define SHADOWMAP_WIDTH " + c.shadowMapWidth.toFixed(1) : "", c.shadowMapSoft ? "#define SHADOWMAP_HEIGHT " + c.shadowMapHeight.toFixed(1) : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"
            ].join("\n");
            j.attachShader(p, J("fragment", f + k));
            j.attachShader(p,
                J("vertex", d + l));
            j.linkProgram(p);
            j.getProgramParameter(p, j.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + j.getProgramParameter(p, j.VALIDATE_STATUS) + ", gl error [" + j.getError() + "]");
            p.uniforms = {};
            p.attributes = {};
            var L, d = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "cameraInverseMatrix", "boneGlobalMatrices", "morphTargetInfluences"];
            for (L in i) d.push(L);
            L = d;
            d = 0;
            for (i = L.length; d < i; d++) k = L[d], p.uniforms[k] = j.getUniformLocation(p,
                k);
            d = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
            for (L = 0; L < c.maxMorphTargets; L++) d.push("morphTarget" + L);
            for (o in b) d.push(o);
            o = d;
            L = 0;
            for (b = o.length; L < b; L++) c = o[L], p.attributes[c] = j.getAttribLocation(p, c);
            p.id = X.length;
            X.push({
                program: p,
                code: h
            });
            W.info.memory.programs = X.length;
            o = p
        }
        a.program = o;
        o = a.program.attributes;
        o.position >= 0 && j.enableVertexAttribArray(o.position);
        o.color >= 0 && j.enableVertexAttribArray(o.color);
        o.normal >= 0 && j.enableVertexAttribArray(o.normal);
        o.tangent >= 0 && j.enableVertexAttribArray(o.tangent);
        a.skinning && o.skinVertexA >= 0 && o.skinVertexB >= 0 && o.skinIndex >= 0 && o.skinWeight >= 0 && (j.enableVertexAttribArray(o.skinVertexA), j.enableVertexAttribArray(o.skinVertexB), j.enableVertexAttribArray(o.skinIndex), j.enableVertexAttribArray(o.skinWeight));
        if (a.attributes)
            for (e in a.attributes) o[e] !== void 0 && o[e] >= 0 && j.enableVertexAttribArray(o[e]);
        if (a.morphTargets)
            for (e = a.numSupportedMorphTargets = 0; e < this.maxMorphTargets; e++) L = "morphTarget" + e, o[L] >= 0 && (j.enableVertexAttribArray(o[L]),
                a.numSupportedMorphTargets++);
        a.uniformsList = [];
        for (g in a.uniforms) a.uniformsList.push([a.uniforms[g], g])
    };
    this.setFaceCulling = function(a, b) {
        a ? (!b || b === "ccw" ? j.frontFace(j.CCW) : j.frontFace(j.CW), a === "back" ? j.cullFace(j.BACK) : a === "front" ? j.cullFace(j.FRONT) : j.cullFace(j.FRONT_AND_BACK), j.enable(j.CULL_FACE)) : j.disable(j.CULL_FACE)
    }
};
THREE_M.WebGLRenderTarget = function(a, c, b) {
    this.width = a;
    this.height = c;
    b = b || {};
    this.wrapS = b.wrapS !== void 0 ? b.wrapS : THREE_M.ClampToEdgeWrapping;
    this.wrapT = b.wrapT !== void 0 ? b.wrapT : THREE_M.ClampToEdgeWrapping;
    this.magFilter = b.magFilter !== void 0 ? b.magFilter : THREE_M.LinearFilter;
    this.minFilter = b.minFilter !== void 0 ? b.minFilter : THREE_M.LinearMipMapLinearFilter;
    this.offset = new THREE_M.Vector2(0, 0);
    this.repeat = new THREE_M.Vector2(1, 1);
    this.format = b.format !== void 0 ? b.format : THREE_M.RGBAFormat;
    this.type = b.type !== void 0 ? b.type :
        THREE_M.UnsignedByteType;
    this.depthBuffer = b.depthBuffer !== void 0 ? b.depthBuffer : !0;
    this.stencilBuffer = b.stencilBuffer !== void 0 ? b.stencilBuffer : !0
};
THREE_M.WebGLRenderTarget.prototype.clone = function() {
    var a = new THREE_M.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    return a
};
THREE_M.WebGLRenderTargetCube = function(a, c, b) {
    THREE_M.WebGLRenderTarget.call(this, a, c, b);
    this.activeCubeFace = 0
};
THREE_M.WebGLRenderTargetCube.prototype = new THREE_M.WebGLRenderTarget;
THREE_M.WebGLRenderTargetCube.prototype.constructor = THREE_M.WebGLRenderTargetCube;
THREE_M.RenderableVertex = function() {
    this.positionWorld = new THREE_M.Vector3;
    this.positionScreen = new THREE_M.Vector4;
    this.visible = !0
};
THREE_M.RenderableVertex.prototype.copy = function(a) {
    this.positionWorld.copy(a.positionWorld);
    this.positionScreen.copy(a.positionScreen)
};
THREE_M.RenderableFace3 = function() {
    this.v1 = new THREE_M.RenderableVertex;
    this.v2 = new THREE_M.RenderableVertex;
    this.v3 = new THREE_M.RenderableVertex;
    this.centroidWorld = new THREE_M.Vector3;
    this.centroidScreen = new THREE_M.Vector3;
    this.normalWorld = new THREE_M.Vector3;
    this.vertexNormalsWorld = [new THREE_M.Vector3, new THREE_M.Vector3, new THREE_M.Vector3];
    this.faceMaterial = this.material = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE_M.RenderableFace4 = function() {
    this.v1 = new THREE_M.RenderableVertex;
    this.v2 = new THREE_M.RenderableVertex;
    this.v3 = new THREE_M.RenderableVertex;
    this.v4 = new THREE_M.RenderableVertex;
    this.centroidWorld = new THREE_M.Vector3;
    this.centroidScreen = new THREE_M.Vector3;
    this.normalWorld = new THREE_M.Vector3;
    this.vertexNormalsWorld = [new THREE_M.Vector3, new THREE_M.Vector3, new THREE_M.Vector3, new THREE_M.Vector3];
    this.faceMaterial = this.material = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE_M.RenderableObject = function() {
    this.z = this.object = null
};
THREE_M.RenderableParticle = function() {
    this.rotation = this.z = this.y = this.x = null;
    this.scale = new THREE_M.Vector2;
    this.material = null
};
THREE_M.RenderableLine = function() {
    this.z = null;
    this.v1 = new THREE_M.RenderableVertex;
    this.v2 = new THREE_M.RenderableVertex;
    this.material = null
};
THREE_M.ColorUtils = {
    adjustHSV: function(a, c, b, d) {
        var g = THREE_M.ColorUtils.__hsv;
        THREE_M.ColorUtils.rgbToHsv(a, g);
        g.h = THREE_M.Math.clamp(g.h + c, 0, 1);
        g.s = THREE_M.Math.clamp(g.s + b, 0, 1);
        g.v = THREE_M.Math.clamp(g.v + d, 0, 1);
        a.setHSV(g.h, g.s, g.v)
    },
    rgbToHsv: function(a, c) {
        var b = a.r,
            d = a.g,
            g = a.b,
            f = Math.max(Math.max(b, d), g),
            e = Math.min(Math.min(b, d), g);
        if (e === f) e = b = 0;
        else {
            var h = f - e,
                e = h / f,
                b = b === f ? (d - g) / h : d === f ? 2 + (g - b) / h : 4 + (b - d) / h;
            b /= 6;
            b < 0 && (b += 1);
            b > 1 && (b -= 1)
        }
        c === void 0 && (c = {
            h: 0,
            s: 0,
            v: 0
        });
        c.h = b;
        c.s = e;
        c.v = f;
        return c
    }
};
THREE_M.ColorUtils.__hsv = {
    h: 0,
    s: 0,
    v: 0
};
THREE_M.GeometryUtils = {
    merge: function(a, c) {
        for (var b, d, g = a.vertices.length, f = c instanceof THREE_M.Mesh ? c.geometry : c, e = a.vertices, h = f.vertices, i = a.faces, l = f.faces, k = a.faceVertexUvs[0], o = f.faceVertexUvs[0], p = {}, m = 0; m < a.materials.length; m++) p[a.materials[m].id] = m;
        if (c instanceof THREE_M.Mesh) c.matrixAutoUpdate && c.updateMatrix(), b = c.matrix, d = new THREE_M.Matrix4, d.extractRotation(b, c.scale);
        for (var m = 0, r = h.length; m < r; m++) {
            var n = new THREE_M.Vertex(h[m].position.clone());
            b && b.multiplyVector3(n.position);
            e.push(n)
        }
        m =
            0;
        for (r = l.length; m < r; m++) {
            var e = l[m],
                q, t, w = e.vertexNormals,
                u = e.vertexColors;
            e instanceof THREE_M.Face3 ? q = new THREE_M.Face3(e.a + g, e.b + g, e.c + g) : e instanceof THREE_M.Face4 && (q = new THREE_M.Face4(e.a + g, e.b + g, e.c + g, e.d + g));
            q.normal.copy(e.normal);
            d && d.multiplyVector3(q.normal);
            h = 0;
            for (n = w.length; h < n; h++) t = w[h].clone(), d && d.multiplyVector3(t), q.vertexNormals.push(t);
            q.color.copy(e.color);
            h = 0;
            for (n = u.length; h < n; h++) t = u[h], q.vertexColors.push(t.clone());
            if (e.materialIndex !== void 0) {
                h = f.materials[e.materialIndex];
                n = p[h.id];
                if (n === void 0) n = a.materials.length, a.materials.push(h);
                q.materialIndex = n
            }
            q.centroid.copy(e.centroid);
            b && b.multiplyVector3(q.centroid);
            i.push(q)
        }
        m = 0;
        for (r = o.length; m < r; m++) {
            b = o[m];
            d = [];
            h = 0;
            for (n = b.length; h < n; h++) d.push(new THREE_M.UV(b[h].u, b[h].v));
            k.push(d)
        }
    },
    clone: function(a) {
        var c = new THREE_M.Geometry,
            b, d = a.vertices,
            g = a.faces,
            f = a.faceVertexUvs[0];
        if (a.materials) c.materials = a.materials.slice();
        a = 0;
        for (b = d.length; a < b; a++) {
            var e = new THREE_M.Vertex(d[a].position.clone());
            c.vertices.push(e)
        }
        a = 0;
        for (b = g.length; a < b; a++) {
            var h = g[a],
                i, l, k = h.vertexNormals,
                o = h.vertexColors;
            h instanceof THREE_M.Face3 ? i = new THREE_M.Face3(h.a, h.b, h.c) : h instanceof THREE_M.Face4 && (i = new THREE_M.Face4(h.a, h.b, h.c, h.d));
            i.normal.copy(h.normal);
            d = 0;
            for (e = k.length; d < e; d++) l = k[d], i.vertexNormals.push(l.clone());
            i.color.copy(h.color);
            d = 0;
            for (e = o.length; d < e; d++) l = o[d], i.vertexColors.push(l.clone());
            i.materialIndex = h.materialIndex;
            i.centroid.copy(h.centroid);
            c.faces.push(i)
        }
        a = 0;
        for (b = f.length; a < b; a++) {
            g = f[a];
            i = [];
            d = 0;
            for (e = g.length; d <
                e; d++) i.push(new THREE_M.UV(g[d].u, g[d].v));
            c.faceVertexUvs[0].push(i)
        }
        return c
    },
    randomPointInTriangle: function(a, c, b) {
        var d, g, f, e = new THREE_M.Vector3,
            h = THREE_M.GeometryUtils.__v1;
        d = THREE_M.GeometryUtils.random();
        g = THREE_M.GeometryUtils.random();
        d + g > 1 && (d = 1 - d, g = 1 - g);
        f = 1 - d - g;
        e.copy(a);
        e.multiplyScalar(d);
        h.copy(c);
        h.multiplyScalar(g);
        e.addSelf(h);
        h.copy(b);
        h.multiplyScalar(f);
        e.addSelf(h);
        return e
    },
    randomPointInFace: function(a, c, b) {
        var d, g, f;
        if (a instanceof THREE_M.Face3) return d = c.vertices[a.a].position, g = c.vertices[a.b].position,
            f = c.vertices[a.c].position, THREE_M.GeometryUtils.randomPointInTriangle(d, g, f);
        else if (a instanceof THREE_M.Face4) {
            d = c.vertices[a.a].position;
            g = c.vertices[a.b].position;
            f = c.vertices[a.c].position;
            var c = c.vertices[a.d].position,
                e;
            b ? a._area1 && a._area2 ? (b = a._area1, e = a._area2) : (b = THREE_M.GeometryUtils.triangleArea(d, g, c), e = THREE_M.GeometryUtils.triangleArea(g, f, c), a._area1 = b, a._area2 = e) : (b = THREE_M.GeometryUtils.triangleArea(d, g, c), e = THREE_M.GeometryUtils.triangleArea(g, f, c));
            return THREE_M.GeometryUtils.random() * (b +
                e) < b ? THREE_M.GeometryUtils.randomPointInTriangle(d, g, c) : THREE_M.GeometryUtils.randomPointInTriangle(g, f, c)
        }
    },
    randomPointsInGeometry: function(a, c) {
        function b(a) {
            function b(c, d) {
                if (d < c) return c;
                var e = c + Math.floor((d - c) / 2);
                return l[e] > a ? b(c, e - 1) : l[e] < a ? b(e + 1, d) : e
            }
            return b(0, l.length - 1)
        }
        var d, g, f = a.faces,
            e = a.vertices,
            h = f.length,
            i = 0,
            l = [],
            k, o, p, m;
        for (g = 0; g < h; g++) {
            d = f[g];
            if (d instanceof THREE_M.Face3) k = e[d.a].position, o = e[d.b].position, p = e[d.c].position, d._area = THREE_M.GeometryUtils.triangleArea(k, o, p);
            else if (d instanceof THREE_M.Face4) k = e[d.a].position, o = e[d.b].position, p = e[d.c].position, m = e[d.d].position, d._area1 = THREE_M.GeometryUtils.triangleArea(k, o, m), d._area2 = THREE_M.GeometryUtils.triangleArea(o, p, m), d._area = d._area1 + d._area2;
            i += d._area;
            l[g] = i
        }
        d = [];
        e = {};
        for (g = 0; g < c; g++) h = THREE_M.GeometryUtils.random() * i, h = b(h), d[g] = THREE_M.GeometryUtils.randomPointInFace(f[h], a, !0), e[h] ? e[h] += 1 : e[h] = 1;
        return d
    },
    triangleArea: function(a, c, b) {
        var d, g = THREE_M.GeometryUtils.__v1;
        g.sub(a, c);
        d = g.length();
        g.sub(a, b);
        a = g.length();
        g.sub(c, b);
        b = g.length();
        c = 0.5 * (d + a + b);
        return Math.sqrt(c * (c - d) * (c - a) * (c - b))
    },
    center: function(a) {
        a.computeBoundingBox();
        var c = new THREE_M.Matrix4;
        c.setTranslation(-0.5 * (a.boundingBox.x[1] + a.boundingBox.x[0]), -0.5 * (a.boundingBox.y[1] + a.boundingBox.y[0]), -0.5 * (a.boundingBox.z[1] + a.boundingBox.z[0]));
        a.applyMatrix(c);
        a.computeBoundingBox()
    }
};
THREE_M.GeometryUtils.random = THREE_M.Math.random16;
THREE_M.GeometryUtils.__v1 = new THREE_M.Vector3;
THREE_M.ImageUtils = {
    loadTexture: function(a, c, b) {
        var d = new Image,
            g = new THREE_M.Texture(d, c);
        d.onload = function() {
            g.needsUpdate = !0;
            b && b(this)
        };
        d.crossOrigin = "";
        d.src = a;
        return g
    },
    loadTextureCube: function(a, c, b) {
        var d, g = [],
            f = new THREE_M.Texture(g, c),
            c = g.loadCount = 0;
        for (d = a.length; c < d; ++c) g[c] = new Image, g[c].onload = function() {
            g.loadCount += 1;
            if (g.loadCount === 6) f.needsUpdate = !0;
            b && b(this)
        }, g[c].crossOrigin = "", g[c].src = a[c];
        return f
    },
    getNormalMap: function(a, c) {
        var b = function(a) {
            var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] +
                a[2] * a[2]);
            return [a[0] / b, a[1] / b, a[2] / b]
        };
        c |= 1;
        var d = a.width,
            g = a.height,
            f = document.createElement("canvas");
        f.width = d;
        f.height = g;
        var e = f.getContext("2d");
        e.drawImage(a, 0, 0);
        for (var h = e.getImageData(0, 0, d, g).data, i = e.createImageData(d, g), l = i.data, k = 0; k < d; k++)
            for (var o = 1; o < g; o++) {
                var p = o - 1 < 0 ? g - 1 : o - 1,
                    m = (o + 1) % g,
                    r = k - 1 < 0 ? d - 1 : k - 1,
                    n = (k + 1) % d,
                    q = [],
                    t = [0, 0, h[(o * d + k) * 4] / 255 * c];
                q.push([-1, 0, h[(o * d + r) * 4] / 255 * c]);
                q.push([-1, -1, h[(p * d + r) * 4] / 255 * c]);
                q.push([0, -1, h[(p * d + k) * 4] / 255 * c]);
                q.push([1, -1, h[(p * d + n) * 4] / 255 * c]);
                q.push([1, 0, h[(o * d + n) * 4] / 255 * c]);
                q.push([1, 1, h[(m * d + n) * 4] / 255 * c]);
                q.push([0, 1, h[(m * d + k) * 4] / 255 * c]);
                q.push([-1, 1, h[(m * d + r) * 4] / 255 * c]);
                p = [];
                r = q.length;
                for (m = 0; m < r; m++) {
                    var n = q[m],
                        w = q[(m + 1) % r],
                        n = [n[0] - t[0], n[1] - t[1], n[2] - t[2]],
                        w = [w[0] - t[0], w[1] - t[1], w[2] - t[2]];
                    p.push(b([n[1] * w[2] - n[2] * w[1], n[2] * w[0] - n[0] * w[2], n[0] * w[1] - n[1] * w[0]]))
                }
                q = [0, 0, 0];
                for (m = 0; m < p.length; m++) q[0] += p[m][0], q[1] += p[m][1], q[2] += p[m][2];
                q[0] /= p.length;
                q[1] /= p.length;
                q[2] /= p.length;
                t = (o * d + k) * 4;
                l[t] = (q[0] + 1) / 2 * 255 | 0;
                l[t + 1] = (q[1] + 0.5) *
                    255 | 0;
                l[t + 2] = q[2] * 255 | 0;
                l[t + 3] = 255
            }
        e.putImageData(i, 0, 0);
        return f
    }
};
THREE_M.SceneUtils = {
    showHierarchy: function(a, c) {
        THREE_M.SceneUtils.traverseHierarchy(a, function(a) {
            a.visible = c
        })
    },
    traverseHierarchy: function(a, c) {
        var b, d, g = a.children.length;
        for (d = 0; d < g; d++) b = a.children[d], c(b), THREE_M.SceneUtils.traverseHierarchy(b, c)
    },
    createMultiMaterialObject: function(a, c) {
        var b, d = c.length,
            g = new THREE_M.Object3D;
        for (b = 0; b < d; b++) {
            var f = new THREE_M.Mesh(a, c[b]);
            g.add(f)
        }
        return g
    },
    cloneObject: function(a) {
        var c;
        a instanceof THREE_M.MorphAnimMesh ? (c = new THREE_M.MorphAnimMesh(a.geometry, a.material),
                c.duration = a.duration, c.mirroredLoop = a.mirroredLoop, c.time = a.time, c.lastKeyframe = a.lastKeyframe, c.currentKeyframe = a.currentKeyframe, c.direction = a.direction, c.directionBackwards = a.directionBackwards) : a instanceof THREE_M.SkinnedMesh ? c = new THREE_M.SkinnedMesh(a.geometry, a.material) : a instanceof THREE_M.Mesh ? c = new THREE_M.Mesh(a.geometry, a.material) : a instanceof THREE_M.Line ? c = new THREE_M.Line(a.geometry, a.material, a.type) : a instanceof THREE_M.Ribbon ? c = new THREE_M.Ribbon(a.geometry, a.material) : a instanceof THREE_M.ParticleSystem ?
            (c = new THREE_M.ParticleSystem(a.geometry, a.material), c.sortParticles = a.sortParticles) : a instanceof THREE_M.Particle ? c = new THREE_M.Particle(a.material) : a instanceof THREE_M.Sprite ? (c = new THREE_M.Sprite({}), c.color.copy(a.color), c.map = a.map, c.blending = a.blending, c.useScreenCoordinates = a.useScreenCoordinates, c.mergeWith3D = a.mergeWith3D, c.affectedByDistance = a.affectedByDistance, c.scaleByViewport = a.scaleByViewport, c.alignment = a.alignment, c.rotation3d.copy(a.rotation3d), c.rotation = a.rotation, c.opacity = a.opacity,
                c.uvOffset.copy(a.uvOffset), c.uvScale.copy(a.uvScale)) : a instanceof THREE_M.LOD ? c = new THREE_M.LOD : a instanceof THREE_M.MarchingCubes ? (c = new THREE_M.MarchingCubes(a.resolution, a.material), c.field.set(a.field), c.isolation = a.isolation) : a instanceof THREE_M.Object3D && (c = new THREE_M.Object3D);
        c.parent = a.parent;
        c.up.copy(a.up);
        c.position.copy(a.position);
        c.rotation instanceof THREE_M.Vector3 && c.rotation.copy(a.rotation);
        c.eulerOrder = a.eulerOrder;
        c.scale.copy(a.scale);
        c.dynamic = a.dynamic;
        c.doubleSided = a.doubleSided;
        c.flipSided =
            a.flipSided;
        c.renderDepth = a.renderDepth;
        c.rotationAutoUpdate = a.rotationAutoUpdate;
        c.matrix.copy(a.matrix);
        c.matrixWorld.copy(a.matrixWorld);
        c.matrixRotationWorld.copy(a.matrixRotationWorld);
        c.matrixAutoUpdate = a.matrixAutoUpdate;
        c.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
        c.quaternion.copy(a.quaternion);
        c.useQuaternion = a.useQuaternion;
        c.boundRadius = a.boundRadius;
        c.boundRadiusScale = a.boundRadiusScale;
        c.visible = a.visible;
        c.castShadow = a.castShadow;
        c.receiveShadow = a.receiveShadow;
        c.frustumCulled =
            a.frustumCulled;
        for (var b = 0; b < a.children.length; b++) {
            var d = THREE_M.SceneUtils.cloneObject(a.children[b]);
            c.children[b] = d;
            d.parent = c
        }
        if (a instanceof THREE_M.LOD)
            for (b = 0; b < a.LODs.length; b++) c.LODs[b] = {
                visibleAtDistance: a.LODs[b].visibleAtDistance,
                object3D: c.children[b]
            };
        return c
    }
};
if (THREE_M.WebGLRenderer) THREE_M.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: 0.1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: THREE_M.UniformsUtils.merge([THREE_M.UniformsLib.fog, THREE_M.UniformsLib.lights, THREE_M.UniformsLib.shadowmap, {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                enableSpecular: {
                    type: "i",
                    value: 0
                },
                enableReflection: {
                    type: "i",
                    value: 0
                },
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tSpecular: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                tDisplacement: {
                    type: "t",
                    value: 5,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                uDisplacementBias: {
                    type: "f",
                    value: 0
                },
                uDisplacementScale: {
                    type: "f",
                    value: 1
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE_M.Color(15658734)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE_M.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE_M.Color(328965)
                },
                uShininess: {
                    type: "f",
                    value: 30
                },
                uOpacity: {
                    type: "f",
                    value: 1
                },
                uReflectivity: {
                    type: "f",
                    value: 0.5
                },
                uOffset: {
                    type: "v2",
                    value: new THREE_M.Vector2(0, 0)
                },
                uRepeat: {
                    type: "v2",
                    value: new THREE_M.Vector2(1, 1)
                }
            }]),
            fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
                THREE_M.ShaderChunk.shadowmap_pars_fragment, THREE_M.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\nif( enableAO )\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + viewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 wPos = cameraPosition - vViewPosition;\nvec3 vReflect = reflect( normalize( wPos ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, uReflectivity );\n}",
                THREE_M.ShaderChunk.shadowmap_fragment, THREE_M.ShaderChunk.fog_fragment, "}"
            ].join("\n"),
            vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
                THREE_M.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvViewPosition = -mvPosition.xyz;\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv * uRepeat + uOffset;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif",
                THREE_M.ShaderChunk.shadowmap_vertex, "}"
            ].join("\n")
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tFlip: {
                    type: "f",
                    value: -1
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
        }
    }
};
THREE_M.Curve = function() {};
THREE_M.Curve.prototype.getPoint = function() {
    console.log("Warning, getPoint() not implemented!");
    return null
};
THREE_M.Curve.prototype.getPointAt = function(a) {
    return this.getPoint(this.getUtoTmapping(a))
};
THREE_M.Curve.prototype.getPoints = function(a) {
    a || (a = 5);
    var c, b = [];
    for (c = 0; c <= a; c++) b.push(this.getPoint(c / a));
    return b
};
THREE_M.Curve.prototype.getSpacedPoints = function(a) {
    a || (a = 5);
    var c, b = [];
    for (c = 0; c <= a; c++) b.push(this.getPointAt(c / a));
    return b
};
THREE_M.Curve.prototype.getLength = function() {
    var a = this.getLengths();
    return a[a.length - 1]
};
THREE_M.Curve.prototype.getLengths = function(a) {
    a || (a = 200);
    if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1) return this.cacheArcLengths;
    var c = [],
        b, d = this.getPoint(0),
        g, f = 0;
    c.push(0);
    for (g = 1; g <= a; g++) b = this.getPoint(g / a), f += b.distanceTo(d), c.push(f), d = b;
    return this.cacheArcLengths = c
};
THREE_M.Curve.prototype.getUtoTmapping = function(a, c) {
    var b = this.getLengths(),
        d = 0,
        g = b.length,
        f;
    f = c ? c : a * b[g - 1];
    for (var e = 0, h = g - 1, i; e <= h;)
        if (d = Math.floor(e + (h - e) / 2), i = b[d] - f, i < 0) e = d + 1;
        else if (i > 0) h = d - 1;
    else {
        h = d;
        break
    }
    d = h;
    if (b[d] == f) return d / (g - 1);
    e = b[d];
    return b = (d + (f - e) / (b[d + 1] - e)) / (g - 1)
};
THREE_M.Curve.prototype.getNormalVector = function(a) {
    a = this.getTangent(a);
    return new THREE_M.Vector2(-a.y, a.x)
};
THREE_M.Curve.prototype.getTangent = function(a) {
    var c = a - 1.0E-4;
    a += 1.0E-4;
    c < 0 && (c = 0);
    a > 1 && (a = 1);
    c = this.getPoint(c);
    a = this.getPoint(a);
    return c.clone().subSelf(a).normalize()
};
THREE_M.Curve.prototype.getTangentAt = function(a) {
    return this.getTangent(this.getUtoTmapping(a))
};
THREE_M.LineCurve = function(a, c) {
    a instanceof THREE_M.Vector2 ? (this.v1 = a, this.v2 = c) : THREE_M.LineCurve.oldConstructor.apply(this, arguments)
};
THREE_M.LineCurve.oldConstructor = function(a, c, b, d) {
    this.constructor(new THREE_M.Vector2(a, c), new THREE_M.Vector2(b, d))
};
THREE_M.LineCurve.prototype = new THREE_M.Curve;
THREE_M.LineCurve.prototype.constructor = THREE_M.LineCurve;
THREE_M.LineCurve.prototype.getPoint = function(a) {
    var c = new THREE_M.Vector2;
    c.sub(this.v2, this.v1);
    c.multiplyScalar(a).addSelf(this.v1);
    return c
};
THREE_M.LineCurve.prototype.getPointAt = function(a) {
    return this.getPoint(a)
};
THREE_M.LineCurve.prototype.getTangent = function() {
    var a = new THREE_M.Vector2;
    a.sub(this.v2, this.v1);
    a.normalize();
    return a
};
THREE_M.QuadraticBezierCurve = function(a, c, b) {
    if (!(c instanceof THREE_M.Vector2)) var d = Array.prototype.slice.call(arguments),
        a = new THREE_M.Vector2(d[0], d[1]),
        c = new THREE_M.Vector2(d[2], d[3]),
        b = new THREE_M.Vector2(d[4], d[5]);
    this.v0 = a;
    this.v1 = c;
    this.v2 = b
};
THREE_M.QuadraticBezierCurve.prototype = new THREE_M.Curve;
THREE_M.QuadraticBezierCurve.prototype.constructor = THREE_M.QuadraticBezierCurve;
THREE_M.QuadraticBezierCurve.prototype.getPoint = function(a) {
    var c;
    c = THREE_M.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE_M.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    return new THREE_M.Vector2(c, a)
};
THREE_M.QuadraticBezierCurve.prototype.getTangent = function(a) {
    var c;
    c = THREE_M.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE_M.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
    c = new THREE_M.Vector2(c, a);
    c.normalize();
    return c
};
THREE_M.CubicBezierCurve = function(a, c, b, d) {
    if (!(c instanceof THREE_M.Vector2)) var g = Array.prototype.slice.call(arguments),
        a = new THREE_M.Vector2(g[0], g[1]),
        c = new THREE_M.Vector2(g[2], g[3]),
        b = new THREE_M.Vector2(g[4], g[5]),
        d = new THREE_M.Vector2(g[6], g[7]);
    this.v0 = a;
    this.v1 = c;
    this.v2 = b;
    this.v3 = d
};
THREE_M.CubicBezierCurve.prototype = new THREE_M.Curve;
THREE_M.CubicBezierCurve.prototype.constructor = THREE_M.CubicBezierCurve;
THREE_M.CubicBezierCurve.prototype.getPoint = function(a) {
    var c;
    c = THREE_M.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE_M.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    return new THREE_M.Vector2(c, a)
};
THREE_M.CubicBezierCurve.prototype.getTangent = function(a) {
    var c;
    c = THREE_M.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE_M.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    c = new THREE_M.Vector2(c, a);
    c.normalize();
    return c
};
THREE_M.SplineCurve = function(a) {
    this.points = a == void 0 ? [] : a
};
THREE_M.SplineCurve.prototype = new THREE_M.Curve;
THREE_M.SplineCurve.prototype.constructor = THREE_M.SplineCurve;
THREE_M.SplineCurve.prototype.getPoint = function(a) {
    var c = new THREE_M.Vector2,
        b = [],
        d = this.points,
        g;
    g = (d.length - 1) * a;
    a = Math.floor(g);
    g -= a;
    b[0] = a == 0 ? a : a - 1;
    b[1] = a;
    b[2] = a > d.length - 2 ? a : a + 1;
    b[3] = a > d.length - 3 ? a : a + 2;
    c.x = THREE_M.Curve.Utils.interpolate(d[b[0]].x, d[b[1]].x, d[b[2]].x, d[b[3]].x, g);
    c.y = THREE_M.Curve.Utils.interpolate(d[b[0]].y, d[b[1]].y, d[b[2]].y, d[b[3]].y, g);
    return c
};
THREE_M.ArcCurve = function(a, c, b, d, g, f) {
    this.aX = a;
    this.aY = c;
    this.aRadius = b;
    this.aStartAngle = d;
    this.aEndAngle = g;
    this.aClockwise = f
};
THREE_M.ArcCurve.prototype = new THREE_M.Curve;
THREE_M.ArcCurve.prototype.constructor = THREE_M.ArcCurve;
THREE_M.ArcCurve.prototype.getPoint = function(a) {
    var c = this.aEndAngle - this.aStartAngle;
    this.aClockwise || (a = 1 - a);
    a = this.aStartAngle + a * c;
    return new THREE_M.Vector2(this.aX + this.aRadius * Math.cos(a), this.aY + this.aRadius * Math.sin(a))
};
THREE_M.Curve.Utils = {
    tangentQuadraticBezier: function(a, c, b, d) {
        return 2 * (1 - a) * (b - c) + 2 * a * (d - b)
    },
    tangentCubicBezier: function(a, c, b, d, g) {
        return -3 * c * (1 - a) * (1 - a) + 3 * b * (1 - a) * (1 - a) - 6 * a * b * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * g
    },
    tangentSpline: function(a) {
        return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
    },
    interpolate: function(a, c, b, d, g) {
        var a = (b - a) * 0.5,
            d = (d - c) * 0.5,
            f = g * g;
        return (2 * c - 2 * b + a + d) * g * f + (-3 * c + 3 * b - 2 * a - d) * f + a * g + c
    }
};
THREE_M.Curve.create = function(a, c) {
    a.prototype = new THREE_M.Curve;
    a.prototype.constructor = a;
    a.prototype.getPoint = c;
    return a
};
THREE_M.LineCurve3 = THREE_M.Curve.create(function(a, c) {
    this.v1 = a;
    this.v2 = c
}, function(a) {
    var c = new THREE_M.Vector3;
    c.sub(this.v2, this.v1);
    c.multiplyScalar(a);
    c.addSelf(this.v1);
    return c
});
THREE_M.QuadraticBezierCurve3 = THREE_M.Curve.create(function(a, c, b) {
    this.v0 = a;
    this.v1 = c;
    this.v2 = b
}, function(a) {
    var c, b;
    c = THREE_M.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    b = THREE_M.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    a = THREE_M.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
    return new THREE_M.Vector3(c, b, a)
});
THREE_M.CubicBezierCurve3 = THREE_M.Curve.create(function(a, c, b, d) {
    this.v0 = a;
    this.v1 = c;
    this.v2 = b;
    this.v3 = d
}, function(a) {
    var c, b;
    c = THREE_M.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    b = THREE_M.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    a = THREE_M.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
    return new THREE_M.Vector3(c, b, a)
});
THREE_M.SplineCurve3 = THREE_M.Curve.create(function(a) {
    this.points = a == void 0 ? [] : a
}, function(a) {
    var c = new THREE_M.Vector3,
        b = [],
        d = this.points,
        g;
    g = (d.length - 1) * a;
    a = Math.floor(g);
    g -= a;
    b[0] = a == 0 ? a : a - 1;
    b[1] = a;
    b[2] = a > d.length - 2 ? a : a + 1;
    b[3] = a > d.length - 3 ? a : a + 2;
    c.x = THREE_M.Curve.Utils.interpolate(d[b[0]].x, d[b[1]].x, d[b[2]].x, d[b[3]].x, g);
    c.y = THREE_M.Curve.Utils.interpolate(d[b[0]].y, d[b[1]].y, d[b[2]].y, d[b[3]].y, g);
    c.z = THREE_M.Curve.Utils.interpolate(d[b[0]].z, d[b[1]].z, d[b[2]].z, d[b[3]].z, g);
    return c
});
THREE_M.CurvePath = function() {
    this.curves = [];
    this.bends = []
};
THREE_M.CurvePath.prototype = new THREE_M.Curve;
THREE_M.CurvePath.prototype.constructor = THREE_M.CurvePath;
THREE_M.CurvePath.prototype.add = function(a) {
    this.curves.push(a)
};
THREE_M.CurvePath.prototype.checkConnection = function() {};
THREE_M.CurvePath.prototype.closePath = function() {};
THREE_M.CurvePath.prototype.getPoint = function(a) {
    for (var c = a * this.getLength(), b = this.getCurveLengths(), a = 0; a < b.length;) {
        if (b[a] >= c) return c = b[a] - c, a = this.curves[a], c = 1 - c / a.getLength(), a.getPointAt(c);
        a++
    }
    return null
};
THREE_M.CurvePath.prototype.getLength = function() {
    var a = this.getCurveLengths();
    return a[a.length - 1]
};
THREE_M.CurvePath.prototype.getCurveLengths = function() {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
    var a = [],
        c = 0,
        b, d = this.curves.length;
    for (b = 0; b < d; b++) c += this.curves[b].getLength(), a.push(c);
    return this.cacheLengths = a
};
THREE_M.CurvePath.prototype.getBoundingBox = function() {
    var a = this.getPoints(),
        c, b, d, g;
    c = b = Number.NEGATIVE_INFINITY;
    d = g = Number.POSITIVE_INFINITY;
    var f, e, h, i;
    i = new THREE_M.Vector2;
    e = 0;
    for (h = a.length; e < h; e++) {
        f = a[e];
        if (f.x > c) c = f.x;
        else if (f.x < d) d = f.x;
        if (f.y > b) b = f.y;
        else if (f.y < b) g = f.y;
        i.addSelf(f.x, f.y)
    }
    return {
        minX: d,
        minY: g,
        maxX: c,
        maxY: b,
        centroid: i.divideScalar(h)
    }
};
THREE_M.CurvePath.prototype.createPointsGeometry = function(a) {
    return this.createGeometry(this.getPoints(a, !0))
};
THREE_M.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
    return this.createGeometry(this.getSpacedPoints(a, !0))
};
THREE_M.CurvePath.prototype.createGeometry = function(a) {
    for (var c = new THREE_M.Geometry, b = 0; b < a.length; b++) c.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(a[b].x, a[b].y, 0)));
    return c
};
THREE_M.CurvePath.prototype.addWrapPath = function(a) {
    this.bends.push(a)
};
THREE_M.CurvePath.prototype.getTransformedPoints = function(a, c) {
    var b = this.getPoints(a),
        d, g;
    if (!c) c = this.bends;
    d = 0;
    for (g = c.length; d < g; d++) b = this.getWrapPoints(b, c[d]);
    return b
};
THREE_M.CurvePath.prototype.getTransformedSpacedPoints = function(a, c) {
    var b = this.getSpacedPoints(a),
        d, g;
    if (!c) c = this.bends;
    d = 0;
    for (g = c.length; d < g; d++) b = this.getWrapPoints(b, c[d]);
    return b
};
THREE_M.CurvePath.prototype.getWrapPoints = function(a, c) {
    var b = this.getBoundingBox(),
        d, g, f, e, h, i;
    d = 0;
    for (g = a.length; d < g; d++) f = a[d], e = f.x, h = f.y, i = e / b.maxX, i = c.getUtoTmapping(i, e), e = c.getPoint(i), h = c.getNormalVector(i).multiplyScalar(h), f.x = e.x + h.x, f.y = e.y + h.y;
    return a
};
THREE_M.Path = function(a) {
    THREE_M.CurvePath.call(this);
    this.actions = [];
    a && this.fromPoints(a)
};
THREE_M.Path.prototype = new THREE_M.CurvePath;
THREE_M.Path.prototype.constructor = THREE_M.Path;
THREE_M.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc"
};
THREE_M.Path.prototype.fromPoints = function(a) {
    this.moveTo(a[0].x, a[0].y);
    var c, b = a.length;
    for (c = 1; c < b; c++) this.lineTo(a[c].x, a[c].y)
};
THREE_M.Path.prototype.moveTo = function() {
    var a = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE_M.PathActions.MOVE_TO,
        args: a
    })
};
THREE_M.Path.prototype.lineTo = function(a, c) {
    var b = Array.prototype.slice.call(arguments),
        d = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE_M.LineCurve(new THREE_M.Vector2(d[d.length - 2], d[d.length - 1]), new THREE_M.Vector2(a, c)));
    this.actions.push({
        action: THREE_M.PathActions.LINE_TO,
        args: b
    })
};
THREE_M.Path.prototype.quadraticCurveTo = function(a, c, b, d) {
    var g = Array.prototype.slice.call(arguments),
        f = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE_M.QuadraticBezierCurve(new THREE_M.Vector2(f[f.length - 2], f[f.length - 1]), new THREE_M.Vector2(a, c), new THREE_M.Vector2(b, d)));
    this.actions.push({
        action: THREE_M.PathActions.QUADRATIC_CURVE_TO,
        args: g
    })
};
THREE_M.Path.prototype.bezierCurveTo = function(a, c, b, d, g, f) {
    var e = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE_M.CubicBezierCurve(new THREE_M.Vector2(h[h.length - 2], h[h.length - 1]), new THREE_M.Vector2(a, c), new THREE_M.Vector2(b, d), new THREE_M.Vector2(g, f)));
    this.actions.push({
        action: THREE_M.PathActions.BEZIER_CURVE_TO,
        args: e
    })
};
THREE_M.Path.prototype.splineThru = function(a) {
    var c = Array.prototype.slice.call(arguments),
        b = this.actions[this.actions.length - 1].args,
        b = [new THREE_M.Vector2(b[b.length - 2], b[b.length - 1])];
    Array.prototype.push.apply(b, a);
    this.curves.push(new THREE_M.SplineCurve(b));
    this.actions.push({
        action: THREE_M.PathActions.CSPLINE_THRU,
        args: c
    })
};
THREE_M.Path.prototype.arc = function(a, c, b, d, g, f) {
    var e = Array.prototype.slice.call(arguments);
    this.curves.push(new THREE_M.ArcCurve(a, c, b, d, g, f));
    this.actions.push({
        action: THREE_M.PathActions.ARC,
        args: e
    })
};
THREE_M.Path.prototype.getSpacedPoints = function(a) {
    a || (a = 40);
    for (var c = [], b = 0; b < a; b++) c.push(this.getPoint(b / a));
    return c
};
THREE_M.Path.prototype.getPoints = function(a, c) {
    var a = a || 12,
        b = [],
        d, g, f, e, h, i, l, k, o, p, m, r, n;
    d = 0;
    for (g = this.actions.length; d < g; d++) switch (f = this.actions[d], e = f.action, f = f.args, e) {
        case THREE_M.PathActions.LINE_TO:
            b.push(new THREE_M.Vector2(f[0], f[1]));
            break;
        case THREE_M.PathActions.QUADRATIC_CURVE_TO:
            h = f[2];
            i = f[3];
            o = f[0];
            p = f[1];
            b.length > 0 ? (e = b[b.length - 1], m = e.x, r = e.y) : (e = this.actions[d - 1].args, m = e[e.length - 2], r = e[e.length - 1]);
            for (e = 1; e <= a; e++) n = e / a, f = THREE_M.Shape.Utils.b2(n, m, o, h), n = THREE_M.Shape.Utils.b2(n, r, p,
                i), b.push(new THREE_M.Vector2(f, n));
            break;
        case THREE_M.PathActions.BEZIER_CURVE_TO:
            h = f[4];
            i = f[5];
            o = f[0];
            p = f[1];
            l = f[2];
            k = f[3];
            b.length > 0 ? (e = b[b.length - 1], m = e.x, r = e.y) : (e = this.actions[d - 1].args, m = e[e.length - 2], r = e[e.length - 1]);
            for (e = 1; e <= a; e++) n = e / a, f = THREE_M.Shape.Utils.b3(n, m, o, l, h), n = THREE_M.Shape.Utils.b3(n, r, p, k, i), b.push(new THREE_M.Vector2(f, n));
            break;
        case THREE_M.PathActions.CSPLINE_THRU:
            e = this.actions[d - 1].args;
            e = [new THREE_M.Vector2(e[e.length - 2], e[e.length - 1])];
            n = a * f[0].length;
            e = e.concat(f[0]);
            f = new THREE_M.SplineCurve(e);
            for (e = 1; e <= n; e++) b.push(f.getPointAt(e / n));
            break;
        case THREE_M.PathActions.ARC:
            e = this.actions[d - 1].args;
            h = f[0];
            i = f[1];
            l = f[2];
            o = f[3];
            n = f[4];
            p = !!f[5];
            k = e[e.length - 2];
            m = e[e.length - 1];
            e.length == 0 && (k = m = 0);
            r = n - o;
            var q = a * 2;
            for (e = 1; e <= q; e++) n = e / q, p || (n = 1 - n), n = o + n * r, f = k + h + l * Math.cos(n), n = m + i + l * Math.sin(n), b.push(new THREE_M.Vector2(f, n))
    }
    c && b.push(b[0]);
    return b
};
THREE_M.Path.prototype.transform = function(a, c) {
    this.getBoundingBox();
    return this.getWrapPoints(this.getPoints(c), a)
};
THREE_M.Path.prototype.nltransform = function(a, c, b, d, g, f) {
    var e = this.getPoints(),
        h, i, l, k, o;
    h = 0;
    for (i = e.length; h < i; h++) l = e[h], k = l.x, o = l.y, l.x = a * k + c * o + b, l.y = d * o + g * k + f;
    return e
};
THREE_M.Path.prototype.debug = function(a) {
    var c = this.getBoundingBox();
    a || (a = document.createElement("canvas"), a.setAttribute("width", c.maxX + 100), a.setAttribute("height", c.maxY + 100), document.body.appendChild(a));
    c = a.getContext("2d");
    c.fillStyle = "white";
    c.fillRect(0, 0, a.width, a.height);
    c.strokeStyle = "black";
    c.beginPath();
    var b, d, g, a = 0;
    for (b = this.actions.length; a < b; a++) d = this.actions[a], g = d.args, d = d.action, d != THREE_M.PathActions.CSPLINE_THRU && c[d].apply(c, g);
    c.stroke();
    c.closePath();
    c.strokeStyle = "red";
    d =
        this.getPoints();
    a = 0;
    for (b = d.length; a < b; a++) g = d[a], c.beginPath(), c.arc(g.x, g.y, 1.5, 0, Math.PI * 2, !1), c.stroke(), c.closePath()
};
THREE_M.Path.prototype.toShapes = function() {
    var a, c, b, d, g = [],
        f = new THREE_M.Path;
    a = 0;
    for (c = this.actions.length; a < c; a++) b = this.actions[a], d = b.args, b = b.action, b == THREE_M.PathActions.MOVE_TO && f.actions.length != 0 && (g.push(f), f = new THREE_M.Path), f[b].apply(f, d);
    f.actions.length != 0 && g.push(f);
    if (g.length == 0) return [];
    var e, f = [];
    if (THREE_M.Shape.Utils.isClockWise(g[0].getPoints())) {
        a = 0;
        for (c = g.length; a < c; a++) d = g[a], THREE_M.Shape.Utils.isClockWise(d.getPoints()) ? (e && f.push(e), e = new THREE_M.Shape, e.actions = d.actions, e.curves =
            d.curves) : e.holes.push(d);
        f.push(e)
    } else {
        e = new THREE_M.Shape;
        a = 0;
        for (c = g.length; a < c; a++) d = g[a], THREE_M.Shape.Utils.isClockWise(d.getPoints()) ? (e.actions = d.actions, e.curves = d.curves, f.push(e), e = new THREE_M.Shape) : e.holes.push(d)
    }
    return f
};
THREE_M.Shape = function() {
    THREE_M.Path.apply(this, arguments);
    this.holes = []
};
THREE_M.Shape.prototype = new THREE_M.Path;
THREE_M.Shape.prototype.constructor = THREE_M.Path;
THREE_M.Shape.prototype.extrude = function(a) {
    return new THREE_M.ExtrudeGeometry(this, a)
};
THREE_M.Shape.prototype.getPointsHoles = function(a) {
    var c, b = this.holes.length,
        d = [];
    for (c = 0; c < b; c++) d[c] = this.holes[c].getTransformedPoints(a, this.bends);
    return d
};
THREE_M.Shape.prototype.getSpacedPointsHoles = function(a) {
    var c, b = this.holes.length,
        d = [];
    for (c = 0; c < b; c++) d[c] = this.holes[c].getTransformedSpacedPoints(a, this.bends);
    return d
};
THREE_M.Shape.prototype.extractAllPoints = function(a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    }
};
THREE_M.Shape.prototype.extractAllSpacedPoints = function(a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    }
};
THREE_M.Shape.Utils = {
    removeHoles: function(a, c) {
        var b = a.concat(),
            d = b.concat(),
            g, f, e, h, i, l, k, o, p, m, r = [];
        for (i = 0; i < c.length; i++) {
            l = c[i];
            Array.prototype.push.apply(d, l);
            f = Number.POSITIVE_INFINITY;
            for (g = 0; g < l.length; g++) {
                p = l[g];
                m = [];
                for (o = 0; o < b.length; o++) k = b[o], k = p.distanceToSquared(k), m.push(k), k < f && (f = k, e = g, h = o)
            }
            g = h - 1 >= 0 ? h - 1 : b.length - 1;
            f = e - 1 >= 0 ? e - 1 : l.length - 1;
            var n = [l[e], b[h], b[g]];
            o = THREE_M.FontUtils.Triangulate.area(n);
            var q = [l[e], l[f], b[h]];
            p = THREE_M.FontUtils.Triangulate.area(q);
            m = h;
            k = e;
            h += 1;
            e += -1;
            h <
                0 && (h += b.length);
            h %= b.length;
            e < 0 && (e += l.length);
            e %= l.length;
            g = h - 1 >= 0 ? h - 1 : b.length - 1;
            f = e - 1 >= 0 ? e - 1 : l.length - 1;
            n = [l[e], b[h], b[g]];
            n = THREE_M.FontUtils.Triangulate.area(n);
            q = [l[e], l[f], b[h]];
            q = THREE_M.FontUtils.Triangulate.area(q);
            o + p > n + q && (h = m, e = k, h < 0 && (h += b.length), h %= b.length, e < 0 && (e += l.length), e %= l.length, g = h - 1 >= 0 ? h - 1 : b.length - 1, f = e - 1 >= 0 ? e - 1 : l.length - 1);
            o = b.slice(0, h);
            p = b.slice(h);
            m = l.slice(e);
            k = l.slice(0, e);
            f = [l[e], l[f], b[h]];
            r.push([l[e], b[h], b[g]]);
            r.push(f);
            b = o.concat(m).concat(k).concat(p)
        }
        return {
            shape: b,
            isolatedPts: r,
            allpoints: d
        }
    },
    triangulateShape: function(a, c) {
        var b = THREE_M.Shape.Utils.removeHoles(a, c),
            d = b.allpoints,
            g = b.isolatedPts,
            b = THREE_M.FontUtils.Triangulate(b.shape, !1),
            f, e, h, i, l = {};
        f = 0;
        for (e = d.length; f < e; f++) i = d[f].x + ":" + d[f].y, l[i] !== void 0 && console.log("Duplicate point", i), l[i] = f;
        f = 0;
        for (e = b.length; f < e; f++) {
            h = b[f];
            for (d = 0; d < 3; d++) i = h[d].x + ":" + h[d].y, i = l[i], i !== void 0 && (h[d] = i)
        }
        f = 0;
        for (e = g.length; f < e; f++) {
            h = g[f];
            for (d = 0; d < 3; d++) i = h[d].x + ":" + h[d].y, i = l[i], i !== void 0 && (h[d] = i)
        }
        return b.concat(g)
    },
    isClockWise: function(a) {
        return THREE_M.FontUtils.Triangulate.area(a) < 0
    },
    b2p0: function(a, c) {
        var b = 1 - a;
        return b * b * c
    },
    b2p1: function(a, c) {
        return 2 * (1 - a) * a * c
    },
    b2p2: function(a, c) {
        return a * a * c
    },
    b2: function(a, c, b, d) {
        return this.b2p0(a, c) + this.b2p1(a, b) + this.b2p2(a, d)
    },
    b3p0: function(a, c) {
        var b = 1 - a;
        return b * b * b * c
    },
    b3p1: function(a, c) {
        var b = 1 - a;
        return 3 * b * b * a * c
    },
    b3p2: function(a, c) {
        return 3 * (1 - a) * a * a * c
    },
    b3p3: function(a, c) {
        return a * a * a * c
    },
    b3: function(a, c, b, d, g) {
        return this.b3p0(a, c) + this.b3p1(a, b) + this.b3p2(a, d) +
            this.b3p3(a, g)
    }
};
THREE_M.TextPath = function(a, c) {
    THREE_M.Path.call(this);
    this.parameters = c || {};
    this.set(a)
};
THREE_M.TextPath.prototype.set = function(a, c) {
    this.text = a;
    var c = c || this.parameters,
        b = c.curveSegments !== void 0 ? c.curveSegments : 4,
        d = c.font !== void 0 ? c.font : "helvetiker",
        g = c.weight !== void 0 ? c.weight : "normal",
        f = c.style !== void 0 ? c.style : "normal";
    THREE_M.FontUtils.size = c.size !== void 0 ? c.size : 100;
    THREE_M.FontUtils.divisions = b;
    THREE_M.FontUtils.face = d;
    THREE_M.FontUtils.weight = g;
    THREE_M.FontUtils.style = f
};
THREE_M.TextPath.prototype.toShapes = function() {
    for (var a = THREE_M.FontUtils.drawText(this.text).paths, c = [], b = 0, d = a.length; b < d; b++) Array.prototype.push.apply(c, a[b].toShapes());
    return c
};
THREE_M.AnimationHandler = function() {
    var a = [],
        c = {},
        b = {
            update: function(b) {
                for (var c = 0; c < a.length; c++) a[c].update(b)
            },
            addToUpdate: function(b) {
                a.indexOf(b) === -1 && a.push(b)
            },
            removeFromUpdate: function(b) {
                b = a.indexOf(b);
                b !== -1 && a.splice(b, 1)
            },
            add: function(a) {
                c[a.name] !== void 0 && console.log("THREE_M.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
                c[a.name] = a;
                if (a.initialized !== !0) {
                    for (var b = 0; b < a.hierarchy.length; b++) {
                        for (var d = 0; d < a.hierarchy[b].keys.length; d++) {
                            if (a.hierarchy[b].keys[d].time <
                                0) a.hierarchy[b].keys[d].time = 0;
                            if (a.hierarchy[b].keys[d].rot !== void 0 && !(a.hierarchy[b].keys[d].rot instanceof THREE_M.Quaternion)) {
                                var h = a.hierarchy[b].keys[d].rot;
                                a.hierarchy[b].keys[d].rot = new THREE_M.Quaternion(h[0], h[1], h[2], h[3])
                            }
                        }
                        if (a.hierarchy[b].keys[0].morphTargets !== void 0) {
                            h = {};
                            for (d = 0; d < a.hierarchy[b].keys.length; d++)
                                for (var i = 0; i < a.hierarchy[b].keys[d].morphTargets.length; i++) {
                                    var l = a.hierarchy[b].keys[d].morphTargets[i];
                                    h[l] = -1
                                }
                            a.hierarchy[b].usedMorphTargets = h;
                            for (d = 0; d < a.hierarchy[b].keys.length; d++) {
                                var k = {};
                                for (l in h) {
                                    for (i = 0; i < a.hierarchy[b].keys[d].morphTargets.length; i++)
                                        if (a.hierarchy[b].keys[d].morphTargets[i] === l) {
                                            k[l] = a.hierarchy[b].keys[d].morphTargetsInfluences[i];
                                            break
                                        }
                                    i === a.hierarchy[b].keys[d].morphTargets.length && (k[l] = 0)
                                }
                                a.hierarchy[b].keys[d].morphTargetsInfluences = k
                            }
                        }
                        for (d = 1; d < a.hierarchy[b].keys.length; d++) a.hierarchy[b].keys[d].time === a.hierarchy[b].keys[d - 1].time && (a.hierarchy[b].keys.splice(d, 1), d--);
                        for (d = 1; d < a.hierarchy[b].keys.length; d++) a.hierarchy[b].keys[d].index = d
                    }
                    d = parseInt(a.length *
                        a.fps, 10);
                    a.JIT = {};
                    a.JIT.hierarchy = [];
                    for (b = 0; b < a.hierarchy.length; b++) a.JIT.hierarchy.push(Array(d));
                    a.initialized = !0
                }
            },
            get: function(a) {
                if (typeof a === "string") return c[a] ? c[a] : (console.log("THREE_M.AnimationHandler.get: Couldn't find animation " + a), null)
            },
            parse: function(a) {
                var b = [];
                if (a instanceof THREE_M.SkinnedMesh)
                    for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
                else d(a, b);
                return b
            }
        },
        d = function(a, b) {
            b.push(a);
            for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
        };
    b.LINEAR = 0;
    b.CATMULLROM = 1;
    b.CATMULLROM_FORWARD =
        2;
    return b
}();
THREE_M.Animation = function(a, c, b, d) {
    this.root = a;
    this.data = THREE_M.AnimationHandler.get(c);
    this.hierarchy = THREE_M.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.loop = this.isPaused = !0;
    this.interpolationType = b !== void 0 ? b : THREE_M.AnimationHandler.LINEAR;
    this.JITCompile = d !== void 0 ? d : !0;
    this.points = [];
    this.target = new THREE_M.Vector3
};
THREE_M.Animation.prototype.play = function(a, c) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = a !== void 0 ? a : !0;
        this.currentTime = c !== void 0 ? c : 0;
        var b, d = this.hierarchy.length,
            g;
        for (b = 0; b < d; b++) {
            g = this.hierarchy[b];
            if (this.interpolationType !== THREE_M.AnimationHandler.CATMULLROM_FORWARD) g.useQuaternion = !0;
            g.matrixAutoUpdate = !0;
            if (g.animationCache === void 0) g.animationCache = {}, g.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, g.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, g.animationCache.originalMatrix = g instanceof
            THREE_M.Bone ? g.skinMatrix : g.matrix;
            var f = g.animationCache.prevKey;
            g = g.animationCache.nextKey;
            f.pos = this.data.hierarchy[b].keys[0];
            f.rot = this.data.hierarchy[b].keys[0];
            f.scl = this.data.hierarchy[b].keys[0];
            g.pos = this.getNextKeyWith("pos", b, 1);
            g.rot = this.getNextKeyWith("rot", b, 1);
            g.scl = this.getNextKeyWith("scl", b, 1)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE_M.AnimationHandler.addToUpdate(this)
};
THREE_M.Animation.prototype.pause = function() {
    this.isPaused ? THREE_M.AnimationHandler.addToUpdate(this) : THREE_M.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE_M.Animation.prototype.stop = function() {
    this.isPaused = this.isPlaying = !1;
    THREE_M.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.hierarchy.length; a++)
        if (this.hierarchy[a].animationCache !== void 0) this.hierarchy[a] instanceof THREE_M.Bone ? this.hierarchy[a].skinMatrix = this.hierarchy[a].animationCache.originalMatrix : this.hierarchy[a].matrix = this.hierarchy[a].animationCache.originalMatrix, delete this.hierarchy[a].animationCache
};
THREE_M.Animation.prototype.update = function(a) {
    if (this.isPlaying) {
        var c = ["pos", "rot", "scl"],
            b, d, g, f, e, h, i, l, k = this.data.JIT.hierarchy,
            o, p;
        this.currentTime += a * this.timeScale;
        p = this.currentTime;
        o = this.currentTime %= this.data.length;
        l = parseInt(Math.min(o * this.data.fps, this.data.length * this.data.fps), 10);
        for (var m = 0, r = this.hierarchy.length; m < r; m++)
            if (a = this.hierarchy[m], i = a.animationCache, this.JITCompile && k[m][l] !== void 0) a instanceof THREE_M.Bone ? (a.skinMatrix = k[m][l], a.matrixAutoUpdate = !1, a.matrixWorldNeedsUpdate = !1) : (a.matrix = k[m][l], a.matrixAutoUpdate = !1, a.matrixWorldNeedsUpdate = !0);
            else {
                if (this.JITCompile) a instanceof THREE_M.Bone ? a.skinMatrix = a.animationCache.originalMatrix : a.matrix = a.animationCache.originalMatrix;
                for (var n = 0; n < 3; n++) {
                    b = c[n];
                    e = i.prevKey[b];
                    h = i.nextKey[b];
                    if (h.time <= p) {
                        if (o < p)
                            if (this.loop) {
                                e = this.data.hierarchy[m].keys[0];
                                for (h = this.getNextKeyWith(b, m, 1); h.time < o;) e = h, h = this.getNextKeyWith(b, m, h.index + 1)
                            } else {
                                this.stop();
                                return
                            } else {
                            do e = h, h = this.getNextKeyWith(b, m, h.index + 1); while (h.time <
                                o)
                        }
                        i.prevKey[b] = e;
                        i.nextKey[b] = h
                    }
                    a.matrixAutoUpdate = !0;
                    a.matrixWorldNeedsUpdate = !0;
                    d = (o - e.time) / (h.time - e.time);
                    g = e[b];
                    f = h[b];
                    if (d < 0 || d > 1) console.log("THREE_M.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + m), d = d < 0 ? 0 : 1;
                    if (b === "pos")
                        if (b = a.position, this.interpolationType === THREE_M.AnimationHandler.LINEAR) b.x = g[0] + (f[0] - g[0]) * d, b.y = g[1] + (f[1] - g[1]) * d, b.z = g[2] + (f[2] - g[2]) * d;
                        else {
                            if (this.interpolationType === THREE_M.AnimationHandler.CATMULLROM || this.interpolationType === THREE_M.AnimationHandler.CATMULLROM_FORWARD)
                                if (this.points[0] =
                                    this.getPrevKeyWith("pos", m, e.index - 1).pos, this.points[1] = g, this.points[2] = f, this.points[3] = this.getNextKeyWith("pos", m, h.index + 1).pos, d = d * 0.33 + 0.33, g = this.interpolateCatmullRom(this.points, d), b.x = g[0], b.y = g[1], b.z = g[2], this.interpolationType === THREE_M.AnimationHandler.CATMULLROM_FORWARD) d = this.interpolateCatmullRom(this.points, d * 1.01), this.target.set(d[0], d[1], d[2]), this.target.subSelf(b), this.target.y = 0, this.target.normalize(), d = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, d, 0)
                        } else if (b ===
                        "rot") THREE_M.Quaternion.slerp(g, f, a.quaternion, d);
                    else if (b === "scl") b = a.scale, b.x = g[0] + (f[0] - g[0]) * d, b.y = g[1] + (f[1] - g[1]) * d, b.z = g[2] + (f[2] - g[2]) * d
                }
            }
        if (this.JITCompile && k[0][l] === void 0) {
            this.hierarchy[0].update(null, !0);
            for (m = 0; m < this.hierarchy.length; m++) k[m][l] = this.hierarchy[m] instanceof THREE_M.Bone ? this.hierarchy[m].skinMatrix.clone() : this.hierarchy[m].matrix.clone()
        }
    }
};
THREE_M.Animation.prototype.interpolateCatmullRom = function(a, c) {
    var b = [],
        d = [],
        g, f, e, h, i, l;
    g = (a.length - 1) * c;
    f = Math.floor(g);
    g -= f;
    b[0] = f === 0 ? f : f - 1;
    b[1] = f;
    b[2] = f > a.length - 2 ? f : f + 1;
    b[3] = f > a.length - 3 ? f : f + 2;
    f = a[b[0]];
    h = a[b[1]];
    i = a[b[2]];
    l = a[b[3]];
    b = g * g;
    e = g * b;
    d[0] = this.interpolate(f[0], h[0], i[0], l[0], g, b, e);
    d[1] = this.interpolate(f[1], h[1], i[1], l[1], g, b, e);
    d[2] = this.interpolate(f[2], h[2], i[2], l[2], g, b, e);
    return d
};
THREE_M.Animation.prototype.interpolate = function(a, c, b, d, g, f, e) {
    a = (b - a) * 0.5;
    d = (d - c) * 0.5;
    return (2 * (c - b) + a + d) * e + (-3 * (c - b) - 2 * a - d) * f + a * g + c
};
THREE_M.Animation.prototype.getNextKeyWith = function(a, c, b) {
    var d = this.data.hierarchy[c].keys;
    for (this.interpolationType === THREE_M.AnimationHandler.CATMULLROM || this.interpolationType === THREE_M.AnimationHandler.CATMULLROM_FORWARD ? b = b < d.length - 1 ? b : d.length - 1 : b %= d.length; b < d.length; b++)
        if (d[b][a] !== void 0) return d[b];
    return this.data.hierarchy[c].keys[0]
};
THREE_M.Animation.prototype.getPrevKeyWith = function(a, c, b) {
    for (var d = this.data.hierarchy[c].keys, b = this.interpolationType === THREE_M.AnimationHandler.CATMULLROM || this.interpolationType === THREE_M.AnimationHandler.CATMULLROM_FORWARD ? b > 0 ? b : 0 : b >= 0 ? b : b + d.length; b >= 0; b--)
        if (d[b][a] !== void 0) return d[b];
    return this.data.hierarchy[c].keys[d.length - 1]
};
THREE_M.CubeCamera = function(a, c, b, d) {
    this.heightOffset = b;
    this.position = new THREE_M.Vector3(0, b, 0);
    this.cameraPX = new THREE_M.PerspectiveCamera(90, 1, a, c);
    this.cameraNX = new THREE_M.PerspectiveCamera(90, 1, a, c);
    this.cameraPY = new THREE_M.PerspectiveCamera(90, 1, a, c);
    this.cameraNY = new THREE_M.PerspectiveCamera(90, 1, a, c);
    this.cameraPZ = new THREE_M.PerspectiveCamera(90, 1, a, c);
    this.cameraNZ = new THREE_M.PerspectiveCamera(90, 1, a, c);
    this.cameraPX.position = this.position;
    this.cameraNX.position = this.position;
    this.cameraPY.position =
        this.position;
    this.cameraNY.position = this.position;
    this.cameraPZ.position = this.position;
    this.cameraNZ.position = this.position;
    this.cameraPX.up.set(0, -1, 0);
    this.cameraNX.up.set(0, -1, 0);
    this.cameraPY.up.set(0, 0, 1);
    this.cameraNY.up.set(0, 0, -1);
    this.cameraPZ.up.set(0, -1, 0);
    this.cameraNZ.up.set(0, -1, 0);
    this.targetPX = new THREE_M.Vector3(0, 0, 0);
    this.targetNX = new THREE_M.Vector3(0, 0, 0);
    this.targetPY = new THREE_M.Vector3(0, 0, 0);
    this.targetNY = new THREE_M.Vector3(0, 0, 0);
    this.targetPZ = new THREE_M.Vector3(0, 0, 0);
    this.targetNZ =
        new THREE_M.Vector3(0, 0, 0);
    this.renderTarget = new THREE_M.WebGLRenderTargetCube(d, d, {
        format: THREE_M.RGBFormat,
        magFilter: THREE_M.LinearFilter,
        minFilter: THREE_M.LinearFilter
    });
    this.updatePosition = function(a) {
        this.position.copy(a);
        this.position.y += this.heightOffset;
        this.targetPX.copy(this.position);
        this.targetNX.copy(this.position);
        this.targetPY.copy(this.position);
        this.targetNY.copy(this.position);
        this.targetPZ.copy(this.position);
        this.targetNZ.copy(this.position);
        this.targetPX.x += 1;
        this.targetNX.x -= 1;
        this.targetPY.y +=
            1;
        this.targetNY.y -= 1;
        this.targetPZ.z += 1;
        this.targetNZ.z -= 1;
        this.cameraPX.lookAt(this.targetPX);
        this.cameraNX.lookAt(this.targetNX);
        this.cameraPY.lookAt(this.targetPY);
        this.cameraNY.lookAt(this.targetNY);
        this.cameraPZ.lookAt(this.targetPZ);
        this.cameraNZ.lookAt(this.targetNZ)
    };
    this.updateCubeMap = function(a, b) {
        var c = this.renderTarget;
        c.activeCubeFace = 0;
        a.render(b, this.cameraPX, c);
        c.activeCubeFace = 1;
        a.render(b, this.cameraNX, c);
        c.activeCubeFace = 2;
        a.render(b, this.cameraPY, c);
        c.activeCubeFace = 3;
        a.render(b,
            this.cameraNY, c);
        c.activeCubeFace = 4;
        a.render(b, this.cameraPZ, c);
        c.activeCubeFace = 5;
        a.render(b, this.cameraNZ, c)
    }
};
THREE_M.FirstPersonCamera = function() {
    console.warn("DEPRECATED: FirstPersonCamera() is FirstPersonControls().")
};
THREE_M.PathCamera = function() {
    console.warn("DEPRECATED: PathCamera() is PathControls().")
};
THREE_M.FlyCamera = function() {
    console.warn("DEPRECATED: FlyCamera() is FlyControls().")
};
THREE_M.RollCamera = function() {
    console.warn("DEPRECATED: RollCamera() is RollControls().")
};
THREE_M.TrackballCamera = function() {
    console.warn("DEPRECATED: TrackballCamera() is TrackballControls().")
};
THREE_M.CombinedCamera = function(a, c, b, d, g, f, e) {
    THREE_M.Camera.call(this);
    this.fov = b;
    this.left = -a / 2;
    this.right = a / 2;
    this.top = c / 2;
    this.bottom = -c / 2;
    this.cameraO = new THREE_M.OrthographicCamera(a / -2, a / 2, c / 2, c / -2, f, e);
    this.cameraP = new THREE_M.PerspectiveCamera(b, a / c, d, g);
    this.zoom = 1;
    this.toPerspective()
};
THREE_M.CombinedCamera.prototype = new THREE_M.Camera;
THREE_M.CombinedCamera.prototype.constructor = THREE_M.CoolCamera;
THREE_M.CombinedCamera.prototype.toPerspective = function() {
    this.near = this.cameraP.near;
    this.far = this.cameraP.far;
    this.cameraP.fov = this.fov / this.zoom;
    this.cameraP.updateProjectionMatrix();
    this.projectionMatrix = this.cameraP.projectionMatrix;
    this.inPersepectiveMode = !0;
    this.inOrthographicMode = !1
};
THREE_M.CombinedCamera.prototype.toOrthographic = function() {
    var a = Math.tan(this.fov / 2) * ((this.cameraP.near + this.cameraP.far) / 2),
        c = 2 * a * this.cameraP.aspect / 2;
    a /= this.zoom;
    c /= this.zoom;
    this.cameraO.left = -c;
    this.cameraO.right = c;
    this.cameraO.top = a;
    this.cameraO.bottom = -a;
    this.cameraO.updateProjectionMatrix();
    this.near = this.cameraO.near;
    this.far = this.cameraO.far;
    this.projectionMatrix = this.cameraO.projectionMatrix;
    this.inPersepectiveMode = !1;
    this.inOrthographicMode = !0
};
THREE_M.CombinedCamera.prototype.setFov = function(a) {
    this.fov = a;
    this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE_M.CombinedCamera.prototype.setLens = function(a, c) {
    c || (c = 43.25);
    var b = 2 * Math.atan(c / (a * 2));
    b *= 180 / Math.PI;
    this.setFov(b);
    return b
};
THREE_M.CombinedCamera.prototype.setZoom = function(a) {
    this.zoom = a;
    this.inPersepectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE_M.CombinedCamera.prototype.toFrontView = function() {
    this.rotation.x = 0;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE_M.CombinedCamera.prototype.toBackView = function() {
    this.rotation.x = 0;
    this.rotation.y = Math.PI;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE_M.CombinedCamera.prototype.toLeftView = function() {
    this.rotation.x = 0;
    this.rotation.y = -Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE_M.CombinedCamera.prototype.toRightView = function() {
    this.rotation.x = 0;
    this.rotation.y = Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE_M.CombinedCamera.prototype.toTopView = function() {
    this.rotation.x = -Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE_M.CombinedCamera.prototype.toBottomView = function() {
    this.rotation.x = Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = !1
};
THREE_M.FirstPersonControls = function(a, c) {
    function b(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    }
    this.object = a;
    this.target = new THREE_M.Vector3(0, 0, 0);
    this.domElement = c !== void 0 ? c : document;
    this.movementSpeed = 1;
    this.lookSpeed = 0.005;
    this.noFly = !1;
    this.lookVertical = !0;
    this.autoForward = !1;
    this.activeLook = !0;
    this.heightSpeed = !1;
    this.heightCoef = 1;
    this.heightMin = 0;
    this.constrainVertical = !1;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = this.autoSpeedFactor =
        0;
    this.mouseDragOn = this.freeze = this.moveRight = this.moveLeft = this.moveBackward = this.moveForward = !1;
    this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX = this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    this.onMouseDown = function(a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook) switch (a.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
        }
        this.mouseDragOn = !0
    };
    this.onMouseUp = function(a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook) switch (a.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.mouseDragOn = !1
    };
    this.onMouseMove = function(a) {
        this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
    };
    this.onKeyDown =
        function(a) {
            switch (a.keyCode) {
                case 38:
                case 87:
                    this.moveForward = !0;
                    break;
                case 37:
                case 65:
                    this.moveLeft = !0;
                    break;
                case 40:
                case 83:
                    this.moveBackward = !0;
                    break;
                case 39:
                case 68:
                    this.moveRight = !0;
                    break;
                case 82:
                    this.moveUp = !0;
                    break;
                case 70:
                    this.moveDown = !0;
                    break;
                case 81:
                    this.freeze = !this.freeze
            }
        };
    this.onKeyUp = function(a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                this.moveForward = !1;
                break;
            case 37:
            case 65:
                this.moveLeft = !1;
                break;
            case 40:
            case 83:
                this.moveBackward = !1;
                break;
            case 39:
            case 68:
                this.moveRight = !1;
                break;
            case 82:
                this.moveUp = !1;
                break;
            case 70:
                this.moveDown = !1
        }
    };
    this.update = function(a) {
        var b = 0;
        if (!this.freeze) {
            if (this.heightSpeed) {
                var c = THREE_M.Math.clamp(this.object.position.y, this.heightMin, this.heightMax) - this.heightMin;
                this.autoSpeedFactor = a * c * this.heightCoef
            } else this.autoSpeedFactor = 0;
            b = a * this.movementSpeed;
            (this.moveForward || this.autoForward && !this.moveBackward) && this.object.translateZ(-(b + this.autoSpeedFactor));
            this.moveBackward && this.object.translateZ(b);
            this.moveLeft && this.object.translateX(-b);
            this.moveRight &&
                this.object.translateX(b);
            this.moveUp && this.object.translateY(b);
            this.moveDown && this.object.translateY(-b);
            c = a * this.lookSpeed;
            this.activeLook || (c = 0);
            this.lon += this.mouseX * c;
            this.lookVertical && (this.lat -= this.mouseY * c);
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = (90 - this.lat) * Math.PI / 180;
            this.theta = this.lon * Math.PI / 180;
            a = this.target;
            b = this.object.position;
            a.x = b.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            a.y = b.y + 100 * Math.cos(this.phi);
            a.z = b.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)
        }
        a =
            1;
        this.constrainVertical && (a = Math.PI / (this.verticalMax - this.verticalMin));
        this.lon += this.mouseX * c;
        this.lookVertical && (this.lat -= this.mouseY * c * a);
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;
        this.theta = this.lon * Math.PI / 180;
        if (this.constrainVertical) this.phi = THREE_M.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
        a = this.target;
        b = this.object.position;
        a.x = b.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        a.y = b.y + 100 * Math.cos(this.phi);
        a.z = b.z + 100 * Math.sin(this.phi) *
            Math.sin(this.theta);
        this.object.lookAt(a)
    };
    this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", b(this, this.onMouseMove), !1);
    this.domElement.addEventListener("mousedown", b(this, this.onMouseDown), !1);
    this.domElement.addEventListener("mouseup", b(this, this.onMouseUp), !1);
    this.domElement.addEventListener("keydown", b(this, this.onKeyDown), !1);
    this.domElement.addEventListener("keyup", b(this, this.onKeyUp), !1)
};
THREE_M.PathControls = function(a, c) {
    function b(a) {
        if ((a *= 2) < 1) return 0.5 * a * a;
        return -0.5 * (--a * (a - 2) - 1)
    }

    function d(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    }

    function g(a, b, c, d) {
        var e = {
                name: c,
                fps: 0.6,
                length: d,
                hierarchy: []
            },
            f, g = b.getControlPointsArray(),
            h = b.getLength(),
            q = g.length,
            t = 0;
        f = q - 1;
        b = {
            parent: -1,
            keys: []
        };
        b.keys[0] = {
            time: 0,
            pos: g[0],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        b.keys[f] = {
            time: d,
            pos: g[f],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        for (f = 1; f < q - 1; f++) t = d * h.chunks[f] / h.total, b.keys[f] = {
            time: t,
            pos: g[f]
        };
        e.hierarchy[0] =
            b;
        THREE_M.AnimationHandler.add(e);
        return new THREE_M.Animation(a, c, THREE_M.AnimationHandler.CATMULLROM_FORWARD, !1)
    }

    function f(a, b) {
        var c, d, e = new THREE_M.Geometry;
        for (c = 0; c < a.points.length * b; c++) d = c / (a.points.length * b), d = a.getPoint(d), e.vertices[c] = new THREE_M.Vertex(new THREE_M.Vector3(d.x, d.y, d.z));
        return e
    }
    this.object = a;
    this.domElement = c !== void 0 ? c : document;
    this.id = "PathControls" + THREE_M.PathControlsIdCounter++;
    this.duration = 1E4;
    this.waypoints = [];
    this.useConstantSpeed = !0;
    this.resamplingCoef = 50;
    this.debugPath =
        new THREE_M.Object3D;
    this.debugDummy = new THREE_M.Object3D;
    this.animationParent = new THREE_M.Object3D;
    this.lookSpeed = 0.005;
    this.lookHorizontal = this.lookVertical = !0;
    this.verticalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.horizontalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.target = new THREE_M.Object3D;
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
    this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX =
        this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    var e = Math.PI * 2,
        h = Math.PI / 180;
    this.update = function(a) {
        var c;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed * a);
        this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed * a);
        this.lon = Math.max(0, Math.min(360, this.lon));
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * h;
        this.theta = this.lon * h;
        a = this.phi % e;
        this.phi = a >= 0 ? a : a + e;
        c = this.verticalAngleMap.srcRange;
        a = this.verticalAngleMap.dstRange;
        c = THREE_M.Math.mapLinear(this.phi, c[0], c[1], a[0], a[1]);
        var d = a[1] - a[0];
        this.phi = b((c - a[0]) / d) * d + a[0];
        c = this.horizontalAngleMap.srcRange;
        a = this.horizontalAngleMap.dstRange;
        c = THREE_M.Math.mapLinear(this.theta, c[0], c[1], a[0], a[1]);
        d = a[1] - a[0];
        this.theta = b((c - a[0]) / d) * d + a[0];
        a = this.target.position;
        a.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        a.y = 100 * Math.cos(this.phi);
        a.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.object.lookAt(this.target.position)
    };
    this.onMouseMove =
        function(a) {
            this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
        };
    this.init = function() {
        this.spline = new THREE_M.Spline;
        this.spline.initFromArray(this.waypoints);
        this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
        if (this.createDebugDummy) {
            var a = new THREE_M.MeshLambertMaterial({
                    color: 30719
                }),
                b = new THREE_M.MeshLambertMaterial({
                    color: 65280
                }),
                c = new THREE_M.CubeGeometry(10, 10, 20),
                e = new THREE_M.CubeGeometry(2, 2, 10);
            this.animationParent = new THREE_M.Mesh(c, a);
            a = new THREE_M.Mesh(e, b);
            a.position.set(0, 10, 0);
            this.animation = g(this.animationParent, this.spline, this.id, this.duration);
            this.animationParent.add(this.object);
            this.animationParent.add(this.target);
            this.animationParent.add(a)
        } else this.animation = g(this.animationParent, this.spline, this.id, this.duration), this.animationParent.add(this.target), this.animationParent.add(this.object);
        if (this.createDebugPath) {
            var a =
                this.debugPath,
                b = this.spline,
                e = f(b, 10),
                c = f(b, 10),
                h = new THREE_M.LineBasicMaterial({
                    color: 16711680,
                    linewidth: 3
                }),
                e = new THREE_M.Line(e, h),
                c = new THREE_M.ParticleSystem(c, new THREE_M.ParticleBasicMaterial({
                    color: 16755200,
                    size: 3
                }));
            e.scale.set(1, 1, 1);
            a.add(e);
            c.scale.set(1, 1, 1);
            a.add(c);
            for (var e = new THREE_M.SphereGeometry(1, 16, 8), h = new THREE_M.MeshBasicMaterial({
                    color: 65280
                }), m = 0; m < b.points.length; m++) c = new THREE_M.Mesh(e, h), c.position.copy(b.points[m]), a.add(c)
        }
        this.domElement.addEventListener("mousemove", d(this, this.onMouseMove), !1)
    }
};
THREE_M.PathControlsIdCounter = 0;
THREE_M.FlyControls = function(a, c) {
    function b(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    }
    this.object = a;
    this.domElement = c !== void 0 ? c : document;
    c && this.domElement.setAttribute("tabindex", -1);
    this.movementSpeed = 1;
    this.rollSpeed = 0.005;
    this.autoForward = this.dragToLook = !1;
    this.object.useQuaternion = !0;
    this.tmpQuaternion = new THREE_M.Quaternion;
    this.mouseStatus = 0;
    this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    };
    this.moveVector = new THREE_M.Vector3(0,
        0, 0);
    this.rotationVector = new THREE_M.Vector3(0, 0, 0);
    this.handleEvent = function(a) {
        if (typeof this[a.type] == "function") this[a.type](a)
    };
    this.keydown = function(a) {
        if (!a.altKey) {
            switch (a.keyCode) {
                case 16:
                    this.movementSpeedMultiplier = 0.1;
                    break;
                case 87:
                    this.moveState.forward = 1;
                    break;
                case 83:
                    this.moveState.back = 1;
                    break;
                case 65:
                    this.moveState.left = 1;
                    break;
                case 68:
                    this.moveState.right = 1;
                    break;
                case 82:
                    this.moveState.up = 1;
                    break;
                case 70:
                    this.moveState.down = 1;
                    break;
                case 38:
                    this.moveState.pitchUp = 1;
                    break;
                case 40:
                    this.moveState.pitchDown =
                        1;
                    break;
                case 37:
                    this.moveState.yawLeft = 1;
                    break;
                case 39:
                    this.moveState.yawRight = 1;
                    break;
                case 81:
                    this.moveState.rollLeft = 1;
                    break;
                case 69:
                    this.moveState.rollRight = 1
            }
            this.updateMovementVector();
            this.updateRotationVector()
        }
    };
    this.keyup = function(a) {
        switch (a.keyCode) {
            case 16:
                this.movementSpeedMultiplier = 1;
                break;
            case 87:
                this.moveState.forward = 0;
                break;
            case 83:
                this.moveState.back = 0;
                break;
            case 65:
                this.moveState.left = 0;
                break;
            case 68:
                this.moveState.right = 0;
                break;
            case 82:
                this.moveState.up = 0;
                break;
            case 70:
                this.moveState.down =
                    0;
                break;
            case 38:
                this.moveState.pitchUp = 0;
                break;
            case 40:
                this.moveState.pitchDown = 0;
                break;
            case 37:
                this.moveState.yawLeft = 0;
                break;
            case 39:
                this.moveState.yawRight = 0;
                break;
            case 81:
                this.moveState.rollLeft = 0;
                break;
            case 69:
                this.moveState.rollRight = 0
        }
        this.updateMovementVector();
        this.updateRotationVector()
    };
    this.mousedown = function(a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus++;
        else switch (a.button) {
            case 0:
                this.object.moveForward = !0;
                break;
            case 2:
                this.object.moveBackward = !0
        }
    };
    this.mousemove = function(a) {
        if (!this.dragToLook || this.mouseStatus > 0) {
            var b = this.getContainerDimensions(),
                c = b.size[0] / 2,
                e = b.size[1] / 2;
            this.moveState.yawLeft = -(a.pageX - b.offset[0] - c) / c;
            this.moveState.pitchDown = (a.pageY - b.offset[1] - e) / e;
            this.updateRotationVector()
        }
    };
    this.mouseup = function(a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus--, this.moveState.yawLeft = this.moveState.pitchDown = 0;
        else switch (a.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.updateRotationVector()
    };
    this.update = function(a) {
        var b = a * this.movementSpeed;
        a *= this.rollSpeed;
        this.object.translateX(this.moveVector.x * b);
        this.object.translateY(this.moveVector.y * b);
        this.object.translateZ(this.moveVector.z * b);
        this.tmpQuaternion.set(this.rotationVector.x * a, this.rotationVector.y * a, this.rotationVector.z * a, 1).normalize();
        this.object.quaternion.multiplySelf(this.tmpQuaternion);
        this.object.matrix.setPosition(this.object.position);
        this.object.matrix.setRotationFromQuaternion(this.object.quaternion);
        this.object.matrixWorldNeedsUpdate = !0
    };
    this.updateMovementVector = function() {
        var a = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right;
        this.moveVector.y = -this.moveState.down + this.moveState.up;
        this.moveVector.z = -a + this.moveState.back
    };
    this.updateRotationVector = function() {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
        this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
        this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
    };
    this.getContainerDimensions = function() {
        return this.domElement != document ? {
            size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
            offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
        } : {
            size: [window.innerWidth, window.innerHeight],
            offset: [0, 0]
        }
    };
    this.domElement.addEventListener("mousemove", b(this, this.mousemove), !1);
    this.domElement.addEventListener("mousedown", b(this, this.mousedown), !1);
    this.domElement.addEventListener("mouseup", b(this,
        this.mouseup), !1);
    this.domElement.addEventListener("keydown", b(this, this.keydown), !1);
    this.domElement.addEventListener("keyup", b(this, this.keyup), !1);
    this.updateMovementVector();
    this.updateRotationVector()
};
THREE_M.RollControls = function(a, c) {
    this.object = a;
    this.domElement = c !== void 0 ? c : document;
    this.mouseLook = !0;
    this.autoForward = !1;
    this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
    this.constrainVertical = [-0.9, 0.9];
    this.object.matrixAutoUpdate = !1;
    this.forward = new THREE_M.Vector3(0, 0, 1);
    this.roll = 0;
    var b = new THREE_M.Vector3,
        d = new THREE_M.Vector3,
        g = new THREE_M.Vector3,
        f = new THREE_M.Matrix4,
        e = !1,
        h = 1,
        i = 0,
        l = 0,
        k = 0,
        o = 0,
        p = 0,
        m = window.innerWidth / 2,
        r = window.innerHeight / 2;
    this.update = function(a) {
        if (this.mouseLook) {
            var c = a * this.lookSpeed;
            this.rotateHorizontally(c * o);
            this.rotateVertically(c * p)
        }
        c = a * this.movementSpeed;
        this.object.translateZ(-c * (i > 0 || this.autoForward && !(i < 0) ? 1 : i));
        this.object.translateX(c * l);
        this.object.translateY(c * k);
        e && (this.roll += this.rollSpeed * a * h);
        if (this.forward.y > this.constrainVertical[1]) this.forward.y = this.constrainVertical[1], this.forward.normalize();
        else if (this.forward.y < this.constrainVertical[0]) this.forward.y = this.constrainVertical[0], this.forward.normalize();
        g.copy(this.forward);
        d.set(0, 1, 0);
        b.cross(d,
            g).normalize();
        d.cross(g, b).normalize();
        this.object.matrix.n11 = b.x;
        this.object.matrix.n12 = d.x;
        this.object.matrix.n13 = g.x;
        this.object.matrix.n21 = b.y;
        this.object.matrix.n22 = d.y;
        this.object.matrix.n23 = g.y;
        this.object.matrix.n31 = b.z;
        this.object.matrix.n32 = d.z;
        this.object.matrix.n33 = g.z;
        f.identity();
        f.n11 = Math.cos(this.roll);
        f.n12 = -Math.sin(this.roll);
        f.n21 = Math.sin(this.roll);
        f.n22 = Math.cos(this.roll);
        this.object.matrix.multiplySelf(f);
        this.object.matrixWorldNeedsUpdate = !0;
        this.object.matrix.n14 = this.object.position.x;
        this.object.matrix.n24 = this.object.position.y;
        this.object.matrix.n34 = this.object.position.z
    };
    this.translateX = function(a) {
        this.object.position.x += this.object.matrix.n11 * a;
        this.object.position.y += this.object.matrix.n21 * a;
        this.object.position.z += this.object.matrix.n31 * a
    };
    this.translateY = function(a) {
        this.object.position.x += this.object.matrix.n12 * a;
        this.object.position.y += this.object.matrix.n22 * a;
        this.object.position.z += this.object.matrix.n32 * a
    };
    this.translateZ = function(a) {
        this.object.position.x -= this.object.matrix.n13 *
            a;
        this.object.position.y -= this.object.matrix.n23 * a;
        this.object.position.z -= this.object.matrix.n33 * a
    };
    this.rotateHorizontally = function(a) {
        b.set(this.object.matrix.n11, this.object.matrix.n21, this.object.matrix.n31);
        b.multiplyScalar(a);
        this.forward.subSelf(b);
        this.forward.normalize()
    };
    this.rotateVertically = function(a) {
        d.set(this.object.matrix.n12, this.object.matrix.n22, this.object.matrix.n32);
        d.multiplyScalar(a);
        this.forward.addSelf(d);
        this.forward.normalize()
    };
    this.domElement.addEventListener("contextmenu",
        function(a) {
            a.preventDefault()
        }, !1);
    this.domElement.addEventListener("mousemove", function(a) {
        o = (a.clientX - m) / window.innerWidth;
        p = (a.clientY - r) / window.innerHeight
    }, !1);
    this.domElement.addEventListener("mousedown", function(a) {
        a.preventDefault();
        a.stopPropagation();
        switch (a.button) {
            case 0:
                i = 1;
                break;
            case 2:
                i = -1
        }
    }, !1);
    this.domElement.addEventListener("mouseup", function(a) {
        a.preventDefault();
        a.stopPropagation();
        switch (a.button) {
            case 0:
                i = 0;
                break;
            case 2:
                i = 0
        }
    }, !1);
    this.domElement.addEventListener("keydown",
        function(a) {
            switch (a.keyCode) {
                case 38:
                case 87:
                    i = 1;
                    break;
                case 37:
                case 65:
                    l = -1;
                    break;
                case 40:
                case 83:
                    i = -1;
                    break;
                case 39:
                case 68:
                    l = 1;
                    break;
                case 81:
                    e = !0;
                    h = 1;
                    break;
                case 69:
                    e = !0;
                    h = -1;
                    break;
                case 82:
                    k = 1;
                    break;
                case 70:
                    k = -1
            }
        }, !1);
    this.domElement.addEventListener("keyup", function(a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                i = 0;
                break;
            case 37:
            case 65:
                l = 0;
                break;
            case 40:
            case 83:
                i = 0;
                break;
            case 39:
            case 68:
                l = 0;
                break;
            case 81:
                e = !1;
                break;
            case 69:
                e = !1;
                break;
            case 82:
                k = 0;
                break;
            case 70:
                k = 0
        }
    }, !1)
};
THREE_M.TrackballControls = function(a, c) {
    var b = this,
        d = {
            NONE: -1,
            ROTATE: 0,
            ZOOM: 1,
            PAN: 2
        };
    this.object = a;
    this.domElement = c !== void 0 ? c : document;
    this.enabled = !0;
    this.screen = {
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: 0,
        offsetTop: 0
    };
    this.radius = (this.screen.width + this.screen.height) / 4;
    this.rotateSpeed = 1;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;
    this.staticMoving = this.noPan = this.noZoom = this.noRotate = !1;
    this.dynamicDampingFactor = 0.2;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.keys = [65, 83, 68];
    this.target = new THREE_M.Vector3(0, 0, 0);
    var g = !1,
        f = d.NONE,
        e = new THREE_M.Vector3,
        h = new THREE_M.Vector3,
        i = new THREE_M.Vector3,
        l = new THREE_M.Vector2,
        k = new THREE_M.Vector2,
        o = new THREE_M.Vector2,
        p = new THREE_M.Vector2;
    this.handleEvent = function(a) {
        if (typeof this[a.type] == "function") this[a.type](a)
    };
    this.getMouseOnScreen = function(a, c) {
        return new THREE_M.Vector2((a - b.screen.offsetLeft) / b.radius * 0.5, (c - b.screen.offsetTop) / b.radius * 0.5)
    };
    this.getMouseProjectionOnBall = function(a, c) {
        var d = new THREE_M.Vector3((a - b.screen.width * 0.5 -
                b.screen.offsetLeft) / b.radius, (b.screen.height * 0.5 + b.screen.offsetTop - c) / b.radius, 0),
            f = d.length();
        f > 1 ? d.normalize() : d.z = Math.sqrt(1 - f * f);
        e.copy(b.object.position).subSelf(b.target);
        f = b.object.up.clone().setLength(d.y);
        f.addSelf(b.object.up.clone().crossSelf(e).setLength(d.x));
        f.addSelf(e.setLength(d.z));
        return f
    };
    this.rotateCamera = function() {
        var a = Math.acos(h.dot(i) / h.length() / i.length());
        if (a) {
            var c = (new THREE_M.Vector3).cross(h, i).normalize(),
                d = new THREE_M.Quaternion;
            a *= b.rotateSpeed;
            d.setFromAxisAngle(c, -a);
            d.multiplyVector3(e);
            d.multiplyVector3(b.object.up);
            d.multiplyVector3(i);
            b.staticMoving ? h = i : (d.setFromAxisAngle(c, a * (b.dynamicDampingFactor - 1)), d.multiplyVector3(h))
        }
    };
    this.zoomCamera = function() {
        var a = 1 + (k.y - l.y) * b.zoomSpeed;
        a !== 1 && a > 0 && (e.multiplyScalar(a), b.staticMoving ? l = k : l.y += (k.y - l.y) * this.dynamicDampingFactor)
    };
    this.panCamera = function() {
        var a = p.clone().subSelf(o);
        if (a.lengthSq()) {
            a.multiplyScalar(e.length() * b.panSpeed);
            var c = e.clone().crossSelf(b.object.up).setLength(a.x);
            c.addSelf(b.object.up.clone().setLength(a.y));
            b.object.position.addSelf(c);
            b.target.addSelf(c);
            b.staticMoving ? o = p : o.addSelf(a.sub(p, o).multiplyScalar(b.dynamicDampingFactor))
        }
    };
    this.checkDistances = function() {
        if (!b.noZoom || !b.noPan) b.object.position.lengthSq() > b.maxDistance * b.maxDistance && b.object.position.setLength(b.maxDistance), e.lengthSq() < b.minDistance * b.minDistance && b.object.position.add(b.target, e.setLength(b.minDistance))
    };
    this.update = function() {
        e.copy(b.object.position).subSelf(this.target);
        b.noRotate || b.rotateCamera();
        b.noZoom || b.zoomCamera();
        b.noPan || b.panCamera();
        b.object.position.add(b.target, e);
        b.checkDistances();
        b.object.lookAt(b.target)
    };
    this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", function(a) {
        b.enabled && (g && (h = i = b.getMouseProjectionOnBall(a.clientX, a.clientY), l = k = b.getMouseOnScreen(a.clientX, a.clientY), o = p = b.getMouseOnScreen(a.clientX, a.clientY), g = !1), f !== d.NONE && (f === d.ROTATE && !b.noRotate ? i = b.getMouseProjectionOnBall(a.clientX, a.clientY) : f === d.ZOOM &&
            !b.noZoom ? k = b.getMouseOnScreen(a.clientX, a.clientY) : f === d.PAN && !b.noPan && (p = b.getMouseOnScreen(a.clientX, a.clientY))))
    }, !1);
    this.domElement.addEventListener("mousedown", function(a) {
        if (b.enabled && (a.preventDefault(), a.stopPropagation(), f === d.NONE)) f = a.button, f === d.ROTATE && !b.noRotate ? h = i = b.getMouseProjectionOnBall(a.clientX, a.clientY) : f === d.ZOOM && !b.noZoom ? l = k = b.getMouseOnScreen(a.clientX, a.clientY) : this.noPan || (o = p = b.getMouseOnScreen(a.clientX, a.clientY))
    }, !1);
    this.domElement.addEventListener("mouseup",
        function(a) {
            if (b.enabled) a.preventDefault(), a.stopPropagation(), f = d.NONE
        }, !1);
    window.addEventListener("keydown", function(a) {
        if (b.enabled && f === d.NONE) {
            if (a.keyCode === b.keys[d.ROTATE] && !b.noRotate) f = d.ROTATE;
            else if (a.keyCode === b.keys[d.ZOOM] && !b.noZoom) f = d.ZOOM;
            else if (a.keyCode === b.keys[d.PAN] && !b.noPan) f = d.PAN;
            f !== d.NONE && (g = !0)
        }
    }, !1);
    window.addEventListener("keyup", function() {
        if (b.enabled && f !== d.NONE) f = d.NONE
    }, !1)
};
THREE_M.CubeGeometry = function(a, c, b, d, g, f, e, h) {
    function i(a, b, c, e, h, i, k, m) {
        var n, o = d || 1,
            p = g || 1,
            q = h / 2,
            r = i / 2,
            t = l.vertices.length;
        if (a === "x" && b === "y" || a === "y" && b === "x") n = "z";
        else if (a === "x" && b === "z" || a === "z" && b === "x") n = "y", p = f || 1;
        else if (a === "z" && b === "y" || a === "y" && b === "z") n = "x", o = f || 1;
        var u = o + 1,
            w = p + 1,
            G = h / o,
            I = i / p,
            M = new THREE_M.Vector3;
        M[n] = k > 0 ? 1 : -1;
        for (h = 0; h < w; h++)
            for (i = 0; i < u; i++) {
                var S = new THREE_M.Vector3;
                S[a] = (i * G - q) * c;
                S[b] = (h * I - r) * e;
                S[n] = k;
                l.vertices.push(new THREE_M.Vertex(S))
            }
        for (h = 0; h < p; h++)
            for (i = 0; i < o; i++) a =
                new THREE_M.Face4(i + u * h + t, i + u * (h + 1) + t, i + 1 + u * (h + 1) + t, i + 1 + u * h + t), a.normal.copy(M), a.vertexNormals.push(M.clone(), M.clone(), M.clone(), M.clone()), a.materialIndex = m, l.faces.push(a), l.faceVertexUvs[0].push([new THREE_M.UV(i / o, h / p), new THREE_M.UV(i / o, (h + 1) / p), new THREE_M.UV((i + 1) / o, (h + 1) / p), new THREE_M.UV((i + 1) / o, h / p)])
    }
    THREE_M.Geometry.call(this);
    var l = this,
        k = a / 2,
        o = c / 2,
        p = b / 2,
        m, r, n, q, t, w;
    if (e !== void 0) {
        if (e instanceof Array) this.materials = e;
        else {
            this.materials = [];
            for (m = 0; m < 6; m++) this.materials.push(e)
        }
        m = 0;
        q = 1;
        r = 2;
        t =
            3;
        n = 4;
        w = 5
    } else this.materials = [];
    this.sides = {
        px: !0,
        nx: !0,
        py: !0,
        ny: !0,
        pz: !0,
        nz: !0
    };
    if (h != void 0)
        for (var u in h) this.sides[u] != void 0 && (this.sides[u] = h[u]);
    this.sides.px && i("z", "y", -1, -1, b, c, k, m);
    this.sides.nx && i("z", "y", 1, -1, b, c, -k, q);
    this.sides.py && i("x", "z", 1, 1, a, b, o, r);
    this.sides.ny && i("x", "z", 1, -1, a, b, -o, t);
    this.sides.pz && i("x", "y", 1, -1, a, c, p, n);
    this.sides.nz && i("x", "y", -1, -1, a, c, -p, w);
    this.computeCentroids();
    this.mergeVertices()
};
THREE_M.CubeGeometry.prototype = new THREE_M.Geometry;
THREE_M.CubeGeometry.prototype.constructor = THREE_M.CubeGeometry;
THREE_M.CylinderGeometry = function(a, c, b, d, g, f) {
    THREE_M.Geometry.call(this);
    var a = a != null ? a : 20,
        c = c != null ? c : 20,
        b = b || 100,
        e = b / 2,
        d = d || 8,
        g = g || 1,
        h, i, l = [],
        k = [];
    for (i = 0; i <= g; i++) {
        var o = [],
            p = [],
            m = i / g,
            r = m * (c - a) + a;
        for (h = 0; h <= d; h++) {
            var n = h / d;
            this.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(r * Math.sin(n * Math.PI * 2), -m * b + e, r * Math.cos(n * Math.PI * 2))));
            o.push(this.vertices.length - 1);
            p.push(new THREE_M.UV(n, m))
        }
        l.push(o);
        k.push(p)
    }
    for (i = 0; i < g; i++)
        for (h = 0; h < d; h++) {
            var b = l[i][h],
                o = l[i + 1][h],
                p = l[i + 1][h + 1],
                m = l[i][h + 1],
                r =
                this.vertices[b].position.clone().setY(0).normalize(),
                n = this.vertices[o].position.clone().setY(0).normalize(),
                q = this.vertices[p].position.clone().setY(0).normalize(),
                t = this.vertices[m].position.clone().setY(0).normalize(),
                w = k[i][h].clone(),
                u = k[i + 1][h].clone(),
                B = k[i + 1][h + 1].clone(),
                F = k[i][h + 1].clone();
            this.faces.push(new THREE_M.Face4(b, o, p, m, [r, n, q, t]));
            this.faceVertexUvs[0].push([w, u, B, F])
        }
    if (!f && a > 0) {
        this.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(0, e, 0)));
        for (h = 0; h < d; h++) b = l[0][h], o = l[0][h +
            1
        ], p = this.vertices.length - 1, r = new THREE_M.Vector3(0, 1, 0), n = new THREE_M.Vector3(0, 1, 0), q = new THREE_M.Vector3(0, 1, 0), w = k[0][h].clone(), u = k[0][h + 1].clone(), B = new THREE_M.UV(u.u, 0), this.faces.push(new THREE_M.Face3(b, o, p, [r, n, q])), this.faceVertexUvs[0].push([w, u, B])
    }
    if (!f && c > 0) {
        this.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(0, -e, 0)));
        for (h = 0; h < d; h++) b = l[i][h + 1], o = l[i][h], p = this.vertices.length - 1, r = new THREE_M.Vector3(0, -1, 0), n = new THREE_M.Vector3(0, -1, 0), q = new THREE_M.Vector3(0, -1, 0), w = k[i][h + 1].clone(), u = k[i][h].clone(),
            B = new THREE_M.UV(u.u, 1), this.faces.push(new THREE_M.Face3(b, o, p, [r, n, q])), this.faceVertexUvs[0].push([w, u, B])
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE_M.CylinderGeometry.prototype = new THREE_M.Geometry;
THREE_M.CylinderGeometry.prototype.constructor = THREE_M.CylinderGeometry;
THREE_M.ExtrudeGeometry = function(a, c) {
    if (typeof a !== "undefined") {
        THREE_M.Geometry.call(this);
        var a = a instanceof Array ? a : [a],
            b, d = a.length,
            g;
        this.shapebb = a[d - 1].getBoundingBox();
        for (b = 0; b < d; b++) g = a[b], this.addShape(g, c);
        this.computeCentroids();
        this.computeFaceNormals()
    }
};
THREE_M.ExtrudeGeometry.prototype = new THREE_M.Geometry;
THREE_M.ExtrudeGeometry.prototype.constructor = THREE_M.ExtrudeGeometry;
THREE_M.ExtrudeGeometry.prototype.addShape = function(a, c) {
    function b(a, b, c) {
        b || console.log("die");
        return b.clone().multiplyScalar(c).addSelf(a)
    }

    function d(a, b, c) {
        var d = THREE_M.ExtrudeGeometry.__v1,
            e = THREE_M.ExtrudeGeometry.__v2,
            f = THREE_M.ExtrudeGeometry.__v3,
            g = THREE_M.ExtrudeGeometry.__v4,
            h = THREE_M.ExtrudeGeometry.__v5,
            i = THREE_M.ExtrudeGeometry.__v6;
        d.set(a.x - b.x, a.y - b.y);
        e.set(a.x - c.x, a.y - c.y);
        d = d.normalize();
        e = e.normalize();
        f.set(-d.y, d.x);
        g.set(e.y, -e.x);
        h.copy(a).addSelf(f);
        i.copy(a).addSelf(g);
        if (h.equals(i)) return g.clone();
        h.copy(b).addSelf(f);
        i.copy(c).addSelf(g);
        f = d.dot(g);
        g = i.subSelf(h).dot(g);
        f === 0 && (console.log("Either infinite or no solutions!"), g === 0 ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
        g /= f;
        if (g < 0) return b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += Math.PI * 2), a = (b + a) / 2, new THREE_M.Vector2(-Math.cos(a), -Math.sin(a));
        return d.multiplyScalar(g).addSelf(h).subSelf(a).clone()
    }

    function g(a) {
        for (s = a.length; --s >= 0;) {
            S = s;
            ba = s - 1;
            ba < 0 && (ba = a.length - 1);
            for (var b =
                    0, c = m + k * 2, b = 0; b < c; b++) {
                var d = O * b,
                    e = O * (b + 1),
                    f = W + S + d,
                    g = W + S + e,
                    l = f,
                    d = W + ba + d,
                    e = W + ba + e,
                    n = g;
                l += J;
                d += J;
                e += J;
                n += J;
                v.faces.push(new THREE_M.Face4(l, d, e, n, null, null, B));
                B && (l = b / c, d = (b + 1) / c, e = h + i * 2, f = (v.vertices[f].position.z + i) / e, g = (v.vertices[g].position.z + i) / e, v.faceVertexUvs[0].push([new THREE_M.UV(f, l), new THREE_M.UV(g, l), new THREE_M.UV(g, d), new THREE_M.UV(f, d)]))
            }
        }
    }

    function f(a, b, c) {
        v.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(a, b, c)))
    }

    function e(a, b, c) {
        a += J;
        b += J;
        c += J;
        v.faces.push(new THREE_M.Face3(a, b, c, null,
            null, u));
        if (u) {
            var d = F.maxY,
                e = F.maxX,
                f = v.vertices[b].position.x,
                b = v.vertices[b].position.y,
                g = v.vertices[c].position.x,
                c = v.vertices[c].position.y;
            v.faceVertexUvs[0].push([new THREE_M.UV(v.vertices[a].position.x / e, v.vertices[a].position.y / d), new THREE_M.UV(f / e, b / d), new THREE_M.UV(g / e, c / d)])
        }
    }
    var h = c.amount !== void 0 ? c.amount : 100,
        i = c.bevelThickness !== void 0 ? c.bevelThickness : 6,
        l = c.bevelSize !== void 0 ? c.bevelSize : i - 2,
        k = c.bevelSegments !== void 0 ? c.bevelSegments : 3,
        o = c.bevelEnabled !== void 0 ? c.bevelEnabled : !0,
        p = c.curveSegments !==
        void 0 ? c.curveSegments : 12,
        m = c.steps !== void 0 ? c.steps : 1,
        r = c.bendPath,
        n = c.extrudePath,
        q, t = !1,
        w = c.useSpacedPoints !== void 0 ? c.useSpacedPoints : !1,
        u = c.material,
        B = c.extrudeMaterial,
        F = this.shapebb;
    if (n) q = n.getPoints(p), m = q.length, t = !0, o = !1;
    o || (l = i = k = 0);
    var A, x, y, v = this,
        J = this.vertices.length;
    r && a.addWrapPath(r);
    p = w ? a.extractAllSpacedPoints(p) : a.extractAllPoints(p);
    r = p.shape;
    p = p.holes;
    if (n = !THREE_M.Shape.Utils.isClockWise(r)) {
        r = r.reverse();
        x = 0;
        for (y = p.length; x < y; x++) A = p[x], THREE_M.Shape.Utils.isClockWise(A) &&
            (p[x] = A.reverse());
        n = !1
    }
    n = THREE_M.Shape.Utils.triangulateShape(r, p);
    w = r;
    x = 0;
    for (y = p.length; x < y; x++) A = p[x], r = r.concat(A);
    var s, E, R, U, K, P, O = r.length,
        aa = n.length,
        H = [];
    s = 0;
    E = w.length;
    S = E - 1;
    for (ba = s + 1; s < E; s++, S++, ba++) S === E && (S = 0), ba === E && (ba = 0), H[s] = d(w[s], w[S], w[ba]);
    var G = [],
        I, M = H.concat();
    x = 0;
    for (y = p.length; x < y; x++) {
        A = p[x];
        I = [];
        s = 0;
        E = A.length;
        S = E - 1;
        for (ba = s + 1; s < E; s++, S++, ba++) S === E && (S = 0), ba === E && (ba = 0), I[s] = d(A[s], A[S], A[ba]);
        G.push(I);
        M = M.concat(I)
    }
    for (R = 0; R < k; R++) {
        U = R / k;
        K = i * (1 - U);
        U = l * Math.sin(U * Math.PI /
            2);
        s = 0;
        for (E = w.length; s < E; s++) P = b(w[s], H[s], U), f(P.x, P.y, -K);
        x = 0;
        for (y = p.length; x < y; x++) {
            A = p[x];
            I = G[x];
            s = 0;
            for (E = A.length; s < E; s++) P = b(A[s], I[s], U), f(P.x, P.y, -K)
        }
    }
    U = l;
    for (s = 0; s < O; s++) P = o ? b(r[s], M[s], U) : r[s], t ? f(P.x, P.y + q[0].y, q[0].x) : f(P.x, P.y, 0);
    for (R = 1; R <= m; R++)
        for (s = 0; s < O; s++) P = o ? b(r[s], M[s], U) : r[s], t ? f(P.x, P.y + q[R - 1].y, q[R - 1].x) : f(P.x, P.y, h / m * R);
    for (R = k - 1; R >= 0; R--) {
        U = R / k;
        K = i * (1 - U);
        U = l * Math.sin(U * Math.PI / 2);
        s = 0;
        for (E = w.length; s < E; s++) P = b(w[s], H[s], U), f(P.x, P.y, h + K);
        x = 0;
        for (y = p.length; x < y; x++) {
            A =
                p[x];
            I = G[x];
            s = 0;
            for (E = A.length; s < E; s++) P = b(A[s], I[s], U), t ? f(P.x, P.y + q[m - 1].y, q[m - 1].x + K) : f(P.x, P.y, h + K)
        }
    }
    if (o) {
        o = O * 0;
        for (s = 0; s < aa; s++) l = n[s], e(l[2] + o, l[1] + o, l[0] + o);
        o = O * (m + k * 2);
        for (s = 0; s < aa; s++) l = n[s], e(l[0] + o, l[1] + o, l[2] + o)
    } else {
        for (s = 0; s < aa; s++) l = n[s], e(l[2], l[1], l[0]);
        for (s = 0; s < aa; s++) l = n[s], e(l[0] + O * m, l[1] + O * m, l[2] + O * m)
    }
    var S, ba, W = 0;
    g(w);
    W += w.length;
    x = 0;
    for (y = p.length; x < y; x++) A = p[x], g(A), W += A.length
};
THREE_M.ExtrudeGeometry.__v1 = new THREE_M.Vector2;
THREE_M.ExtrudeGeometry.__v2 = new THREE_M.Vector2;
THREE_M.ExtrudeGeometry.__v3 = new THREE_M.Vector2;
THREE_M.ExtrudeGeometry.__v4 = new THREE_M.Vector2;
THREE_M.ExtrudeGeometry.__v5 = new THREE_M.Vector2;
THREE_M.ExtrudeGeometry.__v6 = new THREE_M.Vector2;
THREE_M.IcosahedronGeometry = function(a) {
    function c(a, b, c) {
        var d = Math.sqrt(a * a + b * b + c * c);
        return g.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(a / d, b / d, c / d))) - 1
    }

    function b(a, b, c, d) {
        var e = g.vertices[a].position,
            f = g.vertices[b].position,
            h = g.vertices[c].position,
            a = new THREE_M.Face3(a, b, c);
        a.vertexNormals.push(e.clone().normalize(), f.clone().normalize(), h.clone().normalize());
        d.faces.push(a);
        d.faceVertexUvs[0].push([new THREE_M.UV(1 - (Math.atan2(e.z, e.x) + Math.PI) % Math.PI / Math.PI * 0.5, 0.5 - e.y / 2), new THREE_M.UV(1 -
            (Math.atan2(f.z, f.x) + Math.PI) % Math.PI / Math.PI * 0.5, 0.5 - f.y / 2), new THREE_M.UV(1 - (Math.atan2(h.z, h.x) + Math.PI) % Math.PI / Math.PI * 0.5, 0.5 - h.y / 2)])
    }

    function d(a, b) {
        var d = g.vertices[a].position,
            e = g.vertices[b].position;
        return c((d.x + e.x) / 2, (d.y + e.y) / 2, (d.z + e.z) / 2)
    }
    var g = this,
        f = new THREE_M.Geometry;
    this.subdivisions = a || 0;
    THREE_M.Geometry.call(this);
    a = (1 + Math.sqrt(5)) / 2;
    c(-1, a, 0);
    c(1, a, 0);
    c(-1, -a, 0);
    c(1, -a, 0);
    c(0, -1, a);
    c(0, 1, a);
    c(0, -1, -a);
    c(0, 1, -a);
    c(a, 0, -1);
    c(a, 0, 1);
    c(-a, 0, -1);
    c(-a, 0, 1);
    b(0, 11, 5, f);
    b(0, 5, 1, f);
    b(0,
        1, 7, f);
    b(0, 7, 10, f);
    b(0, 10, 11, f);
    b(1, 5, 9, f);
    b(5, 11, 4, f);
    b(11, 10, 2, f);
    b(10, 7, 6, f);
    b(7, 1, 8, f);
    b(3, 9, 4, f);
    b(3, 4, 2, f);
    b(3, 2, 6, f);
    b(3, 6, 8, f);
    b(3, 8, 9, f);
    b(4, 9, 5, f);
    b(2, 4, 11, f);
    b(6, 2, 10, f);
    b(8, 6, 7, f);
    b(9, 8, 1, f);
    for (var e = 0; e < this.subdivisions; e++) {
        var a = new THREE_M.Geometry,
            h;
        for (h in f.faces) {
            var i = d(f.faces[h].a, f.faces[h].b),
                l = d(f.faces[h].b, f.faces[h].c),
                k = d(f.faces[h].c, f.faces[h].a);
            b(f.faces[h].a, i, k, a);
            b(f.faces[h].b, l, i, a);
            b(f.faces[h].c, k, l, a);
            b(i, l, k, a)
        }
        f.faces = a.faces;
        f.faceVertexUvs[0] = a.faceVertexUvs[0]
    }
    g.faces =
        f.faces;
    g.faceVertexUvs[0] = f.faceVertexUvs[0];
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE_M.IcosahedronGeometry.prototype = new THREE_M.Geometry;
THREE_M.IcosahedronGeometry.prototype.constructor = THREE_M.IcosahedronGeometry;
THREE_M.LatheGeometry = function(a, c, b) {
    THREE_M.Geometry.call(this);
    this.steps = c || 12;
    this.angle = b || 2 * Math.PI;
    for (var c = this.angle / this.steps, b = [], d = [], g = [], f = [], e = (new THREE_M.Matrix4).setRotationZ(c), h = 0; h < a.length; h++) this.vertices.push(new THREE_M.Vertex(a[h])), b[h] = a[h].clone(), d[h] = this.vertices.length - 1;
    for (var i = 0; i <= this.angle + 0.001; i += c) {
        for (h = 0; h < b.length; h++) i < this.angle ? (b[h] = e.multiplyVector3(b[h].clone()), this.vertices.push(new THREE_M.Vertex(b[h])), g[h] = this.vertices.length - 1) : g = f;
        i == 0 && (f = d);
        for (h = 0; h < d.length - 1; h++) this.faces.push(new THREE_M.Face4(g[h], g[h + 1], d[h + 1], d[h])), this.faceVertexUvs[0].push([new THREE_M.UV(1 - i / this.angle, h / a.length), new THREE_M.UV(1 - i / this.angle, (h + 1) / a.length), new THREE_M.UV(1 - (i - c) / this.angle, (h + 1) / a.length), new THREE_M.UV(1 - (i - c) / this.angle, h / a.length)]);
        d = g;
        g = []
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE_M.LatheGeometry.prototype = new THREE_M.Geometry;
THREE_M.LatheGeometry.prototype.constructor = THREE_M.LatheGeometry;
THREE_M.OctahedronGeometry = function(a, c) {
    function b(b) {
        var c = b.clone().normalize(),
            c = new THREE_M.Vertex(c.clone().multiplyScalar(a));
        c.index = e.vertices.push(c) - 1;
        c.uv = new THREE_M.UV(Math.atan2(b.z, -b.x) / 2 / Math.PI + 0.5, Math.atan2(-b.y, Math.sqrt(b.x * b.x + b.z * b.z)) / Math.PI + 0.5);
        return c
    }

    function d(a, b, c, h) {
        h < 1 ? (h = new THREE_M.Face3(a.index, b.index, c.index, [a.position, b.position, c.position]), h.centroid.addSelf(a.position).addSelf(b.position).addSelf(c.position).divideScalar(3), h.normal = h.centroid.clone().normalize(),
            e.faces.push(h), h = Math.atan2(h.centroid.z, -h.centroid.x), e.faceVertexUvs[0].push([f(a.uv, a.position, h), f(b.uv, b.position, h), f(c.uv, c.position, h)])) : (h -= 1, d(a, g(a, b), g(a, c), h), d(g(a, b), b, g(b, c), h), d(g(a, c), g(b, c), c, h), d(g(a, b), g(b, c), g(a, c), h))
    }

    function g(a, c) {
        h[a.index] || (h[a.index] = []);
        h[c.index] || (h[c.index] = []);
        var d = h[a.index][c.index];
        d === void 0 && (h[a.index][c.index] = h[c.index][a.index] = d = b((new THREE_M.Vector3).add(a.position, c.position).divideScalar(2)));
        return d
    }

    function f(a, b, c) {
        c < 0 && a.u ===
            1 && (a = new THREE_M.UV(a.u - 1, a.v));
        b.x === 0 && b.z === 0 && (a = new THREE_M.UV(c / 2 / Math.PI + 0.5, a.v));
        return a
    }
    THREE_M.Geometry.call(this);
    var c = c || 0,
        e = this;
    b(new THREE_M.Vector3(1, 0, 0));
    b(new THREE_M.Vector3(-1, 0, 0));
    b(new THREE_M.Vector3(0, 1, 0));
    b(new THREE_M.Vector3(0, -1, 0));
    b(new THREE_M.Vector3(0, 0, 1));
    b(new THREE_M.Vector3(0, 0, -1));
    var h = [],
        i = this.vertices;
    d(i[0], i[2], i[4], c);
    d(i[0], i[4], i[3], c);
    d(i[0], i[3], i[5], c);
    d(i[0], i[5], i[2], c);
    d(i[1], i[2], i[5], c);
    d(i[1], i[5], i[3], c);
    d(i[1], i[3], i[4], c);
    d(i[1], i[4], i[2], c);
    this.boundingSphere = {
        radius: a
    }
};
THREE_M.OctahedronGeometry.prototype = new THREE_M.Geometry;
THREE_M.OctahedronGeometry.prototype.constructor = THREE_M.OctahedronGeometry;
THREE_M.PlaneGeometry = function(a, c, b, d) {
    THREE_M.Geometry.call(this);
    for (var g = a / 2, f = c / 2, b = b || 1, d = d || 1, e = b + 1, h = d + 1, i = a / b, l = c / d, k = new THREE_M.Vector3(0, 0, 1), a = 0; a < h; a++)
        for (c = 0; c < e; c++) this.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(c * i - g, -(a * l - f), 0)));
    for (a = 0; a < d; a++)
        for (c = 0; c < b; c++) g = new THREE_M.Face4(c + e * a, c + e * (a + 1), c + 1 + e * (a + 1), c + 1 + e * a), g.normal.copy(k), g.vertexNormals.push(k.clone(), k.clone(), k.clone(), k.clone()), this.faces.push(g), this.faceVertexUvs[0].push([new THREE_M.UV(c / b, a / d), new THREE_M.UV(c /
            b, (a + 1) / d), new THREE_M.UV((c + 1) / b, (a + 1) / d), new THREE_M.UV((c + 1) / b, a / d)]);
    this.computeCentroids()
};
THREE_M.PlaneGeometry.prototype = new THREE_M.Geometry;
THREE_M.PlaneGeometry.prototype.constructor = THREE_M.PlaneGeometry;
THREE_M.SphereGeometry = function(a, c, b, d, g, f, e) {
    THREE_M.Geometry.call(this);
    var a = a || 50,
        c = Math.max(3, Math.floor(c) || 8),
        b = Math.max(2, Math.floor(b) || 6),
        d = d != void 0 ? d : 0,
        g = g != void 0 ? g : Math.PI * 2,
        f = f != void 0 ? f : 0,
        e = e != void 0 ? e : Math.PI,
        h, i, l = [],
        k = [];
    for (i = 0; i <= b; i++) {
        var o = [],
            p = [];
        for (h = 0; h <= c; h++) {
            var m = h / c,
                r = i / b;
            this.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(-a * Math.cos(d + m * g) * Math.sin(f + r * e), a * Math.cos(f + r * e), a * Math.sin(d + m * g) * Math.sin(f + r * e))));
            o.push(this.vertices.length - 1);
            p.push(new THREE_M.UV(m, r))
        }
        l.push(o);
        k.push(p)
    }
    for (i = 0; i < b; i++)
        for (h = 0; h < c; h++) {
            var d = l[i][h + 1],
                g = l[i][h],
                f = l[i + 1][h],
                e = l[i + 1][h + 1],
                o = this.vertices[d].position.clone().normalize(),
                p = this.vertices[g].position.clone().normalize(),
                m = this.vertices[f].position.clone().normalize(),
                r = this.vertices[e].position.clone().normalize(),
                n = k[i][h + 1].clone(),
                q = k[i][h].clone(),
                t = k[i + 1][h].clone(),
                w = k[i + 1][h + 1].clone();
            Math.abs(this.vertices[d].position.y) == a ? (this.faces.push(new THREE_M.Face3(d, f, e, [o, m, r])), this.faceVertexUvs[0].push([n, t, w])) : Math.abs(this.vertices[f].position.y) ==
                a ? (this.faces.push(new THREE_M.Face3(d, g, f, [o, p, m])), this.faceVertexUvs[0].push([n, q, t])) : (this.faces.push(new THREE_M.Face4(d, g, f, e, [o, p, m, r])), this.faceVertexUvs[0].push([n, q, t, w]))
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = {
        radius: a
    }
};
THREE_M.SphereGeometry.prototype = new THREE_M.Geometry;
THREE_M.SphereGeometry.prototype.constructor = THREE_M.SphereGeometry;
THREE_M.TextGeometry = function(a, c) {
    var b = (new THREE_M.TextPath(a, c)).toShapes();
    c.amount = c.height !== void 0 ? c.height : 50;
    if (c.bevelThickness === void 0) c.bevelThickness = 10;
    if (c.bevelSize === void 0) c.bevelSize = 8;
    if (c.bevelEnabled === void 0) c.bevelEnabled = !1;
    if (c.bend) {
        var d = b[b.length - 1].getBoundingBox().maxX;
        c.bendPath = new THREE_M.QuadraticBezierCurve(new THREE_M.Vector2(0, 0), new THREE_M.Vector2(d / 2, 120), new THREE_M.Vector2(d, 0))
    }
    THREE_M.ExtrudeGeometry.call(this, b, c)
};
THREE_M.TextGeometry.prototype = new THREE_M.ExtrudeGeometry;
THREE_M.TextGeometry.prototype.constructor = THREE_M.TextGeometry;
THREE_M.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function() {
        return this.faces[this.face][this.weight][this.style]
    },
    loadFace: function(a) {
        var c = a.familyName.toLowerCase();
        this.faces[c] = this.faces[c] || {};
        this.faces[c][a.cssFontWeight] = this.faces[c][a.cssFontWeight] || {};
        this.faces[c][a.cssFontWeight][a.cssFontStyle] = a;
        return this.faces[c][a.cssFontWeight][a.cssFontStyle] = a
    },
    drawText: function(a) {
        for (var c = this.getFace(), b = this.size / c.resolution, d =
                0, g = String(a).split(""), f = g.length, e = [], a = 0; a < f; a++) {
            var h = new THREE_M.Path,
                h = this.extractGlyphPoints(g[a], c, b, d, h);
            d += h.offset;
            e.push(h.path)
        }
        return {
            paths: e,
            offset: d / 2
        }
    },
    extractGlyphPoints: function(a, c, b, d, g) {
        var f = [],
            e, h, i, l, k, o, p, m, r, n, q, t = c.glyphs[a] || c.glyphs["?"];
        if (t) {
            if (t.o) {
                c = t._cachedOutline || (t._cachedOutline = t.o.split(" "));
                l = c.length;
                for (a = 0; a < l;) switch (i = c[a++], i) {
                    case "m":
                        i = c[a++] * b + d;
                        k = c[a++] * b;
                        f.push(new THREE_M.Vector2(i, k));
                        g.moveTo(i, k);
                        break;
                    case "l":
                        i = c[a++] * b + d;
                        k = c[a++] * b;
                        f.push(new THREE_M.Vector2(i,
                            k));
                        g.lineTo(i, k);
                        break;
                    case "q":
                        i = c[a++] * b + d;
                        k = c[a++] * b;
                        m = c[a++] * b + d;
                        r = c[a++] * b;
                        g.quadraticCurveTo(m, r, i, k);
                        if (e = f[f.length - 1]) {
                            o = e.x;
                            p = e.y;
                            e = 1;
                            for (h = this.divisions; e <= h; e++) {
                                var w = e / h,
                                    u = THREE_M.Shape.Utils.b2(w, o, m, i),
                                    w = THREE_M.Shape.Utils.b2(w, p, r, k);
                                f.push(new THREE_M.Vector2(u, w))
                            }
                        }
                        break;
                    case "b":
                        if (i = c[a++] * b + d, k = c[a++] * b, m = c[a++] * b + d, r = c[a++] * -b, n = c[a++] * b + d, q = c[a++] * -b, g.bezierCurveTo(i, k, m, r, n, q), e = f[f.length - 1]) {
                            o = e.x;
                            p = e.y;
                            e = 1;
                            for (h = this.divisions; e <= h; e++) w = e / h, u = THREE_M.Shape.Utils.b3(w, o, m,
                                n, i), w = THREE_M.Shape.Utils.b3(w, p, r, q, k), f.push(new THREE_M.Vector2(u, w))
                        }
                }
            }
            return {
                offset: t.ha * b,
                points: f,
                path: g
            }
        }
    }
};
(function(a) {
    var c = function(a) {
        for (var c = a.length, g = 0, f = c - 1, e = 0; e < c; f = e++) g += a[f].x * a[e].y - a[e].x * a[f].y;
        return g * 0.5
    };
    a.Triangulate = function(a, d) {
        var g = a.length;
        if (g < 3) return null;
        var f = [],
            e = [],
            h = [],
            i, l, k;
        if (c(a) > 0)
            for (l = 0; l < g; l++) e[l] = l;
        else
            for (l = 0; l < g; l++) e[l] = g - 1 - l;
        var o = 2 * g;
        for (l = g - 1; g > 2;) {
            if (o-- <= 0) {
                console.log("Warning, unable to triangulate polygon!");
                if (d) return h;
                return f
            }
            i = l;
            g <= i && (i = 0);
            l = i + 1;
            g <= l && (l = 0);
            k = l + 1;
            g <= k && (k = 0);
            var p;
            a: {
                p = a;
                var m = i,
                    r = l,
                    n = k,
                    q = g,
                    t = e,
                    w = void 0,
                    u = void 0,
                    B = void 0,
                    F = void 0,
                    A = void 0,
                    x = void 0,
                    y = void 0,
                    v = void 0,
                    J = void 0,
                    u = p[t[m]].x,
                    B = p[t[m]].y,
                    F = p[t[r]].x,
                    A = p[t[r]].y,
                    x = p[t[n]].x,
                    y = p[t[n]].y;
                if (1.0E-10 > (F - u) * (y - B) - (A - B) * (x - u)) p = !1;
                else {
                    for (w = 0; w < q; w++)
                        if (!(w == m || w == r || w == n)) {
                            var v = p[t[w]].x,
                                J = p[t[w]].y,
                                s = void 0,
                                E = void 0,
                                R = void 0,
                                U = void 0,
                                K = void 0,
                                P = void 0,
                                O = void 0,
                                aa = void 0,
                                H = void 0,
                                G = void 0,
                                I = void 0,
                                M = void 0,
                                s = R = K = void 0,
                                s = x - F,
                                E = y - A,
                                R = u - x,
                                U = B - y,
                                K = F - u,
                                P = A - B,
                                O = v - u,
                                aa = J - B,
                                H = v - F,
                                G = J - A,
                                I = v - x,
                                M = J - y,
                                s = s * G - E * H,
                                K = K * aa - P * O,
                                R = R * M - U * I;
                            if (s >= 0 && R >= 0 && K >= 0) {
                                p = !1;
                                break a
                            }
                        }
                    p = !0
                }
            }
            if (p) {
                f.push([a[e[i]], a[e[l]], a[e[k]]]);
                h.push([e[i], e[l], e[k]]);
                i = l;
                for (k = l + 1; k < g; i++, k++) e[i] = e[k];
                g--;
                o = 2 * g
            }
        }
        if (d) return h;
        return f
    };
    a.Triangulate.area = c;
    return a
})(THREE_M.FontUtils);
self._typeface_js = {
    faces: THREE_M.FontUtils.faces,
    loadFace: THREE_M.FontUtils.loadFace
};
THREE_M.TorusGeometry = function(a, c, b, d, g) {
    THREE_M.Geometry.call(this);
    this.radius = a || 100;
    this.tube = c || 40;
    this.segmentsR = b || 8;
    this.segmentsT = d || 6;
    this.arc = g || Math.PI * 2;
    g = new THREE_M.Vector3;
    a = [];
    c = [];
    for (b = 0; b <= this.segmentsR; b++)
        for (d = 0; d <= this.segmentsT; d++) {
            var f = d / this.segmentsT * this.arc,
                e = b / this.segmentsR * Math.PI * 2;
            g.x = this.radius * Math.cos(f);
            g.y = this.radius * Math.sin(f);
            var h = new THREE_M.Vector3;
            h.x = (this.radius + this.tube * Math.cos(e)) * Math.cos(f);
            h.y = (this.radius + this.tube * Math.cos(e)) * Math.sin(f);
            h.z =
                this.tube * Math.sin(e);
            this.vertices.push(new THREE_M.Vertex(h));
            a.push(new THREE_M.UV(d / this.segmentsT, 1 - b / this.segmentsR));
            c.push(h.clone().subSelf(g).normalize())
        }
    for (b = 1; b <= this.segmentsR; b++)
        for (d = 1; d <= this.segmentsT; d++) {
            var g = (this.segmentsT + 1) * b + d - 1,
                f = (this.segmentsT + 1) * (b - 1) + d - 1,
                e = (this.segmentsT + 1) * (b - 1) + d,
                h = (this.segmentsT + 1) * b + d,
                i = new THREE_M.Face4(g, f, e, h, [c[g], c[f], c[e], c[h]]);
            i.normal.addSelf(c[g]);
            i.normal.addSelf(c[f]);
            i.normal.addSelf(c[e]);
            i.normal.addSelf(c[h]);
            i.normal.normalize();
            this.faces.push(i);
            this.faceVertexUvs[0].push([a[g].clone(), a[f].clone(), a[e].clone(), a[h].clone()])
        }
    this.computeCentroids()
};
THREE_M.TorusGeometry.prototype = new THREE_M.Geometry;
THREE_M.TorusGeometry.prototype.constructor = THREE_M.TorusGeometry;
THREE_M.TorusKnotGeometry = function(a, c, b, d, g, f, e) {
    function h(a, b, c, d, e, f) {
        b = c / d * a;
        c = Math.cos(b);
        return new THREE_M.Vector3(e * (2 + c) * 0.5 * Math.cos(a), e * (2 + c) * Math.sin(a) * 0.5, f * e * Math.sin(b) * 0.5)
    }
    THREE_M.Geometry.call(this);
    this.radius = a || 200;
    this.tube = c || 40;
    this.segmentsR = b || 64;
    this.segmentsT = d || 8;
    this.p = g || 2;
    this.q = f || 3;
    this.heightScale = e || 1;
    this.grid = Array(this.segmentsR);
    b = new THREE_M.Vector3;
    d = new THREE_M.Vector3;
    f = new THREE_M.Vector3;
    for (a = 0; a < this.segmentsR; ++a) {
        this.grid[a] = Array(this.segmentsT);
        for (c = 0; c <
            this.segmentsT; ++c) {
            var i = a / this.segmentsR * 2 * this.p * Math.PI,
                e = c / this.segmentsT * 2 * Math.PI,
                g = h(i, e, this.q, this.p, this.radius, this.heightScale),
                i = h(i + 0.01, e, this.q, this.p, this.radius, this.heightScale);
            b.x = i.x - g.x;
            b.y = i.y - g.y;
            b.z = i.z - g.z;
            d.x = i.x + g.x;
            d.y = i.y + g.y;
            d.z = i.z + g.z;
            f.cross(b, d);
            d.cross(f, b);
            f.normalize();
            d.normalize();
            i = -this.tube * Math.cos(e);
            e = this.tube * Math.sin(e);
            g.x += i * d.x + e * f.x;
            g.y += i * d.y + e * f.y;
            g.z += i * d.z + e * f.z;
            this.grid[a][c] = this.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(g.x, g.y,
                g.z))) - 1
        }
    }
    for (a = 0; a < this.segmentsR; ++a)
        for (c = 0; c < this.segmentsT; ++c) {
            var d = (a + 1) % this.segmentsR,
                f = (c + 1) % this.segmentsT,
                g = this.grid[a][c],
                b = this.grid[d][c],
                d = this.grid[d][f],
                f = this.grid[a][f],
                e = new THREE_M.UV(a / this.segmentsR, c / this.segmentsT),
                i = new THREE_M.UV((a + 1) / this.segmentsR, c / this.segmentsT),
                l = new THREE_M.UV((a + 1) / this.segmentsR, (c + 1) / this.segmentsT),
                k = new THREE_M.UV(a / this.segmentsR, (c + 1) / this.segmentsT);
            this.faces.push(new THREE_M.Face4(g, b, d, f));
            this.faceVertexUvs[0].push([e, i, l, k])
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE_M.TorusKnotGeometry.prototype = new THREE_M.Geometry;
THREE_M.TorusKnotGeometry.prototype.constructor = THREE_M.TorusKnotGeometry;
THREE_M.SubdivisionModifier = function(a) {
    this.subdivisions = a === void 0 ? 1 : a;
    this.useOldVertexColors = !1;
    this.supportUVs = !0
};
THREE_M.SubdivisionModifier.prototype.constructor = THREE_M.SubdivisionModifier;
THREE_M.SubdivisionModifier.prototype.modify = function(a) {
    for (var c = this.subdivisions; c-- > 0;) this.smooth(a)
};
THREE_M.SubdivisionModifier.prototype.smooth = function(a) {
    function c(a, b, c, d, h, i) {
        var k = new THREE_M.Face4(a, b, c, d, null, h.color, h.material);
        if (e.useOldVertexColors) {
            k.vertexColors = [];
            for (var l, m, n, j = 0; j < 4; j++) {
                n = i[j];
                l = new THREE_M.Color;
                l.setRGB(0, 0, 0);
                for (var o = 0; o < n.length; o++) m = h.vertexColors[n[o] - 1], l.r += m.r, l.g += m.g, l.b += m.b;
                l.r /= n.length;
                l.g /= n.length;
                l.b /= n.length;
                k.vertexColors[j] = l
            }
        }
        g.push(k);
        (!e.supportUVs || p.length != 0) && f.push([p[a], p[b], p[c], p[d]])
    }

    function b(a, b) {
        return Math.min(a, b) + "_" + Math.max(a,
            b)
    }
    var d = [],
        g = [],
        f = [],
        e = this,
        h = a.vertices,
        d = a.faces,
        i = h.concat(),
        l = [],
        k = {},
        o = {},
        p = [],
        m, r, n, q, t, w = a.faceVertexUvs[0];
    m = 0;
    for (r = w.length; m < r; m++) {
        n = 0;
        for (q = w[m].length; n < q; n++) t = d[m]["abcd".charAt(n)], p[t] || (p[t] = w[m][n])
    }
    var u;
    m = 0;
    for (r = d.length; m < r; m++)
        if (t = d[m], l.push(t.centroid), i.push(new THREE_M.Vertex(t.centroid)), e.supportUVs && p.length != 0) {
            u = new THREE_M.UV;
            if (t instanceof THREE_M.Face3) u.u = p[t.a].u + p[t.b].u + p[t.c].u, u.v = p[t.a].v + p[t.b].v + p[t.c].v, u.u /= 3, u.v /= 3;
            else if (t instanceof THREE_M.Face4) u.u =
                p[t.a].u + p[t.b].u + p[t.c].u + p[t.d].u, u.v = p[t.a].v + p[t.b].v + p[t.c].v + p[t.d].v, u.u /= 4, u.v /= 4;
            p.push(u)
        }
    r = function(a) {
        function c(a, b, d) {
            a[b] === void 0 && (a[b] = []);
            a[b].push(d)
        }
        var d, e, f, g, h = {};
        d = 0;
        for (e = a.faces.length; d < e; d++) f = a.faces[d], f instanceof THREE_M.Face3 ? (g = b(f.a, f.b), c(h, g, d), g = b(f.b, f.c), c(h, g, d), g = b(f.c, f.a), c(h, g, d)) : f instanceof THREE_M.Face4 && (g = b(f.a, f.b), c(h, g, d), g = b(f.b, f.c), c(h, g, d), g = b(f.c, f.d), c(h, g, d), g = b(f.d, f.a), c(h, g, d));
        return h
    }(a);
    var B = 0,
        w = h.length,
        F, A, x = {},
        y = {},
        v = function(a,
            b) {
            x[a] === void 0 && (x[a] = []);
            x[a].push(b)
        },
        J = function(a, b) {
            y[a] === void 0 && (y[a] = {});
            y[a][b] = null
        };
    for (m in r) {
        u = r[m];
        F = m.split("_");
        A = F[0];
        F = F[1];
        v(A, [A, F]);
        v(F, [A, F]);
        n = 0;
        for (q = u.length; n < q; n++) t = u[n], J(A, t, m), J(F, t, m);
        u.length < 2 && (o[m] = !0)
    }
    for (m in r)
        if (u = r[m], t = u[0], u = u[1], F = m.split("_"), A = F[0], F = F[1], q = new THREE_M.Vector3, o[m] ? (q.addSelf(h[A].position), q.addSelf(h[F].position), q.multiplyScalar(0.5)) : (q.addSelf(l[t]), q.addSelf(l[u]), q.addSelf(h[A].position), q.addSelf(h[F].position), q.multiplyScalar(0.25)),
            k[m] = w + d.length + B, i.push(new THREE_M.Vertex(q)), B++, e.supportUVs && p.length != 0) u = new THREE_M.UV, u.u = p[A].u + p[F].u, u.v = p[A].v + p[F].v, u.u /= 2, u.v /= 2, p.push(u);
    var s, E;
    F = ["123", "12", "2", "23"];
    q = ["123", "23", "3", "31"];
    var v = ["123", "31", "1", "12"],
        J = ["1234", "12", "2", "23"],
        R = ["1234", "23", "3", "34"],
        U = ["1234", "34", "4", "41"],
        K = ["1234", "41", "1", "12"];
    m = 0;
    for (r = l.length; m < r; m++) t = d[m], u = w + m, t instanceof THREE_M.Face3 ? (B = b(t.a, t.b), A = b(t.b, t.c), s = b(t.c, t.a), c(u, k[B], t.b, k[A], t, F), c(u, k[A], t.c, k[s], t, q), c(u, k[s], t.a, k[B],
        t, v)) : t instanceof THREE_M.Face4 ? (B = b(t.a, t.b), A = b(t.b, t.c), s = b(t.c, t.d), E = b(t.d, t.a), c(u, k[B], t.b, k[A], t, J), c(u, k[A], t.c, k[s], t, R), c(u, k[s], t.d, k[E], t, U), c(u, k[E], t.a, k[B], t, K)) : console.log("face should be a face!", t);
    d = i;
    i = new THREE_M.Vector3;
    k = new THREE_M.Vector3;
    m = 0;
    for (r = h.length; m < r; m++)
        if (x[m] !== void 0) {
            i.set(0, 0, 0);
            k.set(0, 0, 0);
            t = new THREE_M.Vector3(0, 0, 0);
            u = 0;
            for (n in y[m]) i.addSelf(l[n]), u++;
            B = 0;
            w = x[m].length;
            for (n = 0; n < w; n++) o[b(x[m][n][0], x[m][n][1])] && B++;
            if (B != 2) {
                i.divideScalar(u);
                for (n = 0; n <
                    w; n++) u = x[m][n], u = h[u[0]].position.clone().addSelf(h[u[1]].position).divideScalar(2), k.addSelf(u);
                k.divideScalar(w);
                t.addSelf(h[m].position);
                t.multiplyScalar(w - 3);
                t.addSelf(i);
                t.addSelf(k.multiplyScalar(2));
                t.divideScalar(w);
                d[m].position = t
            }
        }
    a.vertices = d;
    a.faces = g;
    a.faceVertexUvs[0] = f;
    delete a.__tmpVertices;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals()
};
THREE_M.Loader = function(a) {
    this.statusDomElement = (this.showStatus = a) ? THREE_M.Loader.prototype.addStatusElement() : null;
    this.onLoadStart = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {}
};
THREE_M.Loader.prototype = {
    constructor: THREE_M.Loader,
    addStatusElement: function() {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.right = "0px";
        a.style.top = "0px";
        a.style.fontSize = "0.8em";
        a.style.textAlign = "left";
        a.style.background = "rgba(0,0,0,0.25)";
        a.style.color = "#fff";
        a.style.width = "120px";
        a.style.padding = "0.5em 0.5em 0.5em 0.5em";
        a.style.zIndex = 1E3;
        a.innerHTML = "Loading ...";
        return a
    },
    updateProgress: function(a) {
        var c = "Loaded ";
        c += a.total ? (100 * a.loaded / a.total).toFixed(0) + "%" : (a.loaded /
            1E3).toFixed(2) + " KB";
        this.statusDomElement.innerHTML = c
    },
    extractUrlbase: function(a) {
        a = a.split("/");
        a.pop();
        return a.length < 1 ? "" : a.join("/") + "/"
    },
    initMaterials: function(a, c, b) {
        a.materials = [];
        for (var d = 0; d < c.length; ++d) a.materials[d] = THREE_M.Loader.prototype.createMaterial(c[d], b)
    },
    hasNormals: function(a) {
        var c, b, d = a.materials.length;
        for (b = 0; b < d; b++)
            if (c = a.materials[b], c instanceof THREE_M.ShaderMaterial) return !0;
        return !1
    },
    createMaterial: function(a, c) {
        function b(a) {
            a = Math.log(a) / Math.LN2;
            return Math.floor(a) ==
                a
        }

        function d(a, c) {
            var d = new Image;
            d.onload = function() {
                if (!b(this.width) || !b(this.height)) {
                    var c = Math.pow(2, Math.round(Math.log(this.width) / Math.LN2)),
                        d = Math.pow(2, Math.round(Math.log(this.height) / Math.LN2));
                    a.image.width = c;
                    a.image.height = d;
                    a.image.getContext("2d").drawImage(this, 0, 0, c, d)
                } else a.image = this;
                a.needsUpdate = !0
            };
            d.src = c
        }

        function g(a, b, e, f, g, h) {
            var i = document.createElement("canvas");
            a[b] = new THREE_M.Texture(i);
            a[b].sourceFile = e;
            if (f) {
                a[b].repeat.set(f[0], f[1]);
                if (f[0] != 1) a[b].wrapS = THREE_M.RepeatWrapping;
                if (f[1] != 1) a[b].wrapT = THREE_M.RepeatWrapping
            }
            g && a[b].offset.set(g[0], g[1]);
            if (h) {
                f = {
                    repeat: THREE_M.RepeatWrapping,
                    mirror: THREE_M.MirroredRepeatWrapping
                };
                if (f[h[0]] !== void 0) a[b].wrapS = f[h[0]];
                if (f[h[1]] !== void 0) a[b].wrapT = f[h[1]]
            }
            d(a[b], c + "/" + e)
        }

        function f(a) {
            return (a[0] * 255 << 16) + (a[1] * 255 << 8) + a[2] * 255
        }
        var e, h, i;
        h = "MeshLambertMaterial";
        e = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            wireframe: a.wireframe
        };
        a.shading && (a.shading == "Phong" ? h = "MeshPhongMaterial" : a.shading == "Basic" && (h = "MeshBasicMaterial"));
        if (a.blending)
            if (a.blending == "Additive") e.blending = THREE_M.AdditiveBlending;
            else if (a.blending == "Subtractive") e.blending = THREE_M.SubtractiveBlending;
        else if (a.blending == "Multiply") e.blending = THREE_M.MultiplyBlending;
        if (a.transparent !== void 0 || a.opacity < 1) e.transparent = a.transparent;
        if (a.depthTest !== void 0) e.depthTest = a.depthTest;
        if (a.vertexColors !== void 0)
            if (a.vertexColors == "face") e.vertexColors = THREE_M.FaceColors;
            else if (a.vertexColors) e.vertexColors = THREE_M.VertexColors;
        if (a.colorDiffuse) e.color = f(a.colorDiffuse);
        else if (a.DbgColor) e.color = a.DbgColor;
        if (a.colorSpecular) e.specular = f(a.colorSpecular);
        if (a.colorAmbient) e.ambient = f(a.colorAmbient);
        if (a.transparency) e.opacity = a.transparency;
        if (a.specularCoef) e.shininess = a.specularCoef;
        a.mapDiffuse && c && g(e, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap);
        a.mapLight && c && g(e, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap);
        a.mapNormal && c && g(e, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap);
        a.mapSpecular && c && g(e, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap);
        if (a.mapNormal) {
            var l = THREE_M.ShaderUtils.lib.normal,
                k = THREE_M.UniformsUtils.clone(l.uniforms),
                o = e.color;
            h = e.specular;
            i = e.ambient;
            var p = e.shininess;
            k.tNormal.texture = e.normalMap;
            if (a.mapNormalFactor) k.uNormalScale.value = a.mapNormalFactor;
            if (e.map) k.tDiffuse.texture = e.map, k.enableDiffuse.value = !0;
            if (e.specularMap) k.tSpecular.texture = e.specularMap, k.enableSpecular.value = !0;
            if (e.lightMap) k.tAO.texture =
                e.lightMap, k.enableAO.value = !0;
            k.uDiffuseColor.value.setHex(o);
            k.uSpecularColor.value.setHex(h);
            k.uAmbientColor.value.setHex(i);
            k.uShininess.value = p;
            if (e.opacity) k.uOpacity.value = e.opacity;
            e = new THREE_M.ShaderMaterial({
                fragmentShader: l.fragmentShader,
                vertexShader: l.vertexShader,
                uniforms: k,
                lights: !0,
                fog: !0
            })
        } else e = new THREE_M[h](e);
        return e
    }
};
THREE_M.BinaryLoader = function(a) {
    THREE_M.Loader.call(this, a)
};
THREE_M.BinaryLoader.prototype = new THREE_M.Loader;
THREE_M.BinaryLoader.prototype.constructor = THREE_M.BinaryLoader;
THREE_M.BinaryLoader.prototype.supr = THREE_M.Loader.prototype;
THREE_M.BinaryLoader.prototype.load = function(a, c, b, d) {
    if (a instanceof Object) console.warn("DEPRECATED: BinaryLoader( parameters ) is now BinaryLoader( url, callback, texturePath, binaryPath )."), d = a, a = d.model, c = d.callback, b = d.texture_path, d = d.bin_path;
    var b = b ? b : this.extractUrlbase(a),
        d = d ? d : this.extractUrlbase(a),
        g = this.showProgress ? THREE_M.Loader.prototype.updateProgress : null;
    this.onLoadStart();
    this.loadAjaxJSON(this, a, c, b, d, g)
};
THREE_M.BinaryLoader.prototype.loadAjaxJSON = function(a, c, b, d, g, f) {
    var e = new XMLHttpRequest;
    e.onreadystatechange = function() {
        if (e.readyState == 4)
            if (e.status == 200 || e.status == 0) try {
                var h = JSON.parse(e.responseText);
                h.metadata === void 0 || h.metadata.formatVersion === void 0 || h.metadata.formatVersion !== 3 ? console.error("Deprecated file format.") : a.loadAjaxBuffers(h, b, g, d, f)
            } catch (i) {
                console.error(i), console.warn("DEPRECATED: [" + c + "] seems to be using old model format")
            } else console.error("Couldn't load [" + c + "] [" +
                e.status + "]")
    };
    e.open("GET", c, !0);
    e.overrideMimeType("text/plain; charset=x-user-defined");
    e.setRequestHeader("Content-Type", "text/plain");
    e.send(null)
};
THREE_M.BinaryLoader.prototype.loadAjaxBuffers = function(a, c, b, d, g) {
    var f = new XMLHttpRequest,
        e = b + "/" + a.buffers,
        h = 0;
    f.onreadystatechange = function() {
        f.readyState == 4 ? f.status == 200 || f.status == 0 ? THREE_M.BinaryLoader.prototype.createBinModel(f.response, c, d, a.materials) : console.error("Couldn't load [" + e + "] [" + f.status + "]") : f.readyState == 3 ? g && (h == 0 && (h = f.getResponseHeader("Content-Length")), g({
            total: h,
            loaded: f.responseText.length
        })) : f.readyState == 2 && (h = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", e, !0);
    f.responseType = "arraybuffer";
    f.send(null)
};
THREE_M.BinaryLoader.prototype.createBinModel = function(a, c, b, d) {
    var g = function(b) {
        function c(a) {
            return a % 4 ? 4 - a % 4 : 0
        }

        function g(a, b) {
            return (new Uint8Array(a, b, 1))[0]
        }

        function i(a, b) {
            return (new Uint32Array(a, b, 1))[0]
        }

        function l(b, c) {
            var d, e, f, g, h, i, k, l, m = new Uint32Array(a, c, 3 * b);
            for (d = 0; d < b; d++) {
                e = m[d * 3];
                f = m[d * 3 + 1];
                g = m[d * 3 + 2];
                h = u[e * 2];
                e = u[e * 2 + 1];
                i = u[f * 2];
                k = u[f * 2 + 1];
                f = u[g * 2];
                l = u[g * 2 + 1];
                g = n.faceVertexUvs[0];
                var o = [];
                o.push(new THREE_M.UV(h, e));
                o.push(new THREE_M.UV(i, k));
                o.push(new THREE_M.UV(f, l));
                g.push(o)
            }
        }

        function k(b, c) {
            var d, e, f, g, h, i, k, l, m, o, p = new Uint32Array(a, c, 4 * b);
            for (d = 0; d < b; d++) {
                e = p[d * 4];
                f = p[d * 4 + 1];
                g = p[d * 4 + 2];
                h = p[d * 4 + 3];
                i = u[e * 2];
                e = u[e * 2 + 1];
                k = u[f * 2];
                m = u[f * 2 + 1];
                l = u[g * 2];
                o = u[g * 2 + 1];
                g = u[h * 2];
                f = u[h * 2 + 1];
                h = n.faceVertexUvs[0];
                var q = [];
                q.push(new THREE_M.UV(i, e));
                q.push(new THREE_M.UV(k, m));
                q.push(new THREE_M.UV(l, o));
                q.push(new THREE_M.UV(g, f));
                h.push(q)
            }
        }

        function o(b, c, d) {
            for (var e, f, g, h, c = new Uint32Array(a, c, 3 * b), i = new Uint16Array(a, d, b), d = 0; d < b; d++) e = c[d * 3], f = c[d * 3 + 1], g = c[d * 3 + 2], h = i[d], n.faces.push(new THREE_M.Face3(e,
                f, g, null, null, h))
        }

        function p(b, c, d) {
            for (var e, f, g, h, i, c = new Uint32Array(a, c, 4 * b), k = new Uint16Array(a, d, b), d = 0; d < b; d++) e = c[d * 4], f = c[d * 4 + 1], g = c[d * 4 + 2], h = c[d * 4 + 3], i = k[d], n.faces.push(new THREE_M.Face4(e, f, g, h, null, null, i))
        }

        function m(b, c, d, e) {
            for (var f, g, h, i, k, l, m, c = new Uint32Array(a, c, 3 * b), d = new Uint32Array(a, d, 3 * b), o = new Uint16Array(a, e, b), e = 0; e < b; e++) {
                f = c[e * 3];
                g = c[e * 3 + 1];
                h = c[e * 3 + 2];
                k = d[e * 3];
                l = d[e * 3 + 1];
                m = d[e * 3 + 2];
                i = o[e];
                var p = w[l * 3],
                    q = w[l * 3 + 1];
                l = w[l * 3 + 2];
                var r = w[m * 3],
                    t = w[m * 3 + 1];
                m = w[m * 3 + 2];
                n.faces.push(new THREE_M.Face3(f,
                    g, h, [new THREE_M.Vector3(w[k * 3], w[k * 3 + 1], w[k * 3 + 2]), new THREE_M.Vector3(p, q, l), new THREE_M.Vector3(r, t, m)], null, i))
            }
        }

        function r(b, c, d, e) {
            for (var f, g, h, i, k, l, m, o, p, c = new Uint32Array(a, c, 4 * b), d = new Uint32Array(a, d, 4 * b), q = new Uint16Array(a, e, b), e = 0; e < b; e++) {
                f = c[e * 4];
                g = c[e * 4 + 1];
                h = c[e * 4 + 2];
                i = c[e * 4 + 3];
                l = d[e * 4];
                m = d[e * 4 + 1];
                o = d[e * 4 + 2];
                p = d[e * 4 + 3];
                k = q[e];
                var r = w[m * 3],
                    t = w[m * 3 + 1];
                m = w[m * 3 + 2];
                var j = w[o * 3],
                    u = w[o * 3 + 1];
                o = w[o * 3 + 2];
                var v = w[p * 3],
                    x = w[p * 3 + 1];
                p = w[p * 3 + 2];
                n.faces.push(new THREE_M.Face4(f, g, h, i, [new THREE_M.Vector3(w[l *
                    3], w[l * 3 + 1], w[l * 3 + 2]), new THREE_M.Vector3(r, t, m), new THREE_M.Vector3(j, u, o), new THREE_M.Vector3(v, x, p)], null, k))
            }
        }
        var n = this,
            q = 0,
            t, w = [],
            u = [],
            B, F, A, x, y, v;
        THREE_M.Geometry.call(this);
        THREE_M.Loader.prototype.initMaterials(n, d, b);
        t = {
            signature: function(a, b, c) {
                for (var a = new Uint8Array(a, b, c), d = "", e = 0; e < c; e++) d += String.fromCharCode(a[b + e]);
                return d
            }(a, q, 12),
            header_bytes: g(a, q + 12),
            vertex_coordinate_bytes: g(a, q + 13),
            normal_coordinate_bytes: g(a, q + 14),
            uv_coordinate_bytes: g(a, q + 15),
            vertex_index_bytes: g(a, q + 16),
            normal_index_bytes: g(a,
                q + 17),
            uv_index_bytes: g(a, q + 18),
            material_index_bytes: g(a, q + 19),
            nvertices: i(a, q + 20),
            nnormals: i(a, q + 20 + 4),
            nuvs: i(a, q + 20 + 8),
            ntri_flat: i(a, q + 20 + 12),
            ntri_smooth: i(a, q + 20 + 16),
            ntri_flat_uv: i(a, q + 20 + 20),
            ntri_smooth_uv: i(a, q + 20 + 24),
            nquad_flat: i(a, q + 20 + 28),
            nquad_smooth: i(a, q + 20 + 32),
            nquad_flat_uv: i(a, q + 20 + 36),
            nquad_smooth_uv: i(a, q + 20 + 40)
        };
        t.signature !== "Three.js 003" && console.warn("DEPRECATED: binary model seems to be using old format");
        q += t.header_bytes;
        b = t.vertex_index_bytes * 3 + t.material_index_bytes;
        v = t.vertex_index_bytes *
            4 + t.material_index_bytes;
        B = t.ntri_flat * b;
        F = t.ntri_smooth * (b + t.normal_index_bytes * 3);
        A = t.ntri_flat_uv * (b + t.uv_index_bytes * 3);
        x = t.ntri_smooth_uv * (b + t.normal_index_bytes * 3 + t.uv_index_bytes * 3);
        y = t.nquad_flat * v;
        b = t.nquad_smooth * (v + t.normal_index_bytes * 4);
        v = t.nquad_flat_uv * (v + t.uv_index_bytes * 4);
        q += function(b) {
            var c = t.nvertices,
                b = new Float32Array(a, b, c * 3),
                d, e, f, g;
            for (d = 0; d < c; d++) e = b[d * 3], f = b[d * 3 + 1], g = b[d * 3 + 2], n.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(e, f, g)));
            return c * 3 * Float32Array.BYTES_PER_ELEMENT
        }(q);
        q += function(b) {
            var c = t.nnormals;
            if (c) {
                var b = new Int8Array(a, b, c * 3),
                    d, e, f, g;
                for (d = 0; d < c; d++) e = b[d * 3], f = b[d * 3 + 1], g = b[d * 3 + 2], w.push(e / 127, f / 127, g / 127)
            }
            return c * 3 * Int8Array.BYTES_PER_ELEMENT
        }(q);
        q += c(t.nnormals * 3);
        q += function(b) {
            var c = t.nuvs;
            if (c) {
                var b = new Float32Array(a, b, c * 2),
                    d, e, f;
                for (d = 0; d < c; d++) e = b[d * 2], f = b[d * 2 + 1], u.push(e, f)
            }
            return c * 2 * Float32Array.BYTES_PER_ELEMENT
        }(q);
        B = q + B + c(t.ntri_flat * 2);
        F = B + F + c(t.ntri_smooth * 2);
        A = F + A + c(t.ntri_flat_uv * 2);
        x = A + x + c(t.ntri_smooth_uv * 2);
        y = x + y + c(t.nquad_flat * 2);
        b = y + b + c(t.nquad_smooth * 2);
        v = b + v + c(t.nquad_flat_uv * 2);
        (function(a) {
            var b = t.ntri_flat_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                o(b, a, c + b * Uint32Array.BYTES_PER_ELEMENT * 3);
                l(b, c)
            }
        })(F);
        (function(a) {
            var b = t.ntri_smooth_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3,
                    d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                m(b, a, c, d + b * Uint32Array.BYTES_PER_ELEMENT * 3);
                l(b, d)
            }
        })(A);
        (function(a) {
            var b = t.nquad_flat_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                p(b, a, c + b * Uint32Array.BYTES_PER_ELEMENT * 4);
                k(b,
                    c)
            }
        })(b);
        (function(a) {
            var b = t.nquad_smooth_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4,
                    d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                r(b, a, c, d + b * Uint32Array.BYTES_PER_ELEMENT * 4);
                k(b, d)
            }
        })(v);
        (function(a) {
            var b = t.ntri_flat;
            b && o(b, a, a + b * Uint32Array.BYTES_PER_ELEMENT * 3)
        })(q);
        (function(a) {
            var b = t.ntri_smooth;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                m(b, a, c, c + b * Uint32Array.BYTES_PER_ELEMENT * 3)
            }
        })(B);
        (function(a) {
            var b = t.nquad_flat;
            b && p(b, a, a + b * Uint32Array.BYTES_PER_ELEMENT * 4)
        })(x);
        (function(a) {
            var b =
                t.nquad_smooth;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                r(b, a, c, c + b * Uint32Array.BYTES_PER_ELEMENT * 4)
            }
        })(y);
        this.computeCentroids();
        this.computeFaceNormals();
        THREE_M.Loader.prototype.hasNormals(this) && this.computeTangents()
    };
    g.prototype = new THREE_M.Geometry;
    g.prototype.constructor = g;
    c(new g(b))
};
THREE_M.ColladaLoader = function() {
    function a(a, d, g) {
        j = a;
        d = d || da;
        g !== void 0 && (a = g.split("/"), a.pop(), Da = a.length < 1 ? "" : a.join("/") + "/");
        $ = c("//dae:library_images/dae:image", e, "image");
        na = c("//dae:library_materials/dae:material", y, "material");
        oa = c("//dae:library_effects/dae:effect", R, "effect");
        qa = c("//dae:library_geometries/dae:geometry", q, "geometry");
        ra = c("//dae:library_controllers/dae:controller", h, "controller");
        ua = c("//dae:library_animations/dae:animation", K, "animation");
        pa = c(".//dae:library_visual_scenes/dae:visual_scene",
            k, "visual_scene");
        za = [];
        Aa = [];
        (a = j.evaluate(".//dae:scene/dae:instance_visual_scene", j, H, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) ? (a = a.getAttribute("url").replace(/^#/, ""), V = pa[a]) : V = null;
        X = new THREE_M.Object3D;
        for (a = 0; a < V.nodes.length; a++) X.add(f(V.nodes[a]));
        b();
        for (var i in ua);
        i = {
            scene: X,
            morphs: za,
            skins: Aa,
            dae: {
                images: $,
                materials: na,
                effects: oa,
                geometries: qa,
                controllers: ra,
                animations: ua,
                visualScenes: pa,
                scene: V
            }
        };
        d && d(i);
        return i
    }

    function c(a, b, c) {
        for (var a = j.evaluate(a, j, H, XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                null), d = {}, e = a.iterateNext(), f = 0; e;) {
            e = (new b).parse(e);
            if (e.id.length == 0) e.id = c + f++;
            d[e.id] = e;
            e = a.iterateNext()
        }
        return d
    }

    function b() {
        var a = 1E6,
            b = -a,
            c = 0,
            d;
        for (d in ua)
            for (var e = ua[d], f = 0; f < e.sampler.length; f++) {
                var g = e.sampler[f];
                g.create();
                a = Math.min(a, g.startTime);
                b = Math.max(b, g.endTime);
                c = Math.max(c, g.input.length)
            }
        return {
            start: a,
            end: b,
            frames: c
        }
    }

    function d(a, b, c, e) {
        a.world = a.world || new THREE_M.Matrix4;
        a.world.copy(a.matrix);
        if (a.channels && a.channels.length) {
            var f = a.channels[0].sampler.output[c];
            f instanceof THREE_M.Matrix4 && a.world.copy(f)
        }
        e && a.world.multiply(e, a.world);
        b.push(a);
        for (e = 0; e < a.nodes.length; e++) d(a.nodes[e], b, c, a.world)
    }

    function g(a, c, e) {
        var f = ra[c.url];
        if (!f || !f.skin) console.log("ColladaLoader: Could not find skin controller.");
        else if (!c.skeleton || !c.skeleton.length) console.log("ColladaLoader: Could not find the skeleton for the skin. ");
        else {
            var g = b(),
                c = V.getChildById(c.skeleton[0], !0) || V.getChildBySid(c.skeleton[0], !0),
                h, i, j, k, l = new THREE_M.Vector3,
                m;
            for (h = 0; h < a.vertices.length; h++) f.skin.bindShapeMatrix.multiplyVector3(a.vertices[h].position);
            for (e = 0; e < g.frames; e++) {
                var n = [],
                    o = [];
                for (h = 0; h < a.vertices.length; h++) o.push(new THREE_M.Vertex(new THREE_M.Vector3));
                d(c, n, e);
                h = n;
                i = f.skin;
                for (k = 0; k < h.length; k++)
                    if (j = h[k], m = -1, j.type == "JOINT") {
                        for (var p = 0; p < i.joints.length; p++)
                            if (j.sid == i.joints[p]) {
                                m = p;
                                break
                            }
                        if (m >= 0) {
                            p = i.invBindMatrices[m];
                            j.invBindMatrix = p;
                            j.skinningMatrix = new THREE_M.Matrix4;
                            j.skinningMatrix.multiply(j.world, p);
                            j.weights = [];
                            for (p = 0; p < i.weights.length; p++)
                                for (var q = 0; q < i.weights[p].length; q++) {
                                    var r = i.weights[p][q];
                                    r.joint == m && j.weights.push(r)
                                }
                        } else throw "ColladaLoader: Could not find joint '" +
                            j.sid + "'.";
                    }
                for (h = 0; h < n.length; h++)
                    if (n[h].type == "JOINT")
                        for (i = 0; i < n[h].weights.length; i++) j = n[h].weights[i], k = j.index, j = j.weight, m = a.vertices[k], k = o[k], l.x = m.position.x, l.y = m.position.y, l.z = m.position.z, n[h].skinningMatrix.multiplyVector3(l), k.position.x += l.x * j, k.position.y += l.y * j, k.position.z += l.z * j;
                a.morphTargets.push({
                    name: "target_" + e,
                    vertices: o
                })
            }
        }
    }

    function f(a) {
        var b = new THREE_M.Object3D,
            c, d, e, h;
        for (e = 0; e < a.controllers.length; e++) {
            var i = ra[a.controllers[e].url];
            switch (i.type) {
                case "skin":
                    if (qa[i.skin.source]) {
                        var j =
                            new n;
                        j.url = i.skin.source;
                        j.instance_material = a.controllers[e].instance_material;
                        a.geometries.push(j);
                        c = a.controllers[e]
                    } else if (ra[i.skin.source] && (d = i = ra[i.skin.source], i.morph && qa[i.morph.source])) j = new n, j.url = i.morph.source, j.instance_material = a.controllers[e].instance_material, a.geometries.push(j);
                    break;
                case "morph":
                    if (qa[i.morph.source]) j = new n, j.url = i.morph.source, j.instance_material = a.controllers[e].instance_material, a.geometries.push(j), d = a.controllers[e];
                    console.log("ColladaLoader: Morph-controller partially supported.")
            }
        }
        for (e =
            0; e < a.geometries.length; e++) {
            var i = a.geometries[e],
                j = i.instance_material,
                i = qa[i.url],
                k = {},
                l = 0,
                o;
            if (i && i.mesh && i.mesh.primitives) {
                if (b.name.length == 0) b.name = i.id;
                if (j)
                    for (h = 0; h < j.length; h++) {
                        o = j[h];
                        var p = oa[na[o.target].instance_effect.url].shader;
                        p.material.opacity = !p.material.opacity ? 1 : p.material.opacity;
                        o = k[o.symbol] = p.material;
                        l++
                    }
                j = o || new THREE_M.MeshLambertMaterial({
                    color: 14540253,
                    shading: THREE_M.FlatShading
                });
                i = i.mesh.geometry3js;
                if (l > 1) {
                    j = new THREE_M.MeshFaceMaterial;
                    for (h = 0; h < i.faces.length; h++) l =
                        i.faces[h], l.materials = [k[l.daeMaterial]]
                }
                if (c !== void 0) g(i, c), j.morphTargets = !0, j = new THREE_M.SkinnedMesh(i, j), j.skeleton = c.skeleton, j.skinController = ra[c.url], j.skinInstanceController = c, j.name = "skin_" + Aa.length, Aa.push(j);
                else if (d !== void 0) {
                    h = i;
                    k = d instanceof m ? ra[d.url] : d;
                    if (!k || !k.morph) console.log("could not find morph controller!");
                    else {
                        k = k.morph;
                        for (l = 0; l < k.targets.length; l++)
                            if (p = qa[k.targets[l]], p.mesh && p.mesh.primitives && p.mesh.primitives.length) p = p.mesh.primitives[0].geometry, p.vertices.length ===
                                h.vertices.length && h.morphTargets.push({
                                    name: "target_1",
                                    vertices: p.vertices
                                });
                        h.morphTargets.push({
                            name: "target_Z",
                            vertices: h.vertices
                        })
                    }
                    j.morphTargets = !0;
                    j = new THREE_M.Mesh(i, j);
                    j.name = "morph_" + za.length;
                    za.push(j)
                } else j = new THREE_M.Mesh(i, j);
                a.geometries.length > 1 ? b.add(j) : b = j
            }
        }
        b.name = a.id || "";
        a.matrix.decompose(b.position, b.rotation, b.scale);
        for (e = 0; e < a.nodes.length; e++) b.add(f(a.nodes[e], a));
        return b
    }

    function e() {
        this.init_from = this.id = ""
    }

    function h() {
        this.type = this.name = this.id = "";
        this.morph = this.skin =
            null
    }

    function i() {
        this.weights = this.targets = this.source = this.method = null
    }

    function l() {
        this.source = "";
        this.bindShapeMatrix = null;
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = []
    }

    function k() {
        this.name = this.id = "";
        this.nodes = [];
        this.scene = new THREE_M.Object3D
    }

    function o() {
        this.sid = this.name = this.id = "";
        this.nodes = [];
        this.controllers = [];
        this.transforms = [];
        this.geometries = [];
        this.channels = [];
        this.matrix = new THREE_M.Matrix4
    }

    function p() {
        this.type = this.sid = "";
        this.data = [];
        this.matrix = new THREE_M.Matrix4
    }

    function m() {
        this.url =
            "";
        this.skeleton = [];
        this.instance_material = []
    }

    function r() {
        this.target = this.symbol = ""
    }

    function n() {
        this.url = "";
        this.instance_material = []
    }

    function q() {
        this.id = "";
        this.mesh = null
    }

    function t(a) {
        this.geometry = a.id;
        this.primitives = [];
        this.geometry3js = this.vertices = null
    }

    function w() {}

    function u() {
        this.material = "";
        this.count = 0;
        this.inputs = [];
        this.vcount = null;
        this.p = [];
        this.geometry = new THREE_M.Geometry
    }

    function B() {
        this.source = "";
        this.stride = this.count = 0;
        this.params = []
    }

    function F() {
        this.input = {}
    }

    function A() {
        this.semantic =
            "";
        this.offset = 0;
        this.source = "";
        this.set = 0
    }

    function x(a) {
        this.id = a;
        this.type = null
    }

    function y() {
        this.name = this.id = "";
        this.instance_effect = null
    }

    function v() {
        this.color = new THREE_M.Color(0);
        this.color.setRGB(Math.random(), Math.random(), Math.random());
        this.color.a = 1;
        this.texcoord = this.texture = null
    }

    function J(a, b) {
        this.type = a;
        this.effect = b;
        this.material = null
    }

    function s(a) {
        this.effect = a;
        this.format = this.init_from = null
    }

    function E(a) {
        this.effect = a;
        this.mipfilter = this.magfilter = this.minfilter = this.wrap_t = this.wrap_s =
            this.source = null
    }

    function R() {
        this.name = this.id = "";
        this.sampler = this.surface = this.shader = null
    }

    function U() {
        this.url = ""
    }

    function K() {
        this.name = this.id = "";
        this.source = {};
        this.sampler = [];
        this.channel = []
    }

    function P(a) {
        this.animation = a;
        this.target = this.source = "";
        this.member = this.arrIndices = this.arrSyntax = this.dotSyntax = this.sid = null
    }

    function O(a) {
        this.id = "";
        this.animation = a;
        this.inputs = [];
        this.endTime = this.startTime = this.interpolation = this.output = this.input = null;
        this.duration = 0
    }

    function aa(a) {
        var b = a.getAttribute("id");
        if (ga[b] != void 0) return ga[b];
        ga[b] = (new x(b)).parse(a);
        return ga[b]
    }

    function H(a) {
        if (a == "dae") return "http://www.collada.org/2005/11/COLLADASchema";
        return null
    }

    function G(a) {
        for (var a = M(a), b = [], c = 0; c < a.length; c++) b.push(parseFloat(a[c]));
        return b
    }

    function I(a) {
        for (var a = M(a), b = [], c = 0; c < a.length; c++) b.push(parseInt(a[c], 10));
        return b
    }

    function M(a) {
        return a.replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/)
    }

    function S(a, b, c) {
        return a.hasAttribute(b) ? parseInt(a.getAttribute(b), 10) : c
    }

    function ba(a, b) {
        if (a ===
            void 0) {
            for (var c = "0."; c.length < b + 2;) c += "0";
            return c
        }
        b = b || 2;
        c = a.toString().split(".");
        for (c[1] = c.length > 1 ? c[1].substr(0, b) : "0"; c[1].length < b;) c[1] += "0";
        return c.join(".")
    }

    function W(a, b) {
        var c = "";
        c += ba(a.x, b) + ",";
        c += ba(a.y, b) + ",";
        c += ba(a.z, b);
        return c
    }
    var j = null,
        X = null,
        V, da = null,
        ga = {},
        $ = {},
        ua = {},
        ra = {},
        qa = {},
        na = {},
        oa = {},
        pa, Da, za, Aa, Ba = THREE_M.SmoothShading;
    e.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeName == "init_from") this.init_from =
                c.textContent
        }
        return this
    };
    h.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.type = "none";
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
                case "skin":
                    this.skin = (new l).parse(c);
                    this.type = c.nodeName;
                    break;
                case "morph":
                    this.morph = (new i).parse(c), this.type = c.nodeName
            }
        }
        return this
    };
    i.prototype.parse = function(a) {
        var b = {},
            c = [],
            d;
        this.method = a.getAttribute("method");
        this.source = a.getAttribute("source").replace(/^#/, "");
        for (d =
            0; d < a.childNodes.length; d++) {
            var e = a.childNodes[d];
            if (e.nodeType == 1) switch (e.nodeName) {
                case "source":
                    e = (new x).parse(e);
                    b[e.id] = e;
                    break;
                case "targets":
                    c = this.parseInputs(e);
                    break;
                default:
                    console.log(e.nodeName)
            }
        }
        for (d = 0; d < c.length; d++) switch (a = c[d], e = b[a.source], a.semantic) {
            case "MORPH_TARGET":
                this.targets = e.read();
                break;
            case "MORPH_WEIGHT":
                this.weights = e.read()
        }
        return this
    };
    i.prototype.parseInputs = function(a) {
        for (var b = [], c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (d.nodeType == 1) switch (d.nodeName) {
                case "input":
                    b.push((new A).parse(d))
            }
        }
        return b
    };
    l.prototype.parse = function(a) {
        var b = {},
            c, d;
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = [];
        for (var e = 0; e < a.childNodes.length; e++) {
            var f = a.childNodes[e];
            if (f.nodeType == 1) switch (f.nodeName) {
                case "bind_shape_matrix":
                    f = G(f.textContent);
                    this.bindShapeMatrix = new THREE_M.Matrix4;
                    this.bindShapeMatrix.set(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]);
                    break;
                case "source":
                    f = (new x).parse(f);
                    b[f.id] = f;
                    break;
                case "joints":
                    c =
                        f;
                    break;
                case "vertex_weights":
                    d = f;
                    break;
                default:
                    console.log(f.nodeName)
            }
        }
        this.parseJoints(c, b);
        this.parseWeights(d, b);
        return this
    };
    l.prototype.parseJoints = function(a, b) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (d.nodeType == 1) switch (d.nodeName) {
                case "input":
                    var d = (new A).parse(d),
                        e = b[d.source];
                    if (d.semantic == "JOINT") this.joints = e.read();
                    else if (d.semantic == "INV_BIND_MATRIX") this.invBindMatrices = e.read()
            }
        }
    };
    l.prototype.parseWeights = function(a, b) {
        for (var c, d, e = [], f = 0; f < a.childNodes.length; f++) {
            var g =
                a.childNodes[f];
            if (g.nodeType == 1) switch (g.nodeName) {
                case "input":
                    e.push((new A).parse(g));
                    break;
                case "v":
                    c = I(g.textContent);
                    break;
                case "vcount":
                    d = I(g.textContent)
            }
        }
        for (f = g = 0; f < d.length; f++) {
            for (var h = d[f], i = [], j = 0; j < h; j++) {
                for (var k = {}, l = 0; l < e.length; l++) {
                    var m = e[l],
                        n = c[g + m.offset];
                    switch (m.semantic) {
                        case "JOINT":
                            k.joint = n;
                            break;
                        case "WEIGHT":
                            k.weight = b[m.source].data[n]
                    }
                }
                i.push(k);
                g += e.length
            }
            for (j = 0; j < i.length; j++) i[j].index = f;
            this.weights.push(i)
        }
    };
    k.prototype.getChildById = function(a, b) {
        for (var c =
                0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildById(a, b);
            if (d) return d
        }
        return null
    };
    k.prototype.getChildBySid = function(a, b) {
        for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildBySid(a, b);
            if (d) return d
        }
        return null
    };
    k.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.nodes = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "node":
                    this.nodes.push((new o).parse(c))
            }
        }
        return this
    };
    o.prototype.getChannelForTransform =
        function(a) {
            for (var b = 0; b < this.channels.length; b++) {
                var c = this.channels[b],
                    d = c.target.split("/");
                d.shift();
                var e = d.shift(),
                    f = e.indexOf(".") >= 0,
                    g = e.indexOf("(") >= 0,
                    h;
                if (f) d = e.split("."), e = d.shift(), d.shift();
                else if (g) {
                    h = e.split("(");
                    e = h.shift();
                    for (d = 0; d < h.length; d++) h[d] = parseInt(h[d].replace(/\)/, ""))
                }
                if (e == a) return c.info = {
                    sid: e,
                    dotSyntax: f,
                    arrSyntax: g,
                    arrIndices: h
                }, c
            }
            return null
        };
    o.prototype.getChildById = function(a, b) {
        if (this.id == a) return this;
        if (b)
            for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildById(a,
                    b);
                if (d) return d
            }
        return null
    };
    o.prototype.getChildBySid = function(a, b) {
        if (this.sid == a) return this;
        if (b)
            for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildBySid(a, b);
                if (d) return d
            }
        return null
    };
    o.prototype.getTransformBySid = function(a) {
        for (var b = 0; b < this.transforms.length; b++)
            if (this.transforms[b].sid == a) return this.transforms[b];
        return null
    };
    o.prototype.parse = function(a) {
        var b;
        this.id = a.getAttribute("id");
        this.sid = a.getAttribute("sid");
        this.name = a.getAttribute("name");
        this.type = a.getAttribute("type");
        this.type = this.type == "JOINT" ? this.type : "NODE";
        this.nodes = [];
        this.transforms = [];
        this.geometries = [];
        this.controllers = [];
        this.matrix = new THREE_M.Matrix4;
        for (var c = 0; c < a.childNodes.length; c++)
            if (b = a.childNodes[c], b.nodeType == 1) switch (b.nodeName) {
                case "node":
                    this.nodes.push((new o).parse(b));
                    break;
                case "instance_camera":
                    break;
                case "instance_controller":
                    this.controllers.push((new m).parse(b));
                    break;
                case "instance_geometry":
                    this.geometries.push((new n).parse(b));
                    break;
                case "instance_light":
                    break;
                case "instance_node":
                    b =
                        b.getAttribute("url").replace(/^#/, "");
                    (b = j.evaluate(".//dae:library_nodes//dae:node[@id='" + b + "']", j, H, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) && this.nodes.push((new o).parse(b));
                    break;
                case "rotate":
                case "translate":
                case "scale":
                case "matrix":
                case "lookat":
                case "skew":
                    this.transforms.push((new p).parse(b));
                    break;
                case "extra":
                    break;
                default:
                    console.log(b.nodeName)
            }
        a = [];
        c = 1E6;
        b = -1E6;
        for (var d in ua)
            for (var e = ua[d], f = 0; f < e.channel.length; f++) {
                var g = e.channel[f],
                    h = e.sampler[f];
                d = g.target.split("/")[0];
                if (d == this.id) h.create(), g.sampler = h, c = Math.min(c, h.startTime), b = Math.max(b, h.endTime), a.push(g)
            }
        if (a.length) this.startTime = c, this.endTime = b;
        if ((this.channels = a) && this.channels.length) {
            d = 1E7;
            for (a = 0; a < this.channels.length; a++) {
                c = this.channels[a].sampler;
                for (b = 0; b < c.input.length - 1; b++) d = Math.min(d, c.input[b + 1] - c.input[b])
            }
            c = [];
            for (a = this.startTime; a < this.endTime; a += d) {
                b = a;
                for (var e = {}, i = f = void 0, f = 0; f < this.channels.length; f++) i = this.channels[f], e[i.sid] = i;
                g = new THREE_M.Matrix4;
                for (f = 0; f < this.transforms.length; f++)
                    if (h =
                        this.transforms[f], i = e[h.sid], i !== void 0) {
                        for (var k = i.sampler, l, i = 0; i < k.input.length - 1; i++)
                            if (k.input[i + 1] > b) {
                                l = k.output[i];
                                break
                            }
                        g = l !== void 0 ? l instanceof THREE_M.Matrix4 ? g.multiply(g, l) : g.multiply(g, h.matrix) : g.multiply(g, h.matrix)
                    } else g = g.multiply(g, h.matrix);
                b = g;
                c.push({
                    time: a,
                    pos: [b.n14, b.n24, b.n34],
                    rotq: [0, 0, 0, 1],
                    scl: [1, 1, 1]
                })
            }
            this.keys = c
        }
        this.updateMatrix();
        return this
    };
    o.prototype.updateMatrix = function() {
        this.matrix.identity();
        for (var a = 0; a < this.transforms.length; a++) this.matrix.multiply(this.matrix,
            this.transforms[a].matrix)
    };
    p.prototype.parse = function(a) {
        this.sid = a.getAttribute("sid");
        this.type = a.nodeName;
        this.data = G(a.textContent);
        this.updateMatrix();
        return this
    };
    p.prototype.updateMatrix = function() {
        var a = 0;
        this.matrix.identity();
        switch (this.type) {
            case "matrix":
                this.matrix.set(this.data[0], this.data[1], this.data[2], this.data[3], this.data[4], this.data[5], this.data[6], this.data[7], this.data[8], this.data[9], this.data[10], this.data[11], this.data[12], this.data[13], this.data[14], this.data[15]);
                break;
            case "translate":
                this.matrix.setTranslation(this.data[0], this.data[1], this.data[2]);
                break;
            case "rotate":
                a = this.data[3] * (Math.PI / 180);
                this.matrix.setRotationAxis(new THREE_M.Vector3(this.data[0], this.data[1], this.data[2]), a);
                break;
            case "scale":
                this.matrix.setScale(this.data[0], this.data[1], this.data[2])
        }
        return this.matrix
    };
    m.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        this.skeleton = [];
        this.instance_material = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "skeleton":
                    this.skeleton.push(c.textContent.replace(/^#/, ""));
                    break;
                case "bind_material":
                    if (c = j.evaluate(".//dae:instance_material", c, H, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null))
                        for (var d = c.iterateNext(); d;) this.instance_material.push((new r).parse(d)), d = c.iterateNext()
            }
        }
        return this
    };
    r.prototype.parse = function(a) {
        this.symbol = a.getAttribute("symbol");
        this.target = a.getAttribute("target").replace(/^#/, "");
        return this
    };
    n.prototype.parse = function(a) {
        this.url =
            a.getAttribute("url").replace(/^#/, "");
        this.instance_material = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1 && c.nodeName == "bind_material") {
                if (a = j.evaluate(".//dae:instance_material", c, H, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null))
                    for (b = a.iterateNext(); b;) this.instance_material.push((new r).parse(b)), b = a.iterateNext();
                break
            }
        }
        return this
    };
    q.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
                case "mesh":
                    this.mesh =
                        (new t(this)).parse(c)
            }
        }
        return this
    };
    t.prototype.parse = function(a) {
        function b(a, c) {
            var d = W(a.position);
            e[d] === void 0 && (e[d] = {
                v: a,
                index: c
            });
            return e[d]
        }
        this.primitives = [];
        var c;
        for (c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            switch (d.nodeName) {
                case "source":
                    aa(d);
                    break;
                case "vertices":
                    this.vertices = (new F).parse(d);
                    break;
                case "triangles":
                    this.primitives.push((new u).parse(d));
                    break;
                case "polygons":
                    console.warn("polygon holes not yet supported!");
                case "polylist":
                    this.primitives.push((new w).parse(d))
            }
        }
        var e = {};
        this.geometry3js = new THREE_M.Geometry;
        d = ga[this.vertices.input.POSITION.source].data;
        for (a = c = 0; c < d.length; c += 3, a++) {
            var f = new THREE_M.Vertex(new THREE_M.Vector3(d[c], d[c + 1], d[c + 2]));
            b(f, a);
            this.geometry3js.vertices.push(f)
        }
        for (c = 0; c < this.primitives.length; c++) a = this.primitives[c], a.setVertices(this.vertices), this.handlePrimitive(a, this.geometry3js, e);
        this.geometry3js.computeCentroids();
        this.geometry3js.computeFaceNormals();
        this.geometry3js.computeVertexNormals();
        this.geometry3js.computeBoundingBox();
        return this
    };
    t.prototype.handlePrimitive = function(a, b, c) {
        var d = 0,
            e, f, g = a.p,
            h = a.inputs,
            i, j, k, l, m = 0,
            n = 3,
            o = [];
        for (e = 0; e < h.length; e++) switch (i = h[e], i.semantic) {
            case "TEXCOORD":
                o.push(i.set)
        }
        for (; d < g.length;) {
            var p = [],
                q = [],
                r = {},
                t = [];
            a.vcount && (n = a.vcount[m++]);
            for (e = 0; e < n; e++)
                for (f = 0; f < h.length; f++) switch (i = h[f], l = ga[i.source], j = g[d + e * h.length + i.offset], k = l.accessor.params.length, k *= j, i.semantic) {
                    case "VERTEX":
                        i = W(b.vertices[j].position);
                        p.push(c[i].index);
                        break;
                    case "NORMAL":
                        q.push(new THREE_M.Vector3(l.data[k],
                            l.data[k + 1], l.data[k + 2]));
                        break;
                    case "TEXCOORD":
                        r[i.set] === void 0 && (r[i.set] = []);
                        r[i.set].push(new THREE_M.UV(l.data[k], l.data[k + 1]));
                        break;
                    case "COLOR":
                        t.push((new THREE_M.Color).setRGB(l.data[k], l.data[k + 1], l.data[k + 2]))
                }
            var s;
            n == 3 ? s = new THREE_M.Face3(p[0], p[1], p[2], [q[0], q[1], q[2]], t.length ? t : new THREE_M.Color) : n == 4 && (s = new THREE_M.Face4(p[0], p[1], p[2], p[3], [q[0], q[1], q[2], q[3]], t.length ? t : new THREE_M.Color));
            s.daeMaterial = a.material;
            b.faces.push(s);
            for (f = 0; f < o.length; f++) e = r[o[f]], b.faceVertexUvs[f].push([e[0],
                e[1], e[2]
            ]);
            d += h.length * n
        }
    };
    w.prototype = new u;
    w.prototype.constructor = w;
    u.prototype.setVertices = function(a) {
        for (var b = 0; b < this.inputs.length; b++)
            if (this.inputs[b].source == a.id) this.inputs[b].source = a.input.POSITION.source
    };
    u.prototype.parse = function(a) {
        this.inputs = [];
        this.material = a.getAttribute("material");
        this.count = S(a, "count", 0);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
                case "input":
                    this.inputs.push((new A).parse(a.childNodes[b]));
                    break;
                case "vcount":
                    this.vcount =
                        I(c.textContent);
                    break;
                case "p":
                    this.p = I(c.textContent)
            }
        }
        return this
    };
    B.prototype.parse = function(a) {
        this.params = [];
        this.source = a.getAttribute("source");
        this.count = S(a, "count", 0);
        this.stride = S(a, "stride", 0);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeName == "param") {
                var d = {};
                d.name = c.getAttribute("name");
                d.type = c.getAttribute("type");
                this.params.push(d)
            }
        }
        return this
    };
    F.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++)
            if (a.childNodes[b].nodeName ==
                "input") {
                var c = (new A).parse(a.childNodes[b]);
                this.input[c.semantic] = c
            }
        return this
    };
    A.prototype.parse = function(a) {
        this.semantic = a.getAttribute("semantic");
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.set = S(a, "set", -1);
        this.offset = S(a, "offset", 0);
        if (this.semantic == "TEXCOORD" && this.set < 0) this.set = 0;
        return this
    };
    x.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
                case "bool_array":
                    for (var d = M(c.textContent),
                            e = [], f = 0; f < d.length; f++) e.push(d[f] == "true" || d[f] == "1" ? !0 : !1);
                    this.data = e;
                    this.type = c.nodeName;
                    break;
                case "float_array":
                    this.data = G(c.textContent);
                    this.type = c.nodeName;
                    break;
                case "int_array":
                    this.data = I(c.textContent);
                    this.type = c.nodeName;
                    break;
                case "IDREF_array":
                case "Name_array":
                    this.data = M(c.textContent);
                    this.type = c.nodeName;
                    break;
                case "technique_common":
                    for (d = 0; d < c.childNodes.length; d++)
                        if (c.childNodes[d].nodeName == "accessor") {
                            this.accessor = (new B).parse(c.childNodes[d]);
                            break
                        }
            }
        }
        return this
    };
    x.prototype.read = function() {
        var a = [],
            b = this.accessor.params[0];
        switch (b.type) {
            case "IDREF":
            case "Name":
            case "name":
            case "float":
                return this.data;
            case "float4x4":
                for (b = 0; b < this.data.length; b += 16) {
                    var c = this.data.slice(b, b + 16),
                        d = new THREE_M.Matrix4;
                    d.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]);
                    a.push(d)
                }
                break;
            default:
                console.log("ColladaLoader: Source: Read dont know how to read " + b.type + ".")
        }
        return a
    };
    y.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        for (var b = 0; b < a.childNodes.length; b++)
            if (a.childNodes[b].nodeName == "instance_effect") {
                this.instance_effect = (new U).parse(a.childNodes[b]);
                break
            }
        return this
    };
    v.prototype.isColor = function() {
        return this.texture == null
    };
    v.prototype.isTexture = function() {
        return this.texture != null
    };
    v.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "color":
                    c = G(c.textContent);
                    this.color = new THREE_M.Color(0);
                    this.color.setRGB(c[0],
                        c[1], c[2]);
                    this.color.a = c[3];
                    break;
                case "texture":
                    this.texture = c.getAttribute("texture"), this.texcoord = c.getAttribute("texcoord")
            }
        }
        return this
    };
    J.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "ambient":
                case "emission":
                case "diffuse":
                case "specular":
                case "transparent":
                    this[c.nodeName] = (new v).parse(c);
                    break;
                case "shininess":
                case "reflectivity":
                case "transparency":
                    var d;
                    d = j.evaluate(".//dae:float", c, H, XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                        null);
                    for (var e = d.iterateNext(), f = []; e;) f.push(e), e = d.iterateNext();
                    d = f;
                    d.length > 0 && (this[c.nodeName] = parseFloat(d[0].textContent))
            }
        }
        this.create();
        return this
    };
    J.prototype.create = function() {
        var a = {},
            b = this.transparency !== void 0 && this.transparency < 1,
            c;
        for (c in this) switch (c) {
            case "ambient":
            case "emission":
            case "diffuse":
            case "specular":
                var d = this[c];
                if (d instanceof v)
                    if (d.isTexture()) {
                        if (this.effect.sampler && this.effect.surface && this.effect.sampler.source == this.effect.surface.sid && (d = $[this.effect.surface.init_from])) a.map =
                            THREE_M.ImageUtils.loadTexture(Da + d.init_from), a.map.wrapS = THREE_M.RepeatWrapping, a.map.wrapT = THREE_M.RepeatWrapping, a.map.repeat.x = 1, a.map.repeat.y = -1
                    } else c == "diffuse" ? a.color = d.color.getHex() : b || (a[c] = d.color.getHex());
                break;
            case "shininess":
            case "reflectivity":
                a[c] = this[c];
                break;
            case "transparency":
                if (b) a.transparent = !0, a.opacity = this[c], b = !0
        }
        a.shading = Ba;
        return this.material = new THREE_M.MeshLambertMaterial(a)
    };
    s.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "init_from":
                    this.init_from = c.textContent;
                    break;
                case "format":
                    this.format = c.textContent;
                    break;
                default:
                    console.log("unhandled Surface prop: " + c.nodeName)
            }
        }
        return this
    };
    E.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "source":
                    this.source = c.textContent;
                    break;
                case "minfilter":
                    this.minfilter = c.textContent;
                    break;
                case "magfilter":
                    this.magfilter = c.textContent;
                    break;
                case "mipfilter":
                    this.mipfilter =
                        c.textContent;
                    break;
                case "wrap_s":
                    this.wrap_s = c.textContent;
                    break;
                case "wrap_t":
                    this.wrap_t = c.textContent;
                    break;
                default:
                    console.log("unhandled Sampler2D prop: " + c.nodeName)
            }
        }
        return this
    };
    R.prototype.create = function() {
        if (this.shader == null) return null
    };
    R.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.shader = null;
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "profile_COMMON":
                    this.parseTechnique(this.parseProfileCOMMON(c))
            }
        }
        return this
    };
    R.prototype.parseNewparam = function(a) {
        for (var b = a.getAttribute("sid"), c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (d.nodeType == 1) switch (d.nodeName) {
                case "surface":
                    this.surface = (new s(this)).parse(d);
                    this.surface.sid = b;
                    break;
                case "sampler2D":
                    this.sampler = (new E(this)).parse(d);
                    this.sampler.sid = b;
                    break;
                case "extra":
                    break;
                default:
                    console.log(d.nodeName)
            }
        }
    };
    R.prototype.parseProfileCOMMON = function(a) {
        for (var b, c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (d.nodeType == 1) switch (d.nodeName) {
                case "profile_COMMON":
                    this.parseProfileCOMMON(d);
                    break;
                case "technique":
                    b = d;
                    break;
                case "newparam":
                    this.parseNewparam(d);
                    break;
                case "extra":
                    break;
                default:
                    console.log(d.nodeName)
            }
        }
        return b
    };
    R.prototype.parseTechnique = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "lambert":
                case "blinn":
                case "phong":
                    this.shader = (new J(c.nodeName, this)).parse(c)
            }
        }
    };
    U.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        return this
    };
    K.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.source = {};
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "source":
                    c = (new x).parse(c);
                    this.source[c.id] = c;
                    break;
                case "sampler":
                    this.sampler.push((new O(this)).parse(c));
                    break;
                case "channel":
                    this.channel.push((new P(this)).parse(c))
            }
        }
        return this
    };
    P.prototype.parse = function(a) {
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.target = a.getAttribute("target");
        var b = this.target.split("/");
        b.shift();
        var a =
            b.shift(),
            c = a.indexOf(".") >= 0,
            d = a.indexOf("(") >= 0,
            e, f;
        if (c) b = a.split("."), a = b.shift(), f = b.shift();
        else if (d) {
            e = a.split("(");
            a = e.shift();
            for (b = 0; b < e.length; b++) e[b] = parseInt(e[b].replace(/\)/, ""))
        }
        this.sid = a;
        this.dotSyntax = c;
        this.arrSyntax = d;
        this.arrIndices = e;
        this.member = f;
        return this
    };
    O.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.inputs = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (c.nodeType == 1) switch (c.nodeName) {
                case "input":
                    this.inputs.push((new A).parse(c))
            }
        }
        return this
    };
    O.prototype.create = function() {
        for (var a = 0; a < this.inputs.length; a++) {
            var b = this.inputs[a],
                c = this.animation.source[b.source];
            switch (b.semantic) {
                case "INPUT":
                    this.input = c.read();
                    break;
                case "OUTPUT":
                    this.output = c.read();
                    break;
                case "INTERPOLATION":
                    this.interpolation = c.read();
                    break;
                case "IN_TANGENT":
                    break;
                case "OUT_TANGENT":
                    break;
                default:
                    console.log(b.semantic)
            }
        }
        this.duration = this.endTime = this.startTime = 0;
        if (this.input.length) {
            this.startTime = 1E8;
            this.endTime = -1E8;
            for (a = 0; a < this.input.length; a++) this.startTime =
                Math.min(this.startTime, this.input[a]), this.endTime = Math.max(this.endTime, this.input[a]);
            this.duration = this.endTime - this.startTime
        }
    };
    return {
        load: function(b, c) {
            if (document.implementation && document.implementation.createDocument) {
                document.implementation.createDocument("http://www.collada.org/2005/11/COLLADASchema", "COLLADA", null);
                b += "?rnd=" + Math.random();
                var d = new XMLHttpRequest;
                d.overrideMimeType && d.overrideMimeType("text/xml");
                d.onreadystatechange = function() {
                    if (d.readyState == 4 && (d.status == 0 || d.status ==
                            200)) da = c, a(d.responseXML, void 0, b)
                };
                d.open("GET", b, !0);
                d.send(null)
            } else alert("Don't know how to parse XML!")
        },
        parse: a,
        setPreferredShading: function(a) {
            Ba = a
        },
        applySkin: g,
        geometries: qa
    }
};
THREE_M.JSONLoader = function(a) {
    THREE_M.Loader.call(this, a)
};
THREE_M.JSONLoader.prototype = new THREE_M.Loader;
THREE_M.JSONLoader.prototype.constructor = THREE_M.JSONLoader;
THREE_M.JSONLoader.prototype.supr = THREE_M.Loader.prototype;
THREE_M.JSONLoader.prototype.load = function(a, c, b) {
    if (a instanceof Object) console.warn("DEPRECATED: JSONLoader( parameters ) is now JSONLoader( url, callback, texturePath )."), b = a, a = b.model, c = b.callback, b = b.texture_path;
    b = b ? b : this.extractUrlbase(a);
    this.onLoadStart();
    this.loadAjaxJSON(this, a, c, b)
};
THREE_M.JSONLoader.prototype.loadAjaxJSON = function(a, c, b, d, g) {
    var f = new XMLHttpRequest,
        e = 0;
    f.onreadystatechange = function() {
        if (f.readyState == 4)
            if (f.status == 200 || f.status == 0) try {
                var h = JSON.parse(f.responseText);
                a.createModel(h, b, d);
                a.onLoadComplete()
            } catch (i) {
                console.error(i), console.warn("DEPRECATED: [" + c + "] seems to be using old model format")
            } else console.error("Couldn't load [" + c + "] [" + f.status + "]");
            else f.readyState == 3 ? g && (e == 0 && (e = f.getResponseHeader("Content-Length")), g({
                    total: e,
                    loaded: f.responseText.length
                })) :
                f.readyState == 2 && (e = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", c, !0);
    f.overrideMimeType("text/plain; charset=x-user-defined");
    f.setRequestHeader("Content-Type", "text/plain");
    f.send(null)
};
THREE_M.JSONLoader.prototype.createModel = function(a, c, b) {
    var d = new THREE_M.Geometry,
        g = a.scale !== void 0 ? 1 / a.scale : 1;
    this.initMaterials(d, a.materials, b);
    (function(b) {
        if (a.metadata === void 0 || a.metadata.formatVersion === void 0 || a.metadata.formatVersion !== 3) console.error("Deprecated file format.");
        else {
            var c, g, i, l, k, o, p, m, r, n, q, t, w, u, B = a.faces;
            o = a.vertices;
            var F = a.normals,
                A = a.colors,
                x = 0;
            for (c = 0; c < a.uvs.length; c++) a.uvs[c].length && x++;
            for (c = 0; c < x; c++) d.faceUvs[c] = [], d.faceVertexUvs[c] = [];
            l = 0;
            for (k = o.length; l <
                k;) p = new THREE_M.Vertex, p.position.x = o[l++] * b, p.position.y = o[l++] * b, p.position.z = o[l++] * b, d.vertices.push(p);
            l = 0;
            for (k = B.length; l < k;) {
                b = B[l++];
                o = b & 1;
                i = b & 2;
                c = b & 4;
                g = b & 8;
                m = b & 16;
                p = b & 32;
                n = b & 64;
                b &= 128;
                o ? (q = new THREE_M.Face4, q.a = B[l++], q.b = B[l++], q.c = B[l++], q.d = B[l++], o = 4) : (q = new THREE_M.Face3, q.a = B[l++], q.b = B[l++], q.c = B[l++], o = 3);
                if (i) i = B[l++], q.materialIndex = i;
                i = d.faces.length;
                if (c)
                    for (c = 0; c < x; c++) t = a.uvs[c], r = B[l++], u = t[r * 2], r = t[r * 2 + 1], d.faceUvs[c][i] = new THREE_M.UV(u, r);
                if (g)
                    for (c = 0; c < x; c++) {
                        t = a.uvs[c];
                        w = [];
                        for (g = 0; g < o; g++) r = B[l++], u = t[r * 2], r = t[r * 2 + 1], w[g] = new THREE_M.UV(u, r);
                        d.faceVertexUvs[c][i] = w
                    }
                if (m) m = B[l++] * 3, g = new THREE_M.Vector3, g.x = F[m++], g.y = F[m++], g.z = F[m], q.normal = g;
                if (p)
                    for (c = 0; c < o; c++) m = B[l++] * 3, g = new THREE_M.Vector3, g.x = F[m++], g.y = F[m++], g.z = F[m], q.vertexNormals.push(g);
                if (n) p = B[l++], p = new THREE_M.Color(A[p]), q.color = p;
                if (b)
                    for (c = 0; c < o; c++) p = B[l++], p = new THREE_M.Color(A[p]), q.vertexColors.push(p);
                d.faces.push(q)
            }
        }
    })(g);
    (function() {
        var b, c, g, i;
        if (a.skinWeights) {
            b = 0;
            for (c = a.skinWeights.length; b < c; b +=
                2) g = a.skinWeights[b], i = a.skinWeights[b + 1], d.skinWeights.push(new THREE_M.Vector4(g, i, 0, 0))
        }
        if (a.skinIndices) {
            b = 0;
            for (c = a.skinIndices.length; b < c; b += 2) g = a.skinIndices[b], i = a.skinIndices[b + 1], d.skinIndices.push(new THREE_M.Vector4(g, i, 0, 0))
        }
        d.bones = a.bones;
        d.animation = a.animation
    })();
    (function(b) {
        if (a.morphTargets !== void 0) {
            var c, g, i, l, k, o, p, m, r;
            c = 0;
            for (g = a.morphTargets.length; c < g; c++) {
                d.morphTargets[c] = {};
                d.morphTargets[c].name = a.morphTargets[c].name;
                d.morphTargets[c].vertices = [];
                m = d.morphTargets[c].vertices;
                r = a.morphTargets[c].vertices;
                i = 0;
                for (l = r.length; i < l; i += 3) k = r[i] * b, o = r[i + 1] * b, p = r[i + 2] * b, m.push(new THREE_M.Vertex(new THREE_M.Vector3(k, o, p)))
            }
        }
        if (a.morphColors !== void 0) {
            c = 0;
            for (g = a.morphColors.length; c < g; c++) {
                d.morphColors[c] = {};
                d.morphColors[c].name = a.morphColors[c].name;
                d.morphColors[c].colors = [];
                l = d.morphColors[c].colors;
                k = a.morphColors[c].colors;
                b = 0;
                for (i = k.length; b < i; b += 3) o = new THREE_M.Color(16755200), o.setRGB(k[b], k[b + 1], k[b + 2]), l.push(o)
            }
        }
    })(g);
    d.computeCentroids();
    d.computeFaceNormals();
    this.hasNormals(d) &&
        d.computeTangents();
    c(d)
};
THREE_M.SceneLoader = function() {
    this.onLoadStart = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {};
    this.callbackSync = function() {};
    this.callbackProgress = function() {}
};
THREE_M.SceneLoader.prototype.constructor = THREE_M.SceneLoader;
THREE_M.SceneLoader.prototype.load = function(a, c) {
    var b = this,
        d = new XMLHttpRequest;
    d.onreadystatechange = function() {
        if (d.readyState == 4)
            if (d.status == 200 || d.status == 0) try {
                var g = JSON.parse(d.responseText);
                g.metadata === void 0 || g.metadata.formatVersion === void 0 || g.metadata.formatVersion !== 3 ? console.error("Deprecated file format.") : b.createScene(g, c, a)
            } catch (f) {
                console.error(f), console.warn("DEPRECATED: [" + a + "] seems to be using old model format")
            } else console.error("Couldn't load [" + a + "] [" + d.status + "]")
    };
    d.open("GET", a, !0);
    d.overrideMimeType("text/plain; charset=x-user-defined");
    d.setRequestHeader("Content-Type", "text/plain");
    d.send(null)
};
THREE_M.SceneLoader.prototype.createScene = function(a, c, b) {
    function d(a, b) {
        return b == "relativeToHTML" ? a : l + "/" + a
    }

    function g() {
        var a;
        for (p in R.objects)
            if (!H.objects[p])
                if (t = R.objects[p], t.geometry !== void 0) {
                    if (v = H.geometries[t.geometry]) {
                        a = !1;
                        for (I = 0; I < t.materials.length; I++) E = H.materials[t.materials[I]], a = E instanceof THREE_M.ShaderMaterial;
                        a && v.computeTangents();
                        B = t.position;
                        F = t.rotation;
                        A = t.quaternion;
                        x = t.scale;
                        A = 0;
                        E.length == 0 && (E = new THREE_M.MeshFaceMaterial);
                        E.length > 1 && (E = new THREE_M.MeshFaceMaterial);
                        a = new THREE_M.Mesh(v, E);
                        a.name = p;
                        a.position.set(B[0], B[1], B[2]);
                        A ? (a.quaternion.set(A[0], A[1], A[2], A[3]), a.useQuaternion = !0) : a.rotation.set(F[0], F[1], F[2]);
                        a.scale.set(x[0], x[1], x[2]);
                        a.visible = t.visible;
                        H.scene.add(a);
                        H.objects[p] = a;
                        if (t.meshCollider) {
                            var b = THREE_M.CollisionUtils.MeshColliderWBox(a);
                            H.scene.collisions.colliders.push(b)
                        }
                        if (t.castsShadow) b = new THREE_M.ShadowVolume(v), H.scene.add(b), b.position = a.position, b.rotation = a.rotation, b.scale = a.scale;
                        t.trigger && t.trigger.toLowerCase() != "none" && (b = {
                            type: t.trigger,
                            object: t
                        }, H.triggers[a.name] = b)
                    }
                } else B = t.position, F = t.rotation, A = t.quaternion, x = t.scale, A = 0, a = new THREE_M.Object3D, a.name = p, a.position.set(B[0], B[1], B[2]), A ? (a.quaternion.set(A[0], A[1], A[2], A[3]), a.useQuaternion = !0) : a.rotation.set(F[0], F[1], F[2]), a.scale.set(x[0], x[1], x[2]), a.visible = t.visible !== void 0 ? t.visible : !1, H.scene.add(a), H.objects[p] = a, H.empties[p] = a, t.trigger && t.trigger.toLowerCase() != "none" && (b = {
                    type: t.trigger,
                    object: t
                }, H.triggers[a.name] = b)
    }

    function f(a) {
        return function(b) {
            H.geometries[a] =
                b;
            g();
            K -= 1;
            i.onLoadComplete();
            h()
        }
    }

    function e(a) {
        return function(b) {
            H.geometries[a] = b
        }
    }

    function h() {
        i.callbackProgress({
            totalModels: O,
            totalTextures: aa,
            loadedModels: O - K,
            loadedTextures: aa - P
        }, H);
        i.onLoadProgress();
        K == 0 && P == 0 && c(H)
    }
    var i = this,
        l = THREE_M.Loader.prototype.extractUrlbase(b),
        k, o, p, m, r, n, q, t, w, u, B, F, A, x, y, v, J, s, E, R, U, K, P, O, aa, H;
    R = a;
    b = new THREE_M.BinaryLoader;
    U = new THREE_M.JSONLoader;
    P = K = 0;
    H = {
        scene: new THREE_M.Scene,
        geometries: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        triggers: {},
        empties: {}
    };
    a = !1;
    for (p in R.objects)
        if (t = R.objects[p], t.meshCollider) {
            a = !0;
            break
        }
    if (a) H.scene.collisions = new THREE_M.CollisionSystem;
    if (R.transform) {
        a = R.transform.position;
        w = R.transform.rotation;
        var G = R.transform.scale;
        a && H.scene.position.set(a[0], a[1], a[2]);
        w && H.scene.rotation.set(w[0], w[1], w[2]);
        G && H.scene.scale.set(G[0], G[1], G[2]);
        (a || w || G) && H.scene.updateMatrix()
    }
    a = function() {
        P -= 1;
        h();
        i.onLoadComplete()
    };
    for (r in R.cameras) w = R.cameras[r], w.type == "perspective" ? J = new THREE_M.PerspectiveCamera(w.fov,
        w.aspect, w.near, w.far) : w.type == "ortho" && (J = new THREE_M.OrthographicCamera(w.left, w.right, w.top, w.bottom, w.near, w.far)), B = w.position, w = w.target, J.position.set(B[0], B[1], B[2]), J.target = new THREE_M.Vector3(w[0], w[1], w[2]), H.cameras[r] = J;
    for (m in R.lights) w = R.lights[m], r = w.color !== void 0 ? w.color : 16777215, J = w.intensity !== void 0 ? w.intensity : 1, w.type == "directional" ? (B = w.direction, u = new THREE_M.DirectionalLight(r, J), u.position.set(B[0], B[1], B[2]), u.position.normalize()) : w.type == "point" ? (B = w.position, u = w.distance,
        u = new THREE_M.PointLight(r, J, u), u.position.set(B[0], B[1], B[2])) : w.type == "ambient" && (u = new THREE_M.AmbientLight(r)), H.scene.add(u), H.lights[m] = u;
    for (n in R.fogs) m = R.fogs[n], m.type == "linear" ? s = new THREE_M.Fog(0, m.near, m.far) : m.type == "exp2" && (s = new THREE_M.FogExp2(0, m.density)), w = m.color, s.color.setRGB(w[0], w[1], w[2]), H.fogs[n] = s;
    if (H.cameras && R.defaults.camera) H.currentCamera = H.cameras[R.defaults.camera];
    if (H.fogs && R.defaults.fog) H.scene.fog = H.fogs[R.defaults.fog];
    w = R.defaults.bgcolor;
    H.bgColor = new THREE_M.Color;
    H.bgColor.setRGB(w[0], w[1], w[2]);
    H.bgColorAlpha = R.defaults.bgalpha;
    for (k in R.geometries)
        if (n = R.geometries[k], n.type == "bin_mesh" || n.type == "ascii_mesh") K += 1, i.onLoadStart();
    O = K;
    for (k in R.geometries) n = R.geometries[k], n.type == "cube" ? (v = new THREE_M.CubeGeometry(n.width, n.height, n.depth, n.segmentsWidth, n.segmentsHeight, n.segmentsDepth, null, n.flipped, n.sides), H.geometries[k] = v) : n.type == "plane" ? (v = new THREE_M.PlaneGeometry(n.width, n.height, n.segmentsWidth, n.segmentsHeight), H.geometries[k] = v) : n.type == "sphere" ?
        (v = new THREE_M.SphereGeometry(n.radius, n.segmentsWidth, n.segmentsHeight), H.geometries[k] = v) : n.type == "cylinder" ? (v = new THREE_M.CylinderGeometry(n.topRad, n.botRad, n.height, n.radSegs, n.heightSegs), H.geometries[k] = v) : n.type == "torus" ? (v = new THREE_M.TorusGeometry(n.radius, n.tube, n.segmentsR, n.segmentsT), H.geometries[k] = v) : n.type == "icosahedron" ? (v = new THREE_M.IcosahedronGeometry(n.subdivisions), H.geometries[k] = v) : n.type == "bin_mesh" ? b.load(d(n.url, R.urlBaseType), f(k)) : n.type == "ascii_mesh" ? U.load(d(n.url, R.urlBaseType),
            f(k)) : n.type == "embedded_mesh" && (n = R.embeds[n.id]) && U.createModel(n, e(k), "");
    for (q in R.textures)
        if (k = R.textures[q], k.url instanceof Array) {
            P += k.url.length;
            for (n = 0; n < k.url.length; n++) i.onLoadStart()
        } else P += 1, i.onLoadStart();
    aa = P;
    for (q in R.textures) {
        k = R.textures[q];
        if (k.mapping != void 0 && THREE_M[k.mapping] != void 0) k.mapping = new THREE_M[k.mapping];
        if (k.url instanceof Array) {
            n = [];
            for (var I = 0; I < k.url.length; I++) n[I] = d(k.url[I], R.urlBaseType);
            n = THREE_M.ImageUtils.loadTextureCube(n, k.mapping, a)
        } else {
            n = THREE_M.ImageUtils.loadTexture(d(k.url,
                R.urlBaseType), k.mapping, a);
            if (THREE_M[k.minFilter] != void 0) n.minFilter = THREE_M[k.minFilter];
            if (THREE_M[k.magFilter] != void 0) n.magFilter = THREE_M[k.magFilter];
            if (k.repeat) {
                n.repeat.set(k.repeat[0], k.repeat[1]);
                if (k.repeat[0] != 1) n.wrapS = THREE_M.RepeatWrapping;
                if (k.repeat[1] != 1) n.wrapT = THREE_M.RepeatWrapping
            }
            k.offset && n.offset.set(k.offset[0], k.offset[1]);
            if (k.wrap) {
                s = {
                    repeat: THREE_M.RepeatWrapping,
                    mirror: THREE_M.MirroredRepeatWrapping
                };
                if (s[k.wrap[0]] !== void 0) n.wrapS = s[k.wrap[0]];
                if (s[k.wrap[1]] !== void 0) n.wrapT =
                    s[k.wrap[1]]
            }
        }
        H.textures[q] = n
    }
    for (o in R.materials) {
        q = R.materials[o];
        for (y in q.parameters)
            if (y == "envMap" || y == "map" || y == "lightMap") q.parameters[y] = H.textures[q.parameters[y]];
            else if (y == "shading") q.parameters[y] = q.parameters[y] == "flat" ? THREE_M.FlatShading : THREE_M.SmoothShading;
        else if (y == "blending") q.parameters[y] = THREE_M[q.parameters[y]] ? THREE_M[q.parameters[y]] : THREE_M.NormalBlending;
        else if (y == "combine") q.parameters[y] = q.parameters[y] == "MixOperation" ? THREE_M.MixOperation : THREE_M.MultiplyOperation;
        else if (y ==
            "vertexColors")
            if (q.parameters[y] == "face") q.parameters[y] = THREE_M.FaceColors;
            else if (q.parameters[y]) q.parameters[y] = THREE_M.VertexColors;
        if (q.parameters.opacity !== void 0 && q.parameters.opacity < 1) q.parameters.transparent = !0;
        if (q.parameters.normalMap) {
            k = THREE_M.ShaderUtils.lib.normal;
            a = THREE_M.UniformsUtils.clone(k.uniforms);
            n = q.parameters.color;
            s = q.parameters.specular;
            b = q.parameters.ambient;
            U = q.parameters.shininess;
            a.tNormal.texture = H.textures[q.parameters.normalMap];
            if (q.parameters.normalMapFactor) a.uNormalScale.value =
                q.parameters.normalMapFactor;
            if (q.parameters.map) a.tDiffuse.texture = q.parameters.map, a.enableDiffuse.value = !0;
            if (q.parameters.lightMap) a.tAO.texture = q.parameters.lightMap, a.enableAO.value = !0;
            if (q.parameters.specularMap) a.tSpecular.texture = H.textures[q.parameters.specularMap], a.enableSpecular.value = !0;
            a.uDiffuseColor.value.setHex(n);
            a.uSpecularColor.value.setHex(s);
            a.uAmbientColor.value.setHex(b);
            a.uShininess.value = U;
            if (q.parameters.opacity) a.uOpacity.value = q.parameters.opacity;
            q = new THREE_M.ShaderMaterial({
                fragmentShader: k.fragmentShader,
                vertexShader: k.vertexShader,
                uniforms: a,
                lights: !0,
                fog: !0
            })
        } else q = new THREE_M[q.type](q.parameters);
        H.materials[o] = q
    }
    g();
    i.callbackSync(H);
    h()
};
THREE_M.UTF8Loader = function() {};
THREE_M.UTF8Loader.prototype = new THREE_M.UTF8Loader;
THREE_M.UTF8Loader.prototype.constructor = THREE_M.UTF8Loader;
THREE_M.UTF8Loader.prototype.load = function(a, c, b) {
    if (a instanceof Object) console.warn("DEPRECATED: UTF8Loader( parameters ) is now UTF8Loader( url, callback, metaData )."), b = a, a = b.model, c = b.callback, b = {
        scale: b.scale,
        offsetX: b.offsetX,
        offsetY: b.offsetY,
        offsetZ: b.offsetZ
    };
    var d = new XMLHttpRequest,
        g = b.scale !== void 0 ? b.scale : 1,
        f = b.offsetX !== void 0 ? b.offsetX : 0,
        e = b.offsetY !== void 0 ? b.offsetY : 0,
        h = b.offsetZ !== void 0 ? b.offsetZ : 0;
    d.onreadystatechange = function() {
        d.readyState == 4 ? d.status == 200 || d.status == 0 ? THREE_M.UTF8Loader.prototype.createModel(d.responseText,
            c, g, f, e, h) : alert("Couldn't load [" + a + "] [" + d.status + "]") : d.readyState != 3 && d.readyState == 2 && d.getResponseHeader("Content-Length")
    };
    d.open("GET", a, !0);
    d.send(null)
};
THREE_M.UTF8Loader.prototype.decompressMesh = function(a) {
    var c = a.charCodeAt(0);
    c >= 57344 && (c -= 2048);
    c++;
    for (var b = new Float32Array(8 * c), d = 1, g = 0; g < 8; g++) {
        for (var f = 0, e = 0; e < c; ++e) {
            var h = a.charCodeAt(e + d);
            f += h >> 1 ^ -(h & 1);
            b[8 * e + g] = f
        }
        d += c
    }
    c = a.length - d;
    f = new Uint16Array(c);
    for (g = e = 0; g < c; g++) h = a.charCodeAt(g + d), f[g] = e - h, h == 0 && e++;
    return [b, f]
};
THREE_M.UTF8Loader.prototype.createModel = function(a, c, b, d, g, f) {
    var e = function() {
        var c = this;
        c.materials = [];
        THREE_M.Geometry.call(this);
        var e = THREE_M.UTF8Loader.prototype.decompressMesh(a),
            l = [],
            k = [];
        (function(a, e, i) {
            for (var k, l, q, t = a.length; i < t; i += e) k = a[i], l = a[i + 1], q = a[i + 2], k = k / 16383 * b, l = l / 16383 * b, q = q / 16383 * b, k += d, l += g, q += f, c.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(k, l, q)))
        })(e[0], 8, 0);
        (function(a, b, c) {
            for (var d, e, f = a.length; c < f; c += b) d = a[c], e = a[c + 1], d /= 1023, e /= 1023, k.push(d, 1 - e)
        })(e[0], 8, 3);
        (function(a,
            b, c) {
            for (var d, e, f, g = a.length; c < g; c += b) d = a[c], e = a[c + 1], f = a[c + 2], d = (d - 512) / 511, e = (e - 512) / 511, f = (f - 512) / 511, l.push(d, e, f)
        })(e[0], 8, 5);
        (function(a) {
            var b, d, e, f, g, i, w, u, B, F = a.length;
            for (b = 0; b < F; b += 3) {
                d = a[b];
                e = a[b + 1];
                f = a[b + 2];
                g = c;
                u = d;
                B = e;
                i = f;
                w = d;
                var A = e,
                    x = f,
                    y = g.materials[0],
                    v = l[A * 3],
                    J = l[A * 3 + 1],
                    A = l[A * 3 + 2],
                    s = l[x * 3],
                    E = l[x * 3 + 1],
                    x = l[x * 3 + 2];
                w = new THREE_M.Vector3(l[w * 3], l[w * 3 + 1], l[w * 3 + 2]);
                A = new THREE_M.Vector3(v, J, A);
                x = new THREE_M.Vector3(s, E, x);
                g.faces.push(new THREE_M.Face3(u, B, i, [w, A, x], null, y));
                g = k[d * 2];
                d = k[d * 2 +
                    1];
                i = k[e * 2];
                w = k[e * 2 + 1];
                u = k[f * 2];
                B = k[f * 2 + 1];
                f = c.faceVertexUvs[0];
                e = i;
                i = w;
                w = [];
                w.push(new THREE_M.UV(g, d));
                w.push(new THREE_M.UV(e, i));
                w.push(new THREE_M.UV(u, B));
                f.push(w)
            }
        })(e[1]);
        this.computeCentroids();
        this.computeFaceNormals()
    };
    e.prototype = new THREE_M.Geometry;
    e.prototype.constructor = e;
    c(new e)
};
THREE_M.Axes = function() {
    THREE_M.Object3D.call(this);
    var a = new THREE_M.Geometry;
    a.vertices.push(new THREE_M.Vertex);
    a.vertices.push(new THREE_M.Vertex(new THREE_M.Vector3(0, 100, 0)));
    var c = new THREE_M.CylinderGeometry(0, 5, 25, 5, 1),
        b = new THREE_M.Line(a, new THREE_M.LineBasicMaterial({
            color: 16711680
        }));
    b.rotation.z = -Math.PI / 2;
    this.add(b);
    b = new THREE_M.Mesh(c, new THREE_M.MeshBasicMaterial({
        color: 16711680
    }));
    b.position.x = 100;
    b.rotation.z = -Math.PI / 2;
    this.add(b);
    b = new THREE_M.Line(a, new THREE_M.LineBasicMaterial({
        color: 65280
    }));
    this.add(b);
    b = new THREE_M.Mesh(c, new THREE_M.MeshBasicMaterial({
        color: 65280
    }));
    b.position.y = 100;
    this.add(b);
    b = new THREE_M.Line(a, new THREE_M.LineBasicMaterial({
        color: 255
    }));
    b.rotation.x = Math.PI / 2;
    this.add(b);
    b = new THREE_M.Mesh(c, new THREE_M.MeshBasicMaterial({
        color: 255
    }));
    b.position.z = 100;
    b.rotation.x = Math.PI / 2;
    this.add(b)
};
THREE_M.Axes.prototype = new THREE_M.Object3D;
THREE_M.Axes.prototype.constructor = THREE_M.Axes;
THREE_M.MarchingCubes = function(a, c) {
    THREE_M.Object3D.call(this);
    this.material = c;
    this.init = function(a) {
        this.resolution = a;
        this.isolation = 80;
        this.size = a;
        this.size2 = this.size * this.size;
        this.size3 = this.size2 * this.size;
        this.halfsize = this.size / 2;
        this.delta = 2 / this.size;
        this.yd = this.size;
        this.zd = this.size2;
        this.field = new Float32Array(this.size3);
        this.normal_cache = new Float32Array(this.size3 * 3);
        this.vlist = new Float32Array(36);
        this.nlist = new Float32Array(36);
        this.firstDraw = !0;
        this.maxCount = 4096;
        this.count = 0;
        this.hasNormal =
            this.hasPos = !1;
        this.positionArray = new Float32Array(this.maxCount * 3);
        this.normalArray = new Float32Array(this.maxCount * 3)
    };
    this.lerp = function(a, c, g) {
        return a + (c - a) * g
    };
    this.VIntX = function(a, c, g, f, e, h, i, l, k, o) {
        e = (e - k) / (o - k);
        k = this.normal_cache;
        c[f] = h + e * this.delta;
        c[f + 1] = i;
        c[f + 2] = l;
        g[f] = this.lerp(k[a], k[a + 3], e);
        g[f + 1] = this.lerp(k[a + 1], k[a + 4], e);
        g[f + 2] = this.lerp(k[a + 2], k[a + 5], e)
    };
    this.VIntY = function(a, c, g, f, e, h, i, l, k, o) {
        e = (e - k) / (o - k);
        k = this.normal_cache;
        c[f] = h;
        c[f + 1] = i + e * this.delta;
        c[f + 2] = l;
        c = a + this.yd *
            3;
        g[f] = this.lerp(k[a], k[c], e);
        g[f + 1] = this.lerp(k[a + 1], k[c + 1], e);
        g[f + 2] = this.lerp(k[a + 2], k[c + 2], e)
    };
    this.VIntZ = function(a, c, g, f, e, h, i, l, k, o) {
        e = (e - k) / (o - k);
        k = this.normal_cache;
        c[f] = h;
        c[f + 1] = i;
        c[f + 2] = l + e * this.delta;
        c = a + this.zd * 3;
        g[f] = this.lerp(k[a], k[c], e);
        g[f + 1] = this.lerp(k[a + 1], k[c + 1], e);
        g[f + 2] = this.lerp(k[a + 2], k[c + 2], e)
    };
    this.compNorm = function(a) {
        var c = a * 3;
        this.normal_cache[c] === 0 && (this.normal_cache[c] = this.field[a - 1] - this.field[a + 1], this.normal_cache[c + 1] = this.field[a - this.yd] - this.field[a + this.yd],
            this.normal_cache[c + 2] = this.field[a - this.zd] - this.field[a + this.zd])
    };
    this.polygonize = function(a, c, g, f, e, h) {
        var i = f + 1,
            l = f + this.yd,
            k = f + this.zd,
            o = i + this.yd,
            p = i + this.zd,
            m = f + this.yd + this.zd,
            r = i + this.yd + this.zd,
            n = 0,
            q = this.field[f],
            t = this.field[i],
            w = this.field[l],
            u = this.field[o],
            B = this.field[k],
            F = this.field[p],
            A = this.field[m],
            x = this.field[r];
        q < e && (n |= 1);
        t < e && (n |= 2);
        w < e && (n |= 8);
        u < e && (n |= 4);
        B < e && (n |= 16);
        F < e && (n |= 32);
        A < e && (n |= 128);
        x < e && (n |= 64);
        var y = THREE_M.edgeTable[n];
        if (y === 0) return 0;
        var v = this.delta,
            J = a +
            v,
            s = c + v,
            v = g + v;
        y & 1 && (this.compNorm(f), this.compNorm(i), this.VIntX(f * 3, this.vlist, this.nlist, 0, e, a, c, g, q, t));
        y & 2 && (this.compNorm(i), this.compNorm(o), this.VIntY(i * 3, this.vlist, this.nlist, 3, e, J, c, g, t, u));
        y & 4 && (this.compNorm(l), this.compNorm(o), this.VIntX(l * 3, this.vlist, this.nlist, 6, e, a, s, g, w, u));
        y & 8 && (this.compNorm(f), this.compNorm(l), this.VIntY(f * 3, this.vlist, this.nlist, 9, e, a, c, g, q, w));
        y & 16 && (this.compNorm(k), this.compNorm(p), this.VIntX(k * 3, this.vlist, this.nlist, 12, e, a, c, v, B, F));
        y & 32 && (this.compNorm(p),
            this.compNorm(r), this.VIntY(p * 3, this.vlist, this.nlist, 15, e, J, c, v, F, x));
        y & 64 && (this.compNorm(m), this.compNorm(r), this.VIntX(m * 3, this.vlist, this.nlist, 18, e, a, s, v, A, x));
        y & 128 && (this.compNorm(k), this.compNorm(m), this.VIntY(k * 3, this.vlist, this.nlist, 21, e, a, c, v, B, A));
        y & 256 && (this.compNorm(f), this.compNorm(k), this.VIntZ(f * 3, this.vlist, this.nlist, 24, e, a, c, g, q, B));
        y & 512 && (this.compNorm(i), this.compNorm(p), this.VIntZ(i * 3, this.vlist, this.nlist, 27, e, J, c, g, t, F));
        y & 1024 && (this.compNorm(o), this.compNorm(r), this.VIntZ(o *
            3, this.vlist, this.nlist, 30, e, J, s, g, u, x));
        y & 2048 && (this.compNorm(l), this.compNorm(m), this.VIntZ(l * 3, this.vlist, this.nlist, 33, e, a, s, g, w, A));
        n <<= 4;
        for (e = f = 0; THREE_M.triTable[n + e] != -1;) a = n + e, c = a + 1, g = a + 2, this.posnormtriv(this.vlist, this.nlist, 3 * THREE_M.triTable[a], 3 * THREE_M.triTable[c], 3 * THREE_M.triTable[g], h), e += 3, f++;
        return f
    };
    this.posnormtriv = function(a, c, g, f, e, h) {
        var i = this.count * 3;
        this.positionArray[i] = a[g];
        this.positionArray[i + 1] = a[g + 1];
        this.positionArray[i + 2] = a[g + 2];
        this.positionArray[i + 3] = a[f];
        this.positionArray[i +
            4] = a[f + 1];
        this.positionArray[i + 5] = a[f + 2];
        this.positionArray[i + 6] = a[e];
        this.positionArray[i + 7] = a[e + 1];
        this.positionArray[i + 8] = a[e + 2];
        this.normalArray[i] = c[g];
        this.normalArray[i + 1] = c[g + 1];
        this.normalArray[i + 2] = c[g + 2];
        this.normalArray[i + 3] = c[f];
        this.normalArray[i + 4] = c[f + 1];
        this.normalArray[i + 5] = c[f + 2];
        this.normalArray[i + 6] = c[e];
        this.normalArray[i + 7] = c[e + 1];
        this.normalArray[i + 8] = c[e + 2];
        this.hasNormal = this.hasPos = !0;
        this.count += 3;
        this.count >= this.maxCount - 3 && h(this)
    };
    this.begin = function() {
        this.count = 0;
        this.hasNormal = this.hasPos = !1
    };
    this.end = function(a) {
        if (this.count !== 0) {
            for (var c = this.count * 3; c < this.positionArray.length; c++) this.positionArray[c] = 0;
            a(this)
        }
    };
    this.addBall = function(a, c, g, f, e) {
        var h = this.size * Math.sqrt(f / e),
            i = g * this.size,
            l = c * this.size,
            k = a * this.size,
            o = Math.floor(i - h);
        o < 1 && (o = 1);
        i = Math.floor(i + h);
        i > this.size - 1 && (i = this.size - 1);
        var p = Math.floor(l - h);
        p < 1 && (p = 1);
        l = Math.floor(l + h);
        l > this.size - 1 && (l = this.size - 1);
        var m = Math.floor(k - h);
        m < 1 && (m = 1);
        h = Math.floor(k + h);
        h > this.size - 1 && (h = this.size -
            1);
        for (var r, n, q, t, w, u; o < i; o++) {
            k = this.size2 * o;
            n = o / this.size - g;
            w = n * n;
            for (n = p; n < l; n++) {
                q = k + this.size * n;
                r = n / this.size - c;
                u = r * r;
                for (r = m; r < h; r++) t = r / this.size - a, t = f / (1.0E-6 + t * t + u + w) - e, t > 0 && (this.field[q + r] += t)
            }
        }
    };
    this.addPlaneX = function(a, c) {
        var g, f, e, h, i, l = this.size,
            k = this.yd,
            o = this.zd,
            p = this.field,
            m = l * Math.sqrt(a / c);
        m > l && (m = l);
        for (g = 0; g < m; g++)
            if (f = g / l, f *= f, h = a / (1.0E-4 + f) - c, h > 0)
                for (f = 0; f < l; f++) {
                    i = g + f * k;
                    for (e = 0; e < l; e++) p[o * e + i] += h
                }
    };
    this.addPlaneY = function(a, c) {
        var g, f, e, h, i, l, k = this.size,
            o = this.yd,
            p =
            this.zd,
            m = this.field,
            r = k * Math.sqrt(a / c);
        r > k && (r = k);
        for (f = 0; f < r; f++)
            if (g = f / k, g *= g, h = a / (1.0E-4 + g) - c, h > 0) {
                i = f * o;
                for (g = 0; g < k; g++) {
                    l = i + g;
                    for (e = 0; e < k; e++) m[p * e + l] += h
                }
            }
    };
    this.addPlaneZ = function(a, c) {
        var g, f, e, h, i, l, k = this.size,
            o = this.yd,
            p = this.zd,
            m = this.field,
            r = k * Math.sqrt(a / c);
        r > k && (r = k);
        for (e = 0; e < r; e++)
            if (g = e / k, g *= g, h = a / (1.0E-4 + g) - c, h > 0) {
                i = p * e;
                for (f = 0; f < k; f++) {
                    l = i + f * o;
                    for (g = 0; g < k; g++) m[l + g] += h
                }
            }
    };
    this.reset = function() {
        var a;
        for (a = 0; a < this.size3; a++) this.normal_cache[a * 3] = 0, this.field[a] = 0
    };
    this.render =
        function(a) {
            this.begin();
            var c, g, f, e, h, i, l, k, o, p = this.size - 2;
            for (e = 1; e < p; e++) {
                o = this.size2 * e;
                l = (e - this.halfsize) / this.halfsize;
                for (f = 1; f < p; f++) {
                    k = o + this.size * f;
                    i = (f - this.halfsize) / this.halfsize;
                    for (g = 1; g < p; g++) h = (g - this.halfsize) / this.halfsize, c = k + g, this.polygonize(h, i, l, c, this.isolation, a)
                }
            }
            this.end(a)
        };
    this.generateGeometry = function() {
        var a = 0,
            c = new THREE_M.Geometry,
            g = [];
        this.render(function(f) {
            var e, h, i, l, k, o, p, m;
            for (e = 0; e < f.count; e++) p = e * 3, k = p + 1, m = p + 2, h = f.positionArray[p], i = f.positionArray[k], l =
                f.positionArray[m], o = new THREE_M.Vector3(h, i, l), h = f.normalArray[p], i = f.normalArray[k], l = f.normalArray[m], p = new THREE_M.Vector3(h, i, l), p.normalize(), k = new THREE_M.Vertex(o), c.vertices.push(k), g.push(p);
            o = f.count / 3;
            for (e = 0; e < o; e++) p = (a + e) * 3, k = p + 1, m = p + 2, h = g[p], i = g[k], l = g[m], p = new THREE_M.Face3(p, k, m, [h, i, l]), c.faces.push(p);
            a += o;
            f.count = 0
        });
        return c
    };
    this.init(a)
};
THREE_M.MarchingCubes.prototype = new THREE_M.Object3D;
THREE_M.MarchingCubes.prototype.constructor = THREE_M.MarchingCubes;
THREE_M.edgeTable = new Int32Array([0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107,
    1370, 598, 863, 85, 348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958, 170,
    419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0
]);
THREE_M.triTable = new Int32Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1, 3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1, 3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, 9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 9, 0, 2, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1, 8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1, 3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1, 1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1, 4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1, 4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1, 2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1, 9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1, 10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1, 5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1, 5, 4, 8, 5,
    8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1, 0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1, 8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1, 2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, 7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, 9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1, 2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1, 11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1, -1, 9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1, 5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1, 11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1, 11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1, 2, 3, 11, 10, 6,
    5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1, 6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1, 3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1, 6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1, 6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, 1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1, 8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1, 7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1, 3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1, 0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, 9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1, 8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1, 5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1, 0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1, 6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1, 10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1,
    10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1, 8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1, 1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1, 0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, 10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1, 3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1, 6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1, 9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1, 8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1, 3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1,
    6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1, 10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1, 10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1, 7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1, 7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1, 1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1, 11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1,
    8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1, 0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1, 7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1, 7,
    2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1, 2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1, 10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1, 10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1, 0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1, 7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1, 6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1, 6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1, 4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1, 10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1, 8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, 0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1, 1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1, 10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1, 4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1, 10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1, 9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1, 7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1, 3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1, 7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1, 3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1, 6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1, 9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1, 1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1, 4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1, 7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1, 6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1, 0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1, 6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1, 0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1, 11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1, 6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1, 5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1, 9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1, 1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1, 1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1, 10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1, 0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1, 5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1, 10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1, 11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1, 9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1, 7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1, 2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, 8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1, 9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1, 9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1, 1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1, 9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, 5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1, 0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1, 10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1, 2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1, 0, 4, 11, 0, 11, 3, 4, 5, 11,
    2, 11, 1, 5, 1, 11, -1, 0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1, 9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1, 5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1, 3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1, 5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1, 9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1, 1, 10, 11, 1, 11,
    4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1, 3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1, 4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1, 9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1, 11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1, 11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1, 2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1, 9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1, 3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1, 1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1, 4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1, 3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1, 0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1, 9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1, 1, 10,
    2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
]);
if (THREE_M.WebGLRenderer) THREE_M.AnaglyphWebGLRenderer = function(a) {
    THREE_M.WebGLRenderer.call(this, a);
    this.autoUpdateScene = !1;
    var c = this,
        b = this.setSize,
        d = this.render,
        g = new THREE_M.PerspectiveCamera,
        f = new THREE_M.PerspectiveCamera,
        e = new THREE_M.Matrix4,
        h = new THREE_M.Matrix4,
        i, l, k, o;
    g.matrixAutoUpdate = f.matrixAutoUpdate = !1;
    var a = {
            minFilter: THREE_M.LinearFilter,
            magFilter: THREE_M.NearestFilter,
            format: THREE_M.RGBAFormat
        },
        p = new THREE_M.WebGLRenderTarget(512, 512, a),
        m = new THREE_M.WebGLRenderTarget(512, 512, a),
        r = new THREE_M.PerspectiveCamera(53,
            1, 1, 1E4);
    r.position.z = 2;
    var a = new THREE_M.ShaderMaterial({
            uniforms: {
                mapLeft: {
                    type: "t",
                    value: 0,
                    texture: p
                },
                mapRight: {
                    type: "t",
                    value: 1,
                    texture: m
                }
            },
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}"
        }),
        n = new THREE_M.Scene;
    n.add(new THREE_M.Mesh(new THREE_M.PlaneGeometry(2, 2), a));
    n.add(r);
    this.setSize = function(a, d) {
        b.call(c, a, d);
        p.width = a;
        p.height = d;
        m.width = a;
        m.height = d
    };
    this.render = function(a, b) {
        a.updateMatrixWorld();
        if (i !== b.aspect || l !== b.near || k !== b.far || o !== b.fov) {
            i = b.aspect;
            l = b.near;
            k = b.far;
            o = b.fov;
            var w = b.projectionMatrix.clone(),
                u = 125 / 30 * 0.5,
                B = u * l / 125,
                F = l * Math.tan(o * Math.PI / 360),
                A;
            e.n14 = u;
            h.n14 = -u;
            u = -F * i + B;
            A = F * i + B;
            w.n11 = 2 * l / (A - u);
            w.n13 = (A + u) / (A - u);
            g.projectionMatrix.copy(w);
            u = -F * i - B;
            A = F * i - B;
            w.n11 =
                2 * l / (A - u);
            w.n13 = (A + u) / (A - u);
            f.projectionMatrix.copy(w)
        }
        g.matrixWorld.copy(b.matrixWorld).multiplySelf(h);
        g.position.copy(b.position);
        g.near = b.near;
        g.far = b.far;
        d.call(c, a, g, p, !0);
        f.matrixWorld.copy(b.matrixWorld).multiplySelf(e);
        f.position.copy(b.position);
        f.near = b.near;
        f.far = b.far;
        d.call(c, a, f, m, !0);
        n.updateMatrixWorld();
        d.call(c, n, r)
    }
};
if (THREE_M.WebGLRenderer) THREE_M.CrosseyedWebGLRenderer = function(a) {
    THREE_M.WebGLRenderer.call(this, a);
    this.autoClear = !1;
    var c = this,
        b = this.setSize,
        d = this.render,
        g, f, e = new THREE_M.PerspectiveCamera;
    e.target = new THREE_M.Vector3(0, 0, 0);
    var h = new THREE_M.PerspectiveCamera;
    h.target = new THREE_M.Vector3(0, 0, 0);
    c.separation = 10;
    if (a && a.separation !== void 0) c.separation = a.separation;
    this.setSize = function(a, d) {
        b.call(c, a, d);
        g = a / 2;
        f = d
    };
    this.render = function(a, b) {
        this.clear();
        e.fov = b.fov;
        e.aspect = 0.5 * b.aspect;
        e.near = b.near;
        e.far =
            b.far;
        e.updateProjectionMatrix();
        e.position.copy(b.position);
        e.target.copy(b.target);
        e.translateX(c.separation);
        e.lookAt(e.target);
        h.projectionMatrix = e.projectionMatrix;
        h.position.copy(b.position);
        h.target.copy(b.target);
        h.translateX(-c.separation);
        h.lookAt(h.target);
        this.setViewport(0, 0, g, f);
        d.call(c, a, e);
        this.setViewport(g, 0, g, f);
        d.call(c, a, h, !1)
    }
};
