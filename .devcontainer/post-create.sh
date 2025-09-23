#!/bin/bash

# Supabase local setup

npm install supabase --save-dev

cd supabase && supabase start


# Capasitor local setup

npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios


# Vue local setup

cd frontend && npm install