public class IntegerToRoman_test {
    public static void main(String[] args) {
        assert IntegerToRoman.integerToRoman(1994).equals("MCMXCIV");
        assert IntegerToRoman.integerToRoman(3).equals("III");
        assert IntegerToRoman.integerToRoman(58).equals("LVIII");
        assert IntegerToRoman.integerToRoman(1).equals("I");
        assert IntegerToRoman.integerToRoman(3999).equals("MMMCMXCIX");
        assert IntegerToRoman.integerToRoman(9).equals("IX");
        assert IntegerToRoman.integerToRoman(40).equals("XL");
        assert IntegerToRoman.integerToRoman(1000).equals("M");

        System.out.println("All tests passed!");
    }
}
