// javac PartitionEqualSubset.java PartitionEqualSubset_test.java && java -ea PartitionEqualSubset_test
public class PartitionEqualSubset_test {
    public static void main(String[] args) {
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{1, 5, 11, 5}) == true : "[1,5,11,5] should be true";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{1, 2, 3, 5}) == false : "[1,2,3,5] should be false";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{1, 1}) == true : "[1,1] should be true";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{1}) == false : "[1] should be false";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{1, 2, 4}) == false : "odd sum should be false";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{3, 3, 3, 3}) == true : "[3,3,3,3] should be true";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{2, 2, 1, 1}) == true : "[2,2,1,1] should be true";
        assert PartitionEqualSubset.partitionEqualSubset(new int[]{1, 2, 5}) == false : "[1,2,5] should be false";

        System.out.println("All tests passed!");
    }
}
