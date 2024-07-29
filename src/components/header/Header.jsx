import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
export default function Header() {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 0 });

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
          <div className="dateDropDown">2024/29/07</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            className="optionDropDown"
            onClick={() => {
              setOpenOption((is) => {
                return !is;
              });
            }}
          >
            1 adult &bull; 0 children &bull; 1 room
          </div>
          {openOption ? <GuestOption option={options} /> : ""}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestOption({ option }) {
  return (
    <div className="guestOptions">
      <GuestOptionItem option={option} />
    </div>
  );
}

function GuestOptionItem({ option }) {
  for (const item in option) {
    console.log(item);
  }
  // <div className="guestOptionItem">
  //   <span className="optionText">adult</span>
  //   <div className="optionCounter">
  //     <button className="optionCounterBtn">
  //       <HiMinus />
  //     </button>
  //     <span className="optionCounetrNumber">0</span>
  //     <button className="optionCounterBtn">
  //       <HiPlus />
  //     </button>
  //   </div>
  // </div>
}
