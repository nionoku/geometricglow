import * as Three from 'three'

/**
 * @param {Three.Geometry} geometry
 * @param {Number} length
 * @returns {Three.Geometry}
 */
export function dilateGeometry (geometry, length) {
  const resultGeometry = geometry.clone()
  const vertexNormals = new Array(geometry.vertices.length)

  resultGeometry.faces.forEach(face => {
    try {
      vertexNormals[face.a] = face.vertexNormals[0]
      vertexNormals[face.b] = face.vertexNormals[1]
      vertexNormals[face.c] = face.vertexNormals[2]
    } catch (err) {
      console.error(err)
    }
  })

  resultGeometry.vertices.forEach((vertex, i) => {
    vertex.x += vertexNormals[i].x * length
    vertex.y += vertexNormals[i].y * length
    vertex.z += vertexNormals[i].z * length
  })

  return resultGeometry
}
