import { Fragment, memo } from "react";
import { classNames } from "utils";
import { IToolbar } from "./toolbar";

export const Toolbar = memo(({ children }: IToolbar) => {
  return (
    <div
      className={classNames(
        "w-full flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700"
      )}
    >
      {typeof children !== "object" ? (
        <div slot="children">{children}</div>
      ) : (
        children.length > 0 && (
          <Fragment>
            <>{children.find((child: any) => child.props.slot === "start")}</>
            <>{children.find((child: any) => child.props.slot === "end")}</>
          </Fragment>
        )
      )}
    </div>
  );
});
