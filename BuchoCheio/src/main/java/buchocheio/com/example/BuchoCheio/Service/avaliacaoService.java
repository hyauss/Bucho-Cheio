package buchocheio.com.example.BuchoCheio.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import buchocheio.com.example.BuchoCheio.Model.avaliacaoModel;
import buchocheio.com.example.BuchoCheio.Repository.avaliacaoRepository;

@Service
public class avaliacaoService {
	@Autowired private avaliacaoRepository avaliacaoRepository;
	
	public  avaliacaoModel saveAvaliacao(avaliacaoModel avalicao){
		return avaliacaoRepository.save(avalicao);
	}

	public List getAllAvaliacoes(){
		return this.avaliacaoRepository.findAll();
	}

}
