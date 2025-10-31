// ... (keep all the imports and other code the same until the filteredPackages section)

  const filteredPackages = packages.filter((pkg) => {
    // Handle potential undefined/null values with optional chaining and nullish coalescing
    const searchTerm = (filters.search || '').toLowerCase().trim();
    if (!searchTerm) return true; // If no search term, include all packages
    
    const title = (pkg.name || '').toLowerCase();
    const description = (pkg.description || '').toLowerCase();
    
    const matchesSearch = 
      title.includes(searchTerm) ||
      description.includes(searchTerm);
      
    const matchesType = !filters.type || (pkg.type || '').toLowerCase() === filters.type.toLowerCase();
    
    const price = Number(pkg.price) || 0;
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Infinity;
    
    const matchesPrice = price >= minPrice && price <= maxPrice;
    
    return matchesSearch && matchesType && matchesPrice;
  });

// ... (rest of the component code remains the same)
