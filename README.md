# PluribusDigital.com Public Web Site

## Contributing

* Create a branch (or a fork)
* Make your changes, commit to the branch
* Create a Pull Request (PR)

_Note: the `main` branch is protected and can only be updated via PR._

Once merged into the main branch, the updated production website will go live within about a minute.

## Creating Content

There are 3 types of content stored in different directories:

* `_content/*.md` (with underscore) holds complex top-level pages. These pages are built in sections (each file in the respective subfolder) in order to take advantage of different layouts for each section.

* `content/*.md` (without underscore) holds simple interior pages. The directory structure here will be mirrored in the path/URL to the rendered page.

* `/index.md` and `layouts/home.html` control the home page content.

* __Blog__ content lives in `_posts/` as regular Jekyll posts, rendered at `/posts`. Additional detail is in the below section.

### Easy vs. Hard Changes

Simple content updates, or even creating simple interior pages can be done with no HTML or Jekyll knowledge. 

For advanced contributers creating more complex changes and formatting, please keep in mind:
* Run the app locally to get a full preview of changes as rendered.
* See the CSS section to re-run the purge commands, which is particularly important if you want to make use of bootstrap CSS that is not yet in use on the site.

### Markdown Content Format

Content pages have the `.md` markdown file extension. This allows us to write simple content as markdown, but we can also mix in HTML if warranted.

Note, pages must have the "YAML front-matter" data at the top of the page. It sounds complicated, but copy/paste an existing page to start. The YAML looks like:

```bash
---
layout: interior # Which page layout to use
title: Benefits # Title to display (e.g. at top of page)
nav_highlight: join # The top nav link that should be highlighted, if applicable
permalink: join/benefits # Optionally supply an alternative path for the generated page
include_join_us: true
---

## My Subheading

Some example content followed by a:

* bulleted
* list

... more content...

```

## Running Locally

Content can be edited directly in GitHub. To do more complex work such as changing templates, styles, etc. you can run locally on the desktop.

### Running Without Docker

See [jekyll docs](https://jekyllrb.com/) for more detail, but the TLDR is:

* [Install ruby](https://www.ruby-lang.org/en/documentation/installation/) if not present
* `gem install jekyll bundler`
* `bundle install`
* `bundle install jekyll serve -l --watch`

We also have a convenience script to run the server:

```bash
bash start.sh
```

It is recommended that you use version managers for node and ruby - e.g. RVM, NVM, or
[rbenv](https://github.com/rbenv/rbenv).

_Note: this repo's `.ruby-version` pins Ruby to `3.1.x`. `github-pages`'s Jekyll/Liquid
dependencies break on Ruby 3.2+. If you hit build errors, especially on Apple Silicon Macs, see
[TROUBLESHOOTING.md](TROUBLESHOOTING.md) before digging further — or just use Docker below,
which sidesteps all of it._

### Running With Docker

Make sure [Docker is installed](https://www.docker.com/products/docker-desktop), then:

```bash
docker compose up --build
```

The container runs a Ruby version pinned to match `.ruby-version`/`Gemfile.lock`, so it should
always match what GitHub Pages actually builds. This is the easiest way to get a working local
build without setting up a native Ruby toolchain.

The app should now be available at: http://localhost:4000/

_Note: if you set the `baseurl` in `_config.yml`, the home page will be at that path, e.g http://localhost:4000/hamster/ ._

If you change config, you must restart.

## Styles & CSS

The site uses bootstrap 4.x as the baseline set of styles, and many of the built in utilities. See the [bootstrap docs](https://getbootstrap.com/docs/4.6/getting-started/introduction/) for general documentation on the bootstrap CSS classes. Other customizations are reflected in:

* `css/site.css` includes custom styles and overrides for our site.
* `css/greenhouse.css` is a central place to store the file (which we can upload to greenhouse) that has some styling overrides for greenhouse defaults. This is used in iframes for our job listings.

### Managing CSS

To trim unused CSS, we can use purgecss. This allows us to only serve up the css classes that are really needed. This looks at the file in the `css/vendor/` directory, then writes a version into `css/build` that only includes css classess actually used in the code.

```bash
bash prepcss.sh
```

Reference the appropriate file in `_includes/template_meta.html`, using the `css/vendor` or `css/build` path. If you are actively playing with styles, use the file in `vendor/` and then switch back when done.

```html
<link
  href="/css/vendor/bootstrap.min.css"
  rel="stylesheet"
/>
```

### Purgecss install

* Install/use node `12.18.x` (simply `nvm use` if running nvm)
* Install purgecss `npm i -g purgecss`

## Redirects

We can do a client-side redirect by using the redirect template. To do so put a simple markdown file in the `/redirects/` folder. See the file `/redirects/cio-sp3` for an example.

_An explanation of the approach is here: https://superdevresources.com/redirects-jekyll-github-pages/_


## Blog Content

Blog content lives in this repo as regular Jekyll posts — it's no longer hosted on Medium.

### Writing & Submitting a Post

1. Add a new file to `_posts/` named `YYYY-MM-DD-a-url-friendly-slug.md`, using today's date (or the date you want it to publish/sort under).
2. Add front matter and content:

    ```yaml
    ---
    title: "Your Post Title"
    author: Jane Doe
    excerpt: >-
      A sentence or two summarizing the post. Shows on the /posts listing page
      and in the RSS feed.
    ---

    Your post content, in Markdown, starts here.
    ```

    * `author` is a plain name. If it matches an entry in `_data/authors.yml`, the post byline
      will also show that author's title (and photo, if set). If there's no matching entry, the
      post still renders fine with just the name.
    * Use your own name for a technical how-to, an individual perspective, or anything else that
      reads as coming from you personally.
    * Use `Pluribus Digital` as the author for news announcements or posts with many
      contributors/no single individual voice — this is the equivalent of Medium's old "editors"
      account.
3. Run the site locally (see __Running Locally__ above) and confirm the post renders correctly at
   `/posts` and at its own URL.
4. Open a PR. Once merged, the post goes live at `https://pluribusdigital.com/posts/your-slug/`
   within about a minute, and appears in the `/posts` listing and `/feed.xml` RSS feed.

### Blog Conventions

* Keep writing tone and style consistent with the [brand voice](https://github.com/PluribusDigital/playbook/blob/main/branding/guide.md), with content that reflects well on the brand
* Target an appropriate length - generally working to trim length and get to the point - but varies by type of post (a technical article may be different than a news update)
* Include at least one image that can make a good "cover" image
* Include descriptive alt text for all images
* Make good use of headings and other techniques to make content readable and scannable

## Job Board Integration (Greenhouse)

Our job board is integrated in two places:

- **Lob List on Main JOIN US Page:** `_content/join/02_openings.md` pulls in the listing of current openings.
- **Openings Detail View:** `content/join/openings.md` is the page that houses the job detail, and is the path that greenhouse points to.

### Custom Styling for Greenhouse

Some style configuration can be done under the Greenhouse navigation of: Configure > Job boards & posts > Pluribus Digital.

## Web Analytics

We use [Google Analytics](https://analytics.google.com/) to gather site traffic data. Contact the helpdesk to be added as appropriate.

## Contact Us page
See here: https://www.tendenci.com/help-files/how-update-google-map-embedded-your-webpage/
