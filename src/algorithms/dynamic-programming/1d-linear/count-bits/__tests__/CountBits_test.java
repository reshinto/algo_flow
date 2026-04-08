// javac CountBits.java CountBits_test.java && java -ea CountBits_test
import java.util.Arrays;

public class CountBits_test {
    public static void main(String[] args) {
        assert Arrays.equals(CountBits.countBits(0), new int[]{0}) : "countBits(0) should be [0]";
        assert Arrays.equals(CountBits.countBits(2), new int[]{0, 1, 1}) : "countBits(2) should be [0,1,1]";
        assert Arrays.equals(CountBits.countBits(5), new int[]{0, 1, 1, 2, 1, 2}) : "countBits(5) should be [0,1,1,2,1,2]";

        int[] result15 = CountBits.countBits(15);
        assert result15[result15.length - 1] == 4 : "last element of countBits(15) should be 4";

        int[] result10 = CountBits.countBits(10);
        assert result10.length == 11 : "countBits(10) should have length 11";

        int[] result16 = CountBits.countBits(16);
        assert result16[0] == 0 : "first element should be 0";
        for (int power : new int[]{1, 2, 4, 8, 16}) {
            assert result16[power] == 1 : "countBits(16)[" + power + "] should be 1";
        }
        assert result16[7] == 3 : "countBits(16)[7] should be 3";
        assert result16[15] == 4 : "countBits(16)[15] should be 4";

        System.out.println("All tests passed!");
    }
}
