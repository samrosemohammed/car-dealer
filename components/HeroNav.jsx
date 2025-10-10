"use client";
import { Menu, Phone, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScheduleTestDriveButton } from "./ScheduleTestDrive";

export const HeroNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden sm:inline text-sm font-medium uppercase tracking-wider">
                Menu
              </span>
            </button>

            <Link
              href="/"
              className="text-xl md:text-2xl font-bold tracking-tight text-foreground"
            >
              APEX<span className="text-primary">.</span>
            </Link>

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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-full max-w-md bg-background border-r border-foreground/10 z-[101] animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                <Link
                  href="/"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  APEX<span className="text-primary">.</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/inventory"
                      className={`block px-4 py-3 text-lg font-medium ${
                        isActive("/inventory")
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      } rounded-lg transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inventory
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/services"
                      className={`block px-4 py-3 text-lg font-medium ${
                        isActive("/services")
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      } rounded-lg transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Service & Parts
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      href="/contact"
                      className={`block px-4 py-3 text-lg font-medium ${
                        isActive("/contact")
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      } rounded-lg transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li> */}
                </ul>
              </nav>

              {/* Menu Footer */}
              <div className="p-6 border-t border-foreground/10 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Call us today</p>
                  <p className="text-lg font-semibold text-foreground">
                    (977) 9828047184
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
