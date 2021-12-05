export function scroll(listRef, behavior = "smooth") {
  listRef.current.scrollIntoView({
    behavior,
  });
}
