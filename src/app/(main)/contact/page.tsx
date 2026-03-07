"use client";

import Image from "next/image";
import { Mail, Phone, Search, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/shared/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen pt-[56px] md:pt-[112px] bg-background-light text-brand-primary font-sans">
        <section className="px-6 md:px-20 pt-20 pb-16 text-center max-w-4xl mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl italic font-light leading-none mb-8">
            Our Atelier, At Your Service
          </h1>
          <p className="text-sm md:text-base tracking-wide leading-relaxed text-brand-primary/70 max-w-2xl mx-auto uppercase">
            From private showroom appointments to digital concierge styling, our
            dedicated team is here to ensure your Luxe Rental experience is as
            refined as your personal aesthetic.
          </p>
        </section>

        <section className="px-6 md:px-20 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto">
          <div className="space-y-12">
            <h3 className="font-serif text-3xl italic">Inquiries</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-primary/40">
                    Full Name
                  </label>
                  <input
                    className="border-b border-brand-primary/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-3 focus:border-brand-accent focus:ring-0 text-sm outline-none transition-colors shadow-none"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-primary/40">
                    Email Address
                  </label>
                  <input
                    className="border-b border-brand-primary/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-3 focus:border-brand-accent focus:ring-0 text-sm outline-none transition-colors shadow-none"
                    placeholder="email@atelier.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-primary/40">
                  Subject of Inquiry
                </label>
                <Select>
                  <SelectTrigger className="w-full border-b border-brand-primary/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-6 focus:border-brand-accent focus:ring-0 text-sm rounded-none outline-none transition-colors shadow-none h-auto">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-light border-border-color rounded-none font-sans">
                    <SelectItem
                      value="rental"
                      className="focus:bg-brand-primary/5 focus:text-brand-primary"
                    >
                      Rental Inquiry
                    </SelectItem>
                    <SelectItem
                      value="designer"
                      className="focus:bg-brand-primary/5 focus:text-brand-primary"
                    >
                      Designer Partnership
                    </SelectItem>
                    <SelectItem
                      value="press"
                      className="focus:bg-brand-primary/5 focus:text-brand-primary"
                    >
                      Press & Media
                    </SelectItem>
                    <SelectItem
                      value="support"
                      className="focus:bg-brand-primary/5 focus:text-brand-primary"
                    >
                      Technical Support
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-primary/40">
                  Message
                </label>
                <textarea
                  className="border-b border-brand-primary/20 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-3 focus:border-brand-accent focus:ring-0 text-sm resize-none outline-none transition-colors shadow-none"
                  placeholder="How can we assist you?"
                  rows={4}
                ></textarea>
              </div>
              <button
                className="bg-brand-primary text-white px-12 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-brand-accent hover:text-brand-primary transition-all duration-300 w-full md:w-auto font-bold"
                type="submit"
              >
                Send Inquiry
              </button>
            </form>
          </div>

          {/* Studio Info & Details */}
          <div className="space-y-16">
            <div className="aspect-4/5 bg-brand-primary/5 relative overflow-hidden ring-1 ring-border-color">
              <Image
                alt="Minimalist high fashion studio interior"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJiyaRzr82DCH0EVq0XZtNzjncvL3gAyWstuKPCgCXQbo5NozAQW_ap_uxO8i4aYjPNCJmSqKlIA91A7i3SJ9CtatjF0fezKED0uyCE7t-tRwTpTlfvdxHJZruOc2InQRsR89EjKy9Yqr7uTzfE3-9eVZlFfLSApIejLkqMTAR6R_sY5HKSFYVu5n3iTBkSEemYpjFqp_k2MzlZcayeIQIyhy2ZtHSRdJpiUfz1eN0TVS4h84YzMATtflR2Lc-2zduCc1wmYLymk9W"
                fill
                className="object-cover grayscale opacity-80"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-brand-primary/10 pt-12">
              <div className="space-y-6">
                <h4 className="text-xs tracking-widest font-bold uppercase">
                  The Flagship Atelier
                </h4>
                <p className="text-sm leading-relaxed text-brand-primary/60 italic">
                  42 Rue de la Paix
                  <br />
                  75002 Paris, France
                </p>
                <div className="space-y-4 text-sm" role="list">
                  <p className="flex items-center gap-3" role="listitem">
                    <Phone
                      className="w-4 h-4 text-brand-accent"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Phone: </span> +33 1 42 61 50 00
                  </p>
                  <p className="flex items-center gap-3" role="listitem">
                    <Mail
                      className="w-4 h-4 text-brand-accent"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Email: </span>{" "}
                    contact@luxerental.fr
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs tracking-widest font-bold uppercase">
                  Concierge Hours
                </h4>
                <div className="space-y-3 text-xs tracking-wide">
                  <div className="flex justify-between border-b border-brand-primary/5 py-2">
                    <span className="uppercase font-medium">Mon — Fri</span>
                    <span>10:00 — 19:00</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-primary/5 py-2">
                    <span className="uppercase font-medium">Saturday</span>
                    <span>11:00 — 17:00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="uppercase font-medium text-brand-primary/40">
                      Sunday
                    </span>
                    <span className="italic text-brand-primary/40">
                      By Appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="px-6 md:px-20 py-20 max-w-[1440px] mx-auto">
          <div className="h-[400px] w-full bg-surface relative overflow-hidden group ring-1 ring-border-color">
            <div className="absolute inset-0 bg-surface flex items-center justify-center">
              {/* Animation or placeholder for map */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Search className="w-32 h-32" aria-hidden="true" />
              </div>
              <div
                className="relative z-10 size-4 bg-brand-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                role="img"
                aria-label="Location of Paris Studio on map"
              ></div>
            </div>
            <div className="absolute bottom-6 right-6 bg-background-light p-6 border border-border-color shadow-xl max-w-[240px]">
              <p className="text-xs tracking-widest uppercase font-bold mb-2">
                Paris Studio
              </p>
              <p className="text-[10px] text-brand-primary/60 leading-relaxed uppercase">
                Appointments required for private fittings and curated designer
                viewings.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ/Help Center Link */}
        <section className="bg-brand-primary text-background-light px-6 md:px-20 py-24 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-4xl italic leading-tight text-white">
              Seeking instant answers?
            </h2>
            <p className="text-sm tracking-widest text-background-light/60 leading-loose max-w-lg mx-auto uppercase">
              Detailed information regarding shipping, insurance, and sizing can
              be found in our comprehensive repository.
            </p>
            <div className="pt-4">
              <a
                className="inline-flex items-center gap-3 border-b border-brand-accent pb-2 text-[10px] tracking-[0.3em] uppercase hover:text-brand-accent transition-colors group font-bold text-white"
                href="#"
              >
                Visit the Help Center
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
