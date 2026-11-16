# Membuat ikon PWA (192, 512, maskable, apple-touch). Jalankan: python3 scripts/make-icons.py
from PIL import Image, ImageDraw

def make(size, safe=1.0, rounded=True):
    S = size * 4
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        d.rounded_rectangle([0, 0, S, S], radius=int(S * 0.22), fill=(79, 70, 229, 255))
    else:
        d.rectangle([0, 0, S, S], fill=(79, 70, 229, 255))
    c = S / 2
    r = S * 0.5 * safe
    pts = [(c - r * 0.42, c + r * 0.02), (c - r * 0.1, c + r * 0.34), (c + r * 0.46, c - r * 0.32)]
    d.line(pts, fill=(255, 255, 255, 255), width=int(r * 0.2), joint="curve")
    for p in (pts[0], pts[2]):
        w = r * 0.1
        d.ellipse([p[0] - w, p[1] - w, p[0] + w, p[1] + w], fill=(255, 255, 255, 255))
    return img.resize((size, size), Image.LANCZOS)

make(192).save("public/pwa-192x192.png")
make(512).save("public/pwa-512x512.png")
make(512, safe=0.72, rounded=False).save("public/pwa-maskable-512x512.png")
make(180, rounded=False, safe=0.8).save("public/apple-touch-icon.png")
print("ok")
