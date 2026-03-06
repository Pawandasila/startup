"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, X, ArrowRight } from "lucide-react";

interface FilterSectionData {
  title: string;
  type: "list" | "size" | "range" | "color";
  items?: string[];
  collapsed: boolean;
}

const initialSections: FilterSectionData[] = [
  {
    title: "Designers",
    type: "list",
    items: ["Acne Studios", "Khaite", "Loewe", "The Row", "Totême"],
    collapsed: false,
  },
  {
    title: "Category",
    type: "list",
    items: ["Dresses", "Outerwear", "Tailoring", "Bags"],
    collapsed: false,
  },
  {
    title: "Size",
    type: "size",
    items: ["XS", "S", "M", "L", "XL"],
    collapsed: true,
  },
  {
    title: "Price Range",
    type: "range",
    collapsed: true,
  },
  {
    title: "Color",
    type: "color",
    collapsed: true,
  },
  {
    title: "Location",
    type: "list",
    items: ["New York", "London", "Paris", "Milan"],
    collapsed: true,
  },
];

const colorSwatches = [
  { name: "Black", bg: "bg-black" },
  { name: "White", bg: "bg-white" },
  { name: "Grey", bg: "bg-stone-500" },
  { name: "Navy", bg: "bg-blue-900" },
  { name: "Burgundy", bg: "bg-red-800" },
];

interface ArchiveFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
}

export function ArchiveFilters({
  isOpen,
  onClose,
  activeFilters,
  onToggleFilter,
}: ArchiveFiltersProps) {
  const [sections, setSections] = useState(initialSections);

  const toggleSection = useCallback((index: number) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, collapsed: !s.collapsed } : s)),
    );
  }, []);

  return (
    <aside
      className={`
        fixed inset-0 z-70 bg-background-light transform transition-transform duration-500 ease-in-out
        md:relative md:inset-auto md:z-auto md:transform-none md:transition-none
        md:w-[280px] md:shrink-0 md:border-r md:border-border-color
        md:sticky md:top-[112px] md:h-[calc(100vh-112px)]
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      aria-label="Product filters"
    >
      <div className="flex flex-col h-full">
        {/* Mobile header - Sticky and refined */}
        <div className="md:hidden flex justify-between items-center p-6 border-b border-border-color bg-background-light/95 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <span className="font-serif text-2xl font-semibold tracking-tight">
              Filters
            </span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mt-0.5">
              Refine your selection
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border-color hover:bg-brand-primary hover:text-background transition-all"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-10">
            {sections.map((section, index) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="font-serif text-lg font-semibold border-b border-border-color pb-2">
                  <button
                    className="w-full flex justify-between items-center group"
                    onClick={() => toggleSection(index)}
                    aria-expanded={!section.collapsed}
                    aria-controls={`filter-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="group-hover:text-brand-accent transition-colors">
                      {section.title}
                    </span>
                    {section.collapsed ? (
                      <ChevronDown
                        className="w-4 h-4 text-text-muted group-hover:text-brand-primary transition-colors"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronUp
                        className="w-4 h-4 text-text-muted group-hover:text-brand-primary transition-colors"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </h3>

                <div
                  id={`filter-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`transition-all duration-300 ${
                    section.collapsed ? "hidden" : "block"
                  }`}
                >
                  {section.type === "list" && section.items && (
                    <ul
                      className="flex flex-col gap-2.5"
                      role="listbox"
                      aria-label={`Filter by ${section.title}`}
                    >
                      {section.items.map((item) => {
                        const isActive = activeFilters.includes(item);
                        return (
                          <li key={item} role="option" aria-selected={isActive}>
                            <button
                              onClick={() => onToggleFilter(item)}
                              className={`text-left text-sm w-full transition-all duration-200 py-0.5 ${
                                isActive
                                  ? "font-bold text-text-main pl-3 border-l-2 border-brand-primary"
                                  : "text-text-main/70 pl-4 hover:pl-3 hover:border-l-2 hover:border-brand-primary/50 hover:text-brand-primary"
                              }`}
                            >
                              {item}
                            </button>
                          </li>
                        );
                      })}
                      {section.title === "Designers" ||
                      section.title === "Category" ? (
                        <li>
                          <button className="text-[10px] uppercase tracking-widest text-text-muted hover:text-brand-primary mt-3 flex items-center gap-2 group transition-colors px-4">
                            <span>View All {section.title}</span>
                            <ArrowRight
                              className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                              aria-hidden="true"
                            />
                          </button>
                        </li>
                      ) : null}
                    </ul>
                  )}

                  {section.type === "size" && section.items && (
                    <div
                      className="grid grid-cols-4 gap-2"
                      role="group"
                      aria-label="Size options"
                    >
                      {section.items.map((size) => {
                        const isActive = activeFilters.includes(size);
                        return (
                          <button
                            key={size}
                            onClick={() => onToggleFilter(size)}
                            className={`flex items-center justify-center aspect-square text-[10px] font-bold tracking-tighter transition-all ${
                              isActive
                                ? "bg-brand-primary text-background border-brand-primary"
                                : "bg-surface border border-border-color text-text-muted hover:border-brand-primary hover:text-brand-primary"
                            }`}
                            aria-label={`Size ${size}`}
                            aria-pressed={isActive}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {section.type === "range" && (
                    <div className="flex flex-col gap-4 px-2">
                      <label htmlFor="price-range" className="sr-only">
                        Price range
                      </label>
                      <input
                        id="price-range"
                        className="w-full h-1 bg-border-color appearance-none outline-none cursor-pointer"
                        max={1000}
                        min={0}
                        type="range"
                        defaultValue={500}
                      />
                      <div className="flex justify-between text-[10px] font-bold tracking-widest text-text-muted tabular-nums">
                        <span>$0</span>
                        <span>$1000+</span>
                      </div>
                    </div>
                  )}

                  {section.type === "color" && (
                    <div
                      className="flex flex-wrap gap-3 px-2"
                      role="group"
                      aria-label="Color options"
                    >
                      {colorSwatches.map((color) => {
                        const isActive = activeFilters.includes(color.name);
                        return (
                          <button
                            key={color.name}
                            onClick={() => onToggleFilter(color.name)}
                            className={`w-7 h-7 border rounded-full transition-all relative ${
                              color.bg
                            } ${
                              isActive
                                ? "ring-2 ring-offset-2 ring-brand-primary border-brand-primary"
                                : "border-border-color hover:scale-110"
                            }`}
                            aria-label={color.name}
                            aria-pressed={isActive}
                          >
                            {isActive && (
                              <div
                                className={`absolute inset-0 flex items-center justify-center ${
                                  color.name === "White"
                                    ? "text-black"
                                    : "text-white"
                                }`}
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Action Bar - Sticky Bottom */}
        <div className="md:hidden border-t border-border-color p-6 bg-background-light/95 backdrop-blur-sm grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              /* Handle clear all */
            }}
            className="py-3 px-4 bg-surface text-[10px] font-bold uppercase tracking-widest text-text-main border border-border-color hover:bg-border-color transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-brand-primary text-[10px] font-bold uppercase tracking-widest text-background hover:bg-brand-accent transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </aside>
  );
}
