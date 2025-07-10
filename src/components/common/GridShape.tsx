import Image from "next/image";
import React from "react";

export default function GridShape() {
  return (
    <>
      <div className="absolute -z-1 w-full max-w-[1000px] xl:max-w-[1000px]">
        <Image
          width={700}
          height={300}
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
