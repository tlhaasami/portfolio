export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  githubUrl: string;
  githubUsername: string;
  navItems: NavItem[];
}

export const portfolioData: PortfolioData = {
  githubUrl: "https://github.com/username",
  githubUsername: "github.com/username",
  navItems: [
    { label: "HOME", href: "#" },
    { label: "ABOUT", href: "#about" },
    { label: "TECH", href: "#expertise" },
    { label: "PROJECTS", href: "#work" },
    { label: "CERTIFICATES", href: "#certificates" },
    { label: "CONTACT", href: "#contact" },
  ],
};
