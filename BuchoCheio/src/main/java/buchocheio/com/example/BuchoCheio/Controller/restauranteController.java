package buchocheio.com.example.BuchoCheio.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Service.restauranteService;


@RestController

public class restauranteController {

    @Autowired
      private restauranteService restauranteService;
    
    @GetMapping("/buchoCheio/findRestauranteById/{id}")
    public restauranteModel findRestauranteById(@PathVariable Long id) {
        return restauranteService.findRestauranteById(id);
    }package buchocheio.com.example.BuchoCheio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
import buchocheio.com.example.BuchoCheio.Service.restauranteService;

@RestController
@RequestMapping("/buchoCheio") // agrupa os endpoints
public class restauranteController {

    @Autowired
    private restauranteService restauranteService;

    @GetMapping("/findRestauranteById/{id}")
    public restauranteModel findRestauranteById(@PathVariable Long id) {
        return restauranteService.findRestauranteById(id);
    }

    @PostMapping("/addPrato/{idRestaurante}/{idPrato}")
    public String addPrato(@PathVariable Long idRestaurante, @PathVariable Long idPrato) {
        restauranteService.addPrato(idRestaurante, idPrato);
        return "Prato adicionado com sucesso ao restaurante " + idRestaurante;
    }

    @DeleteMapping("/removePrato/{idRestaurante}/{idPrato}")
    public String removePrato(@PathVariable Long idRestaurante, @PathVariable Long idPrato) {
        restauranteService.removePrato(idRestaurante, idPrato);
        return "Prato removido com sucesso do restaurante " + idRestaurante;
    }
  }


}
