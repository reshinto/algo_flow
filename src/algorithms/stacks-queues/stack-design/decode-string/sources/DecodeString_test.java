// javac DecodeString.java DecodeString_test.java && java -ea DecodeString_test
public class DecodeString_test {
    public static void main(String[] args) {
        assert DecodeString.decodeString("3[a]").equals("aaa");
        assert DecodeString.decodeString("3[a2[c]]").equals("accaccacc");
        assert DecodeString.decodeString("2[abc]3[cd]ef").equals("abcabccdcdcdef");
        assert DecodeString.decodeString("abc").equals("abc");
        assert DecodeString.decodeString("5[z]").equals("zzzzz");
        assert DecodeString.decodeString("2[2[a]]").equals("aaaa");
        assert DecodeString.decodeString("").equals("");
        assert DecodeString.decodeString("10[a]").equals("aaaaaaaaaa");
        assert DecodeString.decodeString("a2[b]c").equals("abbc");

        System.out.println("All tests passed!");
    }
}
