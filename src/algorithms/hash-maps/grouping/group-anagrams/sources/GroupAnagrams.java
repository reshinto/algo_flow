// Group Anagrams — group words that are anagrams of each other using sorted-key hashing
import java.util.*;

public class GroupAnagrams {
    public static List<List<String>> groupAnagrams(String[] words) {
        Map<String, List<String>> map = new HashMap<>(); // @step:initialize
        for (int wordIndex = 0; wordIndex < words.length; wordIndex++) {
            String word = words[wordIndex];
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String sortedKey = new String(chars); // @step:lookup-key
            if (map.containsKey(sortedKey)) {
                map.get(sortedKey).add(word); // @step:update-value
            } else {
                List<String> group = new ArrayList<>();
                group.add(word);
                map.put(sortedKey, group); // @step:insert-key
            }
        }
        return new ArrayList<>(map.values()); // @step:complete
    }
}
