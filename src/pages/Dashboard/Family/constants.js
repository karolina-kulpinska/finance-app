export const SECTION_KEYS = {
  members: "members",
  payments: "payments",
  shopping: "shopping",
  files: "files",
  link: "link",
  danger: "danger",
};

export const getInitialSectionOpen = () => {
  const keys = Object.values(SECTION_KEYS);
  if (typeof window === "undefined") {
    return keys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
  }
  const isMobile = window.innerWidth < 768;
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: isMobile ? key === SECTION_KEYS.members : true,
    }),
    {}
  );
};
