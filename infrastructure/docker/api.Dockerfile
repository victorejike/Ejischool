FROM golang:1.22-alpine AS build
WORKDIR /src/services/api
COPY services/api/go.mod ./
COPY services/api ./
RUN go build -o /out/ejischool-api ./cmd/server

FROM alpine:3.20
WORKDIR /app
COPY --from=build /out/ejischool-api /app/ejischool-api
EXPOSE 8080
CMD ["/app/ejischool-api"]
