import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export interface GalleryItem {
  image: string
  title: string
  type: string
  tag?: string
  year?: string
  copy?: string
  link?: string
  ratio?: string
}

interface CurvedWallGalleryProps {
  items: GalleryItem[]
}

const DEFAULT_PROJECT_LINK = "https://www.behance.net/yogeshwaranUIUX01"

type CableSide = "top" | "right" | "bottom" | "left"

interface Point2D {
  x: number
  y: number
}

interface SampledPoint extends Point2D {
  tx: number
  ty: number
  nx: number
  ny: number
  u: number
}

interface PlugInfo {
  x: number
  y: number
  side: CableSide
  deg: number
}

interface CoiledCableData {
  leadInPath: string
  coilBackPath: string
  coilFrontLoops: Array<{
    shadowPath: string
    bodyPath: string
    highlightPath: string
  }>
  leadOutPath: string
  pulsePath: string
  startPlug: PlugInfo
  endPlug: PlugInfo
}

interface CableLayout {
  width: number
  height: number
  cables: CoiledCableData[]
}

// Side orientation angles: angle in degrees pointing AWAY from the card edge
function getExitDeg(side: CableSide): number {
  if (side === "right") return 0
  if (side === "bottom") return 90
  if (side === "left") return 180
  return -90 // top
}

// Edge anchor helper
function getEdgeAnchor(
  rect: DOMRect,
  parentRect: DOMRect,
  side: CableSide,
  offset = 0.5,
): { point: Point2D; deg: number } {
  const left = rect.left - parentRect.left
  const top = rect.top - parentRect.top
  const deg = getExitDeg(side)

  if (side === "left") {
    return { point: { x: left, y: top + rect.height * offset }, deg }
  }
  if (side === "right") {
    return { point: { x: left + rect.width, y: top + rect.height * offset }, deg }
  }
  if (side === "top") {
    return { point: { x: left + rect.width * offset, y: top }, deg }
  }
  return { point: { x: left + rect.width * offset, y: top + rect.height }, deg }
}

// Cubic Bezier interpolation
function bezierPoint(p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D, t: number): Point2D {
  const inv = 1 - t
  return {
    x: inv ** 3 * p0.x + 3 * inv ** 2 * t * p1.x + 3 * inv * t ** 2 * p2.x + t ** 3 * p3.x,
    y: inv ** 3 * p0.y + 3 * inv ** 2 * t * p1.y + 3 * inv * t ** 2 * p2.y + t ** 3 * p3.y,
  }
}

function bezierTangent(p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D, t: number): Point2D {
  const inv = 1 - t
  const tx = 3 * inv ** 2 * (p1.x - p0.x) + 6 * inv * t * (p2.x - p1.x) + 3 * t ** 2 * (p3.x - p2.x)
  const ty = 3 * inv ** 2 * (p1.y - p0.y) + 6 * inv * t * (p2.y - p1.y) + 3 * t ** 2 * (p3.y - p2.y)
  const len = Math.hypot(tx, ty) || 1
  return { x: tx / len, y: ty / len }
}

// Sample points along cubic Bezier
function sampleBezierPoints(p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D, steps = 60): SampledPoint[] {
  const points: SampledPoint[] = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const pt = bezierPoint(p0, p1, p2, p3, t)
    const tan = bezierTangent(p0, p1, p2, p3, t)
    points.push({
      x: pt.x,
      y: pt.y,
      tx: tan.x,
      ty: tan.y,
      nx: -tan.y,
      ny: tan.x,
      u: t,
    })
  }
  return points
}

// Sample points along straight line
function sampleLinePoints(p0: Point2D, p1: Point2D, steps = 40): SampledPoint[] {
  const points: SampledPoint[] = []
  const dx = p1.x - p0.x
  const dy = p1.y - p0.y
  const len = Math.hypot(dx, dy) || 1
  const tx = dx / len
  const ty = dy / len
  const nx = -ty
  const ny = tx

  for (let i = 0; i <= steps; i += 1) {
    const u = i / steps
    points.push({
      x: p0.x + dx * u,
      y: p0.y + dy * u,
      tx,
      ty,
      nx,
      ny,
      u,
    })
  }
  return points
}

// Build 3D helical coils along sampled curve
function buildHelicalCoils(
  centerlinePoints: SampledPoint[],
  turns: number,
  coilRadius = 13,
) {
  const frontLoops: Array<{ shadowPath: string; bodyPath: string; highlightPath: string }> = []
  const backPaths: string[] = []
  const stepsPerHalf = 7

  function sampleCurve(u: number): SampledPoint {
    const clampedU = Math.max(0, Math.min(1, u))
    const index = clampedU * (centerlinePoints.length - 1)
    const low = Math.floor(index)
    const high = Math.min(centerlinePoints.length - 1, Math.ceil(index))
    const frac = index - low
    const p1 = centerlinePoints[low]
    const p2 = centerlinePoints[high]
    return {
      x: p1.x + (p2.x - p1.x) * frac,
      y: p1.y + (p2.y - p1.y) * frac,
      tx: p1.tx + (p2.tx - p1.tx) * frac,
      ty: p1.ty + (p2.ty - p1.ty) * frac,
      nx: p1.nx + (p2.nx - p1.nx) * frac,
      ny: p1.ny + (p2.ny - p1.ny) * frac,
      u: clampedU,
    }
  }

  for (let k = 0; k < turns; k += 1) {
    const endTaper = Math.min(1, (k + 0.6) * 1.6, (turns - k - 0.4) * 1.6)
    const r = coilRadius * (0.42 + 0.58 * endTaper)

    // Back arc
    const backPts: Point2D[] = []
    for (let s = 0; s <= stepsPerHalf; s += 1) {
      const frac = s / stepsPerHalf
      const theta = Math.PI / 2 + frac * Math.PI
      const u = (k + 0.5 + frac * 0.5) / turns
      const c = sampleCurve(u)
      const sin = Math.sin(theta)
      backPts.push({
        x: c.x + sin * r * c.nx,
        y: c.y + sin * r * c.ny,
      })
    }
    const backD = backPts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(" ")
    backPaths.push(backD)

    // Front arc
    const frontPts: Point2D[] = []
    const shadowPts: Point2D[] = []
    const highlightPts: Point2D[] = []
    for (let s = 0; s <= stepsPerHalf; s += 1) {
      const frac = s / stepsPerHalf
      const theta = -Math.PI / 2 + frac * Math.PI
      const u = (k + frac * 0.5) / turns
      const c = sampleCurve(u)
      const sin = Math.sin(theta)

      shadowPts.push({
        x: c.x + sin * r * c.nx + c.tx * 1.5,
        y: c.y + sin * r * c.ny + c.ty * 1.5,
      })

      frontPts.push({
        x: c.x + sin * r * c.nx,
        y: c.y + sin * r * c.ny,
      })

      highlightPts.push({
        x: c.x + sin * r * c.nx - c.tx * 0.9,
        y: c.y + sin * r * c.ny - c.ty * 0.9,
      })
    }

    frontLoops.push({
      shadowPath: shadowPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "),
      bodyPath: frontPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "),
      highlightPath: highlightPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "),
    })
  }

  return { frontLoops, backPaths }
}

// 1. Connection: Card 01 left -> Card 02 top (Triad Left)
function createTriadLeftCable(
  card0: DOMRect,
  card1: DOMRect,
  parentRect: DOMRect,
): CoiledCableData {
  const startAnchor = getEdgeAnchor(card0, parentRect, "left", 0.52)
  const endAnchor = getEdgeAnchor(card1, parentRect, "top", 0.88)

  const pStart = startAnchor.point
  const pEnd = endAnchor.point

  const cableStart: Point2D = { x: pStart.x - 24, y: pStart.y }
  const cableEnd: Point2D = { x: pEnd.x, y: pEnd.y - 24 }

  const xVertical = Math.round(pStart.x - 44)
  const yCoilStart = Math.round(pStart.y + 24)
  const yCoilEnd = Math.max(yCoilStart + 50, Math.round(pEnd.y - 40))

  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${xVertical + 24} ${cableStart.y} Q ${xVertical} ${cableStart.y} ${xVertical} ${yCoilStart}`

  const coilLength = Math.max(60, yCoilEnd - yCoilStart)
  const turns = Math.max(7, Math.min(15, Math.round(coilLength / 10.5)))
  const coilPoints = sampleLinePoints({ x: xVertical, y: yCoilStart }, { x: xVertical, y: yCoilEnd }, 50)
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 13)

  const leadOutP0: Point2D = { x: xVertical, y: yCoilEnd }
  const leadOutP1: Point2D = { x: xVertical, y: yCoilEnd + 28 }
  const leadOutP2: Point2D = { x: cableEnd.x, y: cableEnd.y - 24 }
  const leadOutP3: Point2D = cableEnd
  const leadOutPath = `M ${leadOutP0.x} ${leadOutP0.y} C ${leadOutP1.x} ${leadOutP1.y}, ${leadOutP2.x} ${leadOutP2.y}, ${leadOutP3.x} ${leadOutP3.y}`

  const pulsePath = `${leadInPath} L ${xVertical} ${yCoilEnd} ${leadOutPath.replace(`M ${leadOutP0.x} ${leadOutP0.y}`, "")}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: pStart.x, y: pStart.y, side: "left", deg: 180 },
    endPlug: { x: pEnd.x, y: pEnd.y, side: "top", deg: -90 },
  }
}


// 3. Connection: Card 02 right -> Card 03 left (Triad Bottom U-loop)
function createTriadBottomCable(
  card1: DOMRect,
  card2: DOMRect,
  parentRect: DOMRect,
): CoiledCableData {
  const startAnchor = getEdgeAnchor(card1, parentRect, "right", 0.5)
  const endAnchor = getEdgeAnchor(card2, parentRect, "left", 0.5)

  const pStart = startAnchor.point
  const pEnd = endAnchor.point

  const cableStart: Point2D = { x: pStart.x + 24, y: pStart.y }
  const cableEnd: Point2D = { x: pEnd.x - 24, y: pEnd.y }

  const gap = cableEnd.x - cableStart.x
  const sag = Math.min(85, Math.max(46, gap * 0.16))

  const leadInEnd: Point2D = { x: cableStart.x + 26, y: cableStart.y }
  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${leadInEnd.x} ${leadInEnd.y}`

  const leadOutStart: Point2D = { x: cableEnd.x - 26, y: cableEnd.y }
  const leadOutPath = `M ${leadOutStart.x} ${leadOutStart.y} L ${cableEnd.x} ${cableEnd.y}`

  const cp1: Point2D = { x: leadInEnd.x + gap * 0.28, y: leadInEnd.y + sag }
  const cp2: Point2D = { x: leadOutStart.x - gap * 0.28, y: leadOutStart.y + sag }
  const coilPoints = sampleBezierPoints(leadInEnd, cp1, cp2, leadOutStart, 60)
  const curveLength = Math.hypot(leadOutStart.x - leadInEnd.x, leadOutStart.y - leadInEnd.y) + sag * 0.7
  const turns = Math.max(7, Math.min(18, Math.round(curveLength / 11.5)))
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 13)

  const pulsePath = `${leadInPath} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${leadOutStart.x} ${leadOutStart.y} L ${cableEnd.x} ${cableEnd.y}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: pStart.x, y: pStart.y, side: "right", deg: 0 },
    endPlug: { x: pEnd.x, y: pEnd.y, side: "left", deg: 180 },
  }
}

// 4. Upward connection: Card i (BOTTOM) right edge -> Card i+1 (TOP) left edge
function createBottomToTopCable(
  cardBottom: DOMRect,
  cardTop: DOMRect,
  parentRect: DOMRect,
): CoiledCableData {
  const startAnchor = getEdgeAnchor(cardBottom, parentRect, "right", 0.5)
  const endAnchor = getEdgeAnchor(cardTop, parentRect, "left", 0.5)

  const pStart = startAnchor.point
  const pEnd = endAnchor.point

  const cableStart: Point2D = { x: pStart.x + 24, y: pStart.y }
  const cableEnd: Point2D = { x: pEnd.x - 24, y: pEnd.y }

  const xMid = Math.round((pStart.x + pEnd.x) / 2)
  const yCoilStart = Math.round(pStart.y - 24)
  const yCoilEnd = Math.round(pEnd.y + 24)

  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${xMid - 16} ${cableStart.y} Q ${xMid} ${cableStart.y} ${xMid} ${yCoilStart}`

  const coilStart: Point2D = { x: xMid, y: yCoilStart }
  const coilEnd: Point2D = { x: xMid, y: yCoilEnd }
  const coilLength = Math.max(60, Math.abs(yCoilStart - yCoilEnd))
  const turns = Math.max(7, Math.min(16, Math.round(coilLength / 11)))
  const coilPoints = sampleLinePoints(coilStart, coilEnd, 50)
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 13)

  const leadOutPath = `M ${xMid} ${yCoilEnd} Q ${xMid} ${cableEnd.y} ${xMid + 16} ${cableEnd.y} L ${cableEnd.x} ${cableEnd.y}`
  const pulsePath = `${leadInPath} L ${xMid} ${yCoilEnd} Q ${xMid} ${cableEnd.y} ${xMid + 16} ${cableEnd.y} L ${cableEnd.x} ${cableEnd.y}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: pStart.x, y: pStart.y, side: "right", deg: 0 },
    endPlug: { x: pEnd.x, y: pEnd.y, side: "left", deg: 180 },
  }
}

// 5. Downward connection: Card i (TOP) right edge -> Card i+1 (BOTTOM) left edge
function createTopToBottomCable(
  cardTop: DOMRect,
  cardBottom: DOMRect,
  parentRect: DOMRect,
): CoiledCableData {
  const startAnchor = getEdgeAnchor(cardTop, parentRect, "right", 0.5)
  const endAnchor = getEdgeAnchor(cardBottom, parentRect, "left", 0.5)

  const pStart = startAnchor.point
  const pEnd = endAnchor.point

  const cableStart: Point2D = { x: pStart.x + 24, y: pStart.y }
  const cableEnd: Point2D = { x: pEnd.x - 24, y: pEnd.y }

  const xMid = Math.round((pStart.x + pEnd.x) / 2)
  const yCoilStart = Math.round(pStart.y + 24)
  const yCoilEnd = Math.round(pEnd.y - 24)

  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${xMid - 16} ${cableStart.y} Q ${xMid} ${cableStart.y} ${xMid} ${yCoilStart}`

  const coilStart: Point2D = { x: xMid, y: yCoilStart }
  const coilEnd: Point2D = { x: xMid, y: yCoilEnd }
  const coilLength = Math.max(60, Math.abs(yCoilEnd - yCoilStart))
  const turns = Math.max(7, Math.min(16, Math.round(coilLength / 11)))
  const coilPoints = sampleLinePoints(coilStart, coilEnd, 50)
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 13)

  const leadOutPath = `M ${xMid} ${yCoilEnd} Q ${xMid} ${cableEnd.y} ${xMid + 16} ${cableEnd.y} L ${cableEnd.x} ${cableEnd.y}`
  const pulsePath = `${leadInPath} L ${xMid} ${yCoilEnd} Q ${xMid} ${cableEnd.y} ${xMid + 16} ${cableEnd.y} L ${cableEnd.x} ${cableEnd.y}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: pStart.x, y: pStart.y, side: "right", deg: 0 },
    endPlug: { x: pEnd.x, y: pEnd.y, side: "left", deg: 180 },
  }
}

// 6. Horizontal cable for mobile / tablet swiping rail
function createHorizontalMobileCable(
  cardSource: { left: number; top: number; width: number; height: number },
  cardTarget: { left: number; top: number; width: number; height: number },
): CoiledCableData {
  const pStart: Point2D = {
    x: cardSource.left + cardSource.width,
    y: cardSource.top + cardSource.height * 0.5,
  }
  const pEnd: Point2D = {
    x: cardTarget.left,
    y: cardTarget.top + cardTarget.height * 0.5,
  }

  // Plug socket + body + boot extends 24px from card edge
  const cableStart: Point2D = { x: pStart.x + 24, y: pStart.y }
  const cableEnd: Point2D = { x: pEnd.x - 24, y: pEnd.y }

  const gap = Math.max(16, cableEnd.x - cableStart.x)
  const sag = Math.min(6, Math.max(0, gap * 0.05))

  const leadDist = Math.min(8, Math.max(3, gap * 0.15))
  const leadInEnd: Point2D = { x: cableStart.x + leadDist, y: cableStart.y }
  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${leadInEnd.x} ${leadInEnd.y}`

  const leadOutStart: Point2D = { x: cableEnd.x - leadDist, y: cableEnd.y }
  const leadOutPath = `M ${leadOutStart.x} ${leadOutStart.y} L ${cableEnd.x} ${cableEnd.y}`

  const cp1: Point2D = { x: leadInEnd.x + (leadOutStart.x - leadInEnd.x) * 0.35, y: leadInEnd.y + sag }
  const cp2: Point2D = { x: leadOutStart.x - (leadOutStart.x - leadInEnd.x) * 0.35, y: leadOutStart.y + sag }
  const coilPoints = sampleBezierPoints(leadInEnd, cp1, cp2, leadOutStart, 32)
  const curveLen = Math.hypot(leadOutStart.x - leadInEnd.x, leadOutStart.y - leadInEnd.y) + sag * 0.5
  const turns = Math.max(3, Math.min(5, Math.round(curveLen / 7.2)))
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 8.5)

  const pulsePath = `${leadInPath} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${leadOutStart.x} ${leadOutStart.y} L ${cableEnd.x} ${cableEnd.y}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: pStart.x, y: pStart.y, side: "right", deg: 0 },
    endPlug: { x: pEnd.x, y: pEnd.y, side: "left", deg: 180 },
  }
}

// 7. Lead-in entry cable on Card 0 (left edge)
function createEntryMobileCable(
  card: { left: number; top: number; width: number; height: number },
): CoiledCableData {
  const pEnd: Point2D = {
    x: card.left,
    y: card.top + card.height * 0.5,
  }
  const cableEnd: Point2D = { x: pEnd.x - 24, y: pEnd.y }
  const cableStart: Point2D = { x: Math.max(0, pEnd.x - 68), y: pEnd.y }

  const leadInEnd: Point2D = { x: cableStart.x + 8, y: cableStart.y }
  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${leadInEnd.x} ${leadInEnd.y}`

  const leadOutStart: Point2D = { x: cableEnd.x - 6, y: cableEnd.y }
  const leadOutPath = `M ${leadOutStart.x} ${leadOutStart.y} L ${cableEnd.x} ${cableEnd.y}`

  const coilPoints = sampleLinePoints(leadInEnd, leadOutStart, 24)
  const turns = 3
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 8.5)

  const pulsePath = `M ${cableStart.x} ${cableStart.y} L ${cableEnd.x} ${cableEnd.y}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: cableStart.x, y: cableStart.y, side: "left", deg: 180 },
    endPlug: { x: pEnd.x, y: pEnd.y, side: "left", deg: 180 },
  }
}

// 8. Lead-out exit cable on Card 13 (right edge)
function createExitMobileCable(
  card: { left: number; top: number; width: number; height: number },
): CoiledCableData {
  const pStart: Point2D = {
    x: card.left + card.width,
    y: card.top + card.height * 0.5,
  }
  const cableStart: Point2D = { x: pStart.x + 24, y: pStart.y }
  const cableEnd: Point2D = { x: pStart.x + 68, y: pStart.y }

  const leadInEnd: Point2D = { x: cableStart.x + 6, y: cableStart.y }
  const leadInPath = `M ${cableStart.x} ${cableStart.y} L ${leadInEnd.x} ${leadInEnd.y}`

  const leadOutStart: Point2D = { x: cableEnd.x - 8, y: cableEnd.y }
  const leadOutPath = `M ${leadOutStart.x} ${leadOutStart.y} L ${cableEnd.x} ${cableEnd.y}`

  const coilPoints = sampleLinePoints(leadInEnd, leadOutStart, 24)
  const turns = 3
  const { frontLoops, backPaths } = buildHelicalCoils(coilPoints, turns, 8.5)

  const pulsePath = `M ${cableStart.x} ${cableStart.y} L ${cableEnd.x} ${cableEnd.y}`

  return {
    leadInPath,
    coilBackPath: backPaths.join(" "),
    coilFrontLoops: frontLoops,
    leadOutPath,
    pulsePath,
    startPlug: { x: pStart.x, y: pStart.y, side: "right", deg: 0 },
    endPlug: { x: cableEnd.x, y: cableEnd.y, side: "right", deg: 0 },
  }
}

// Layered SVG cable component with intense neon green port glow
function MeasuredCableSVG({
  layout,
  id,
  layer = "both",
  className = "",
}: {
  layout: CableLayout
  id: string
  layer?: "paths" | "plugs" | "both"
  className?: string
}) {
  if (!layout.cables.length) return null

  const plugsMap = new Map<string, PlugInfo>()
  layout.cables.forEach((c) => {
    const k1 = `${Math.round(c.startPlug.x)}_${Math.round(c.startPlug.y)}_${c.startPlug.deg}`
    if (!plugsMap.has(k1)) plugsMap.set(k1, c.startPlug)
    const k2 = `${Math.round(c.endPlug.x)}_${Math.round(c.endPlug.y)}_${c.endPlug.deg}`
    if (!plugsMap.has(k2)) plugsMap.set(k2, c.endPlug)
  })
  const uniquePlugs = Array.from(plugsMap.values())

  return (
    <svg
      className={`gallery-measured-cables ${layer === "plugs" ? "is-plugs-layer" : "is-paths-layer"} ${className}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      style={className.includes("is-mobile") ? { width: `${layout.width}px`, height: `${layout.height}px` } : undefined}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Rounded 3D Silicone Cable Gradient */}
        <linearGradient id={`${id}-silicone-body`} x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#f7faf8" />
          <stop offset="46%" stopColor="#d5dcd7" />
          <stop offset="74%" stopColor="#9da59f" />
          <stop offset="100%" stopColor="#6b726d" />
        </linearGradient>

        {/* Plug Housing Brushed Gradient */}
        <linearGradient id={`${id}-plug-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#e9eee9" />
          <stop offset="70%" stopColor="#cad2cc" />
          <stop offset="100%" stopColor="#9da59f" />
        </linearGradient>

        {/* Ambient Cable Shadow Filter */}
        <filter id={`${id}-cable-shadow`} x="-30%" y="-40%" width="160%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#42f56b" floodOpacity="0.22" />
        </filter>

        {/* Intense Green Port Aura Glow matching Image 1 */}
        <filter id={`${id}-intense-port-glow`} x="-150%" y="-150%" width="400%" height="400%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#42f56b" floodOpacity="1" />
          <feDropShadow dx="0" dy="0" stdDeviation="11" floodColor="#42f56b" floodOpacity="0.75" />
          <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#42f56b" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* CABLE PATHS (Rendered behind cards) */}
      {(layer === "paths" || layer === "both") && (
        <g className="gallery-cables-group" filter={`url(#${id}-cable-shadow)`}>
          {layout.cables.map((cable, idx) => (
            <g key={`cable-path-${idx}`} className="gallery-single-cable">
              {/* Back arcs of the coil (dark interior shadow) */}
              <path
                d={cable.coilBackPath}
                className="gallery-coil-back"
                stroke="#525954"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Neon green data pulse traveling through cable core */}
              <path
                d={cable.pulsePath}
                className="gallery-cable-pulse"
                stroke="#42f56b"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                filter={`url(#${id}-intense-port-glow)`}
                pathLength="1"
              />

              {/* Lead-in smooth segment */}
              <g className="gallery-lead-segment">
                <path d={cable.leadInPath} stroke="rgba(0,0,0,0.55)" strokeWidth="8.8" fill="none" strokeLinecap="round" />
                <path d={cable.leadInPath} stroke={`url(#${id}-silicone-body)`} strokeWidth="7.8" fill="none" strokeLinecap="round" />
                <path d={cable.leadInPath} stroke="rgba(255,255,255,0.92)" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              </g>

              {/* Front helical loops of the coil (3D rounded silicone turns) */}
              <g className="gallery-coil-front-loops">
                {cable.coilFrontLoops.map((loop, loopIdx) => (
                  <g key={`front-turn-${loopIdx}`}>
                    <path d={loop.shadowPath} stroke="rgba(0,0,0,0.5)" strokeWidth="9" fill="none" strokeLinecap="round" />
                    <path d={loop.bodyPath} stroke={`url(#${id}-silicone-body)`} strokeWidth="7.8" fill="none" strokeLinecap="round" />
                    <path d={loop.highlightPath} stroke="rgba(255,255,255,0.95)" strokeWidth="1.9" fill="none" strokeLinecap="round" />
                  </g>
                ))}
              </g>

              {/* Lead-out smooth segment */}
              <g className="gallery-lead-segment">
                <path d={cable.leadOutPath} stroke="rgba(0,0,0,0.55)" strokeWidth="8.8" fill="none" strokeLinecap="round" />
                <path d={cable.leadOutPath} stroke={`url(#${id}-silicone-body)`} strokeWidth="7.8" fill="none" strokeLinecap="round" />
                <path d={cable.leadOutPath} stroke="rgba(255,255,255,0.92)" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              </g>
            </g>
          ))}
        </g>
      )}

      {/* PLUGS & SOCKETS (Rendered flush on card edges with vibrant neon aura) */}
      {(layer === "plugs" || layer === "both") && (
        <g className="gallery-plugs-group">
          {uniquePlugs.map((plug, pIdx) => (
            <g
              key={`plug-${pIdx}-${Math.round(plug.x)}-${Math.round(plug.y)}`}
              transform={`translate(${plug.x}, ${plug.y}) rotate(${plug.deg})`}
              className="gallery-measured-plug"
            >
              {/* Glowing Port Aura Halo & Dashed Ring matching Image 1 */}
              <circle
                cx="0"
                cy="0"
                r="21"
                className="gallery-port-ring"
                filter={`url(#${id}-intense-port-glow)`}
              />

              {/* Socket Housing mounted at card edge */}
              <rect x="-5" y="-11" width="8" height="22" rx="2" className="gallery-socket-housing" />

              {/* Metal Insertion Tip Pin */}
              <rect x="-2" y="-5.5" width="5" height="11" rx="1" className="gallery-plug-pin" />

              {/* Main Rounded Silicone/Aluminum Plug Body */}
              <rect
                x="3"
                y="-10"
                width="20"
                height="20"
                rx="3.5"
                fill={`url(#${id}-plug-body)`}
                className="gallery-plug-body"
              />

              {/* Cable Entry Strain Relief Boot */}
              <rect x="23" y="-4.5" width="4.5" height="9" rx="1.5" className="gallery-plug-boot" />

              {/* Glowing Green Status LED */}
              <circle
                cx="13"
                cy="0"
                r="3.2"
                className="gallery-plug-led"
                filter={`url(#${id}-intense-port-glow)`}
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}

function GalleryCard({
  item,
  index,
  total,
  onOpen,
  className = "",
}: {
  item: GalleryItem
  index: number
  total: number
  onOpen: () => void
  className?: string
}) {
  return (
    <article className={`gallery-project-card ${className}`}>
      <button
        type="button"
        className="gallery-project-media"
        onClick={onOpen}
        aria-label={`Preview ${item.title}`}
      >
        {/* Corner Reticle Marks (+) at all 4 corners */}
        <span className="gallery-corner-bracket top-left" aria-hidden="true" />
        <span className="gallery-corner-bracket top-right" aria-hidden="true" />
        <span className="gallery-corner-bracket bottom-left" aria-hidden="true" />
        <span className="gallery-corner-bracket bottom-right" aria-hidden="true" />

        <img
          src={item.image}
          alt={`${item.title} project preview`}
          loading="eager"
          decoding="async"
        />
        <span className="gallery-project-scan" aria-hidden="true" />
        <span className="gallery-project-tag">
          <i />
          {item.tag || item.type}
        </span>
      </button>

      <div className="gallery-project-caption">
        <h3>
          {item.title} <ArrowUpRight size={16} aria-hidden="true" />
        </h3>
        <span>
          {String(index + 1).padStart(2, "0")} <b>/</b> {String(total).padStart(2, "0")}
        </span>
      </div>
    </article>
  )
}

// Alternating pattern configuration across all 14 projects:
// Bottom (Novara) -> Top (KavyaNutrix) -> Bottom (Fintech) -> Top (Cooling) -> Bottom (Builders) ...
const cardPositionClasses = [
  "is-card-0 is-top",    // 0: KavyaNutrix (01) -> TOP
  "is-card-1 is-bottom", // 1: Novara Group (02) -> BOTTOM
  "is-card-2 is-bottom", // 2: Fintech Command (03) -> BOTTOM
  "is-card-3 is-top",    // 3: Cooling Services (04) -> TOP
  "is-card-4 is-bottom", // 4: Builders & Developers (05) -> BOTTOM
  "is-card-5 is-top",    // 5: Bakery Delight (06) -> TOP
  "is-card-6 is-bottom", // 6: FlowHub Workspace (07) -> BOTTOM
  "is-card-7 is-top",    // 7: UI/UX Design Content (08) -> TOP
  "is-card-8 is-bottom", // 8: Yoga App UI (09) -> BOTTOM
  "is-card-9 is-top",    // 9: Fashion Shopping App (10) -> TOP
  "is-card-10 is-bottom",// 10: Zanzibar Summit Identity (11) -> BOTTOM
  "is-card-11 is-top",   // 11: Akash Portfolio (12) -> TOP
  "is-card-12 is-bottom",// 12: Indhuraj Analytics (13) -> BOTTOM
  "is-card-13 is-top",   // 13: Tamilvanan HR (14) -> TOP
]

export function CurvedWallGallery({ items }: CurvedWallGalleryProps) {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  const [desktopCables, setDesktopCables] = useState<CableLayout>({ width: 1, height: 1, cables: [] })
  const [mobileCables, setMobileCables] = useState<CableLayout>({ width: 1, height: 1, cables: [] })
  const activeItem = activeModalIndex === null ? null : items[activeModalIndex]

  const galleryRef = useRef<HTMLDivElement>(null)
  const desktopTrackRef = useRef<HTMLDivElement>(null)
  const mobileRailRef = useRef<HTMLDivElement>(null)

  // Track active slide index during horizontal rail scrolling
  useEffect(() => {
    const rail = mobileRailRef.current
    if (!rail) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cards = Array.from(rail.querySelectorAll<HTMLElement>(".gallery-project-card"))
          if (cards.length) {
            const railCenter = rail.scrollLeft + rail.clientWidth / 2
            let closestIndex = 0
            let minDistance = Infinity

            cards.forEach((card, idx) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2
              const dist = Math.abs(railCenter - cardCenter)
              if (dist < minDistance) {
                minDistance = dist
                closestIndex = idx
              }
            })

            setActiveSlideIndex((prev) => (prev === closestIndex ? prev : closestIndex))
          }
          ticking = false
        })
        ticking = true
      }
    }

    rail.addEventListener("scroll", onScroll, { passive: true })
    return () => rail.removeEventListener("scroll", onScroll)
  }, [items.length])

  const scrollToSlide = (index: number) => {
    const rail = mobileRailRef.current
    if (!rail) return
    const cards = Array.from(rail.querySelectorAll<HTMLElement>(".gallery-project-card"))
    const target = cards[index]
    if (!target) return
    const targetLeft = target.offsetLeft - (rail.clientWidth - target.offsetWidth) / 2
    rail.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" })
    setActiveSlideIndex(index)
  }

  const scrollMobileRail = (direction: -1 | 1) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, activeSlideIndex + direction))
    scrollToSlide(nextIndex)
  }

  useLayoutEffect(() => {
    const track = desktopTrackRef.current
    const rail = mobileRailRef.current
    if (!track || !rail) return
    let frame = 0

    const measure = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const isDesktop = window.innerWidth > 1024

        // 1. Measure Desktop Layout only when in desktop viewport
        if (isDesktop) {
          const desktopCards = Array.from(track.querySelectorAll<HTMLElement>(".gallery-project-media"))
          const trackRect = track.getBoundingClientRect()

          if (desktopCards.length === items.length && trackRect.width > 0 && trackRect.height > 0) {
            const rects = desktopCards.map((card) => card.getBoundingClientRect())
            const cables: CoiledCableData[] = []

            if (rects[0] && rects[1]) {
              cables.push(createTriadLeftCable(rects[0], rects[1], trackRect))
            }
            if (rects[1] && rects[2]) {
              cables.push(createTriadBottomCable(rects[1], rects[2], trackRect))
            }

            for (let i = 2; i < rects.length - 1; i += 1) {
              if (rects[i] && rects[i + 1]) {
                if (i % 2 === 0) {
                  cables.push(createBottomToTopCable(rects[i], rects[i + 1], trackRect))
                } else {
                  cables.push(createTopToBottomCable(rects[i], rects[i + 1], trackRect))
                }
              }
            }

            setDesktopCables({
              width: track.scrollWidth,
              height: track.offsetHeight,
              cables,
            })
          }
        } else {
          // 2. Measure Mobile Layout only when in mobile/tablet viewport
          const mobileCards = Array.from(rail.querySelectorAll<HTMLElement>(".gallery-project-card"))
          if (mobileCards.length === items.length && rail.offsetWidth > 0) {
            const cables: CoiledCableData[] = []
            const cardBoxes = mobileCards.map((card) => {
              const media = card.querySelector<HTMLElement>(".gallery-project-media")
              return {
                left: card.offsetLeft + (media ? media.offsetLeft : 0),
                top: card.offsetTop + (media ? media.offsetTop : 0),
                width: media ? media.offsetWidth : card.offsetWidth,
                height: media ? media.offsetHeight : card.offsetHeight,
              }
            })

            if (cardBoxes[0]) {
              cables.push(createEntryMobileCable(cardBoxes[0]))
            }

            for (let i = 0; i < cardBoxes.length - 1; i += 1) {
              if (cardBoxes[i] && cardBoxes[i + 1]) {
                cables.push(createHorizontalMobileCable(cardBoxes[i], cardBoxes[i + 1]))
              }
            }

            if (cardBoxes[cardBoxes.length - 1]) {
              cables.push(createExitMobileCable(cardBoxes[cardBoxes.length - 1]))
            }

            setMobileCables({
              width: rail.scrollWidth,
              height: rail.offsetHeight,
              cables,
            })
          }
        }
      })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(track)
    observer.observe(rail)
    track.querySelectorAll(".gallery-project-media").forEach((card) => observer.observe(card))
    rail.querySelectorAll(".gallery-project-card").forEach((card) => observer.observe(card))

    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".cable-gallery img"))
    images.forEach((image) => {
      if (!image.complete) image.addEventListener("load", measure, { once: true })
    })

    window.addEventListener("resize", measure)
    measure()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      images.forEach((image) => image.removeEventListener("load", measure))
      window.removeEventListener("resize", measure)
    }
  }, [items.length])

  // GSAP Horizontal Scroll Pinning across the entire continuous track
  useLayoutEffect(() => {
    const gallery = galleryRef.current
    const track = desktopTrackRef.current
    if (!gallery || !track) return
    const section = gallery.closest<HTMLElement>("section") || gallery

    const media = gsap.matchMedia()
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          id: "design-gallery-horizontal",
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: section,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -10,
        },
      })

      const refresh = () => ScrollTrigger.refresh()
      const refreshFrame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          ScrollTrigger.sort()
          ScrollTrigger.refresh()
        })
      })
      const refreshTimer = window.setTimeout(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      }, 700)

      const observer = new ResizeObserver(refresh)
      observer.observe(track)
      const images = Array.from(track.querySelectorAll("img"))
      images.forEach((image) => {
        if (!image.complete) image.addEventListener("load", refresh, { once: true })
      })
      window.addEventListener("load", refresh, { once: true })

      return () => {
        window.cancelAnimationFrame(refreshFrame)
        window.clearTimeout(refreshTimer)
        observer.disconnect()
        images.forEach((image) => image.removeEventListener("load", refresh))
        window.removeEventListener("load", refresh)
        tween.scrollTrigger?.kill(true)
        tween.kill()
        gsap.set(track, { clearProps: "transform" })
      }
    })

    return () => {
      media.revert()
      ScrollTrigger.getById("design-gallery-horizontal")?.kill(true)
      gsap.set(track, { clearProps: "transform" })
    }
  }, [items.length])

  // Lightbox keyboard controls
  useEffect(() => {
    if (activeModalIndex === null) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModalIndex(null)
      if (event.key === "ArrowRight") setActiveModalIndex((activeModalIndex + 1) % items.length)
      if (event.key === "ArrowLeft") setActiveModalIndex((activeModalIndex - 1 + items.length) % items.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeModalIndex, items.length])

  const moveModal = (direction: -1 | 1) =>
    setActiveModalIndex((current) => {
      const idx = current ?? 0
      return (idx + direction + items.length) % items.length
    })



  return (
    <div ref={galleryRef} className="cable-gallery">
      {/* Background grid & subtle ambient glow */}
      <div className="cable-gallery-grid" aria-hidden="true" />
      <div className="cable-gallery-ambient" aria-hidden="true" />

      {/* Desktop Horizontal Connected Archive */}
      <div ref={desktopTrackRef} className="gallery-desktop-track">
        {/* Layer 1: Cable Paths behind cards */}
        <MeasuredCableSVG layout={desktopCables} id="desktop-gallery" layer="paths" />

        {/* Intro Header aligned at upper-left */}
        <header className="cable-gallery-intro">
          <div className="cable-gallery-kicker">
            <i />Selected archive
          </div>
          <h2>
            Design<br />
            <em>Gallery</em>
          </h2>
          <p>An interconnected visual archive of product explorations, brand identities, and design systems.</p>
          <div className="cable-gallery-actions">
            <button type="button" onClick={() => setActiveModalIndex(0)}>
              Explore All <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <span>{String(items.length).padStart(2, "0")} Works</span>
          </div>
        </header>

        {/* All 14 Cards in strict alternating Bottom-Top-Bottom-Top arrangement */}
        {items.map((item, index) => (
          <GalleryCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
            total={items.length}
            className={cardPositionClasses[index] || "is-bottom"}
            onOpen={() => setActiveModalIndex(index)}
          />
        ))}

        {/* Layer 3: Connector Plugs & Glowing Port Rings on card edges */}
        <MeasuredCableSVG layout={desktopCables} id="desktop-gallery-plugs" layer="plugs" />
      </div>

      {/* Mobile / Tablet Heading */}
      <div className="gallery-mobile-heading">
        <div className="cable-gallery-kicker">
          <i />Selected archive
        </div>
        <h2>
          Design<br />
          <em>Gallery</em>
        </h2>
        <p>An interconnected visual archive of product explorations, brand identities, and design systems.</p>
        <div className="cable-gallery-actions">
          <button type="button" onClick={() => setActiveModalIndex(0)}>
            Explore All <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <span>{String(items.length).padStart(2, "0")} Works</span>
        </div>
      </div>

      {/* Mobile / Tablet Rail (Horizontal swipe carousel with connected coiled cables) */}
      <div ref={mobileRailRef} className="gallery-mobile-rail" role="region" aria-label="Connected design gallery">
        <MeasuredCableSVG layout={mobileCables} id="mobile-gallery" layer="paths" className="is-mobile" />
        {items.map((item, index) => (
          <GalleryCard
            key={`${item.title}-mobile-${index}`}
            item={item}
            index={index}
            total={items.length}
            onOpen={() => setActiveModalIndex(index)}
          />
        ))}
        <MeasuredCableSVG layout={mobileCables} id="mobile-gallery-plugs" layer="plugs" className="is-mobile" />
      </div>

      {/* Mobile / Tablet Carousel Controls: Previous, 14-dot progress indicator track, Next */}
      <div className="gallery-carousel-controls" aria-label="Gallery carousel controls">
        <button
          type="button"
          onClick={() => scrollMobileRail(-1)}
          disabled={activeSlideIndex === 0}
          aria-label="Previous project"
          className="gallery-nav-btn is-prev"
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </button>

        <div className="gallery-progress-track" role="tablist" aria-label="Project slide navigation">
          {items.map((item, idx) => (
            <button
              key={`dot-${item.title}-${idx}`}
              type="button"
              role="tab"
              aria-selected={activeSlideIndex === idx}
              aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              className={`gallery-progress-dot ${activeSlideIndex === idx ? "is-active" : ""}`}
              onClick={() => scrollToSlide(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollMobileRail(1)}
          disabled={activeSlideIndex === items.length - 1}
          aria-label="Next project"
          className="gallery-nav-btn is-next"
        >
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeModalIndex !== null && (
        <div
          className="cable-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} project preview`}
          onClick={() => setActiveModalIndex(null)}
        >
          <div className="cable-lightbox-topbar">
            <span>
              {String(activeModalIndex + 1).padStart(2, "0")} <b>/</b> {String(items.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => setActiveModalIndex(null)}
              aria-label="Close project preview"
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="cable-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={activeItem.image} alt={`${activeItem.title} full project preview`} />
            <div className="cable-lightbox-meta">
              <div>
                <span>
                  {activeItem.type}
                  {activeItem.year ? ` · ${activeItem.year}` : ""}
                </span>
                <h3>{activeItem.title}</h3>
                {activeItem.copy && <p>{activeItem.copy}</p>}
              </div>
              <a href={activeItem.link || DEFAULT_PROJECT_LINK} target="_blank" rel="noreferrer">
                View case study <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
          <button
            className="cable-lightbox-nav is-previous"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              moveModal(-1)
            }}
            aria-label="Previous project"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            className="cable-lightbox-nav is-next"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              moveModal(1)
            }}
            aria-label="Next project"
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
