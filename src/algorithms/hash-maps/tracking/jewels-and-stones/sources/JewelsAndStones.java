// Jewels and Stones — count how many stones are also jewels using a hash set
import java.util.HashSet;
import java.util.Set;

public class JewelsAndStones {
    public static int jewelsAndStones(String jewels, String stones) {
        Set<Character> jewelSet = new HashSet<>(); // @step:initialize
        for (int jewelIdx = 0; jewelIdx < jewels.length(); jewelIdx++) {
            jewelSet.add(jewels.charAt(jewelIdx)); // @step:insert-key
        }
        int count = 0;
        for (int stoneIdx = 0; stoneIdx < stones.length(); stoneIdx++) {
            char stone = stones.charAt(stoneIdx);
            if (jewelSet.contains(stone)) { // @step:lookup-key
                count++; // @step:key-found
            } else {
                // @step:key-not-found
            }
        }
        return count; // @step:complete
    }
}
