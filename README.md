## Hack Austin 2017
We'll need to describe the project here.

## Launching a development environment
1. Run `yarn` to install dependencies
2. Add the /config directory to root
3. Add a `tokens.js` file to config. It should look like this:
```
const MAPBOX_ACCESS_TOKEN = 'Your token here'

module.exports = {
  MAPBOX_ACCESS_TOKEN
}

```
3. Run `yarn run dev`
4. Open `localhost:3000`
5. Profit
