// Roman to Integer — convert a Roman numeral string to its integer value using a lookup map
use std::collections::HashMap;

fn roman_to_integer(text: &str) -> i32 {
    let mut roman_map: HashMap<char, i32> = HashMap::new(); // @step:initialize
    roman_map.insert('I', 1); // @step:insert-key
    roman_map.insert('V', 5); // @step:insert-key
    roman_map.insert('X', 10); // @step:insert-key
    roman_map.insert('L', 50); // @step:insert-key
    roman_map.insert('C', 100); // @step:insert-key
    roman_map.insert('D', 500); // @step:insert-key
    roman_map.insert('M', 1000); // @step:insert-key
    let chars: Vec<char> = text.chars().collect();
    let mut total_value = 0;
    for char_index in 0..chars.len() {
        let current_symbol = chars[char_index]; // @step:lookup-key
        let current_value = roman_map[&current_symbol]; // @step:key-found
        let next_value = if char_index + 1 < chars.len() {
            *roman_map.get(&chars[char_index + 1]).unwrap_or(&0)
        } else {
            0
        };
        if current_value < next_value {
            total_value -= current_value; // @step:key-found
        } else {
            total_value += current_value; // @step:key-found
        }
    }
    total_value // @step:complete
}
