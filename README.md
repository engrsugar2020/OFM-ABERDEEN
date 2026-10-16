# Omega Fire Ministries Aberdeen — Power House

Static website (HTML, CSS, JavaScript). No build step needed.

## Pages
- `index.html` Home
- `about.html` About Us
- `activities.html` Weekly Activities
- `gallery.html` Photo Gallery
- `give.html` Donations & Offerings
- `contact.html` Contact
- `404.html` Page not found

## Editing
- Text lives directly in each `.html` file.
- Styles: `assets/css/style.css`. Colours are set at the top under `:root`.
- Photos: `assets/img/`. Replace a photo by uploading a new file with the same name.
- The chat assistant's answers are in `assets/js/main.js` (search for `answers`).

## Hosting on GitHub Pages
1. Upload these files to the root of a GitHub repository.
2. Repository → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Under "Custom domain" enter your domain `www.ofmaberdeen.co.uk` and tick "Enforce HTTPS" once it is available.

## GoDaddy DNS records
In GoDaddy → My Products → Domain → DNS, add:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
| CNAME | www  | engrsugar2020.github.io |

Remove any existing GoDaddy "Parked" A record for `@` first. DNS changes can take up to 24 hours.
