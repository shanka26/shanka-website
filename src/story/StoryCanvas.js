import React, { useEffect, useRef } from 'react'
import LaptopScene from './LaptopScene'
import { resolveStage } from './stages'

const KEYS = ['x', 'y', 'rx', 'ry', 'rz', 'lid', 'scale', 'glow']
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (t) => t * t * (3 - 2 * t)

/**
 * A fixed, full-viewport WebGL canvas holding the persistent laptop.
 * Each element with [data-stage] is an anchor: when its centre reaches the
 * viewport centre the laptop sits exactly in that stage's pose, and it eases
 * between neighbouring anchors as you scroll. Elements with [data-progress]
 * get a --p (0..1) and --glow CSS variable for their own scroll effects.
 */
export default function StoryCanvas({ projectImages }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let scene
    try {
      scene = new LaptopScene(canvas, { projectImages })
    } catch (err) {
      // No WebGL: the page still works; CSS shows static screenshots instead.
      document.documentElement.classList.add('no-webgl')
      return undefined
    }

    let anchors = []
    let progressEls = []
    const measure = () => {
      scene.resize()
      const vh = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - vh
      anchors = [...document.querySelectorAll('[data-stage]')]
        .map((el) => {
          const r = el.getBoundingClientRect()
          const top = r.top + window.scrollY
          const at = Math.max(0, Math.min(maxScroll, top + r.height / 2 - vh / 2))
          return { at, stage: resolveStage(el.dataset.stage, scene.isNarrow) }
        })
        .filter((a) => a.stage)
        .sort((a, b) => a.at - b.at)
      progressEls = [...document.querySelectorAll('[data-progress]')].map((el) => {
        const r = el.getBoundingClientRect()
        const top = r.top + window.scrollY
        return { el, start: top, span: Math.max(1, r.height - vh) }
      })
    }

    const poseAt = (s) => {
      if (!anchors.length) return null
      if (s <= anchors[0].at) return { ...anchors[0].stage, screen: anchors[0].stage.screen }
      const last = anchors[anchors.length - 1]
      if (s >= last.at) return { ...last.stage }
      let i = 0
      while (i < anchors.length - 2 && s > anchors[i + 1].at) i++
      const a = anchors[i]
      const b = anchors[i + 1]
      // Hold each pose for a moment around its anchor, then ease to the next.
      const raw = clamp((s - a.at) / Math.max(1, b.at - a.at))
      const t = smooth(clamp((raw - 0.18) / 0.64))
      const out = {}
      KEYS.forEach((k) => {
        const va = a.stage[k] ?? (k === 'glow' ? 0.7 : 0)
        const vb = b.stage[k] ?? (k === 'glow' ? 0.7 : 0)
        out[k] = va + (vb - va) * t
      })
      out.screen = t < 0.5 ? a.stage.screen : b.stage.screen
      return out
    }

    let smoothY = window.scrollY
    let mx = 0
    let my = 0
    let tmx = 0
    let tmy = 0
    const onPointer = (e) => {
      tmx = (e.clientX / window.innerWidth) * 2 - 1
      tmy = (e.clientY / window.innerHeight) * 2 - 1
    }

    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const target = window.scrollY
      smoothY = reduceMotion ? target : smoothY + (target - smoothY) * (1 - Math.pow(0.0009, dt))
      mx += (tmx - mx) * 0.06
      my += (tmy - my) * 0.06

      const pose = poseAt(smoothY)
      if (pose) {
        const open = clamp(pose.lid / 1.6)
        if (!reduceMotion) {
          pose.y += Math.sin(now / 1100) * 0.012 * open
          pose.ry += mx * 0.12 * open
          pose.rx += my * 0.06 * open
        }
        scene.setScreen(pose.screen)
        scene.apply(pose, dt)
        scene.render()
      }

      const vh = window.innerHeight
      progressEls.forEach(({ el, start, span }) => {
        const p = clamp((window.scrollY - start) / span)
        el.style.setProperty('--p', p.toFixed(4))
        el.style.setProperty('--glow', Math.sin(p * Math.PI).toFixed(4))
        el.style.setProperty('--in', clamp((window.scrollY + vh - start) / vh).toFixed(4))
      })
      raf = requestAnimationFrame(tick)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    window.addEventListener('pointermove', onPointer, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointermove', onPointer)
      scene.dispose()
    }
  }, [projectImages])

  return <canvas ref={canvasRef} className="story-canvas" aria-hidden="true" />
}
