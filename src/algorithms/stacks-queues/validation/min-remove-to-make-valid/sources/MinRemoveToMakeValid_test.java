// javac MinRemoveToMakeValid.java MinRemoveToMakeValid_test.java && java -ea MinRemoveToMakeValid_test
public class MinRemoveToMakeValid_test {
    public static void main(String[] args) {
        assert MinRemoveToMakeValid.minRemoveToMakeValid("(ab)").equals("(ab)");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("a(b(c)d").equals("ab(c)d");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("a)b").equals("ab");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("))ab").equals("ab");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("ab((").equals("ab");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("lee(t(c)o)de)").equals("lee(t(c)o)de");
        assert MinRemoveToMakeValid.minRemoveToMakeValid(")))").equals("");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("").equals("");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("abcdef").equals("abcdef");
        assert MinRemoveToMakeValid.minRemoveToMakeValid("((()))").equals("((()))");
        assert MinRemoveToMakeValid.minRemoveToMakeValid(")a(b(c)d(").equals("ab(c)d");

        System.out.println("All tests passed!");
    }
}
