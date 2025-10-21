package buchocheio.com.example.BuchoCheio.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import buchocheio.com.example.BuchoCheio.Model.loginResponseModel;
import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Service.restauranteService;



@RestController

public class restauranteController {

    @Autowired
      private restauranteService restauranteService;

    
    @GetMapping("/buchoCheio/findRestauranteById/{id}")
    public restauranteModel findRestauranteById(@PathVariable Long id) {
        return restauranteService.findRestauranteById(id);
    }
    
    @GetMapping("/buchoCheio/loginRestaurante/{cnpj}/{senha}")
    public loginResponseModel getMethodName(@PathVariable String cnpj,@PathVariable String senha) {
        return restauranteService.loginRestaurante(cnpj,senha);
    }

     @PostMapping("/buchoCheio/cadastrarRestaurante")
    public restauranteModel cadastrarRestaurante(@RequestBody restauranteModel restaurante) {
        return restauranteService.cadastrarRestaurante(restaurante);
    }

}
