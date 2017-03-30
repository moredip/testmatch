module.exports = {
  isMatcher: isMatcher
};

function isMatcher(thing){
  // TODO: add marker symbol to matchers rather than this hokey nonsense
  return (typeof thing.matches === 'function');
}
