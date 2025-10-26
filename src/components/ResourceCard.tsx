import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  slug: string;
}

const ResourceCard = ({ title, description, slug }: ResourceCardProps) => {
  return (
    <Link to={`/resources/${slug}`}>
      <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold flex-1">{title}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ResourceCard;
