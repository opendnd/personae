Array.prototype.ignoreCaseIncludes = function (searchElement, fromIndex) {
  if (this == null) throw new TypeError('"this" is null or not defined');
  return this.map(el => el.toLowerCase()).includes(searchElement.toLowerCase(), fromIndex);
};

// only push unique elements
Array.prototype.pushUnique = function (element) {
  if (this.indexOf(element) === -1) this.push(element);
};

// grab a random element
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

String.prototype.capitalize = function () {
  if (this == null) throw new TypeError('"this" is null or not defined');
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.capitalizeAll = function () {
  if (this == null) throw new TypeError('"this" is null or not defined');
  if (this.includes('-')) return this.split('-').map(word => word.capitalize()).join('-');
  return this.split(' ').map(word => word.capitalize()).join(' ');
};

String.prototype.lowerCaseFirst = function () {
  if (this.charAt(0) === 'I') return this;
  return this.charAt(0).toLowerCase() + this.slice(1);
};
