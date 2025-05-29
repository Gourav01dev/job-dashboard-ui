import { breafCaseIcon, candidates, copyIcon, copyIconbg, dashboard, jobPosted, jobPostedbg, notificationBell, registeredCandidate, shakeHand, shakeHandbg, shortListed } from "../assets"

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: dashboard,
    path: "/dashboard",
    children:[],
  },
  {
    label: "Notification",
    icon: notificationBell,
    path: "/notification",
    children:[],
  },
  {
    label: "Jobs",
    icon: breafCaseIcon,
    path: "/jobs",
    children:[],
  },
  {
    label: "Candidates",
    icon: candidates,
    children: [
      {
        label: "Registered",
        icon: registeredCandidate,
        count: 1101,
      },
      {
        label: "Short listed",
        icon: shortListed,
        count: 86,
      },
    ],
  },
];

export const utilityCards = [
    {label:'Total Jobs Posted',
        count:32,
        image:jobPosted,
        backgroundImage:jobPostedbg,
        backgroundColor:'#293369',
    },
    {label:'Application received',
        count:665,
        image:copyIcon,
        backgroundImage:copyIconbg,
        backgroundColor:'#682938',
    },
    {label:'Hired',
        count:11,
        image:shakeHand,
        backgroundImage:shakeHandbg,
        backgroundColor:'#163235',
    },
]