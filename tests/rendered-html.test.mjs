import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the complete Frankly Coffee landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Frankly Coffee \| Coffee, frankly\.<\/title>/i);
  assert.match(html, /Coffee,/);
  assert.match(html, /The essentials/);
  assert.match(html, /Brandon and Kelly Noffsinger/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /latte-table\.jpg/);
  assert.match(html, /berry-drink\.jpg/);
  assert.match(html, /coffee-machine\.jpg/);
  assert.match(html, /sunlit-cups\.jpg/);
  assert.match(html, /patio\.jpg/);
  assert.match(html, /franklycoffee\.co/);
  assert.match(html, /\(719\) 900-3372/);
  assert.match(html, /aria-label="Frankly Coffee on Instagram"/);
  assert.match(html, /aria-label="Frankly Coffee on Facebook"/);
  assert.match(html, /727½ W Colorado Ave/);
  assert.match(html, /Mon–Fri · 6:30–3/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.ok(html.indexOf("A little backstory") < html.indexOf("The essentials"));
});
