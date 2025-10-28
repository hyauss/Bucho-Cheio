package buchocheio.com.example.BuchoCheio.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import buchocheio.com.example.BuchoCheio.Service.pratoService;


@RequestMapping("/buchoCheio") // agrupa os endpoints
@RestController

public class pratoController {
    
    @Autowired
    private pratoService pratoService;

    @PostMapping("/addPrato/{idRestaurante}/{idPrato}")
    public String addPrato(@PathVariable Long idRestaurante, @PathVariable Long idPrato) {
        pratoService.addPrato(idRestaurante, idPrato);
        return "Prato adicionado com sucesso ao restaurante " + idRestaurante;
    }

    @DeleteMapping("/removePrato/{idRestaurante}/{idPrato}")
    public String removePrato(@PathVariable Long idRestaurante, @PathVariable Long idPrato) {
        pratoService.removePrato(idRestaurante, idPrato);
        return "Prato removido com sucesso do restaurante " + idRestaurante;
    }
}
