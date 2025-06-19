'use client';

import React, { useEffect, useState } from 'react';
import { Search, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface ScriptInfo {
  src?: string;
  innerHTML: string;
  location: string;
  id?: string;
  type?: string;
}

export default function DebugPage() {
  const [scripts, setScripts] = useState<ScriptInfo[]>([]);
  const [suspiciousScripts, setSuspiciousScripts] = useState<ScriptInfo[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanForScripts = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const allScripts: ScriptInfo[] = [];
      const suspicious: ScriptInfo[] = [];
      
      // Scan all script tags
      const scriptTags = document.querySelectorAll('script');
      
      scriptTags.forEach((script, index) => {
        const scriptInfo: ScriptInfo = {
          src: script.src || undefined,
          innerHTML: script.innerHTML.substring(0, 500), // First 500 chars
          location: script.src ? 'External' : 'Inline',
          id: script.id || undefined,
          type: script.type || undefined
        };
        
        allScripts.push(scriptInfo);
        
        // Check for suspicious content
        const content = script.innerHTML.toLowerCase();
        if (
          content.includes('updateconsent') ||
          content.includes('usercentrics') ||
          content.includes('uc_ui') ||
          content.includes('consent') && content.includes('granted') ||
          content.includes('získat povolené kategorie')
        ) {
          suspicious.push(scriptInfo);
        }
      });
      
      // Also check for dynamically added content
      const textNodes = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent && node.textContent.includes('updateConsent')) {
          suspicious.push({
            innerHTML: node.textContent.substring(0, 500),
            location: 'Text Node (Visible)',
            src: 'Dynamically injected as text'
          });
        }
      }
      
      setScripts(allScripts);
      setSuspiciousScripts(suspicious);
      setIsScanning(false);
    }, 1000);
  };

  const clearBrowserCache = () => {
    // Clear various browser storages
    try {
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear service worker caches
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
      
      alert('Cache cleared! Please refresh the page (Ctrl+F5) to see if the issue persists.');
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert('Error clearing cache. Please manually clear browser cache.');
    }
  };

  useEffect(() => {
    scanForScripts();
  }, []);

  return (
    <div className="min-h-screen bg-brand-beige p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-anton text-brand-gray mb-4 flex items-center">
            <Search className="w-6 h-6 mr-2 text-brand-olive" />
            Script Injection Debugger
          </h1>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={scanForScripts}
              disabled={isScanning}
              className="flex items-center justify-center py-3 px-6 bg-brand-olive text-white rounded-lg font-montserrat font-semibold transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Scan for Scripts
                </>
              )}
            </button>
            
            <button
              onClick={clearBrowserCache}
              className="flex items-center justify-center py-3 px-6 bg-brand-red text-white rounded-lg font-montserrat font-semibold transition-all duration-300 hover:bg-opacity-90"
            >
              <X className="w-5 h-5 mr-2" />
              Clear Cache & Storage
            </button>
          </div>

          {/* Suspicious Scripts */}
          {suspiciousScripts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-anton text-brand-red mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Suspicious Scripts Found ({suspiciousScripts.length})
              </h2>
              
              <div className="space-y-4">
                {suspiciousScripts.map((script, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-montserrat font-semibold text-red-700">
                          {script.location}
                        </span>
                        {script.src && (
                          <p className="text-sm text-red-600 font-mono break-all">
                            Source: {script.src}
                          </p>
                        )}
                        {script.id && (
                          <p className="text-sm text-red-600">ID: {script.id}</p>
                        )}
                      </div>
                    </div>
                    <pre className="bg-red-100 p-3 rounded text-xs font-mono overflow-x-auto text-red-800">
                      {script.innerHTML}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Scripts */}
          <div>
            <h2 className="text-xl font-anton text-brand-gray mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-brand-olive" />
              All Scripts Found ({scripts.length})
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scripts.map((script, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-montserrat font-semibold text-gray-700">
                        {script.location}
                      </span>
                      {script.src && (
                        <p className="text-sm text-gray-600 font-mono break-all">
                          {script.src}
                        </p>
                      )}
                      {script.id && (
                        <p className="text-sm text-gray-600">ID: {script.id}</p>
                      )}
                    </div>
                  </div>
                  {script.innerHTML && (
                    <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto text-gray-700 max-h-20 overflow-y-auto">
                      {script.innerHTML}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-brand-olive/10 border border-brand-olive/20 rounded-lg p-6">
          <h3 className="font-anton text-lg text-brand-gray mb-4">Troubleshooting Steps:</h3>
          <ol className="space-y-2 font-montserrat text-brand-gray/80">
            <li className="flex items-start">
              <span className="bg-brand-olive text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
              Check if Usercentrics is directly injecting scripts (independent of GTM)
            </li>
            <li className="flex items-start">
              <span className="bg-brand-olive text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
              Clear browser cache and hard refresh (Ctrl+Shift+R)
            </li>
            <li className="flex items-start">
              <span className="bg-brand-olive text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
              Check your website's HTML source for any hardcoded Usercentrics scripts
            </li>
            <li className="flex items-start">
              <span className="bg-brand-olive text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
              Disable Usercentrics entirely to see if the script disappears
            </li>
            <li className="flex items-start">
              <span className="bg-brand-olive text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">5</span>
              Check if the script appears in incognito/private browsing mode
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}