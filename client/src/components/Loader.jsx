import { Oval } from "react-loader-spinner";

import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen w-full absolute top-0 bottom-0 flex justify-center items-center bg-black  bg-opacity-75 z-10">
      <Oval
        height={80}
        width={80}
        color="#1d3557"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#1d3557"
        strokeWidth={3}
        strokeWidthSecondary={2}
      />
    </div>

  );
}
