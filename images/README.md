# Creating .webp images 

```
find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.tif' -o -iname '*.tiff' \) -print0 \
| while IFS= read -r -d '' f; do
  out="${f%.*}.webp"
  if [ ! -e "$out" ]; then
    magick "$f" -strip -quality 82 "$out"
    echo "created: $out"
  fi
done

```

This version will show what changes would be made: 

```
find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 \
| while IFS= read -r -d '' f; do
  out="${f%.*}.webp"
  [ -e "$out" ] || echo "$f -> $out"
done
```
