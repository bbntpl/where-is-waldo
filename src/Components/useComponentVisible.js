import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible, linkRef) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const elementRef = useRef(null);

    const handleHideDropdown = (e) => {
        if (e.key === 'Escape') { setIsComponentVisible(false); } 
    };
    const handleCurrentTarget = (ref, event) => {
        return(!ref.current.contains(event.target))
    }
    const handleClickOutside = (event) => {
        if (elementRef.current && (handleCurrentTarget(elementRef, event) && (handleCurrentTarget(linkRef, event)))) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { elementRef, isComponentVisible, setIsComponentVisible};
}