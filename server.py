from flask import Flask
import pygetwindow as gw
import time
# from yourmodule import function_that_return_xml
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World"


@app.route("/pokemon/<name>", methods=['GET'])
def pokemon(name):
    # xml = function_that_return_xml()
    # make fancy operations if you want
    # return xml
    alltitles = gw.getAllTitles()
    for t in alltitles:
        if "- Discord" in t:
            print(t)
            now_window_name = gw.getWindowsWithTitle(t[0])[0]
            time.sleep(2)
            now_window_name.restore()
            # now_window_name.activate()
            try:
                now_window_name.activate()
            except:
                now_window_name.minimize()
                now_window_name.maximize()

    return "successful"

# @app.route('/pokemon/<name>', methods=['GET'])
# def queryDataMessageByName(name):
#     print("type(name) : ", type(name))
#     return 'String => {}'.format(name)


if __name__ == "__main__":
    app.run()
