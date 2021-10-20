import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    let enabledButtonClassU = "top5-button";
    let enabledButtonClassR = "top5-button";
    let enabledButtonClassC = "top5-button";

    console.log(store.hasTransactionToUndo);
    if (store.currentList === null) {
        enabledButtonClassU = "top5-button-disabled";
        enabledButtonClassR = "top5-button-disabled";
        enabledButtonClassC = "top5-button-disabled";
    }
    if(store.isItemEditActive) {
        enabledButtonClassU = "top5-button-disabled";
        enabledButtonClassR = "top5-button-disabled";
        enabledButtonClassC = "top5-button-disabled";
    }
    if (!store.checkTransactionToUndo()) {
        enabledButtonClassU = "top5-button-disabled";
    }
    if (!store.checkTransactionToRedo()) {
        console.log(store.hasTransactionToRedo);
        enabledButtonClassR = "top5-button-disabled";
    }
    function handleUndo() {
        if (store.currentList !== null) {
            if(!store.isItemEditActive) {
                if (store.checkTransactionToUndo()) {
                    store.undo();
                    store.checkTransactionToUndo();
                    store.checkTransactionToRedo();
                }
            }
        }
    }
    function handleRedo() {
        if (store.currentList !== null) {
            store.checkTransactionToRedo();
            if(!store.isItemEditActive) {
                if (store.checkTransactionToRedo()) {
                    store.redo();
                    store.checkTransactionToRedo();
                    store.checkTransactionToUndo();
                }
            }
        }
    }
    function handleClose() {
        if (store.currentList !== null) {
            if(!store.isItemEditActive) {
                history.push("/");
                store.closeCurrentList();
            }
        }
    }
    return (
        <div id="edit-toolbar">
            <div
                id='undo-button'
                onClick={handleUndo}
                className={enabledButtonClassU}>
                &#x21B6;
            </div>
            <div
                id='redo-button'
                onClick={handleRedo}
                className={enabledButtonClassR}>
                &#x21B7;
            </div>
            <div
                id='close-button'
                onClick={handleClose}
                className={enabledButtonClassC}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;