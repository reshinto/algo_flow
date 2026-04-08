// javac FirstNonRepeatingCharStream.java FirstNonRepeatingCharStream_test.java && java -ea FirstNonRepeatingCharStream_test
import java.util.List;
import java.util.Arrays;

public class FirstNonRepeatingCharStream_test {
    public static void main(String[] args) {
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("aabcbcd").equals(Arrays.asList("a", "#", "b", "b", "c", "#", "d"));
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("z").equals(Arrays.asList("z"));
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("aabb").equals(Arrays.asList("a", "#", "b", "#"));
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("abcd").equals(Arrays.asList("a", "a", "a", "a"));
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("aa").equals(Arrays.asList("a", "#"));
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("aba").equals(Arrays.asList("a", "a", "b"));
        assert FirstNonRepeatingCharStream.firstNonRepeatingCharStream("").equals(List.of());

        List<String> longResult = FirstNonRepeatingCharStream.firstNonRepeatingCharStream("aaaabc");
        assert longResult.get(0).equals("a");
        assert longResult.get(1).equals("#");
        assert longResult.get(2).equals("#");
        assert longResult.get(3).equals("#");
        assert longResult.get(4).equals("b");
        assert longResult.get(5).equals("b");

        System.out.println("All tests passed!");
    }
}
