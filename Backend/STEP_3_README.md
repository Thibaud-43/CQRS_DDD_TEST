### STEP 3

1. **For code quality, you can use some tools : which one and why (in a few words) ?**

   - Eslint
   - Typescript
   - Knip
   - Prettier
   - DepCheck
   - Husky

2. **Vous pouvez envisager de mettre en place un processus CI/CD : décrivez les actions nécessaires en quelques mots**

   - Vous trouverez un exemple de CI/CD dans le dossier .github/workflows à la racine de mon projet. Le workflow de CI/CD est déclenché à chaque push ou PR sur les branches main ou develop. Nous testons d'abord que le projet compile correctement, puis nous testons en parallèle nos outils de qualité de code et nos tests.
     Nous pourrions envisager d'ajouter plusieurs jobs :
     - des tests, par exemple des tests unitaires, E2E, des conditions de couverture de tests, etc.
     - de la sécurité (audit des packages, ...)
     - de la CD avec la création d'une image Docker.
     - de la CD avec l'exécution de toutes les migrations de données.
     - de la CD avec connexion au serveur distant pour mettre à jour l'application.

Il est important de bien stocker les clés secrètes dans GitHub et non dans le code pour tester la CI.
