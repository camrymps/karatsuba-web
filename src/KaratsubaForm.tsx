import { SyntheticEvent, useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { KaratsubaFormProps, KaratsubaStep } from "./types";

type Test = {
  product: number;
  steps?: any[];
};

export default function KaratsubaForm({
  onProductCalculation,
  onMultiplicandChange,
  onMultiplierChange,
}: KaratsubaFormProps) {
  const [multiplicand, setMulitplicand] = useState<string>("");
  const [multiplier, setMultiplier] = useState<string>("");

  const getProduct = (
    x: number,
    y: number,
    initialMultiplicand: number,
    initialMultiplier: number,
    steps: any[]
  ): Test => {
    if (x < 10 && y < 10) {
      /* steps.push({
        number: steps.length + 1,
        equation: [`${x}`, `${y}`],     
        subSteps: [
          `<span class="text-blue-500">${x}</span> × <span class="text-green-500">${y}</span> = ${x * y}`
        ]
      }) */

      return {
        product: x * y,
      };
    }

    const n: number = Math.max(x.toString().length, y.toString().length);
    const m: number = Math.ceil(n / 2);

    const xH: number = Math.floor(x / Math.pow(10, m));
    const xL: number = x % Math.pow(10, m);

    console.log(xH)

    const yH: number = Math.floor(y / Math.pow(10, m));
    const yL: number = y % Math.pow(10, m);

    console.log(yH)

    const a: number = getProduct(
      xH,
      yH,
      initialMultiplicand,
      initialMultiplier,
      steps
    ).product;

    const d: number = getProduct(
      xL,
      yL,
      initialMultiplicand,
      initialMultiplier,
      steps
    ).product;
    const e: number =
      getProduct(
        xH + xL,
        yH + yL,
        initialMultiplicand,
        initialMultiplier,
        steps
      ).product -
      a -
      d;

    const product = a * Math.pow(10, m * 2) + e * Math.pow(10, m) + d;

    if (e > 0) {
      if (product !== initialMultiplicand * initialMultiplier) {
        steps.push({
          number: steps.length + 1,
          equation: [`${xH}${xL}`, `${yH}${yL}`],
          subSteps: [
            `<span class="text-blue-500">${xH}</span><span class="text-green-500">${xL}</span> × <span class="text-blue-500">${yH}</span><span class="text-green-500">${yL}</span> = `,
            `<span class="text-blue-500">${xH}</span> × <span class="text-blue-500">${yH}</span> = <span class="text-orange-500">${a.toLocaleString(
              "en-us"
            )}</span>`,
            `<span class="text-green-500">${xL}</span> × <span class="text-green-500">${yL}</span> = <span class="text-violet-500">${d.toLocaleString(
              "en-us"
            )}</span>`,
            `( <span class="text-blue-500">${xH}</span> + <span class="text-green-500">${xL}</span> ) × ( <span class="text-blue-500">${yH}</span> + <span class="text-green-500">${yL}</span> ) - <span class="text-orange-500">${a}</span> - <span class="text-violet-500">${d}</span> = <span class="text-red-700">${e.toLocaleString(
              "en-us"
            )}</span>`,
            `<span class="text-orange-500">${a}</span> × 10<sup>${
              m * 2
            }</sup> + <span class="text-red-700">${e.toLocaleString(
              "en-us"
            )}</span> × 10<sup>${m}</sup> + <span class="text-violet-500">${d.toLocaleString(
              "en-us"
            )}</span> = <b><u>${product.toLocaleString("en-us")}</u></b>`,
          ],
        });
      } else {
        steps.push({
          number: steps.length + 1,
          equation: [`${xH}${xL}`, `${yH}${yL}`],
          subSteps: [
            `<span class="text-gray-500">${initialMultiplicand} × ${initialMultiplier} = `,
            `${xH} × ${yH} = <span class="text-orange-500">${a.toLocaleString(
              "en-us"
            )}</span>`,
            `${xL} × ${yL} = <span class="text-violet-500">${d.toLocaleString(
              "en-us"
            )}</span>`,
            `${xH + xL} × ${yH + yL} = <span class="text-green-500">${(
              (xH + xL) *
              (yH + yL)
            ).toLocaleString("en-us")}</span>`,
            `<span class="text-green-500">${(
              (xH + xL) *
              (yH + yL)
            ).toLocaleString(
              "en-us"
            )}</span> - <span class="text-orange-500">${a}</span> - <span class="text-violet-500">${d}</span> = <span class="text-red-700">${e.toLocaleString(
              "en-us"
            )}</span>`,
            `<span class="text-orange-500">${a}</span> × 10<sup>${
              m * 2
            }</sup> + <span class="text-red-700">${e.toLocaleString(
              "en-us"
            )}</span> × 10<sup>${m}</sup> + <span class="text-violet-500">${d.toLocaleString(
              "en-us"
            )}</span> = <b><u>${product.toLocaleString("en-us")}</u></b>`,
          ],
        });
      }
    }

    return {
      product,
      steps,
    };
  };

  const multiply = (e: SyntheticEvent) => {
    e.preventDefault();

    const result: Test = getProduct(
      parseInt(multiplicand),
      parseInt(multiplier),
      parseInt(multiplicand),
      parseInt(multiplier),
      []
    );

    /* result.steps = result.steps?.filter((step, index) => {
      return (multiplicand.indexOf(step.equation[0]) !== -1 && multiplier.indexOf(step.equation[1]) !== -1) || index + 1 === (result.steps?.length || 0) - 1;
    }) */

    onProductCalculation(result);

    if (onMultiplicandChange) onMultiplicandChange(multiplicand);
    if (onMultiplierChange) onMultiplierChange(multiplier);

    setMulitplicand("");
    setMultiplier("");
  };

  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
      <form onSubmit={multiply}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-7 lg:grid-cols-7 items-center">
          <div className="sm:col-span-3">
            <label
              htmlFor="multiplicand"
              className="block text-lg font-bold uppercase text-gray-700 flex justify-center"
            >
              Multiplicand
            </label>
            <div className="mt-1">
              <input
                type="number"
                onChange={(e) => setMulitplicand(e.target.value)}
                value={multiplicand}
                name="multiplicand"
                id="multiplicand"
                min={1}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="1234"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-1 md:mt-8 lg:mt-8 flex justify-center">
            <XIcon width={50} height={50} className="text-gray-700" />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="multiplier"
              className="block text-lg font-bold uppercase text-gray-700 flex justify-center"
            >
              Multiplier
            </label>
            <div className="mt-1">
              <input
                type="number"
                onChange={(e) => setMultiplier(e.target.value)}
                value={multiplier}
                name="multiplier"
                id="multiplier"
                min={1}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="4321"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold uppercase rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-6/12"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
}
