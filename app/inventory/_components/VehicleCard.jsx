import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Gauge, Fuel, ChevronRight } from "lucide-react";
import Image from "next/image";

export const VehicleCard = ({
  id,
  name,
  brand,
  year,
  price,
  mileage,
  fuelType,
  transmission,
  image,
  status,
}) => {
  return (
    <Card className="group overflow-hidden border-foreground/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${brand} ${name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {status && (
          <div className="absolute top-3 left-3">
            <Badge
              variant={status === "new" ? "default" : "secondary"}
              className={
                status === "sale"
                  ? "bg-primary text-primary-foreground"
                  : status === "new"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }
            >
              {status === "new"
                ? "New Arrival"
                : status === "certified"
                ? "Certified"
                : "Special Offer"}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="mb-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {brand}
          </p>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-foreground/10">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{mileage}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{fuelType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Starting at</p>
            <p className="text-2xl font-bold text-primary">
              ${price.toLocaleString()}
            </p>
          </div>
          <Button
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
