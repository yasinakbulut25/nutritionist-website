import React from "react";
import ButtonLight from "../buttons/ButtonLight";
import Container from "../Container";

function IntroBox({ title = "", desc = "", buttonProps }) {
  return (
    <Container>
      <div className="w-full flex lg:flex-row flex-col items-center lg:text-left text-center lg:gap-4 gap-8 p-10 rounded-xl bg-gradient-to-b from-violet-800 to-violet-400">
        <div className="w-full flex flex-col lg:gap-2 gap-4">
          <h3 className="md:text-4xl text-3xl text-white font-bold lg:text-wrap text-balance">
            {title}
          </h3>
          <p className="text-base text-white font-normal lg:text-wrap text-balance">
            {desc}
          </p>
        </div>
        <ButtonLight
          className="shadow-none min-w-max mx-6 animate-pulseWhite h-auto py-4 px-6 text-violet-600"
          {...buttonProps}
        >
          {buttonProps?.text || ""}
        </ButtonLight>
      </div>
    </Container>
  );
}

export default IntroBox;
