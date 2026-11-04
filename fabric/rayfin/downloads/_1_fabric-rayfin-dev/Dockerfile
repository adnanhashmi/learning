# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim

# Native build tools also cover platforms without a prebuilt keytar binary.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       ca-certificates git python3 make g++ pkg-config libsecret-1-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=development \
    HOST=0.0.0.0 \
    PORT=3000

WORKDIR /app
RUN chown node:node /app
USER node
RUN mkdir -p /home/node/.rayfin

# Include the CLI devDependency: this is a development image.
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund && npm cache clean --force
COPY --chown=node:node index.js ./

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node --input-type=module -e "const r = await fetch('http://127.0.0.1:' + process.env.PORT + '/health', { signal: AbortSignal.timeout(3000) }); if (!r.ok) process.exit(1);"

# Exec form lets Docker deliver SIGTERM directly to Node.
CMD ["node", "index.js"]
