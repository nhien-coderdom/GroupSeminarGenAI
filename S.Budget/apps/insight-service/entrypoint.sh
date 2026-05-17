#!/bin/sh
set -e

echo "Starting Insight Service..."
npx prisma migrate deploy --schema prisma/schema.prisma || npx prisma db push --schema prisma/schema.prisma || echo "Migration already applied or skipped"
node dist/apps/insight-service/main.js
