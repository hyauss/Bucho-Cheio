package buchocheio.com.example.BuchoCheio.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import buchocheio.com.example.BuchoCheio.Model.restauranteModel;


@Repository

public interface restauranteRepository extends JpaRepository<restauranteModel, Long> {
    restauranteModel findRestauranteById(Long restauranteId);

    // Filtro por localização (parcial, insensível a maiúsculas/minúsculas)
    List<restauranteModel> findByEndereco(String endereco);

    // Filtro por horário (ex: "Seg", "Dom", "12h")
    List<restauranteModel> findByHorarioFuncionamento(String horario);

}