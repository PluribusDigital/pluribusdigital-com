echo 'starting...' \
gem install bundler 
bundle update 
bundle install 
bundle exec jekyll serve --watch --force_polling --livereload 
