import { useState } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProductsSection } from "./components/ProductsSection";
import { MissionSection } from "./components/MissionSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BagDrawer, BagLineItem } from "./components/BagDrawer";
import { ProductModal } from "./components/ProductModal";
import { ProductItem } from "./data/products";

export default function App() {
  const [bagItems, setBagItems] = useState<BagLineItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<{
    product: ProductItem;
    size: string;
  } | null>(null);

  const totalBagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  function handleAddToBag(product: ProductItem, size: string) {
    setBagItems((prev) => {
      const existing = prev.find(
        (entry) => entry.product.id === product.id && entry.size === size
      );
      if (existing) {
        return prev.map((entry) =>
          entry.product.id === product.id && entry.size === size
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  }

  function handleUpdateQty(productId: string, size: string, delta: number) {
    setBagItems((prev) =>
      prev
        .map((entry) =>
          entry.product.id === productId && entry.size === size
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }

  function handleRemoveItem(productId: string, size: string) {
    setBagItems((prev) =>
      prev.filter((entry) => !(entry.product.id === productId && entry.size === size))
    );
  }

  function handleClearBag() {
    setBagItems([]);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F8F6EE] text-[#4A2D1D]">
        <Navbar bagCount={totalBagCount} onOpenBag={() => setIsBagOpen(true)} />

      <main className="flex-1">
        <HeroSection />
        <ProductsSection
          onAddToBag={handleAddToBag}
          onInspectProduct={(product, size) => setInspectedProduct({ product, size })}
        />
        <MissionSection />
        <ContactSection />
      </main>

      <Footer />

      <BagDrawer
        isOpen={isBagOpen}
        items={bagItems}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />

      <ProductModal
        product={inspectedProduct?.product ?? null}
        initialSize={inspectedProduct?.size ?? "S"}
        onClose={() => setInspectedProduct(null)}
        onAddToBag={handleAddToBag}
      />
      </div>
    </MotionConfig>
  );
}
