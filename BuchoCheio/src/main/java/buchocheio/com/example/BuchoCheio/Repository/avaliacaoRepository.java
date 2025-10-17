package buchocheio.com.example.BuchoCheio.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import buchocheio.com.example.BuchoCheio.Model.avaliacaoModel;

@Repository
public interface avaliacaoRepository extends JpaRepository<avaliacaoModel, Long> {

    // Consulta customizada: buscar todas avaliações de um restaurante específico
}
