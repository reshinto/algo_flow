// Longest Common Prefix — vertical scanning column by column across all strings.
// Returns the longest prefix shared by every word in the input array.
// Time: O(n*m) where n = number of strings, m = min string length  Space: O(1)

public class LongestCommonPrefix {

    public static String longestCommonPrefix(String[] words) {
        if (words.length == 0) return ""; // @step:initialize

        int prefixLength = 0; // @step:initialize
        String firstWord = words[0]; // @step:initialize

        for (int columnIndex = 0; columnIndex < firstWord.length(); columnIndex++) {
            char currentChar = firstWord.charAt(columnIndex); // @step:read-char

            for (int wordIndex = 1; wordIndex < words.length; wordIndex++) {
                String word = words[wordIndex]; // @step:read-char
                if (columnIndex >= word.length() || word.charAt(columnIndex) != currentChar) { // @step:read-char
                    return firstWord.substring(0, prefixLength); // @step:complete
                }
            }

            prefixLength++; // @step:write-char
        }

        return firstWord.substring(0, prefixLength); // @step:complete
    }
}
