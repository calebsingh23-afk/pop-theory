# Verification

Tests were run with Playwright using installed Microsoft Edge in headless mode on Windows. They are desktop browser emulations, not physical-device tests.

| Area | Status | Evidence |
| --- | --- | --- |
| Production build | Passed | `npm run build` prepared `dist/` |
| JavaScript syntax | Passed | `npm run check` |
| Responsive widths | Passed | 1440×1000, 768×1024, 390×844, 320×568, 844×390; no horizontal document overflow |
| Flavor selection | Passed | All three radios changed image source and displayed decoded artwork at each size |
| Keyboard flavor selection | Passed | ArrowDown changed the selected native radio |
| Mobile menu | Passed | Toggle state, Escape closing, and trigger focus restoration at 390px and 320px |
| Skip animation | Passed | Pointer click reached the selector and focused its section at all five sizes |
| Scroll changes | Passed | Jumps, reverse movement, and reload partway down the page; desktop product transform updated |
| Reduced motion | Passed | Live preference changes removed and restored the animation layout |
| Failed story media | Passed, simulated | Synthetic image error removed the pinned travel while retaining HTML content |
| No JavaScript | Passed | Product poster, offer, flavor fallback descriptions, and normal-flow story visible |
| Cold-load media requests | Passed | Local HTTP cold load requested only the citrus can and citrus slice artwork; no video, external fonts, or other flavor SVGs requested |
| Missing assets | Passed | No HTTP responses >=400 in the cold-load check |
| Runtime errors | Passed | No page errors in the responsive browser suite |
| Real devices / mobile Safari | Not tested | No physical iOS or Android device used |
| Screen reader / full WCAG audit | Not tested | Semantic controls and automated focus checks do not establish full conformance |
| Slow physical scrolling / interrupted touch gestures | Not tested | Programmatic jump/reverse checks only |
| Performance scores | Not measured | No Lighthouse, real-user, or timing claims |

## Media footprint

Original SVG source sizes: citrus can 2,428 bytes; citrus slice 467 bytes; berry can 2,433 bytes; pear can 2,427 bytes. The initial product artwork consists of the citrus can and slice: 2,895 unique uncompressed source bytes. HTTP headers, repeat request behavior, compression, and browser rasterization overhead are separate and not included in that number.

Initial animation media transfer: 0 bytes of video/sequence media. The ordinary SVG assets and animation JavaScript still load. Full image sequence size: not applicable. Decoded sequence cache: not applicable; no frame cache exists. Browser-managed SVG raster memory was not measured.

Desktop and mobile full-page screenshots were captured after the checks. Sticky sections in full-page screenshots may show more background than is visible during ordinary scrolling. File-based browser checks and a separate local HTTP request check were both used because sandbox networking initially blocked the preview server.
