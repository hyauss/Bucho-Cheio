package buchocheio.com.example.BuchoCheio.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import buchocheio.com.example.BuchoCheio.Model.loginResponseModel;
import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Repository.restauranteRepository;

@Service
public class restauranteService {

	@Autowired
	private restauranteRepository restauranteRepository;

	public boolean Verificarlogar(String id) {
		String dadoMocadoDoBanco = "asdsadsadsadsda";
		if (id == dadoMocadoDoBanco) {
			return true;
		} else {
			return false;
		}
	}

	public restauranteModel findRestauranteById(Long id) {
		restauranteModel restaurante = restauranteRepository.findRestauranteById(id);
		return restaurante;
	}

	public void addPrato(Long idRestaurante, Long idPrato) {
    // Busca o restaurante pelo ID
    restauranteModel restaurante = findRestauranteById(idRestaurante);
    if (restaurante == null) {
        System.out.println("Restaurante não encontrado!");
        return;
    }
    Long[] idPratos = restaurante.getIdPratos();
    boolean inserido = false;
    // Procura a primeira posição livre (nula ou 0)
    for (int i = 0; i < idPratos.length; i++) {
        if (idPratos[i] == null || idPratos[i] == 0) {
            idPratos[i] = idPrato;
            inserido = true;
            break;
        }
    }
    if (!inserido) {
        System.out.println("Não foi possível adicionar o prato: lista cheia!");
        return;
    }
    // Atualiza o array no modelo
    restaurante.setIdPratos(idPratos);
    // Salva novamente no banco
    restauranteRepository.save(restaurante);
	}

	
	public void removePrato(Long idRestaurante, Long idPrato) {
    // Busca o restaurante pelo ID
    restauranteModel restaurante = findRestauranteById(idRestaurante);
    if (restaurante == null) {
        System.out.println("Restaurante não encontrado!");
        return;
    }
    Long[] idPratos = restaurante.getIdPratos();
    boolean removido = false;
    // Procura o idPrato e remove (define como 0)
    for (int i = 0; i < idPratos.length; i++) {
        if (idPratos[i] != null && idPratos[i].equals(idPrato)) {
            idPratos[i] = 0L; // marca posição como vazia
            removido = true;
            break;
        }
    }
    if (!removido) {
        System.out.println("Prato não encontrado no restaurante!");
        return;
    }
    // Atualiza o array no modelo
    restaurante.setIdPratos(idPratos);
    // Persiste a alteração no banco
    restauranteRepository.save(restaurante);
	}
public loginResponseModel loginRestaurante(String cnpj, String senha) {
    restauranteModel restaurante = restauranteRepository.findRestauranteBycnpj(cnpj);
    
    if (restaurante == null) {
        return new loginResponseModel(false, "Restaurante não cadastrado", null);
    }

    // Comparar conteúdo da String corretamente
    if (!senha.equals(restaurante.getSenha())) {
        return new loginResponseModel(false, "Senha incorreta", null);
    }

    return new loginResponseModel(true, "Login realizado com sucesso", restaurante);
}

public restauranteModel cadastrarRestaurante(restauranteModel restaurante) {
	restauranteModel restauranteBd = restauranteRepository.findRestauranteBycnpj(restaurante.getCnpj());
		if(restauranteBd!=null){
			return null;
		}else{
			return restauranteRepository.save(restaurante);
		}
    }

}