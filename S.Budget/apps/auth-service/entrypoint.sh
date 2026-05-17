#!/bin/sh
set -e

echo "Starting Auth Service..."
npx prisma migrate deploy --schema prisma/schema.prisma || npx prisma db push --schema prisma/schema.prisma || echo "Migration already applied or skipped"
node dist/apps/auth-service/main.js
