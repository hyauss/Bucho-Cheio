import { Button } from "./ui/button";
import { MealFinder } from "./MealFinder";
import { ArrowLeft } from "lucide-react";

interface UserNavigationProps {
  onBack: () => void;
}

export function UserNavigation({ onBack }: UserNavigationProps) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">🍽️ Bucho Cheio</h1>
            <p className="text-muted-foreground">Encontre refeições disponíveis na sua região</p>
          </div>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </div>

        {/* Meal Finder */}
        <MealFinder />
      </div>
    </div>
  );
}