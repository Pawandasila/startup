"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Hero() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-brand-primary pt-16 md:pt-28"
      aria-label="Hero banner"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true" />
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          alt="Elegant fashion model wearing a flowing designer dress"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
      </div>
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 sm:px-8 text-center">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-display text-white font-semibold leading-tight tracking-tight mb-6 md:mb-8">
          Rent Fashion.
          <br />
          <span className="italic font-light">The New Standard.</span>
        </h1>
        <Link
          className="group relative flex h-12 md:h-14 items-center justify-center border border-white/40 bg-white/5 px-8 md:px-12 backdrop-blur-sm transition-all hover:bg-white hover:text-black"
          href="/category/archive"
        >
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-white group-hover:text-black transition-colors">
            ENTER THE COLLECTION
          </span>
        </Link>
      </div>
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-30 px-4">
        <div className="mx-auto max-w-4xl bg-white/10 p-1 backdrop-blur-xl border border-white/20 rounded-lg">
          <form
            className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/20"
            role="search"
            aria-label="Search for rental fashion"
          >
            <div className="flex-1 px-4 md:px-6 py-3 md:py-4">
              <label
                htmlFor="hero-occasion"
                className="block text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1"
              >
                Occasion
              </label>
              <input
                id="hero-occasion"
                className="w-full bg-transparent border-none p-0 text-white placeholder:text-white/60 focus:ring-0 font-sans text-sm focus:outline-none"
                placeholder="Black Tie, Wedding..."
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex-1 px-4 md:px-6 py-3 md:py-4">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="hero-dates"
                    className={cn(
                      "w-full bg-transparent border-none p-0 text-left font-sans text-sm focus:outline-none flex items-center gap-2",
                      !date && "text-white/60",
                      date && "text-white",
                    )}
                    aria-label="Select rental dates"
                  >
                    <CalendarIcon className="size-4 text-white/50" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd")} -{" "}
                          {format(date.to, "LLL dd")}
                        </>
                      ) : (
                        format(date.from, "LLL dd")
                      )
                    ) : (
                      <span className="text-white/60">Select Dates</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 border-none"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    className="bg-background-light text-brand-primary"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <button
              type="submit"
              className="bg-white text-black px-8 md:px-10 py-3 md:py-0 font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors w-full md:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
