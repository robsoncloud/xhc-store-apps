import { PipeMessage } from './../common/pipemessage';
import { fetchApplications } from './../services/api';
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getApplications: () => Promise<any>,
      onPipeMessage: (callback: (message: string) => void) => void
      onUpdateText: (callback: (message: PipeMessage) => void) => void
    }
  }
}
