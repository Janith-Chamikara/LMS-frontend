export type navType = {
  name: string;
  url: string;
};
export const navItems: navType[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export const profileOptions:navType[] =[
  {
    name:"My Cart",
    url:"/"
  },
  {
    name:"My Courses",
    url:"/courses/me"
  },
]