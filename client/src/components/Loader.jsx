import { Oval } from "react-loader-spinner";

import React from "react";

export default function Loader() {
  return (
    <div className="h-full w-full absolute top-0 flex justify-center items-center bg-black  bg-opacity-75 z-10">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>

  );
}
