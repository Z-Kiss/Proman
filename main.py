from flask import Flask, render_template, url_for, session, redirect, request, jsonify
from dotenv import load_dotenv
from util import json_response
import util
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask('main')
load_dotenv()
app.secret_key = 'fafsa'


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    session.clear()
    session['user'] = 'Guest'
    return render_template('index.html')


@app.route("/register", methods=['POST'])
def register():
    user_data = request.get_json()
    user_data['psw'] = util.hash_password(user_data['psw'])
    # try:
    #     return jsonify(queries.register_user(user_data))
    # except psycopg2.errors.UniqueViolation:
    #     return jsonify("id": psycopg2.errors.UniqueViolation)
    return jsonify(queries.register_user(user_data))


@app.route("/login")
@json_response
def login():
    user_data = request.get_json()
    hashed_psw = queries.get_password(user_data['name'])
    if util.verify_password(user_data['psw'], hashed_psw):
        session['user'] = user_data
    return user_data


@app.route("/api/boards/create", methods=['POST'])
@json_response
def create_board():
    board = queries.add_new_board(request.json["title"])

    return board


@app.route("/api/boards")
@json_response
def get_boards():
    boards = queries.get_boards()
    return boards


@app.route("/api/cards/create", methods=['POST'])
@json_response
def add_cards():
    card_data = request.get_json()
    print(card_data)
    order = queries.get_card_order(card_data['board_id'])
    status_id = card_data['status_id']
    card_data = queries.create_new_card(request.json["title"], order['count'] + 1, request.json["board_id"], status_id)
    return card_data


@app.route('/api/columns/<int:board_id>')
@json_response
def get_columns_by_board_id(board_id: int):
    return queries.get_columns_for_board(board_id)


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/columns/<int:column_id>", methods=['DELETE'])
@json_response
def delete_column_by_id(column_id: int):
    queries.delete_cards_by_column_id(column_id)
    return queries.delete_column_by_id(column_id)


@app.route("/api/cards/<int:card_id>", methods=['DELETE'])
@json_response
def delete_card_by_id(card_id: int):
    return queries.delete_card_by_id(card_id)


@app.route("/api/cards", methods=['PATCH'])
@json_response
def change_title():
    card_data = request.get_json()
    return queries.change_title(card_data)


@app.route("/api/boards", methods=['PATCH'])
@json_response
def change_title_for_board():
    board_data = request.get_json()
    return queries.change_title_board(board_data)


@app.route('/api/column/rename', methods=['PATCH'])
@json_response
def change_title_for_columns():
    column_data = request.get_json()
    status_id = queries.get_status_for_column(column_data["column_id"])
    return queries.change_status_title(status_id['status_id'], column_data['column_title'])


@app.route("/api/boards/<int:board_id>", methods=['DELETE'])
@json_response
def delete_board_by_id(board_id: int):
    return queries.delete_board_by_id(board_id)


@app.route('/api/columns/create', methods=['POST'])
@json_response
def add_new_column():
    board_id = request.json["board_id"]
    title = request.json["title"]
    color = request.json["color"]
    order = queries.get_order_for_column(board_id)
    status_id = queries.add_new_status(title, color)
    column_id = queries.add_new_column(board_id, status_id["id"], order["order"])
    column = {
        "id": column_id["id"],
        "board_id": column_id['board_id'],
        "status_id": status_id["id"],
        "title": title,
        "color": color
    }
    return column


@app.route('/api/card/change-status', methods=['PATCH'])
@json_response
def change_card_status():
    card_id = request.json['card_id']
    card_status_id = request.json['card_status_id']
    print(card_id, card_status_id)
    return queries.change_card_status(card_id, card_status_id)


def main():
    app.run(debug=True,
            port=5007)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
