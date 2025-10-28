package buchocheio.com.example.BuchoCheio.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Repository.restauranteRepository;

@Service
public class pratoService {

	@Autowired
	private restauranteRepository restauranteRepository;
	
	@Autowired
	private restauranteService restauranteService;

	//id restaurante salvar prato, salvar id do prato salvo no resturante
	public void addPrato(Long idRestaurante, Long idPrato) {
		// Busca o restaurante pelo ID
		restauranteModel restaurante = restauranteService.findRestauranteById(idRestaurante);
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

	//deletar prato no modelo
	public void removePrato(Long idRestaurante, Long idPrato) {
		// Busca o restaurante pelo ID
		restauranteModel restaurante = restauranteService.findRestauranteById(idRestaurante);
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
}