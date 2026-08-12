import images from "./productImages";

/**
 * Local catalog used to seed Supabase (see supabase/schema.sql + README)
 * and as an offline fallback so the storefront still renders products
 * even before a database is connected.
 */
const PRODUCTS = [
  {
    id: "kids-tbar-buckle",
    name: "Classic Buckle T-Bar Sandals (Kids)",
    category: "Kids",
    price: 9500,
    image: images["im1.jpg"],
    description:
      "A sturdy, easy-buckle T-bar sandal for little feet, cut from soft leatherette with a cushioned sole for all-day play. Available in brown and black.",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
  },
  {
    id: "croc-slingback-black",
    name: "Croc-Embossed Slingback Heels — Black",
    category: "Heels",
    price: 24000,
    image: images["im2.jpg"],
    description:
      "A pointed-toe slingback in croc-embossed faux leather, finished with a slim ankle strap and a comfortable mid heel. Dresses up any outfit.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "croc-slingback-nude",
    name: "Croc-Embossed Slingback Heels — Nude",
    category: "Heels",
    price: 24000,
    image: images["im3.jpg"],
    description:
      "The same sharp, pointed-toe slingback silhouette in a versatile nude that pairs with everything from denim to evening wear.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "croc-slingback-wine",
    name: "Croc-Embossed Slingback Heels — Wine",
    category: "Heels",
    price: 24000,
    image: images["im4.jpg"],
    description:
      "A rich wine colourway of our signature slingback — croc-embossed texture, pointed toe, and a heel height built for comfort.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "croc-slingback-white",
    name: "Croc-Embossed Slingback Heels — White",
    category: "Heels",
    price: 24000,
    image: images["im5.jpg"],
    description:
      "Crisp white croc-embossed slingbacks — the clean, statement pair for bridal parties, graduations and warm-weather dressing.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "crosswrap-kitten-white",
    name: "Crosswrap Kitten Heels — White",
    category: "Heels",
    price: 19500,
    image: images["im6.jpg"],
    description:
      "Crisscross ankle straps and a low kitten heel make this pointed-toe pair an easy everyday-to-evening switch.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "crosswrap-kitten-nude",
    name: "Crosswrap Kitten Heels — Nude",
    category: "Heels",
    price: 19500,
    image: images["im7.jpg"],
    description:
      "Snakeskin-textured nude leatherette with crisscross ankle straps and a walkable kitten heel.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "crosswrap-kitten-wine",
    name: "Crosswrap Kitten Heels — Wine",
    category: "Heels",
    price: 19500,
    image: images["im8.jpg"],
    description:
      "A deep wine take on our crosswrap kitten heel — textured finish, adjustable buckle strap, comfortable low heel.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "sunburst-wedge-white",
    name: "Sunburst Cutout Wedge Mules — White",
    category: "Wedges",
    price: 17000,
    image: images["im9.jpg"],
    description:
      "Laser-cut sunburst detailing on a scalloped upper, set on a stacked wedge for height without the ache.",
    sizes: ["37", "38", "39", "40", "41"],
  },
  {
    id: "sunburst-wedge-black",
    name: "Sunburst Cutout Wedge Mules — Black",
    category: "Wedges",
    price: 17000,
    image: images["im10.jpg"],
    description:
      "Our sunburst wedge mule in black — an open-toe slide with laser-cut detailing and all-day wedge comfort.",
    sizes: ["37", "38", "39", "40", "41"],
  },
  {
    id: "scallop-wedge-black",
    name: "Scallop Wedge Slides — Black",
    category: "Wedges",
    price: 16000,
    image: images["im11.jpg"],
    description:
      "A scalloped, crisscross-cut upper on a tiered wedge sole. Slip-on ease with real lift.",
    sizes: ["37", "38", "39", "40", "41"],
  },
  {
    id: "scallop-wedge-white",
    name: "Scallop Wedge Slides — White",
    category: "Wedges",
    price: 16000,
    image: images["im12.jpg"],
    description:
      "The scallop wedge slide in white — laser-cut panelling, open toe, and a comfortable stacked sole.",
    sizes: ["37", "38", "39", "40", "41"],
  },
  {
    id: "buckle-stiletto-slingback",
    name: "Buckle-Strap Stiletto Slingbacks",
    category: "Heels",
    price: 27500,
    image: images["im13.jpg"],
    description:
      "A sharp pointed-toe stiletto slingback with a statement gold buckle. Available in black, red and gold patent finishes.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "quilted-bow-ankle-blush",
    name: "Quilted Bow Ankle-Strap Sandals — Blush",
    category: "Flats",
    price: 21000,
    image: images["im14.jpg"],
    description:
      "A quilted, cushioned footbed dressed up with a bow and flower charm, finished with a slim adjustable ankle strap.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "quilted-bow-ankle-gold",
    name: "Quilted Bow Ankle-Strap Sandals — Gold",
    category: "Flats",
    price: 23000,
    image: images["im15.jpg"],
    description:
      "Metallic gold quilted leatherette with a bow and flower charm — the flat pair built for special occasions.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "quilted-bow-ankle-black",
    name: "Quilted Bow Ankle-Strap Sandals — Black",
    category: "Flats",
    price: 21000,
    image: images["im16.jpg"],
    description:
      "Our quilted bow sandal in black — comfortable, elegant, and easy to dress up or down.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "quilted-thong-multi",
    name: "Quilted Flower Thong Sandals",
    category: "Flats",
    price: 18500,
    image: images["im17.jpg"],
    description:
      "A quilted thong sandal finished with a flower charm and adjustable ankle strap. Available in gold, blush, black and wine.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "quilted-bow-ankle-wine",
    name: "Quilted Bow Ankle-Strap Sandals — Wine",
    category: "Flats",
    price: 21000,
    image: images["im18.jpg"],
    description:
      "A deep wine colourway of our quilted bow sandal — soft cushioned sole, bow and flower charm detail.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "bow-block-heel-mix",
    name: "Bow Block Heel Pumps — Colour Options",
    category: "Heels",
    price: 22500,
    image: images["im19.jpg"],
    description:
      "A round block heel pump finished with a patent bow at the vamp. Available in white, black, wine, nude and red.",
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "bow-block-heel-black",
    name: "Bow Block Heel Pumps — Black",
    category: "Heels",
    price: 22500,
    image: images["im20.jpg"],
    description:
      "High-shine black patent pump with a comfortable block heel and bow detail at the toe.",
    sizes: ["36", "37", "38", "39", "40"],
  },
];

export default PRODUCTS;

export const CATEGORIES = ["All", "Heels", "Wedges", "Flats", "Kids"];
