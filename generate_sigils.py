"""
Generate geometric sigil images (450x450 PNG) for daemons that don't have local images.
Style: goetic seals - black lines on white background with geometric patterns in circles.
Each daemon gets a unique deterministic pattern based on a hash of its name.
"""

import hashlib
import math
import os
from PIL import Image, ImageDraw

# Output directory
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public', 'sigils')

# Daemons that need sigils generated (those NOT already in LOCAL_SIGILS)
DAEMONS_NEEDING_SIGILS = [
    # Qliphoth regents
    'satan',
    'moloch',
    'lucifuge-rofocale',
    'belphegor',
    'adramalech',
    'lilith',
    'nahema',
    'choronzon',
    # Tunnel daemons
    'amprodias',
    'baratchial',
    'gargophias',
    'dagdagiel',
    'hemethterith',
    'uriens',
    'zamradiel',
    'characith',
    'temphioth',
    'yamatu',
    'kurgasiax',
    'lafcursiax',
    'malkunofat',
    'niantiel',
    'saksaksalim',
    'aanonin',
    'parfaxitas',
    'tzuflifu',
    'qulielfi',
    'raflifu',
    'shalicu',
    'thantifaxath',
]

SIZE = 450
CENTER = SIZE // 2
LINE_WIDTH = 2
THIN_LINE = 1


def get_hash_values(name: str, count: int = 32) -> list[int]:
    """Get deterministic pseudo-random values from daemon name hash."""
    h = hashlib.sha256(name.encode()).hexdigest()
    # Extend hash if needed
    while len(h) < count * 2:
        h += hashlib.sha256(h.encode()).hexdigest()
    return [int(h[i*2:i*2+2], 16) for i in range(count)]


def draw_outer_circle(draw: ImageDraw.Draw, radius: int, width: int = LINE_WIDTH):
    """Draw the main outer circle."""
    x0 = CENTER - radius
    y0 = CENTER - radius
    x1 = CENTER + radius
    y1 = CENTER + radius
    draw.ellipse([x0, y0, x1, y1], outline='black', width=width)


def draw_inner_circle(draw: ImageDraw.Draw, radius: int, width: int = LINE_WIDTH):
    """Draw an inner circle."""
    x0 = CENTER - radius
    y0 = CENTER - radius
    x1 = CENTER + radius
    y1 = CENTER + radius
    draw.ellipse([x0, y0, x1, y1], outline='black', width=width)


def draw_polygon(draw: ImageDraw.Draw, sides: int, radius: int, rotation: float = 0, width: int = LINE_WIDTH):
    """Draw a regular polygon inscribed in a circle."""
    points = []
    for i in range(sides):
        angle = rotation + (2 * math.pi * i / sides)
        x = CENTER + radius * math.cos(angle)
        y = CENTER + radius * math.sin(angle)
        points.append((x, y))
    # Draw edges
    for i in range(sides):
        draw.line([points[i], points[(i + 1) % sides]], fill='black', width=width)
    return points


def draw_star(draw: ImageDraw.Draw, points_count: int, outer_radius: int, inner_radius: int, rotation: float = 0, width: int = LINE_WIDTH):
    """Draw a star shape."""
    points = []
    for i in range(points_count * 2):
        angle = rotation + (math.pi * i / points_count)
        r = outer_radius if i % 2 == 0 else inner_radius
        x = CENTER + r * math.cos(angle)
        y = CENTER + r * math.sin(angle)
        points.append((x, y))
    for i in range(len(points)):
        draw.line([points[i], points[(i + 1) % len(points)]], fill='black', width=width)
    return points


def draw_cross(draw: ImageDraw.Draw, radius: int, rotation: float = 0, width: int = LINE_WIDTH):
    """Draw a cross/plus sign."""
    for i in range(4):
        angle = rotation + (math.pi / 2 * i)
        x = CENTER + radius * math.cos(angle)
        y = CENTER + radius * math.sin(angle)
        draw.line([(CENTER, CENTER), (x, y)], fill='black', width=width)


def draw_radial_lines(draw: ImageDraw.Draw, count: int, inner_radius: int, outer_radius: int, rotation: float = 0, width: int = LINE_WIDTH):
    """Draw radial lines from inner to outer radius."""
    for i in range(count):
        angle = rotation + (2 * math.pi * i / count)
        x1 = CENTER + inner_radius * math.cos(angle)
        y1 = CENTER + inner_radius * math.sin(angle)
        x2 = CENTER + outer_radius * math.cos(angle)
        y2 = CENTER + outer_radius * math.sin(angle)
        draw.line([(x1, y1), (x2, y2)], fill='black', width=width)


def draw_connecting_lines(draw: ImageDraw.Draw, points: list, skip: int = 2, width: int = LINE_WIDTH):
    """Draw lines connecting every Nth point (creates star patterns)."""
    n = len(points)
    for i in range(n):
        j = (i + skip) % n
        draw.line([points[i], points[j]], fill='black', width=width)


def draw_small_circles(draw: ImageDraw.Draw, count: int, radius: int, circle_radius: int, rotation: float = 0, width: int = THIN_LINE):
    """Draw small circles along a larger circle."""
    for i in range(count):
        angle = rotation + (2 * math.pi * i / count)
        cx = CENTER + radius * math.cos(angle)
        cy = CENTER + radius * math.sin(angle)
        draw.ellipse(
            [cx - circle_radius, cy - circle_radius, cx + circle_radius, cy + circle_radius],
            outline='black', width=width
        )


def draw_arc_pattern(draw: ImageDraw.Draw, count: int, radius: int, arc_radius: int, rotation: float = 0, width: int = LINE_WIDTH):
    """Draw arcs at regular intervals."""
    for i in range(count):
        angle = rotation + (2 * math.pi * i / count)
        cx = CENTER + radius * math.cos(angle)
        cy = CENTER + radius * math.sin(angle)
        start_deg = math.degrees(angle) - 45
        end_deg = math.degrees(angle) + 45
        bbox = [cx - arc_radius, cy - arc_radius, cx + arc_radius, cy + arc_radius]
        draw.arc(bbox, start_deg, end_deg, fill='black', width=width)


def draw_sigil_marks(draw: ImageDraw.Draw, hash_vals: list[int], radius: int):
    """Draw small tick marks on the outer circle (like degree marks on seals)."""
    count = 12 + (hash_vals[20] % 24)
    rotation = hash_vals[21] * math.pi / 128
    tick_inner = radius - 6
    tick_outer = radius + 6
    for i in range(count):
        angle = rotation + (2 * math.pi * i / count)
        x1 = CENTER + tick_inner * math.cos(angle)
        y1 = CENTER + tick_inner * math.sin(angle)
        x2 = CENTER + tick_outer * math.cos(angle)
        y2 = CENTER + tick_outer * math.sin(angle)
        draw.line([(x1, y1), (x2, y2)], fill='black', width=THIN_LINE)


def draw_curved_sigil_line(draw: ImageDraw.Draw, hash_vals: list[int], radius: int):
    """Draw a flowing sigil line that curves through several points (like traditional sigils)."""
    num_points = 5 + (hash_vals[22] % 4)
    points = []
    for i in range(num_points):
        idx = 23 + i
        if idx >= len(hash_vals):
            idx = idx % len(hash_vals)
        angle = hash_vals[idx] * 2 * math.pi / 256
        r = 20 + (hash_vals[(idx + 1) % len(hash_vals)] % int(radius * 0.6))
        x = CENTER + r * math.cos(angle)
        y = CENTER + r * math.sin(angle)
        points.append((x, y))
    
    # Draw connected line through points
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill='black', width=LINE_WIDTH)
    
    # Add small circle at start and end
    for pt in [points[0], points[-1]]:
        r = 4
        draw.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], outline='black', width=LINE_WIDTH)


def draw_crescent(draw: ImageDraw.Draw, cx: float, cy: float, radius: int, rotation: float = 0, width: int = LINE_WIDTH):
    """Draw a crescent moon shape."""
    # Outer circle
    draw.arc([cx - radius, cy - radius, cx + radius, cy + radius], 
             math.degrees(rotation), math.degrees(rotation) + 180, fill='black', width=width)
    # Inner circle (offset to create crescent)
    offset = radius * 0.3
    ox = cx + offset * math.cos(rotation + math.pi / 2)
    oy = cy + offset * math.sin(rotation + math.pi / 2)
    inner_r = radius * 0.85
    draw.arc([ox - inner_r, oy - inner_r, ox + inner_r, oy + inner_r],
             math.degrees(rotation), math.degrees(rotation) + 180, fill='black', width=width)


def generate_sigil(daemon_id: str) -> Image.Image:
    """Generate a unique geometric sigil for a daemon."""
    img = Image.new('RGB', (SIZE, SIZE), 'white')
    draw = ImageDraw.Draw(img)
    
    # Get deterministic hash values
    hv = get_hash_values(daemon_id, 32)
    
    # --- Layer 1: Outer boundary ---
    outer_radius = 200
    draw_outer_circle(draw, outer_radius, width=LINE_WIDTH + 1)
    
    # Secondary outer circle (double border style)
    if hv[0] % 3 == 0:
        draw_outer_circle(draw, outer_radius - 8, width=THIN_LINE)
    elif hv[0] % 3 == 1:
        draw_outer_circle(draw, outer_radius + 5, width=THIN_LINE)
    
    # --- Layer 2: Tick marks on outer circle ---
    draw_sigil_marks(draw, hv, outer_radius)
    
    # --- Layer 3: Inner geometric framework ---
    inner_radius = 80 + (hv[1] % 60)  # 80-140
    
    # Choose primary polygon
    polygon_sides = 3 + (hv[2] % 6)  # 3-8 sides
    polygon_rotation = hv[3] * math.pi / 128
    poly_points = draw_polygon(draw, polygon_sides, inner_radius, polygon_rotation, LINE_WIDTH)
    
    # --- Layer 4: Star or connecting pattern ---
    if hv[4] % 3 == 0:
        # Star pattern
        star_points = 5 + (hv[5] % 4)  # 5-8 pointed star
        star_outer = inner_radius - 10
        star_inner = star_outer * 0.4
        star_rotation = hv[6] * math.pi / 128
        draw_star(draw, star_points, int(star_outer), int(star_inner), star_rotation, LINE_WIDTH)
    elif hv[4] % 3 == 1:
        # Connecting lines (skip pattern)
        skip = 2 + (hv[5] % (polygon_sides - 2))
        draw_connecting_lines(draw, poly_points, skip, LINE_WIDTH)
    else:
        # Second polygon rotated
        second_sides = 3 + (hv[5] % 5)
        second_rotation = polygon_rotation + math.pi / second_sides
        draw_polygon(draw, second_sides, inner_radius - 15, second_rotation, LINE_WIDTH)
    
    # --- Layer 5: Central element ---
    central_choice = hv[7] % 5
    if central_choice == 0:
        # Cross
        cross_radius = 30 + (hv[8] % 30)
        cross_rotation = hv[9] * math.pi / 256
        draw_cross(draw, cross_radius, cross_rotation, LINE_WIDTH)
    elif central_choice == 1:
        # Small inner circle
        draw_inner_circle(draw, 20 + (hv[8] % 20), LINE_WIDTH)
        draw_inner_circle(draw, 8, THIN_LINE)
    elif central_choice == 2:
        # Dot (filled circle)
        dot_r = 5 + (hv[8] % 8)
        draw.ellipse([CENTER - dot_r, CENTER - dot_r, CENTER + dot_r, CENTER + dot_r], fill='black')
    elif central_choice == 3:
        # Small triangle
        tri_r = 20 + (hv[8] % 15)
        tri_rot = hv[9] * math.pi / 128
        draw_polygon(draw, 3, tri_r, tri_rot, LINE_WIDTH)
    else:
        # Concentric circles
        for i in range(3):
            r = 10 + i * 12
            draw_inner_circle(draw, r, THIN_LINE)
    
    # --- Layer 6: Radial decorations ---
    if hv[10] % 2 == 0:
        radial_count = 4 + (hv[11] % 8)
        radial_inner = inner_radius + 10
        radial_outer = outer_radius - 15
        radial_rotation = hv[12] * math.pi / 128
        draw_radial_lines(draw, radial_count, radial_inner, radial_outer, radial_rotation, THIN_LINE)
    
    # --- Layer 7: Small circles on perimeter ---
    if hv[13] % 3 != 0:
        circle_count = 3 + (hv[14] % 6)
        circle_radius_pos = outer_radius - 25
        circle_size = 4 + (hv[15] % 6)
        circle_rotation = hv[16] * math.pi / 128
        draw_small_circles(draw, circle_count, circle_radius_pos, circle_size, circle_rotation, THIN_LINE)
    
    # --- Layer 8: Curved sigil line ---
    if hv[17] % 2 == 0:
        draw_curved_sigil_line(draw, hv, inner_radius)
    
    # --- Layer 9: Arc decorations ---
    if hv[18] % 3 == 0:
        arc_count = 3 + (hv[19] % 5)
        arc_radius_pos = (inner_radius + outer_radius) // 2
        arc_size = 15 + (hv[20] % 20)
        arc_rotation = hv[21] * math.pi / 128
        draw_arc_pattern(draw, arc_count, arc_radius_pos, arc_size, arc_rotation, THIN_LINE)
    
    # --- Layer 10: Additional inner detail ---
    detail_choice = hv[28] % 4
    if detail_choice == 0:
        # Inner ring of dots
        dot_count = 6 + (hv[29] % 6)
        dot_radius = inner_radius * 0.5
        for i in range(dot_count):
            angle = hv[30] * math.pi / 128 + (2 * math.pi * i / dot_count)
            dx = CENTER + dot_radius * math.cos(angle)
            dy = CENTER + dot_radius * math.sin(angle)
            draw.ellipse([dx - 2, dy - 2, dx + 2, dy + 2], fill='black')
    elif detail_choice == 1:
        # V-shapes at polygon vertices
        for pt in poly_points[:min(4, len(poly_points))]:
            angle_to_center = math.atan2(CENTER - pt[1], CENTER - pt[0])
            v_len = 15
            for sign in [-1, 1]:
                ex = pt[0] + v_len * math.cos(angle_to_center + sign * 0.4)
                ey = pt[1] + v_len * math.sin(angle_to_center + sign * 0.4)
                draw.line([pt, (ex, ey)], fill='black', width=THIN_LINE)
    elif detail_choice == 2:
        # Crescent at top
        crescent_y = CENTER - inner_radius - 20
        draw_crescent(draw, CENTER, crescent_y, 15, -math.pi / 2, THIN_LINE)
    
    # --- Layer 11: Outer decorative elements ---
    if hv[31] % 2 == 0:
        # Small squares at cardinal points
        sq_dist = outer_radius + 12
        sq_size = 5
        for i in range(4):
            angle = math.pi / 4 + (math.pi / 2 * i)
            sx = CENTER + sq_dist * math.cos(angle)
            sy = CENTER + sq_dist * math.sin(angle)
            draw.rectangle([sx - sq_size, sy - sq_size, sx + sq_size, sy + sq_size], outline='black', width=THIN_LINE)
    
    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    generated = []
    skipped = []
    
    for daemon_id in DAEMONS_NEEDING_SIGILS:
        output_path = os.path.join(OUTPUT_DIR, f'{daemon_id}.png')
        
        if os.path.exists(output_path):
            skipped.append(daemon_id)
            continue
        
        img = generate_sigil(daemon_id)
        img.save(output_path, 'PNG')
        generated.append(daemon_id)
        print(f'  ✓ Generated: {daemon_id}.png')
    
    print(f'\nDone! Generated {len(generated)} sigils, skipped {len(skipped)} (already exist).')
    if skipped:
        print(f'  Skipped: {", ".join(skipped)}')


if __name__ == '__main__':
    main()
