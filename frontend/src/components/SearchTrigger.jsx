import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { dataContext } from "../layouts/Layout";

const SearchTrigger = ({
    category = "All",
    scoring = "Exam-Style Scoring",
    numOfQuests = { min: "", max: "" },
    refetch,
}) => {
    const { search, setSearch, setSearchFocus, searchFocus } =
        useContext(dataContext) || {};
    const navigate = useNavigate();

    useEffect(() => {
        const startSearch = (event) => {
            if (event.key === "Enter" && search.trim(" ") && searchFocus) {
                navigate(
                    `/search?query=${search}&category=${category}&scoring=${scoring}&min=${numOfQuests.min}&max=${numOfQuests.max}`
                );
                if (typeof refetch === "function") {
                    refetch();
                }
                setSearchFocus(false);
            }
        };
        window.addEventListener("keyup", startSearch);

        return () => {
            window.removeEventListener("keyup", startSearch);
        };
    }, [searchFocus, search]);

    /* 
let's call the background that appears when searching searchB
1. searchB will appear if search bar is focus
2. 
*/

    return (
        searchFocus && (
            <div
                onClick={() => {
                    setSearchFocus(false);
                }}
                className="fixed left-0 bottom-0 right-0
                top-0 bg-transparentBlack z-[15]"
            ></div>
        )
    );
};

export default SearchTrigger;
