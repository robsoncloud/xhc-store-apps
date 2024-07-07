import { ActionType, PipeMessage } from './../common/pipemessage';
import { getApplications } from './../services/api';
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as net from 'net';

const PIPE_NAME = '\\\\.\\pipe\\MyElectronApp';
let mainWindow: BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
      
  })
})


ipcMain.handle('get-applications', async () => {
  return await getApplications()
})

app.on('ready', () => {
  createNamedPipeServer();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


function createNamedPipeServer() {
  
      
const server = net.createServer((stream) => {
  console.log('Client connected');
  stream.on('data', (data) => {

    try {
      
       const response = processMessage(JSON.parse(data.toString()));
       sendResponse(stream, response);
      
    }catch(err) {
      console.error('Error parsing message:', err);
    }
      
  });

  stream.on('end', () => {
      console.log('Client disconnected');
  });
});

server.on('error', (err) => {
  console.error('Named pipe server error:', err);
});

server.listen(PIPE_NAME, () => {
  console.log(`Named pipe server listening on ${PIPE_NAME}`);
});
}

interface PipeResponse {
  Id: string;
  Success: boolean;
  Message: string;
}

function processMessage(message: PipeMessage): PipeResponse {
  console.log('Received message:', message);
  let success = true;
  let responseMessage = '';

  try {
      switch (message.Action) {
          case ActionType.SendText:
              console.log('Sending text:', message);
              if (mainWindow) {
                  mainWindow.webContents.send('update-text', message);
              }
              responseMessage = 'Text sent to UI';
              break;
          case ActionType.ShowTrayIcon:
              console.log('Showing tray icon');
              // Implement show tray icon logic
              responseMessage = 'Tray icon shown';
              break;
          case ActionType.HideTrayIcon:
              console.log('Hiding tray icon');
              // Implement hide tray icon logic
              responseMessage = 'Tray icon hidden';
              break;
          case ActionType.DisableButton:
              console.log('Disabling button, status:', message.Status);
              if (mainWindow) {
                  mainWindow.webContents.send('disable-button', message.Status);
              }
              responseMessage = `Button ${message.Status ? 'disabled' : 'enabled'}`;
              break;
          case ActionType.FinishTask:
              console.log('Finishing task');
              // Implement finish task logic
              responseMessage = 'Task finished';
              break;
          default:
              console.log('Unknown action type');
              success = false;
              responseMessage = 'Unknown action type';
      }
  } catch (error) {
      success = false;
      responseMessage = `Error: ${error.message}`;
  }

  return {
      Id: message.Id,
      Success: success,
      Message: responseMessage
  };
}

function sendResponse(stream: net.Socket, response: PipeResponse) {
  const jsonResponse = JSON.stringify(response) + '\n';
  stream.write(jsonResponse);
}



