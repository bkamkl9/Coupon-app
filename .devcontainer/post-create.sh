#!/bin/bash

# Supabase local setup

npm install pnpm --global

pnpm add -D supabase

cd supabase && supabase start


# Turborepo init

pnpm add -g turbo

# Capasitor local setup

pnpm add @capacitor/core @capacitor/cli
pnpm add @capacitor/android @capacitor/ios


# Vue local setup

cd frontend && pnpm install