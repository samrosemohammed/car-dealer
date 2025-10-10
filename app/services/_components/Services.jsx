import React from "react";
import {
  Wrench,
  Settings,
  Clock,
  ShieldCheck,
  Component,
  Tool,
  Zap,
  ChevronRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { ScheduleTestDriveButton } from "../../../components/ScheduleTestDrive";

export const Services = () => {
  const serviceAndPartsOfferings = [
    {
      id: 1,
      title: "Factory Scheduled Maintenance",
      description:
        "Manufacturer-recommended service performed by certified technicians to maintain your warranty and vehicle performance.",
      icon: <Clock className="h-12 w-12 text-primary mb-4" />,
    },
    {
      id: 2,
      title: "Performance Diagnostics",
      description:
        "Advanced computer diagnostics to identify issues and optimize your vehicle's performance and efficiency.",
      icon: <Zap className="h-12 w-12 text-primary mb-4" />,
    },
    {
      id: 3,
      title: "Certified Repair Service",
      description:
        "Factory-trained technicians using specialized tools and procedures to repair your vehicle to manufacturer standards.",
      icon: <Wrench className="h-12 w-12 text-primary mb-4" />,
    },
    {
      id: 4,
      title: "Genuine OEM Parts",
      description:
        "Original manufacturer parts designed specifically for your vehicle's make and model to ensure perfect fit and function.",
      icon: <Component className="h-12 w-12 text-primary mb-4" />,
    },
    {
      id: 5,
      title: "Performance Upgrades",
      description:
        "Professional installation of performance parts and accessories to enhance your vehicle's capability and driving experience.",
      icon: <Settings className="h-12 w-12 text-primary mb-4" />,
    },
    {
      id: 6,
      title: "Extended Service Plans",
      description:
        "Comprehensive coverage options that protect your vehicle beyond the factory warranty for long-term peace of mind.",
      icon: <ShieldCheck className="h-12 w-12 text-primary mb-4" />,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background/90 opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium uppercase tracking-wider">
              Service & Parts Center
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            EXPERT <span className="text-primary">CARE</span> FOR YOUR
            <span className="text-primary"> VEHICLE</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our factory-trained technicians and state-of-the-art facilities
            ensure your vehicle receives the highest standard of care with
            genuine parts and precision service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceAndPartsOfferings.map((service) => (
            <Card
              key={service.id}
              className="bg-card border-border/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
            >
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <CardTitle className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ScheduleTestDriveButton>
            Schedule Test Drive
            <ChevronRight className="ml-2 h-5 w-5" />
          </ScheduleTestDriveButton>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background text-sm md:text-base font-semibold px-8 py-6 bg-transparent"
          >
            <Link href="/services/parts">
              Order Parts
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
