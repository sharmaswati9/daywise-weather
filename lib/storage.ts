import type { Plan, Place } from './types';
const PLANS = 'daywise-plans-v1';
const SAVED = 'daywise-saved-v1';
export function readPlans(): Plan[] { if (typeof window === 'undefined') return []; try { return JSON.parse(localStorage.getItem(PLANS) || '[]'); } catch { return []; } }
export function writePlans(value: Plan[]) { localStorage.setItem(PLANS, JSON.stringify(value)); }
export function readSaved(): Place[] { if (typeof window === 'undefined') return []; try { return JSON.parse(localStorage.getItem(SAVED) || '[]'); } catch { return []; } }
export function writeSaved(value: Place[]) { localStorage.setItem(SAVED, JSON.stringify(value)); }
