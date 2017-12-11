![Interface, inspired by Samaritan](https://i.imgur.com/iObhRaX.png)
## Austin Census Block Explorer
This is an interface built using Mapbox to display census blocks, and explore their metadata. Future iterations might also display data layers on top of those census blocks, as well as controls for the visualization.

This project was built with Peter Weyland, Dave Thompson, and Alex Price at the 2017 Hack Austin hackathon, in Austin, Texas.

You can read about the background and process we took to building this [on Medium](https://medium.com/@alexpriceco/hack-austin-2017-659dce5cd9a).

## Launching a development environment
1. Run `yarn` to install dependencies
2. Add the /config directory to root
3. Add a `tokens.js` file to `/config`. It should look like this:

```js
const MAPBOX_ACCESS_TOKEN = 'Your token here'
// Create a token at mapbox.com/studio/account/tokens

module.exports = {
  MAPBOX_ACCESS_TOKEN
}
```
3. Run `yarn run dev`
4. Open `localhost:3000`
5. _???_
6. Profit


## Uploading your own data
1. Create a [Mapbox account](https://www.mapbox.com/signup/?referrer=github)
2. Upload the ShapeFile from the `/data` directory as a Tileset in Mapbox. [Here's a link.](https://www.mapbox.com/studio/tilesets/)
3. Generate an access token [here](https://www.mapbox.com/studio/account/tokens/).
4. You'll need to change some references in `/components/map/index.js`, as the current example uses census block groups for Austin, off of my account.
