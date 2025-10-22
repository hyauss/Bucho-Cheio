package buchocheio.com.example.BuchoCheio.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Repository.restauranteRepository;



@Service
public class restauranteService {

	@Autowired private restauranteRepository restauranteRepository;
	
	/*
	public  boolean Verificarlogar(String id){
		String dadoMocadoDoBanco= "asdsadsadsadsda";
		if(id == dadoMocadoDoBanco){
			return true;
		}else{
			return false;
		}
	}
	*/

	/* 
	public restauranteModel findRestauranteById(Long id){
		restauranteModel restaurante = restauranteRepository.findRestauranteById(id);
		return restaurante;
		}
	*/

	// Cadastrar restaurante
    public restauranteModel cadastrarRestaurante(restauranteModel restaurante) {
        return restauranteRepository.save(restaurante);
    }

    // Buscar por ID
    public restauranteModel findRestauranteById(Long id) {
        return restauranteRepository.findRestauranteById(id);
    }

    // Listar todos
    public List<restauranteModel> listarTodos() {
        return restauranteRepository.findAll();
    }

	// Filtrar por localização
    public List<restauranteModel> filtrarPorLocalizacao(String localizacao) {
        return restauranteRepository.findByEndereco(localizacao);
    }

    // Filtrar por horário
    public List<restauranteModel> filtrarPorHorario(String horario) {
        return restauranteRepository.findByHorarioFuncionamento(horario);
    }
}
