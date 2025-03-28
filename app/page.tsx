"use client";

import React, { useEffect } from "react";
import { run } from "../index";

const stringToDisplay: string =
  "Welcome to the Automatic Timetabling System. Upload your timetable file below to get started.";
const stringToDisplayArray: string[] = stringToDisplay.split("");

export default function Page() {

  async function handleButtonClick(e) {
    console.log("Called button click")
    let data = await e.target.files[0].text()
    let parsedData = await JSON.parse(data)
    console.log(parsedData);
    run(parsedData);
  }

  useEffect(() => {
    setInterval(() => {
      const textElement = document.getElementById(
        "textToRender"
      ) as HTMLElement;
      const button = document.getElementById("buttonToAnimate") as HTMLElement;
      if (textElement) {
        const currentText = textElement.innerText;
        if (currentText.length < stringToDisplayArray.length) {
          if (stringToDisplayArray[currentText.length] == " ") {
            textElement.innerText +=
              " " + stringToDisplayArray[currentText.length + 1];
          } else {
            textElement.innerText += stringToDisplayArray[currentText.length];
          }
          if (currentText.length == stringToDisplay.length - 1) {
            button.className = button.className.replace("opacity-0", "");
            button.className += " animate-appear";
            button.addEventListener("click", () => {
              const fileInput = document.getElementById("file") as HTMLInputElement;
              fileInput.click();
            });
          }
        }
      }
    }, 50); // Adjust the interval time as needed (in milliseconds)
  }, []);

  return (
    <div className="h-dvh w-dvw bg-gradient-to-tr to-blue-700 from-indigo-900 font-sans font-bold text-white justify-center items-center flex flex-col select-none">
      <div className="rounded-lg shadow-2xl shadow-neutral-800 w-fit h-fit justify-center items-center flex flex-col">
        <h1 className="text-5xl text-justify p-10" id="textToRender"></h1>
      </div>
      <button
        className="text-5xl p-10 rounded-lg shadow-2xl shadow-neutral-800 w-fit h-fit m-20 opacity-0 transition-color duration-300 hover:bg-gray-950"
        id="buttonToAnimate"
      >
        Select File
      </button>
      <input
        type="file"
        accept=".json"
        onInput={(e) => {
          console.log("Changed");
          handleButtonClick(e);
        }}
        className="hidden"
        id="file"
      ></input>
    </div>
  );
}
