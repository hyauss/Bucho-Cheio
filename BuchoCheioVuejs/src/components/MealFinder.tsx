import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Search, MapPin, Clock, Phone, Utensils, Star } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  cuisine: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  meals: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    availableUntil: string;
  }>;
}

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Café Sunny",
    address: "Rua Principal 123, Centro",
    phone: "(11) 99123-4567",
    cuisine: "Brasileira",
    distance: "0,8 km",
    rating: 4.5,
    isOpen: true,
    meals: [
      {
        id: "1",
        name: "Sopa de Legumes",
        description: "Sopa fresca de legumes com pão",
        category: "sopa",
        quantity: 20,
        availableUntil: "18:00"
      },
      {
        id: "2",
        name: "Sanduíche de Frango",
        description: "Sanduíche de frango grelhado com salada",
        category: "sanduiche",
        quantity: 15,
        availableUntil: "16:00"
      }
    ]
  },
  {
    id: "2",
    name: "Cozinha do Mario",
    address: "Av. das Flores 456, Bela Vista",
    phone: "(11) 99234-5678",
    cuisine: "Italiana",
    distance: "1,9 km",
    rating: 4.8,
    isOpen: true,
    meals: [
      {
        id: "3",
        name: "Macarrão ao Molho",
        description: "Macarrão clássico com molho marinara",
        category: "principal",
        quantity: 12,
        availableUntil: "19:00"
      },
      {
        id: "4",
        name: "Salada Caesar",
        description: "Alface fresca com parmesão e croutons",
        category: "salada",
        quantity: 8,
        availableUntil: "17:30"
      }
    ]
  },
  {
    id: "3",
    name: "Taco Express",
    address: "Rua dos Pinheiros 789, Vila Madalena",
    phone: "(11) 99345-6789",
    cuisine: "Mexicana",
    distance: "3,4 km",
    rating: 4.3,
    isOpen: false,
    meals: []
  }
];

export function MealFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [restaurants] = useState<Restaurant[]>(mockRestaurants);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = searchQuery === "" || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.meals.some(meal => 
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine;
    
    const matchesCategory = selectedCategory === "all" || 
      restaurant.meals.some(meal => meal.category === selectedCategory);

    return matchesSearch && matchesCuisine && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      sopa: "bg-blue-100 text-blue-800",
      sanduiche: "bg-green-100 text-green-800",
      salada: "bg-yellow-100 text-yellow-800",
      principal: "bg-red-100 text-red-800",
      sobremesa: "bg-purple-100 text-purple-800",
      outro: "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors.outro;
  };

  const totalMealsAvailable = filteredRestaurants.reduce(
    (total, restaurant) => total + restaurant.meals.reduce((sum, meal) => sum + meal.quantity, 0),
    0
  );

  return (
    <div className="mt-6 space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Encontrar Refeições Disponíveis
          </CardTitle>
          <CardDescription>
            Busque por restaurantes e refeições disponíveis na sua região.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque restaurantes, refeições ou localizações..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cuisine">Tipo de Culinária</Label>
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as culinárias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as culinárias</SelectItem>
                    <SelectItem value="Brasileira">Brasileira</SelectItem>
                    <SelectItem value="Italiana">Italiana</SelectItem>
                    <SelectItem value="Mexicana">Mexicana</SelectItem>
                    <SelectItem value="Asiática">Asiática</SelectItem>
                    <SelectItem value="Mediterrânea">Mediterrânea</SelectItem>
                    <SelectItem value="Indiana">Indiana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria da Refeição</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="sopa">Sopa</SelectItem>
                    <SelectItem value="sanduiche">Sanduíche</SelectItem>
                    <SelectItem value="salada">Salada</SelectItem>
                    <SelectItem value="principal">Prato Principal</SelectItem>
                    <SelectItem value="sobremesa">Sobremesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span>{filteredRestaurants.length} restaurantes encontrados</span>
                <span>{totalMealsAvailable} refeições disponíveis</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredRestaurants.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum restaurante ou refeição encontrada com os critérios de busca.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className={!restaurant.isOpen ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {restaurant.name}
                      {!restaurant.isOpen && (
                        <Badge variant="destructive">Fechado</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {restaurant.address} • {restaurant.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {restaurant.phone}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <Badge variant="secondary">{restaurant.cuisine}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {restaurant.meals.length === 0 ? (
                  <p className="text-muted-foreground">Nenhuma refeição disponível no momento</p>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <Utensils className="w-4 h-4" />
                      <span>{restaurant.meals.length} tipos de refeição • {restaurant.meals.reduce((sum, meal) => sum + meal.quantity, 0)} porções disponíveis</span>
                    </div>
                    <div className="space-y-3">
                      {restaurant.meals.map((meal) => (
                        <div key={meal.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4>{meal.name}</h4>
                              <Badge className={getCategoryColor(meal.category)}>
                                {meal.category}
                              </Badge>
                            </div>
                            {meal.description && (
                              <p className="text-muted-foreground text-sm mb-2">{meal.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{meal.quantity} porções</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Até {meal.availableUntil}
                              </span>
                            </div>
                          </div>
                          <Button 
                            disabled={!restaurant.isOpen}
                            className="ml-4"
                          >
                            Reservar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}