"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, Navigation, MapPinOff, ArrowRight } from "lucide-react";
import { useActivity } from "@/context/activity.context";
import { Button } from "@/components/ui/button";

export function LocationPopup() {
  const { isLocationConfirmed, setLocation, confirmLocation, isInitialized } =
    useActivity();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (isInitialized && !isLocationConfirmed) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInitialized, isLocationConfirmed]);

  const handleAutoLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // In a real app, you would use a geocoding service here (e.g., Google Maps API, Mapbox)
          // to reverse geocode the lat/lng into a readable city name.
          // For this implementation, we simulate it or set the precise string.

          const mockCity = "New York, NY";
          setInputValue(mockCity);
          setLocation(mockCity, { lat: latitude, lng: longitude });
        } catch (error) {
          console.error("Geocoding failed:", error);
          setGeoError("Failed to resolve address. Please type it manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        }
        setGeoError(errorMessage);
        setIsLocating(false);
      },
      { timeout: 10000 },
    );
  }, [setLocation]);

  useEffect(() => {
    if (isOpen && !inputValue && !geoError) {
      handleAutoLocate();
    }
  }, [isOpen, inputValue, geoError, handleAutoLocate]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      setLocation(inputValue);
      confirmLocation();
      setIsOpen(false);
    },
    [inputValue, setLocation, confirmLocation],
  );

  const handleSkip = useCallback(() => {
    confirmLocation();
    setIsOpen(false);
  }, [confirmLocation]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleSkip}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-sm bg-background border border-border-color shadow-2xl animate-in fade-in zoom-in-95 duration-200 slide-in-from-bottom-10 sm:slide-in-from-bottom-0"
        role="dialog"
        aria-labelledby="location-dialog-title"
        aria-describedby="location-dialog-desc"
      >
        {/* Banner/Header */}
        <div className="bg-surface border-b border-border-color p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-background border border-border-color rounded-full flex items-center justify-center mb-4 text-brand-primary shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <h2
            id="location-dialog-title"
            className="font-serif text-2xl text-text-main leading-tight mb-2"
          >
            Where are you located?
          </h2>
          <p
            id="location-dialog-desc"
            className="text-xs text-text-muted font-sans leading-relaxed px-4"
          >
            Enter your location to see items available for rent in your area and
            get accurate delivery estimates.
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input Group */}
            <div>
              <label htmlFor="location-input" className="sr-only">
                Your City or Zip Code
              </label>
              <div className="relative">
                <input
                  id="location-input"
                  type="text"
                  placeholder="Enter City or Zip Code"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-background border border-border-color p-4 pr-12 text-sm font-sans focus:outline-none focus:border-brand-primary placeholder:text-text-muted/70 transition-colors"
                />

                {/* Auto-locate Button inside input */}
                <button
                  type="button"
                  onClick={handleAutoLocate}
                  disabled={isLocating}
                  className="absolute right-0 top-0 bottom-0 px-4 text-text-muted hover:text-brand-primary transition-colors disabled:opacity-50"
                  aria-label="Use my current location"
                >
                  {isLocating ? (
                    <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {geoError && (
                <p className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 px-1 animate-in fade-in slide-in-from-top-1">
                  <MapPinOff className="w-3 h-3" />
                  {geoError}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-4">
              <Button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full h-12 cursor-pointer bg-brand-primary text-background text-sm font-serif font-bold uppercase hover:bg-brand-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Confirm Location
                <ArrowRight className="w-4 h-4" />
              </Button>
              <button
                type="button"
                onClick={handleSkip}
                className="w-full py-3 text-[10px] cursor-pointer font-bold uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors underline underline-offset-4"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
