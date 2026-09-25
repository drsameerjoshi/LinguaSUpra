## Goal

Replace every photo of Sujata on the landing page with newly generated, face-consistent, photorealistic images built from the 10 reference shots just uploaded, then check each placement on desktop, tablet and mobile.

## Shared rules applied to every generation

- Face derived from the uploaded reference photos (edit-from-reference, not text-only) so identity stays identical across all 11 images.
- No earrings anywhere.
- Hair neat, smooth, elegantly styled - never puffy or flyaway.
- Expression tuned per scenario.
- Photorealistic, premium editorial lighting, brand-consistent neutral/navy palette.
- Horizontal framing everywhere except the hero cutout.

## Images to produce

1. **Hero** - standing, confident, tailored blazer and crisp shirt, warm welcoming look to camera, isolated subject on a transparent PNG so it sits over the brand colour block. Replaces `sujata-hero.webp`.
2. **About** - horizontal, teaching at a whiteboard in a training room, marker in hand, whiteboard carrying legible business-English coaching content, engaging expression. Replaces `sujata-about.jpg`.
3. **Programmes 1-8** - all eight regenerated horizontally with Sujata plus learners in realistic training scenes, matched to each card: meetings, presentations, negotiations, business writing, leadership, cross-cultural, vocabulary, interviews. Sujata is present and active, not the sole subject.
4. **Footer** - horizontal, forward-moving aspirational shot (corridor / staircase / glass-walled office), sharp power suit, confident inspiring expression. Replaces `footer-career.jpg`.

## Technical notes

- Generation uses the image-edit path with the uploaded references as face anchors; each output is reviewed and regenerated if the likeness, earrings or hair rule slips.
- Hero ships as a transparent PNG; all others as JPG.
- Large files go to CDN asset pointers (`.asset.json`) the way the current hero/about/footer images already work; the eight programme images stay as direct imports in `Programmes.tsx` (same filenames, so no code change needed there) or move to pointers if size warrants.
- Hero markup may need a small tweak so the transparent cutout sits cleanly on the brand background instead of the current rounded photo treatment.
- Final pass: render the page at desktop, tablet and mobile widths and confirm crop, focal point and aspect ratios inside every placeholder.

## Note

Eleven high-fidelity generations plus review passes is a long run; likeness may need one or two retries per image.
