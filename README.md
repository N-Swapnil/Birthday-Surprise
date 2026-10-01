# Birthday Surprise — For Butuu ❤️

## What's new
- A **3-second “Butuu ❤️” opening animation** appears before the site.
- An **original romantic background melody** is generated directly in the browser. No paid music file is required.
- Music starts after she taps **Open Your Surprise 🎁**, because mobile browsers normally block audio autoplay.
- A **Music On / Music Off** button is available at the bottom-right.
- The final section launches a **full-screen fireworks surprise** with a birthday message when she reaches it.

## 1. Add your photos
Put your 10 photos here and name them exactly:

assets/photos/photo1.jpg
assets/photos/photo2.jpg
...
assets/photos/photo10.jpg

The current files are panda-themed placeholders. Replace them with your real photos while keeping the same filenames.

## 2. Optional real song
The site already has an original browser-generated romantic melody, so no song file is necessary.

If you prefer a real song, use a music file that you have permission to use and add it under `assets/music/`, then replace the Web Audio music code in `script.js` with an `<audio>` element. Keep in mind that mobile browsers require a user interaction before audio can start.

## 3. Test locally
Open `index.html` in a browser. For best results, use VS Code Live Server or another local static server.

## 4. Free deployment — GitHub Pages
1. Create a free GitHub account if you don't have one.
2. Create a public repository, e.g. `birthday-surprise`.
3. Upload all files/folders from this project.
4. Open repository Settings → Pages.
5. Select Deploy from branch → `main` → `/ (root)` → Save.
6. GitHub will provide your website URL.

## 5. Before sending
Test on her phone:
- 3-second opening animation
- Music starts after the surprise button
- Music toggle
- All 10 photos
- Letter reveal
- Scrolling
- Final fireworks
- Mobile layout

Then send her only the website link. ❤️
