// src/stores/themeStore.js
import { writable } from 'svelte/store';

// Create a writable store for the isDark variable
export const isDark = writable(false);
