contents = """".sass-cache/
.jekyll-cache/
.jekyll-metadata
Gemfile.lock
.idea"""

with open('.gitignore', "w") as text_file:
    text_file.write(contents)
