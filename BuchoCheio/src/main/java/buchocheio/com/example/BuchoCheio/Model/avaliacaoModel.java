package buchocheio.com.example.BuchoCheio.Model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class avaliacaoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long restauranteId;
    private String avaliacao;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getRestauranteId() {
        return restauranteId;
    }
    public void setRestauranteId(Long restauranteId) {
        this.restauranteId = restauranteId;
    }
    public String getAvaliacao() {
        return avaliacao;
    }
    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public avaliacaoModel(Long id, Long restauranteId, String avaliacao) {
        this.id = id;
        this.restauranteId = restauranteId;
        this.avaliacao = avaliacao;
    }

    public avaliacaoModel() {
        this.restauranteId = null;
        this.avaliacao = "";
    }

    
}
