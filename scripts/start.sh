#!/bin/sh
# Startup script for Nuxt 3 with Prisma
# Executes migrations and data updates before starting the app

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

# Run data updates if file exists
if [ -f "./prisma/data-updates.sql" ]; then
  echo "📊 Running data updates..."
  npx prisma db execute --file ./prisma/data-updates.sql
fi

echo "🚀 Starting application..."
exec node .output/server/index.mjs
