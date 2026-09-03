# Vercel deployment

1. Push the contents of this repository to GitHub.
2. In Vercel, import the GitHub repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. No environment variables are required for the standalone game.
## 歷史排行榜（跨裝置）

排行榜使用 Vercel Blob 保存歷史前 12 名。部署此版本後，請在 Vercel 專案的 Storage 建立一個 Blob Store，並將它連接到此專案，讓 Vercel 自動提供 `BLOB_READ_WRITE_TOKEN`。未連接 Blob 時，遊戲會自動退回瀏覽器本機排行榜，不會影響遊戲本身。

