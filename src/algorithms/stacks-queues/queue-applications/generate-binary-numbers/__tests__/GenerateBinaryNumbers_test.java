// javac GenerateBinaryNumbers.java GenerateBinaryNumbers_test.java && java -ea GenerateBinaryNumbers_test
import java.util.List;
import java.util.Arrays;

public class GenerateBinaryNumbers_test {
    public static void main(String[] args) {
        assert GenerateBinaryNumbers.generateBinaryNumbers(5).equals(Arrays.asList("1", "10", "11", "100", "101"));
        assert GenerateBinaryNumbers.generateBinaryNumbers(1).equals(Arrays.asList("1"));
        assert GenerateBinaryNumbers.generateBinaryNumbers(3).equals(Arrays.asList("1", "10", "11"));
        assert GenerateBinaryNumbers.generateBinaryNumbers(10).equals(Arrays.asList("1", "10", "11", "100", "101", "110", "111", "1000", "1001", "1010"));
        assert GenerateBinaryNumbers.generateBinaryNumbers(0).equals(List.of());

        List<String> result = GenerateBinaryNumbers.generateBinaryNumbers(15);
        assert result.size() == 15;

        List<String> result4 = GenerateBinaryNumbers.generateBinaryNumbers(4);
        assert result4.get(result4.size() - 1).equals("100");

        System.out.println("All tests passed!");
    }
}
