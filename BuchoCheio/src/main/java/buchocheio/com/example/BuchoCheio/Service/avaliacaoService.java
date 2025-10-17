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

	public avaliacaoModel findAvaliacaoById(Long id){
		avaliacaoModel avaliacao = avaliacaoRepository.findAvaliacaoById(id);
		return avaliacao;
		}
	
	public  avaliacaoModel saveAvaliacao(avaliacaoModel avaliacao){
		restauranteModel restaurante = restauranteService.findRestauranteById(avaliacao.getRestauranteId());
		if(restaurante!=null && (avaliacao.getNota()<=10 &&  avaliacao.getNota() >=0)){
			return avaliacaoRepository.save(avaliacao);
		}else{
			return null;
		}
	}

	public List getAllAvaliacoes(){
		return this.avaliacaoRepository.findAll();
	}
}
