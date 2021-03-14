from flask import Flask, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/rooms")
def rooms():
    return render_template("rooms.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/logIn")
def logIn():
    return render_template("logIn.html")


@app.route("/createAccount")
def createAccount():
    return render_template("createAccount.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/menu")
def menu():
    return render_template("menu.html")


@app.route("/aboutUs")
def aboutUs():
    return render_template("aboutUs.html")


@app.route("/bookRoom")
def bookRoom():
    return render_template("bookRoom.html")


if __name__ == "__main__":
    app.run(debug=True)
