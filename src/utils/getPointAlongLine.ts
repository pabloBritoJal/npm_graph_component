export const getPointAlongLine = (
  p0: { x: number; y: number; z: number },
  p1: { x: number; y: number; z: number },
  distance: number
) => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const dz = p1.z - p0.z;

  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (length === 0) return { ...p1 };

  const ux = dx / length;
  const uy = dy / length;
  const uz = dz / length;

  return {
    x: p1.x + ux * distance,
    y: p1.y + uy * distance,
    z: p1.z + uz * distance,
  };
};
