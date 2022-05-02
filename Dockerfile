# syntax=docker/dockerfile:1
FROM python:3.10-alpine
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache --virtual .build-deps bash gcc musl-dev libffi-dev \
    g++ libgcc libstdc++ libxml2-dev libxslt-dev openssl-dev curl \
    && apk add --no-cache --virtual --update-cache\
    mariadb-connector-c-dev

WORKDIR /code
COPY data/web/requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./data/web /code/
