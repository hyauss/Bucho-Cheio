package buchocheio.com.example.BuchoCheio.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import buchocheio.com.example.BuchoCheio.Model.avaliacaoModel;
import buchocheio.com.example.BuchoCheio.Service.avaliacaoService;


@RestController

public class avaliacaoController {
    
    @Autowired
    private avaliacaoService avaliacaoService;

    @GetMapping("/buchoCheio/avaliacao")
    public List getAllAvaliacoes() {
        return avaliacaoService.getAllAvaliacoes();
    }
    
    @PostMapping("/buchoCheio/avaliacao")
    public avaliacaoModel saveAvaliacao(@RequestBody avaliacaoModel avalicao) {    
        return this.avaliacaoService.saveAvaliacao(avalicao);
    }    
}
