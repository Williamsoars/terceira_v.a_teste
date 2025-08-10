import static org.junit.Assert.*;
import java.util.Arrays;
import java.util.Collection;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

/**
 * Classe de teste unitário para a classe Lift.
 * Cobre 100% das decisões e comandos usando JUnit4 e EclEmma.
 */

// --------- TESTE DATA-DRIVEN PARA ADDRIDERS ----------
@RunWith(Parameterized.class)
public class TestLift {

    private Lift liftCustom;
    private int numEntrando;
    private int esperado;

    // Construtor para parâmetros
    public TestLift(int numEntrando, int esperado) {
        this.numEntrando = numEntrando;
        this.esperado = esperado;
    }

    // Dados para teste data-driven (vários cenários)
    @Parameterized.Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {1, 1},   // Não excede capacidade
            {2, 2},   // Enche exatamente
            {5, 2}    // Excede capacidade → fica cheio
        });
    }

    @Before
    public void setUp() {
        // Capacidade 2 para testar os cenários
        liftCustom = new Lift(3, 2);
    }

    @Test
    public void testAddRidersDataDriven() {
        // Adiciona passageiros
        liftCustom.addRiders(numEntrando);
        // Verifica número esperado de passageiros
        assertEquals(esperado, liftCustom.getNumRiders());
    }

    // --------- TESTES DE CENÁRIOS DISTINTOS ----------

    @Test
    public void testCenarioEdicaoCompleto() {
        Lift lift = new Lift(4, 3);
        // Começa vazio
        assertEquals(0, lift.getNumRiders());
        // Adiciona passageiros
        lift.addRiders(2);
        assertEquals(2, lift.getNumRiders());
        // Move para cima e depois para baixo
        lift.goUp();
        lift.goUp();
        assertEquals(2, lift.getCurrentFloor());
        lift.goDown();
        assertEquals(1, lift.getCurrentFloor());
        // Chama para o 0
        lift.call(0);
        assertEquals(0, lift.getCurrentFloor());
    }

    @Test
    public void testCenarioConsultaLimites() {
        Lift lift = new Lift(5);
        // Tenta descer no térreo
        lift.goDown();
        assertEquals(0, lift.getCurrentFloor());
        // Sobe ao topo
        for (int i = 0; i < 10; i++) lift.goUp();
        assertEquals(5, lift.getCurrentFloor());
        // Tenta subir além do topo
        lift.goUp();
        assertEquals(5, lift.getCurrentFloor());
    }

    @Test
    public void testCenarioCallInvalido() {
        Lift lift = new Lift(5);
        // Chama para andar negativo
        lift.call(-1);
        assertEquals(0, lift.getCurrentFloor());
        // Chama para andar acima do topo
        lift.call(99);
        assertEquals(0, lift.getCurrentFloor());
    }
}
