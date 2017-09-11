### About
This project aims to develop an admin panel for vehicle drop-off zones in a fleet management app and an API to enable this interface.

### Libraries, Frameworks, 3rd Party Tools used
- VueJS for the client framework
  - For other 3rd party, check: [client/package.json](https://github.com/omurturan/share-bike/blob/master/client/package.json)
  - I've used [vue-cli](https://github.com/vuejs/vue-cli) to create the empty Vue App with Webpack template
- NodeJS (with Express) for API
  - For other 3rd party, check: [server/package.json](https://github.com/omurturan/share-bike/blob/master/server/package.json)
- MongoDB for Database

### How to Run Locally
This project consists of a client app and an API app. You can find them in `client` and `server` directories.
- Make sure you have `mongodb`, `npm`, and `node` are installed
- `npm install` in both directories
- `npm start` in the parent directory. (it will trigger `npm start` in both directories)

### How to Use
At the moment, the UI is a fullscreen Google Maps. You can create a drop-off zone by simply defining its corners. In order to be able to save it, it should be a complete polygon. It means that its start point and endpoint should be the same point.

You can edit a drop-off zone by drag&drop to a new position. As you can understans, you can only change its position. It is *not* possible to change its size at the moment.

You can also delete a drop-off zone. Since the UI emulates an admin panel, no restrictions are applied.

Some sample calls to API:

An example curl request to create a drop-off zone

`POST/drop-off`
```
curl 'http://localhost:8081/drop-off' \
       -H 'Origin: http://localhost:8080' \
       -H 'Accept-Encoding: gzip, deflate, br' \
       -H 'Accept-Language: tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4' \
       -H 'Content-Type: application/json;charset=UTF-8' \
       -H 'Accept: application/json, text/plain, */*' \
       -H 'Referer: http://localhost:8080/' \
       -H 'DNT: 1' --data-binary '{"name":"test","coordinates":[{"lat":40.245991504199026,"lng":28.2568359375},{"lat":38.272688535980976,"lng":28.2568359375},{"lat":38.61687046392973,"lng":37.529296875},{"lat":41.60722821271717,"lng":36.650390625},{"lat":40.245991504199026,"lng":28.2568359375}]}' --compressed
```

An example curl request to check if you can drop your bike

`POST/end-reservation`
```
curl 'http://localhost:8081/end-reservation' \
       -H 'Origin: http://localhost:8080' \
       -H 'Accept-Encoding: gzip, deflate, br' \
       -H 'Accept-Language: tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4' \
       -H 'Content-Type: application/json;charset=UTF-8' \
       -H 'Accept: application/json, text/plain, */*' \
       -H 'Referer: http://localhost:8080/' \
       -H 'DNT: 1' --data-binary '{"lng":32.859742, "lat":39.933363 }' --compressed
```

### Further Improvements
The most interesting feature of this project is to be able to understand if users can drop their vehicle in their current positions. For this requirement, I tried to make use of [Geospatial Queries](https://docs.mongodb.com/manual/geospatial-queries/) feature of MongoDB. My initial plan was to create a `Polygon` for each drop-off zone and check if a specified location was within this `Polygon`.

This sounded okay when I first planned but because of my lack of technical ability to use `MongoDB`, I've failed this requirement for now. You can see my current attemp in `end-reservation` end-point. It returns an empty array every time I tried.

EDIT: See my current progress on this [development branch](https://github.com/omurturan/share-bike/pull/1)

### Conclusion
I enjoyed this challenge a lot, especially for the part that I've failed. However, I had 8 hours and this caused me to spend too much time for this specific requirement. I could've accepted this earlier and could have spent more time to create a nice and usable UI.
