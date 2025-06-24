
FROM denoland/deno:alpine

WORKDIR /app
COPY . .

# Abhängigkeiten cachen
RUN deno cache main.ts

# Service starten
CMD ["run", "--allow-all", "main.ts"]
