/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // чтобы использовать describe, it, expect без импорта
		environment: 'jsdom', // имитация браузера для тестов
		setupFiles: ['./src/test/setupTests.ts'], // файл для настройки Jest DOM матчеров
	},
})
