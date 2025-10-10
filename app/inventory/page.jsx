"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehicleCard } from "@/app/inventory/_components/VehicleCard";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { CarLoader } from "@/components/CarLoader";
import { PageNav } from "@/components/PageNav";

const vehicles = [
  {
    id: "1",
    name: "911 Carrera",
    brand: "Porsche",
    year: 2024,
    price: 115000,
    mileage: "0 mi",
    fuelType: "Gas",
    transmission: "Auto",
    image: "/images/inventory-page/prosche.jpg",
    status: "new",
  },
  {
    id: "2",
    name: "Model S Plaid",
    brand: "Tesla",
    year: 2024,
    price: 108000,
    mileage: "0 mi",
    fuelType: "Electric",
    transmission: "Auto",
    image: "/images/inventory-page/tesla.jpg",
    status: "new",
  },
  {
    id: "3",
    name: "AMG GT",
    brand: "Mercedes-Benz",
    year: 2023,
    price: 98500,
    mileage: "5,200 mi",
    fuelType: "Gas",
    transmission: "Auto",
    image: "/images/inventory-page/mercedes.jpg",
    status: "certified",
  },
  {
    id: "4",
    name: "M4 Competition",
    brand: "BMW",
    year: 2024,
    price: 79000,
    mileage: "0 mi",
    fuelType: "Gas",
    transmission: "Auto",
    image: "/images/inventory-page/bmw.jpg",
    status: "sale",
  },
  {
    id: "5",
    name: "R8 V10",
    brand: "Audi",
    year: 2023,
    price: 155000,
    mileage: "3,800 mi",
    fuelType: "Gas",
    transmission: "Auto",
    image: "/images/inventory-page/audi.jpg",
    status: "certified",
  },
  {
    id: "6",
    name: "F-Type R",
    brand: "Jaguar",
    year: 2024,
    price: 89000,
    mileage: "0 mi",
    fuelType: "Gas",
    transmission: "Auto",
    image: "/images/inventory-page/jaguar.jpg",
    status: "new",
  },
  {
    id: "7",
    name: "Corvette Z06",
    brand: "Chevrolet",
    year: 2024,
    price: 112000,
    mileage: "0 mi",
    fuelType: "Gas",
    transmission: "Auto",
    image: "/images/inventory-page/chevrolet.jpg",
    status: "sale",
  },
  {
    id: "8",
    name: "Taycan Turbo S",
    brand: "Porsche",
    year: 2024,
    price: 187000,
    mileage: "0 mi",
    fuelType: "Electric",
    transmission: "Auto",
    image: "/images/inventory-page/porsche-taycan.jpg",
    status: "new",
  },
];

export default function InventoryPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    brand: "all",
    priceRange: "all",
    year: "all",
    fuelType: "all",
  });
  const [loading, setLoading] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const results = vehicles.filter((vehicle) => {
        const matchesSearch =
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBrand =
          filters.brand === "all" ||
          vehicle.brand.toLowerCase() === filters.brand;

        const matchesYear =
          filters.year === "all" || vehicle.year.toString() === filters.year;

        const matchesFuel =
          filters.fuelType === "all" ||
          vehicle.fuelType.toLowerCase() === filters.fuelType;

        const matchesPrice =
          filters.priceRange === "all" ||
          (filters.priceRange === "0-50k" && vehicle.price < 50000) ||
          (filters.priceRange === "50k-100k" &&
            vehicle.price >= 50000 &&
            vehicle.price <= 100000) ||
          (filters.priceRange === "100k-150k" &&
            vehicle.price > 100000 &&
            vehicle.price <= 150000) ||
          (filters.priceRange === "150k+" && vehicle.price > 150000);

        return (
          matchesSearch &&
          matchesBrand &&
          matchesYear &&
          matchesFuel &&
          matchesPrice
        );
      });

      setFilteredVehicles(results);
      setLoading(false);
    }, 300); // debounce to avoid flicker

    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageNav />

      {/* Hero Section */}
      <section className="border-b border-foreground/10 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
              Browse Our <span className="text-primary">Premium</span>{" "}
              Collection
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Discover exceptional vehicles from the world's most prestigious
              brands. Every car in our inventory is carefully selected to meet
              our exacting standards.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-foreground/10 bg-background/50 backdrop-blur-sm sticky top-[73px] z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, or keyword..."
                className="pl-10 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="md:hidden bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {showFilters && <X className="h-4 w-4 ml-2" />}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-3">
              <Select
                value={filters.brand}
                onValueChange={(value) => handleFilterChange("brand", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="porsche">Porsche</SelectItem>
                  <SelectItem value="tesla">Tesla</SelectItem>
                  <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="jaguar">Jaguar</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange("priceRange", value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-50k">Under $50k</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                  <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                  <SelectItem value="150k+">$150k+</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.year}
                onValueChange={(value) => handleFilterChange("year", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.fuelType}
                onValueChange={(value) => handleFilterChange("fuelType", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="gas">Gasoline</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showFilters && (
              <div className="md:hidden w-full mt-3 flex flex-col gap-3 border rounded-md p-4 bg-background">
                <Select
                  value={filters.brand}
                  onValueChange={(value) => handleFilterChange("brand", value)}
                >
                  <SelectTrigger className="w-full mb-2">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="tesla">Tesla</SelectItem>
                    <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                    <SelectItem value="jaguar">Jaguar</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value)
                  }
                >
                  <SelectTrigger className="w-full mb-2">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-50k">Under $50k</SelectItem>
                    <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                    <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                    <SelectItem value="150k+">$150k+</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.year}
                  onValueChange={(value) => handleFilterChange("year", value)}
                >
                  <SelectTrigger className="w-full mb-2">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.fuelType}
                  onValueChange={(value) =>
                    handleFilterChange("fuelType", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="gas">Gasoline</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredVehicles.length}
              </span>{" "}
              vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="animate-spin w-10 h-10" />
              </div>
            ) : filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))
            ) : (
              <p className="text-muted-foreground text-center col-span-full">
                No vehicles found matching your filters.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-bold tracking-tight text-foreground">
              APEX<span className="text-primary">.</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Apex Motors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
