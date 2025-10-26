import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Search, Store, ArrowRight, Heart, Users, Utensils, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onUserTypeSelect: (userType: 'seeker' | 'restaurant') => void;
}

export function LandingPage({ onUserTypeSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">🍽️ Bucho Cheio</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Conectando restaurantes com quem precisa
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Construindo comunidades mais fortes, reduzindo o desperdício de alimentos e fornecendo acesso a refeições nutritivas para todos.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-muted rounded-lg">
            <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl mb-1">2.500+</div>
            <div className="text-sm text-muted-foreground">Refeições Fornecidas</div>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <Store className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl mb-1">150+</div>
            <div className="text-sm text-muted-foreground">Restaurantes Parceiros</div>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl mb-1">1.200+</div>
            <div className="text-sm text-muted-foreground">Pessoas Ajudadas</div>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 border-green-200 hover:border-green-400">
            <CardHeader className="text-center">
              <CardTitle className="flex flex-col items-center gap-4">
                <div className="p-6 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <Utensils className="w-12 h-12 text-green-700" />
                </div>
                <span className="text-2xl">🍽️ Procurando Refeições</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Encontre comida disponível perto de você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visual food image */}
              <div className="overflow-hidden rounded-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1622046751454-c99d3794f96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGxhdGUlMjBtZWFsfGVufDF8fHx8MTc1NzY1MTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Refeição disponível"
                  className="w-full h-32 object-cover"
                />
              </div>
              
              {/* Visual instructions with larger icons and emojis */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl">📍</div>
                  <span className="text-sm">Perto de você</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl">🍛</div>
                  <span className="text-sm">Comida disponível</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl">🏃</div>
                  <span className="text-sm">Vá buscar</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl">🆓</div>
                  <span className="text-sm">Gratuito</span>
                </div>
              </div>
              
              {/* Enhanced visual button */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-1 rounded-xl">
                <Button 
                  onClick={() => onUserTypeSelect('seeker')} 
                  className="w-full h-16 bg-green-600 hover:bg-green-700 transition-colors text-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">🍽️</span>
                    <span>Encontrar Refeições</span>
                    <span className="text-2xl">➡️</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer group border-blue-200 hover:border-blue-400">
            <CardHeader className="text-center">
              <CardTitle className="flex flex-col items-center gap-3">
                <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Store className="w-8 h-8 text-blue-700" />
                </div>
                <span className="text-xl">🏪 Proprietário de Restaurante</span>
              </CardTitle>
              <CardDescription className="text-base">
                Compartilhe refeições excedentes com sua comunidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visual restaurant image */}
              <div className="overflow-hidden rounded-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWZ8ZW58MXx8fHwxNzU3NTQ5MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Restaurante"
                  className="w-full h-32 object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">📝</div>
                  <span className="text-xs">Cadastre</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">🍽️</div>
                  <span className="text-xs">Liste refeições</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">⏰</div>
                  <span className="text-xs">Horários</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">❤️</div>
                  <span className="text-xs">Impacto positivo</span>
                </div>
              </div>
              <Button 
                onClick={() => onUserTypeSelect('restaurant')} 
                variant="outline" 
                className="w-full h-12 group-hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏪</span>
                  <span>Participar como Restaurante</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-8">
          <h2 className="text-2xl mb-6">Como o Bucho Cheio Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                1
              </div>
              <h3>Restaurantes Compartilham</h3>
              <p className="text-muted-foreground text-sm">
                Restaurantes parceiros listam suas refeições excedentes e porções disponíveis
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                2
              </div>
              <h3>Pessoas Descobrem</h3>
              <p className="text-muted-foreground text-sm">
                Membros da comunidade buscam e encontram refeições disponíveis por perto
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                3
              </div>
              <h3>Comunidade se Conecta</h3>
              <p className="text-muted-foreground text-sm">
                Refeições são reservadas e retiradas, reduzindo o desperdício e a fome
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm border-t pt-8">
          <p>Construindo comunidades mais fortes e conectadas através do compartilhamento de alimentos</p>
        </div>
      </div>
    </div>
  );
}