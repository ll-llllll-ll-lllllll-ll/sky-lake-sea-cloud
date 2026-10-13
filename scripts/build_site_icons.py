#!/usr/bin/env python3
"""Build all transparent site icons from the uploaded v2 glass emblem.

The source is an alpha-preserving WebP. All generated output icons use real
RGBA PNG (including Safari Apple Touch Icon) or transparent multi-size ICO.
Use a real single-colour path for Safari pinned tabs, not a linked bitmap.
"""
from pathlib import Path
from PIL import Image
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "site-icon-v2.webp"

src = Image.open(SOURCE).convert("RGBA")
assert src.getchannel("A").getextrema()[0] == 0, "Transparent pixels were lost"


def icon(size: int, inset: float = 0.06) -> Image.Image:
    inner_size = round(size * (1 - 2 * inset))
    resized = src.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = (size - inner_size) // 2
    canvas.alpha_composite(resized, (offset, offset))
    return canvas


targets = {
    "favicon-16.png": (16, .075),
    "favicon-16x16.png": (16, .075),
    "favicon-32.png": (32, .075),
    "favicon-32x32.png": (32, .075),
    "apple-touch-icon.png": (180, .06),
    "icon-192.png": (192, .06),
    "icon-512.png": (512, .04),
    "logo-master-1024.png": (1024, .03),
}

for filename, (size, inset) in targets.items():
    target = icon(size, inset)
    target.save(ROOT / filename, format="PNG", optimize=True)
    assert target.getchannel("A").getextrema() == (0, 255), filename
    print(f"{filename}: {target.size[0]}x{target.size[1]} RGBA")

icon(64, .075).save(ROOT / "favicon.ico", format="ICO",
                     sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("favicon.ico: 16/32/48/64 sizes")

manifest = {
    "name": "sky-sea-lake-cloud",
    "short_name": "sky-sea-lake-cloud",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#f4f3ee",
    "theme_color": "#f4f3ee",
    "icons": [
        {"src": "./icon-192.png", "sizes": "192x192",
         "type": "image/png", "purpose": "any"},
        {"src": "./icon-512.png", "sizes": "512x512",
         "type": "image/png", "purpose": "any"},
    ],
}
(ROOT / "site.webmanifest").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
