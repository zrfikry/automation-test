const { paginateData, render } = require('./app.modules')

describe('Test Pagination', () => {
  test('should empty data', () => {
    expect(paginateData([])).toEqual([])
  })
  
  test('should return array of 2 arrays', () => {
    let dataInput = [
      {a: 'A'},
      {b: 'B'}
    ]
  
    let dataExpect = [
      [{a: 'A'}],
      [{b: 'B'}]
    ]
    expect(paginateData(dataInput, 1)).toEqual(dataExpect)
  })
})

describe('Test Render', () => {
  let docGetElemById = jest.spyOn(document, 'getElementById')
  let docCreateElem = jest.spyOn(document, 'createElement')
  
  beforeAll(() => {
    docGetElemById.mockImplementation(() => {
      return {
        appendChild: () => {},
        innerHTML: ''
      }
    })

    docCreateElem.mockImplementation(() => {
      return {
        innerText: '',
        className: '',
        appendChild: () => {},
        disabled: false,
        addEventListener: () => {},
        value: ''
      }
    })
  })

  afterAll(() => {
    docGetElemById.mockRestore()
    docCreateElem.mockRestore()
  })

  test('getElementById should be called 2 times', () => {
    render([])
    expect(docGetElemById).toBeCalledTimes(2)
  })

  test('createElement should be called 7 times', () => {
    let data = [[
      {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }
    ]]
    render(data)
    expect(docCreateElem).toBeCalledTimes(7)
  })

})
