# Flatirons Brokerage — Site Content

This repository holds the **editable content** for
[flatironsbrokerage.com](https://www.flatironsbrokerage.com). Every piece of
content shown on the site — broker bios, blog posts, listings, testimonials,
the featured property — lives here as a plain `.txt` file. Edit, add, or delete
files in this repo and the website updates automatically within a few minutes.

> The website source code lives in a separate repository.
> This repo is **content only** — designed to be safe to edit through the
> GitHub web UI without touching any code.

---

## Folder layout

```
Team/                       ← One file per team member (brokers, staff, etc.)
Blog/                       ← One file per blog post
Listings/
  Active/                   ← Homes currently for sale
  UnderContract/            ← Homes in contract
  Sold/                     ← Recent closings
Testimonials/               ← One file per client testimonial
Featured Property/          ← The home highlighted on the home page
```

Files inside a folder are sorted alphabetically. Prefix file names with
`01-`, `02-`, etc. to control the display order — or set an `Order: N` field
inside the file for finer control.

---

## File format (in plain English)

Every file is a regular text file with this shape:

```
# Lines starting with a hash are comments and ignored.

Key: Value
AnotherKey: Another value
Photo: /images/source/joni_2_small.jpg

---

Optional body text goes below the line with three dashes.

Blank lines start a new paragraph.
```

The rules:

1. **One field per line** — `Key: Value`. Spaces around the colon are fine.
   Keys are case-insensitive (`Name`, `name`, `NAME` all work).
2. **Comments** start with `#` and are ignored.
3. **Repeating a key turns it into a list.** Three `Highlight: ...` lines
   become a three-item list on the site.
4. **Three dashes (`---`)** on their own line separate the metadata above
   from the free-form body below. The body is optional.
5. **Blank lines in the body** start a new paragraph.
6. **Images** that start with `/images/...` are loaded from the website's
   built-in image library. Values that start with `http` are loaded directly
   from that URL.

---

## What each folder expects

### `Team/` — team member profiles (brokers, staff, etc.)

```
Name: Joni Renee Zalk
Title: Founder & Real Estate Broker
Email: joni@flatironsbrokerage.com
Photo: /images/source/joni_2_small.jpg
Order: 1

---

A short biographical paragraph.

A second paragraph.
```

### `Blog/` — blog posts

```
Title: Boulder Market Outlook
Category: Market Notes
Date: June 2026
ReadMinutes: 6
Image: /images/source/flatirons_hero_bg.jpg
Excerpt: A short summary that appears on the blog listing page.
Order: 1
```

### `Listings/Active/`, `Listings/UnderContract/`, `Listings/Sold/`

```
Address: 4725 Mesa Ridge Lane
City: Boulder
State: CO
Zip: 80302
Beds: 4
Baths: 3.5
SquareFeet: 3,856
Image: /images/source/beautiful-shot-modern-house-kitchen.jpg
Alt: Bright kitchen with white cabinets and skylights
Order: 1

---

A short blurb shown on the property card.
```

### `Testimonials/`

```
Author: Stephanie Sexton
Detail: 525 S 43rd Street, Boulder
Order: 1

---

The testimonial quote goes here. Use blank lines for paragraph breaks
if it's long.
```

### `Featured Property/`

Only one file is read from this folder (the first alphabetically). It looks
like a listing file but adds a status, separate full/half bath counts, and
a list of highlights:

```
Address: 4725 Mesa Ridge Lane
City: Boulder
State: CO
Zip: 80302
Status: Featured Listing
Beds: 4
BathsFull: 3
BathsHalf: 1
SquareFeet: 3,856
Image: /images/featured-property.png

Highlight: Vaulted ceilings & open-concept main level
Highlight: Gourmet kitchen with quartz countertops
Highlight: Primary suite with spa-style bath and walk-in closet
Highlight: Private patio, landscaped backyard, built-in fire pit

---

The full property description goes here, paragraph by paragraph.
```

---

## How to edit, add, or remove content on GitHub

1. From the repo home page, click into the folder you want to change
   (e.g. `Listings/Active`).
2. **To edit a file:** click its name, then click the pencil icon in the top
   right. Make your changes, scroll down, and click **Commit changes**.
3. **To add a file:** click **Add file → Create new file**. Name it
   something like `silver-creek.txt`, paste the format above, fill in the
   fields, and commit.
4. **To remove a file:** open it, click the trash-can icon, and commit.

The website re-checks this repo every few minutes, so your changes will
appear shortly after committing. (Hard-refresh the page if you want to see
them right away.)
