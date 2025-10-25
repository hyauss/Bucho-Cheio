// package buchocheio.com.example.BuchoCheio.Service;

// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Paths;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import buchocheio.com.example.BuchoCheio.Model.avaliacaoModel;
// import buchocheio.com.example.BuchoCheio.Model.relatorioModel;
// import buchocheio.com.example.BuchoCheio.Model.restauranteModel;
// import buchocheio.com.example.BuchoCheio.Repository.avaliacaoRepository;

// @Service
// public class relatorioService {
//     @Autowired private restauranteService restauranteService;
//     @Autowired private avaliacaoService avaliacaoService;
//     @Autowired private avaliacaoRepository avaliacaoRepository;

//     public relatorioModel createReport(Long idRestaurante){
//         avaliacaoModel avaliacao = avaliacaoRepository.findAvaliacaoById(idRestaurante);
//         //restauranteModel pratos[] = pratosRepository.findpratosById(idRestaurante);
//         Long avaliacaoTotal = 0L;
//         Long avaliacaoQuantidade = 0L;
//         Double mediaAvaliacoes = 0.0;
//         foreach(Long avaliacaos : avaliacao){
//             avaliacaoTotal += avaliacao;
//             avaliacaoQuantidade += 1;
//         }
//         if (avaliacaoQuantidade > 0) {
//             mediaAvaliacoes = (double) avaliacaoTotal / avaliacaoQuantidade;
//             buildReport(idRestaurante, mediaAvaliacoes);
//             return null;
//         }
//         System.out.println("Falha ao gerar o arquivo TXT: ");
//         return null;
//     }

//     public void buildReport(Long idRestaurante, Double mediaAvaliacoes) {
//         String nomeArquivo = "relatorioRestaurante_" + idRestaurante + ".txt";
//         Path filePath = Paths.get(nomeArquivo);
//         String conteudo = "Relatório de Avaliações - Restaurante ID: " + idRestaurante + "\n" + "Quantidade de pratos vendidos: " + "\n" + "Média de Avaliações: " + String.format("%.2f", mediaAvaliacoes) ;
//         Files.writeString(filePath, conteudo);
//         System.out.println("Arquivo TXT gerado com sucesso em: " + filePath.toAbsolutePath());
//     }
// }
