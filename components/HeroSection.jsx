import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScheduleTestDriveButton } from "./ScheduleTestDrive";

export function HeroSection() {
  return (
    <div className="relative bg-background">
      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/landing-page/hero.jpg"
            alt="Luxury vehicle"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20 md:pt-0">
          <div className="max-w-4xl">
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium uppercase tracking-wider">
                New Arrivals 2025
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 text-balance leading-[0.95] tracking-tight">
              DRIVE YOUR
              <br />
              <span className="text-foreground">DREAM.</span>{" "}
              <span className="text-muted-foreground">LIVE YOUR</span>
              <br />
              <span className="text-primary">PASSION.</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl leading-relaxed">
              Experience the perfect blend of performance, luxury, and
              innovation. Discover our exclusive collection of premium vehicles
              designed to elevate every journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base font-semibold px-6 py-5 md:px-8 md:py-6"
              >
                <Link href="/inventory">
                  Browse Inventory
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>

              <ScheduleTestDriveButton
                className={
                  "border-foreground/20 text-foreground hover:bg-foreground hover:text-background text-sm md:text-base font-semibold px-6 py-5 md:px-8 md:py-6 bg-transparent"
                }
                variant={"outline"}
              >
                <Phone className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                Schedule Test Drive
              </ScheduleTestDriveButton>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
              <div className="border-l-2 border-primary pl-3 md:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  500+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                  Vehicles
                </div>
              </div>
              <div className="border-l-2 border-primary pl-3 md:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  25+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                  Brands
                </div>
              </div>
              <div className="border-l-2 border-primary pl-3 md:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  15K+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                  Happy Clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
