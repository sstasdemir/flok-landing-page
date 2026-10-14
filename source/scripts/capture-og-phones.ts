// Captures the hero's three phones on a transparent background, plus PNG App Store badges, for make-og.py.
// Usage: bun scripts/capture-og-phones.ts [url]   (default: https://flok.ist/)
// Re-run, then make-og.py tr && make-og.py en, whenever the hero screens change.
import { resolve } from "node:path";

const url = Bun.argv[2] ?? "https://flok.ist/";
const out = resolve(import.meta.dir, "og-phones.png");
const port = 9336;
const chrome = Bun.spawn(
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless=new",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=/tmp/flok-og-phones-${Date.now()}`,
    "about:blank",
  ],
  { stdout: "ignore", stderr: "ignore" },
);

try {
  let target: { webSocketDebuggerUrl: string } | undefined;
  for (let attempt = 0; attempt < 50 && !target; attempt++) {
    await Bun.sleep(200);
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      target = targets.find((t: { type: string }) => t.type === "page");
    } catch {}
  }
  if (!target) throw new Error("Chrome did not start");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ready) => (ws.onopen = ready));
  let nextId = 0;
  const pending = new Map<number, (result: any) => void>();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data as string);
    pending.get(message.id)?.(message.result);
  };
  const send = (method: string, params: object = {}) =>
    new Promise<any>((done) => {
      const id = ++nextId;
      pending.set(id, done);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 3, mobile: false });
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  await send("Page.enable");
  await send("Page.navigate", { url });
  // Long enough for the images to load and the phones' entrance springs to settle.
  await Bun.sleep(5000);

  const { result } = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const disc = document.querySelector("div.rounded-full.bg-mint-soft");
      const stage = disc.parentElement;
      disc.style.display = "none";
      for (const el of [document.documentElement, document.body]) el.style.background = "transparent";
      document.body.style.visibility = "hidden";
      stage.style.visibility = "visible";
      const box = stage.getBoundingClientRect();
      const pad = box.width * 0.1;
      return { x: box.left - pad, y: box.top + window.scrollY - pad, width: box.width + pad * 2, height: box.height + pad * 2 };
    })()`,
  });
  await Bun.sleep(300);

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { ...result.value, scale: 1 },
  });
  await Bun.write(out, Buffer.from(shot.data, "base64"));
  console.log(out);

  // PIL can't read SVG, so make-og.py gets the App Store badges rasterised here.
  for (const locale of ["tr", "en"]) {
    const svg = resolve(import.meta.dir, `../public/images/badges/app-store-${locale}.svg`);
    const badgeOut = resolve(import.meta.dir, `og-app-store-${locale}.png`);
    await send("Emulation.setDeviceMetricsOverride", { width: 200, height: 40, deviceScaleFactor: 6, mobile: false });
    await send("Page.navigate", { url: `file://${svg}` });
    await Bun.sleep(800);
    const badge = await send("Page.captureScreenshot", { format: "png" });
    await Bun.write(badgeOut, Buffer.from(badge.data, "base64"));
    console.log(badgeOut);
  }
  ws.close();
} finally {
  chrome.kill();
}
