FROM python:alpine as runner

COPY . /app

RUN pip install -r /app/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app"]