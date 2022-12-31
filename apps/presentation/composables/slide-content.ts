export const useSlideContent = async (path: string) => {
  const { title, description, body, excerpt, ...meta } = await queryContent(path).findOne();
  if (!title || !description) throw new Error("Missing title or description");

  // any way to do this more declaratively?
  let slides: any[][] = [],
    currentSlide: any[] = [],
    slideTitles: string[] = [];
  for (const child of body.children) {
    if (child.tag === "h1") {
      slideTitles.push(child.children[0].value);
      continue;
    }
    if (child.tag === "break") {
      slides.push(currentSlide);
      if (slideTitles.length < slides.length) slideTitles.push("");
      currentSlide = [];
      continue;
    }
    currentSlide.push(child);
  }
  slides.push(currentSlide);
  if (slideTitles.length < slides.length) slideTitles.push("");

  const slideObjects = slides.map(s => ({
    title,
    description,
    ...meta,
    body: { type: "root", children: s },
  }));

  if (slideTitles.length !== slideObjects.length)
    throw new Error("Slide titles and slides don't match");

  return { title, description, slides: slideObjects, slideTitles };
};
