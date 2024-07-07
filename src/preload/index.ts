import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { PipeMessage } from '../common/pipemessage'

// Custom APIs for renderer
const api = {
  getApplications: () => ipcRenderer.invoke('get-applications'),
  onPipeMessage: (callback: (message: string) => void) => ipcRenderer.on('pipe-message', (_, message) => callback(message)),
  onUpdateText: (callback: (message: PipeMessage) => void) => 
    ipcRenderer.on('update-text', (_, message) => callback(message)),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
