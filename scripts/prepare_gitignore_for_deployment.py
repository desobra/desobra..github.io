contents = """".sass-cache/
.jekyll-cache/
.jekyll-metadata
.idea"""

with open('.gitignore', "w") as text_file:
    text_file.write(contents)
