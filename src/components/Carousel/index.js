import { addClass, removeClass } from "helpers/format/classNameModifier";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

export default function Carousel({ children, refContainer }) {
  const refDragHandler = useRef(null);
  const containerClentRect = refContainer.current.getBoundingClientRect();
  const [index, setIndex] = useState(0);

  const treshold = 0;
  const itemToShow = window.innerWidth < 767 ? 1 : 0;
  const DIRECTION_LEFT = "DIRECTION_LEFT";
  const DIRECTION_RIGHT = "DIRECTION_RIGHT";

  const posInitial = useRef();
  const posX1 = useRef();
  const posX2 = useRef();
  const posFinal = useRef();
  const isAllowShift = useRef(true);
  const cards = useRef();
  const cardCount = cards.current?.length || 0;
  const cardSize = cards.current?.[0].offsetLeft || 0;

  const fnCheckIndex = useCallback(
    (e) => {
      if (e.propertyName === "left") {
        setTimeout(() => {
          removeClass(refDragHandler.current, "transition-all duration-200");
        }, 200);

        const isMobile = window.innerWidth < 767 ? 0 : -1;
        if (index <= 0) {
          refDragHandler.current.style.left = 0;
          setIndex(0);
        }
        // index sekarang lebih besar sama dengan total banyaknya card yang akan di tampilkan
        else if (index >= cardCount - itemToShow) {
          refDragHandler.current.style.left = `${-(
            (cardCount - itemToShow + isMobile) *
            cardSize
          )}px`;
          setIndex(cardCount - itemToShow);
        } else if (index === cardCount || index === cardCount - 1) {
          refDragHandler.current.style.left = `${(cardCount - 1) * cardSize}px`;
          setIndex(cardCount - 1);
        }

        isAllowShift.current = true;
      }
    },
    [cardCount, cardSize, index, itemToShow]
  );

  const fnShiftItem = useCallback(
    (direction) => {
      addClass(refDragHandler.current, "transition-all duration-200");

      // cek pergerakan arah dragnya
      if (isAllowShift.current === "DIRECTION_LEFT") {
        setIndex((prev) => prev + 1);
        refDragHandler.current.style.left = `${posInitial.current - cardSize}`;
      } else if (isAllowShift.current === "DIRECTION_RIGHT") {
        setIndex((prev) => prev - 1);
        refDragHandler.current.style.left = `${posInitial.current + cardSize}`;
      }
    },
    [cardSize]
  );

  // ketika caroselnya di gerakan
  const onDragMove = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();
      // console.log(e);

      // cek jika touch di mobile
      if (e.type === "touchmove") {
        posX2.current = posX1.current - e.touches[0].clientX;
        posX1.current = e.touches[0].clientX;
      } else {
        // cek jika touch di desktop
        posX2.current = posX1.current - e.clientX;
        posX1.current = e.clientX;
      }

      // untuk carouselnya bisa offset ke pinggir
      refDragHandler.current.style.left = `${
        refDragHandler.current.offsetLeft - posX2.current
      }px`;
    },
    [posX1, posX2]
  );

  const onDragEnd = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();
      // console.log(e);

      posFinal.current = refDragHandler.current.offsetLeft;

      if (posFinal.current - posInitial.current < -treshold) {
        fnShiftItem(DIRECTION_LEFT);
      } else if (posFinal.current - posInitial.current < -treshold) {
        fnShiftItem(DIRECTION_RIGHT);
      } else {
        // ketika pergeserannya kurang dari 100 maka akan posisinya kembili seperti semula
        refDragHandler.current.style.left = `${posInitial.current}px`;
      }

      document.onmouseup = null;
      document.onmousemove = null;
    },
    [fnShiftItem]
  );

  // ketika carouselnya di jalankan
  const onDragStart = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();
      // console.log(e);

      // initial drag pada parent cards
      posInitial.current = refDragHandler.current.offsetLeft;

      // cek jika touch di mobile
      if (e.type === "touchstart") {
        posX1.current = e.touches[0].clientX;
      } else {
        // cek jika touch di desktop
        posX1.current = e.clientX;
        document.onmouseup = onDragEnd;
        document.onmousedown = onDragMove;
      }
    },
    [onDragEnd, onDragMove]
  );

  // ketika di geser tidak langsung klik
  const onClick = useCallback((e) => {
    e = e || window.event;
    !isAllowShift.current && e.preventDefault();
  }, []);

  useLayoutEffect(() => {
    const refForwardDragHandler = refDragHandler.current;

    refForwardDragHandler.onmousedown = onDragStart;
    refForwardDragHandler.addEventListener("touchstart", onDragStart);
    refForwardDragHandler.addEventListener("touchend", onDragEnd);
    refForwardDragHandler.addEventListener("touchmove", onDragMove);
    refForwardDragHandler.addEventListener("click", onClick);
    refForwardDragHandler.addEventListener("transitionend", fnCheckIndex);
    return () => {
      refForwardDragHandler.addEventListener("touchstart", onDragStart);
      refForwardDragHandler.addEventListener("touchmove", onDragEnd);
      refForwardDragHandler.addEventListener("touchend", onDragMove);
      refForwardDragHandler.addEventListener("click", onClick);
      refForwardDragHandler.addEventListener("transitionend", fnCheckIndex);
    };
  }, [onDragStart, onDragEnd, onDragMove, onClick, fnCheckIndex]);

  useLayoutEffect(() => {
    if (refDragHandler.current) {
      cards.current = refDragHandler.current.getElementsByClassName("card");
    }
  }, []);

  return (
    <div
      ref={refDragHandler}
      className="flex -mx-4 flex-row relative"
      style={{ paddingLeft: containerClentRect.left - 16 }}
    >
      {children}
    </div>
  );
}
