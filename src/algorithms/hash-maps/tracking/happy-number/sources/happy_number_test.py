import importlib

happy_number = importlib.import_module("happy-number").happy_number


def test_identifies_19_as_happy():
    assert happy_number(19) is True


def test_identifies_1_as_happy():
    assert happy_number(1) is True


def test_identifies_7_as_happy():
    assert happy_number(7) is True


def test_identifies_4_as_not_happy():
    assert happy_number(4) is False


def test_identifies_2_as_not_happy():
    assert happy_number(2) is False


def test_identifies_100_as_happy():
    assert happy_number(100) is True


def test_identifies_116_as_not_happy():
    assert happy_number(116) is False


def test_identifies_89_as_not_happy():
    assert happy_number(89) is False


if __name__ == "__main__":
    test_identifies_19_as_happy()
    test_identifies_1_as_happy()
    test_identifies_7_as_happy()
    test_identifies_4_as_not_happy()
    test_identifies_2_as_not_happy()
    test_identifies_100_as_happy()
    test_identifies_116_as_not_happy()
    test_identifies_89_as_not_happy()
    print("All tests passed!")
