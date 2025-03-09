
export const getAvailabilityDisplay = (available: 'immediately' | 'today' | 'tomorrow' | 'this-week') => {
  const availabilityDisplay = {
    'immediately': {
      text: 'Available Now',
      classes: 'bg-green-50 text-green-700 border-green-200'
    },
    'today': {
      text: 'Available Today',
      classes: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    'tomorrow': {
      text: 'Available Tomorrow',
      classes: 'bg-amber-50 text-amber-700 border-amber-200' 
    },
    'this-week': {
      text: 'Available This Week',
      classes: 'bg-gray-50 text-gray-700 border-gray-200'
    }
  };
  
  return availabilityDisplay[available];
};
