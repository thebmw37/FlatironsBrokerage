# Flatirons Brokerage — Site Content

This folder is the **source of truth** for the content shown on
[flatironsbrokerage.com](https://flatironsbrokerage.com). It is designed to be
edited by hand on GitHub: each `.txt` file represents one piece of content
(a broker bio, a blog post, a listing, a testimonial, etc.). Add, edit, or
delete files here and the website will update automatically.

> **Where this lives in production:** an exact copy of this folder lives at the
> root of the [`thebmw37/FlatironsBrokerage`](https://github.com/thebmw37/FlatironsBrokerage)
> GitHub repo. The website pulls from that repo at runtime. The copy that ships
> with the website code is used as a fallback if GitHub is unreachable.

---

## Folder layout

```
content/
  Brokers/                  ← One file per broker (e.g. joni.txt)
  Blog/                     ← One file per blog post (e.g. boulder-market-outlook.txt)
  Listings/
    Active/                 ← One file per active listing
    UnderContract/          ← One file per under-contract listing
    Sold/                   ← One file per sold listing
  Testimonials/             ← One file per testimonial (e.g. stephanie-sexton.txt)
  Featured Property/        ← One file (the property to highlight on the home page)
```

You can add new files freely. The file **name** controls the order alphabetically
(use a numeric prefix like `01-`, `02-` if you want a specific order), and an
optional `Order:` field inside the file gives you a finer control.

---

## File format

Every file is a plain text file with this shape:

```
# Comments start with a hash and are ignored.

Key: Value
AnotherKey: Another value
Photo: /images/source/joni_2_small.jpg

---

Optional body text goes after the line with three dashes.

Blank lines start a new paragraph.

You can write as many paragraphs as you want here.
```

Rules in plain English:

1. **One field per line** in the format `Key: Value`. Whitespace around the
   colon is fine. Keys are case-insensitive (`Name`, `name`, `NAME` all work).
2. **Comments** start with `#` and are ignored.
3. **Repeating a key turns it into a list.** For example, three
   `Highlight: ...` lines become a bulleted list on the site.
4. **Three dashes (`---`) on their own line** separate the metadata above
   from the free-form body below. The body is optional.
5. **Blank lines in the body** start a new paragraph.
6. **Images:** values that start with `/images/...` are loaded from the
   website's image library. Values that start with `http` are loaded
   directly from that URL.

---

## What each folder expects

### `Brokers/` — Broker bios

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

### `Blog/` — Blog posts

```
Title: Boulder Market Outlook
Category: Market Notes
Date: June 2026
ReadMinutes: 6
Image: /images/source/flatirons_hero_bg.jpg
Excerpt: Inventory is finally loosening along the Front Range...
Order: 1

---

(Optional full post body, paragraph by paragraph.)
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

Modern luxury meets timeless elegance. Vaulted ceilings, gourmet
kitchen with quartz, primary suite with spa bath, and a private
patio with built-in fire pit.
```

### `Testimonials/`

```
Author: Stephanie Sexton
Detail: 525 S 43rd Street, Boulder
Order: 1

---

Joni was wonderful. She was persistent with advertising and
marketing and imperative at the closing as we were out of town
and could not manage the transfer from renters to buyers.
```

### `Featured Property/`

Only one file is read from this folder (the first alphabetically). It looks
like a listing file but adds a few extra fields:

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

This stunning 3,856 SF home offers 4 bedrooms, 3 full baths, and
1 half bath, blending modern luxury with timeless elegance...
```

---

## Editing on GitHub

1. Go to
   [github.com/thebmw37/FlatironsBrokerage](https://github.com/thebmw37/FlatironsBrokerage).
2. Click into the folder you want to edit (e.g. `Listings/Active`).
3. To **edit** a listing: click the file → click the pencil icon → make your
   changes → click **Commit changes**.
4. To **add** a listing: click **Add file → Create new file** → name it
   something like `silver-creek.txt` → paste the format above → fill it in →
   commit.
5. To **remove** a listing: click the file → click the trash icon → commit.

The website refreshes its content every few minutes, so changes will appear
shortly after committing. (Hard-refresh the page if you want to see them
immediately.)
