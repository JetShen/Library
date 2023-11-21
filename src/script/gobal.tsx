import { invoke } from '@tauri-apps/api/tauri';

export const currenPath = invoke('currentpath');