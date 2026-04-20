#!/bin/bash

# ============================================
# 管理员账号初始化脚本
# ============================================
# 使用方法:
# 1. 先在 Supabase SQL 编辑器中执行 supabase/migrations/002_admin_tables.sql
# 2. 然后运行: bash scripts/setup-admin.sh
# ============================================

SUPABASE_URL="https://ksfefrrvqvksrglprbyu.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZmVmcnJ2cXZrc3JnbHByYnl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjUxMTkwNiwiZXhwIjoyMDkyMDg3OTA2fQ.0cpDcpxXG0NSHez0HG8PibZ0qPM35yeQD9-V5R8N0h0"

ADMIN_EMAIL="admin@berry-medical.com"
ADMIN_PASSWORD="BerryAdmin2024!"
ADMIN_NAME="系统管理员"

echo "========================================"
echo "开始创建管理员账号..."
echo "========================================"
echo "邮箱: $ADMIN_EMAIL"

# 1. 创建 Auth 用户
echo ""
echo "[1/2] 创建 Auth 用户..."

USER_RESPONSE=$(curl -s -X POST "$SUPABASE_URL/auth/v1/admin/users" \
  -H "Content-Type: application/json" \
  -H "apikey: $SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -d '{
    "email": "'"$ADMIN_EMAIL"'",
    "password": "'"$ADMIN_PASSWORD"'",
    "email_confirm": true,
    "user_metadata": {
      "name": "'"$ADMIN_NAME"'"
    }
  }')

USER_ID=$(echo $USER_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//')

if [ -z "$USER_ID" ] || [ "$USER_ID" = "$USER_RESPONSE" ]; then
  # 检查是否已存在
  if echo "$USER_RESPONSE" | grep -q "already been registered"; then
    echo "用户已存在，获取用户ID..."
    USER_LIST=$(curl -s -X GET "$SUPABASE_URL/auth/v1/admin/users" \
      -H "apikey: $SERVICE_ROLE_KEY" \
      -H "Authorization: Bearer $SERVICE_ROLE_KEY")
    USER_ID=$(echo $USER_LIST | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//')
  else
    echo "创建失败: $USER_RESPONSE"
    exit 1
  fi
fi

echo "用户ID: $USER_ID"

# 2. 创建 admin_profiles 记录
echo ""
echo "[2/2] 创建管理员资料..."

PROFILE_RESPONSE=$(curl -s -X POST "$SUPABASE_URL/rest/v1/admin_profiles" \
  -H "Content-Type: application/json" \
  -H "apikey: $SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Prefer: return=minimal" \
  -d '{
    "id": "'"$USER_ID"'",
    "email": "'"$ADMIN_EMAIL"'",
    "name": "'"$ADMIN_NAME"'",
    "role": "admin",
    "is_active": true
  }')

if [ -z "$PROFILE_RESPONSE" ]; then
  echo "管理员资料创建成功"
else
  # 可能是重复的，直接成功
  echo "管理员资料已存在或创建成功"
fi

echo ""
echo "========================================"
echo "✅ 管理员账号创建成功！"
echo "========================================"
echo ""
echo "登录信息:"
echo "  邮箱: $ADMIN_EMAIL"
echo "  密码: $ADMIN_PASSWORD"
echo ""
echo "请访问: http://localhost:3000/admin/login"
echo ""
