public class UglyNumberIi_test {
    private static final long[] UGLY_SEQUENCE = {1,2,3,4,5,6,8,9,10,12,15,16,18,20,24};

    public static void main(String[] args) {
        assert UglyNumberIi.uglyNumberIi(10) == 12 : "Test 1 failed";
        assert UglyNumberIi.uglyNumberIi(1) == 1 : "Test 2 failed";
        assert UglyNumberIi.uglyNumberIi(2) == 2 : "Test 3 failed";
        assert UglyNumberIi.uglyNumberIi(6) == 6 : "Test 4 failed";
        assert UglyNumberIi.uglyNumberIi(15) == 24 : "Test 5 failed";

        for (int position = 1; position <= UGLY_SEQUENCE.length; position++) {
            long result = UglyNumberIi.uglyNumberIi(position);
            assert result == UGLY_SEQUENCE[position - 1]
                : "Sequence test failed at position " + position + ": expected " + UGLY_SEQUENCE[position-1] + ", got " + result;
        }

        System.out.println("All tests passed!");
    }
}
