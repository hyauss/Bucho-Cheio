package buchocheio.com.example.BuchoCheio;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import buchocheio.com.example.BuchoCheio.Service.testService;


@SpringBootTest
class BuchoCheioApplicationTests {

    @Autowired
    private testService testService;

	//login válido
	@Test
	void VerificarlogarTest1() {
		boolean resultado = testService.Verificarlogar("asdsadsadsadsda");
		assertEquals(true, resultado);
	}
	
	//login inválido
	@Test
	void VerificarlogarTest2() {
		boolean resultado = testService.Verificarlogar("asdsadsada");
		assertEquals(false, resultado);
	}
}
