from __future__ import annotations

import math
import random
import struct
import zlib
from pathlib import Path


WIDTH = 1400
HEIGHT = 760
OUT = Path(__file__).resolve().parent.parent / "assets" / "atlanta-bethel-stage.png"


def clamp(value: float) -> int:
    return max(0, min(255, int(value)))


def blend(dst: list[int], src: tuple[int, int, int], alpha: float) -> list[int]:
    inv = 1 - alpha
    return [
        clamp(dst[0] * inv + src[0] * alpha),
        clamp(dst[1] * inv + src[1] * alpha),
        clamp(dst[2] * inv + src[2] * alpha),
    ]


pixels: list[list[list[int]]] = []
random.seed(42)

lights = [
    (290, 160, 520, (255, 191, 92), 1.0),
    (720, 95, 620, (117, 180, 206), 0.72),
    (1110, 180, 560, (232, 109, 96), 0.78),
]

for y in range(HEIGHT):
    row: list[list[int]] = []
    for x in range(WIDTH):
        t = y / HEIGHT
        color = [
            22 + 16 * t,
            24 + 12 * t,
            31 + 10 * t,
        ]
        for cx, cy, radius, light_color, strength in lights:
            distance = math.hypot(x - cx, y - cy)
            glow = max(0, 1 - distance / radius) ** 2
            color = blend(color, light_color, glow * strength * 0.62)
        if y > HEIGHT * 0.65:
            floor_t = (y - HEIGHT * 0.65) / (HEIGHT * 0.35)
            color = blend(color, (74, 58, 46), floor_t * 0.52)
        grain = random.randint(-7, 7)
        row.append([clamp(color[0] + grain), clamp(color[1] + grain), clamp(color[2] + grain)])
    pixels.append(row)


def set_px(x: int, y: int, color: tuple[int, int, int], alpha: float = 1.0) -> None:
    if 0 <= x < WIDTH and 0 <= y < HEIGHT:
        pixels[y][x] = blend(pixels[y][x], color, alpha)


def circle(cx: int, cy: int, radius: int, color: tuple[int, int, int], alpha: float = 1.0) -> None:
    r2 = radius * radius
    for y in range(cy - radius, cy + radius + 1):
        for x in range(cx - radius, cx + radius + 1):
            distance = (x - cx) * (x - cx) + (y - cy) * (y - cy)
            if distance <= r2:
                set_px(x, y, color, alpha)


def rect(x0: int, y0: int, x1: int, y1: int, color: tuple[int, int, int], alpha: float = 1.0) -> None:
    for y in range(max(0, y0), min(HEIGHT, y1)):
        for x in range(max(0, x0), min(WIDTH, x1)):
            set_px(x, y, color, alpha)


def line(x0: int, y0: int, x1: int, y1: int, width: int, color: tuple[int, int, int], alpha: float = 1.0) -> None:
    steps = max(abs(x1 - x0), abs(y1 - y0), 1)
    for index in range(steps + 1):
        t = index / steps
        x = round(x0 + (x1 - x0) * t)
        y = round(y0 + (y1 - y0) * t)
        circle(x, y, width, color, alpha)


def ellipse(cx: int, cy: int, rx: int, ry: int, color: tuple[int, int, int], alpha: float = 1.0) -> None:
    for y in range(cy - ry, cy + ry + 1):
        for x in range(cx - rx, cx + rx + 1):
            if ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1:
                set_px(x, y, color, alpha)


def polygon(points: list[tuple[int, int]], color: tuple[int, int, int], alpha: float = 1.0) -> None:
    min_y = max(0, min(y for _, y in points))
    max_y = min(HEIGHT - 1, max(y for _, y in points))
    for y in range(min_y, max_y + 1):
        nodes: list[int] = []
        previous = points[-1]
        for current in points:
            x0, y0 = previous
            x1, y1 = current
            if (y0 < y <= y1) or (y1 < y <= y0):
                x = int(x0 + (y - y0) * (x1 - x0) / (y1 - y0))
                nodes.append(x)
            previous = current
        nodes.sort()
        for left, right in zip(nodes[0::2], nodes[1::2]):
            for x in range(max(0, left), min(WIDTH, right + 1)):
                set_px(x, y, color, alpha)


shadow = (13, 15, 18)
soft_shadow = (24, 25, 28)

# Center microphone and stand.
line(690, 285, 690, 625, 5, shadow, 0.95)
line(690, 390, 770, 352, 4, shadow, 0.95)
ellipse(793, 341, 34, 17, shadow, 0.98)
line(645, 625, 735, 625, 5, shadow, 0.95)

# Acoustic/electric guitar silhouette at left.
ellipse(338, 508, 82, 96, soft_shadow, 0.94)
ellipse(384, 462, 54, 57, soft_shadow, 0.94)
circle(364, 492, 24, (35, 28, 25), 0.72)
line(407, 432, 594, 279, 12, soft_shadow, 0.96)
line(588, 272, 625, 244, 8, soft_shadow, 0.96)
line(298, 594, 254, 706, 8, shadow, 0.9)
line(370, 594, 438, 704, 8, shadow, 0.9)

# Drum kit silhouette at right.
ellipse(1052, 536, 96, 72, shadow, 0.92)
ellipse(1132, 487, 66, 34, shadow, 0.88)
ellipse(973, 478, 70, 35, shadow, 0.88)
line(972, 514, 930, 675, 5, shadow, 0.85)
line(1138, 520, 1194, 682, 5, shadow, 0.85)
line(1012, 407, 1088, 407, 4, shadow, 0.84)
ellipse(1106, 391, 92, 17, (33, 31, 31), 0.82)
line(1162, 407, 1206, 640, 4, shadow, 0.72)

# Subtle music stand and cable curves.
polygon([(486, 428), (565, 410), (576, 498), (495, 512)], shadow, 0.74)
line(532, 505, 520, 660, 4, shadow, 0.78)
line(492, 660, 552, 660, 4, shadow, 0.78)
for offset in range(0, 7):
    line(220 + offset, 690 + offset // 2, 1040, 722 - offset, 2, (24, 20, 19), 0.16)


def png_chunk(kind: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)


raw = bytearray()
for row in pixels:
    raw.append(0)
    for red, green, blue in row:
        raw.extend((red, green, blue))

png = bytearray(b"\x89PNG\r\n\x1a\n")
png.extend(png_chunk(b"IHDR", struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 2, 0, 0, 0)))
png.extend(png_chunk(b"IDAT", zlib.compress(bytes(raw), 9)))
png.extend(png_chunk(b"IEND", b""))

OUT.write_bytes(png)
print(OUT)
