import { useState, useEffect } from "react";
import { KaratsubaProductStepsProps, KaratsubaStep } from "./types";
import { ArrowCircleDownIcon, ArrowCircleRightIcon, CheckCircleIcon } from "@heroicons/react/solid";
import parse from 'html-react-parser';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function KaratsubaProductSteps(
  props: KaratsubaProductStepsProps
) {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    setSteps(props.steps);
    setCurrentStep(props.currentStep);
  }, [props.steps, props.currentStep]);

  if (steps.length > 0) {
  return (
    <div>
      <div className="mt-8 mb-4">
        <div className="flow-root">
          <ul role="list" className="-mb-2">
            {steps[0].subSteps.map((subStep: string, index: number) => (
              <li key={`sub-step-${index}`}>
                <div className="relative pb-8">
                  {index + 1 !== steps[0].subSteps.length ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                            index === 0 ? "bg-blue-500" : index + 1 === steps[0].subSteps.length ? "bg-green-500" : "bg-gray-500",
                          "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                        )}
                      >
                        {index === 0 ? (
                          <ArrowCircleRightIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        ) : index + 1 === steps[0].subSteps.length ? (
                          <CheckCircleIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        ) : (
                            <ArrowCircleDownIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 flex justify-between items-center space-x-4">
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          { parse(subStep) }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

return null;
}
