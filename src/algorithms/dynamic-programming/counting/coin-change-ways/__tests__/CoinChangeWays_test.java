// javac CoinChangeWays.java CoinChangeWays_test.java && java -ea CoinChangeWays_test
public class CoinChangeWays_test {
    public static void main(String[] args) {
        assert CoinChangeWays.coinChangeWays(5, new int[]{1, 2, 5}) == 4 : "amount=5 coins=[1,2,5] should return 4";
        assert CoinChangeWays.coinChangeWays(3, new int[]{2}) == 0 : "amount=3 coins=[2] should return 0";
        assert CoinChangeWays.coinChangeWays(0, new int[]{1}) == 1 : "amount=0 should return 1";
        assert CoinChangeWays.coinChangeWays(5, new int[]{1, 2}) == 3 : "amount=5 coins=[1,2] should return 3";
        assert CoinChangeWays.coinChangeWays(2, new int[]{2}) == 1 : "amount=2 coins=[2] should return 1";
        assert CoinChangeWays.coinChangeWays(1, new int[]{2, 5}) == 0 : "amount=1 coins=[2,5] should return 0";
        assert CoinChangeWays.coinChangeWays(6, new int[]{3}) == 1 : "amount=6 coins=[3] should return 1";
        assert CoinChangeWays.coinChangeWays(10, new int[]{1, 2, 5}) == 10 : "amount=10 coins=[1,2,5] should return 10";

        System.out.println("All tests passed!");
    }
}
