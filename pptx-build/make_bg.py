"""Generate branded 100flows backgrounds (PIL only, no numpy)."""
from PIL import Image, ImageDraw, ImageFilter

W, H = 1995, 1125  # 13.3 x 7.5 in @ 150 dpi

PURPLE = (124, 91, 219)
BLUE   = (79, 142, 247)
TEAL   = (56, 189, 248)


def lerp(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def grad3(t):
    """3-stop gradient purple -> blue -> teal."""
    if t < 0.5:
        return lerp(PURPLE, BLUE, t / 0.5)
    return lerp(BLUE, TEAL, (t - 0.5) / 0.5)


def glow(cx, cy, radius, color, alpha):
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(g)
    gd.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
               fill=color + (alpha,))
    return g.filter(ImageFilter.GaussianBlur(radius * 0.5))


# ---------- DARK BACKGROUND (hero / sections / closing-dark) ----------
base = Image.new("RGBA", (W, H), (0, 0, 0, 255))
# vertical subtle gradient 080B16 -> 0E1226
top, bot = (8, 11, 22), (15, 19, 40)
col = Image.new("RGBA", (1, H))
for y in range(H):
    col.putpixel((0, y), lerp(top, bot, y / H) + (255,))
base = col.resize((W, H))

# dot grid
dots = Image.new("RGBA", (W, H), (0, 0, 0, 0))
dd = ImageDraw.Draw(dots)
step, r = 46, 1.7
for y in range(0, H + step, step):
    for x in range(0, W + step, step):
        dd.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, 13))
base = Image.alpha_composite(base, dots)

# ambient glows
base = Image.alpha_composite(base, glow(170, 130, 680, PURPLE, 95))
base = Image.alpha_composite(base, glow(W - 160, H - 120, 620, TEAL, 60))
base = Image.alpha_composite(base, glow(W - 360, int(H * 0.42), 440, BLUE, 55))
base.convert("RGB").save("bg_dark.png", quality=95)

# ---------- DARKER PLAIN (content-dark slides, calmer) ----------
plain = Image.new("RGBA", (W, H), (0, 0, 0, 255))
plain = col.resize((W, H))
sub = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(sub)
for y in range(0, H + step, step):
    for x in range(0, W + step, step):
        sd.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, 9))
plain = Image.alpha_composite(plain, sub)
plain = Image.alpha_composite(plain, glow(W - 220, 150, 520, PURPLE, 45))
plain = Image.alpha_composite(plain, glow(120, H - 140, 460, TEAL, 32))
plain.convert("RGB").save("bg_dark_plain.png", quality=95)

# ---------- GRADIENT BACKGROUND (closing / accent) ----------
small_w, small_h = 640, 360
g = Image.new("RGB", (small_w, small_h))
for y in range(small_h):
    for x in range(small_w):
        t = (x + y) / (small_w + small_h)
        g.putpixel((x, y), grad3(t))
g = g.resize((W, H), Image.BICUBIC)
# soften with a dark vignette at bottom for text legibility
vig = Image.new("RGBA", (W, H), (0, 0, 0, 0))
vd = ImageDraw.Draw(vig)
for y in range(H):
    a = int(120 * (y / H) ** 2)
    vd.line([(0, y), (W, y)], fill=(8, 11, 22, a))
g = Image.alpha_composite(g.convert("RGBA"), vig)
g.convert("RGB").save("bg_gradient.png", quality=95)

# ---------- THIN GRADIENT BAR (accent strips) ----------
bar = Image.new("RGB", (small_w, 12))
for x in range(small_w):
    bar.putpixel((x, 0), grad3(x / small_w))
for y in range(1, 12):
    for x in range(small_w):
        bar.putpixel((x, y), bar.getpixel((x, 0)))
bar.resize((W, 24), Image.BICUBIC).save("bar_gradient.png")

print("backgrounds written")
