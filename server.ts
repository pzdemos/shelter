// server.ts - Deno Deploy server with SPA fallback
import { serveDir } from "https://deno.land/std@0.217.0/http/file_server.ts";

async function handler(req: Request): Promise<Response> {
  const pathname = new URL(req.url).pathname;

  // 尝试提供静态文件
  const response = await serveDir(req, {
    fsRoot: "./dist",
    quiet: true,
  });

  // 如果是 404 且不是静态资源请求，返回 index.html 用于 SPA 路由
  if (response.status === 404) {
    // 检查是否有文件扩展名（如 .js, .css, .svg 等静态资源）
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathname);

    // 对于没有扩展名的路径（SPA 路由），返回 index.html
    if (!hasExtension) {
      try {
        const indexHtml = await Deno.readFile("./dist/index.html");
        return new Response(indexHtml, {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        });
      } catch {
        return new Response("index.html not found", { status: 500 });
      }
    }
  }

  return response;
}

Deno.serve(handler);
