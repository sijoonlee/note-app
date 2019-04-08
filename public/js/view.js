export function addAMemo(memo) {
    const topHeight = 20;
    const titleHeight = 20;
    const bottomHeight = 20;
	var newNode = document.createElement("div");
    newNode.setAttribute("class", "memo");
    newNode.setAttribute("id", memo._id);
    newNode.style.top = memo.posY;
    newNode.style.left = memo.posX;
    newNode.style.height = memo.height + "px";
    newNode.style.width = memo.width + "px";
    newNode.innerHTML =
        `<div class=\"top\" style = \"height:${topHeight}px\">
        <div class = \"dragPin\"></div>
        <input class=\"hide\" type=\"button\" value=\"^\">
        <input class=\"add\" type=\"button\" value=\"+\">
        <input class=\"\delete\" type=\"button\" value=\"-\"></div>
        <div contentEditable = true class = \"title\" style = \"height:${titleHeight}px\">${memo.title}</div>
        <div contentEditable = true class = \"body\" style = \"height:${memo.height-topHeight-titleHeight-bottomHeight}px\">${memo.body}</div>
        <div class = \"bottom\" style = \"height:${bottomHeight}px\">
        <div class = \"resizer\"></div></div>`;

    if (memo.isHidden){
        newNode.getElementsByClassName("content")[0].style.display = "none";
        newNode.getElementsByClassName("resizer")[0].style.display = "none";
    }
   
    
    var givenNode = document.getElementsByClassName("board")[0];
    givenNode.appendChild(newNode);
    
    
    // var givenNode = document.getElementById(givenId);
    // givenNode.parentNode.insertBefore(newNode, givenNode.nextSibling);

    return newNode;
}

export function deleteAMemo(id){
    var targetNode = document.getElementById(id);
    targetNode.parentNode.removeChild(targetNode);
}

export function deleteAllMemos(){
    var existingPinBoard = document.getElementsByClassName("board")[0];
	existingPinBoard.innerHTML = ""; // clean board
}

export function toggleHide(memoNode, height){
    let bodyNode = memoNode.getElementsByClassName("body")[0];
    let resizerNode = memoNode.getElementsByClassName("resizer")[0];
    if(bodyNode.style.display == 'none'){
        memoNode.style.height = height;
        bodyNode.style.display = 'block';
        resizerNode.style.display = "block";
    } else {
        memoNode.style.height = "60px";
        bodyNode.style.display = 'none';
        resizerNode.style.display = "none";
    }
}