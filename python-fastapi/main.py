from fastapi import FastAPI

from routers.colognes import colognes_router

app = FastAPI()
app.include_router(colognes_router)
