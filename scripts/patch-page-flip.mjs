// page-flip 2.0.7's destroy() leaves a perpetual requestAnimationFrame loop
// retaining the book and its pages. Keep the small upstream fix reproducible
// on npm install / npm ci without adding a patching dependency.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const directory = dirname(require.resolve("page-flip/package.json"));
const changes = [
  ["start(){this.update();const t=e=>{this.render(e),requestAnimationFrame(t)};requestAnimationFrame(t)}",
    "start(){this.update();const t=e=>{this.render(e),this.notebookFrame=requestAnimationFrame(t)};this.notebookFrame=requestAnimationFrame(t)}"],
  ["destroy(){this.ui.destroy(),this.block.remove()}",
    "destroy(){cancelAnimationFrame(this.render.notebookFrame);this.ui.destroy();this.pages.destroy();this.block.remove()}"],
  // Portrait turns clone DOM pages. cloneNode does not copy canvas pixels.
  ["this.copiedElement=this.element.cloneNode(!0),",
    "this.copiedElement=this.element.cloneNode(!0),this.copiedElement.setAttribute('aria-hidden','true'),this.element.querySelectorAll('canvas').forEach((canvas,index)=>{if(canvas.width&&canvas.height)this.copiedElement.querySelectorAll('canvas')[index].getContext('2d').drawImage(canvas,0,0)}),"],
];
for (const file of ["page-flip.browser.js", "page-flip.module.js"]) {
  const path = join(directory, "dist/js", file);
  let source = readFileSync(path, "utf8");
  for (const [before, after] of changes) {
    if (source.includes(after)) continue;
    if (!source.includes(before)) throw new Error(`Review the page-flip lifecycle fix after upgrading: ${file}`);
    source = source.replace(before, after);
  }
  writeFileSync(path, source);
}
