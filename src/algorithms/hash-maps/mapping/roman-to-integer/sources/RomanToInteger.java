// Roman to Integer — convert a Roman numeral string to its integer value using a lookup map
import java.util.HashMap;
import java.util.Map;

public class RomanToInteger {
    public static int romanToInteger(String text) {
        Map<Character, Integer> romanMap = new HashMap<>(); // @step:initialize
        romanMap.put('I', 1); // @step:insert-key
        romanMap.put('V', 5); // @step:insert-key
        romanMap.put('X', 10); // @step:insert-key
        romanMap.put('L', 50); // @step:insert-key
        romanMap.put('C', 100); // @step:insert-key
        romanMap.put('D', 500); // @step:insert-key
        romanMap.put('M', 1000); // @step:insert-key
        int totalValue = 0;
        for (int charIndex = 0; charIndex < text.length(); charIndex++) {
            char currentSymbol = text.charAt(charIndex); // @step:lookup-key
            int currentValue = romanMap.get(currentSymbol); // @step:key-found
            int nextValue = charIndex + 1 < text.length() ? romanMap.get(text.charAt(charIndex + 1)) : 0;
            if (currentValue < nextValue) {
                totalValue -= currentValue; // @step:key-found
            } else {
                totalValue += currentValue; // @step:key-found
            }
        }
        return totalValue; // @step:complete
    }
}
