# Require any additional compass plugins here.
#require 'animation' # not need anymore (compass 1.0.16 ~)
require 'susy' # Susy was built to be part of the Compass ecosystem.
require 'breakpoint' # Help with writing media queries.

# Set this to the root of your project when deployed:
http_path = "/"
http_images_path = "../images"
http_generated_images_path = "../images"
css_dir = ".tmp/styles"
sass_dir = "public-resources/styles/sass"
images_dir = "public-resources/images"
javascripts_dir = "public-resources/scripts"

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compressed # or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Enable CSS source maps
sourcemap = false

# Disable asset cash buster
asset_cache_buster :none
