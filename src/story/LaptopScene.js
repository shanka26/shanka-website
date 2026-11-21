import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Palette (kept in sync with App.css)
const C = {
  canvas: '#1e1e1e',
  surface: '#333333',
  text: '#e0e0e0',
  muted: '#7a7a7a',
  tealDark: '#005252',
  teal: '#006666',
  tealMid: '#007a79',
  tealLight: '#44bdbb',
  tealBright: '#9eeeee',
}

const BASE_W = 3.2
const BASE_D = 2.2
const BASE_H = 0.12
const LID_H = 0.07
const SCREEN_W = 2.96
const SCREEN_H = 1.86

/** Draws the non-project screens (boot logo, code) onto a canvas texture. */
function makeCanvasScreen(kind) {
  const w = 1280
  const h = 800
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const ctx = cv.getContext('2d')
  ctx.fillStyle = C.canvas
  ctx.fillRect(0, 0, w, h)

  if (kind === 'resume') {
    // A stylised CV page
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(330, 40, 620, h - 40)
    ctx.fillStyle = C.teal
    ctx.font = '600 44px Inter, Arial, sans-serif'
    ctx.fillText('Shamarl Leonard', 380, 120)
    ctx.fillStyle = C.surface
    ctx.font = '500 20px Inter, Arial, sans-serif'
    ctx.fillText('FULL-STACK SOFTWARE ENGINEER', 380, 156)
    ctx.fillStyle = C.surface
    ctx.fillRect(380, 180, 520, 4)
    const sections = [220, 400, 560]
    sections.forEach((y, si) => {
      ctx.fillStyle = C.teal
      ctx.fillRect(380, y, 150, 18)
      const lines = si === 0 ? 4 : 3
      for (let l = 0; l < lines; l++) {
        ctx.fillStyle = '#9a9a9a'
        ctx.fillRect(400, y + 40 + l * 30, 380 + ((l * 53 + si * 31) % 120), 12)
      }
    })
  } else if (kind === 'logo') {
    const g = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.6)
    g.addColorStop(0, 'rgba(0,122,121,0.55)')
    g.addColorStop(1, 'rgba(30,30,30,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = C.text
    ctx.font = '500 150px Inter, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('SHANKA', w / 2, h / 2 - 10)
    ctx.fillStyle = C.tealLight
    ctx.font = '500 30px Inter, Arial, sans-serif'
    ctx.fillText('FULL-STACK WEB DEVELOPER', w / 2, h / 2 + 100)
  } else {
    // A stylised editor: line numbers + syntax-coloured bars
    ctx.fillStyle = '#262626'
    ctx.fillRect(0, 0, w, 54)
    ;['#7a7a7a', '#7a7a7a', '#7a7a7a'].forEach((c, i) => {
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.arc(34 + i * 30, 27, 8, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.fillStyle = C.text
    ctx.font = '500 22px Inter, Arial, sans-serif'
    ctx.fillText('App.js', 150, 34)
    const palette = [C.tealLight, C.text, C.muted, C.tealBright, C.tealMid]
    let seed = 7
    const rnd = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < 17; i++) {
      const y = 100 + i * 40
      ctx.fillStyle = '#555'
      ctx.font = '400 20px monospace'
      ctx.fillText(String(i + 1).padStart(2, ' '), 30, y + 6)
      let x = 90 + (i % 4 === 0 ? 0 : 40 * (1 + (i % 3)))
      const parts = 1 + Math.floor(rnd() * 4)
      for (let p = 0; p < parts; p++) {
        const len = 60 + rnd() * 220
        ctx.fillStyle = palette[Math.floor(rnd() * palette.length)]
        ctx.globalAlpha = 0.85
        ctx.fillRect(x, y - 8, len, 14)
        x += len + 18
      }
      ctx.globalAlpha = 1
    }
    ctx.fillStyle = C.tealLight
    ctx.fillRect(90, 100 + 17 * 40 - 14, 4, 26)
  }

  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

/** Soft radial blob used as a contact shadow and as a teal glow. */
function makeRadialTexture(inner, outer) {
  const cv = document.createElement('canvas')
  cv.width = cv.height = 256
  const ctx = cv.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, inner)
  g.addColorStop(1, outer)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export default class LaptopScene {
  constructor(canvas, { projectImages = [] } = {}) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.setClearColor(0x000000, 0)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    this.camera.position.set(0, 0, 10)

    this._buildLights()
    this._buildLaptop()
    this._buildScreens(projectImages)
    this.resize()
  }

  _buildLights() {
    // Soft studio reflections so the metal reads as metal.
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environmentIntensity = 0.55
    pmrem.dispose()
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.35))
    const hemi = new THREE.HemisphereLight(0xe0e0e0, 0x1e1e1e, 0.6)
    this.scene.add(hemi)
    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(5, 6, 6)
    this.scene.add(key)
    const rim = new THREE.PointLight(new THREE.Color(C.tealLight), 40, 30, 2)
    rim.position.set(-5, 3, -3)
    this.scene.add(rim)
    const fill = new THREE.PointLight(new THREE.Color(C.tealMid), 18, 25, 2)
    fill.position.set(4, -4, 4)
    this.scene.add(fill)
  }

  _buildLaptop() {
    const body = new THREE.MeshStandardMaterial({ color: new THREE.Color('#6f6f6f'), metalness: 0.8, roughness: 0.42 })
    const deck = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.surface), metalness: 0.5, roughness: 0.5 })
    const keyMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#161616'), metalness: 0.1, roughness: 0.7 })
    const bezel = new THREE.MeshStandardMaterial({ color: new THREE.Color('#111111'), metalness: 0.2, roughness: 0.5 })

    this.root = new THREE.Group() // position / scale driven by scroll
    this.pose = new THREE.Group() // rotation driven by scroll
    this.root.add(this.pose)
    this.scene.add(this.root)

    // Centre the model on the hinge-to-front midpoint so rotations look balanced.
    this.model = new THREE.Group()
    this.model.position.set(0, -BASE_H / 2, 0)
    this.pose.add(this.model)

    const base = new THREE.Mesh(new RoundedBoxGeometry(BASE_W, BASE_H, BASE_D, 4, 0.05), body)
    base.position.y = BASE_H / 2
    this.model.add(base)

    const deckMesh = new THREE.Mesh(new THREE.PlaneGeometry(BASE_W - 0.16, BASE_D - 0.16), deck)
    deckMesh.rotation.x = -Math.PI / 2
    deckMesh.position.y = BASE_H + 0.001
    this.model.add(deckMesh)

    // Keyboard (instanced keys)
    const cols = 14
    const rows = 5
    const keyW = 0.17
    const keyGap = 0.025
    const keyGeo = new THREE.BoxGeometry(keyW, 0.02, keyW)
    const keys = new THREE.InstancedMesh(keyGeo, keyMat, cols * rows)
    const m = new THREE.Matrix4()
    let k = 0
    const totalW = cols * keyW + (cols - 1) * keyGap
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -totalW / 2 + keyW / 2 + c * (keyW + keyGap)
        const z = -0.82 + r * (keyW + keyGap)
        m.makeTranslation(x, BASE_H + 0.011, z)
        keys.setMatrixAt(k++, m)
      }
    }
    this.model.add(keys)

    const pad = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.55), new THREE.MeshStandardMaterial({ color: new THREE.Color('#2b2b2b'), metalness: 0.4, roughness: 0.35 }))
    pad.rotation.x = -Math.PI / 2
    pad.position.set(0, BASE_H + 0.002, 0.6)
    this.model.add(pad)

    // Lid pivots at the back edge of the base.
    this.lid = new THREE.Group()
    this.lid.position.set(0, BASE_H, -BASE_D / 2)
    this.model.add(this.lid)

    // Satin lid so the big flat face doesn't mirror the studio lights white.
    const lidMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#5a5a5a'), metalness: 0.6, roughness: 0.55, envMapIntensity: 0.45 })
    const lidMesh = new THREE.Mesh(new RoundedBoxGeometry(BASE_W, LID_H, BASE_D, 4, 0.04), lidMat)
    lidMesh.position.set(0, LID_H / 2, BASE_D / 2)
    this.lid.add(lidMesh)

    const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(BASE_W - 0.08, BASE_D - 0.08), bezel)
    bezelMesh.rotation.x = Math.PI / 2
    bezelMesh.position.set(0, -0.001, BASE_D / 2)
    this.lid.add(bezelMesh)

    this.screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })
    this.screen = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_W, SCREEN_H), this.screenMat)
    this.screen.rotation.x = Math.PI / 2
    this.screen.position.set(0, -0.003, BASE_D / 2 + 0.06)
    this.lid.add(this.screen)

    // Teal logo mark on the lid's outer face (visible when closed).
    const markTex = makeRadialTexture('rgba(68,189,187,0.9)', 'rgba(68,189,187,0)')
    const mark = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.7),
      new THREE.MeshBasicMaterial({ map: markTex, transparent: true, depthWrite: false, toneMapped: false })
    )
    mark.rotation.x = -Math.PI / 2
    mark.position.set(0, LID_H + 0.002, BASE_D / 2)
    this.markMat = mark.material
    this.lid.add(mark)

    // Contact shadow (only reads when the laptop lies flat, as in the hero)
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(BASE_W * 1.6, BASE_D * 1.7),
      new THREE.MeshBasicMaterial({ map: makeRadialTexture('rgba(0,0,0,0.75)', 'rgba(0,0,0,0)'), transparent: true, depthWrite: false })
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -0.02
    this.shadowMat = shadow.material
    this.model.add(shadow)

    // Teal halo behind the screen
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(SCREEN_W * 2.2, SCREEN_H * 2.4),
      new THREE.MeshBasicMaterial({
        map: makeRadialTexture('rgba(0,122,121,0.55)', 'rgba(0,122,121,0)'),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      })
    )
    glow.rotation.x = Math.PI / 2
    glow.position.set(0, 0.25, BASE_D / 2)
    this.glowMat = glow.material
    this.lid.add(glow)
  }

  _buildScreens(projectImages) {
    this.screens = { logo: makeCanvasScreen('logo'), code: makeCanvasScreen('code'), resume: makeCanvasScreen('resume') }
    const loader = new THREE.TextureLoader()
    projectImages.forEach((src, i) => {
      const tex = loader.load(src, (t) => this._cover(t))
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 8
      this.screens[`p${i}`] = tex
    })
    this.currentScreen = null
    this.screenFlash = 1
    this.setScreen('logo')
  }

  // Crop an image texture to the screen's aspect (object-fit: cover, anchored top).
  _cover(tex) {
    const img = tex.image
    if (!img) return
    const screenAspect = SCREEN_W / SCREEN_H
    const imgAspect = img.width / img.height
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
    if (imgAspect > screenAspect) {
      tex.repeat.set(screenAspect / imgAspect, 1)
      tex.offset.set((1 - tex.repeat.x) / 2, 0)
    } else {
      tex.repeat.set(1, imgAspect / screenAspect)
      tex.offset.set(0, 1 - tex.repeat.y)
    }
    tex.needsUpdate = true
  }

  setScreen(key) {
    if (key === this.currentScreen || !this.screens[key]) return
    this.currentScreen = key
    this.screenMat.map = this.screens[key]
    this.screenMat.needsUpdate = true
    this.screenFlash = 0
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth
    const h = this.canvas.clientHeight || window.innerHeight
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    const worldH = 2 * this.camera.position.z * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))
    this.worldH = worldH
    this.worldW = worldH * this.camera.aspect
    this.isNarrow = w <= 900 // matches the CSS breakpoint where text stacks
    // Laptop width in world units at scale 1
    this.unit = (this.isNarrow ? Math.min(this.worldW * 0.78, worldH * 0.5) : Math.min(this.worldW * 0.34, worldH * 0.62)) / BASE_W
  }

  /**
   * Apply a pose: x/y in viewport half-extents (-1..1), rotations in radians,
   * lid in radians open, scale relative to the responsive unit.
   */
  apply(s, dt) {
    this.root.position.set((s.x * this.worldW) / 2, (s.y * this.worldH) / 2, 0)
    this.root.scale.setScalar(s.scale * this.unit)
    this.pose.rotation.set(s.rx, s.ry, s.rz)
    this.lid.rotation.x = -s.lid

    const open = THREE.MathUtils.clamp(s.lid / 1.6, 0, 1)
    const flat = THREE.MathUtils.clamp((s.rx - 0.8) / 0.45, 0, 1)
    this.shadowMat.opacity = flat * 0.9
    this.markMat.opacity = 1 - open
    this.screenFlash = Math.min(1, this.screenFlash + dt * 3.5)
    const flicker = this.screenFlash < 1 ? 0.35 + 0.65 * this.screenFlash : 1
    const v = open * flicker
    this.screenMat.color.setRGB(v, v, v)
    this.glowMat.opacity = open * (s.glow ?? 0.7)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.dispose()
    Object.values(this.screens).forEach((t) => t.dispose())
  }
}
