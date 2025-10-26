import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { RestaurantRegistration } from "./RestaurantRegistration";
import { RestaurantDashboard } from "./RestaurantDashboard";
import { Store, Settings, ArrowLeft } from "lucide-react";

interface RestaurantNavigationProps {
  onBack: () => void;
}

export function RestaurantNavigation({ onBack }: RestaurantNavigationProps) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">🍽️ Bucho Cheio</h1>
            <p className="text-muted-foreground">Portal do Restaurante Parceiro</p>
          </div>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </div>

        {/* Restaurant Tabs */}
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Cadastrar Restaurante
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Gerenciar Restaurante
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="register">
            <RestaurantRegistration />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <RestaurantDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}