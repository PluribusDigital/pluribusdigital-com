echo "...prepping CSS..." 
purgecss \
  --css css/vendor/bootstrap.min.css \
  --content **/*.html **/*.md \
  --output css/build 
echo "... CSS prepped ..."