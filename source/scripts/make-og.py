"""Renders the 1200x630 link preview image: python3 scripts/make-og.py tr|en

Needs scripts/og-phones.png from `bun scripts/capture-og-phones.ts` (not committed).
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
S = 2
BG = (247, 246, 242)
FOREST = (31, 61, 46)
INK = (17, 17, 17)
MUTED = (96, 96, 92)
MINT_SOFT = (220, 239, 227)

COPY = {
    "tr": {
        "lines": ["İstanbul'daki", "küçük buluşmalar,", "tek uygulamada."],
        "body": "Keşfet, katıl, kapıda QR ile gir.",
        "pill": "Ön kayıt açık",
        "out": "og-home.jpg",
    },
    "en": {
        "lines": ["Small meetups", "in Istanbul,", "all in one app."],
        "body": "Discover, join, get in with a QR code.",
        "pill": "Waitlist open",
        "out": "og-home-en.jpg",
    },
}

locale = sys.argv[1] if len(sys.argv) > 1 else "tr"
copy = COPY[locale]

canvas = Image.new("RGB", (W * S, H * S), BG)
draw = ImageDraw.Draw(canvas)


def sf(size, weight):
    font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", size * S)
    font.set_variation_by_axes([100, min(size, 96), 400, weight])
    return font


# The hero's three phones (scripts/capture-og-phones.ts) on the same mint disc as the site.
phones = Image.open(ROOT / "scripts/og-phones.png").convert("RGBA")
phones = phones.crop(phones.getchannel("A").getbbox())
# Clear of the longest headline line; the group bleeds a little off the right and bottom edges.
phones_h = 580
phones_w = round(phones.width * phones_h / phones.height)
phones_left = 630
phones_top = H - phones_h + 36

disc = phones_w * 1.04
disc_left = phones_left + (phones_w - disc) / 2
disc_top = phones_top + phones_h * 0.5 - disc * 0.42
draw.ellipse(
    [disc_left * S, disc_top * S, (disc_left + disc) * S, (disc_top + disc) * S],
    fill=MINT_SOFT,
)
phones = phones.resize((phones_w * S, phones_h * S), Image.LANCZOS)
canvas.paste(phones, (phones_left * S, phones_top * S), phones)

x = 72
titan = ImageFont.truetype(str(ROOT / "app/fonts/TitanOne-Regular.ttf"), 46 * S)
draw.text((x * S, 70 * S), "flok", font=titan, fill=FOREST)

H1_MAX_WIDTH = 720
h1_size = 62
while h1_size > 48 and max(draw.textlength(line, font=sf(h1_size, 800)) for line in copy["lines"]) > H1_MAX_WIDTH * S:
    h1_size -= 1
h1 = sf(h1_size, 800)
line_step = round(h1_size * 72 / 62)
for index, (line, color) in enumerate(zip(copy["lines"], (INK, FOREST, INK))):
    draw.text((x * S, (196 + line_step * index) * S), line, font=h1, fill=color)

body = sf(25, 450)
draw.text((x * S, 444 * S), copy["body"], font=body, fill=MUTED)

pill = sf(22, 650)
tw = draw.textlength(copy["pill"], font=pill)
px, py = x * S, 512 * S
draw.rounded_rectangle([px, py, px + tw + 48 * S, py + 50 * S], radius=25 * S, fill=FOREST)
draw.text((px + 24 * S, py + 12 * S), copy["pill"], font=pill, fill=(255, 255, 255))

out = ROOT / "public/images" / copy["out"]
canvas.resize((W, H), Image.LANCZOS).save(out, quality=90, optimize=True, progressive=True)
print(out, f"h1={h1_size}px")
