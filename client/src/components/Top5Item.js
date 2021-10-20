import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(false);
    const [ text, setText ] = useState("");
    const [draggedTo, setDraggedTo] = useState(0);

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
        store.checkTransactionToUndo();
    }
    function handleToggleItemEdit(event) {
        toggleItemEdit();
    }
    function toggleItemEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        else {
            store.setIsItemEditInactive();
        }
        setEditActive(newActive);
    }
    function handleItemUpdateText(event) {
        setText(event.target.value);
    }
    function handleEnterPress(event) {
        if (event.code === "Enter") {
            let oldText = store.currentList.items[index];
            store.addChangeItemTransaction(index, oldText, text);
            toggleItemEdit();
            store.checkTransactionToUndo();
        }
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let cardStatus = false;
    if (store.isItemEditActive) {
        cardStatus = true;
    }
    if (cardStatus) {
        itemClass = 'top5-item ' + "disabled";
    }
    let itemElement =
            <div
                id={'item-' + (index + 1)}
                className={itemClass}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                draggable={!cardStatus}
            >
                <input
                    disabled = {cardStatus}
                    type="button"
                    id={"edit-item-" + index + 1}
                    className="list-card-button"
                    onClick = {handleToggleItemEdit}
                    value={"\u270E"}
                />
                {props.text}
            </div>;
    if (editActive) {
        itemElement =
        <input
                id={"item-"+(index+1)}
                className={"top5-item"}
                onKeyPress={handleEnterPress}
                onChange={handleItemUpdateText}
                defaultValue={store.currentList.items[index]}
                type='text'
            />;
    }
    return(
        itemElement
    );
}

export default Top5Item;