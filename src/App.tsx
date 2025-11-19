import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Industries from "./pages/Industries";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BuildYourBag from "./pages/BuildYourBag";

// Import all individual industry pages
import Agriculture from "./pages/industries/Agriculture";
import Chemicals from "./pages/industries/Chemicals";
import Construction from "./pages/industries/Construction";
import FoodProcessing from "./pages/industries/FoodProcessing";
import Pharmaceuticals from "./pages/industries/Pharmaceuticals";
import Recycling from "./pages/industries/Recycling";
import Minerals from "./pages/industries/Minerals";
import Fertilizers from "./pages/industries/Fertilizers";
import Cement from "./pages/industries/Cement";
import ColorPigments from "./pages/industries/ColorPigments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/industries" element={<Industries />} />
          
          {/* All Industry Pages */}
          <Route path="/industries/agriculture" element={<Agriculture />} />
          <Route path="/industries/chemicals" element={<Chemicals />} />
          <Route path="/industries/construction" element={<Construction />} />
          <Route path="/industries/food-processing" element={<FoodProcessing />} />
          <Route path="/industries/pharmaceuticals" element={<Pharmaceuticals />} />
          <Route path="/industries/recycling" element={<Recycling />} />
          <Route path="/industries/minerals" element={<Minerals />} />
          <Route path="/industries/fertilizers" element={<Fertilizers />} />
          <Route path="/industries/cement" element={<Cement />} />
          <Route path="/industries/color-pigments" element={<ColorPigments />} />
          
          <Route path="/build-your-bag" element={<BuildYourBag />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;