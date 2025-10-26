import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { Plus, Clock, Utensils, Trash2, Edit } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  availableUntil: string;
}

export function RestaurantDashboard() {
  const [meals, setMeals] = useState<Meal[]>([
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
  ]);

  const [newMeal, setNewMeal] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    availableUntil: ""
  });

  const [workingHours, setWorkingHours] = useState({
    segunda: { open: "09:00", close: "18:00", isOpen: true },
    terca: { open: "09:00", close: "18:00", isOpen: true },
    quarta: { open: "09:00", close: "18:00", isOpen: true },
    quinta: { open: "09:00", close: "18:00", isOpen: true },
    sexta: { open: "09:00", close: "18:00", isOpen: true },
    sabado: { open: "10:00", close: "16:00", isOpen: true },
    domingo: { open: "10:00", close: "16:00", isOpen: false }
  });

  const addMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.quantity || !newMeal.availableUntil) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      description: newMeal.description,
      category: newMeal.category || "outro",
      quantity: parseInt(newMeal.quantity),
      availableUntil: newMeal.availableUntil
    };

    setMeals(prev => [...prev, meal]);
    setNewMeal({ name: "", description: "", category: "", quantity: "", availableUntil: "" });
    toast.success("Refeição adicionada com sucesso!");
  };

  const removeMeal = (id: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
    toast.success("Refeição removida");
  };

  const updateWorkingHours = () => {
    toast.success("Horários de funcionamento atualizados com sucesso!");
  };

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

  return (
    <div className="mt-6 space-y-6">
      {/* Add New Meal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Nova Refeição
          </CardTitle>
          <CardDescription>
            Adicione refeições que estão disponíveis para retirada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addMeal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mealName">Nome da Refeição *</Label>
                <Input
                  id="mealName"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ex: Sopa de Legumes"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={newMeal.category} onValueChange={(value) => setNewMeal(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sopa">Sopa</SelectItem>
                    <SelectItem value="sanduiche">Sanduíche</SelectItem>
                    <SelectItem value="salada">Salada</SelectItem>
                    <SelectItem value="principal">Prato Principal</SelectItem>
                    <SelectItem value="sobremesa">Sobremesa</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newMeal.description}
                onChange={(e) => setNewMeal(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Breve descrição da refeição"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade Disponível *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newMeal.quantity}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="Quantas porções?"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availableUntil">Disponível Até *</Label>
                <Input
                  id="availableUntil"
                  type="time"
                  value={newMeal.availableUntil}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, availableUntil: e.target.value }))}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Refeição
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Meals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Refeições Disponíveis Atualmente
          </CardTitle>
          <CardDescription>
            Gerencie suas refeições disponíveis no momento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma refeição disponível. Adicione algumas refeições acima.
            </p>
          ) : (
            <div className="space-y-4">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4>{meal.name}</h4>
                      <Badge className={getCategoryColor(meal.category)}>
                        {meal.category}
                      </Badge>
                    </div>
                    {meal.description && (
                      <p className="text-muted-foreground mb-2">{meal.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{meal.quantity} porções</span>
                      <span>Até {meal.availableUntil}</span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Atualizar Horários de Funcionamento
          </CardTitle>
          <CardDescription>
            Defina os horários de funcionamento do seu restaurante para cada dia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 capitalize">{day}</div>
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) => setWorkingHours(prev => ({
                      ...prev,
                      [day]: { ...prev[day as keyof typeof prev], open: e.target.value }
                    }))}
                    disabled={!hours.isOpen}
                    className="w-32"
                  />
                  <span>às</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) => setWorkingHours(prev => ({
                      ...prev,
                      [day]: { ...prev[day as keyof typeof prev], close: e.target.value }
                    }))}
                    disabled={!hours.isOpen}
                    className="w-32"
                  />
                  <Button
                    variant={hours.isOpen ? "destructive" : "default"}
                    size="sm"
                    onClick={() => setWorkingHours(prev => ({
                      ...prev,
                      [day]: { ...prev[day as keyof typeof prev], isOpen: !hours.isOpen }
                    }))}
                  >
                    {hours.isOpen ? "Close" : "Open"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <Button onClick={updateWorkingHours} className="w-full">
            Update Working Hours
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}