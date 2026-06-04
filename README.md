# Anami Edu

Anami Edu is a very basic static educational website for children. It includes
small browser games for:

- Basic addition practice
- English word recognition
- Zulu vocabulary matching
- Typing practice

## Preview locally

```bash
npm start
```

Then open <http://localhost:4173> in your browser.

## Test locally

```bash
npm test
```

## Launch with GitHub Pages

This repository includes a GitHub Actions workflow at
`.github/workflows/pages.yml` that tests the site on pull requests and deploys it
to GitHub Pages after changes are pushed to the `main` branch.

To launch it:

1. Push the repository to GitHub.
2. Open the repository settings in GitHub.
3. Go to **Pages**.
4. Set the source to **GitHub Actions**.
5. Push to `main` and wait for the **Test and deploy Anami Edu** workflow to
   finish.
