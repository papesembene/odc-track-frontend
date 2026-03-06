# Orange Digital Center Frontend

## Variables d'environnement

Le frontend depend de la variable suivante :

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Exemples :

```bash
# local
VITE_API_BASE_URL=http://localhost:3000/api/v1

# production
VITE_API_BASE_URL=https://api.mon-domaine.com/api/v1
```

Sans cette variable, l'application ne demarre pas.
