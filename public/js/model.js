import * as apiCall from './api.js';
 
const defaultMemo = { 
    title: "", 
    body: "",
    posX: 100,
    posY: 100,
    width: 100,
    height: 100,
    isHidden: false,
    isDeleted: false
}

var webBoard = [];

const DEBUGLOG = false;

export async function loadBoard (){
    
    await apiCall.loadAllMemos().then(data => {
        webBoard = []; // clear up
        for (var i in data)
            webBoard[i] = Object.assign({}, data[i]); // copy object
    })
    if(DEBUGLOG) 
        console.log(webBoard);
    return webBoard;
}

export async function saveBoard(){
    for (var i in webBoard){
        if(webBoard[i].isDeleted)
            await apiCall.deleteAMemo(webBoard[i]._id);
        else
            await apiCall.updateAMemo(webBoard[i]);
    }
    if(DEBUGLOG) 
        console.log(webBoard);
}

export async function addAMemo(memo = defaultMemo){
    var dbMemo = Object.assign({}, memo); 
    await apiCall.createAMemo(dbMemo).then(data => { // mongodb will generate unique id
        // dbMemo = Array.from(data, x=>x); 
        const updates = Object.keys(data);
        updates.forEach((update) => dbMemo[update] = data[update]); // combine data into user memo
    })
   
    webBoard.push(dbMemo);
    if(DEBUGLOG) 
        console.log(webBoard);
    return dbMemo;
}

export function findAMemo(id){
    var index = -1;
    for ( var cursor in webBoard) {
        if ( webBoard[cursor]._id === id ) {
            index = cursor;
            break;
        }
    }
    return index;
}

export function deleteAMemo(id){
    const index = findAMemo(id);
    webBoard[index].isDeleted  = true;
    if(DEBUGLOG) 
        console.log(webBoard);   
    //webBoard.splice(findMemo(id),1);
}

export function deleteAllMemos(){
    for( var i in webBoard)
        webBoard[i].isDeleted  = true;
    if(DEBUGLOG) 
        console.log(webBoard);
}

export function updateAMemo (memo){

    const index = findAMemo(memo._id);
    const updates = Object.keys(memo)
    updates.forEach((update) => {
        if(update != "_id")
            webBoard[index][update] = memo[update]
    });
    if(DEBUGLOG) 
        console.log(webBoard);
}

export function toggleHide(id){
    const index = findAMemo(id);
    webBoard[index].isHidden = !webBoard[index].isHidden || true;
    return webBoard[index].height || 100;  
}
