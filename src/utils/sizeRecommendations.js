// Size recommendation utility functions

export const getSizeRecommendation = (productCategory, productBrand, userSizeSettings) => {
  console.log('getSizeRecommendation called with:', { productCategory, productBrand, userSizeSettings });
  
  if (!userSizeSettings || !userSizeSettings.brandSizes) {
    console.log('No user size settings or brand sizes found');
    return null;
  }

  const categoryMap = {
    'Shirts': 'shirts',
    'T-Shirts': 'tshirts',
    'Kurtis': 'shirts', // Treat kurtis like shirts for sizing
    'Dresses': 'shirts',
    'Sarees': 'shirts', // Treat sarees like shirts for sizing
    'Jeans': 'jeans',
    'Trousers': 'jeans',
    'Casual Shoes': 'footwear',
    'Formal Shoes': 'footwear',
    'Footwear': 'footwear',
    'Sandals': 'footwear',
    'Slippers': 'footwear'
  };

  const mappedCategory = categoryMap[productCategory];
  console.log('Mapped category:', mappedCategory);
  
  if (!mappedCategory || !userSizeSettings.brandSizes[mappedCategory]) {
    console.log('No mapped category or no user preferences for this category');
    return null;
  }

  const userBrandPref = userSizeSettings.brandSizes[mappedCategory];
  console.log('User brand preference:', userBrandPref);
  
  if (!userBrandPref.brand || !userBrandPref.size) {
    console.log('No brand or size set in user preferences');
    return null;
  }

  // Brand size conversion logic
  const brandConversions = {
    // Shirt brands
    'Allen Solly': {
      'Van Heusen': { sizeAdjustment: 0, note: 'Same fit' },
      'Peter England': { sizeAdjustment: 0, note: 'Same fit' },
      'Raymond': { sizeAdjustment: -1, note: 'One size smaller' },
      'Arrow': { sizeAdjustment: 0, note: 'Same fit' }
    },
    'Van Heusen': {
      'Allen Solly': { sizeAdjustment: 0, note: 'Same fit' },
      'Peter England': { sizeAdjustment: 0, note: 'Same fit' },
      'Raymond': { sizeAdjustment: -1, note: 'One size smaller' }
    },
    
    // Jeans brands
    'Levi\'s': {
      'Wrangler': { sizeAdjustment: 0, note: 'Same waist size' },
      'Lee': { sizeAdjustment: 0, note: 'Same waist size' },
      'Pepe Jeans': { sizeAdjustment: 1, note: 'One size up' },
      'Diesel': { sizeAdjustment: -1, note: 'One size down' }
    },
    'Wrangler': {
      'Levi\'s': { sizeAdjustment: 0, note: 'Same waist size' },
      'Lee': { sizeAdjustment: 0, note: 'Same waist size' },
      'Pepe Jeans': { sizeAdjustment: 1, note: 'One size up' }
    },
    
    // Footwear brands
    'Nike': {
      'Adidas': { sizeAdjustment: 0, note: 'Same size' },
      'Puma': { sizeAdjustment: 0, note: 'Same size' },
      'Reebok': { sizeAdjustment: 0.5, note: 'Half size up' }
    },
    'Adidas': {
      'Nike': { sizeAdjustment: 0, note: 'Same size' },
      'Puma': { sizeAdjustment: 0, note: 'Same size' }
    }
  };

  const userBrand = userBrandPref.brand;
  const userSize = userBrandPref.size;
  const userFit = userBrandPref.fit;

  // First, try to use the user's size from the same category regardless of brand
  // This ensures recommendations work even without exact brand matches
  if (userBrandPref.size) {
    let recommendedSize = userSize;
    let confidence = 'medium';
    let reason = `Based on your usual ${mappedCategory} size: ${userSize}`;
    let note = null;

    // Check if we have specific brand conversion data
    if (brandConversions[userBrand] && brandConversions[userBrand][productBrand]) {
      const conversion = brandConversions[userBrand][productBrand];
      
      // Apply size adjustment
      if (mappedCategory === 'footwear') {
        recommendedSize = (parseFloat(userSize) + conversion.sizeAdjustment).toString();
      } else if (mappedCategory === 'jeans') {
        recommendedSize = (parseInt(userSize) + conversion.sizeAdjustment).toString();
      } else {
        // For shirts/t-shirts with letter sizes
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const currentIndex = sizeOrder.indexOf(userSize);
        if (currentIndex !== -1) {
          const newIndex = Math.max(0, Math.min(sizeOrder.length - 1, currentIndex + conversion.sizeAdjustment));
          recommendedSize = sizeOrder[newIndex];
        }
      }
      
      confidence = 'high';
      reason = `Based on your ${userBrand} ${userSize} (${userFit} fit)`;
      note = conversion.note;
    }
    
    // Adjust for user's fit preference
    if (userFit === 'tight') {
      recommendedSize = adjustSizeUp(recommendedSize, mappedCategory);
      reason += ' - adjusted for looser fit';
    } else if (userFit === 'loose') {
      recommendedSize = adjustSizeDown(recommendedSize, mappedCategory);
      reason += ' - adjusted for tighter fit';
    }
    
    return {
      recommendedSize,
      confidence,
      reason,
      note
    };
  }

  // Fallback recommendation based on measurements
  if (userSizeSettings.measurements && Object.values(userSizeSettings.measurements).some(m => m)) {
    return getMeasurementBasedRecommendation(mappedCategory, userSizeSettings.measurements);
  }

  // Final fallback: use user's preferred size from any brand in the same category
  if (userBrandPref.size) {
    console.log('Using fallback recommendation with user size:', userBrandPref.size);
    return {
      recommendedSize: userBrandPref.size,
      confidence: 'low',
      reason: `Based on your usual ${mappedCategory} size`,
      note: 'Consider setting up brand preferences for better recommendations'
    };
  }

  console.log('No recommendation could be generated');
  return null;
};

const adjustSizeUp = (size, category) => {
  if (category === 'footwear') {
    return (parseFloat(size) + 0.5).toString();
  } else if (category === 'jeans') {
    return (parseInt(size) + 2).toString();
  } else {
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const currentIndex = sizeOrder.indexOf(size);
    return currentIndex < sizeOrder.length - 1 ? sizeOrder[currentIndex + 1] : size;
  }
};

const adjustSizeDown = (size, category) => {
  if (category === 'footwear') {
    return Math.max(6, parseFloat(size) - 0.5).toString();
  } else if (category === 'jeans') {
    return Math.max(28, parseInt(size) - 2).toString();
  } else {
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const currentIndex = sizeOrder.indexOf(size);
    return currentIndex > 0 ? sizeOrder[currentIndex - 1] : size;
  }
};

const getMeasurementBasedRecommendation = (category, measurements) => {
  // Simple measurement-based recommendations
  if (category === 'shirts' || category === 'tshirts') {
    const chest = parseFloat(measurements.chest);
    if (chest) {
      if (chest <= 36) return { recommendedSize: 'S', confidence: 'medium', reason: 'Based on chest measurement' };
      if (chest <= 38) return { recommendedSize: 'M', confidence: 'medium', reason: 'Based on chest measurement' };
      if (chest <= 40) return { recommendedSize: 'L', confidence: 'medium', reason: 'Based on chest measurement' };
      if (chest <= 42) return { recommendedSize: 'XL', confidence: 'medium', reason: 'Based on chest measurement' };
      return { recommendedSize: 'XXL', confidence: 'medium', reason: 'Based on chest measurement' };
    }
  } else if (category === 'jeans') {
    const waist = parseFloat(measurements.waist);
    if (waist) {
      return { recommendedSize: Math.round(waist).toString(), confidence: 'medium', reason: 'Based on waist measurement' };
    }
  }
  
  return null;
};

export const formatSizeRecommendation = (recommendation) => {
  if (!recommendation) return null;
  
  return {
    size: recommendation.recommendedSize,
    confidence: recommendation.confidence,
    message: `Recommended: ${recommendation.recommendedSize} - ${recommendation.reason}`,
    note: recommendation.note
  };
};
