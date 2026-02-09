// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-ce4c42ba51eddb0024dfa25613d99fda');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/ce4c42ba51eddb0024dfa25613d99fda/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/38/a8/09/38a809c8d813008628915e6c653a3e97.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="c4ac5cbbdf0ff844b553232a3ff4f729"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/c4/ac/5c/c4ac5cbbdf0ff844b553232a3ff4f729.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}