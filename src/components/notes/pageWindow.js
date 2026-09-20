// Two pages behind, the visible spread, and two ahead: at most six canvases.
export function pageWindow(current, total, spread) {
  const first = spread === 2 ? current - current % 2 : current;
  return { first, last: Math.min(total - 1, first + spread - 1),
    from: Math.max(0, first - 2), to: Math.min(total - 1, first + spread + 1) };
}

export function bookSize(width, height, ratio) {
  const spread = width >= 760 ? 2 : 1;
  const pageWidth = Math.max(1, Math.floor(Math.min((width - 24) / spread, (height - 24) * ratio, 620)));
  return { width: pageWidth, height: Math.max(1, Math.floor(pageWidth / ratio)), spread };
}
