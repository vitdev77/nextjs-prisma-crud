"use client";

import moment from "moment";

export default function DateTimeTemplate({ timestamp }: { timestamp: Date }) {
  return (
    <>
      {moment(timestamp).format("DD.MM.YYYY")}
      <div className="text-muted-foreground/50 text-xs">
        {moment(timestamp).fromNow()}
      </div>
    </>
  );
}
