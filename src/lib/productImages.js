// Auto-imports every image in src/assets/products so seed data can
// reference them by filename without a long list of manual imports.
const modules = import.meta.glob("../assets/products/*.jpg", {
  eager: true,
  import: "default",
});

const images = {};
for (const path in modules) {
  const filename = path.split("/").pop();
  images[filename] = modules[path];
}

export default images;
