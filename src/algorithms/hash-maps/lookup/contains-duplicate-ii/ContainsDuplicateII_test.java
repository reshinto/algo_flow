public class ContainsDuplicateII_test {
    public static void main(String[] args) {
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 2, 3, 1}, 3) == true;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 2, 3, 1}, 2) == false;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 1, 3, 4}, 1) == true;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 2, 3, 4}, 3) == false;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{42}, 1) == false;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{}, 0) == false;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 2, 3, 4, 1}, 4) == true;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 2, 3, 4}, 0) == false;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{-1, 0, -1}, 2) == true;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 2, 1, 2}, 1) == false;
        assert ContainsDuplicateII.containsDuplicateII(new int[]{1, 0, 1, 1}, 1) == true;

        System.out.println("All tests passed!");
    }
}
