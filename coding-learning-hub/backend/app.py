from __future__ import annotations

import logging
import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

from api.routes import api_blueprint
from config import AppConfig


load_dotenv()


def configure_logging() -> None:
    level_name = os.getenv("LOG_LEVEL", "INFO").upper()
    level = getattr(logging, level_name, logging.INFO)

    logging.basicConfig(
        level=level,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )


def create_app() -> Flask:
    configure_logging()
    config = AppConfig()
    app = Flask(__name__)
    app.config.from_mapping(config.to_dict())

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": config.cors_origins,
                "methods": ["GET", "POST", "OPTIONS"],
                "allow_headers": ["Content-Type"],
            }
        },
    )

    app.register_blueprint(api_blueprint)

    @app.get("/health")
    def healthcheck():
        return jsonify(
            {
                "success": True,
                "message": "Coding Learning Hub backend is healthy.",
                "environment": config.app_env,
            }
        ), 200

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify(
            {
                "success": False,
                "message": "Endpoint tidak ditemukan.",
            }
        ), 404

    @app.errorhandler(405)
    def method_not_allowed(_error):
        return jsonify(
            {
                "success": False,
                "message": "Method tidak diizinkan untuk endpoint ini.",
            }
        ), 405

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.exception("Unhandled server error: %s", error)
        return jsonify(
            {
                "success": False,
                "message": "Terjadi kesalahan internal pada server.",
            }
        ), 500

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"],
    )
