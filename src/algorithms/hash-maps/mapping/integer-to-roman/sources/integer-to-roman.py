# Integer to Roman — convert an integer to its Roman numeral string using a value-symbol lookup table
def integer_to_roman(value):
    value_pairs = []  # @step:initialize
    value_pairs.append((1000, "M"))  # @step:insert-key
    value_pairs.append((900, "CM"))  # @step:insert-key
    value_pairs.append((500, "D"))  # @step:insert-key
    value_pairs.append((400, "CD"))  # @step:insert-key
    value_pairs.append((100, "C"))  # @step:insert-key
    value_pairs.append((90, "XC"))  # @step:insert-key
    value_pairs.append((50, "L"))  # @step:insert-key
    value_pairs.append((40, "XL"))  # @step:insert-key
    value_pairs.append((10, "X"))  # @step:insert-key
    value_pairs.append((9, "IX"))  # @step:insert-key
    value_pairs.append((5, "V"))  # @step:insert-key
    value_pairs.append((4, "IV"))  # @step:insert-key
    value_pairs.append((1, "I"))  # @step:insert-key
    remaining = value
    result = ""
    for numeric_value, symbol in value_pairs:
        while remaining >= numeric_value:
            remaining -= numeric_value  # @step:lookup-key
            result += symbol  # @step:key-found
    return result  # @step:complete
