import {boardsManager} from "./controller/boardsManager.js";
import {userManager} from "./controller/userManager.js";
import {domManager} from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    userManager.registerButton()
    domManager.addEventListener('#create-board', 'click', boardsManager.addNewBoard);
}

init();
