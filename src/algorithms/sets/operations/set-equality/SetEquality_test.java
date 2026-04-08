public class SetEquality_test {

    public static void main(String[] args) {
        // same elements different order
        assert SetEquality.setEquality(new int[]{3, 1, 2}, new int[]{2, 3, 1}) == true;

        // identical arrays
        assert SetEquality.setEquality(new int[]{1, 2, 3}, new int[]{1, 2, 3}) == true;

        // B has element not in A
        assert SetEquality.setEquality(new int[]{1, 2, 3}, new int[]{1, 2, 9}) == false;

        // A has more unique elements
        assert SetEquality.setEquality(new int[]{1, 2, 3, 4}, new int[]{1, 2, 3}) == false;

        // B has more unique elements
        assert SetEquality.setEquality(new int[]{1, 2, 3}, new int[]{1, 2, 3, 4}) == false;

        // both empty
        assert SetEquality.setEquality(new int[]{}, new int[]{}) == true;

        // A empty B non-empty
        assert SetEquality.setEquality(new int[]{}, new int[]{1}) == false;

        // B empty A non-empty
        assert SetEquality.setEquality(new int[]{1}, new int[]{}) == false;

        // duplicates same unique set
        assert SetEquality.setEquality(new int[]{1, 1, 2, 3}, new int[]{1, 2, 2, 3}) == true;

        // single element equal
        assert SetEquality.setEquality(new int[]{7}, new int[]{7}) == true;

        // single element not equal
        assert SetEquality.setEquality(new int[]{7}, new int[]{8}) == false;

        System.out.println("All tests passed!");
    }
}
