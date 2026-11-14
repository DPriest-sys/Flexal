import sculptSetImg from "../assets/images/product_sculpt_set_espresso_1794667216827.webp";
import blushWrapImg from "../assets/images/product_blush_wrap_top_1794667218385.webp";
import ivoryLeggingsImg from "../assets/images/product_ivory_leggings_1794667217766.webp";
import espressoBodysuitImg from "../assets/images/product_espresso_bodysuit_1794667218680.webp";
import studioToteImg from "../assets/images/product_blush_mat_tote_1794667218291.webp";
import roseTankImg from "../assets/images/product_crop_tank_rose_1794667218254.webp";

export type ProductCategory = "All" | "Sets" | "Tops" | "Leggings" | "Accessories";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "All",
  "Sets",
  "Tops",
  "Leggings",
  "Accessories",
];

export type PriceRangeKey = "all" | "under-75" | "75-110" | "over-110";

export interface PriceRangePreset {
  key: PriceRangeKey;
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGE_PRESETS: PriceRangePreset[] = [
  { key: "all", label: "All Prices", min: 0, max: 150000 },
  { key: "under-75", label: "Under ₦50,000", min: 0, max: 49999 },
  { key: "75-110", label: "₦50,000 – ₦75,000", min: 50000, max: 75000 },
  { key: "over-110", label: "₦75,000+", min: 75001, max: 150000 },
];

export interface ProductItem {
  id: string;
  name: string;
  category: Exclude<ProductCategory, "All">;
  colorway: string;
  price: number;
  image: string;
  sizes: string[];
  tag?: string;
  description: string;
  fabric: string;
}

export const LATEST_PRODUCTS: ProductItem[] = [
  {
    id: "fx-sculpt-set",
    name: "Sculpt Ribbed Two-Piece Set",
    category: "Sets",
    colorway: "Deep Espresso",
    price: 78000,
    image: sculptSetImg,
    sizes: ["XS", "S", "M", "L"],
    tag: "New Arrival",
    description:
      "Seamless high-waisted compression legging paired with a supportive scoop-neck ribbed bra. Built for unrestricted reformer pilates and studio training.",
    fabric: "78% Recycled Polyamide · 22% Elastane",
  },
  {
    id: "fx-ballet-wrap",
    name: "Ballet Modal Wrap Top",
    category: "Tops",
    colorway: "Soft Blush",
    price: 45000,
    image: blushWrapImg,
    sizes: ["XS", "S", "M", "L"],
    tag: "Studio Favorite",
    description:
      "Lightweight long-sleeve wrap silhouette with elongated waist ties and soft ribbed cuffs for warm-ups and effortless post-studio layering.",
    fabric: "92% Tencel Modal · 8% Spandex",
  },
  {
    id: "fx-tailored-legging",
    name: "Tailored Seam Compression Legging",
    category: "Leggings",
    colorway: "Warm Ivory",
    price: 58000,
    image: ivoryLeggingsImg,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Double-lined matte compression legging engineered with contoured side seams and a smooth roll-resistant waistband.",
    fabric: "75% Nylon · 25% Lycra Sport",
  },
  {
    id: "fx-atelier-unitard",
    name: "Atelier Sculpt Unitard",
    category: "Sets",
    colorway: "Deep Espresso",
    price: 85000,
    image: espressoBodysuitImg,
    sizes: ["XS", "S", "M", "L"],
    tag: "Limited Run",
    description:
      "One-piece full-length bodysuit featuring sculpted princess seams, an open racerback, and four-way brushed matte stretch.",
    fabric: "76% Polyamide · 24% Elastane",
  },
  {
    id: "fx-rose-tank",
    name: "Contour High-Neck Rib Tank",
    category: "Tops",
    colorway: "Rose Pink",
    price: 36000,
    image: roseTankImg,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Form-fitting high-neck tank crafted in breathable micro-ribbed jersey with a clean cutaway shoulder profile.",
    fabric: "88% Combed Organic Cotton · 12% Elastane",
  },
  {
    id: "fx-canvas-tote",
    name: "Studio Canvas Mat Tote",
    category: "Accessories",
    colorway: "Ivory & Espresso",
    price: 52000,
    image: studioToteImg,
    sizes: ["One Size"],
    description:
      "Heavyweight unbleached organic cotton canvas tote finished with vegetable-tanned espresso leather straps and an integrated mat sleeve.",
    fabric: "100% Organic 18oz Cotton Canvas · Full-Grain Trim",
  },
];
