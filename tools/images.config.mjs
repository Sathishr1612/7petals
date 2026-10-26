// Image manifest: every website photograph, its source in the client documents, and its gallery metadata.
//
// Source prefixes (resolved by build-images.mjs):
//   E:<file>   assets/images/7petals-projects/<file>   (curated project photos already in the repo)
//   N:<n>      tools/.cache/newppt/image<n>.*           ("NEW PPT -7 PETALS HORTI.pptx" embedded media)
//   H:<file>   tools/.cache/hard/<file>                 ("7 Petals -Hardscape PRESENTATION.pdf" page images, pNN_k)
//   P:<file>   tools/.cache/prof/<file>                 ("Company Profile - 7 Petals (1).pdf" page images)
//
// cat:  hardscape | softscape | landscape | vertical | terrace | transplant | nursery
// proj: project slug (see data/projects.mjs) or '' for work shown without client attribution
// opts: { rotate: degrees }
// Captions only name a client/project where the source deck labels it (slide title or logo slide).

export const IMAGES = [
  // ---- Hero & homepage features ------------------------------------------------------------
  ['hero-courtyard', 'N:70', 'landscape', '', 'Courtyard landscape', 'Sandstone-paved courtyard with turf panels and flower beds in front of a stone-clad building'],

  ['bg-leaves', 'A:mvv-bg.jpg', 'bg', '', 'Leaf texture', 'Dark green foliage with soft golden light', {}],

  // ---- Rustomjee Crown ---------------------------------------------------------------------
  ['crown-podium', 'E:rustomjee-crown-apart.webp', 'landscape', 'rustomjee-crown', 'Podium landscape', 'Podium landscape at Rustomjee Crown with sculpted stone forms, lawn and stepping-stone paths below residential towers'],
  ['crown-stones', 'E:rustomjee-crown-apartment.webp', 'hardscape', 'rustomjee-crown', 'Sculpted stone seating', 'Layered stone seating steps set into a sculpted podium landscape at Rustomjee Crown'],
  ['crown-lawn', 'E:rustomjee-crown-design.webp', 'softscape', 'rustomjee-crown', 'Lawn and stepping stones', 'Turf lawn with stone stepping pads around a sculpted stone seat at Rustomjee Crown'],
  ['crown-pool', 'E:rustomjee-crown-water.webp', 'landscape', 'rustomjee-crown', 'Pool with planted island', 'Blue-tiled pool with a planted island and a frangipani tree at Rustomjee Crown'],
  ['crown-works', 'N:19', 'hardscape', 'rustomjee-crown', 'Podium works in progress', 'Landscape and civil finishing works in progress on the Rustomjee Crown podium'],

  // ---- Rustomjee Paramount, Khar -----------------------------------------------------------
  ['khar-bench', 'E:rustomjee.webp', 'terrace', 'rustomjee-paramount-khar', 'Terrace planter with timber bench', 'Terrace planter with built-in timber bench and polished stone paving at Rustomjee Paramount, Khar'],
  ['khar-planters', 'E:rustomjee-khar.webp', 'terrace', 'rustomjee-paramount-khar', 'Flowering planters on stone terrace', 'Planters with purple flowering shrubs along a stone-paved terrace at Rustomjee Paramount, Khar'],
  ['khar-wall', 'E:rustomjee-khar-design.webp', 'hardscape', 'rustomjee-paramount-khar', 'Feature wall with planting niches', 'Dark textured feature wall with circular planting niches above stone paving at Rustomjee Paramount, Khar'],
  ['khar-tree', 'E:rustomjee-khar-tree.webp', 'terrace', 'rustomjee-paramount-khar', 'Metal tree wall planter', 'Black metal tree sculpture holding potted plants on a terrace wall at Rustomjee Paramount, Khar'],

  // ---- G Corp Tech Park, Thane -------------------------------------------------------------
  ['gcorp-walk', 'E:garden-office-place.webp', 'landscape', 'g-corp-tech-park', 'Walkway with pergola and hedge', 'Stone walkway with a steel pergola and dense green hedge at G Corp Tech Park, Thane'],
  ['gcorp-deck', 'N:37', 'hardscape', 'g-corp-tech-park', 'Timber deck under canopy', 'Timber decking beneath a curved canopy with planting beds at G Corp Tech Park, Thane'],
  ['gcorp-lawn', 'N:39', 'softscape', 'g-corp-tech-park', 'Open lawn', 'Open turf lawn framed by mature trees at G Corp Tech Park, Thane'],
  ['gcorp-trees', 'N:43', 'softscape', 'g-corp-tech-park', 'Stone path through trees', 'Stone-paved path through planted trees at G Corp Tech Park, Thane'],
  ['gcorp-paver-road', 'H:p31_2.jpg', 'hardscape', 'g-corp-tech-park', 'Paver block road', 'Completed paver block road with kerb stones at G Corp Tech Park, Thane'],
  ['gcorp-paver-laying', 'H:p30_1.jpg', 'hardscape', 'g-corp-tech-park', 'Paver block laying', 'Paver block road being laid beside the office buildings at G Corp Tech Park, Thane'],
  ['gcorp-kerb', 'H:p31_1.jpg', 'hardscape', 'g-corp-tech-park', 'Kerb stone and paver works', 'Kerb stone and paver block works in progress at G Corp Tech Park, Thane'],

  // ---- Godrej The Trees, Vikhroli ----------------------------------------------------------
  ['trees-pond', 'E:godrej-tree-hero.jpg', 'landscape', 'godrej-the-trees', 'Reflecting pond and sculpture', 'Reflecting pond with a pouring-vessel sculpture framed by trees at Godrej The Trees'],
  ['trees-bench', 'E:garden-place.webp', 'hardscape', 'godrej-the-trees', 'Granite seating in the beer garden', 'Curved black granite bench set in tropical planting in the beer garden at Godrej The Trees'],
  ['trees-blossom', 'E:garden-projects-office.webp', 'softscape', 'godrej-the-trees', 'Flowering trees and clipped hedge', 'Flowering crape-myrtle trees above a clipped hedge beside a paved path at Godrej The Trees'],
  ['trees-lawn', 'N:45', 'softscape', 'godrej-the-trees', 'Lawn with stepping-stone panels', 'Courtyard lawn with large stone stepping panels beside residential towers at Godrej The Trees'],
  ['trees-paving', 'N:40', 'hardscape', 'godrej-the-trees', 'Stone paving with turf joints', 'Stone paving with turf joints and planting beside a glass-fronted building at Godrej The Trees'],
  ['trees-court', 'N:44', 'landscape', 'godrej-the-trees', 'Central courtyard planting', 'Courtyard garden with mixed tree and shrub planting between residential buildings at Godrej The Trees'],

  // ---- Piramal Vaikunth --------------------------------------------------------------------
  ['vaikunth-flowers', 'E:piramal-vaikunth.webp', 'softscape', 'piramal-vaikunth', 'Flower show display', 'Marigold and seasonal flower beds with white gravel paths at a flower show at Piramal Vaikunth'],
  ['vaikunth-flags', 'E:piraml-garden.webp', 'softscape', 'piramal-vaikunth', 'Cordyline beds along the entrance walk', 'Red-leaved cordyline and mixed shrub beds along a paved walkway with flags at Piramal Vaikunth'],
  ['vaikunth-entrance', 'N:58', 'landscape', 'piramal-vaikunth', 'Entrance signage planting', 'Flower bed around the Piramal Vaikunth entrance sign with a cobble-paved driveway'],
  ['vaikunth-clubhouse', 'N:60', 'landscape', 'piramal-vaikunth', 'Clubhouse entrance', 'Landscaped approach and lawn at the clubhouse entrance of Piramal Vaikunth'],
  ['vaikunth-avenue', 'N:63', 'hardscape', 'piramal-vaikunth', 'Cobble-paved avenue', 'Granite cobble-paved avenue lined with plants and flags at Piramal Vaikunth'],
  ['vaikunth-roundabout', 'N:64', 'softscape', 'piramal-vaikunth', 'Flower circle', 'Circular flower bed beside a paved road at Piramal Vaikunth'],

  // ---- Oberoi Enigma, Mulund ---------------------------------------------------------------
  ['oberoi-aerial', 'N:49', 'landscape', 'oberoi-enigma-mulund', 'Pool courtyard from above', 'Aerial view of a landscaped pool courtyard with paths and planting at Oberoi Enigma, Mulund'],
  ['oberoi-pergola', 'N:50', 'landscape', 'oberoi-enigma-mulund', 'Pergola walkway', 'Steel pergola walkway with ornamental planting at Oberoi Enigma, Mulund'],

  // ---- Nirlon, Goregaon --------------------------------------------------------------------
  ['nirlon-walkway', 'N:52', 'landscape', 'nirlon-goregaon', 'Planted walkway from above', 'Elevated view of a planted walkway beside railings at Nirlon, Goregaon'],
  ['nirlon-grasses', 'N:57', 'softscape', 'nirlon-goregaon', 'Ornamental grass planting', 'Ornamental grass and shrub planting on a landscaped deck at Nirlon, Goregaon'],
  ['nirlon-terrace', 'N:51', 'softscape', 'nirlon-goregaon', 'Planting along the terrace', 'Planted terrace edge with ornamental grasses at Nirlon, Goregaon'],

  // ---- Godrej & Boyce Factory, Khalapur ----------------------------------------------------
  ['khalapur-bed', 'N:55', 'softscape', 'godrej-boyce-khalapur', 'Curved foliage bed', 'Curved bed of red and green foliage plants edged with kerb stones at the Godrej & Boyce factory, Khalapur'],
  ['khalapur-road', 'N:53', 'softscape', 'godrej-boyce-khalapur', 'Plantation beside the road', 'Plantation bed and palms beside an internal road at the Godrej & Boyce factory, Khalapur'],

  // ---- Godrej Urban Farm -------------------------------------------------------------------
  ['urbanfarm-beds', 'N:54', 'landscape', 'godrej-urban-farm', 'Raised planter beds', 'Raised timber planter beds with stepping-stone paths and lawn at the Godrej urban farm'],

  // ---- Ambedkar Garden, Seawoods (NMMC) ----------------------------------------------------
  ['seawoods-path', 'E:garden-park.webp', 'landscape', 'seawoods-ambedkar-garden', 'Red EPDM jogging path', 'Red EPDM path curving through lawns and palms at Ambedkar Garden, Seawoods'],
  ['seawoods-promenade', 'N:71', 'landscape', 'seawoods-ambedkar-garden', 'Promenade with palms', 'Paved and red EPDM promenade lined with palms at Ambedkar Garden, Seawoods'],
  ['seawoods-lawn', 'N:72', 'softscape', 'seawoods-ambedkar-garden', 'Open lawn with colourful seating', 'Wide lawn with a colourful tiled seating platform at Ambedkar Garden, Seawoods'],
  ['seawoods-gazebo', 'N:73', 'landscape', 'seawoods-ambedkar-garden', 'Lawn and gazebo', 'Lawn with a gazebo and tiered seating at Ambedkar Garden, Seawoods'],
  ['seawoods-epdm', 'H:p08_1.jpg', 'hardscape', 'seawoods-ambedkar-garden', 'EPDM pathway with kerb', 'Red EPDM pathway with kerb edging through planting at Ambedkar Garden, Seawoods'],
  ['seawoods-platform', 'H:p11_1.jpg', 'hardscape', 'seawoods-ambedkar-garden', 'Seating platform', 'Raised seating platform with colourful tile facing at Ambedkar Garden, Seawoods'],

  // ---- Kilbill Bungalow --------------------------------------------------------------------
  ['kilbill-garden', 'E:kilbill-bungalow.webp', 'landscape', 'kilbill-bungalow', 'Gravel court with mature tree', 'Garden court with white gravel circle, rock and raised red-finished planters under a mature tree at Kilbill Bungalow'],
  ['kilbill-drive', 'H:p16_1.jpg', 'hardscape', 'kilbill-bungalow', 'Paver driveway and masonry', 'Herringbone paver driveway with red-finished masonry planter edging at Kilbill Bungalow'],
  ['kilbill-path', 'H:p17_1.jpg', 'hardscape', 'kilbill-bungalow', 'Trimix path and lawn', 'Red trimix path with stone-edged lawn at Kilbill Bungalow'],
  ['kilbill-tree', 'H:p15_1.jpg', 'hardscape', 'kilbill-bungalow', 'Trimix pathway and masonry', 'Trimix pathway curving under a mature tree with masonry planters at Kilbill Bungalow'],

  // ---- Hardscape (Hardscape presentation; work shown without client attribution) -----------
  ['hs-grass-paver', 'H:p05_1.jpg', 'hardscape', '', 'Grass paver', 'River-stone grass paver surface with grass growing between stones'],
  ['hs-stamped-path', 'H:p09_1.jpg', 'hardscape', '', 'Stamped pathway', 'Stamped concrete pathway with planted edges'],
  ['hs-water-body', 'E:house-design.webp', 'hardscape', '', 'Water body with RCC bridge', 'Constructed rock water body with a rustic railed bridge and gazebo, built in RCC with fabrication and electrical works'],
  ['hs-sitting-tree', 'H:p13_1.jpg', 'hardscape', '', 'Seating platform around a tree', 'Circular stone seating platform built around a mature tree'],
  ['hs-skating-rink', 'H:p12_1.jpg', 'hardscape', '', 'Skating rink with railing', 'Coloured EPDM skating rink with steel railing'],
  ['hs-gazebo-bridge', 'H:p12_2.jpg', 'hardscape', '', 'Stone steps and gazebo', 'Rustic stone steps leading to a gazebo in a landscaped garden'],
  ['hs-play-epdm', 'H:p19_1.jpg', 'hardscape', '', 'EPDM play area', 'Green EPDM play surface with play equipment between residential towers'],
  ['hs-play-colour', 'H:p22_1.jpg', 'hardscape', '', 'Coloured EPDM playground', 'Bright coloured EPDM playground surface with play structure'],
  ['hs-epdm-trellis', 'H:p21_1.jpg', 'hardscape', '', 'EPDM pathway and trellis', 'EPDM pathway beside a green lattice trellis fence'],
  ['hs-granite-ledge', 'H:p23_1.jpg', 'hardscape', '', 'Granite seating and kerb', 'Granite faced seating ledge beside an EPDM pathway'],
  ['hs-pergola-seat', 'H:p24_1.jpg', 'hardscape', '', 'Pergola and seating', 'Green steel pergola with benches on a paved base'],
  ['hs-led-path', 'H:p24_2.jpg', 'hardscape', '', 'Lit pathway at night', 'Pathway with EPDM and stamped finish lit by pole lights at night'],
  ['hs-led-seat', 'H:p25_1.jpg', 'hardscape', '', 'LED-lit seating', 'Curved seating wall with warm LED lighting at night'],
  ['hs-court-fence', 'H:p26_2.jpg', 'hardscape', '', 'Play court with MS fencing', 'Marked sports court enclosed by mild steel fencing'],
  ['hs-court-shelter', 'H:p27_1.jpg', 'hardscape', '', 'Shelter beside the play court', 'Covered seating shelter with lattice walls beside a sports court'],

  // ---- Terrace gardens ---------------------------------------------------------------------
  ['terrace-top', 'N:77', 'terrace', '', 'Terrace seating deck', 'Top view of a terrace garden with timber deck, lounge chairs, stepping stones and planting'],
  ['terrace-night', 'N:78', 'terrace', '', 'Terrace pergola at night', 'Lit terrace garden with a timber pergola, deck and lawn at dusk'],
  ['terrace-lawn', 'N:79', 'terrace', '', 'Terrace lawn and seating', 'Terrace garden with lawn, stepping stones and built-in seating lit at dusk'],
  ['terrace-lounge', 'N:80', 'terrace', '', 'Terrace lounge with planting', 'Terrace lounge with uplit planters and timber flooring at sunset'],

  // ---- Vertical gardens --------------------------------------------------------------------
  ['vg-install', 'N:81', 'vertical', '', 'Vertical garden installation', 'Team members inspecting a freshly planted vertical garden wall'],
  ['vg-wall-tall', 'N:83', 'vertical', '', 'Mixed-foliage green wall', 'Tall vertical garden wall planted with mixed foliage in several colours'],
  ['vg-wall-long', 'N:84', 'vertical', '', 'Long green wall', 'Long vertical garden wall along a building facade'],
  ['vg-wall-corner', 'N:85', 'vertical', '', 'Green wall in patterned sections', 'Vertical garden wall planted in contrasting patterned sections'],
  ['vg-wall-bamboo', 'N:86', 'vertical', '', 'Green wall with flowering border', 'Dense vertical garden with red flowering plants at its base'],
  ['vg-terrace', 'N:82', 'vertical', '', 'Green wall beside a pergola', 'Vertical garden beside a timber pergola on a terrace'],

  // ---- Tree transplantation ----------------------------------------------------------------
  ['tt-crane', 'N:87', 'transplant', '', 'Mature tree lifted by crane', 'Mature tree with root ball being lifted by a crane at a site'],
  ['tt-lift', 'N:88', 'transplant', '', 'Tree transplantation near an industrial site', 'Tree held by a crane for relocation beside an industrial site'],
  ['tt-building', 'N:91', 'transplant', '', 'Tree replanted on a building', 'Tree being placed on a building level using scaffolding'],
  ['tt-team', 'N:92', 'transplant', '', 'Team guiding a tree', 'Workers guiding a mature tree during relocation beside a glass-fronted building'],
  ['tt-palm', 'N:93', 'transplant', '', 'Palm relocation', 'Palm being lifted by a crane for relocation near an industrial building'],

  // ---- Irrigation, nursery & general -------------------------------------------------------
  ['irrigation-lawn', 'N:95', 'nursery', '', 'Sprinkler irrigation on lawn', 'Sprinkler watering a turf lawn around palm trees with circular tree guards', { rotate: 270 }],
  ['nursery-stock', 'E:nursery.webp', 'nursery', '', 'Nursery plant stock', 'Rows of potted Aglaonema plants growing under a polyhouse in the plant nursery'],
  ['nursery-farm', 'N:97', 'nursery', '', 'Karjat nursery and farm', 'Polyhouses, flowering shrubs and a footbridge at the nursery farm near Karjat'],
  ['garden-flowers', 'E:garden-projects-flowers.webp', 'softscape', '', 'Seasonal flower beds', 'Mass seasonal flower planting beside a paved path under a colourful canopy'],
  ['garden-river', 'N:66', 'landscape', '', 'Riverfront promenade garden', 'Aerial view of a riverfront promenade garden with lawns, paths and play area'],
  ['garden-sandstone', 'N:69', 'landscape', '', 'Sandstone court garden', 'Courtyard garden with sandstone paving panels, turf and flower beds'],
  ['garden-bungalow', 'N:61', 'softscape', '', 'Bungalow lawn and seating', 'Lawn with seating and a frangipani tree in front of a bungalow'],
];
