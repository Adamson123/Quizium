import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavRow from "./NavRow";

const Categories = () => {
  const rowRef = useRef();
  const firstDivRef = useRef();
  const lastDivRef = useRef();
  const otherDivsRef = useRef();
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const updatedOnStart = useRef(false);

  const categories = [
    {
      category: "General Knowledge",
      color: "rgba(38, 70, 83, 0.3)",
    },
    {
      category: "Entertainment",
      color: "rgba(155, 93, 229, 0.3)",
    },
    {
      category: "Science & Technology",
      color: "rgba(0, 245, 212, 0.3)",
    },
    {
      category: "Sports",
      color: "rgba(230, 57, 70, 0.3)",
    },
    {
      category: "Pop Culture",
      color: "rgba(255, 0, 110, 0.3)",
    },
    {
      category: "Academic",
      color: "rgba(42, 157, 143, 0.3)",
    },
    {
      category: "Lifestyle",
      color: "rgba(244, 162, 97, 0.3)",
    },
    {
      category: "Miscellaneous",
      color: "rgba(109, 104, 117, 0.3)",
    },
  ];

  const updateScrollBtn = () => {
    const firstClient = firstDivRef.current.getBoundingClientRect();
    const lastDivClient = lastDivRef.current.getBoundingClientRect();

    //firstClient?.x < 35
    if (firstClient.left <= 0) {
      setShowLeftBtn(true);
    } else {
      setShowLeftBtn(false);
    }

    const scrollWidth = rowRef.current?.scrollWidth;
    const maxScrollVal = scrollWidth - rowRef.current?.scrollLeft;
    //maxScrollVal <= rowRef.current?.clientWidth
    // lastDivClient?.left + 70 <= rowRef.current?.clientWidth
    if (lastDivClient?.left + -20 <= rowRef.current?.clientWidth) {
      setShowRightBtn(false);
    } else {
      setShowRightBtn(true);
    }
  };

  useEffect(() => {
    updateScrollBtn();
    updatedOnStart.current = true;
    window.addEventListener("resize", updateScrollBtn);
    return () => {
      window.removeEventListener("resize", updateScrollBtn);
    };
  }, []);

  const distributeRef = (index) => {
    if (index === 0 && categories.length > 1) {
      return firstDivRef;
    } else if (index === categories.length - 1) {
      return lastDivRef;
    } else {
      return otherDivsRef;
    }
  };

  return (
    <div className="relative">
      <div
        className="flex gap-4 mb-5 overflow-x-auto 
        overflow-y-hidden hideScroll
     cursor-pointer scroll-smooth pr-5"
        ref={rowRef}
        onScroll={updateScrollBtn}
      >
        <NavRow
          rowRef={rowRef}
          showLeftBtn={showLeftBtn}
          showRightBtn={showRightBtn}
          styles="top-[25%] max-h-[40px] w-[40px] border-0"
        />
        {categories.map((category, index) => {
          return (
            <Link
              to={`/search?query=&category=${category.category.replace(
                "& ",
                ""
              )}&scoring=&min=&max=`}
              key={index}
            >
              <div
                ref={distributeRef(index)}
                style={{
                  backgroundColor: category.color,
                  backgroundImage: `url(./categories/${category.category
                    .split(" ")
                    .join("-")}.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="min-h-20 min-w-40 rounded text-center 
            flex items-center justify-center isidoraBold relative"
              >
                <div
                  style={{
                    backgroundColor: category.color,
                  }}
                  className="absolute top-0 bottom-0 right-0 left-0 rounded"
                ></div>
                <span className="z-[2]">{category.category}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
