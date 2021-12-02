#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e
# 建立輸出檔案
npm run build

# 移動至到打包後的dist目錄 
cd dist
cp index.html 404.html

# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init 
git add -A
git commit -m 'deploy'
git branch -m master main

# 將 dist資料夾中的內容推送至遠端 的 gh-pages分支中，並強制取代
git push -f https://github.com/katievin/lottery.git main:gh-pages
cd -

# 執行指令，在終端機輸入 deploy.sh