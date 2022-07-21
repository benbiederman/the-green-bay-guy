import LocalsGuideNavItem from "../components/LocalsGuideNavItem/LocalsGuideNavItem";

const LocalsGuide = () => {
  return (
    <main className="locals-guide">
      <LocalsGuideNavItem
        background={"eatBackground"}
        link={"eat"}
        header={"Eat"}
      />
      <LocalsGuideNavItem
        background={"drinkBackground"}
        link={"drink"}
        header={"Drink"}
      />
      <LocalsGuideNavItem
        background={"doBackground"}
        link={"do"}
        header={"Do"}
      />
      <LocalsGuideNavItem
        background={"miscBackground"}
        link={"misc"}
        header={"Misc"}
      />
    </main>
  );
};

export default LocalsGuide;
