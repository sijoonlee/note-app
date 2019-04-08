import * as model from './model.js';
import * as view from './view.js';

var bindEvent = function (memoNode){ //memoNode = memo div

    let id = memoNode.id;
    let titleNode = memoNode.getElementsByClassName("title")[0];
    let bodyNode = memoNode.getElementsByClassName("body")[0];
    let topNode = memoNode.getElementsByClassName("top")[0];
    let bottomNode = memoNode.getElementsByClassName("bottom")[0]
    let hideButtonNode = memoNode.getElementsByClassName("hide")[0];
    let addButtonNode = memoNode.getElementsByClassName("add")[0];
    let deleteButtonNode = memoNode.getElementsByClassName("delete")[0];
    let dragPinNode = memoNode.getElementsByClassName("dragPin")[0];
    let resizerNode = memoNode.getElementsByClassName("resizer")[0];

    titleNode.addEventListener("input", async ()=>{
        await model.updateAMemo({_id: id, title: titleNode.innerHTML});
    });

    bodyNode.addEventListener("input", async ()=>{
        await model.updateAMemo({_id: id, body: bodyNode.innerHTML});
    });

    deleteButtonNode.addEventListener("click", async ()=>{
        await model.deleteAMemo(id)
        view.deleteAMemo(id)
    });

    addButtonNode.addEventListener("click", async ()=>{
        const newMemo = await model.addAMemo(); //add memo into array at the next index of prevousId
        newMemo.posX = parseInt(memoNode.style.left.slice(0,-2),10) + parseInt(memoNode.style.width.slice(0,-2),10)+10; 
        newMemo.posY = parseInt(memoNode.style.top.slice(0,-2),10);
        const newMemoNode = await view.addAMemo(newMemo); //add memo into node at the next to given id
        await bindEvent(newMemoNode);
    });

    hideButtonNode.addEventListener("click", async ()=>{
        const height = await model.toggleHide(id);
        await view.toggleHide(memoNode, height);    
    });

    dragPinNode.addEventListener("mousedown", () => { // elmnt : pinBox div
        var e = window.event;
        e.preventDefault();
        let beforePosX = e.clientX;
        let beforePosY = e.clientY;
        let afterPosX;
        let afterPosY;
        let memoPosX;
        let memoPosY;
        
        // call a function whenever the cursor moves:
        document.onmousemove = function (e) {
            // calculate the new cursor position:
            afterPosX = beforePosX - e.clientX;
            afterPosY = beforePosY - e.clientY;
            beforePosX = e.clientX;
            beforePosY = e.clientY;
            // set the element's new position
            memoPosY = memoNode.offsetTop - afterPosY;
            memoPosX = memoNode.offsetLeft - afterPosX;
            memoNode.style.top = memoPosY + "px";
            memoNode.style.left = memoPosX + "px";
        }
    
        // stop moving when mouse button is released
        document.onmouseup = function (e) {
            document.onmouseup = null;
            document.onmousemove = null;
            model.updateAMemo({_id:id, posX: memoPosX, posY: memoPosY})
        }
    }); 

    resizerNode.addEventListener("mousedown", ()=>{
        var e = window.event;
        e.preventDefault();
        let width;
        let height;
        let minHeight = 100;
        let minWidth = 100;
        document.onmousemove = function (e) {
            if ((e.clientY - memoNode.offsetTop) < minHeight )
                height = minHeight;
            else height = e.clientY - memoNode.offsetTop;
            if ((e.clientX - memoNode.offsetLeft) < minWidth )
                width = minWidth;
            else width = e.clientX - memoNode.offsetLeft;

            memoNode.style.width = width + 'px'
            memoNode.style.height = height + 'px';
            
            let titleHeight = titleNode.style.height.replace("px","");
            let topHeight = topNode.style.height.replace("px","");
            let bottomHeight = bottomNode.style.height.replace("px","");
            bodyNode.style.height = height - titleHeight - topHeight - bottomHeight + 'px';
        }
        document.onmouseup = function (e) {
            document.onmouseup = null;
            document.onmousemove = null;
            model.updateAMemo({_id:id, width, height})
        }
    });
}

var addNode = document.getElementsByClassName("addAMemo")[0];
addNode.addEventListener("click", async ()=>{
    const memo = await model.addAMemo();
    const memoNode = await view.addAMemo(memo);
    await bindEvent(memoNode);
});

var saveNode = document.getElementsByClassName("save")[0];
saveNode.addEventListener("click", async ()=>{
    await model.saveBoard();
});

var loadNode = document.getElementsByClassName("load")[0];
loadNode.addEventListener("click", async ()=>{
    await view.deleteAllMemos();
    const webBoard = await model.loadBoard();
    for ( let i in webBoard){
        let memoNode = await view.addAMemo(webBoard[i]);
        await bindEvent(memoNode)
    }
});

var deleteAllMemosNode = document.getElementsByClassName("deleteAllMemos")[0];
deleteAllMemosNode.addEventListener("click", ()=>{
    model.deleteAllMemos();
    view.deleteAllMemos();
});


