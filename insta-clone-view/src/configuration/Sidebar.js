import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { PiHeartStraightBold } from "react-icons/pi";
import { IoIosCompass } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";

const Items = [
    {
        title: "Home",
        icon: AiFillHome,
        isActive: AiFillHome
    },
    {
        title: "Search",
        icon: IoSearch,
        isActive: IoSearch
    },
    {
        title: "Explore",
        icon: IoIosCompass,
        isActive: IoIosCompass
    },
    {
        title: "Message",
        icon: FaFacebookMessenger,
        isActive: FaFacebookMessenger
    },
    {
        title: "Notifications",
        icon: PiHeartStraightBold,
        isActive: PiHeartStraightBold
    },
    {
        title: "Create",
        icon: FaSquarePlus,
        isActive: FaSquarePlus
    },
    {
        title: "Profile",
        icon: CgProfile,
        isActive: CgProfile
    },
    {
        title: "More",
        icon: IoMenu,
        isActive: IoMenu
    }
];

export default Items;