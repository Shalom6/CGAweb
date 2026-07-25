"""Crop CGA logo to a circular PNG with transparent outside (no purple)."""

from PIL import Image
import math

src_path = r"C:\Users\damol\.cursor\projects\c-Users-damol-IdeaProjects-CGAweb-CGAweb\assets\c__Users_damol_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot_2026-07-25_133408-a3dc4256-5c44-4d4f-9e65-3dde33ff31bb.png"
fav_path = r"C:\Users\damol\IdeaProjects\CGAweb\CGAweb\client\public\favicon.png"
logo_path = r"C:\Users\damol\IdeaProjects\CGAweb\CGAweb\client\public\images\cga-logo.png"
ico_path = r"C:\Users\damol\IdeaProjects\CGAweb\CGAweb\client\public\favicon.ico"

img = Image.open(src_path).convert("RGBA")
w, h = img.size
px = img.load()


def is_purple(r, g, b):
    """Detect purple / magenta glow around the logo."""
    if b > g + 12 and b >= r - 8 and g < 85 and max(r, g, b) < 140:
        return True
    if abs(r - 35) + abs(g - 3) + abs(b - 57) < 75:
        return True
    if r > 45 and b > 55 and g < min(r, b) * 0.75 and 90 < (r + b) < 220 and max(r, b) < 170:
        return True
    return False


def is_black_fill(r, g, b):
    return r < 55 and g < 50 and b < 60 and not is_purple(r, g, b)


blacks = [
    (x, y)
    for y in range(h)
    for x in range(w)
    if is_black_fill(*px[x, y][:3])
]
cx = sum(x for x, _ in blacks) / len(blacks)
cy = sum(y for _, y in blacks) / len(blacks)

# Radius from farthest black-fill pixel (the disk), plus a little for the gold rim
black_dists = [math.hypot(x - cx, y - cy) for x, y in blacks]
radius = sorted(black_dists)[int(len(black_dists) * 0.995)] + 1.2
# Keep inside image bounds
radius = min(radius, cx - 0.5, cy - 0.5, w - 1.5 - cx, h - 1.5 - cy)
print(f"center=({cx:.2f},{cy:.2f}) radius={radius:.2f} img={w}x{h}")

scale = 14
big = img.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
bcx, bcy, brad = cx * scale, cy * scale, radius * scale
out_side = int(math.ceil(brad * 2)) + 2
left = int(round(bcx - out_side / 2))
top = int(round(bcy - out_side / 2))

canvas = Image.new("RGBA", (out_side, out_side), (0, 0, 0, 0))
bx0, by0 = max(0, left), max(0, top)
bx1, by1 = min(big.size[0], left + out_side), min(big.size[1], top + out_side)
canvas.paste(big.crop((bx0, by0, bx1, by1)), (bx0 - left, by0 - top))

cp = canvas.load()
ocx = (out_side - 1) / 2
ocy = (out_side - 1) / 2
rad = out_side / 2 - 0.75

for y in range(out_side):
    for x in range(out_side):
        d = math.hypot(x - ocx, y - ocy)
        if d > rad:
            cp[x, y] = (0, 0, 0, 0)
            continue
        r, g, b, a = cp[x, y]
        if not a:
            continue
        if is_purple(r, g, b):
            # Drop purple glow near the rim; fill inner haze with logo black
            if d > rad * 0.82:
                # soft falloff to transparent
                t = (d - rad * 0.82) / (rad * 0.18)
                if t > 0.35:
                    cp[x, y] = (0, 0, 0, 0)
                else:
                    cp[x, y] = (8, 6, 10, 255)
            else:
                cp[x, y] = (8, 6, 10, 255)


def export(im, path, size):
    im2 = im.resize((size, size), Image.Resampling.LANCZOS)
    p = im2.load()
    ccx = ccy = (size - 1) / 2
    rad2 = size / 2 - 0.5
    for y in range(size):
        for x in range(size):
            d = math.hypot(x - ccx, y - ccy)
            if d > rad2:
                p[x, y] = (0, 0, 0, 0)
                continue
            r, g, b, a = p[x, y]
            if a > 8 and is_purple(r, g, b):
                p[x, y] = (0, 0, 0, 0) if d > rad2 * 0.85 else (8, 6, 10, 255)
    im2.save(path, "PNG")
    print(
        path,
        "corner",
        p[0, 0],
        "mid-edge",
        p[0, size // 2],
        "center",
        p[size // 2, size // 2],
    )
    return im2


fav = export(canvas, fav_path, 64)
logo = export(canvas, logo_path, 256)
fav.save(
    ico_path,
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
)
print("wrote", ico_path)
print("done")
