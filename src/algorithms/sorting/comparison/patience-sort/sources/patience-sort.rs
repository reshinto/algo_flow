// Patience Sort — place cards into piles using patience game rules, then merge piles
fn find_pile_index(piles: &Vec<Vec<i64>>, card_value: i64) -> usize {
    // @step:compare
    // Binary search for the leftmost pile whose top is >= card_value
    let mut left_bound = 0usize; // @step:compare
    let mut right_bound = piles.len(); // @step:compare

    while left_bound < right_bound {
        // @step:compare
        let mid_index = (left_bound + right_bound) / 2; // @step:compare
        if *piles[mid_index].last().unwrap() < card_value {
            // @step:compare
            left_bound = mid_index + 1; // @step:compare
        } else {
            right_bound = mid_index; // @step:compare
        }
    }

    left_bound // @step:compare
}

fn merge_piles(piles: &mut Vec<Vec<i64>>) -> Vec<i64> {
    // @step:merge-piles
    let mut sorted_output: Vec<i64> = Vec::new(); // @step:merge-piles

    while piles.iter().any(|pile| !pile.is_empty()) {
        // @step:merge-piles
        let mut minimum_value = i64::MAX; // @step:compare
        let mut minimum_pile_index = 0usize; // @step:compare

        for pile_index in 0..piles.len() {
            // @step:compare
            let pile_top = *piles[pile_index].last().unwrap(); // @step:compare
            if pile_top < minimum_value {
                // @step:compare
                minimum_value = pile_top; // @step:compare
                minimum_pile_index = pile_index; // @step:compare
            }
        }

        sorted_output.push(piles[minimum_pile_index].pop().unwrap()); // @step:swap
        if piles[minimum_pile_index].is_empty() {
            piles.remove(minimum_pile_index); // @step:merge-piles
        }
    }

    sorted_output // @step:merge-piles
}

fn patience_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize

    if array_length == 0 {
        return vec![]; // @step:complete
    }

    let mut piles: Vec<Vec<i64>> = Vec::new(); // @step:initialize

    // Place each card into the leftmost valid pile
    for card_index in 0..array_length {
        // @step:place-card
        let card_value = input_array[card_index]; // @step:place-card
        let target_pile_index = find_pile_index(&piles, card_value); // @step:compare

        if target_pile_index == piles.len() {
            piles.push(vec![card_value]); // @step:place-card
        } else {
            piles[target_pile_index].push(card_value); // @step:place-card
        }
    }

    // Merge all piles into sorted output
    let sorted_array = merge_piles(&mut piles); // @step:merge-piles

    // @step:mark-sorted
    sorted_array // @step:complete
}
