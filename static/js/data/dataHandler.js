export let dataHandler = {
    getBoards: async function () {
        let response = await apiGet("/api/boards");
        return response
    },
    getCardsByBoardId: async function (boardId) {
        const response = await apiGet(`/api/boards/${boardId}/cards/`);
        return response
    },
    deleteCard: async function (cardId) {
        const response = apiDelete(`/api/cards/${cardId}`);
        return response;
    },
    createNewBoard: async function (title) {
        let boardTitle = {}
        boardTitle.title = title
        let response = await apiPost('/api/boards/create', boardTitle)
        return response
    },
    deleteBoard: async function (boardId) {
        const response = apiDelete(`/api/boards/${boardId}`);
        return response
    },
    createNewCard: async function (title, boardId, statusId) {
        let cardData = {
            "title": title,
            "board_id": boardId,
            "status_id": statusId
        }
        return await apiPost('/api/cards/create', cardData)
    },
    registerUser: async function (userData) {
        let payload = {
            'name': userData[0].value,
            'email': userData[1].value,
            'psw': userData[2].value
        }
        let response = await apiPost("/register", payload)
    },
    loginUser: async function (userData) {
        let payload = {
            'email': userData[0].value,
            'psw': userData[1].value
        }
        let response = await apiPost("/login", payload)
    },
    renameCard: async function (cardTitle, cardId) {
        const payload = {
            "cardId": cardId,
            "cardTitle": cardTitle
        }
        return await apiPatch(`/api/cards`, payload)
    },
    renameBoard: async function (boardTitle, boardId) {
        const payload = {
            'boardTitle': boardTitle,
            'boardId': boardId
        }
        return await apiPatch(`/api/boards`, payload)
    },
    getColumns: async function (boardId) {
        return await apiGet(`/api/columns/${boardId}`)
    },
    renameColumns: async function (columnTitle, columnId) {
        const payload = {
            'column_title': columnTitle,
            'column_id': columnId
        }
        return await apiPatch(`/api/column/rename`, payload)
    },
    registerNewContainer: async function (boardId, title, color) {
        let payload = {
            "board_id": boardId,
            "title": title,
            "color": color
        }
        return await apiPost('/api/columns/create', payload)
    },
    updateCardStatus: async function (cardId, cardStatusId) {

        let payload = {
            "card_id": cardId,
            "card_status_id": cardStatusId
        }
        await apiPatch('/api/card/change-status', payload)
    },
    deleteColumn: async function (columnId) {
        const response = apiDelete(`/api/columns/${columnId}`);
        return response
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: "DELETE",
    });
    if (response.status === 200) {
        let data = response.json();
        return data;
    }
}

async function apiPut(url) {
}

async function apiPatch(url, payload) {
    let response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 200) {
        let data = response.json();
        console.log(data);
    }
}
