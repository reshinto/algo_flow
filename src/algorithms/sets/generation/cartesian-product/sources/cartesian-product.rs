// Cartesian Product
// Generates all ordered pairs (a, b) where a ∈ setA and b ∈ setB.
// Time: O(n × m) — one pair per combination of elements
// Space: O(n × m) for the result array

fn cartesian_product(set_a: &[i32], set_b: &[i32]) -> Vec<(i32, i32)> {
    let mut result: Vec<(i32, i32)> = Vec::new(); // @step:initialize

    for &elem_a in set_a {
        for &elem_b in set_b {
            result.push((elem_a, elem_b)); // @step:generate-pair
        }
    }

    result // @step:complete
}

fn main() {
    let set_a = vec![1, 2, 3];
    let set_b = vec![4, 5];
    let result = cartesian_product(&set_a, &set_b);
    println!("{:?}", result);
}
