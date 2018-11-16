const { getComments, filterComments, render } = require('./app.modules')

let comments = []
let sort = "id_asc"
let keyword = ""
let page = 0
let perpage = 10

const sortBy = document.getElementById("sortBy")
const searchElem = document.getElementById("search")

async function init() {
  comments = await getComments('http://jsonplaceholder.typicode.com/comments')
  sortBy.addEventListener("change", applyFilter)
  searchElem.addEventListener("change", applyFilter)
  let data = filterComments(comments, keyword, sort, perpage)
  render(data, { page, perpage })
}

const applyFilter = (e) => {
  const { value, name } = e.target
  if (name === "sortBy") {
    sort = value
    if (value === "") {
      sort = "id_asc"
    }
  } else {
    keyword = value
    page = 0
  }
  let data = filterComments(comments, keyword, sort, perpage)
  render(data, { page, perpage })
}

document.onload = init()
