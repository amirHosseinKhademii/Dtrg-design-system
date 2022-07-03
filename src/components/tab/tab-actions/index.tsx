import { memo } from "react";
import { Button } from "components/button";
import { ICChevronDown } from "icons/chevron-down";
import { ICChevronRight } from "icons/chevron-right";
import { ITab } from "../tab";

export const TabActions = memo(({ expandable, open }: ITab) => {
  if (expandable) {
    if (open)
      return (
        <Button icon type="button">
          <ICChevronDown className="w-6 h-6 text-gray-200" />
        </Button>
      );
    else
      return (
        <Button icon type="button">
          <ICChevronRight className="w-6 h-6 text-gray-200" />
        </Button>
      );
  } else return null;
});
