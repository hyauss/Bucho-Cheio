package buchocheio.com.example.BuchoCheio.Model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity

public class restauranteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long[] idPratos; 
    private String endereco;
    private String nome;

    @Column(unique = true, nullable = false)
    private String cnpj;

    private String horarioFuncionamento;
    private String telefone;
    private String senha;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long[] getIdPratos() {
        return idPratos;
    }
    public void setIdPratos(Long[] idPratos) {
        this.idPratos = idPratos;
    }
    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCnpj() {
        return cnpj;
    }
    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }
    public String getHorarioFuncionamento() {
        return horarioFuncionamento;
    }
    public void setHorarioFuncionamento(String horarioFuncionamento) {
        this.horarioFuncionamento = horarioFuncionamento;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public restauranteModel(Long id, Long[] idPratos, String endereco, String nome, String cnpj,
            String horarioFuncionamento, String telefone, String senha) {
        this.id = id;
        this.idPratos = idPratos;
        this.endereco = endereco;
        this.nome = nome;
        this.cnpj = cnpj;
        this.horarioFuncionamento = horarioFuncionamento;
        this.telefone = telefone;
        this.senha = senha;
    }
    
    public restauranteModel() {
    }
    
    
}