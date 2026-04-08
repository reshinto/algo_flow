// javac DecodeWaysMemoization.java DecodeWaysMemoization_test.java && java -ea DecodeWaysMemoization_test
public class DecodeWaysMemoization_test {
    public static void main(String[] args) {
        assert DecodeWaysMemoization.decodeWaysMemoization("") == 0 : "empty string should return 0";
        assert DecodeWaysMemoization.decodeWaysMemoization("1") == 1 : "'1' should return 1";
        assert DecodeWaysMemoization.decodeWaysMemoization("0") == 0 : "'0' should return 0";
        assert DecodeWaysMemoization.decodeWaysMemoization("12") == 2 : "'12' should return 2";
        assert DecodeWaysMemoization.decodeWaysMemoization("27") == 1 : "'27' should return 1";
        assert DecodeWaysMemoization.decodeWaysMemoization("30") == 0 : "'30' should return 0";
        assert DecodeWaysMemoization.decodeWaysMemoization("123") == 3 : "'123' should return 3";
        assert DecodeWaysMemoization.decodeWaysMemoization("12321") == 6 : "'12321' should return 6";
        assert DecodeWaysMemoization.decodeWaysMemoization("226") == 3 : "'226' should return 3";
        assert DecodeWaysMemoization.decodeWaysMemoization("00") == 0 : "'00' should return 0";
        assert DecodeWaysMemoization.decodeWaysMemoization("1201234") == 3 : "'1201234' should return 3";

        System.out.println("All tests passed!");
    }
}
