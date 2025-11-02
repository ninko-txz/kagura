import os
import random
from pathlib import Path

from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)

KAGURA_DIR_DEFAULT = str(Path.home() / "Pictures")
KAGURA_DIR = Path(os.getenv("KAGURA_DIR", KAGURA_DIR_DEFAULT))


@app.route("/")
def index():
    directories = [
        str(d.relative_to(KAGURA_DIR))
        for d in KAGURA_DIR.rglob("*")
        if d.is_dir() and any(child.is_file() for child in d.iterdir())
    ]

    return render_template("index.html", directories=sorted(directories))


@app.route("/croquis")
def croquis():
    size = int(request.args.get("size"))
    directory = request.args.get("directory")

    filenames = os.listdir(KAGURA_DIR / directory)
    sources = [f"/images/{directory}/{filename}" for filename in filenames]
    random.shuffle(sources)

    return render_template("croquis.html", sources=sources[:size])


@app.route("/images/<path:filename>")
def images(filename):
    return send_from_directory(KAGURA_DIR, filename)
