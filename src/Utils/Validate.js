// Validate Required Field
const Required = (value) => {
  if (value) return undefined;
  return 'Required!';
};

const isURLValid = (value) => {
  const regex = new RegExp('^$|([Hh][Tt][Tt][Pp]|[Ff][Tt][Pp])([Ss])?://.+$');
  const isTrue = regex.test(value);
  if (isTrue) return undefined;
  return 'Invalid URL';
};

export { Required, isURLValid };
