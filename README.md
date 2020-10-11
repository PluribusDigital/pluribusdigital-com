# HamsterCo Web Site

## Creating Content

Add folders and files within the `pages` folder.

Note, pages must have the "YAML front-matter" data at the top of the page. It sounds complicated, but copy/paste an existing page to start. The YAML looks like:

```bash
---
layout: page  # Which page layout to use
title: About  # Title to display (e.g. in navigation link)
permalink: /about/ # Customize how the URL will look
---

... the actual content ...

```

## Running Locally

Content can be edited directly in GitHub. To do more complex work such as changing templates, styles, etc. you can run locally on the desktop.

### Running With Docker

Make sure [Docker is installed](https://www.docker.com/products/docker-desktop).

```bash
docker-compose up
```

The app should now be available at: http://localhost:4000/

_Note: if you set the `baseurl` in `_config.yml`, the home page will be at that path, e.g http://localhost:4000/hamster/ ._

If you change config, you must restart.

### Running Without Docker

See [jekyll docs](https://jekyllrb.com/) for more detail, but the TLDR is:

* [Install ruby](https://www.ruby-lang.org/en/documentation/installation/) if not present
* `gem install jekyll bundler`
* `bundle install`
* `bundle install jekyll serve -l --watch`


## CSS

To trim unused CSS, we can use purgecss. This allows us to only serve up the css classes that are really needed. This looks at the file in the `css/vendor/` directory, then writes a version into `css/build` that only includes css classess actually used in the code.

```bash
bash purgecss.sh
```

Reference the appropriate file in `_includes/template_meta.html`, using the `css/vendor` or `css/build` path. If you are actively playing with styles, use the file in `vendor/` and then switch back when done.

```html
<link
  href="{{site.baseurl}}css/vendor/bootstrap.min.css"
  rel="stylesheet"
/>
```

### Purgecss install

* Install/use node `12.18.x` (simply `nvm use` if running nvm)
* Install purgecss `npm i -g purgecss`
