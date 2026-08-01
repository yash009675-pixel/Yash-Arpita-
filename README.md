# GitHub Pages upload guide

This folder is the cleaned, working version of the website. Upload **everything inside this folder** to the top level of your GitHub repository:

- `index.html`
- `story.html`
- `style.css`
- `script.js`
- `song.mp3`

Then commit the changes and wait a minute for GitHub Pages to redeploy. Open the site in an incognito/private tab or do a hard refresh (`Ctrl + F5`) to make sure the browser is not showing old files.

## What was fixed

- The JavaScript syntax error was removed.
- The page now points to the real supplied audio file: `song.mp3` (not the missing `music.mp3`).
- All old duplicated effects, repeated listeners, and incomplete elements were replaced by one clean implementation.
- References to missing `photo4.jpg`, `photo5.jpg`, and `photo6.jpg` were removed.
- The site now works without requiring any image files, so it has no broken-image errors.
- `index.html` and `story.html` load the JavaScript only once, at the correct point in the page.

## Adding personal photos later (optional)

The repaired version uses designed memory cards so it works immediately. To add a real photograph to a card, replace one card's content in `story.html` with this:

```html
<img class="gallery-photo" src="photo1.jpg" alt="Yash and Arpita">
```

Then add this CSS at the end of `style.css`:

```css
.gallery-photo {
  width: 100%;
  height: 270px;
  display: block;
  object-fit: cover;
  border-radius: 22px;
}
```

Upload a real image named exactly `photo1.jpg` in the same folder. GitHub Pages is case-sensitive, so `Photo1.jpg` is different from `photo1.jpg`.
