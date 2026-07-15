"use client";

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = 'text-[clamp(1.6rem,8vw,10rem)] font-black text-center text-white block',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');
    let charIndex = 0;

    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char) => {
          const currentIndex = charIndex++;
          return (
            <span className="char" key={currentIndex}>
              {char}
            </span>
          );
        })}
        {wordIndex < words.length - 1 && (
          <span className="char" key={`space-${wordIndex}`}>
            &nbsp;
          </span>
        )}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller: scroller as any,
            start: scrollStart,
            end: scrollEnd,
            scrub: true
          }
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
