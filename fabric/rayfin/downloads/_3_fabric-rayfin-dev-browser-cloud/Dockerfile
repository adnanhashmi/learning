# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim

# Native build tools also cover platforms without a prebuilt keytar binary.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       ca-certificates curl git python3 make g++ pkg-config libsecret-1-dev libatomic1 tini \
    && rm -rf /var/lib/apt/lists/*

# Standalone code-server includes its own Node runtime and VS Code server.
# SHA-256 values are from the v4.144.0 GitHub release asset digests.
RUN set -eux; \
    arch="$(dpkg --print-architecture)"; \
    case "$arch" in \
      amd64) sha256=710f749c40a0f3d0ab3be09c0de65314e5c2907cc50646f5fbc0f24c0e8fba2d ;; \
      arm64) sha256=4404c784f541bd56a2a8d6e2a9474ed0b4e37bc8502aa3a247898ca933434482 ;; \
      *) echo "Unsupported architecture: $arch" >&2; exit 1 ;; \
    esac; \
    curl -fL --retry 3 "https://github.com/coder/code-server/releases/download/v4.144.0/code-server-4.144.0-linux-${arch}.tar.gz" -o /tmp/code-server.tar.gz; \
    echo "$sha256  /tmp/code-server.tar.gz" | sha256sum -c -; \
    mkdir -p /usr/lib/code-server; \
    tar -xzf /tmp/code-server.tar.gz --strip-components=1 -C /usr/lib/code-server; \
    ln -s /usr/lib/code-server/bin/code-server /usr/local/bin/code-server; \
    rm /tmp/code-server.tar.gz; \
    code-server --version

ENV NODE_ENV=development \
    HOST=0.0.0.0 \
    PORT=3000

WORKDIR /app
RUN mkdir -p /var/lib/rayfin-local && chown node:node /app /var/lib/rayfin-local
USER node
RUN mkdir -p /home/node/.rayfin /home/node/.config/code-server /home/node/.local/share/code-server

# Include the CLI devDependency: this is a development image.
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund && npm cache clean --force
COPY --chown=node:node index.js start-container.mjs healthcheck.mjs local-backend.mjs schema-generate.mjs backend-smoke.mjs sdk-logging.mjs ./
COPY --chown=node:node rayfin/ ./rayfin/
# Keep container startup independent of a mounted project directory.
COPY --chown=node:node start-container.mjs healthcheck.mjs /usr/local/lib/rayfin-dev/

EXPOSE 3000 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD ["node", "/usr/local/lib/rayfin-dev/healthcheck.mjs"]

# tini reaps orphaned children; the supervisor stops both service process groups.
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "/usr/local/lib/rayfin-dev/start-container.mjs"]
