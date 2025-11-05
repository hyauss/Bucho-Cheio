<template>
  <div class="home">
    <h1>Bem-vindo ao Bucho Cheio</h1>
    <!-- Carrossel de Imagens -->
    <div class="carousel-wrapper">
      <div class="carousel">
        <div class="carousel-images">
          <img 
            v-for="(image, index) in visibleImages" 
            :key="index" 
            :src="image" 
            alt="Imagem do Carrossel" 
            class="carousel-image"
            :class="{
              'center': index === 1, 
              'prev': index === 0,
              'next': index === 2
            }"
          >
        </div>
        <button class="carousel-button prev" @click="prevImage">❮</button>
        <button class="carousel-button next" @click="nextImage">❯</button>
      </div>
    </div>
    <div class="actions">
      <button @click="$router.push('/restaurants')">Consultar Restaurantes</button>
      <button @click="$router.push('/restaurants/new')">Cadastrar Restaurante</button>
      <button @click="$router.push('/reports')">Obter Relatórios</button>
    </div>
  </div>
</template>

<script>
// Importando as imagens da pasta assets
import image1 from '@/assets/Holder1.jpg';
import image2 from '@/assets/Holder2.jpg'; // Substitua pelos nomes das suas imagens
import image3 from '@/assets/Holder3.jpg'; // Substitua pelos nomes das suas imagens

export default {
  name: 'HomeView',
  data() {
    return {
      // Array com as imagens do carrossel
      images: [image1, image2, image3, image2, image1, image3],
      currentIndex: 1, // Índice da imagem central inicial
    };
  },
  computed: {
    // Calcula as imagens a serem exibidas no carrossel
    visibleImages() {
      const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      const nextIndex = (this.currentIndex + 1) % this.images.length;
      return [this.images[prevIndex], this.images[this.currentIndex], this.images[nextIndex]];
    },
  },
  methods: {
    // Função para ir para a imagem anterior
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    // Função para ir para a próxima imagem
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
};
</script>

<style scoped>
/* Estilo para a tela inteira sem fundo off-white */
.home {
  min-height: 100vh; /* Garantir que a altura mínima da tela seja 100% da altura da janela */
  text-align: left;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 20px; /* Padding nas laterais da tela */
}

.actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}

.carousel-wrapper {
  padding: 0 20px; /* Padding nas laterais */
  border-radius: 8px; /* Cantos arredondados */
  display: flex; /* Flexbox para garantir que o padding seja respeitado */
  justify-content: center; /* Centraliza o carrossel dentro do wrapper */
  margin-top: 30px; /* Espaçamento do carrossel em relação ao topo */
  width: 100%; /* Garantir que o carrossel ocupe toda a largura disponível */
}

/* Estilos do Carrossel */
.carousel {
  position: relative;
  width: 100%;
  max-width: 100%; /* Garante que o carrossel ocupe toda a largura disponível dentro do wrapper */
  margin: 0 auto;
  overflow: hidden;
  height: 350px;
}

.carousel-images {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center; /* Garantir que as imagens fiquem centralizadas verticalmente */
}

.carousel-image {
  width: 50%; /* Ajusta a largura para dar mais espaço entre as imagens */
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0.7; /* Imagens laterais mais opacas */
  transform: scale(0.85); /* Imagens laterais menores */
  margin: -1%; /* Adiciona espaçamento entre as imagens */
  border-radius: 15px; /* Borda arredondada nas imagens */
}

/* Imagem Central */
.carousel-image.center {
  transform: scale(1.05); /* Aumenta a imagem central de forma sutil */
  opacity: 1; /* Imagem central é completamente visível */
  z-index: 10; /* A imagem central fica por cima das outras */
  border-radius: 15px; /* Garantir que a borda arredondada também apareça na imagem central */
}

/* Imagens Laterais */
.carousel-image.prev,
.carousel-image.next {
  opacity: 0.5; /* A imagem anterior e próxima ficam mais desbotadas */
  transform: scale(0.85); /* Aumenta o overlap lateral */
  border-radius: 15px; /* Borda arredondada nas imagens laterais */
}

/* Estilo dos botões de navegação */
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>