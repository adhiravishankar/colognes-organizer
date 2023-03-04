from sqlalchemy import URL
from sqlalchemy.ext.declarative import declarative_base

from dotenv import dotenv_values

config = dotenv_values(".env")

POSTGRES_URL = URL.create("postgresql",
                          username=config["MONGODB_USERNAME"],
                          password=config["MONGODB_PASSWORD"],
                          host=config["MONGODB_HOST"],
                          database=config["MONGODB_DB"],
                          query={"sslmode": "verify-full"}
                          )

Base = declarative_base()
