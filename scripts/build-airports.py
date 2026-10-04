import csv
import json
import os

src = os.path.join(os.environ["TEMP"], "airports-src")
countries = {}
with open(os.path.join(src, "countries.csv"), newline="", encoding="utf-8") as handle:
    for row in csv.DictReader(handle):
        countries[row["code"]] = row["name"]

airports = []
seen = set()
with open(os.path.join(src, "airports.csv"), newline="", encoding="utf-8") as handle:
    for row in csv.DictReader(handle):
        if row["type"] not in {"large_airport", "medium_airport", "small_airport"}:
            continue
        code = (row.get("iata_code") or "").strip().upper()
        if len(code) != 3 or not code.isalpha() or code in seen:
            continue
        seen.add(code)
        name = (row.get("name") or "").strip()
        city = (row.get("municipality") or "").strip()
        country = countries.get(row.get("iso_country") or "", row.get("iso_country") or "")
        if not name:
            continue
        rank = {"large_airport": 0, "medium_airport": 1, "small_airport": 2}[row["type"]]
        airports.append([code, name, city, country, rank])

airports.sort(key=lambda item: (item[3], item[2], item[1]))
out = os.path.join(os.path.dirname(__file__), "..", "client", "public", "airports.json")
with open(out, "w", encoding="utf-8") as handle:
    json.dump(airports, handle, ensure_ascii=False, separators=(",", ":"))
print(len(airports), os.path.getsize(out))
