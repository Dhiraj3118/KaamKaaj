export const humanify = (
  str: string,
  splitter: string = '_',
  joiner: string = ' ',
) => {
  return str
    ?.split(splitter)
    ?.map(str => str[0]?.toUpperCase() + str.slice(1))
    ?.join(joiner);
};

export const uglify = (
  str: string,
  splitter: string = ' ',
  joiner: string = '_',
) =>
  str
    ?.split(splitter)
    ?.map(str => str.toLowerCase())
    ?.join(joiner);
