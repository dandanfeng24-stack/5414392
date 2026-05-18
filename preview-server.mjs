import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "out");
const port = Number(process.env.PORT ?? 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  const fullPath = join(root, safePath);

  if (existsSync(fullPath) && statSync(fullPath).isFile()) return fullPath;
  if (existsSync(fullPath) && statSync(fullPath).isDirectory()) {
    const indexPath = join(fullPath, "index.html");
    if (existsSync(indexPath)) return indexPath;
  }

  const htmlPath = `${fullPath}.html`;
  if (existsSync(htmlPath)) return htmlPath;

  return join(root, "index.html");
}

createServer((request, response) => {
  const filePath = resolvePath(request.url ?? "/");
  response.setHeader("Content-Type", types[extname(filePath)] ?? "application/octet-stream");
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`非遗造物 MVP preview: http://127.0.0.1:${port}`);
});
