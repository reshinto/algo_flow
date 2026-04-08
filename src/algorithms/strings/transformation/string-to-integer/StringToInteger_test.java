/** Correctness tests for the StringToInteger algorithm. */
public class StringToInteger_test {
    static final int INT32_MIN = Integer.MIN_VALUE;
    static final int INT32_MAX = Integer.MAX_VALUE;

    public static void main(String[] args) {
        assert StringToInteger.stringToInteger("42") == 42;
        assert StringToInteger.stringToInteger("   -42") == -42;
        assert StringToInteger.stringToInteger("4193 with words") == 4193;
        assert StringToInteger.stringToInteger("words and 987") == 0;
        assert StringToInteger.stringToInteger("") == 0;
        assert StringToInteger.stringToInteger("   ") == 0;
        assert StringToInteger.stringToInteger("+100") == 100;
        assert StringToInteger.stringToInteger("0") == 0;
        assert StringToInteger.stringToInteger("2147483648") == INT32_MAX;
        assert StringToInteger.stringToInteger("-2147483649") == INT32_MIN;
        assert StringToInteger.stringToInteger("99999999999999999") == INT32_MAX;
        assert StringToInteger.stringToInteger("-99999999999999999") == INT32_MIN;
        assert StringToInteger.stringToInteger("  123") == 123;
        assert StringToInteger.stringToInteger("-abc") == 0;
        assert StringToInteger.stringToInteger("2147483647") == INT32_MAX;
        assert StringToInteger.stringToInteger("-2147483648") == INT32_MIN;
        System.out.println("All tests passed!");
    }
}
