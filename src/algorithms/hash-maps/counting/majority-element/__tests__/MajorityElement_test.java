public class MajorityElement_test {
    public static void main(String[] args) {
        assert MajorityElement.majorityElement(new int[]{2, 2, 1, 1, 1, 2, 2}) == 2;
        assert MajorityElement.majorityElement(new int[]{3, 2, 3}) == 3;
        assert MajorityElement.majorityElement(new int[]{1}) == 1;
        assert MajorityElement.majorityElement(new int[]{1, 1, 1, 1}) == 1;
        assert MajorityElement.majorityElement(new int[]{5, 5, 5, 1, 2}) == 5;
        assert MajorityElement.majorityElement(new int[]{1, 2, 1, 1, 3}) == 1;
        assert MajorityElement.majorityElement(new int[]{7, 7}) == 7;
        assert MajorityElement.majorityElement(new int[]{9, 9, 9, 9, 1, 2, 3}) == 9;

        System.out.println("All tests passed!");
    }
}
