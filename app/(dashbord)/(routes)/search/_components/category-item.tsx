"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

type categoryItemProp = {
  label: string;
  icon?: IconType;
  value?: string;
};

export const CategoryItem = ({
  label,
  icon: Icon,
  value,
}: categoryItemProp) => {
  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition"
        //change style if active
      )}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
