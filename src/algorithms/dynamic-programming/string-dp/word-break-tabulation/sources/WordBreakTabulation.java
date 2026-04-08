// Word Break tabulation — determine if a string can be segmented into dictionary words bottom-up

public class WordBreakTabulation {
    public static boolean wordBreakTabulation(String text, String[] dictionary) { // @step:initialize
        int textLength = text.length(); // @step:initialize
        int[] dpTable = new int[textLength + 1]; // @step:initialize
        dpTable[0] = 1; // @step:fill-table
        for (int endIndex = 1; endIndex <= textLength; endIndex++) { // @step:read-cache
            for (String word : dictionary) { // @step:read-cache
                int wordLength = word.length(); // @step:read-cache
                if (endIndex >= wordLength) { // @step:read-cache
                    String segment = text.substring(endIndex - wordLength, endIndex); // @step:read-cache
                    if (segment.equals(word) && dpTable[endIndex - wordLength] == 1) { // @step:read-cache
                        dpTable[endIndex] = 1; // @step:read-cache
                    }
                }
                // @step:compute-cell
            }
        }
        return dpTable[textLength] == 1; // @step:complete
    }
}
