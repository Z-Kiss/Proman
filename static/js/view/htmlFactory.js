export const htmlTemplates = {
    board: 1,
    card: 2,
    reg: 3,
    log: 4,
    boardTitle: 5,
    addCard: 6,
    cardContainer: 7,
    addNewContainer: 8
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.reg]: registerBuilder,
    [htmlTemplates.log]: loginBuilder,
    [htmlTemplates.boardTitle]: addBoardTitle,
    [htmlTemplates.addCard]: addNewCard,
    [htmlTemplates.cardContainer]: buildCardContainer,
    [htmlTemplates.addNewContainer]: addNewContainer
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return ` <div class="board-container" data-board-id=${board.id}>
                <div class="board-header">
                    <div class="board-title" data-board-id=${board.id}><span>${board.title}</span></div>
                    <div class="board-button-container">
                        <button class="delete-board-btn" data-board-id="${board.id}">
                            <i class="fa fa-trash-o"></i>
                        </button>
                        <button class="add-new-card" data-board-id=${board.id}>Add new card</button>
                        <button class="add-new-column" data-board-id=${board.id}>Add new Column</button>
                        <button class="toggle-board-button" data-board-id=${board.id}>Show Cards</button>
                    </div>
                </div>
                <div  class="board-body hidden" data-board-id=${board.id}>
                </div>
            </div>`;
}
function buildCardContainer(column){
    return `<div class="card-container" data-board-id="${column.board_id}" data-column-id="${column.id}">
               <div class="card-title" style="background: ${column.color}" data-column-id="${column.id}">
                    <span>${column.title}</span>
                    <button class="delete-column-btn" data-column-id="${column.id}">
                        <i class="fa fa-trash-o"></i>
                    </button>
               </div>
               <div class="card-slot" data-color="${column.color}" data-board-id="${column.board_id}" data-status="${column.status_id}"></div>
           </div>`;
}
function cardBuilder(card) {
    return `
            <div draggable="true" class="card" style="background-color: ${card.color}" data-board-id="${card.board_id}" data-card-order="${card.order}" data-card-id="${card.id}"><span>${card.title}</span>
                <button class="delete-btn" data-card-id="${card.id}">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>`;
}
function addNewCard(boardId) {
    return `
            <div class="card new-card">
                <span>
                <input type="text" id="add-card-input" name="add-card-input" required><button id="new-card-save-btn" data-board-id="${boardId}">Save</button>
                </span>
            </div>`;
}
function addBoardTitle() {
    return `<div class="board-container new-board-title">
                <div class="board-header">
                    <div class="board-title"><input type="text" id="add-board-input" name="add-board-input" required><button id="board-save-button">Save</button></div>
                </div></div>`
}
function loginBuilder(){
    return `
    <div class="reg-container">
        <div class="reg-box">
                <div class="reg-button">
                    <div>Loginr</div>
                    <button id="close">X</button>
                </div>
                <div>
                    <label for="email">E-mail address</label><br>
                    <input type="email" name="email">
                </div>
                <div>
                    <label for="password">Password</label><br>
                    <input type="text" name="password">
                </div>
                <button id="ok" data-func="log">Login</button>
        </div>
    </div>
    `
}
function registerBuilder(){
    return `
    <div class="reg-container">
        <div class="reg-box">
                <div class="reg-button">
                    <div>Register</div>
                    <button id="close">X</button>
                </div>
                
                <div>
                    <label for="username">User name</label><br>
                    <input type="text" name="username">
                </div>
                <div>
                    <label for="email">E-mail address</label><br>
                    <input type="email" name="email">
                </div>
                <div>
                    <label for="password">Password</label><br>
                    <input type="text" name="password">
                </div>
                <button id="ok" data-func="reg">Register</button>
        </div>
    </div>
    `
}
function addNewContainer(boardId){
    return `<div id="card-container-input">
               <div class="card-title-container" style="margin-top: 5px" >
                    Title:<input id="column-title" type="text"><br>
                    Color: <input id="column-color" type="color">
                     <button id="save-column" data-board-id="${boardId}" style="margin-top: 5px">Save</button></div>
<!--                <div class="card-slot" style="border: none;margin-top: 5px" >-->
                   
<!--                </div>-->
           </div>`;
}


