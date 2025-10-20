# FROM jekyll/minimal:pages

# # The following are the same as the base jekyll/jekyll image
# CMD ["jekyll", "--help"]
# ENTRYPOINT ["/usr/jekyll/bin/entrypoint"]
# WORKDIR /srv/jekyll
# VOLUME  /srv/jekyll
# EXPOSE 35729
# EXPOSE 4000

FROM ruby:3.2.8-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs npm

RUN gem install bundler -v 2.6.9

WORKDIR /srv/jekyll

COPY Gemfile* ./

RUN bundle install

COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--force_polling", "--livereload"]