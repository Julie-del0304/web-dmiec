export const CLUB_SLUGS: Record<string, string> = {
  'renewable-energy-eee': 'Renewable Energy Club – EEE',
  'coding-aids': 'Coding Club – AI&DS',
  'design-scripting-cse': 'Design & Scripting Club – CSE',
  'iot-ece': 'IoT Club – ECE',
  'drone-mech': 'Drone Club – MECH',
  'shakespeare-sh': 'Shakespeare Club – S&H',
  'bacon-sh': 'Bacon Club – S&H',
  'innovative-x-sh': 'Innovative X Club – S&H',
  'quantum-dot-sh': 'Quantum Dot Club – S&H',
  'ramanujan-sh': 'Ramanujan Club – S&H',
  'innovators-it': 'Innovators Club – IT',
  'eco-sh': 'Eco Club – S&H',
};

export const getSlugByName = (name: string): string => {
  return Object.entries(CLUB_SLUGS).find(([, v]) => 
    v.toLowerCase().includes(name.toLowerCase().split('–')[0].trim())
  )?.[0] ?? '';
};