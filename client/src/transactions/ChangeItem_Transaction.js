import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * ChangeItem_Transaction
 * 
 * This class represents a transaction that updates the text
 * for a given item. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author George Cheng
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, index, initOldText, initNewText) {
        super();
        this.store = initStore;
        this.index = index;
        this.oldText = initOldText;
        this.newText = initNewText;
    }

    doTransaction() {
        this.store.updateItemName(this.index, this.newText);
    }
    
    undoTransaction() {
        this.store.updateItemName(this.index, this.oldText);
    }
}