import sys
from pathlib import Path
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

ACCENTS = [
    ("British RP", "british"),
    ("Cockney", "cockney"),
    ("Scottish", "scottish"),
    ("Irish", "irish"),
    ("Yorkshire", "yorkshire"),
    ("General American", "american"),
    ("Southern American", "southern-american"),
    ("Australian", "australian"),
    ("South African", "south-african"),
    ("Indian English", "indian-english"),
]

if len(sys.argv) != 2:
    raise SystemExit("Usage: python qr/generate_qr.py https://your-site.pages.dev")

base = sys.argv[1].rstrip("/")
if not base.startswith("https://"):
    raise SystemExit("Use the final HTTPS deployment URL, not localhost.")

out = Path(__file__).parent / "output"
out.mkdir(exist_ok=True)

def make_qr(url, path):
    qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_H, box_size=12, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").convert("RGB").save(path)

for name, slug in ACCENTS:
    make_qr(f"{base}/listen.html?accent={slug}", out / f"{slug}.png")
make_qr(f"{base}/index.html", out / "master-accent-lab.png")

# A4 portrait sheet, 2 columns x 5 rows, with print-safe white margins.
W, H = 2480, 3508
sheet = Image.new("RGB", (W, H), "white")
draw = ImageDraw.Draw(sheet)
try:
    title_font = ImageFont.truetype("DejaVuSans-Bold.ttf", 64)
    label_font = ImageFont.truetype("DejaVuSans-Bold.ttf", 34)
    small_font = ImageFont.truetype("DejaVuSans.ttf", 24)
except OSError:
    title_font = label_font = small_font = ImageFont.load_default()

draw.text((150, 95), "THE ACCENT LAB", fill="#142c36", font=title_font)
draw.text((150, 185), "PROJECT 03  /  SCAN TO LISTEN", fill="#68777a", font=small_font)

cell_w, cell_h = 1080, 590
start_x, start_y = 100, 300
qr_size = 390
for i, (name, slug) in enumerate(ACCENTS):
    col, row = i % 2, i // 2
    x, y = start_x + col * 1160, start_y + row * 620
    draw.rounded_rectangle((x, y, x+cell_w, y+cell_h), radius=24, outline="#d9d5ca", width=4)
    draw.text((x+35, y+32), name, fill="#142c36", font=label_font)
    qr_img = Image.open(out / f"{slug}.png").convert("RGB")
    qr_img.thumbnail((qr_size, qr_size))
    sheet.paste(qr_img, (x+35, y+125))
    draw.text((x+470, y+150), "SCAN TO", fill="#68777a", font=small_font)
    draw.text((x+470, y+195), "LISTEN", fill="#142c36", font=label_font)
    draw.text((x+470, y+270), "Open the accent", fill="#68777a", font=small_font)
    draw.text((x+470, y+310), "listening page.", fill="#68777a", font=small_font)

pdf_path = out / "accent-qr-codes-a4.pdf"
sheet.save(pdf_path, "PDF", resolution=300)
print(f"Created QR PNGs and {pdf_path}")
