import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import { MapPin, Phone, Mail, Clock, Store } from "lucide-react";

export function RestaurantRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    cuisine: "",
    openTime: "",
    closeTime: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log("Restaurant registration data:", formData);
    toast.success("Restaurante cadastrado com sucesso! Agora você pode gerenciar suas refeições e horários no painel.");
    
    // Reset form
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      description: "",
      cuisine: "",
      openTime: "",
      closeTime: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="mt-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Cadastre Seu Restaurante
          </CardTitle>
          <CardDescription>
            Junte-se à nossa rede para ajudar a fornecer refeições para quem precisa na sua comunidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Restaurante *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Digite o nome do restaurante"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cuisine">Tipo de Culinária</Label>
                <Select value={formData.cuisine} onValueChange={(value) => handleInputChange("cuisine", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de culinária" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brasileira">Brasileira</SelectItem>
                    <SelectItem value="italiana">Italiana</SelectItem>
                    <SelectItem value="mexicana">Mexicana</SelectItem>
                    <SelectItem value="asiatica">Asiática</SelectItem>
                    <SelectItem value="mediterranea">Mediterrânea</SelectItem>
                    <SelectItem value="indiana">Indiana</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Endereço *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Endereço completo do restaurante"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Número de Telefone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99123-4567"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="restaurante@exemplo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Conte-nos sobre seu restaurante e os tipos de refeições que pode fornecer..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horário de Abertura
                </Label>
                <Input
                  id="openTime"
                  type="time"
                  value={formData.openTime}
                  onChange={(e) => handleInputChange("openTime", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="closeTime">Horário de Fechamento</Label>
                <Input
                  id="closeTime"
                  type="time"
                  value={formData.closeTime}
                  onChange={(e) => handleInputChange("closeTime", e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Cadastrar Restaurante
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}