import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import { Routes } from "react-router-dom";
import { NavbarMinimal } from "./components/Navbar";
import AddListingModal from "./components/AddListingModal";
import { useDisclosure } from '@mantine/hooks';

function App() {

  const [opened, { open, close }] = useDisclosure(true);

  return (
    <>
    <div className="flex">
      <NavbarMinimal />
      <div className="w-full h-screen overflow-y-scroll">
        <Routes>{AllRoutes()}</Routes>
        {/* footer */}

        <footer class="bg-white rounded-lg shadow-md m-1">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" class="hover:underline">
                Harshada Raundal™
              </a>
              . No Rights Reserved 😉.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>

    <AddListingModal opened={opened} open={open} close={close} />
    </>
  );
}

export default App;
