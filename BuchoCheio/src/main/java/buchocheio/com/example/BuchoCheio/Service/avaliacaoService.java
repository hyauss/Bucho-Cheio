package buchocheio.com.example.BuchoCheio.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import buchocheio.com.example.BuchoCheio.Model.avaliacaoModel;
import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Repository.avaliacaoRepository;


@Service
public class avaliacaoService {
	@Autowired private avaliacaoRepository avaliacaoRepository;
	@Autowired private restauranteService restauranteService;
	
	public  avaliacaoModel saveAvaliacao(avaliacaoModel avalicao){
		restauranteModel restaurante = restauranteService.findRestauranteById(avalicao.getRestauranteId());
		if(restaurante!=null){
			return avaliacaoRepository.save(avalicao);
		}else{
			return null;
		}
	}

	public List getAllAvaliacoes(){
		return this.avaliacaoRepository.findAll();
	}

}
