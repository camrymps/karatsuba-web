import { Fragment, useState } from "react";
import "./App.css";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import KaratsubaForm from "./KaratsubaForm";
import KaratsubaProductSteps from "./KaratsubaProductSteps";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Try It", href: "#", current: true },
  { name: "Why Karatsuba?", href: "#", current: false },
  { name: "History", href: "#", current: false },
  { name: "Additional Resources", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [product, setProduct] = useState<number>(-1);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [multiplicand, setMultiplicand] = useState<string>("");
  const [multiplier, setMultiplier] = useState<string>("");

  const changeStep = (index: any) => {
    setCurrentStep(index);
  };

  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                          alt="Workflow"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="px-2 py-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white uppercase">
              Multiplication using the Karatsuba method
            </h1>
            <p className="text-md font-medium text-white mt-3 uppercase">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <KaratsubaForm
            onProductCalculation={(result: any) => {
              setProduct(result.product);
              setSteps(result.steps);
              setCurrentStep(1);
            }}
            onMultiplicandChange={(value: string) => setMultiplicand(value)}
            onMultiplierChange={(value: string) => setMultiplier(value)}
          />
        </div>
        {product !== -1 && (
          <>
            <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-2">
                <div className="text-2xl font-bold uppercase text-gray-700">
                  Operation
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-5xl font-bold text-gray-500">
                  {multiplicand} × {multiplier}
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-2">
                <div className="text-2xl font-bold uppercase text-gray-700">
                  Product
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-6xl font-bold text-indigo-500">
                  {product.toLocaleString("en-us")}
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border border-gray-200 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold uppercase text-gray-700">
                  Solution Steps
                </div>
                <p className="text-gray-500">
                  This solution has <b>{steps.length}</b> steps.
                </p>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg mt-10">
                <div className="flex justify-center">
                  <KaratsubaProductSteps
                    steps={steps}
                    currentStep={currentStep}
                  />
                </div>
              </div>
              <nav
                className="flex items-center justify-center mt-10"
                aria-label="Progress"
              >
                <p className="text-sm font-medium">
                  Step {currentStep} of {steps.length}
                </p>
                <ol role="list" className="ml-8 flex items-center space-x-5">
                  {steps.map((step, index: number) => {
                    const stepNumber: number = index + 1;

                    return (
                      <li
                        key={`step-${stepNumber}`}
                        onClick={() => changeStep(stepNumber)}
                      >
                        {currentStep > stepNumber ? (
                          <a className="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900">
                            <span className="sr-only">{stepNumber}</span>
                          </a>
                        ) : step.number === currentStep ? (
                          <a
                            className="relative flex items-center justify-center"
                            aria-current="step"
                          >
                            <span
                              className="absolute w-5 h-5 p-px flex"
                              aria-hidden="true"
                            >
                              <span className="w-full h-full rounded-full bg-indigo-200" />
                            </span>
                            <span
                              className="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{stepNumber}</span>
                          </a>
                        ) : (
                          <a className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
                            <span className="sr-only">{stepNumber}</span>
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
