// Single Number (XOR) — every element appears twice except one; XOR cancels all pairs, leaving the unique element
fn single_number(input_array: &[i32]) -> i32 {
    let mut running_xor = 0; // @step:initialize

    for &element in input_array {
        running_xor ^= element; // @step:visit
    }

    running_xor // @step:complete
}
