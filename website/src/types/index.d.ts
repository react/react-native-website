export type ShowcaseApp = (typeof users)[keyof typeof users][number];

export type ShowcaseData = Record<string, ShowcaseApp[]>;

export type PartnerLink = {
  href: string;
  className?: string;
  logo: ReactNode;
};
