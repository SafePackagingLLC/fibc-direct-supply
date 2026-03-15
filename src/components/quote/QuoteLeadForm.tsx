import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LeadData } from "@/types/quote";

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  deliveryRegion: z.string().min(1, "Select a delivery region"),
  deliveryDate: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LeadData) => void;
  isSubmitting: boolean;
}

const QuoteLeadForm = ({ onSubmit, isSubmitting }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function submit(data: FormValues) {
    onSubmit(data as LeadData);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div className="text-center space-y-1 mb-2">
        <h2 className="text-2xl font-bold">Almost there — get your price</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details and we'll email your configuration + price range instantly.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input id="companyName" {...register("companyName")} />
          {errors.companyName && <p className="text-xs text-destructive">{errors.companyName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Your Name *</Label>
          <Input id="contactName" {...register("contactName")} />
          {errors.contactName && <p className="text-xs text-destructive">{errors.contactName.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="deliveryRegion">Delivery Region *</Label>
          <Select onValueChange={(v) => setValue("deliveryRegion", v)}>
            <SelectTrigger id="deliveryRegion">
              <SelectValue placeholder="Select warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phoenix, AZ">Phoenix, AZ</SelectItem>
              <SelectItem value="Austin, TX">Austin, TX</SelectItem>
              <SelectItem value="Houston, TX">Houston, TX</SelectItem>
              <SelectItem value="Newark, NJ">Newark, NJ</SelectItem>
            </SelectContent>
          </Select>
          {errors.deliveryRegion && <p className="text-xs text-destructive">{errors.deliveryRegion.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="deliveryDate">Target Delivery Date</Label>
          <Input id="deliveryDate" type="date" {...register("deliveryDate")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Additional Notes</Label>
        <Textarea
          id="message"
          rows={3}
          placeholder="Special requirements, certifications needed, etc."
          {...register("message")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send My Quote Request →"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We'll email your full configuration and price range within minutes. No obligation.
      </p>
    </form>
  );
};

export default QuoteLeadForm;
