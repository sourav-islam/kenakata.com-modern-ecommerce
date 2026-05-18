"use client";
// src/components/home/FeaturesSection.tsx
import { Truck, Shield, HeadphonesIcon, RotateCcw } from "lucide-react";
import { use } from "react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is always safe",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "We are here to help anytime you need",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}