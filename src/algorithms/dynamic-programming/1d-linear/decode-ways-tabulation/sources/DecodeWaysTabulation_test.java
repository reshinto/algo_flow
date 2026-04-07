// javac DecodeWaysTabulation.java DecodeWaysTabulation_test.java && java -ea DecodeWaysTabulation_test
public class DecodeWaysTabulation_test {
    public static void main(String[] args) {
        assert DecodeWaysTabulation.decodeWaysTabulation("12321") == 6 : "'12321' should return 6";
        assert DecodeWaysTabulation.decodeWaysTabulation("226") == 3 : "'226' should return 3";
        assert DecodeWaysTabulation.decodeWaysTabulation("0") == 0 : "'0' should return 0";
        assert DecodeWaysTabulation.decodeWaysTabulation("10") == 1 : "'10' should return 1";
        assert DecodeWaysTabulation.decodeWaysTabulation("12") == 2 : "'12' should return 2";
        assert DecodeWaysTabulation.decodeWaysTabulation("") == 0 : "empty string should return 0";
        assert DecodeWaysTabulation.decodeWaysTabulation("7") == 1 : "'7' should return 1";
        assert DecodeWaysTabulation.decodeWaysTabulation("00") == 0 : "'00' should return 0";
        assert DecodeWaysTabulation.decodeWaysTabulation("27") == 1 : "'27' should return 1";

        System.out.println("All tests passed!");
    }
}
