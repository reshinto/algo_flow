public class RomanToInteger_test {
    public static void main(String[] args) {
        assert RomanToInteger.romanToInteger("MCMXCIV") == 1994;
        assert RomanToInteger.romanToInteger("III") == 3;
        assert RomanToInteger.romanToInteger("IV") == 4;
        assert RomanToInteger.romanToInteger("IX") == 9;
        assert RomanToInteger.romanToInteger("LVIII") == 58;
        assert RomanToInteger.romanToInteger("M") == 1000;
        assert RomanToInteger.romanToInteger("MMMDCCXLIX") == 3749;
        assert RomanToInteger.romanToInteger("XL") == 40;
        assert RomanToInteger.romanToInteger("CD") == 400;
        assert RomanToInteger.romanToInteger("MMMCMXCIX") == 3999;

        System.out.println("All tests passed!");
    }
}
