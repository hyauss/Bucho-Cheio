package buchocheio.com.example.BuchoCheio.Model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity

public class restauranteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //private Long[] idPratos; 
    private String endereco;
    private String nome;
    private String cnpj;
    private String horarioFuncionamento;
    private String telefone;

    // Construtores
    public restauranteModel(){
    }

    public restauranteModel(Long id, String nome, String endereco, String telefone, String horarioFuncionamento, String cnpj, String localizacao) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.horarioFuncionamento = horarioFuncionamento;
        this.cnpj = cnpj;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getHorarioFuncionamento() {
        return horarioFuncionamento;
    }

    public void setHorarioFuncionamento(String horarioFuncionamento) {
        this.horarioFuncionamento = horarioFuncionamento;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}
