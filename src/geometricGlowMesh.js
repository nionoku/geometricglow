import * as Three from 'three'
import { createAtmosphereMaterial } from './createAtmosphereMaterial'
import { dilateGeometry } from './dilategeometry'

/**
 * @param {Three.Mesh} origin
 * @param {Three.Color} color
 * @returns {Three.Object3D}
 */
export function geometricGlowMesh (origin, color) {
  const glowMesh = new Three.Object3D()

  // @ts-expect-error
  const insideGeometry = dilateGeometry(origin.geometry.clone(), 0.01)
  const insideMaterial = createAtmosphereMaterial(color)
  insideMaterial.uniforms.glowColor.value = color
	insideMaterial.uniforms.coeficient.value = 1.1
	insideMaterial.uniforms.power.value = 1.4
  const insideMesh = new Three.Mesh(insideGeometry, insideMaterial)

  // @ts-expect-error
  const outsideGeometry = dilateGeometry(origin.geometry.clone(), 0.01)
  const outsideMaterial = createAtmosphereMaterial(color)
  outsideMaterial.uniforms.glowColor.value = color
	outsideMaterial.uniforms.coeficient.value = 0.1
  outsideMaterial.uniforms.power.value = 1.2
  outsideMaterial.side = Three.BackSide
  const outsideMesh = new Three.Mesh(insideGeometry, insideMaterial)

  glowMesh.add(insideMesh)
  glowMesh.add(outsideMesh)

  return glowMesh
}
