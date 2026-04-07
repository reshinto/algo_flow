// Red-Black Tree Insertion — maintains balance via color rebalancing and rotations
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug, Clone, PartialEq)]
enum RBColor {
    Red,
    Black,
}

type RBLink = Option<Rc<RefCell<RBNode>>>;

struct RBNode {
    value: i32,
    color: RBColor,
    left: RBLink,
    right: RBLink,
    parent: Option<Rc<RefCell<RBNode>>>,
}

impl RBNode {
    fn new(value: i32) -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(RBNode {
            value,
            color: RBColor::Red, // @step:insert-node
            left: None,
            right: None,
            parent: None,
        }))
    }
}

struct RedBlackTree {
    root: RBLink,
}

impl RedBlackTree {
    fn new() -> Self {
        RedBlackTree { root: None } // @step:initialize
    }

    fn rotate_left(&mut self, node: Rc<RefCell<RBNode>>) {
        let right_child = node.borrow().right.clone().unwrap(); // @step:rotate-left
        let right_left = right_child.borrow().left.clone();
        node.borrow_mut().right = right_left.clone();
        if let Some(ref rl) = right_left {
            rl.borrow_mut().parent = Some(node.clone());
        }
        right_child.borrow_mut().parent = node.borrow().parent.clone();
        match node.borrow().parent.clone() {
            None => self.root = Some(right_child.clone()),
            Some(ref parent) => {
                let is_left = parent.borrow().left.as_ref().map_or(false, |l| Rc::ptr_eq(l, &node));
                if is_left {
                    parent.borrow_mut().left = Some(right_child.clone());
                } else {
                    parent.borrow_mut().right = Some(right_child.clone());
                }
            }
        }
        right_child.borrow_mut().left = Some(node.clone());
        node.borrow_mut().parent = Some(right_child); // @step:rotate-left
    }

    fn rotate_right(&mut self, node: Rc<RefCell<RBNode>>) {
        let left_child = node.borrow().left.clone().unwrap(); // @step:rotate-right
        let left_right = left_child.borrow().right.clone();
        node.borrow_mut().left = left_right.clone();
        if let Some(ref lr) = left_right {
            lr.borrow_mut().parent = Some(node.clone());
        }
        left_child.borrow_mut().parent = node.borrow().parent.clone();
        match node.borrow().parent.clone() {
            None => self.root = Some(left_child.clone()),
            Some(ref parent) => {
                let is_right = parent.borrow().right.as_ref().map_or(false, |r| Rc::ptr_eq(r, &node));
                if is_right {
                    parent.borrow_mut().right = Some(left_child.clone());
                } else {
                    parent.borrow_mut().left = Some(left_child.clone());
                }
            }
        }
        left_child.borrow_mut().right = Some(node.clone());
        node.borrow_mut().parent = Some(left_child); // @step:rotate-right
    }

    fn fix_insert(&mut self, inserted: Rc<RefCell<RBNode>>) {
        let mut current_node = inserted;
        loop {
            let parent_opt = current_node.borrow().parent.clone();
            let parent_node = match parent_opt {
                None => break,
                Some(ref p) if p.borrow().color != RBColor::Red => break,
                Some(p) => p,
            }; // @step:recolor-node
            let grandparent = parent_node.borrow().parent.clone().unwrap();
            let is_left_parent = grandparent.borrow().left.as_ref().map_or(false, |l| Rc::ptr_eq(l, &parent_node));
            if is_left_parent {
                let uncle = grandparent.borrow().right.clone();
                if uncle.as_ref().map_or(false, |u| u.borrow().color == RBColor::Red) {
                    parent_node.borrow_mut().color = RBColor::Black; // @step:recolor-node
                    uncle.unwrap().borrow_mut().color = RBColor::Black; // @step:recolor-node
                    grandparent.borrow_mut().color = RBColor::Red; // @step:recolor-node
                    current_node = grandparent;
                } else {
                    let is_right_child = parent_node.borrow().right.as_ref().map_or(false, |r| Rc::ptr_eq(r, &current_node));
                    if is_right_child {
                        current_node = parent_node.clone();
                        self.rotate_left(current_node.clone()); // @step:rotate-left
                    }
                    let new_parent = current_node.borrow().parent.clone().unwrap();
                    new_parent.borrow_mut().color = RBColor::Black; // @step:recolor-node
                    grandparent.borrow_mut().color = RBColor::Red; // @step:recolor-node
                    self.rotate_right(grandparent); // @step:rotate-right
                }
            } else {
                let uncle = grandparent.borrow().left.clone();
                if uncle.as_ref().map_or(false, |u| u.borrow().color == RBColor::Red) {
                    parent_node.borrow_mut().color = RBColor::Black; // @step:recolor-node
                    uncle.unwrap().borrow_mut().color = RBColor::Black; // @step:recolor-node
                    grandparent.borrow_mut().color = RBColor::Red; // @step:recolor-node
                    current_node = grandparent;
                } else {
                    let is_left_child = parent_node.borrow().left.as_ref().map_or(false, |l| Rc::ptr_eq(l, &current_node));
                    if is_left_child {
                        current_node = parent_node.clone();
                        self.rotate_right(current_node.clone()); // @step:rotate-right
                    }
                    let new_parent = current_node.borrow().parent.clone().unwrap();
                    new_parent.borrow_mut().color = RBColor::Black; // @step:recolor-node
                    grandparent.borrow_mut().color = RBColor::Red; // @step:recolor-node
                    self.rotate_left(grandparent); // @step:rotate-left
                }
            }
        }
        if let Some(ref root) = self.root {
            root.borrow_mut().color = RBColor::Black; // @step:recolor-node
        }
    }

    fn insert(&mut self, value: i32) {
        let new_node = RBNode::new(value);
        match self.root.clone() {
            None => {
                new_node.borrow_mut().color = RBColor::Black; // @step:recolor-node
                self.root = Some(new_node);
                return;
            }
            Some(root) => {
                let mut current_node = root;
                loop {
                    let node_value = current_node.borrow().value;
                    if value < node_value {
                        let left = current_node.borrow().left.clone();
                        match left {
                            None => {
                                current_node.borrow_mut().left = Some(new_node.clone());
                                new_node.borrow_mut().parent = Some(current_node);
                                break;
                            }
                            Some(left_node) => current_node = left_node,
                        }
                    } else {
                        let right = current_node.borrow().right.clone();
                        match right {
                            None => {
                                current_node.borrow_mut().right = Some(new_node.clone());
                                new_node.borrow_mut().parent = Some(current_node);
                                break;
                            }
                            Some(right_node) => current_node = right_node,
                        }
                    }
                }
            }
        }
        self.fix_insert(new_node); // @step:recolor-node
    }

    fn inorder(&self, node: &RBLink, result: &mut Vec<i32>) {
        if let Some(ref n) = node {
            let left = n.borrow().left.clone();
            self.inorder(&left, result);
            result.push(n.borrow().value);
            let right = n.borrow().right.clone();
            self.inorder(&right, result);
        }
    }
}

fn red_black_insert(values: &[i32]) -> Vec<i32> {
    let mut tree = RedBlackTree::new();
    for &value in values {
        tree.insert(value); // @step:insert-node
    }
    let mut result = Vec::new();
    let root = tree.root.clone();
    tree.inorder(&root, &mut result);
    result // @step:complete
}
