import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  specs: string;
  image: string;
  stockStatus: string;
  slug: string;
  startingAt?: number;
  atQty?: number;
  quoteParams?: string;
}

const ProductCard = ({ title, description, specs, image, stockStatus, slug, startingAt, atQty, quoteParams }: ProductCardProps) => {
  const configuratorUrl = quoteParams ? `/build-your-bag?${quoteParams}` : "/build-your-bag";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {stockStatus}
        </Badge>
      </div>
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <p className="text-sm">{specs}</p>
        <p className="text-xs text-muted-foreground">
          Starting at{" "}
          <span className="font-semibold text-amber-600">
            ${startingAt != null ? startingAt.toFixed(2) : "0.00"}
          </span>
          {" "}/bag{atQty ? ` at ${atQty.toLocaleString()}+ units` : ""}.{" "}
          Price varies by config.{" "}
          <Link to={configuratorUrl} className="text-amber-600 hover:underline font-medium">
            Configure &amp; Price →
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button asChild className="flex-1">
            <Link to={`/products/${slug}`}>See Specs</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/contact">Request Quote</Link>
          </Button>
        </div>
        <Button
          asChild
          variant="outline"
          className="w-full border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white gap-2"
        >
          <Link to={configuratorUrl}>
            <Zap className="h-4 w-4" />
            Get Instant Price
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
