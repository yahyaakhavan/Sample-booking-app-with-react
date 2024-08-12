import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useReducer, useRef, useState } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  json,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
function reducer(state, { type, payload }) {
  switch (type) {
    case "inc": {
      return { ...state, [payload]: state[payload] + 1 };
    }
    case "dec": {
      return { ...state, [payload]: state[payload] - 1 };
    }
    default:
      throw new Error("unknown" + type);
  }
}
export default function Header() {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const [dateSelectionRange, setDateSelectionRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [option, dispatch] = useReducer(reducer, {
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleIncrement = (tatt) => {
    dispatch({ type: "inc", payload: tatt });
  };
  const handleDecrement = (tatt) => {
    dispatch({ type: "dec", payload: tatt });
  };
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(dateSelectionRange),
      destination,
      option: JSON.stringify(option),
    });
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };
  return (
    <div className="header">
      <span>Home</span>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destionation"
            id="destination"
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            onClick={() => {
              setOpenDate((is) => {
                return !is;
              });
            }}
            id="dateDropDown"
          >
            {`${format(
              dateSelectionRange[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(dateSelectionRange[0].endDate, "MM/dd/yyyy")} `}
          </div>
          <DateOption
            openDate={openDate}
            dateSelectionRange={dateSelectionRange}
            setDateSelectionRange={setDateSelectionRange}
            setOpenDate={setOpenDate}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => {
              setOpenOption((is) => {
                return !is;
              });
            }}
          >
            {option.adult} adult &bull; {option.children} children &bull;{" "}
            {option.room} room
          </div>
          {openOption ? (
            <GuestOption
              option={option}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              setOpenOption={setOpenOption}
            />
          ) : (
            ""
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestOption({
  option,
  handleIncrement,
  handleDecrement,
  setOpenOption,
}) {
  const optionRef = useRef();
  useOutSideClick(
    optionRef,
    () => {
      setOpenOption(false);
    },
    "optionDropDown"
  );
  return (
    <div className="guestOptions" ref={optionRef}>
      <GuestOptionItem
        type={"adult"}
        option={option}
        minLimit={1}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <GuestOptionItem
        type={"children"}
        option={option}
        minLimit={0}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <GuestOptionItem
        type={"room"}
        option={option}
        minLimit={1}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
}

function GuestOptionItem({
  option,
  type,
  minLimit,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={option[type] <= minLimit}
          onClick={() => {
            handleDecrement(type);
          }}
        >
          <HiMinus />
        </button>
        <span className="optionCounetrNumber">{option[type]}</span>
        <button
          onClick={() => handleIncrement(type)}
          className="optionCounterBtn"
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
function DateOption({
  openDate,
  dateSelectionRange,
  setDateSelectionRange,
  setOpenDate,
}) {
  const dateRef = useRef();
  useOutSideClick(
    dateRef,
    () => {
      setOpenDate(false);
    },
    "dateDropDown"
  );
  return (
    <div ref={dateRef}>
      {openDate ? (
        <DateRange
          className="date"
          ranges={dateSelectionRange}
          onChange={(item) => {
            return setDateSelectionRange([item.selection]);
          }}
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
        />
      ) : (
        ""
      )}
    </div>
  );
}
