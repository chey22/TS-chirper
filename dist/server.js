/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/routes/chirps.ts":
/*!*************************************!*\
  !*** ./src/server/routes/chirps.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar chirpstore_1 = __webpack_require__(/*! ../utils/chirpstore */ \"./src/server/utils/chirpstore.js\");\r\nvar router = express_1.Router();\r\n// GET /api/chirps\r\nrouter.get(\"/\", function (req, res) {\r\n    var data = chirpstore_1.default.GetChirps();\r\n    var chirps = Object.keys(data).map(function (key) {\r\n        // data structure manipulation - object of objects converted to an array of objects\r\n        // Object.keys returns an array of the keys of an object, i.e. the properties of the chirps.json object of objects. Change the res.json(data) to res.json(chirps). The keys are the ids\r\n        // .map through that array of values to create a new array of object literals\r\n        return {\r\n            id: key,\r\n            username: data[key].username,\r\n            message: data[key].message // in the data object at position key should have an object with a property of .message\r\n        };\r\n    });\r\n    chirps.pop(); // removes the element id: \"nextid\" (at the end) from the array\r\n    res.json(chirps);\r\n});\r\n// GET /api/chirps/:chirpid\r\nrouter.get(\"/:chirpid\", function (req, res) {\r\n    var chirpid = req.params.chirpid;\r\n    var chirp = chirpstore_1.default.GetChirp(chirpid);\r\n    res.json(__assign({ id: chirpid }, chirp)); // instead of A) modifying the interface of IChirp to make id an optional prop or B) or making a secondary one with just username and msg, we need to C) change the server to make sure its response does match a singular IChirp by changing the {chirp} object to { id: chirpid, ...chirp }.\r\n    // This includes A) a property of id plus B) properties of the original response to be spread out as properties of this new object by use of a spread operator. It now matches the IChirp interface so that there's nothing to change on the front end :)\r\n});\r\n// POST /api/chirps\r\nrouter.post(\"/\", function (req, res) {\r\n    var chirp = req.body;\r\n    chirpstore_1.default.CreateChirp(chirp);\r\n    res.status(201).json(\"Chirp Created\");\r\n    // { username: '', message: ''}\r\n});\r\n// PUT /api/chirps/:chirpid\r\nrouter.put(\"/:chirpid\", function (req, res) {\r\n    var chirpid = req.params.chirpid;\r\n    var chirp = req.body;\r\n    chirpstore_1.default.UpdateChirp(chirpid, chirp);\r\n    res.status(201).json(\"Chirp \" + chirpid + \" Updated\");\r\n});\r\n// DELETE /api/chirps/:chirpid\r\nrouter.delete(\"/:chirpid\", function (req, res) {\r\n    var chirpid = req.params.chirpid;\r\n    chirpstore_1.default.DeleteChirp(chirpid);\r\n    res.status(201).json(\"Chirp \" + chirpid + \" Deleted\");\r\n});\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes/chirps.ts?");

/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar chirps_1 = __webpack_require__(/*! ./chirps */ \"./src/server/routes/chirps.ts\");\r\nvar router = express_1.Router();\r\nrouter.use('/chirps', chirps_1.default);\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes/index.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes/index.ts\");\r\nvar app = express();\r\napp.use(express.static('public'));\r\n//this is the body parser middleware that parses the JSON content that's POSTed to the API and creates the req.body and passes it along to POST req\r\napp.use(express.json());\r\n//middleware router from apiRouter out of routes\r\napp.use('/api', routes_1.default);\r\n// JS code handles some routes on front end that are serparate from routes on the back end\r\napp.get('*', function (req, res) {\r\n    res.sendFile(path.join(__dirname, '../public/index.html')); // file to send is index.html. When the code compiles, it does not run from server.ts. Instead it runs from dist/server.js. So go up out of dist one time into public and send the index.html file manually which has React code attached to it and have react-router-dom kick on.\r\n});\r\nvar port = process.env.PORT || 3000;\r\napp.listen(port, function () { return console.log(\"Server listening on port: \" + port); });\r\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "./src/server/utils/chirpstore.js":
/*!****************************************!*\
  !*** ./src/server/utils/chirpstore.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// pulls in file system opject\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\n\r\n// creates default chirps list to keep track of all chirps\r\nlet chirps = { nextid: 0 };\r\n\r\n// when this file runs, \"exists\" checks if there is already file chirps.json file\r\nif (fs.existsSync(\"chirps.json\")) {\r\n  chirps = JSON.parse(fs.readFileSync(\"chirps.json\")); // if yes, need to read that file in & set chirps = what's in that file rather than the default state^\r\n}\r\n\r\n// use methods from routes\r\n// Doesn't pass in anything and returns all of the chirps\r\nlet getChirps = () => {\r\n  // creates a COPY and return it so that whoever gets it can't manipulate the chirps without calling another method\r\n  return Object.assign({}, chirps);\r\n};\r\n\r\n// passes an id to getChirp\r\nlet getChirp = id => {\r\n  // creates a copy of that one particular chirp and returns it\r\n  return Object.assign({}, chirps[id]);\r\n};\r\n\r\n// passes in a chirp; lets you access properties on an object kind of like an array even though it's an object\r\nlet createChirp = chirp => {\r\n  // creates the nextID in the chirps object (default was 0 so this increments by 1 each time)\r\n  chirps[chirps.nextid++] = chirp;\r\n  // function below writes it out\r\n  writeChirps();\r\n};\r\n\r\n// pass in id & the chirp\r\nlet updateChirp = (id, chirp) => {\r\n  // updates that one particular chirp\r\n  chirps[id] = chirp;\r\n  // function below write out that updated chirp\r\n  writeChirps();\r\n};\r\n\r\n// pass in id\r\nlet deleteChirp = id => {\r\n  // calls delete on that one particular id\r\n  delete chirps[id];\r\n  // function below writes out the changes\r\n  writeChirps();\r\n};\r\n\r\nlet writeChirps = () => {\r\n  // does a writeFileSync on chirps.json and the data that it writes is the chirps (must be stringified)\r\n  fs.writeFileSync(\"chirps.json\", JSON.stringify(chirps));\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  CreateChirp: createChirp,\r\n  DeleteChirp: deleteChirp,\r\n  GetChirps: getChirps,\r\n  GetChirp: getChirp,\r\n  UpdateChirp: updateChirp\r\n});\r\n\n\n//# sourceURL=webpack:///./src/server/utils/chirpstore.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });