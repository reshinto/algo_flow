// javac CoinChangeMinMemoization.java CoinChangeMinMemoization_test.java && java -ea CoinChangeMinMemoization_test
public class CoinChangeMinMemoization_test {
    public static void main(String[] args) {
        assert CoinChangeMinMemoization.coinChangeMinMemoization(0, new int[]{1, 5, 10}) == 0 : "amount=0 should return 0";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(3, new int[]{2}) == -1 : "amount=3 coins=[2] should return -1";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(5, new int[]{1, 5, 10}) == 1 : "amount=5 should return 1";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(11, new int[]{1, 5, 10, 25}) == 2 : "default input should return 2";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(11, new int[]{1, 5, 6, 9}) == 2 : "amount=11 coins=[1,5,6,9] should return 2";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(3, new int[]{1, 2}) == 2 : "amount=3 coins=[1,2] should return 2";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(6, new int[]{1, 3, 4}) == 2 : "amount=6 coins=[1,3,4] should return 2";
        assert CoinChangeMinMemoization.coinChangeMinMemoization(100, new int[]{1, 5, 10, 25}) == 4 : "amount=100 should return 4";

        System.out.println("All tests passed!");
    }
}
