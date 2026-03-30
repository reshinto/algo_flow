// Isomorphic Strings — check if two strings are isomorphic using bidirectional char mapping
import java.util.HashMap;
import java.util.Map;

public class IsomorphicStrings {
    public static boolean isomorphicStrings(String textA, String textB) {
        Map<Character, Character> aToB = new HashMap<>(); // @step:initialize
        Map<Character, Character> bToA = new HashMap<>(); // @step:initialize
        if (textA.length() != textB.length()) return false; // @step:initialize
        for (int charIndex = 0; charIndex < textA.length(); charIndex++) {
            char charA = textA.charAt(charIndex);
            char charB = textB.charAt(charIndex);
            Character mappedB = aToB.get(charA); // @step:lookup-key
            Character mappedA = bToA.get(charB); // @step:lookup-key
            if (mappedB == null && mappedA == null) {
                aToB.put(charA, charB); // @step:insert-key
                bToA.put(charB, charA); // @step:insert-key
            } else if (mappedB != null && mappedB == charB && mappedA != null && mappedA == charA) {
                continue; // @step:key-found
            } else {
                return false; // @step:key-not-found
            }
        }
        return true; // @step:complete
    }
}
