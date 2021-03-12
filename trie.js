
// Tree Node class
class PrefixTreeNode {
    constructor(value) {
        this.children = {}
        this.endWord = null
        this.value = value
    }
}

// Tree class
class PrefixTree extends PrefixTreeNode {
    // Constructs root node
    constructor () {
        super(null)
    }

    // Method to add new word to the tree
    addWord(string) {
        // Helper function accepts node and string to add
        const addWordHelper = (node, str) => {
            // If the does not have the first letter contained in the string already
            if (!node.children[str[0]]) {
                // Adds a new node containing that letter
                node.children[str[0]] = new PrefixTreeNode(str[0])
                // If that's the last letter of the word, ends word
                if (str.length === 1) {
                    node.children[str[0]].endWord = 1
                }
            } else {
    
            }
    
            // If the last letter of the initial string has not been encountered, this will run the helper function again until the string is reduced to one letter
            if (str.length > 1) {
                addWordHelper(node.children[str[0]], str.slice(1))
            } 
        }

        // Initial run of the function
        addWordHelper(this, string)
    }

    // Function to predict a word given
    predictWord(string) {

        // Gets what nodes remain in the tree descending from the given node (On first run, this is the root)
        let getRemainingTree = function(string, tree) {
            let node = tree
            while (string) {
                node = node.children[string[0]]
                string = string.substr(1)
            }
            return node
        }

        // Array to contain all the words currently stored in the trie
        let allWords = []

        // Function to get all the wrods currently stored in the trie
        let allWordsHelper = function(stringSoFar, tree) {
            // Checks each of the children on the current node
            for (let k in tree.children) {
                // Grabs the node's child, and the value stored in it
                const child = tree.children[k]
                // Pushes child value to the string
                let newString = stringSoFar + child.value
                // Checks if this new value completes a word, and if so, pushes it to the allWords array
                if (child.endWord) {
                    allWords.push(newString)
                }
                // Runs the functions again. Since this functions depends on a loop, it won't run if there are no more nodes to check
                allWordsHelper(newString, child)
            }
        }

        // Gets what remains of the tree
        let remainingTree = getRemainingTree(string, this)

        // If there's any more nodes it hasn't processed yet
        if (remainingTree) {
            // It runs them through the same process
            allWordsHelper(string, remainingTree)
        }

        return allWords
    }

    logAllWords() {
        console.log('---------- All words in trie ============')
        console.log(this.predictWord(''))
    }
}

let testTrie = new PrefixTree()
testTrie.addWord('!veils')
testTrie.addWord('!irons')
testTrie.addWord('!hearts')
testTrie.addWord('!mirrors')
testTrie.addWord('!peril')
testTrie.addWord('!peril3')
testTrie.addWord('!peril6')
testTrie.addWord('!tenac')
testTrie.addWord('!tenac3')
testTrie.addWord('!tenac6')
testTrie.addWord('!ooc')
testTrie.addWord('!gm')
testTrie.logAllWords()
predictedWord = testTrie.predictWord('!v')

console.log(predictedWord)
console.log(testTrie)
