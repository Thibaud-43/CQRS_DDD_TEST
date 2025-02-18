# FizzBuzz

Ce projet implémente l'algorithme classique de FizzBuzz en TypeScript.

## Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [Yarn](https://yarnpkg.com/) installés sur votre machine.

1. Installez les dépendances :
   ```sh
   yarn install
   ```

## Utilisation

Exécutez la commande suivante pour lancer FizzBuzz avec un nombre `N` :

```sh
yarn run --silent fizzBuzz <N>
```

Exemple :

```sh
yarn run --silent fizzBuzz 15
```

### Résultat attendu

Si vous exécutez `yarn run --silent fizzBuzz 15`, vous verrez la sortie suivante :

```sh
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

## Tests

Pour exécuter les tests, utilisez :

```sh
yarn run test
```

Cela exécutera les tests avec Jest pour vérifier le bon fonctionnement de l'algorithme.

## Structure du projet

```
./src/
   lib/         # Fonctions utilitaires pouvant être utilisées dans d'autres domaines.
   *.ts         # Implémentation de fizzBuzz
```

## Améliorations possibles

- Tester les fonctions de la lib
