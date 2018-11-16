const toJson = (data) => {
  return data.json()
}

const getComments = async (url) => {
  let result = []
  await fetch(url)
  .then((res) => toJson(res))
  .then((data) => result = data)
  .catch((err) => console.log(err))
  return result
}

const filterComments = (data = [], keyword, sort, perpage) => {
  let sorted = sortComments(data, sort)
  // search
  if (keyword !== "") {
    sorted = searchComments(sorted, keyword)
  }
  return paginateData(sorted, perpage)
}

const sortComments = (data = [], sort) => {
  let sorted = []
  let sortKey = sort.split("_")[0]
  let az = sort.split("_")[1]
  sorted = [...data].sort((a, b) => {
    let valueA = a[sortKey]
    let valueB = b[sortKey]

    if (valueA > valueB) {
      return 1
    }

    if (valueB > valueA) {
      return -1
    }

    return 0
  })

  if (az === "desc") {
    sorted.reverse()
  }

  return sorted
}

const searchComments = (data, keyword) => {
  return data.filter((item) => String(item['body']).toLowerCase().includes(keyword.toLowerCase()))
}

const paginateData = (data, limit = 10) => {
  let pagination = []
  while (data.length !== 0) {
    pagination.push(data.splice(0, limit))
  }
  return pagination
}

const render = (data, page_setting = { page: 0, perpage: 10 }) => {
  const commentsElem = document.getElementById("comments")
  const paginationElem = document.getElementById("pagination")
  commentsElem.innerHTML = ""
  paginationElem.innerHTML = ""

  const { page, perpage } = page_setting

  data.forEach(({}, i) => {
    let newPageBtn = document.createElement("button")
    newPageBtn.disabled = page === i
    newPageBtn.innerText = i + 1
    newPageBtn.value = i
    newPageBtn.addEventListener("click", () => {
      render(data, { page: i, perpage })
    })

    paginationElem.appendChild(newPageBtn)
  })

  if (data.length > 0) {
    data[page].forEach((item, i) => {
      let newRow = document.createElement("tr")
  
      // no
      let tdNo = document.createElement("td")
      tdNo.innerText = (page * perpage) + (i + 1)
      tdNo.className = "text-center"
      newRow.appendChild(tdNo)
      
      // id
      let tdId = document.createElement("td")
      tdId.innerText = item.id
      tdId.className = "text-center"
      newRow.appendChild(tdId)
  
      // name
      let tdName = document.createElement("td")
      tdName.innerText = item.name || '-'
      newRow.appendChild(tdName)
  
      // email
      let tdEmail = document.createElement("td")
      tdEmail.innerText = item.email || '-'
      newRow.appendChild(tdEmail)
  
      // body
      let tdBody = document.createElement("td")
      tdBody.innerText = item.body || '-'
      newRow.appendChild(tdBody)
  
      commentsElem.appendChild(newRow)
    })
  } else {
    let newRow = document.createElement("tr")
    let emptyTd = document.createElement("td")
    emptyTd.innerText = "- NO DATA -"
    emptyTd.colSpan = "5"
    emptyTd.className = "text-center empty-data"
    newRow.appendChild(emptyTd)
    commentsElem.appendChild(newRow)
  }
}

module.exports = {
  getComments,
  filterComments,
  paginateData,
  render
}
