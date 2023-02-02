import _ from 'lodash'

export function paginate(items, pageNumber, pageSize) {
  // Caculate starting index of items in page
  const startIndex = (pageNumber - 1) * pageSize
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value()
}