### STEP 2

Guide d'utilisation de la CLI:

1. **Utilisez la version de Node.js spécifiée :**

   ```bash
   nvm use
   ```

2. **Installez les dépendances :**

   ```bash
   yarn install
   ```

3. **Compilez le projet :**

   ```bash
   yarn run build
   ```

4. **Assurez-vous que le PATH des binaires de Yarn est bien configuré :**

   ```bash
   export PATH="$PATH:$(yarn global bin)"
   ```

5. **Rendez le script exécutable :**

   ```bash
   chmod +x dist/UI/fleet.js
   ```

6. **Liez le package localement :**

   ```bash
   yarn link
   ```

7. **Activer les logs :**

   Pour activer les logs vous pouvez définir la variable d'env suivante :

   ```bash
   export ENABLE_ENHANCED_LOGS=true
   ```
