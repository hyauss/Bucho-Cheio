package buchocheio.com.example.BuchoCheio.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;

import java.util.List;


@Repository

public interface restauranteRepository extends JpaRepository<restauranteModel, Long> {
    restauranteModel findRestauranteById(Long restauranteId);

    // Filtro por localização (parcial, insensível a maiúsculas/minúsculas)
    List<restauranteModel> findByLocalizacaoContainingIgnoreCase(String localizacao);

    // Filtro por horário (ex: "Seg", "Dom", "12h")
    List<restauranteModel> findByHorarioFuncionamentoContainingIgnoreCase(String horario);

}