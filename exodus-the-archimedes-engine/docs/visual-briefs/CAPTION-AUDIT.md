# Illustration caption audit

Every infobox image must be checked **by eye**. `check-images.mjs` verifies that a file exists and
is non-blank; it cannot read what is drawn or written inside a JPEG, so nothing here is automatable.

## What counts as a failure

1. **Any burned-in text** — caption bars, name plates, ranks, house names, service numbers, dates,
   watermarks. The briefs already specify "no text, no watermark, no UI chrome". Text inside an
   image is invented canon that no check can catch and no edit can correct without regenerating the
   asset.
2. **Clade contradictions** — a body plan that disagrees with the wiki: Heresy Celestials are
   "close to three metres tall with spindly six-limb builds (two legs, four arms)"; Imperial
   Celestials are tall elegant humanoids with bloodstone court fashion; Uranics are fully human in
   scale.
3. **Franchise art resemblance** — anything that reads as reproduced official EXODUS marketing art
   rather than an original illustration.

Mark the box once checked. Record the verdict inline so a later pass does not repeat the work.

**Progress: 6 of 44 reviewed · 2 confirmed failures.**

| ✓ | Slug | Kind | Links | Verdict |
|---|------|------|-------|---------|
| [x] | `acelynn` | character | [image](../../assets/images/characters/acelynn.jpg) · [page](../../pages/characters/acelynn.html) | **PASS** — No caption. Celestial court grammar reads correctly. |
| [ ] | `andino` | character | [image](../../assets/images/characters/andino.jpg) · [page](../../pages/characters/andino.html) |  |
| [ ] | `asahi-iryna` | character | [image](../../assets/images/characters/asahi-iryna.jpg) · [page](../../pages/characters/asahi-iryna.html) |  |
| [ ] | `avone-valerio` | character | [image](../../assets/images/characters/avone-valerio.jpg) · [page](../../pages/characters/avone-valerio.html) |  |
| [ ] | `bekket` | character | [image](../../assets/images/characters/bekket.jpg) · [page](../../pages/characters/bekket.html) |  |
| [ ] | `carolien-amaia` | character | [image](../../assets/images/characters/carolien-amaia.jpg) · [page](../../pages/characters/carolien-amaia.html) |  |
| [ ] | `clavissa` | character | [image](../../assets/images/characters/clavissa.jpg) · [page](../../pages/characters/clavissa.html) |  |
| [ ] | `dagon` | character | [image](../../assets/images/characters/dagon.jpg) · [page](../../pages/characters/dagon.html) |  |
| [ ] | `dejean` | character | [image](../../assets/images/characters/dejean.jpg) · [page](../../pages/characters/dejean.html) |  |
| [ ] | `eleanor-aponi` | character | [image](../../assets/images/characters/eleanor-aponi.jpg) · [page](../../pages/characters/eleanor-aponi.html) |  |
| [ ] | `elsbeth-mcquillan` | character | [image](../../assets/images/characters/elsbeth-mcquillan.jpg) · [page](../../pages/characters/elsbeth-mcquillan.html) |  |
| [x] | `finn-jalgori-tobu` | character | [image](../../assets/images/characters/finn-jalgori-tobu.jpg) · [page](../../pages/characters/finn-jalgori-tobu.html) | **FAIL** — Caption bar: *JALGORI-TOBU, Finn — Uranic House Minor, 3rd Scion, Active Field Service 2784.4*. `House Minor`, `Scion`, `Active Field Service`, `2784` — 0 wiki hits each. |
| [x] | `gyvoy-enfoe` | character | [image](../../assets/images/characters/gyvoy-enfoe.jpg) · [page](../../pages/characters/gyvoy-enfoe.html) | **PASS** — No caption. Minor: holographic panel with pseudo-glyphs and a `%`, against the brief's "no UI chrome". |
| [ ] | `helena-chione` | character | [image](../../assets/images/characters/helena-chione.jpg) · [page](../../pages/characters/helena-chione.html) |  |
| [ ] | `inessa-pierina` | character | [image](../../assets/images/characters/inessa-pierina.jpg) · [page](../../pages/characters/inessa-pierina.html) |  |
| [ ] | `josias-aponi` | character | [image](../../assets/images/characters/josias-aponi.jpg) · [page](../../pages/characters/josias-aponi.html) |  |
| [ ] | `liliana` | character | [image](../../assets/images/characters/liliana.jpg) · [page](../../pages/characters/liliana.html) |  |
| [ ] | `lord-gahiji` | character | [image](../../assets/images/characters/lord-gahiji.jpg) · [page](../../pages/characters/lord-gahiji.html) |  |
| [ ] | `lord-jolav` | character | [image](../../assets/images/characters/lord-jolav.jpg) · [page](../../pages/characters/lord-jolav.html) |  |
| [ ] | `luus` | character | [image](../../assets/images/characters/luus.jpg) · [page](../../pages/characters/luus.html) |  |
| [ ] | `makaio` | character | [image](../../assets/images/characters/makaio.jpg) · [page](../../pages/characters/makaio.html) |  |
| [ ] | `malquilvo` | character | [image](../../assets/images/characters/malquilvo.jpg) · [page](../../pages/characters/malquilvo.html) |  |
| [ ] | `marcellu` | character | [image](../../assets/images/characters/marcellu.jpg) · [page](../../pages/characters/marcellu.html) |  |
| [ ] | `medusa` | character | [image](../../assets/images/characters/medusa.jpg) · [page](../../pages/characters/medusa.html) |  |
| [ ] | `neusch` | character | [image](../../assets/images/characters/neusch.jpg) · [page](../../pages/characters/neusch.html) |  |
| [x] | `olomo` | character | [image](../../assets/images/characters/olomo.jpg) · [page](../../pages/characters/olomo.html) | **QUERY** — No caption. Limb count appears to exceed the four arms `heresy-dominion.html` specifies — worth a second look. |
| [ ] | `otylia-jalgori-tobu` | character | [image](../../assets/images/characters/otylia-jalgori-tobu.jpg) · [page](../../pages/characters/otylia-jalgori-tobu.html) |  |
| [ ] | `radwarno` | character | [image](../../assets/images/characters/radwarno.jpg) · [page](../../pages/characters/radwarno.html) |  |
| [ ] | `ramona-ursule` | character | [image](../../assets/images/characters/ramona-ursule.jpg) · [page](../../pages/characters/ramona-ursule.html) |  |
| [ ] | `sahdiah` | character | [image](../../assets/images/characters/sahdiah.jpg) · [page](../../pages/characters/sahdiah.html) |  |
| [ ] | `siskala` | character | [image](../../assets/images/characters/siskala.jpg) · [page](../../pages/characters/siskala.html) |  |
| [ ] | `stethos-thierry` | character | [image](../../assets/images/characters/stethos-thierry.jpg) · [page](../../pages/characters/stethos-thierry.html) |  |
| [ ] | `terence-wilson-fletcher` | character | [image](../../assets/images/characters/terence-wilson-fletcher.jpg) · [page](../../pages/characters/terence-wilson-fletcher.html) |  |
| [x] | `thyra` | character | [image](../../assets/images/characters/thyra.jpg) · [page](../../pages/characters/thyra.html) | **FAIL** — Caption bar: *Thyra as Helena-Thyra, Imperial Celestial Usurper Queen, c. 478 Post-Collapse*. `Post-Collapse`, `478`, `Usurper Queen` — 0 wiki hits each. |
| [ ] | `tose` | character | [image](../../assets/images/characters/tose.jpg) · [page](../../pages/characters/tose.html) |  |
| [ ] | `uulana` | character | [image](../../assets/images/characters/uulana.jpg) · [page](../../pages/characters/uulana.html) |  |
| [ ] | `valdier` | character | [image](../../assets/images/characters/valdier.jpg) · [page](../../pages/characters/valdier.html) |  |
| [ ] | `zelinda-jalgori-tobu` | character | [image](../../assets/images/characters/zelinda-jalgori-tobu.jpg) · [page](../../pages/characters/zelinda-jalgori-tobu.html) |  |
| [ ] | `zuberi-dulcina` | character | [image](../../assets/images/characters/zuberi-dulcina.jpg) · [page](../../pages/characters/zuberi-dulcina.html) |  |
| [ ] | `alumata` | ship | [image](../../assets/images/ships/alumata.jpg) · [page](../../pages/locations/alumata.html) |  |
| [ ] | `arcadias-moon` | ship | [image](../../assets/images/ships/arcadias-moon.jpg) · [page](../../pages/locations/arcadias-moon.html) |  |
| [x] | `arkship-diligent` | ship | [image](../../assets/images/ships/arkship-diligent.jpg) · [page](../../pages/locations/arkship-diligent.html) | **PASS** — No caption. Reads as a city-scale generation arkship. |
| [ ] | `cybeles-eagle` | ship | [image](../../assets/images/ships/cybeles-eagle.jpg) · [page](../../pages/locations/cybeles-eagle.html) |  |
| [ ] | `lestari` | ship | [image](../../assets/images/ships/lestari.jpg) · [page](../../pages/locations/lestari.html) |  |

## Fixing a failure

Regenerate the asset from its brief in `docs/visual-briefs/<slug>.md`, strengthening the negative
prompt ("no text, no caption, no name plate, no lettering, no watermark"), then drop the new file at
the same path. No markup changes are needed — `inject-infobox-images.mjs` is idempotent and the
`<img>` already points at the right filename. Re-run all three checks afterwards.

Reader-facing provenance for the illustrations lives on `pages/sources.html` under "Reconstructed,
not canon"; it does not need updating per image.
