import Image from "next/image";
import React from "react";

export default function GridShape() {
  return (
    <>
      <div className="absolute -z-1 w-full max-w-[1080px] xl:max-w-[1080px]">
        <Image
          width={600}
          height={600}
          src="/images/shape/pattern.svg"
          alt="grid"
        />
      </div>
      {/* <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <Image
          width={540}
          height={254}
          src="/images/shape/pattern.svg"
          alt="grid"
        />
      </div> */}
    </>
  );
}
