# @neos21/simple-notify : Simple Notify

[![NPM Version](https://img.shields.io/npm/v/@neos21/simple-notify.svg)](https://www.npmjs.com/package/@neos21/simple-notify) [![GPR Version](https://img.shields.io/github/package-json/v/neos21/simple-notify?label=github)](https://github.com/Neos21/simple-notify/packages/__ID__)

デスクトップ通知を発信するコマンドラインツール。Windows・MacOS・Linux に対応。


## How To Use

```bash
$ npm install -g @neos21/simple-notify
$ simple-notify 'My Message'
```

- Windows : PowerShell より `ToastNotification` を実行する
    - Command Prompt・PowerShell・GitBash・WSL からの呼び出しを検証済
- MacOS : AppleScript より `display notification` を実行する
- Linux : `notify-send` コマンドを実行する (Ubuntu 環境などであればプリインストールされている)


## Links

- [Neo's World](https://neos21.net/)
- [GitHub - Neos21](https://github.com/Neos21/)
- [GitHub - simple-notify](https://github.com/Neos21/simple-notify)
- [npm - @neos21/simple-notify](https://www.npmjs.com/package/@neos21/simple-notify)
