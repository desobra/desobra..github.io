import yaml
import os
from os import listdir
from os.path import isfile, join
import shutil
from itertools import cycle, islice
from datetime import datetime, timedelta


def clear_previous_generated_folder(path):
    if os.path.isdir(path):
        shutil.rmtree(path)
    os.mkdir(path)


root_data = '_data'
path_authors = 'authors'
path_titles = '_titles'
path_posts = '_posts'

clear_previous_generated_folder(path_authors)
clear_previous_generated_folder(path_titles)
clear_previous_generated_folder(path_posts)


def is_title_ready_to_be_published(title):
    fragments = title['fragments'] if "fragments" in title else []
    any_fragment_released = any("publication-date" in fragment for fragment in fragments)
    return "publication-date" in title or any_fragment_released


def generate_author(author):
    id_author = author['id']
    author_name = author['name']
    author_image = author['image']
    os.mkdir(path_authors + '/' + id_author)
    contents = """---
title_page_full: """ + author_name + """  
title_author_image: """ + author_image + """ 
pagination:
  enabled: true
  category: """ + id_author + """
---"""
    with open(path_authors + '/' + id_author + '/paginated.html', "w") as text_file:
        text_file.write(contents.encode('ascii', 'ignore').decode('ascii'))


def generate_title_pages(author):
    if author['category'] == 'image':
        return

    titles = author['titles']
    for title in titles:
        if is_title_ready_to_be_published(title):
            id_title = title['id']
            contents = '---\ntitle_id: ' + id_title + '\n---'
            with open(path_titles + '/' + id_title + '.md', "w") as text_file:
                text_file.write(contents.encode('ascii', 'ignore').decode('ascii'))


def generate_post(title, author_category, author_id, only_first_fragment=False):
    if is_title_ready_to_be_published(title):
        id_title = title['id']
        fragments = title['fragments'] if "fragments" in title else []

        if not fragments:
            contents = """---
title_id: """ + id_title + """
categories: [""" + author_category + """, """ + author_id + """]
---"""
            file_post_name = path_posts + '/' + title[
                'publication-date'] + '-' + author_category + '-' + id_title + '.md'
            with open(file_post_name, "w") as text_file:
                text_file.write(contents.encode('ascii', 'ignore').decode('ascii'))
        else:
            if only_first_fragment:
                _fragments = fragments[0:1]
                _fragments[0]['publication-date'] = title['publication-date']
            else:
                _fragments = fragments
            for fragment in _fragments:
                if "publication-date" not in fragment:
                    continue
                fragment_number = fragment['number']
                contents = """---
title_id: """ + id_title + """
fragment: """ + fragment_number + """
categories: [""" + author_category + """, """ + author_id + """]
---"""
                file_post_name = path_posts + '/' + fragment[
                    'publication-date'] + '-' + author_category + '-' + id_title + '.md'
                with open(file_post_name, "w") as text_file:
                    text_file.write(contents.encode('ascii', 'ignore').decode('ascii'))


def generate_posts(author):
    author_id = author['id']
    author_category = author['category']
    titles = author['titles']

    for title in titles:
        generate_post(title, author_category, author_id)


def roundrobin(*iterables):
    "roundrobin('ABC', 'D', 'EF') --> A D E B F C"
    # Recipe credited to George Sakkis
    pending = len(iterables)
    nexts = cycle(iter(it).next for it in iterables)
    while pending:
        try:
            for next in nexts:
                yield next()
        except StopIteration:
            pending -= 1
            nexts = cycle(islice(nexts, pending))


file_names = [f for f in listdir(root_data) if isfile(join(root_data, f)) and f != ".DS_Store"]
contents = [open(root_data + '/' + file_name, 'r').read() for file_name in file_names]
authors = [yaml.load(content)[0] for content in contents]

for author in authors:
    generate_author(author)
    generate_title_pages(author)
    generate_posts(author)

they_titles = [f for f in listdir(path_posts) if "-they-" in f]
they_titles.sort(reverse=True)
they_titles = list(dict.fromkeys([f.split("-")[-1].replace('.md', '') for f in they_titles]))

our_titles = [f for f in listdir(path_posts) if "-we-" in f]
our_titles.sort(reverse=True)
our_titles = list(dict.fromkeys([f.split("-")[-1].replace('.md', '') for f in our_titles]))

all_home_titles = []

for i in range(len(they_titles)):
    all_home_titles.append(they_titles[i])
    if i < len(our_titles):
        all_home_titles.append(our_titles[i])

print(all_home_titles)
d = datetime.today()

for home_title in all_home_titles:
    for author in authors:
        for title in author['titles']:
            if title['id'] == home_title:
                title['publication-date'] = d.strftime('%Y-%m-%d')
                d = d - timedelta(days=1)
                generate_post(title, 'home', author['id'], only_first_fragment=True)
