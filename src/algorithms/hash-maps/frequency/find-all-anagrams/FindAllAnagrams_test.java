import java.util.*;

public class FindAllAnagrams_test {
    public static void main(String[] args) {
        assert FindAllAnagrams.findAllAnagrams("cbaebabacd", "abc").equals(Arrays.asList(0, 6));
        assert FindAllAnagrams.findAllAnagrams("abab", "ab").equals(Arrays.asList(0, 1, 2));
        assert FindAllAnagrams.findAllAnagrams("af", "be").equals(Collections.emptyList());
        assert FindAllAnagrams.findAllAnagrams("cba", "abc").equals(Arrays.asList(0));
        assert FindAllAnagrams.findAllAnagrams("aaab", "a").equals(Arrays.asList(0, 1, 2));
        assert FindAllAnagrams.findAllAnagrams("ab", "abc").equals(Collections.emptyList());
        assert FindAllAnagrams.findAllAnagrams("aabbcc", "bca").equals(Collections.emptyList());

        List<Integer> result = FindAllAnagrams.findAllAnagrams("aababb", "aab");
        assert result.contains(0);
        assert result.contains(1);

        System.out.println("All tests passed!");
    }
}
