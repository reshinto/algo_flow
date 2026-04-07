public class ContainsDuplicate_test {
    public static void main(String[] args) {
        assert ContainsDuplicate.containsDuplicate(new int[]{1, 2, 3, 1}) == true;
        assert ContainsDuplicate.containsDuplicate(new int[]{1, 2, 3, 4}) == false;
        assert ContainsDuplicate.containsDuplicate(new int[]{42}) == false;
        assert ContainsDuplicate.containsDuplicate(new int[]{}) == false;
        assert ContainsDuplicate.containsDuplicate(new int[]{5, 5, 6, 7}) == true;
        assert ContainsDuplicate.containsDuplicate(new int[]{1, 2, 3, 4, 5, 1}) == true;
        assert ContainsDuplicate.containsDuplicate(new int[]{7, 7, 7, 7}) == true;
        assert ContainsDuplicate.containsDuplicate(new int[]{-1, -2, -3, -1}) == true;
        assert ContainsDuplicate.containsDuplicate(new int[]{-3, -2, -1, 0}) == false;

        System.out.println("All tests passed!");
    }
}
