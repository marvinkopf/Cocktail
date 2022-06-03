### Datenbank vorbereiten

IP des DB-Docker containers herausfinden
```bash
docker inspect -f \'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
```

Zugang zur Datenbank (IP mit zuvor herausgefundener IP ersetzen)
```bash
mysql -h IP -u mariadb -p mariadb
```

Folgende Sql-Queries ausführen um die Tabellen zu säubern und den Tabellen-Index auf 1 zurückzustellen (Reihenfolge wichtig, main_rezept_zutat muss zuerst gelöscht werden)
```sql
DELETE FROM main_rezept_zutat;
DELETE FROM main_rezept;
DELETE FROM main_zutat;
ALTER TABLE main_rezept AUTO_INCREMENT = 1;
ALTER TABLE main_zutat AUTO_INCREMENT = 1;
```

Über manage.py den Befehl populatedb ausführen um die Datenbank mit Einträgen zu füttern 
```bash
docker-compose run --rm web python manage.py populatedb
```

Falls ihr den Befehl ein zweites mal ausführen solltet, wird der Table index nicht zurückgesetzt!

### Api Endpunkte
`/api/rezept/`            -> alle Einträge einsehen/bearbeiten
`/api/rezept/$(id)`             -> Cocktail detail
`/api/rezepte/?search=$(name)`  -> suche nach Cocktail 'name'
`/api/rezepte/?sort=random&limit=$(limit)` -> randomisierte Liste, abhängig von Anzahl 'limit'

