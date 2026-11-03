export const GAMES = [
   {
      slug: 'memory-match',
      name: 'Memory Match',
      developer: 'Nick Frost',
      developerLink: 'https://github.com/nickfrostech',
      description: 'Test your memory by finding all the matching pairs in the shortest amount of time.',
      howToPlay: 'Click on two cards to flip them. If they match, they stay face up. If not, they flip back over. Clear the board in the fewest moves to get a high score!',
      isActive: true,
   },
   {
      slug: 'reaction-timer',
      name: 'Reaction Timer',
      developer: 'Nick Frost',
      developerLink: 'https://github.com/nickfrostech',
      description: 'How fast are your reflexes? Click as soon as the screen turns green.',
      howToPlay: 'Wait for the red box to turn green, then click as fast as you can. If you click too early, you lose points. A faster reaction gives a higher score!',
      isActive: false,
   },
   {
      slug: 'blind-timer',
      name: 'Blind Timer',
      developer: 'Nick Frost',
      developerLink: 'https://github.com/nickfrostech',
      description: 'Test your internal clock. Can you guess exactly when the target time has passed without looking?',
      howToPlay: 'Look at the Target Time. Click "Start Timer" and wait. When you think the exact amount of time has passed, click "Stop Timer!". The closer you are to the target (in milliseconds), the higher your score!',
      isActive: false,
   },
   {
      slug: 'unmasked',
      name: 'Unmasked',
      developer: 'apcodesphere',
      developerLink: 'https://github.com/apreezofficial',
      description: 'Flip the tiles and find the matching shapes in as few tries as you can.',
      howToPlay: 'Tap a tile to reveal its shape, then tap a second one. If the shapes match, they stay revealed. Find all 6 pairs using as few tries as you can, and as fast as you can. Fewer tries and less time give a higher score.',
      isActive: false,
   }
];

export const getActiveGame = () => GAMES.find(game => game.isActive);
export const getGameBySlug = (slug) => GAMES.find(game => game.slug === slug);
