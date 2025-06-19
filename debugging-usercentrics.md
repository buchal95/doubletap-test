# Debug script pro GTM - Usercentrics Consent Update

Přidejte tento vylepšený script do GTM místo současného:

```javascript
function updateConsent() {
  console.log('🔍 updateConsent() called');
  
  // Debug: Zkontrolovat dostupné Usercentrics objekty
  console.log('UC_UI available:', typeof UC_UI !== 'undefined');
  console.log('window.UC_UI available:', typeof window.UC_UI !== 'undefined');
  console.log('window.uc available:', typeof window.uc !== 'undefined');
  console.log('window.usercentrics available:', typeof window.usercentrics !== 'undefined');
  
  // Zkusit různé způsoby přístupu k Usercentrics
  let ucObject = null;
  if (typeof UC_UI !== 'undefined') {
    ucObject = UC_UI;
    console.log('✅ Using UC_UI');
  } else if (typeof window.UC_UI !== 'undefined') {
    ucObject = window.UC_UI;
    console.log('✅ Using window.UC_UI');
  } else if (typeof window.uc !== 'undefined') {
    ucObject = window.uc;
    console.log('✅ Using window.uc');
  } else if (typeof window.usercentrics !== 'undefined') {
    ucObject = window.usercentrics;
    console.log('✅ Using window.usercentrics');
  }
  
  if (!ucObject) {
    console.error('❌ Žádný Usercentrics objekt nenalezen');
    return;
  }
  
  // Debug: Zkontrolovat dostupné metody
  console.log('getCategories method:', typeof ucObject.getCategories === 'function');
  console.log('getServicesBaseInfo method:', typeof ucObject.getServicesBaseInfo === 'function');
  console.log('Available methods:', Object.getOwnPropertyNames(ucObject));
  
  let categories = [];
  
  // Zkusit získat kategorie různými způsoby
  try {
    if (typeof ucObject.getCategories === 'function') {
      categories = ucObject.getCategories();
      console.log('📋 Categories from getCategories():', categories);
    } else if (typeof ucObject.getServicesBaseInfo === 'function') {
      categories = ucObject.getServicesBaseInfo();
      console.log('📋 Categories from getServicesBaseInfo():', categories);
    }
  } catch (error) {
    console.error('❌ Error getting categories:', error);
    return;
  }
  
  if (!categories || categories.length === 0) {
    console.error('❌ Žádné kategorie nenalezeny');
    return;
  }
  
  // Debug: Vypsat všechny kategorie
  categories.forEach(function(category, index) {
    console.log(`📂 Category ${index}:`, {
      slug: category.slug,
      label: category.label,
      name: category.name,
      consent: category.consent,
      id: category.id
    });
  });
  
  // Analyzovat consent pro marketing a functional
  var hasMarketing = false;
  var hasFunctional = false;
  
  categories.forEach(function(category) {
    if (category.consent === true) {
      var identifier = (category.slug || category.label || category.name || '').toLowerCase();
      console.log(`✅ Category with consent: "${identifier}"`);
      
      // Rozšířená detekce marketing kategorií
      if (identifier.includes('market') || 
          identifier.includes('ads') || 
          identifier.includes('advertising') || 
          identifier.includes('reklam') || 
          identifier.includes('analyt') ||
          identifier.includes('google') ||
          identifier.includes('facebook') ||
          identifier.includes('meta')) {
        hasMarketing = true;
        console.log('🎯 Marketing category detected');
      }
      
      // Rozšířená detekce functional kategorií
      if (identifier.includes('function') || 
          identifier.includes('funkc') || 
          identifier.includes('essential') ||
          identifier.includes('necessary') ||
          identifier.includes('nutne') ||
          identifier.includes('technical') ||
          identifier.includes('technic')) {
        hasFunctional = true;
        console.log('⚙️ Functional category detected');
      }
    }
  });
  
  console.log('🎯 Final consent states:', {
    hasMarketing: hasMarketing,
    hasFunctional: hasFunctional
  });
  
  // Update Google consent
  var consentUpdate = {
    'analytics_storage': hasMarketing ? 'granted' : 'denied',
    'ad_storage': hasMarketing ? 'granted' : 'denied',
    'ad_user_data': hasMarketing ? 'granted' : 'denied',
    'ad_personalization': hasMarketing ? 'granted' : 'denied',
    'functionality_storage': hasFunctional ? 'granted' : 'denied',
    'personalization_storage': hasFunctional ? 'granted' : 'denied',
    'security_storage': 'granted'
  };
  
  console.log('📤 Updating consent with:', consentUpdate);
  
  gtag('consent', 'update', consentUpdate);
  
  // Push custom event pro debugging
  dataLayer.push({
    'event': 'consent_update_debug',
    'consent_marketing': hasMarketing,
    'consent_functional': hasFunctional,
    'categories_count': categories.length
  });
}

// Event listeners pro různé Usercentrics eventy
var ucEvents = [
  'UC_UI_CMP_EVENT',
  'UC_UI_VIEW_CHANGED', 
  'usercentrics_consent_given',
  'usercentrics_consent_changed',
  'uc_consent_changed'
];

ucEvents.forEach(function(eventName) {
  console.log('🎧 Adding listener for:', eventName);
  window.addEventListener(eventName, function(event) {
    console.log('🔔 Event received:', eventName, event);
    setTimeout(updateConsent, 100);
  });
});

// Polling check - zkontrolovat každých 500ms až 10 sekund
var pollCount = 0;
var maxPolls = 20; // 20 * 500ms = 10 sekund

function pollForUsercentrics() {
  pollCount++;
  console.log(`🔄 Polling for Usercentrics (${pollCount}/${maxPolls})`);
  
  if (typeof UC_UI !== 'undefined' || 
      typeof window.UC_UI !== 'undefined' || 
      typeof window.uc !== 'undefined' || 
      typeof window.usercentrics !== 'undefined') {
    
    console.log('✅ Usercentrics detected via polling');
    setTimeout(updateConsent, 500);
    return;
  }
  
  if (pollCount < maxPolls) {
    setTimeout(pollForUsercentrics, 500);
  } else {
    console.error('❌ Usercentrics not found after 10 seconds');
  }
}

// Spustit polling
setTimeout(pollForUsercentrics, 1000);

// Backup - zkontrolovat po 5 sekundách
setTimeout(function() {
  console.log('🔄 Backup check after 5 seconds');
  updateConsent();
}, 5000);
```

## Postup debugging:

1. **Nahraďte současný script v GTM** tímto debug verzí
2. **Otevřete konzoli** a refreshněte stránku
3. **Sledujte logy** - uvidíte přesně co se děje s Usercentrics
4. **Otevřete/zavřete consent banner** a sledujte, jestli se spouštějí eventy
5. **Pošlete mi screenshot konzole** s chybami/logy

## Co script dělá:

✅ **Testuje všechny možné Usercentrics objekty** (UC_UI, window.UC_UI, window.uc, window.usercentrics)  
✅ **Loguje všechny dostupné metody** objektu  
✅ **Vypíše všechny kategorie** a jejich consent stavy  
✅ **Má rozšířenou detekci** marketing/functional kategorií  
✅ **Poslouchá na více eventů** najednou  
✅ **Má polling mechanismus** pro detekci Usercentrics  
✅ **Pushuje debug event** do dataLayer  

Tím zjistíme, kde přesně je problém! 🔍