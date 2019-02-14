import React from 'react';
import { FormattedMessage } from 'react-intl';

// Validate Required Field
const Required = (value) => {
  if (value) return undefined;
  return <FormattedMessage id="ui-vendors.valid.required" />;
};

const isURLValid = (value) => {
  const REGEXP_URL = new RegExp('^$|([Hh][Tt][Tt][Pp]|[Ff][Tt][Pp])([Ss])?://.+$');
  const isTrue = REGEXP_URL.test(value);
  if (isTrue) return undefined;
  return <FormattedMessage id="ui-vendors.valid.isURLValid" />;
};

export { Required, isURLValid };
