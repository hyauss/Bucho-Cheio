package buchocheio.com.example.BuchoCheio.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Service.restauranteService;


@RestController

public class restauranteController {

    @Autowired
      private restauranteService restauranteService;
    
    // Cadastrar restaurante
    @PostMapping("/buchoCheio/cadastrarRestaurante")
    public restauranteModel cadastrarRestaurante(@RequestBody restauranteModel restaurante) {
        return restauranteService.cadastrarRestaurante(restaurante);
    }
    
    // Buscar por ID
    @GetMapping("/buchoCheio/findRestauranteById/{id}")
    public restauranteModel findRestauranteById(@PathVariable Long id) {
        return restauranteService.findRestauranteById(id);
    }
    
    // Listar todos (para a parte de consulta)
    @GetMapping("buchoCheio/listarTodos")
    public List<restauranteModel> listarTodos() {
        return restauranteService.listarTodos();
    }

    // Filtro por localização
    @GetMapping("/filtro/localizacao/{localizacao}")
    public List<restauranteModel> filtrarPorLocalizacao(@PathVariable String localizacao) {
        return restauranteService.filtrarPorLocalizacao(localizacao);
    }

    // Filtro por horário
    @GetMapping("/filtro/horario/{horario}")
    public List<restauranteModel> filtrarPorHorario(@PathVariable String horario) {
        return restauranteService.filtrarPorHorario(horario);
    }

}
