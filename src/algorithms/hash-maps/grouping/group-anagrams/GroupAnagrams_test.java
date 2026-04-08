import java.util.*;

public class GroupAnagrams_test {
    public static void main(String[] args) {
        List<List<String>> result1 = GroupAnagrams.groupAnagrams(new String[]{"eat", "tea", "tan", "ate", "nat", "bat"});
        assert result1.size() == 3 : "expected 3 groups";

        List<String> eatGroup = null;
        for (List<String> grp : result1) {
            if (grp.contains("eat")) { eatGroup = grp; break; }
        }
        assert eatGroup != null && eatGroup.contains("tea") && eatGroup.contains("ate");

        List<String> tanGroup = null;
        for (List<String> grp : result1) {
            if (grp.contains("tan")) { tanGroup = grp; break; }
        }
        assert tanGroup != null && tanGroup.contains("nat");

        List<String> batGroup = null;
        for (List<String> grp : result1) {
            if (grp.contains("bat")) { batGroup = grp; break; }
        }
        assert batGroup != null && batGroup.size() == 1;

        List<List<String>> result2 = GroupAnagrams.groupAnagrams(new String[]{"hello"});
        assert result2.size() == 1;

        List<List<String>> result3 = GroupAnagrams.groupAnagrams(new String[]{"abc", "bca", "cab"});
        assert result3.size() == 1 && result3.get(0).size() == 3;

        List<List<String>> result4 = GroupAnagrams.groupAnagrams(new String[]{"abc", "def", "ghi"});
        assert result4.size() == 3;

        List<List<String>> result5 = GroupAnagrams.groupAnagrams(new String[]{"", ""});
        assert result5.size() == 1 && result5.get(0).size() == 2;

        System.out.println("All tests passed!");
    }
}
