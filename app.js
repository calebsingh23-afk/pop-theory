(() => {
  'use strict';
  const find = selector => document.querySelector(selector);
  const content = window.POP_CONTENT;
  if (!content) return;

  // The mobile menu is a non-modal disclosure: the page remains usable.
  const menu = find('.menu-toggle');
  const navigation = find('#mobile-nav');
  function closeMenu(restoreFocus = false) {
    navigation.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const opening = navigation.hidden;
    navigation.hidden = !opening;
    menu.setAttribute('aria-expanded', String(opening));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !navigation.hidden) closeMenu(true);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('header')) closeMenu();
  });
  const narrowScreen = matchMedia('(max-width:700px)');
  narrowScreen.addEventListener('change', () => closeMenu());

  // Native radio inputs provide touch, mouse, and arrow-key selection.
  for (const input of document.querySelectorAll('[name=flavor]')) {
    input.addEventListener('change', () => {
      const flavor = content.flavors[input.value];
      find('#flavor-name').textContent = flavor.name;
      find('#flavor-pair').textContent = flavor.pair;
      find('#flavor-description').textContent = flavor.description;
      find('#flavor-image').src = flavor.image;
      find('#flavor-image').alt = `${flavor.name} can — ${flavor.pair}`;
      find('.flavors').style.setProperty('--flavor', flavor.color);
      find('.flavor-word').textContent = flavor.word;
    });
  }

  const story = find('.story');
  const can = find('.story-can');
  const slice = find('.story-slice');
  const chapter = find('.chapter');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const shortScreen = matchMedia('(max-height:740px)');
  let scheduled = false;
  let skipped = false;
  let failed = false;
  const clamp = number => Math.min(1, Math.max(0, number));
  const motionAllowed = () => !reducedMotion.matches && !shortScreen.matches && !narrowScreen.matches && !failed;

  function renderStory() {
    scheduled = false;
    if (document.hidden || !motionAllowed() || skipped) return;
    const bounds = story.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    const headerHeight = document.querySelector('header').offsetHeight;
    const travel = story.offsetHeight - innerHeight + headerHeight;
    const progress = clamp((headerHeight - bounds.top) / Math.max(1, travel));
    const beat = content.story.beats.find(beat => progress >= beat.range[0] && progress <= beat.range[1]) || content.story.beats.at(-1);
    const localProgress = clamp((progress - beat.range[0]) / (beat.range[1] - beat.range[0]));
    const eased = localProgress * localProgress * (3 - 2 * localProgress);
    const mix = (start, end) => start + (end - start) * eased;
    can.style.transform = `translateX(${mix(...beat.travel)}px) rotate(${mix(...beat.rotation)}deg)`;
    slice.style.transform = `translate(${progress * -40}px,${progress * -80}px) rotate(${30 + progress * 85}deg) scaleY(.65)`;
    chapter.textContent = beat.copy;
    story.dataset.beat = beat.id;
  }
  function scheduleRender() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(renderStory);
    }
  }
  function configureStory() {
    document.body.classList.toggle('motion-ready', motionAllowed());
    can.style.transform = '';
    slice.style.transform = '';
    chapter.textContent = content.story.beats[0].copy;
    scheduleRender();
  }
  addEventListener('scroll', scheduleRender, { passive: true });
  addEventListener('resize', scheduleRender, { passive: true });
  document.addEventListener('visibilitychange', scheduleRender);
  for (const preference of [reducedMotion, shortScreen, narrowScreen]) {
    preference.addEventListener('change', configureStory);
  }
  find('.skip').addEventListener('click', event => {
    event.preventDefault();
    skipped = true;
    find('#flavors').scrollIntoView();
    requestAnimationFrame(() => find('#flavors').focus({ preventScroll: true }));
  });
  for (const image of document.images) {
    image.addEventListener('error', () => {
      if (image.closest('.story')) {
        failed = true;
        configureStory();
      }
      // Keep the useful product description when an image is unavailable.
      image.style.visibility = 'hidden';
    });
  }
  configureStory();
})();
