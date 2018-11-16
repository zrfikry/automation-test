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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getComments, filterComments, render } = __webpack_require__(/*! ./app.modules */ \"./src/js/app.modules.js\")\n\nlet comments = []\nlet sort = \"id_asc\"\nlet keyword = \"\"\nlet page = 0\nlet perpage = 10\n\nconst sortBy = document.getElementById(\"sortBy\")\nconst searchElem = document.getElementById(\"search\")\n\nasync function init() {\n  comments = await getComments('http://jsonplaceholder.typicode.com/comments')\n  sortBy.addEventListener(\"change\", applyFilter)\n  searchElem.addEventListener(\"change\", applyFilter)\n  let data = filterComments(comments, keyword, sort, perpage)\n  render(data, { page, perpage })\n}\n\nconst applyFilter = (e) => {\n  const { value, name } = e.target\n  if (name === \"sortBy\") {\n    sort = value\n    if (value === \"\") {\n      sort = \"id_asc\"\n    }\n  } else {\n    keyword = value\n    page = 0\n  }\n  let data = filterComments(comments, keyword, sort, perpage)\n  render(data, { page, perpage })\n}\n\ndocument.onload = init()\n\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/app.modules.js":
/*!*******************************!*\
  !*** ./src/js/app.modules.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const toJson = (data) => {\n  return data.json()\n}\n\nconst getComments = async (url) => {\n  let result = []\n  await fetch(url)\n  .then((res) => toJson(res))\n  .then((data) => result = data)\n  .catch((err) => console.log(err))\n  return result\n}\n\nconst filterComments = (data = [], keyword, sort, perpage) => {\n  let sorted = sortComments(data, sort)\n  // search\n  if (keyword !== \"\") {\n    sorted = searchComments(sorted, keyword)\n  }\n  return paginateData(sorted, perpage)\n}\n\nconst sortComments = (data = [], sort) => {\n  let sorted = []\n  let sortKey = sort.split(\"_\")[0]\n  let az = sort.split(\"_\")[1]\n  sorted = [...data].sort((a, b) => {\n    let valueA = a[sortKey]\n    let valueB = b[sortKey]\n\n    if (valueA > valueB) {\n      return 1\n    }\n\n    if (valueB > valueA) {\n      return -1\n    }\n\n    return 0\n  })\n\n  if (az === \"desc\") {\n    sorted.reverse()\n  }\n\n  return sorted\n}\n\nconst searchComments = (data, keyword) => {\n  return data.filter((item) => String(item['body']).toLowerCase().includes(keyword.toLowerCase()))\n}\n\nconst paginateData = (data, limit = 10) => {\n  let pagination = []\n  while (data.length !== 0) {\n    pagination.push(data.splice(0, limit))\n  }\n  return pagination\n}\n\nconst render = (data, page_setting = { page: 0, perpage: 10 }) => {\n  const commentsElem = document.getElementById(\"comments\")\n  const paginationElem = document.getElementById(\"pagination\")\n  commentsElem.innerHTML = \"\"\n  paginationElem.innerHTML = \"\"\n\n  const { page, perpage } = page_setting\n\n  data.forEach(({}, i) => {\n    let newPageBtn = document.createElement(\"button\")\n    newPageBtn.disabled = page === i\n    newPageBtn.innerText = i + 1\n    newPageBtn.value = i\n    newPageBtn.addEventListener(\"click\", () => {\n      render(data, { page: i, perpage })\n    })\n\n    paginationElem.appendChild(newPageBtn)\n  })\n\n  if (data.length > 0) {\n    data[page].forEach((item, i) => {\n      let newRow = document.createElement(\"tr\")\n  \n      // no\n      let tdNo = document.createElement(\"td\")\n      tdNo.innerText = (page * perpage) + (i + 1)\n      tdNo.className = \"text-center\"\n      newRow.appendChild(tdNo)\n      \n      // id\n      let tdId = document.createElement(\"td\")\n      tdId.innerText = item.id\n      tdId.className = \"text-center\"\n      newRow.appendChild(tdId)\n  \n      // name\n      let tdName = document.createElement(\"td\")\n      tdName.innerText = item.name || '-'\n      newRow.appendChild(tdName)\n  \n      // email\n      let tdEmail = document.createElement(\"td\")\n      tdEmail.innerText = item.email || '-'\n      newRow.appendChild(tdEmail)\n  \n      // body\n      let tdBody = document.createElement(\"td\")\n      tdBody.innerText = item.body || '-'\n      newRow.appendChild(tdBody)\n  \n      commentsElem.appendChild(newRow)\n    })\n  } else {\n    let newRow = document.createElement(\"tr\")\n    let emptyTd = document.createElement(\"td\")\n    emptyTd.innerText = \"- NO DATA -\"\n    emptyTd.colSpan = \"5\"\n    emptyTd.className = \"text-center empty-data\"\n    newRow.appendChild(emptyTd)\n    commentsElem.appendChild(newRow)\n  }\n}\n\nmodule.exports = {\n  getComments,\n  filterComments,\n  paginateData,\n  render\n}\n\n\n//# sourceURL=webpack:///./src/js/app.modules.js?");

/***/ })

/******/ });