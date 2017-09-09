### About
This project aims to develop an admin panel for vehicle drop-off zones in a fleet management app and an API to enable this interface.

### Libraries, Frameworks, 3rd Party Tools used
- VueJS for the client framework
  - For other 3rd party, check: [client/package.json](https://github.com/omurturan/share-bike/blob/master/client/package.json)
- NodeJS (with Express) for API
  - For other 3rd party, check: [server/package.json](https://github.com/omurturan/share-bike/blob/master/server/package.json)
- MongoDB for Database

### How to Run Locally
This project consists of a client app and an API app. You can find them in `client` and `server` directories.
- Make sure you have `mongodb`, 'npm', and 'node' are installed
- `npm install` in both directories
- `npm start` in the parent directory. (it will trigger `npm start` in both directories)

### How to Use
At the moment, the UI is a fullscreen Google Maps. You can create a drop-off zone by simply defining its corners. In order to be able to save it, it should be a complete polygon. It means that its start point and endpoint should be the same point.

You can edit a drop-off zone by drag&drop to a new position. As you can understans, you can only change its position. It is *not* possible to change its size at the moment.

You can also delete a drop-off zone. Since the UI emulates an admin panel, no restrictions are applied.

### Further Improvements
The most interesting feature of this project is to be able to understand if users can drop their vehicle in their current positions. For this requirement, I tried to make use of [Geospatial Queries](https://docs.mongodb.com/manual/geospatial-queries/) feature of MongoDB. My initial plan was to create a `Polygon` for each drop-off zone and check if a specified location was within this `Polygon`.

This sounded okay when I first planned but because of my lack of technical ability to use `MongoDB`, I've failed this requirement for now. You can see my current attemp in `end-reservation` end-point. It returns an empty array every time I tried.

### Conclusion
I enjoyed this challenge a lot, especially for the part that I've failed. However, I had 8 hours and this caused me to spend too much time for this specific requirement. I could've accepted this earlier and could have spent more time to create a nice and usable UI.
