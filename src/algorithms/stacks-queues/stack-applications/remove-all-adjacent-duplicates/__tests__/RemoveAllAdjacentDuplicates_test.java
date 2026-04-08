// javac RemoveAllAdjacentDuplicates.java RemoveAllAdjacentDuplicates_test.java && java -ea RemoveAllAdjacentDuplicates_test
public class RemoveAllAdjacentDuplicates_test {
    public static void main(String[] args) {
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("abbaca").equals("ca");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("azxxzy").equals("ay");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("").equals("");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("abc").equals("abc");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("aaaaaa").equals("");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("aabb").equals("");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("a").equals("a");
        assert RemoveAllAdjacentDuplicates.removeAllAdjacentDuplicates("abba").equals("");

        System.out.println("All tests passed!");
    }
}
