import { fetchApplications } from './../services/api';
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getApplications: () => Promise<any>
    }
  }
}
