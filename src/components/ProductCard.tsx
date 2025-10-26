import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  description: string;
  specs: string;
  image: string;
  stockStatus: string;
  slug: string;
}

const ProductCard = ({ title, description, specs, image, stockStatus, slug }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
      <CardContent>
        <p className="text-sm">{specs}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to={`/products/${slug}`}>See Specs</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link to="/contact">Request Quote</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
