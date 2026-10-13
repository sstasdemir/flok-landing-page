"""Renders the 1200x630 link preview image: python3 scripts/make-og.py tr|en"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

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


def phone(screen_name, width):
    frame = Image.open(ROOT / "public/images/device/iphone-17-pro-max-silver.webp").convert("RGBA")
    screen = Image.open(ROOT / f"public/images/screens/{screen_name}.webp").convert("RGBA").resize((660, 1434))
    base = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    mask = Image.new("L", (660, 1434), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, 659, 1433], radius=85, fill=255)
    base.paste(screen, (37, 33), mask)
    base.alpha_composite(frame)
    scale = width * S / base.width
    return base.resize((round(base.width * scale), round(base.height * scale)), Image.LANCZOS)


def place(img, left, top, css_rotate_deg):
    cx = left * S + img.width / 2
    cy = top * S + img.height / 2
    rotated = img.rotate(-css_rotate_deg, resample=Image.BICUBIC, expand=True)
    x = round(cx - rotated.width / 2)
    y = round(cy - rotated.height / 2)
    pad = 60 * S
    alpha = Image.new("L", (rotated.width + 2 * pad, rotated.height + 2 * pad), 0)
    alpha.paste(rotated.getchannel("A").point(lambda a: int(a * 0.28)), (pad, pad))
    alpha = alpha.filter(ImageFilter.GaussianBlur(16 * S))
    shadow = Image.new("RGB", alpha.size, (15, 31, 24))
    canvas.paste(shadow, (x - pad, y - pad + 20 * S), alpha)
    canvas.paste(rotated, (x, y), rotated)


# Hero stage geometry mirrored from components/site/hero-stage.tsx
STAGE = 540
X0, Y0 = 640, 62
stage_h = STAGE * 1.02
disc = STAGE * 1.12
disc_left = X0 + STAGE / 2 - disc / 2
disc_top = Y0 + stage_h / 2 - disc * 0.42
draw.ellipse([disc_left * S, disc_top * S, (disc_left + disc) * S, (disc_top + disc) * S], fill=MINT_SOFT)

side_w = STAGE * 0.38
front_w = STAGE * 0.48
side_top = Y0 + stage_h * 0.14
place(phone("map", side_w), X0 + STAGE * 0.02, side_top, -9)
place(phone("qr", side_w), X0 + STAGE - STAGE * 0.02 - side_w, side_top, 9)
front = phone("discover", front_w)
place(front, X0 + (STAGE - front_w) / 2, Y0 + (stage_h - front.height / S) / 2, 0)

x = 72
titan = ImageFont.truetype(str(ROOT / "app/fonts/TitanOne-Regular.ttf"), 46 * S)
draw.text((x * S, 70 * S), "flok", font=titan, fill=FOREST)
# Largest headline size up to 62px whose widest line stays clear of the mint disc and phones.
H1_MAX_WIDTH = 500
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
