"use client";
import Link from "next/link";
import React from "react";
import {
  ScheduleTestDrive,
  ScheduleTestDriveButton,
} from "./ScheduleTestDrive";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const PageNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/inventory", label: "Inventory" },
    { href: "/services", label: "Service & Parts" },
  ];

  return (
    <header className="border-b border-foreground/10 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight text-foreground"
          >
            APEX<span className="text-primary">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  pathname === item.href
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ScheduleTestDriveButton />
        </div>
      </div>
    </header>
  );
};
