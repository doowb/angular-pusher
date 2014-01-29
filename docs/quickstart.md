## Install
1. download the files
	1. Bower
		1. add `"{%= name %}": "latest"` to your `bower.json` file then run `bower install` OR run `bower install {%= name %}`
2. include the files in your app
	1. `{%= name %}.min.js`
3. include the module in angular (i.e. in `app.js`) - `doowb.{%= name %}`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.
