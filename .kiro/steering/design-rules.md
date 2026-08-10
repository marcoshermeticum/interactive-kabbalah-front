# Design Rules

Rules and conventions for the Interactive Kabbalah front-end. These must be followed in all implementations.

## Logo / Brand Image (mrviniciux.png)

The project logo (`public/mrviniciux.png`) has a non-square aspect ratio (1536×1024, ratio 3:2). It features geometric golden lines on a transparent background.

**Rule: Never force both width and height on this image.** Always fix one dimension and let the other scale automatically to preserve the original proportions.

### Correct usage

```html
<!-- Fix height, auto width -->
<img src="/mrviniciux.png" className="h-12 w-auto" />

<!-- With object-contain as safety net -->
<img src="/mrviniciux.png" className="h-8 w-auto object-contain" />
```

### Incorrect usage

```html
<!-- WRONG: forces square, distorts the image -->
<img src="/mrviniciux.png" className="w-12 h-12" />

<!-- WRONG: both dimensions fixed to different values -->
<img src="/mrviniciux.png" className="w-16 h-10" />
```

### Current placements

| Location | File | Classes |
|----------|------|---------|
| Loading screen | `src/app/[locale]/page.tsx` | `h-16 w-auto` |
| Navbar brand | `src/components/Navbar/Navbar.tsx` | `h-7 sm:h-8 w-auto object-contain` |
| Vakinha Campaign Dialog | `src/components/Notifications/VakinhaCampaignDialog.tsx` | `h-12 w-auto` |

### Favicon

For favicon usage, the image is placed inside a square canvas with transparent padding to avoid browser distortion. Pre-generated versions live at:
- `public/favicon-32.png` (32×32 square with centered logo)
- `public/favicon-192.png` (192×192 square with centered logo)

## Tree Initial View

When the page loads, the Tree of Life must appear **fully visible** with all sephirots (Kether to Malkuth) on screen:
- **Desktop**: centered horizontally and vertically within the viewport
- **Mobile**: aligned near the top with minimal padding, all sephirots visible

The `fitToViewport()` function in `DraggableArea.tsx` handles this. The content div inside DraggableArea must have `position: absolute` to prevent the tree's natural height from expanding the container beyond viewport bounds.
