export function beginAnchorNav() {
  document.documentElement.dataset.anchorNav = '1';
}

export function endAnchorNav() {
  delete document.documentElement.dataset.anchorNav;
}

export function isAnchorNav() {
  return document.documentElement.dataset.anchorNav === '1';
}
