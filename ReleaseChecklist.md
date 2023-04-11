# Release Checklist

Before releasing a new version, make sure you follow these steps:
### Test the changes with your local project

### Update README.md
Make sure you update the information accordingly to your changes.

### Eslint
Run `eslint` and make sure there are no errors
```ssh
yarn eslint
```

### Prettier
Run `prettier` 
```ssh
yarn prettier
```

### Build
At this step, you know that your code is tested and formatted, so now you can run:
```ssh
yarn build
```

After creating a new build version, you should:
1. bump package version
2. create a pull request
3. ship it to `main`
4. go to `main` branch and run `npm publish`
5. after successfully publishing the new version, check if the new version is visible [here](https://www.npmjs.com/package/@aqua.xyz/identity-sdk)
6. if you are at this step, you only need to make the announcement that the new version is ready to be integrated and briefly write some release notes.