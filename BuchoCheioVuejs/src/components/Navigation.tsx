import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RestaurantRegistration } from "./RestaurantRegistration";
import { RestaurantDashboard } from "./RestaurantDashboard";
import { MealFinder } from "./MealFinder";
import { Store, Settings, Search } from "lucide-react";

export function Navigation() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl mb-2">🍽️ Meal Bridge</h1>
          <p className="text-muted-foreground">Connecting restaurants with those in need</p>
        </div>
        
        <Tabs defaultValue="finder" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="finder" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Find Meals
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Register Restaurant
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Restaurant Dashboard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="finder">
            <MealFinder />
          </TabsContent>
          
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