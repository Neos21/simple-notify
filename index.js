#!/usr/bin/env node

const childProcess = require('child_process');
const os           = require('os');
const util         = require('util');

const execFileAsync = util.promisify(childProcess.execFile);

const detectOS = message => {
  // Windows (Command Prompt・PowerShell・GitBash or WSL) : Use PowerShell ToastNotification
  if(process.platform === 'win32' || (process.platform === 'linux' && os.release().toLowerCase().includes('microsoft'))) return {
    cmd : 'PowerShell.exe',
    args: [
      '$t=[Windows.UI.Notifications.ToastNotificationManager,Windows.UI.Notifications,ContentType=WindowsRuntime]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType,Windows.UI.Notifications,ContentType=WindowsRuntime]::ToastText01);',
      '$t.GetElementsByTagName("text").Item(0).InnerText="', message.replace((/"/g), '`"'), '";',
      '[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("Microsoft.Windows.Computer").Show($t);'
    ]
  };
  
  // MacOS : Use AppleScript
  if(process.platform === 'darwin') return {
    cmd : 'osascript',
    args: ['-e', '\'display notification "', message, '" with title "Notification"\'']
  };
  
  // Linux : Use notify-send
  if(process.platform === 'linux') return {
    cmd : 'notify-sensd',
    args: [message]
  };
  
  // Unsupported OS
  return { cmd: null, args: null };
}

// Main
(async () => {
  const message = process.argv.slice(2).join(' ') || 'Notification';
  
  const { cmd, args } = detectOS(message);
  if(!cmd || !args) {
    console.error('This is not a supported OS. Aborted');
    return process.exit(1);
  }
  
  try {
    const result = await execFileAsync(cmd, args);
    if(result.stderr) throw new Error(result.stderr);
  }
  catch(error) {
    console.error(error);
    return process.exit(1);
  }
})();
