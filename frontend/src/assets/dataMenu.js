import {
  AiOutlineHtml5,
  AiTwotoneHtml5,
  AiOutlineHome,
  AiOutlineGithub
} from "react-icons/ai";

import {
  FaVuejs,
  FaAngular
} from "react-icons/fa"

import {
  PiExamDuotone
} from "react-icons/pi"

import {GrCss3} from "react-icons/gr";
import {ImCss3} from "react-icons/im";

import {RiJavascriptLine, RiJavascriptFill, RiReactjsFill} from "react-icons/ri";

import {BiLogoNodejs} from "react-icons/bi";

export const dataLink = [
  {
    title: "DASHBOARD",
    subMenu: [
      {
        name: "home",
        subIcon: <AiOutlineHome />,
      },
    ],
  },
  {
    title: "HTML",
    subMenu: [
      {
        name: "html-dasar",
        subIcon: <AiOutlineHtml5 />,
      },
      {
        name: "html-lanjutan",
        subIcon: <AiTwotoneHtml5 />,
      },
    ],
  },
  {
    title: "CSS",
    subMenu: [
      {
        name: "css-dasar",
        subIcon: <GrCss3 />,
      },
      {
        name: "css-lanjut",
        subIcon: <ImCss3 />,
      },
    ],
  },
  {
    title: "JAVASCRIPT",
    subMenu: [
      {
        name: "javascript-dasar",
        subIcon: <RiJavascriptLine />,
      },
      {
        name: "javascript-lanjut",
        subIcon: <RiJavascriptFill />,
      },
    ],
  },
  {
    title: "REMOTE CONTROL",
    subMenu: [
      {
        name: "git-github",
        subIcon: <AiOutlineGithub/>
      },
    ],
  },
  {
    title: "NODE JS",
    subMenu: [
      {
        name: "node-js",
        subIcon: <BiLogoNodejs />,
      },
    ],
  },
  {
    title: "FRAMEWORK",
    subMenu: [
      {
        name: "react-js",
        subIcon: <RiReactjsFill />,
      },
      {
        name: "vue-js",
        subIcon: <FaVuejs/>
      },
      {
        name: "angular-js",
        subIcon: <FaAngular/>
      }
    ],
  },
  {
    title: "TUGAS AKHIR",
    subMenu: [
      {
        name: "final-study",
        subIcon: <PiExamDuotone/>
      }
    ]
  }
];
