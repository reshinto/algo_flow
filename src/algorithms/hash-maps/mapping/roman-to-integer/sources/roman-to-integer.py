# Roman to Integer — convert a Roman numeral string to its integer value using a lookup map
def roman_to_integer(text):
    roman_map = {}  # @step:initialize
    roman_map["I"] = 1  # @step:insert-key
    roman_map["V"] = 5  # @step:insert-key
    roman_map["X"] = 10  # @step:insert-key
    roman_map["L"] = 50  # @step:insert-key
    roman_map["C"] = 100  # @step:insert-key
    roman_map["D"] = 500  # @step:insert-key
    roman_map["M"] = 1000  # @step:insert-key
    total_value = 0
    for char_index in range(len(text)):
        current_symbol = text[char_index]  # @step:lookup-key
        current_value = roman_map[current_symbol]  # @step:key-found
        next_value = roman_map[text[char_index + 1]] if char_index + 1 < len(text) else 0
        if current_value < next_value:
            total_value -= current_value  # @step:key-found
        else:
            total_value += current_value  # @step:key-found
    return total_value  # @step:complete
