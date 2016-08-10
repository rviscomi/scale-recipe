echo "(function() {" > recipe.js
cat src/base.js src/recipe.js src/number.js src/ingredient.js >> recipe.js
echo "})();" >> recipe.js