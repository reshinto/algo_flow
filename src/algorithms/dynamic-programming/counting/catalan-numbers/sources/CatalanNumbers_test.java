// javac CatalanNumbers.java CatalanNumbers_test.java && java -ea CatalanNumbers_test
public class CatalanNumbers_test {
    public static void main(String[] args) {
        assert CatalanNumbers.catalanNumber(0) == 1 : "C(0) should be 1";
        assert CatalanNumbers.catalanNumber(1) == 1 : "C(1) should be 1";
        assert CatalanNumbers.catalanNumber(2) == 2 : "C(2) should be 2";
        assert CatalanNumbers.catalanNumber(3) == 5 : "C(3) should be 5";
        assert CatalanNumbers.catalanNumber(5) == 42 : "C(5) should be 42";
        assert CatalanNumbers.catalanNumber(8) == 1430 : "C(8) should be 1430";

        System.out.println("All tests passed!");
    }
}
