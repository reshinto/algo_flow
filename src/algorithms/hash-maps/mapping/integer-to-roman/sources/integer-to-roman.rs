// Integer to Roman — convert an integer to its Roman numeral string using a value-symbol lookup table
fn integer_to_roman(value: u32) -> String {
    let mut value_pairs: Vec<(u32, &str)> = Vec::new(); // @step:initialize
    value_pairs.push((1000, "M")); // @step:insert-key
    value_pairs.push((900, "CM")); // @step:insert-key
    value_pairs.push((500, "D")); // @step:insert-key
    value_pairs.push((400, "CD")); // @step:insert-key
    value_pairs.push((100, "C")); // @step:insert-key
    value_pairs.push((90, "XC")); // @step:insert-key
    value_pairs.push((50, "L")); // @step:insert-key
    value_pairs.push((40, "XL")); // @step:insert-key
    value_pairs.push((10, "X")); // @step:insert-key
    value_pairs.push((9, "IX")); // @step:insert-key
    value_pairs.push((5, "V")); // @step:insert-key
    value_pairs.push((4, "IV")); // @step:insert-key
    value_pairs.push((1, "I")); // @step:insert-key
    let mut remaining = value;
    let mut result = String::new();
    for (numeric_value, symbol) in &value_pairs {
        while remaining >= *numeric_value {
            remaining -= numeric_value; // @step:lookup-key
            result.push_str(symbol); // @step:key-found
        }
    }
    result // @step:complete
}
