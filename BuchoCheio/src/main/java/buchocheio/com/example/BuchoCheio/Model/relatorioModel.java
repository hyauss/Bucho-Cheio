package buchocheio.com.example.BuchoCheio.Model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity

public class relatorioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRestaurante;

    public Long getId() {
        return idRestaurante;
    }
    public void setId(Long idRestaurante) {
        this.idRestaurante = idRestaurante;
    }

    public relatorioModel(Long idRestaurante) {
        this.idRestaurante = idRestaurante;
    }
}
