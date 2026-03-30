// Integer to Roman — convert an integer to its Roman numeral string using a value-symbol lookup table
public class IntegerToRoman {
    public static String integerToRoman(int value) {
        int[] numericValues = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}; // @step:initialize
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}; // @step:insert-key
        int remaining = value;
        StringBuilder result = new StringBuilder();
        for (int pairIndex = 0; pairIndex < numericValues.length; pairIndex++) {
            while (remaining >= numericValues[pairIndex]) {
                remaining -= numericValues[pairIndex]; // @step:lookup-key
                result.append(symbols[pairIndex]); // @step:key-found
            }
        }
        return result.toString(); // @step:complete
    }
}
