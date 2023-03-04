from fastapi import APIRouter

colognes_router = APIRouter(prefix="/colognes")


@colognes_router.get("/")
async def read_colognes():
    return {"message": "Hello Read Colognes"}


@colognes_router.get("/{cologne}")
async def read_cologne(cologne: str):
    return {"message": cologne}


@colognes_router.post("/{cologne}")
async def post_cologne(cologne: str):
    return {"message": cologne}


@colognes_router.patch("/{cologne}")
async def update_cologne(cologne: str):
    return {"message": cologne}


@colognes_router.delete("/{cologne}")
async def delete_cologne(cologne: str):
    return {"message": cologne}

