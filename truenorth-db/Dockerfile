FROM postgres:13

ENV POSTGRES_PASSWORD=truenorthpass
ENV POSTGRES_DB=truenorthdb

COPY script.sql /docker-entrypoint-initdb.d/
