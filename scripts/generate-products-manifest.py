#!/usr/bin/env python3
"""Regenerate assets/products.json after adding or updating product images."""

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

CATEGORIES = {
    "spices": {"folder": "spices", "title": "Our Spices Collection"},
    "snacks": {"folder": "snacks", "title": "Our Snacks Collection"},
    "coffee": {"folder": "coffee", "title": "Our Coffee Collection"},
    "tea": {"folder": "tea", "title": "Our Tea Collection"},
    "protein": {"folder": "Protein_food", "title": "Our Protein Food Collection"},
    "atta": {"folder": "atta", "title": "Our Protein Atta Collection"},
    "gourmet": {"folder": "gourmet", "title": "Our Gourmet Food Collection"},
    "ayurvedic": {"folder": "ayurvedic", "title": "Our Ayurvedic & Herbal Collection"},
}

manifest = {}
for key, meta in CATEGORIES.items():
    folder = ASSETS / meta["folder"]
    files = []
    if folder.is_dir():
        files = sorted(
            f for f in os.listdir(folder)
            if f.lower().endswith((".jpeg", ".jpg", ".png", ".webp"))
        )
    manifest[key] = {**meta, "files": files}

output = ASSETS / "products.json"
output.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {output}")

js_output = ASSETS / "products-manifest.js"
js_output.write_text(
    "window.PRODUCTS_MANIFEST = " + json.dumps(manifest, indent=2) + ";\n",
    encoding="utf-8",
)
print(f"Wrote {js_output}")
