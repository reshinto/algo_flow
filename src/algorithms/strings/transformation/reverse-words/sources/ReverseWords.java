// Reverse Words in a String — split, reverse word order, rejoin with single spaces.
// Trims leading/trailing whitespace and collapses multiple spaces between words.
// Time: O(n)  Space: O(n)

public class ReverseWords {

    public static String reverseWords(String text) {
        String[] words = text.trim().split("\\s+"); // @step:initialize

        int leftIndex = 0; // @step:initialize
        int rightIndex = words.length - 1; // @step:initialize

        while (leftIndex < rightIndex) {
            String leftWord = words[leftIndex]; // @step:read-char
            String rightWord = words[rightIndex]; // @step:read-char

            words[leftIndex] = rightWord; // @step:swap-pointers
            words[rightIndex] = leftWord; // @step:swap-pointers

            leftIndex++; // @step:visit
            rightIndex--; // @step:visit
        }

        return String.join(" ", words); // @step:complete
    }
}
