    //function to create a node
    class Node {
        constructor (data){
            this.data = data
            this.left = null
            this.right = null
        }
    }

    //function to build the tree using recursion
    function buildTreeRecursive(array){
        //sort the taken in array and remove any duplicates
        const removedDuplicates = []
        array.forEach(function(element,index){
            if (array.indexOf(element) === index){
                removedDuplicates.push(element)
            }
        })
        let removeDupesAndSorted = removedDuplicates.sort(function(a,b){return a-b})
        //if the start of the array is greater than the end, it shouldn't work
        if (removeDupesAndSorted.length === 0) return null
        //find the midpoint 
        let mid = Math.floor(removeDupesAndSorted.length/2)
        //set the root of the tree
        let root = new Node(removeDupesAndSorted[mid])
        //left subtree 
        root.left = buildTreeRecursive(removeDupesAndSorted.slice(0,mid))
        //right subtree
        root.right = buildTreeRecursive(removeDupesAndSorted.slice(mid+1))
        // return the root
        return root
    }

    //function to insert a value 
    function insertItem(root,data){
        if (root === null)
            return new Node (data)

        if (root.data === data)
            return root

        if (data < root.data)
            root.left = insertItem(root.left,data)

        else if (data > root.data)
            root.right = insertItem(root.right,data)
        return root
    }

    //function that is used in the deleteItem function based on # of children
    function getSuccessor(currentNode){
        currentNode = currentNode.right
        while (currentNode !== null & currentNode.left !== null) {
            currentNode = currentNode.left
        }
        return currentNode
    }

    //function to delete a value
    function deleteItem(root,data){
        if (root === null){
            return root
        }
        if (root.data > data){
            root.left = deleteItem(root.left,data)
        } else if (root.data < data){
            root.right = deleteItem(root.right,data)
        } else {
            if (root.left === null){
                return root.right
            }
            if (root.right === null) {
                return root.left
            }
            let successor = getSuccessor(root)
            root.data = successor.data
            root.right = deleteItem(root.right, successor.data)
        }
        return root 
    }

    //function to find a value 
    function find(root,value){
        if (root === null || root.data === value){
            console.log(root)
            return root
        } 

        if (root.data < value){
            return find(root.right, value)
        }
        
            return find(root.left, value)
    }


    //function for levelorder reversal
    function levelOrder(root, callback){
        if (typeof callback != 'function'){
            throw new Error("Function requires a callback function")
        }

        let queue = [root]

        while (queue.length > 0){
            let currentNode = queue.shift()
            callback(currentNode)

            if (currentNode.left){
            queue.push(currentNode.left)
            }
            if (currentNode.right){
                queue.push(currentNode.right)
            }
        }
    }

    //function for preorder traversal
    function preOrder(root,callback){
        if (typeof callback != 'function'){
            throw new Error("Function requires a callback function")
        }
        
        if (root === null){
            return
        }
        callback(root)
        preOrder(root.left,callback)
        preOrder(root.right,callback)
    }

    //function for inorder traversal
    function inOrder(root,callback){
        if (typeof callback != 'function'){
            throw new Error("Function requires a callback function")
        }
        
        if (root === null){
            return
        }
        inOrder(root.left,callback)
        callback(root)
        inOrder(root.right,callback)
    }

    //function for postorder traversal
    function postOrder(root,callback){
        if (typeof callback != 'function'){
            throw new Error("Function requires a callback function")
        }
        
        if (root === null){
            return
        }
        postOrder(root.left,callback)
        postOrder(root.right,callback)
        callback(root)
    }

    //function to obtain the height of an node

    function height(node,root){

        if (root === null){
            console.log(-1)
            return -1
        }

        if (root.data === node.data){
            return Math.max(height(node, root.left), height (node, root.right)) +1
        }

        if (node.data<root.data){
            return height(node, root.left)
        } else {
            return height(node, root.right)
        }
    }

    //function to obtain the height of the tree 

    function treeheight(root){
        if (root === null) {
            return 0
        } 
            return Math.max(treeheight(root.left), treeheight(root.right)) +1
        }

    //function to obtaiun the depth of a node

    function depth(root,target){
        if (root === null){
            return -1
        }

        if (root.data === target){
            return 0
        }

        if (target<root.data){
            let leftDepth = depth(root.left, target)
            if (leftDepth !== -1) {
                return leftDepth + 1
            }
        }

        if(target>root.data){
            let rightDepth = depth(root.right, target)
            if (rightDepth !== -1){
                return rightDepth + 1
            }
        }
        return -1
    }

    //function to check if tree is balanced
    function isBalanced(root){

        if(root === null){
            return true
        }

        let leftheight = treeheight(root.left)
        let rightheight = treeheight(root.right)

        if (Math.abs(leftheight-rightheight) <= 1 && isBalanced(root.left) === true && isBalanced(root.right) === true) {
            console.log("The tree is balanced")

            return true
        }

        console.log("The tree is not balanced")
        return false
    }

    //function to rebalance the tree if it is unbalanced
    function rebalance(root){
        
        if (root === null){
            return null
        }

        let newArray = []

        function pushToArray(node){
            newArray.push(node.data)
        }

        inOrder(root,pushToArray)

        return buildTreeRecursive(newArray)
    }

    //prettyprint function to format the tree in the console 
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
        return;
        }
        if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

  //function to create a random array of 10 numbers less than 100 
  function randomArray(){
    let array = []
    for (i = 0; i < 15; i++){
        array.push(Math.floor(Math.random()*100))
    }
    console.log(array)
    return array
  } 

  //function to console log the nodes data 
  function consoleLogNodes(node){
    console.log(node.data)
  }

//create an array
const array = [1,19,24,53,67,42,42,22,94,86,41,12,21]

//build a tree from the array
let root = buildTreeRecursive(array)

console.log("Original Tree:")
prettyPrint(root)

console.log("-----------")

// inserting items to unbalance the treee
insertItem(root,146)
insertItem(root,124)
insertItem(root,406)
insertItem(root,500)
insertItem(root,302)
insertItem(root,155)
insertItem(root,222)
insertItem(root,242)

console.log("Tree with additions (unbalanced):")
prettyPrint(root)

console.log("-----------")
root = rebalance(root)

console.log("Rebalanced Tree:")
prettyPrint(root)
console.log("-----------")
console.log("Preorder Traversal:")
preOrder(root,consoleLogNodes)
console.log("-----------")
console.log("Inorder Traversal:")
inOrder(root,consoleLogNodes)
console.log("-----------")
console.log("Postorder Traversal:")
postOrder(root,consoleLogNodes)
console.log("-----------")
console.log("Levelorder Traversal:")
levelOrder(root,consoleLogNodes)
console.log("-----------")
