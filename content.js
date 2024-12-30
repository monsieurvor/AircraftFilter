// Create our filter UI
const createFilterUI = () => {
    const container = document.createElement('div');
    container.className = 'aircraft-filter';
    container.innerHTML = `
      <div style="margin: 10px; padding: 10px; border: 1px solid #ccc;">
        <h4>Aircraft Manufacturer Filter</h4>
        <label>
          <input type="checkbox" id="filter-boeing" checked> Boeing
        </label>
        <label>
          <input type="checkbox" id="filter-airbus" checked> Airbus
        </label>
      </div>
    `;
  
    // Insert after the existing filters
    const existingFilters = document.querySelector('[role="main"] > div > div');
    if (existingFilters) {
      existingFilters.parentNode.insertBefore(container, existingFilters.nextSibling);
    }
  
    return {
      boeing: document.getElementById('filter-boeing'),
      airbus: document.getElementById('filter-airbus')
    };
  };
  
  // Intercept XHR responses
  const originalXHR = window.XMLHttpRequest;
  class CustomXHR extends originalXHR {
    constructor() {
      super();
      this.addEventListener('readystatechange', function() {
        if (this.readyState === 4 && this.responseURL.includes('GetShoppingResults')) {
          try {
            const response = JSON.parse(this.responseText);
            // Store the response for filtering
            window.lastFlightResponse = response;
            applyFilters();
          } catch (e) {
            console.error('Error parsing flight data:', e);
          }
        }
      });
    }
  }
  window.XMLHttpRequest = CustomXHR;
  
  // Function to determine aircraft manufacturer
  const getManufacturer = (aircraftType) => {
    if (!aircraftType) return 'Unknown';
    aircraftType = aircraftType.toLowerCase();
    if (aircraftType.includes('boeing') || aircraftType.includes('737') || aircraftType.includes('777') || aircraftType.includes('787')) {
      return 'Boeing';
    }
    if (aircraftType.includes('airbus') || aircraftType.includes('a3') || aircraftType.includes('a320') || aircraftType.includes('a321')) {
      return 'Airbus';
    }
    return 'Other';
  };
  
  // Function to apply filters
  const applyFilters = () => {
    if (!window.lastFlightResponse) return;
  
    const filters = {
      boeing: document.getElementById('filter-boeing')?.checked ?? true,
      airbus: document.getElementById('filter-airbus')?.checked ?? true
    };
  
    // Find and process flight results
    const flightResults = document.querySelectorAll('[role="main"] [role="article"]');
    flightResults.forEach(result => {
      const aircraftText = result.querySelector('[role="text"]')?.textContent || '';
      const manufacturer = getManufacturer(aircraftText);
  
      // Add manufacturer label if not present
      if (!result.querySelector('.manufacturer-label')) {
        const label = document.createElement('span');
        label.className = 'manufacturer-label';
        label.style.cssText = 'margin-left: 10px; padding: 2px 6px; border-radius: 3px; background-color: #f0f0f0; font-size: 12px;';
        label.textContent = manufacturer;
        result.querySelector('[role="text"]')?.appendChild(label);
      }
  
      // Apply filters
      if ((manufacturer === 'Boeing' && !filters.boeing) ||
          (manufacturer === 'Airbus' && !filters.airbus)) {
        result.style.display = 'none';
      } else {
        result.style.display = '';
      }
    });
  };
  
  // Initialize the UI and filters
  let filterUI;
  const initializeFilters = () => {
    if (!filterUI) {
      filterUI = createFilterUI();
      filterUI.boeing.addEventListener('change', applyFilters);
      filterUI.airbus.addEventListener('change', applyFilters);
    }
  };
  
  // Watch for DOM changes to reinitialize filters when needed
  const observer = new MutationObserver((mutations) => {
    const shouldInit = mutations.some(mutation => 
      Array.from(mutation.addedNodes).some(node => 
        node.nodeType === 1 && node.querySelector?.('[role="article"]')
      )
    );
    
    if (shouldInit) {
      initializeFilters();
      applyFilters();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Initial setup
  initializeFilters();