package buchocheio.com.example.BuchoCheio.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Repository.restauranteRepository;


@Service
public class restauranteService {

	@Autowired private restauranteRepository restauranteRepository;
	
	public  boolean Verificarlogar(String id){
		String dadoMocadoDoBanco= "asdsadsadsadsda";
		if(id == dadoMocadoDoBanco){
			return true;
		}else{
			return false;
		}
	}

	public restauranteModel findRestauranteById(Long id){
		restauranteModel restaurante = restauranteRepository.findRestauranteById(id);
		return restaurante;
		}
}
