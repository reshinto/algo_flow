// javac Knapsack01.java Knapsack01_test.java && java -ea Knapsack01_test
public class Knapsack01_test {
    public static void main(String[] args) {
        assert Knapsack01.knapsack01(new int[]{2, 3, 4, 5}, new int[]{3, 4, 5, 6}, 8) == 10 : "default input should return 10";
        assert Knapsack01.knapsack01(new int[]{1, 2, 3}, new int[]{6, 10, 12}, 5) == 22 : "classic example should return 22";
        assert Knapsack01.knapsack01(new int[]{2}, new int[]{3}, 1) == 0 : "too heavy should return 0";
        assert Knapsack01.knapsack01(new int[]{1}, new int[]{1}, 1) == 1 : "exact fit should return 1";
        assert Knapsack01.knapsack01(new int[]{}, new int[]{}, 10) == 0 : "empty items should return 0";
        assert Knapsack01.knapsack01(new int[]{2, 3}, new int[]{4, 5}, 0) == 0 : "zero capacity should return 0";
        assert Knapsack01.knapsack01(new int[]{3, 5}, new int[]{4, 10}, 5) == 10 : "best single item should return 10";
        assert Knapsack01.knapsack01(new int[]{1, 2, 3}, new int[]{1, 6, 10}, 5) == 16 : "best combo should return 16";
        assert Knapsack01.knapsack01(new int[]{3}, new int[]{5}, 9) == 5 : "0/1 constraint should return 5";

        System.out.println("All tests passed!");
    }
}
